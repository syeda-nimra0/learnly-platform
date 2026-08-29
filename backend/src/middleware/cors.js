import cors from 'cors'
import { env } from '../config/env.js'

/**
 * Build the list of allowed origins.
 *
 * In dev, we allow several common Vite ports so the frontend works even
 * if 5173 is taken and Vite falls back to 5174, 5175, etc.
 *
 * In production, we ONLY allow the configured CLIENT_URL.
 */
function getAllowedOrigins() {
  const origins = new Set()

  if (env.isProd) {
    if (env.clientUrl) origins.add(env.clientUrl)
    return Array.from(origins)
  }

  // Dev mode - be permissive about ports but only on localhost
  const devOrigins = [
    'https://learnly-platform.vercel.app/',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:4173', // vite preview
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
  ]
  devOrigins.forEach((o) => origins.add(o))

  if (env.clientUrl) origins.add(env.clientUrl)

  // Allow any extra origins specified via env, comma-separated
  if (env.extraCorsOrigins) {
    env.extraCorsOrigins.split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((o) => origins.add(o))
  }

  return Array.from(origins)
}

/**
 * CORS middleware - configured to:
 *  - Allow only the configured client origins (no wildcard)
 *  - Allow credentials (cookies + Authorization header)
 *  - Echo the requesting origin (required when credentials: true)
 *  - Handle OPTIONS preflight explicitly
 *  - Expose common response headers the browser needs to read
 */
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowed = getAllowedOrigins()

    // Allow requests with no Origin header (curl, Postman, server-to-server)
    if (!origin) return callback(null, true)

    if (allowed.includes(origin)) {
      return callback(null, true)
    }

    // Don't throw - just reject. cors() will then NOT set Access-Control-Allow-Origin
    // and the browser will block the request. We return a 403-friendly null with error.
    console.warn(`[cors] Blocked origin: ${origin}`)
    return callback(null, false) // false = do not allow, but don't throw
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['Set-Cookie', 'X-Total-Count'],
  maxAge: 86400, // cache preflight for 24h
  preflightContinue: false,
  optionsSuccessStatus: 204,
})
