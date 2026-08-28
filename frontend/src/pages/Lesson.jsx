import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Play,
  BookOpen,
  HelpCircle,
  Briefcase,
  Sparkles,
} from 'lucide-react'
import { useLearnlyAI } from '../context/LearnlyAIContext.jsx'
import { COURSES } from '../data/courses.js'

const LESSON_CONTENT = {
  f1: {
    title: 'Introduction & Overview',
    body: `Welcome to this course. In this introductory lesson, we will cover the foundational concepts you need to succeed.

## What you will learn

By the end of this lesson, you will understand:
- The big picture of what this field covers
- Why these skills matter in today's job market
- How this course is structured and what to expect

## Why this matters

The skills in this course are in high demand. Companies are actively hiring people who can apply these concepts to real business problems. Throughout this course, you will not just learn theory—you will build practical projects that demonstrate your competency.

## Course structure

This course is organized into three levels:
1. **Foundation** — Core concepts and beginner exercises
2. **Practice** — Hands-on exercises and quizzes
3. **Job Ready** — Real-world projects and a final assessment

Complete all three levels to earn a verified certificate.`,
  },
}

export default function Lesson() {
  const { courseId, lessonId } = useParams()
  const [searchParams] = useSearchParams()
  const levelId = searchParams.get('level') || 'foundation'
  const { open: openAI, setActiveFeature, sendMessage } = useLearnlyAI()
  const [course, setCourse] = useState(null)
  const [lesson, setLesson] = useState(null)

  useEffect(() => {
    setCourse(COURSES.find((c) => c.id === courseId))
    setLesson(LESSON_CONTENT[lessonId] || {
      title: `Lesson ${lessonId}`,
      body: 'This lesson content will load from the backend. For demo purposes, this is a placeholder lesson.',
    })
  }, [courseId, lessonId])

  if (!course || !lesson) {
    return <div className="pt-32 pb-20 text-center text-learnly-muted">Loading lesson...</div>
  }

  const handleAskAI = () => {
    setActiveFeature('lesson_tutor')
    openAI()
    sendMessage(`Explain the key concept from the lesson "${lesson.title}" in simpler language with examples.`)
  }

  const handleGenerateQuiz = () => {
    setActiveFeature('quiz_generator')
    openAI()
    sendMessage(`Generate a 5-question practice quiz (multiple choice) from the lesson "${lesson.title}". Include answers and explanations.`)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-learnly max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to={`/learn/${courseId}`}
            className="text-sm text-learnly-muted hover:text-learnly-ink flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Back to course
          </Link>
          <span className="text-xs uppercase tracking-widest text-learnly-muted">
            {levelId}
          </span>
        </div>

        {/* Lesson header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tightest mb-3">
            {lesson.title}
          </h1>
          <p className="text-learnly-muted mb-8">{course.title} · {course.provider}</p>
        </motion.div>

        {/* Lesson content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-lg max-w-none mb-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:my-4 [&_li]:my-1 [&_ol]:my-4 [&_strong]:text-learnly-ink"
        >
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(lesson.body) }} />
        </motion.article>

        {/* AI actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <button
            onClick={handleAskAI}
            className="p-5 border border-learnly-line hover:border-learnly-ink text-left group"
          >
            <Sparkles size={20} className="text-learnly-primary mb-3" />
            <h3 className="font-semibold mb-1">Ask Learnly AI</h3>
            <p className="text-sm text-learnly-muted">
              Get a simpler explanation, examples, or analogies for this lesson.
            </p>
          </button>
          <button
            onClick={handleGenerateQuiz}
            className="p-5 border border-learnly-line hover:border-learnly-ink text-left group"
          >
            <HelpCircle size={20} className="text-learnly-primary mb-3" />
            <h3 className="font-semibold mb-1">Generate practice quiz</h3>
            <p className="text-sm text-learnly-muted">
              AI will create 5 MCQs from this lesson with answer explanations.
            </p>
          </button>
        </div>

        {/* Nav footer */}
        <div className="flex items-center justify-between pt-6 border-t border-learnly-line">
          <button className="btn-secondary">
            <ArrowLeft size={14} />
            Previous lesson
          </button>
          <button className="btn-primary">
            Mark complete & next
            <CheckCircle2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Simple markdown-to-HTML (no full parser needed for this demo)
function markdownToHtml(md) {
  let html = md
  // Headings
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Lists
  html = html.replace(/(?:^|\n)((?:- .+\n?)+)/g, (match) => {
    const items = match.trim().split('\n').map((l) => l.replace(/^- /, '').trim())
    return '\n<ul>' + items.map((i) => `<li>${i}</li>`).join('') + '</ul>\n'
  })
  html = html.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (match) => {
    const items = match.trim().split('\n').map((l) => l.replace(/^\d+\. /, '').trim())
    return '\n<ol>' + items.map((i) => `<li>${i}</li>`).join('') + '</ol>\n'
  })
  // Paragraphs (split by double newlines, wrap non-tagged blocks)
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('<')) return trimmed
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
  return html
}
