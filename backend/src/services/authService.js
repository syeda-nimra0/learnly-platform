import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { env } from '../config/env.js'

const SALT_ROUNDS = 12

/**
 * Hash a password using bcrypt with a strong cost factor.
 */
export async function hashPassword(plain) {
  if (!plain || plain.length < 8) {
    throw new Error('Password must be at least 8 characters.')
  }
  return bcrypt.hash(plain, SALT_ROUNDS)
}

/**
 * Verify a password against a stored hash.
 * Uses constant-time comparison via bcrypt.
 */
export async function verifyPassword(plain, hash) {
  if (!plain || !hash) return false
  return bcrypt.compare(plain, hash)
}

/**
 * Issue a short-lived access token.
 */
export function signAccessToken(user) {
  return jwt.sign(
    { userId: user._id?.toString() || user.id, role: user.role, type: 'access' },
    env.jwt.accessSecret,
    { expiresIn: env.jwt.accessExpires }
  )
}

/**
 * Issue a long-lived refresh token. Each refresh token has a unique ID
 * so we can revoke individual tokens server-side.
 */
export function signRefreshToken(user) {
  const tokenId = uuidv4()
  const token = jwt.sign(
    { userId: user._id?.toString() || user.id, tokenId, type: 'refresh' },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshExpires }
  )
  return { token, tokenId }
}

/**
 * Verify an access token. Throws on invalid/expired.
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret)
}

/**
 * Verify a refresh token. Throws on invalid/expired.
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret)
}
