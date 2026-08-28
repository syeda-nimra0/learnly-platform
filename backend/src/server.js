import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { apiLimiter } from './middleware/rateLimit.js'
import { corsMiddleware } from './middleware/cors.js'
import authRoutes from './routes/auth.js'
import aiRoutes from './routes/ai.js'
import courseRoutes from './routes/courses.js'
import enrollmentRoutes from './routes/enrollments.js'
import profileRoutes from './routes/profile.js'

const app = express()

// --- Security middleware ---

// Helmet sets sensible HTTP headers (CSP, X-Frame-Options, etc.)
app.use(
  helmet({
    contentSecurityPolicy: env.isProd ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
)

// CORS - robust configuration that handles multiple dev ports + production origins.
// Credentials: true requires specific origins (no wildcard) - handled by corsMiddleware.
// Preflight OPTIONS requests are handled automatically and cached for 24h.
app.use(corsMiddleware)

// Explicit OPTIONS handler for any route (belt + suspenders)
app.options('*', corsMiddleware)

// Body parsers
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(cookieParser())

// Logging
if (env.nodeEnv !== 'test') {
  app.use(morgan(env.isProd ? 'combined' : 'dev'))
}

// Global rate limit
app.use('/api', apiLimiter)

// --- Health check ---
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: env.nodeEnv,
    gemini: !!env.gemini.apiKey ? 'configured' : 'not-configured',
    db: !!env.mongodbUri ? 'configured' : 'not-configured',
    cloudinary: !!env.cloudinary.apiSecret ? 'configured' : 'not-configured',
  })
})

// --- API routes ---
app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/profile', profileRoutes)

// --- 404 + error handler ---
app.use(notFound)
app.use(errorHandler)

// --- Start server ---
async function start() {
  // Connect to MongoDB (won't crash if not configured)
  await connectDB()

  app.listen(env.port, () => {
    console.log(`\n[server] Learnly backend running on port ${env.port}`)
    console.log(`[server] Environment: ${env.nodeEnv}`)
    console.log(`[server] Client URL: ${env.clientUrl}`)
    console.log(`[server] Gemini API: ${env.gemini.apiKey ? 'configured (server-side only)' : 'NOT configured'}`)
    console.log(`[server] MongoDB: ${env.mongodbUri ? 'configured' : 'NOT configured (using fallback)'}`)
    console.log(`[server] Cloudinary: ${env.cloudinary.apiSecret ? 'configured' : 'NOT configured'}\n`)
  })
}

start().catch((err) => {
  console.error('[server] Failed to start:', err)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[server] SIGTERM received, shutting down...')
  process.exit(0)
})
process.on('SIGINT', () => {
  console.log('[server] SIGINT received, shutting down...')
  process.exit(0)
})

// Export the Express app for Vercel serverless deployment.
// On Vercel, `app.listen()` is a no-op (Vercel handles the HTTP server),
// but we still need to expose `app` so Vercel's @vercel/node runtime can
// route incoming requests to it.
export default app
