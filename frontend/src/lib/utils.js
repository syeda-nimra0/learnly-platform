import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine class names with Tailwind merge.
 * Replaces the cn() helper from the original components.md
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number with thousands separators (e.g. 12,500).
 */
export function formatNumber(n) {
  if (n === null || n === undefined) return '0'
  return new Intl.NumberFormat('en-US').format(n)
}

/**
 * Format a rating to one decimal (e.g. 4.7).
 */
export function formatRating(r) {
  if (!r) return '0.0'
  return Number(r).toFixed(1)
}

/**
 * Smooth scroll to top - used by route changes.
 */
export function scrollToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Debounce helper - used by search inputs.
 */
export function debounce(fn, delay = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Build a Cloudinary image URL with transformations.
 * cloudName is public - it's fine to use this in the browser.
 */
export function cloudinaryUrl(publicId, options = {}) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dy7z0znum'
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    dpr = 'auto',
  } = options

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    `dpr_${dpr}`,
  ]
  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  if (crop) transforms.push(`c_${crop}`)
  if (gravity) transforms.push(`g_${gravity}`)

  const transformStr = transforms.join(',')
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${publicId}`
}

/**
 * Get user initials from a name.
 */
export function getInitials(name = '') {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Sleep helper.
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linear interpolation.
 */
export function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

/**
 * Generate a unique-ish ID for client-side use (NOT for security).
 */
export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}
