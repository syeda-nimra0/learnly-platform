import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import {
  listEnrollments,
  enroll,
  getEnrollment,
  updateProgress,
} from '../controllers/enrollmentController.js'

const router = Router()

router.get('/', requireAuth, listEnrollments)
router.post('/', requireAuth, enroll)
router.get('/:courseId', requireAuth, getEnrollment)
router.patch('/:courseId/progress', requireAuth, updateProgress)

export default router
