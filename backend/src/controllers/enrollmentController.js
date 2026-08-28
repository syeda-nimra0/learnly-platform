import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import { Enrollment, Certificate } from '../models/Enrollment.js'
import { Course } from '../models/Course.js'

/**
 * GET /api/enrollments
 */
export async function listEnrollments(req, res, next) {
  try {
    const enrollments = await Enrollment.find({ userId: req.userId })
      .populate('courseId')
      .sort({ enrolledAt: -1 })
    return res.json({ enrollments })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/enrollments
 */
export async function enroll(req, res, next) {
  try {
    const { courseId } = req.body
    if (!courseId) return res.status(400).json({ error: 'courseId is required' })

    const course = await Course.findById(courseId)
    if (!course) return res.status(404).json({ error: 'Course not found' })

    let enrollment = await Enrollment.findOne({ userId: req.userId, courseId })
    if (!enrollment) {
      enrollment = await Enrollment.create({
        userId: req.userId,
        courseId,
        status: 'active',
      })
    }

    return res.status(201).json({ enrollment })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/enrollments/:courseId
 */
export async function getEnrollment(req, res, next) {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.userId,
      courseId: req.params.courseId,
    })
    if (!enrollment) return res.status(404).json({ error: 'Not enrolled' })
    return res.json({ enrollment })
  } catch (err) {
    next(err)
  }
}

/**
 * PATCH /api/enrollments/:courseId/progress
 * Server-side validated progress update.
 */
export async function updateProgress(req, res, next) {
  try {
    const { foundation, practice, jobReady, completedLessonId } = req.body

    const enrollment = await Enrollment.findOne({
      userId: req.userId,
      courseId: req.params.courseId,
    })
    if (!enrollment) return res.status(404).json({ error: 'Not enrolled' })

    if (typeof foundation === 'number') {
      enrollment.progress.foundation = clampPct(foundation)
    }
    if (typeof practice === 'number') {
      enrollment.progress.practice = clampPct(practice)
    }
    if (typeof jobReady === 'number') {
      enrollment.progress.jobReady = clampPct(jobReady)
    }
    if (completedLessonId && !enrollment.completedLessons.includes(completedLessonId)) {
      enrollment.completedLessons.push(completedLessonId)
    }

    enrollment.progress.overall = Math.round(
      (enrollment.progress.foundation +
        enrollment.progress.practice +
        enrollment.progress.jobReady) /
        3
    )

    if (
      enrollment.progress.foundation === 100 &&
      enrollment.progress.practice === 100 &&
      enrollment.progress.jobReady === 100 &&
      !enrollment.certificateId
    ) {
      enrollment.status = 'completed'
      enrollment.completedAt = new Date()
      await generateCertificate(req.user, req.params.courseId, enrollment)
    }

    await enrollment.save()
    return res.json({ enrollment })
  } catch (err) {
    next(err)
  }
}

function clampPct(n) {
  const v = parseInt(n, 10)
  if (isNaN(v)) return 0
  return Math.max(0, Math.min(100, v))
}

async function generateCertificate(user, courseId, enrollment) {
  const course = await Course.findById(courseId)
  const certificateId = `LNR-${uuidv4().slice(0, 8).toUpperCase()}`
  const verificationHash = crypto
    .createHash('sha256')
    .update(`${user._id}-${courseId}-${certificateId}-${Date.now()}`)
    .digest('hex')

  await Certificate.create({
    certificateId,
    userId: user._id,
    courseId,
    userName: user.name,
    courseTitle: course?.title || '',
    verificationHash,
  })

  enrollment.certificateId = certificateId
  return certificateId
}
