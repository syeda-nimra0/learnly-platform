import { env } from '../config/env.js'

/**
 * Global error handler.
 * NEVER leaks stack traces or internal errors to the client in production.
 */
export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500
  const isDev = env.nodeEnv === 'development'

  // Log internally (production: use a real logger like pino/winston)
  if (status >= 500) {
    console.error('[error]', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      userId: req.userId?.toString?.() || null,
    })
  }

  // Don't leak internals
  const message =
    status >= 500 && !isDev
      ? 'Internal server error'
      : err.message || 'Something went wrong'

  res.status(status).json({
    error: message,
    code: err.code || undefined,
    ...(isDev && status >= 500 && { stack: err.stack }),
  })
}

/**
 * 404 handler for unknown routes.
 */
export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` })
}
