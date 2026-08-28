import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  Lock,
  ArrowRight,
  Briefcase,
  FileText,
  HelpCircle,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { COURSES } from '../data/courses.js'
import { cn } from '../lib/utils.js'

const LEVELS = [
  {
    id: 'foundation',
    title: 'Foundation',
    subtitle: 'Level 1',
    description: 'Core concepts and beginner exercises.',
    color: '#80B7FA',
    lessons: [
      { id: 'f1', title: 'Introduction & Overview', duration: '12 min', type: 'video', done: true },
      { id: 'f2', title: 'Core Terminology', duration: '18 min', type: 'video', done: true },
      { id: 'f3', title: 'Setting Up Your Environment', duration: '25 min', type: 'video', done: true },
      { id: 'f4', title: 'Exercise: First Hands-On Task', duration: '40 min', type: 'exercise', done: false },
      { id: 'f5', title: 'Foundation Quiz', duration: '15 min', type: 'quiz', done: false },
    ],
  },
  {
    id: 'practice',
    title: 'Practice',
    subtitle: 'Level 2',
    description: 'Hands-on exercises, quizzes, and guided tasks.',
    color: '#95C3FA',
    lessons: [
      { id: 'p1', title: 'Intermediate Concepts', duration: '22 min', type: 'video', done: false },
      { id: 'p2', title: 'Working with Real Data', duration: '35 min', type: 'video', done: false },
      { id: 'p3', title: 'Exercise: Build a Mini-Project', duration: '60 min', type: 'exercise', done: false },
      { id: 'p4', title: 'Practice Quiz 1', duration: '20 min', type: 'quiz', done: false },
      { id: 'p5', title: 'Practice Quiz 2', duration: '20 min', type: 'quiz', done: false },
    ],
  },
  {
    id: 'job-ready',
    title: 'Job Ready',
    subtitle: 'Level 3',
    description: 'Real-world projects, advanced exercises, and final assessment.',
    color: '#0A0A0A',
    lessons: [
      { id: 'j1', title: 'Industry Best Practices', duration: '30 min', type: 'video', done: false },
      { id: 'j2', title: 'Capstone Project Brief', duration: '15 min', type: 'video', done: false },
      { id: 'j3', title: 'Capstone Project', duration: '4 hours', type: 'project', done: false },
      { id: 'j4', title: 'Final Assessment', duration: '45 min', type: 'quiz', done: false },
    ],
  },
]

