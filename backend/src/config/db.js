import mongoose from 'mongoose'
import { env } from './env.js'

/**
 * Cached MongoDB connection for Vercel serverless.
 *
 * WHY THIS EXISTS:
 * Vercel serverless functions spin up a new instance (or reuse a warm one)
 * for each request. If we call `mongoose.connect()` on every request, it
 * quickly exhausts the connection pool and slows down responses.
 *
 * Solution:
 *  - On cold start: `cached.connection` is undefined → connect once.
 *  - On warm requests: `cached.connection` is set → reuse.
 *  - We attach the connection promise to `globalThis` so it survives across
 *    warm invocations of the same Lambda instance.
 *
 * IMPORTANT for Mongoose 8:
 *  - `bufferCommands: true` so queries queue up while connecting (default).
 *  - `serverSelectionTimeoutMS: 10000` for Vercel's 10s function timeout.
 *  - `dbName` ensures we always connect to the right DB even if the URI
 *    doesn't include it.
 */
const MONGODB_OPTS = {
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
  bufferCommands: true,
}

const DB_NAME = 'learnly'

// Use globalThis to cache the connection across warm Lambda invocations
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null }
}
const cached = global.mongooseCache

/**
 * Connect to MongoDB Atlas.
 * - Returns the cached connection on warm requests.
 * - Connects fresh on cold starts.
 * - Does NOT crash the app if connection fails (so /health still works).
 */
export async function connectDB() {
  if (!env.mongodbUri) {
    console.warn('[db] MONGODB_URI not set - running without database.')
    return null
  }

  // Already connected? Return existing connection.
  if (cached.conn) {
    return cached.conn
  }

  // Connection already in progress? Wait for it (don't double-connect).
  if (!cached.promise) {
    console.log('[db] Initiating new MongoDB connection...')

    // Strip any existing dbName from URI so `dbName` option takes precedence
    // (helps when URI is `mongodb+srv://...mongodb.net/?appName=Learnly`)
    mongoose.set('strictQuery', true)

    cached.promise = mongoose
      .connect(env.mongodbUri, { ...MONGODB_OPTS, dbName: DB_NAME })
      .then((mongoose) => {
        console.log('[db] Connected to MongoDB Atlas, dbName =', DB_NAME)
        return mongoose
      })
      .catch((err) => {
        console.error('[db] MongoDB connection failed:', err.message)
        // Reset promise so next request can retry
        cached.promise = null
        throw err
      })
  }

  try {
    const mongoose = await cached.promise
    cached.conn = mongoose.connection
    return cached.conn
  } catch (err) {
    console.warn('[db] Continuing without database. Some features will fail.')
    return null
  }
}

/**
 * Disconnect from MongoDB (used in tests / scripts, not in serverless).
 */
export function disconnectDB() {
  if (cached.conn) {
    cached.promise = null
    cached.conn = null
    return mongoose.disconnect()
  }
  return Promise.resolve()
}
