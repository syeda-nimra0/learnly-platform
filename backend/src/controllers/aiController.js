import { z } from 'zod'
import { chat, generateQuiz, AI_FEATURES } from '../services/geminiService.js'
import { env } from '../config/env.js'

// Validation schemas
const chatSchema = z.object({
  message: z.string().min(1).max(env.gemini.maxInputChars),
  feature: z.enum(Object.keys(AI_FEATURES)),
  context: z.record(z.any()).optional().default({}),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(env.gemini.maxInputChars),
      })
    )
    .max(10)
    .optional()
    .default([]),
})

const quizSchema = z.object({
  topic: z.string().min(1).max(500),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  questionCount: z.number().int().min(1).max(10).default(5),
  lessonContent: z.string().max(5000).optional().default(''),
})

/**
 * POST /api/ai/chat
 *
 * The ONLY endpoint that calls Gemini. All requests must:
 *  - be authenticated (JWT required)
 *  - be rate-limited (20/min per user)
 *  - pass input validation
 *  - use a known feature ID
 *
 * The Gemini API key is NEVER exposed - it lives only in process.env
 * on the server, used by geminiService.js.
 */
export async function chatController(req, res, next) {
  try {
    const parsed = chatSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid request',
        details: parsed.error.flatten(),
      })
    }

    const { message, feature, context, history } = parsed.data

    // Build MINIMUM context from the authenticated user (server-side only).
    // We never send the full user profile - just what's relevant.
    const userContext = buildUserContext(req.user, context)

    const response = await chat({
      message,
      feature,
      userContext,
      history,
    })

    return res.json({ response, feature })
  } catch (err) {
    if (err.message?.includes('timed out')) {
      return res.status(504).json({ error: 'AI request timed out. Please try again.' })
    }
    if (err.message?.includes('not configured')) {
      return res.status(503).json({ error: 'AI service is not available.' })
    }
    next(err)
  }
}

/**
 * POST /api/ai/quiz
 */
export async function quizController(req, res, next) {
  try {
    const parsed = quizSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid quiz request' })
    }
    const quiz = await generateQuiz(parsed.data)
    return res.json({ quiz })
  } catch (err) {
    if (err.message?.includes('timed out')) {
      return res.status(504).json({ error: 'AI request timed out.' })
    }
    next(err)
  }
}

/**
 * POST /api/ai/notes
 */
export async function notesController(req, res, next) {
  try {
    const { topic, lessonContent = '' } = req.body
    if (!topic || topic.length > 500) {
      return res.status(400).json({ error: 'Invalid topic' })
    }

    const notes = await chat({
      message: `Generate concise revision notes for: ${topic}. ${lessonContent ? `Lesson content: ${lessonContent.slice(0, 3000)}` : ''}`,
      feature: 'notes_pdf',
      userContext: buildUserContext(req.user),
      history: [],
    })

    return res.json({ notes })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/ai/translate
 */
export async function translateController(req, res, next) {
  try {
    const { content, targetLanguage } = req.body
    if (!content || content.length > 5000) {
      return res.status(400).json({ error: 'Invalid content' })
    }
    if (!targetLanguage || targetLanguage.length > 50) {
      return res.status(400).json({ error: 'Invalid target language' })
    }

    const translated = await chat({
      message: `Translate the following content into ${targetLanguage}. Preserve code syntax and technical terms.\n\nContent:\n${content}`,
      feature: 'translation',
      userContext: buildUserContext(req.user),
      history: [],
    })

    return res.json({ translated })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/ai/features
 */
export async function featuresController(req, res) {
  return res.json({
    features: Object.entries(AI_FEATURES).map(([id, config]) => ({
      id,
      name: config.name,
    })),
  })
}

/**
 * Build a minimum user context for the AI.
 * Only includes data the user has authorized + that's relevant to the feature.
 */
function buildUserContext(user, override = {}) {
  const ctx = {}
  if (user?.name) ctx.name = user.name
  if (user?.onboarding?.completed) {
    ctx.goal = user.onboarding.goal
    ctx.roles = user.onboarding.roles
    ctx.skills = user.onboarding.skills
    ctx.jobTitle = user.onboarding.jobTitle
    ctx.education = user.onboarding.education
  }
  // Override only safe fields from client-supplied context (current lesson, etc.)
  if (override.currentCourse) ctx.currentCourse = override.currentCourse
  if (override.currentLesson) ctx.currentLesson = override.currentLesson
  if (override.progress) ctx.progress = override.progress
  return ctx
}
