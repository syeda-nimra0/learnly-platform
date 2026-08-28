import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Award, Clock, TrendingUp, ArrowRight, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { COURSES } from '../data/courses.js'
import CourseCard from '../components/cards/CourseCard.jsx'
import { EmptyState } from '../components/ui/index.jsx'

// Demo enrolled courses
const ENROLLED_DEMO = COURSES.slice(0, 3)

export default function MyLearning() {
  const { user } = useAuth()
  const [enrolled, setEnrolled] = useState([])
  const [completed, setCompleted] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setEnrolled(ENROLLED_DEMO)
      setCompleted([])
      setLoading(false)
    }, 400)
  }, [])

  if (loading) {
    return <div className="pt-32 pb-20 text-center text-learnly-muted">Loading...</div>
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-learnly">
        {/* Header */}
        <div className="mb-12">
          <p className="caption mb-3">My Learning</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tightest mb-3">
            Hello, {user?.name?.split(' ')[0] || 'learner'}
          </h1>
          <p className="text-lg text-learnly-muted">
            Pick up where you left off, or explore something new.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-learnly-line border border-learnly-line mb-12">
          {[
            { label: 'Enrolled', value: enrolled.length, icon: BookOpen },
            { label: 'Completed', value: completed.length, icon: Award },
            { label: 'Hours learned', value: 24, icon: Clock },
            { label: 'Certificates', value: completed.length, icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="bg-learnly-paper p-6 text-center">
              <stat.icon size={20} className="mx-auto mb-2 text-learnly-primary" />
              <div className="text-3xl font-bold tracking-tightest">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-learnly-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Continue learning */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="heading-3">Continue learning</h2>
            <Link to="/explore" className="text-sm font-medium border-b border-learnly-ink pb-1 hover:text-learnly-primary hover:border-learnly-primary">
              Browse more
            </Link>
          </div>

          {enrolled.length === 0 ? (
            <EmptyState
              title="No enrolled courses yet"
              description="Browse the catalog and enroll in your first course to start learning."
              icon={Search}
              action={<Link to="/explore" className="btn-primary">Explore courses</Link>}
            />
          ) : (
            <div className="space-y-4">
              {enrolled.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-learnly-line hover:border-learnly-ink transition-colors group"
                >
                  <Link to={`/learn/${course.id}`} className="flex items-center gap-6 p-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-32 h-20 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-widest text-learnly-muted mb-1">
                        {course.provider} · {course.type}
                      </p>
                      <h3 className="font-semibold text-lg tracking-tight mb-2 truncate">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-learnly-line max-w-xs">
                          <div className="h-full bg-learnly-primary" style={{ width: '35%' }} />
                        </div>
                        <span className="text-xs text-learnly-muted">35% complete</span>
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-learnly-muted group-hover:text-learnly-primary group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended */}
        <section>
          <h2 className="heading-3 mb-6">Recommended for you</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.slice(3, 6).map((c, i) => (
              <CourseCard key={c.id} course={c} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
