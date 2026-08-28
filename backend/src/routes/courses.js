import { Router } from 'express'
import { optionalAuth } from '../middleware/auth.js'
import {
  listCourses,
  searchCourses,
  listCategories,
  getCourse,
  trackView,
  listRecentlyViewed,
} from '../controllers/courseController.js'

const router = Router()

router.get('/', listCourses)
router.get('/search', searchCourses)
router.get('/categories', listCategories)
router.get('/recently-viewed/list', listRecentlyViewed)
router.get('/:id', optionalAuth, getCourse)
router.post('/:id/view', optionalAuth, trackView)

export default router
