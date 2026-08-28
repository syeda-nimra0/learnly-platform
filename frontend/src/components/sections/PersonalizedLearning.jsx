import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import { ONBOARDING_GOALS } from '../../data/courses.js'

/**
 * PersonalizedLearning - explains that Learnly builds a path around the user.
 */
export default function PersonalizedLearning() {
  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Left - heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="caption mb-4">Personalized learning, reimagined</p>
            <h2 className="heading-2 mb-6">
              <BlurText text="A learning path built around you." />
            </h2>
            <p className="body-large mb-6">
              Learnly doesn't hand you a generic catalog. We start by understanding your goal, your
              current role, your skills, and the career you want. From there, we shape a path that
              actually moves you forward.
            </p>
            <p className="body-default mb-8">
              Every recommendation is refined by Learnly AI as you progress—adapting to your pace,
              quiz performance, and the skills you actually use.
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 font-medium border-b border-learnly-ink pb-1 hover:text-learnly-primary hover:border-learnly-primary transition-colors"
            >
              Take the 5-minute assessment
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right - goal options */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-px bg-learnly-line border border-learnly-line">
              {ONBOARDING_GOALS.map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-learnly-paper p-6 md:p-8 group hover:bg-learnly-mist transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-mono text-learnly-muted">
                      0{i + 1}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-learnly-muted group-hover:text-learnly-primary group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h3 className="font-semibold text-xl tracking-tight mb-2">{goal.label}</h3>
                  <p className="text-sm text-learnly-muted leading-relaxed">{goal.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
