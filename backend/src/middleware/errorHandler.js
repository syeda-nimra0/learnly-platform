import { env } from '../config/env.js'

/**
 * Global error handler.
 * In production, hides stack traces but still returns the error message
 * (truncated) so the client can show a meaningful message instead of
 * generic "Internal server error".
 *
 * For truly sensitive errors (status >= 500), we log full details server-side
 * but return a generic message — UNLESS `EXPOSE_ERRORS=true` env var is set
 * (useful for debugging Vercel deployments).
 */
export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500
  const isDev = env.nodeEnv === 'development'
  const exposeErrors = process.env.EXPOSE_ERRORS === 'true'

  // Log internally
  if (status >= 500) {
    console.error('[error]', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      userId: req.userId?.toString?.() || null,
    })
  }

  // Build the response message
  let message
  if (status < 500) {
    // 4xx errors: always safe to expose
    message = err.message || 'Something went wrong'
  } else if (isDev || exposeErrors) {
    // Dev mode OR debugging flag: expose the message + stack
    message = err.message || 'Internal server error'
  } else {
    // Production: hide internal errors
    message = 'Internal server error'
  }

  res.status(status).json({
    error: message,
    code: err.code || undefined,
    ...((isDev || exposeErrors) && status >= 500 && { stack: err.stack }),
  })
}

/**
 * 404 handler for unknown routes.
 */
export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` })
}
