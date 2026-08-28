import { Course } from '../models/Course.js'

/**
 * GET /api/courses
 * Paginated list with filters. Public.
 */
export async function listCourses(req, res, next) {
  try {
    const {
      q,
      category,
      level,
      type,
      sort = 'popular',
      page = 1,
      limit = 12,
    } = req.query

    const filter = {}
    if (category) filter.category = category
    if (level) filter.level = level
    if (type) filter.type = type

    let query = Course.find(filter)

    // Text search
    if (q) {
      query = query.find({ $text: { $search: q } })
    }

    // Sort
    switch (sort) {
      case 'rating':
        query = query.sort({ rating: -1 })
        break
      case 'newest':
        query = query.sort({ createdAt: -1 })
        break
      case 'duration':
        query = query.sort({ duration: 1 })
        break
      default:
        query = query.sort({ enrolled: -1 })
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)
    query = query.skip(skip).limit(parseInt(limit))

    const [courses, total] = await Promise.all([
      query.exec(),
      Course.countDocuments(filter),
    ])

    return res.json({
      courses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/courses/search?q=...
 */
export async function searchCourses(req, res, next) {
  try {
    const q = req.query.q
    if (!q) return res.json({ courses: [] })
    const courses = await Course.find({ $text: { $search: q } })
      .limit(20)
      .sort({ enrolled: -1 })
    return res.json({ courses })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/courses/categories
 */
export async function listCategories(req, res, next) {
  try {
    const categories = await Course.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    return res.json({ categories })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/courses/:id
 */
export async function getCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ error: 'Course not found' })
    return res.json({ course })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/courses/:id/view
 */
export async function trackView(req, res, next) {
  try {
    // In a full implementation, this would persist to RecentlyViewed collection.
    return res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/courses/recently-viewed/list
 */
export async function listRecentlyViewed(req, res, next) {
  try {
    return res.json({ courses: [] })
  } catch (err) {
    next(err)
  }
}
