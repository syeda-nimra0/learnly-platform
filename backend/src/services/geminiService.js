import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../config/env.js'

/**
 * GeminiService - the ONLY place in the codebase that touches the Gemini API.
 *
 * Security rules:
 *  - The API key is read from process.env (server-side only).
 *  - NEVER exposed to the frontend via VITE_* variables.
 *  - Input length is capped.
 *  - Timeouts are enforced.
 *  - Responses are sanitized before returning.
 */

let _client = null

function getClient() {
  if (!env.gemini.apiKey) {
    throw new Error('Gemini API key not configured on the server.')
  }
  if (!_client) {
    _client = new GoogleGenerativeAI(env.gemini.apiKey)
  }
  return _client
}

/**
 * Allowed AI features. The server only accepts these IDs - any other value
 * is rejected so attackers can't inject arbitrary system prompts.
 */
export const AI_FEATURES = {
  career_navigator: {
    name: 'Career Navigator',
    systemPrompt:
      'You are Learnly AI, the Career Navigator. Recommend career paths based on the user\'s onboarding answers, interests, skills and progress. Explain why a particular path fits. Recommend the next skills and courses. Be concise, structured, and specific. Never invent statistics or salaries.',
  },
  course_advisor: {
    name: 'Course Advisor',
    systemPrompt:
      'You are Learnly AI, the Course Advisor. Analyze whether a course is suitable for the user\'s current skill level. Explain prerequisites. Recommend alternative courses when a course is too advanced or too basic. Be honest about gaps.',
  },
  lesson_tutor: {
    name: 'Lesson Tutor',
    systemPrompt:
      'You are Learnly AI, the Lesson Tutor. Answer questions about the current lesson. Explain difficult concepts in simpler language. Provide examples and analogies. Explain code when the lesson involves programming. Keep the conversation focused on the current course and lesson. Be patient and clear.',
  },
  quiz_generator: {
    name: 'AI Quiz Generator',
    systemPrompt:
      'You are Learnly AI, the Quiz Generator. Generate practice quizzes from the lesson or course content. Support multiple-choice, true/false, scenario-based and short-answer questions. Always explain the correct answer. Clearly label these as AI-generated practice quizzes, separate from official course assessments. Output as JSON when possible.',
  },
  study_planner: {
    name: 'Study Planner',
    systemPrompt:
      'You are Learnly AI, the Study Planner. Create personalized daily and weekly learning plans. Consider available study time, current progress and target completion date. Adjust recommendations when the user falls behind. Be realistic and specific.',
  },
  notes_pdf: {
    name: 'Notes & PDF Assistant',
    systemPrompt:
      'You are Learnly AI, the Notes & PDF Assistant. Generate concise revision notes from authorized course content. Generate summaries, key concepts, definitions and practice questions. Format output as Markdown so it can be converted to PDF.',
  },
  translation: {
    name: 'Translation Assistant',
    systemPrompt:
      'You are Learnly AI, the Translation Assistant. Translate authorized course content and AI-generated notes into supported languages. Preserve technical terminology and code syntax when translating programming content.',
  },
  resume: {
    name: 'Career & Resume Assistant',
    systemPrompt:
      'You are Learnly AI, the Career & Resume Assistant. Help users create resumes based ONLY on verified skills, courses, certificates, projects and information provided by the user. NEVER invent work experience, qualifications, certificates, achievements or skills. Help users prepare for interviews and career transitions. Be honest about what is and isn\'t verifiable.',
  },
  progress: {
    name: 'Learning Progress Assistant',
    systemPrompt:
      'You are Learnly AI, the Learning Progress Assistant. Explain the user\'s current learning progress. Identify strengths and weak areas from available learning data. Recommend what the user should learn next. Celebrate genuine milestones without fabricating achievements.',
  },
}

/**
 * Sanitize a string for output. Strips any leaked secrets if they appear.
 */
function sanitizeOutput(text) {
  if (!text) return ''
  let out = String(text)
  // Strip any accidental API key leak
  if (env.gemini.apiKey) {
    out = out.split(env.gemini.apiKey).join('[REDACTED]')
  }
  return out.trim()
}

