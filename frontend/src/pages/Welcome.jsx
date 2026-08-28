import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import BlurText from '../components/animations/BlurText.jsx'
import { COURSES } from '../data/courses.js'
import CourseCard from '../components/cards/CourseCard.jsx'

export default function Welcome() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'learner'

  // Auto-trigger the AI widget to suggest a path
  useEffect(() => {
    // The widget will be visible thanks to LearnlyAIProvider
  }, [])

  return (
    <div className="pt-32 pb-20">
      <div className="container-learnly">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="caption mb-4">You're all set</p>
          <h1 className="text-[clamp(3rem,10vw,7rem)] font-bold tracking-ultra leading-[0.95] mb-6">
            <BlurText text={`Welcome, ${firstName}.`} />
          </h1>
          <p className="text-xl text-learnly-muted max-w-2xl mb-8 leading-relaxed">
            We've started building your learning path based on your answers. Explore your
            recommendations below, or chat with Learnly AI to refine your direction.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/explore" className="btn-primary">
              Explore courses
              <ArrowRight size={16} />
            </Link>
            <Link to="/onboarding" className="btn-secondary">
              Edit my answers
            </Link>
          </div>
        </motion.div>

        {/* AI suggestion banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 bg-learnly-ink text-learnly-paper p-8 md:p-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-learnly-primary text-learnly-ink flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-learnly-primary mb-2">
                Learnly AI · Suggested next step
              </p>
              <p className="text-lg md:text-xl leading-snug mb-4">
                Based on your goal of <span className="font-semibold">{user?.onboarding?.goal || 'starting your career'}</span>, I recommend beginning with a foundational course in your area of interest, then advancing through our 3-level structure.
              </p>
              <p className="text-white/60 text-sm mb-6">
                Click the chat bubble in the bottom-right to start a conversation, or browse the recommended courses below.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 text-sm font-medium border-b border-learnly-primary pb-1 hover:text-learnly-primary transition-colors"
              >
                Browse recommended courses
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recommended courses */}
        <div className="mt-16">
          <h2 className="heading-3 mb-8">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.slice(0, 3).map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
