import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimit.js'
import {
  signup,
  login,
  refresh,
  logout,
  me,
  updateMe,
  completeOnboarding,
} from '../controllers/authController.js'

const router = Router()

router.post('/signup', authLimiter, signup)
router.post('/login', authLimiter, login)
router.post('/refresh', refresh)
router.post('/logout', requireAuth, logout)
router.get('/me', requireAuth, me)
router.patch('/me', requireAuth, updateMe)
router.post('/onboarding', requireAuth, completeOnboarding)

export default router
