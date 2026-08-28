import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User } from '../models/User.js'

/**
 * Verify the JWT from the Authorization header or cookie.
 * Attaches the authenticated user to req.user.
 *
 * NEVER trusts client-supplied user IDs - identity is always derived from
 * the verified token.
 */
export async function requireAuth(req, res, next) {
  try {
    let token = null
    const authHeader = req.headers.authorization
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.slice(7)
    } else if (req.cookies?.learnly_access_token) {
      token = req.cookies.learnly_access_token
    }

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const decoded = jwt.verify(token, env.jwt.accessSecret)
    const user = await User.findById(decoded.userId).select('-passwordHash -refreshTokens')

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = user
    req.userId = user._id
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' })
    }
    return res.status(401).json({ error: 'Invalid authentication' })
  }
}

/**
 * Optional auth - attaches user if token is valid, but doesn't fail.
 */
export async function optionalAuth(req, res, next) {
  try {
    let token = null
    const authHeader = req.headers.authorization
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.slice(7)
    } else if (req.cookies?.learnly_access_token) {
      token = req.cookies.learnly_access_token
    }

    if (token) {
      const decoded = jwt.verify(token, env.jwt.accessSecret)
      const user = await User.findById(decoded.userId).select('-passwordHash -refreshTokens')
      if (user) {
        req.user = user
        req.userId = user._id
      }
    }
  } catch (err) {
    // Ignore errors for optional auth
  }
  next()
}

/**
 * Role-based authorization. Use after requireAuth.
 *   router.delete('/users/:id', requireAuth, requireRole('admin'), handler)
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    next()
  }
}
