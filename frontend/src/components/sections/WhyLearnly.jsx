import { motion } from 'framer-motion'
import { Target, Wrench, TrendingUp, Award, Sparkles } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import CountUp from '../animations/CountUp.jsx'
import { WHY_LEARNLY } from '../../data/courses.js'

const ICONS = {
  target: Target,
  wrench: Wrench,
  'trending-up': TrendingUp,
  award: Award,
  sparkles: Sparkles,
}

const STATS = [
  { value: 97, suffix: '%', label: 'Completion satisfaction' },
  { value: 4.8, decimals: 1, suffix: '', label: 'Average course rating' },
  { value: 38, suffix: '+', label: 'Structured career paths' },
  { value: 425, suffix: '+', label: 'Practical courses' },
]

export default function WhyLearnly() {
  return (
    <section className="section-padding bg-learnly-mist border-b border-learnly-line">
      <div className="container-learnly">
        <div className="mb-16 max-w-3xl">
          <p className="caption mb-4">Why Learnly</p>
          <h2 className="heading-2 mb-6">
            <BlurText text="Not just courses. A complete system for moving forward." />
          </h2>
          <p className="body-large">
            Most platforms hand you a catalog. Learnly walks beside you—understanding your goal,
            adapting to your pace, and proving your progress with verifiable outcomes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-learnly-line border border-learnly-line mb-16">
          {WHY_LEARNLY.map((item, i) => {
            const Icon = ICONS[item.icon] || Sparkles
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
                className="bg-learnly-paper p-6 md:p-7"
              >
                <div className="w-10 h-10 bg-learnly-ink text-learnly-paper flex items-center justify-center mb-5">
                  <Icon size={16} />
                </div>
                <h3 className="font-semibold text-lg tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-learnly-muted leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-learnly-line border border-learnly-line">
          {STATS.map((s) => (
            <div key={s.label} className="bg-learnly-paper p-8 text-center">
              <div className="text-4xl md:text-6xl font-bold tracking-tightest mb-1">
                <CountUp end={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest text-learnly-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
