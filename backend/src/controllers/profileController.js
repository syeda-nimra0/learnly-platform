import { z } from 'zod'
import { Certificate } from '../models/Enrollment.js'
import { uploadFile } from '../services/cloudinaryService.js'
import { env } from '../config/env.js'

const profileSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  bio: z.string().max(500).optional(),
  age: z.number().int().min(13).max(120).optional(),
})

/**
 * GET /api/profile
 */
export async function getProfile(req, res) {
  return res.json({ user: req.user.toJSON() })
}

/**
 * PATCH /api/profile
 */
export async function updateProfile(req, res, next) {
  try {
    const parsed = profileSchema.safeParse(req.body)
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
 * POST /api/profile/avatar
 * Upload profile picture to Cloudinary (server-side signed).
 */
export async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' })

    if (!env.cloudinary.apiSecret) {
      return res.status(503).json({ error: 'Cloudinary is not configured on the server.' })
    }

    const result = await uploadFile(req.file.buffer, {
      folder: `${env.cloudinary.uploadFolder}/avatars`,
      resourceType: 'image',
      publicId: `avatar_${req.user._id}_${Date.now()}`,
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto' },
      ],
    })

    req.user.avatar = result.url
    await req.user.save()

    return res.json({ user: req.user.toJSON(), avatar: result.url })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/profile/achievements
 */
export async function listAchievements(req, res, next) {
  try {
    return res.json({
      achievements: [
        { id: 'first_enrollment', label: 'First Course Enrolled', earned: true },
        { id: 'foundation_complete', label: 'Foundation Level Complete', earned: true },
      ],
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/profile/certificates
 */
export async function listCertificates(req, res, next) {
  try {
    const certificates = await Certificate.find({ userId: req.userId }).sort({ issuedAt: -1 })
    return res.json({ certificates })
  } catch (err) {
    next(err)
  }
}
