import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { aiLimiter } from '../middleware/rateLimit.js'
import {
  chatController,
  quizController,
  notesController,
  translateController,
  featuresController,
} from '../controllers/aiController.js'

const router = Router()

router.post('/chat', requireAuth, aiLimiter, chatController)
router.post('/quiz', requireAuth, aiLimiter, quizController)
router.post('/notes', requireAuth, aiLimiter, notesController)
router.post('/translate', requireAuth, aiLimiter, translateController)
router.get('/features', featuresController)

export default router
