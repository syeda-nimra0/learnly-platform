import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star,
  Clock,
  BarChart3,
  Users,
  Check,
  Play,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Award,
  Briefcase,
  Globe,
  BookOpen,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useLearnlyAI } from '../context/LearnlyAIContext.jsx'
import { COURSES } from '../data/courses.js'
import { enrollmentApi } from '../lib/api.js'
import { formatNumber, formatRating, cn } from '../lib/utils.js'
import { Badge } from '../components/ui/index.jsx'

// 3-level structure: Foundation, Practice, Job Ready
const MOCK_MODULES = [
  {
    id: 'foundation',
    title: 'Level 1 — Foundation',
    description: 'Core concepts and beginner exercises.',
    lessons: [
      { id: 'f1', title: 'Introduction & Overview', duration: '12 min', type: 'video' },
      { id: 'f2', title: 'Core Terminology', duration: '18 min', type: 'video' },
      { id: 'f3', title: 'Setting Up Your Environment', duration: '25 min', type: 'video' },
      { id: 'f4', title: 'Exercise: First Hands-On Task', duration: '40 min', type: 'exercise' },
      { id: 'f5', title: 'Foundation Quiz', duration: '15 min', type: 'quiz' },
    ],
  },
  {
    id: 'practice',
    title: 'Level 2 — Practice',
    description: 'Hands-on exercises, quizzes, and guided tasks.',
    lessons: [
      { id: 'p1', title: 'Intermediate Concepts', duration: '22 min', type: 'video' },
      { id: 'p2', title: 'Working with Real Data', duration: '35 min', type: 'video' },
      { id: 'p3', title: 'Exercise: Build a Mini-Project', duration: '60 min', type: 'exercise' },
      { id: 'p4', title: 'Practice Quiz 1', duration: '20 min', type: 'quiz' },
      { id: 'p5', title: 'Practice Quiz 2', duration: '20 min', type: 'quiz' },
    ],
  },
  {
    id: 'job-ready',
    title: 'Level 3 — Job Ready',
    description: 'Real-world projects, advanced exercises, and final assessment.',
    lessons: [
      { id: 'j1', title: 'Industry Best Practices', duration: '30 min', type: 'video' },
      { id: 'j2', title: 'Capstone Project Brief', duration: '15 min', type: 'video' },
      { id: 'j3', title: 'Capstone Project', duration: '4 hours', type: 'project' },
      { id: 'j4', title: 'Final Assessment', duration: '45 min', type: 'quiz' },
    ],
  },
]

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { success, error: showError } = useToast()
  const { open: openAI } = useLearnlyAI()

  const [course, setCourse] = useState(null)
  const [enrolled, setEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [expandedModule, setExpandedModule] = useState('foundation')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to load from API; fallback to local seed
    setLoading(true)
    const local = COURSES.find((c) => c.id === id)
    setCourse(local)
    setLoading(false)
    // Track view
    try {
      enrollmentApi.get(id).then(() => setEnrolled(true)).catch(() => {})
    } catch {}
  }, [id])

  if (loading) {
    return <div className="pt-32 pb-20 text-center text-learnly-muted">Loading course...</div>
  }

  if (!course) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-3">Course not found</h1>
        <p className="text-learnly-muted mb-6">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/explore" className="btn-primary">Browse all courses</Link>
      </div>
    )
  }

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${id}` } })
      return
    }
    setEnrolling(true)
    try {
      await enrollmentApi.enroll(id)
      setEnrolled(true)
      success('Enrolled! Your student ID card has been generated.')
      navigate(`/learn/${id}`)
    } catch (err) {
      // Allow local fallback for demo
      setEnrolled(true)
      success('Enrolled (demo mode).')
      navigate(`/learn/${id}`)
    } finally {
      setEnrolling(false)
    }
  }

  const handleAskAI = () => {
    openAI()
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="container-learnly py-4">
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-learnly-muted hover:text-learnly-ink">
          <ArrowLeft size={14} />
          Back to catalog
        </Link>
      </div>

      {/* Hero */}
      <section className="container-learnly pb-12 border-b border-learnly-line">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left - info */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest text-learnly-muted font-medium">
                {course.provider}
              </span>
              <span className="text-learnly-line">·</span>
              <Badge>{course.type}</Badge>
              {course.badge && <Badge variant="primary">{course.badge}</Badge>}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tightest leading-[1.05] mb-6">
              {course.title}
            </h1>

            <p className="text-lg text-learnly-muted leading-relaxed mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-learnly-muted mb-6">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-learnly-ink text-learnly-ink" />
                <span className="font-medium text-learnly-ink">{formatRating(course.rating)}</span>
                <span>({formatNumber(course.reviews)} reviews)</span>
              </div>
              <span className="text-learnly-line">·</span>
              <div className="flex items-center gap-1">
                <Users size={14} />
                {formatNumber(course.enrolled)} enrolled
              </div>
              <span className="text-learnly-line">·</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {course.duration}
              </div>
              <span className="text-learnly-line">·</span>
              <div className="flex items-center gap-1">
                <BarChart3 size={14} />
                {course.level}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleEnroll}
                disabled={enrolling || enrolled}
                className="btn-primary"
              >
                {enrolling ? 'Enrolling...' : enrolled ? 'Enrolled — Continue' : 'Enroll for free'}
                {!enrolling && !enrolled && <ChevronRight size={14} />}
              </button>
              <button onClick={handleAskAI} className="btn-secondary">
                Ask Learnly AI about this course
              </button>
            </div>
          </div>

          {/* Right - thumbnail */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-learnly-mist">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-learnly-ink/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-learnly-paper/95 text-learnly-ink rounded-full flex items-center justify-center hover:bg-learnly-primary transition-colors cursor-pointer">
                  <Play size={22} className="fill-current ml-1" />
                </div>
              </div>
            </div>
            <p className="text-xs text-learnly-muted mt-2 text-center">
              Preview · 2 min trailer
            </p>
          </div>
        </div>
      </section>

      {/* Skills you'll gain */}
      <section className="container-learnly py-12 border-b border-learnly-line">
        <h2 className="heading-4 mb-6">Skills you'll gain</h2>
        <div className="flex flex-wrap gap-2">
          {course.skills?.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 border border-learnly-line bg-learnly-paper text-sm font-medium hover:border-learnly-ink transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 3-level curriculum */}
      <section className="container-learnly py-12 border-b border-learnly-line">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="caption mb-3">Curriculum</p>
            <h2 className="heading-3">Three levels. Real outcomes.</h2>
          </div>
          <p className="text-sm text-learnly-muted">
            Complete all three to unlock your verified certificate.
          </p>
        </div>

        <div className="space-y-4">
          {MOCK_MODULES.map((module) => {
            const isOpen = expandedModule === module.id
            return (
              <div key={module.id} className="border border-learnly-line">
                <button
                  onClick={() => setExpandedModule(isOpen ? null : module.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-learnly-mist transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-lg tracking-tight mb-1">{module.title}</h3>
                    <p className="text-sm text-learnly-muted">{module.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-learnly-muted">
                    <span>{module.lessons.length} lessons</span>
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-learnly-line"
                  >
                    <ul>
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between px-5 py-3 border-b border-learnly-line last:border-0 hover:bg-learnly-mist/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <LessonTypeIcon type={lesson.type} />
                            <span className="text-sm font-medium">{lesson.title}</span>
                          </div>
                          <span className="text-xs text-learnly-muted">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* What you'll achieve */}
      <section className="container-learnly py-12 border-b border-learnly-line">
        <div className="grid md:grid-cols-3 gap-px bg-learnly-line border border-learnly-line">
          {[
            { icon: Award, title: 'Verified certificate', desc: 'Generated server-side with a unique verification ID.' },
            { icon: Briefcase, title: 'Portfolio projects', desc: 'Real-world projects you can show to employers.' },
            { icon: Globe, title: 'Lifetime access', desc: 'Learn at your pace. Revisit any lesson anytime.' },
          ].map((item) => (
            <div key={item.title} className="bg-learnly-paper p-6">
              <item.icon size={22} className="text-learnly-primary mb-3" />
              <h3 className="font-semibold tracking-tight mb-2">{item.title}</h3>
              <p className="text-sm text-learnly-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function LessonTypeIcon({ type }) {
  const icons = {
    video: Play,
    exercise: BookOpen,
    quiz: Check,
    project: Briefcase,
  }
  const Icon = icons[type] || BookOpen
  return (
    <span className="w-7 h-7 bg-learnly-mist border border-learnly-line flex items-center justify-center">
      <Icon size={12} />
    </span>
  )
}
