import mongoose from 'mongoose'
import { env } from './env.js'

let isConnected = false

/**
 * Connect to MongoDB Atlas.
 * Skips connection if MONGODB_URI is not set (frontend will still work in dev mode).
 */
export async function connectDB() {
  if (!env.mongodbUri) {
    console.warn('[db] MONGODB_URI not set - running without database. Backend will use in-memory fallback.')
    return null
  }
  if (isConnected) return mongoose.connection

  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    })
    isConnected = true
    console.log('[db] Connected to MongoDB Atlas')
    return mongoose.connection
  } catch (err) {
    console.error('[db] MongoDB connection failed:', err.message)
    console.warn('[db] Continuing without database. Some features will be limited.')
    return null
  }
}

export function disconnectDB() {
  if (isConnected) {
    return mongoose.disconnect()
  }
  return Promise.resolve()
}
