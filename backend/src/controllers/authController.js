import { z } from 'zod'
import { User } from '../models/User.js'
import { env } from '../config/env.js'
import {
  hashPassword,
  verifyPassword,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../services/authService.js'

// Zod schemas for input validation
const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(128),
})

const onboardingSchema = z.object({
  goal: z.string().min(1),
  roles: z.array(z.string()).min(1).max(20),
  skills: z.array(z.string()).min(1).max(20),
  jobTitle: z.string().min(1).max(100),
  education: z.string().min(1).max(200),
})

const updateProfileSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  bio: z.string().max(500).optional(),
  age: z.number().int().min(13).max(120).optional(),
  avatar: z.string().max(2048).optional(),
})

/**
 * POST /api/auth/signup
 */
export async function signup(req, res, next) {
  try {
    const parsed = signupSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
    }
    const { name, email, password } = parsed.data

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ error: 'Email is already registered' })
    }

    const passwordHash = await hashPassword(password)
    const user = await User.create({ name, email, passwordHash })

    const accessToken = signAccessToken(user)
    const { token: refreshToken, tokenId } = signRefreshToken(user)
    user.refreshTokens = [{ token: refreshToken, tokenId, createdAt: new Date() }]
    await user.save()

    setAuthCookies(res, accessToken, refreshToken)

    return res.status(201).json({
      user: user.toJSON(),
      accessToken,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input' })
    }
    const { email, password } = parsed.data

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const accessToken = signAccessToken(user)
    const { token: refreshToken, tokenId } = signRefreshToken(user)

    // Rotate: keep only last 5 refresh tokens per user
    user.refreshTokens = [
      ...(user.refreshTokens || []).slice(-4),
      { token: refreshToken, tokenId, createdAt: new Date() },
    ]
    await user.save()

    setAuthCookies(res, accessToken, refreshToken)

    return res.json({ user: user.toJSON(), accessToken })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/refresh
 */
export async function refresh(req, res, next) {
  try {
    const refreshToken = req.cookies?.learnly_refresh_token
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' })
    }

    let decoded
    try {
      decoded = verifyRefreshToken(refreshToken)
    } catch {
      return res.status(401).json({ error: 'Invalid refresh token' })
    }

    const user = await User.findById(decoded.userId)
    if (!user) return res.status(401).json({ error: 'User not found' })

    const stored = user.refreshTokens?.find((t) => t.token === refreshToken)
    if (!stored) {
      // Token reuse detected - revoke all tokens for this user
      user.refreshTokens = []
      await user.save()
      return res.status(401).json({ error: 'Refresh token revoked' })
    }

    const newAccessToken = signAccessToken(user)
    setAuthCookies(res, newAccessToken, refreshToken)

    return res.json({ accessToken: newAccessToken })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/logout
 */
export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies?.learnly_refresh_token
    if (refreshToken && req.user) {
      req.user.refreshTokens = req.user.refreshTokens?.filter((t) => t.token !== refreshToken) || []
      await req.user.save()
    }
    res.clearCookie('learnly_access_token')
    res.clearCookie('learnly_refresh_token')
    return res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/auth/me
 */
export async function me(req, res) {
  return res.json({ user: req.user.toJSON() })
}

/**
 * PATCH /api/auth/me
 */
export async function updateMe(req, res, next) {
  try {
    const parsed = updateProfileSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input' })
    }
    Object.assign(req.user, parsed.data)
    await req.user.save()
    return res.json({ user: req.user.toJSON() })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/onboarding
 */
export async function completeOnboarding(req, res, next) {
  try {
    const parsed = onboardingSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid onboarding data' })
    }
    req.user.onboarding = {
      ...parsed.data,
      completed: true,
      completedAt: new Date(),
    }
    await req.user.save()
    return res.json({ user: req.user.toJSON() })
  } catch (err) {
    next(err)
  }
}

/**
 * Helper - set httpOnly auth cookies.
 *
 * Production (Vercel) note:
 *   Frontend aur backend alag `*.vercel.app` subdomains par deploy hote hain,
 *   is liye cross-origin cookies ke liye `SameSite=None` + `Secure=true` chahiye.
 *   `secure` env var `COOKIE_SECURE=true` set karne par enable hota hai
 *   (production mein hamesha true hona chahiye kyunki Vercel HTTPS deta hai).
 */
function setAuthCookies(res, accessToken, refreshToken) {
  const common = {
    httpOnly: true,
    secure: env.isProd ? true : env.jwt.cookieSecure,
    sameSite: env.isProd ? 'none' : 'lax',
    path: '/',
  }
  res.cookie('learnly_access_token', accessToken, {
    ...common,
    maxAge: 15 * 60 * 1000, // 15 minutes
  })
  if (refreshToken) {
    res.cookie('learnly_refresh_token', refreshToken, {
      ...common,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
  }
}