export default function Learn() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { success } = useToast()
  const [course, setCourse] = useState(null)
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const local = COURSES.find((c) => c.id === courseId)
    setCourse(local)
  }, [courseId])

  if (!course) {
    return <div className="pt-32 pb-20 text-center text-learnly-muted">Loading course...</div>
  }

  // Compute progress
  const allLessons = LEVELS.flatMap((l) => l.lessons)
  const doneLessons = allLessons.filter((l) => l.done).length
  const progressPct = Math.round((doneLessons / allLessons.length) * 100)

  const handleLessonClick = (lesson, levelId) => {
    navigate(`/learn/${courseId}/lesson/${lesson.id}?level=${levelId}`)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-learnly">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/my-learning"
            className="text-sm text-learnly-muted hover:text-learnly-ink mb-4 inline-block"
          >
            ← My Learning
          </Link>
          <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-widest text-learnly-muted">
            <span>{course.provider}</span>
            <span>·</span>
            <span>{course.type}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tightest mb-4">
            {course.title}
          </h1>

          {/* Progress bar */}
          <div className="bg-learnly-mist border border-learnly-line p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your progress</span>
              <span className="text-sm font-bold">{progressPct}%</span>
            </div>
            <div className="h-2 bg-learnly-line">
              <motion.div
                className="h-full bg-learnly-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-learnly-muted">
              <span>{doneLessons} of {allLessons.length} lessons complete</span>
              {progressPct === 100 && (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Award size={12} /> Certificate ready!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Student ID card */}
        <div className="mb-12 bg-learnly-ink text-learnly-paper p-6 md:p-8 max-w-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-learnly-primary mb-1">
                Learnly · Student ID
              </p>
              <p className="font-bold text-lg tracking-tight">{user?.name || 'Learner'}</p>
              <p className="text-sm text-white/60">{user?.email}</p>
            </div>
            <img
              src="https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png"
              alt="Learnly"
              className="h-8 w-auto"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div>
              <p className="text-white/40 mb-1">Course</p>
              <p className="font-medium truncate">{course.title}</p>
            </div>
            <div>
              <p className="text-white/40 mb-1">Enrolled</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-white/40 mb-1">ID</p>
              <p className="font-medium font-mono">{Math.random().toString(36).slice(2, 10).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* 3 levels */}
        <div className="space-y-8">
          {LEVELS.map((level, levelIdx) => {
            const levelDone = level.lessons.filter((l) => l.done).length
            const levelPct = Math.round((levelDone / level.lessons.length) * 100)
            const isLocked = levelIdx > 0 && LEVELS[levelIdx - 1].lessons.some((l) => !l.done)

            return (
              <div
                key={level.id}
                className={cn(
                  'border',
                  isLocked ? 'border-learnly-line opacity-60' : 'border-learnly-ink'
                )}
              >
                <div
                  className="p-5 md:p-6 flex items-start justify-between gap-4"
                  style={{ background: level.color, color: levelIdx === 2 ? '#FFF' : '#000' }}
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
                      {level.subtitle}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight">{level.title}</h2>
                    <p className="text-sm opacity-80 mt-1">{level.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{levelPct}%</p>
                    <p className="text-xs opacity-70">{levelDone}/{level.lessons.length}</p>
                  </div>
                </div>

                <div>
                  {level.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => !isLocked && handleLessonClick(lesson, level.id)}
                      disabled={isLocked}
                      className={cn(
                        'w-full flex items-center justify-between p-4 border-b border-learnly-line last:border-0 transition-colors',
                        isLocked ? 'cursor-not-allowed' : 'hover:bg-learnly-mist'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {isLocked ? (
                          <Lock size={16} className="text-learnly-muted" />
                        ) : lesson.done ? (
                          <CheckCircle2 size={16} className="text-emerald-600" />
                        ) : (
                          <Circle size={16} className="text-learnly-muted" />
                        )}
                        <LessonTypeIcon type={lesson.type} />
                        <span className="text-sm font-medium">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-learnly-muted">
                        <span>{lesson.duration}</span>
                        {!isLocked && <ArrowRight size={14} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Certificate preview */}
        {progressPct === 100 ? (
          <div className="mt-12 p-8 border-2 border-learnly-primary bg-learnly-mist text-center">
            <Award size={48} className="text-learnly-primary mx-auto mb-4" />
            <h2 className="heading-3 mb-3">Certificate ready!</h2>
            <p className="text-learnly-muted mb-6 max-w-md mx-auto">
              You've completed all three levels. Generate your verified certificate with a unique
              verification ID.
            </p>
            <button
              onClick={() => success('Certificate generated! Check your profile.')}
              className="btn-primary"
            >
              Generate certificate
            </button>
          </div>
        ) : (
          <div className="mt-12 p-8 border border-dashed border-learnly-line text-center">
            <Award size={32} className="text-learnly-muted mx-auto mb-3" />
            <p className="text-sm text-learnly-muted">
              Complete all three levels to unlock your verified certificate.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function LessonTypeIcon({ type }) {
  const icons = {
    video: Play,
    exercise: BookOpen,
    quiz: HelpCircle,
    project: Briefcase,
    reading: FileText,
  }
  const Icon = icons[type] || BookOpen
  return (
    <span className="w-6 h-6 bg-learnly-mist border border-learnly-line flex items-center justify-center">
      <Icon size={10} />
    </span>
  )
}
