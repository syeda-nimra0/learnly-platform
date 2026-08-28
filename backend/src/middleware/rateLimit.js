import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

/**
 * General API rate limiter.
 */
export const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

/**
 * Stricter rate limit for AI endpoints (Gemini calls are expensive).
 * 20 requests per minute per IP (per user when authenticated).
 */
export const aiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.aiMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'AI request limit reached. Please slow down.' },
})

/**
 * Auth endpoints - prevent brute force.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts. Try again in 15 minutes.' },
})