/**
 * Main chat method.
 *
 * @param {Object} params
 * @param {string} params.message - The user's message (validated + length-capped upstream)
 * @param {string} params.feature - One of AI_FEATURES keys
 * @param {Object} params.userContext - Minimum context derived SERVER-SIDE from the JWT
 * @param {Array}  params.history - Last few conversation turns
 */
export async function chat({ message, feature, userContext = {}, history = [] }) {
  const featureConfig = AI_FEATURES[feature]
  if (!featureConfig) {
    throw new Error(`Unknown AI feature: ${feature}`)
  }

  // Length cap
  if (typeof message !== 'string' || message.length > env.gemini.maxInputChars) {
    throw new Error(`Message exceeds maximum length of ${env.gemini.maxInputChars} characters.`)
  }

  const client = getClient()
  const model = client.getGenerativeModel({
    model: env.gemini.model,
    systemInstruction: featureConfig.systemPrompt,
  })

  // Build a minimal, privacy-preserving context block.
  // Only send what's needed for THIS feature.
  const contextBlock = buildContextBlock(feature, userContext)

  // Convert history to Gemini's format
  const historyFormatted = (history || [])
    .filter((h) => h.role && h.content)
    .slice(-10) // last 10 turns max
    .map((h) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(h.content).slice(0, env.gemini.maxInputChars) }],
    }))

  const chatSession = model.startChat({
    history: historyFormatted,
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
      topP: 0.95,
    },
  })

  // Race against a hard timeout so the request can't hang forever
  const userMessage = contextBlock ? `${contextBlock}\n\nUser message: ${message}` : message

  const result = await Promise.race([
    chatSession.sendMessage(userMessage),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI request timed out')), env.gemini.timeoutMs)
    ),
  ])

  const text = result?.response?.text?.() || ''
  return sanitizeOutput(text)
}

/**
 * Build a minimal context block for the given feature.
 * NEVER sends the user's full database profile.
 */
function buildContextBlock(feature, ctx) {
  const lines = ['[Learnly user context - derived server-side, do not modify]']

  if (ctx.name) lines.push(`- Learner name: ${ctx.name}`)
  if (ctx.goal) lines.push(`- Career goal: ${ctx.goal}`)
  if (ctx.roles?.length) lines.push(`- Interested roles: ${ctx.roles.join(', ')}`)
  if (ctx.skills?.length) lines.push(`- Skills to develop: ${ctx.skills.slice(0, 10).join(', ')}`)
  if (ctx.jobTitle) lines.push(`- Current job title: ${ctx.jobTitle}`)
  if (ctx.education) lines.push(`- Highest education: ${ctx.education}`)

  if (ctx.currentCourse) {
    lines.push(`- Current course: ${ctx.currentCourse.title} (${ctx.currentCourse.provider})`)
  }
  if (ctx.currentLesson) {
    lines.push(`- Current lesson: ${ctx.currentLesson.title}`)
  }
  if (ctx.progress) {
    lines.push(`- Overall progress: ${ctx.progress.overall}%`)
    lines.push(`- Foundation: ${ctx.progress.foundation}%, Practice: ${ctx.progress.practice}%, Job Ready: ${ctx.progress.jobReady}%`)
  }

  lines.push('Respond helpfully and concisely. Use Markdown for formatting.')

  return lines.join('\n')
}

/**
 * Generate a practice quiz from lesson content.
 */
export async function generateQuiz({ topic, difficulty = 'medium', questionCount = 5, lessonContent = '' }) {
  const featureConfig = AI_FEATURES.quiz_generator
  const client = getClient()
  const model = client.getGenerativeModel({
    model: env.gemini.model,
    systemInstruction: featureConfig.systemPrompt,
  })

  const prompt = `Generate ${questionCount} practice questions about: ${topic}
Difficulty: ${difficulty}
${lessonContent ? `Lesson context: ${lessonContent.slice(0, 3000)}` : ''}

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "..."
    }
  ]
}`

  const result = await Promise.race([
    model.generateContent(prompt),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI request timed out')), env.gemini.timeoutMs)
    ),
  ])

  const text = result?.response?.text?.() || ''
  // Strip markdown code fences if present
  const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch {
    return { raw: sanitizeOutput(text) }
  }
}
