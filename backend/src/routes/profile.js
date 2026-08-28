import { Router } from 'express'
import multer from 'multer'
import { requireAuth } from '../middleware/auth.js'
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  listAchievements,
  listCertificates,
} from '../controllers/profileController.js'

const router = Router()

// Multer config: 5MB max, images only
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF files are allowed'))
    }
  },
})

router.get('/', requireAuth, getProfile)
router.patch('/', requireAuth, updateProfile)
router.post('/avatar', requireAuth, upload.single('file'), uploadAvatar)
router.get('/achievements', requireAuth, listAchievements)
router.get('/certificates', requireAuth, listCertificates)

export default router
