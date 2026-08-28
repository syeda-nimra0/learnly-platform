import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Landmark, Users, TrendingUp, Shield } from 'lucide-react'
import BlurText from '../components/animations/BlurText.jsx'
import CountUp from '../components/animations/CountUp.jsx'

const FEATURES = [
  { icon: Users, title: 'Workforce-scale', desc: 'Train thousands of citizens simultaneously with secure, measurable pathways.' },
  { icon: TrendingUp, title: 'Outcome tracking', desc: 'Measure employment outcomes, skill acquisition, and economic impact.' },
  { icon: Shield, title: 'Compliance-ready', desc: 'Meet government data residency, security, and accessibility requirements.' },
]

export default function Government() {
  return (
    <div className="pt-24 pb-20">
      <section className="container-learnly py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-learnly-line mb-6">
              <Landmark size={14} />
              <span className="text-xs font-medium tracking-wide">Learnly for Government</span>
            </span>
            <h1 className="heading-1 mb-6">
              <BlurText text="Train a workforce ready for the next decade." />
            </h1>
            <p className="body-large mb-8">
              Scale workforce development programs with secure, measurable, AI-assisted learning
              pathways designed for citizens of every background.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary">
                See government solutions
                <ArrowRight size={14} />
              </Link>
              <Link to="/explore" className="btn-secondary">Browse catalog</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80"
              alt="Government workforce"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-learnly-line bg-learnly-mist">
        <div className="container-learnly py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 18, suffix: '+', label: 'Country partners' },
            { value: 320, suffix: 'K+', label: 'Citizens trained' },
            { value: 78, suffix: '%', label: 'Employment rate' },
            { value: 4.7, decimals: 1, label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-bold tracking-tightest mb-1">
                <CountUp end={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
              </div>
              <div className="text-xs uppercase tracking-widest text-learnly-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-learnly py-20">
        <div className="mb-12 max-w-2xl">
          <p className="caption mb-4">Built for public sector</p>
          <h2 className="heading-2">
            <BlurText text="Measurable impact at national scale." />
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-px bg-learnly-line border border-learnly-line">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-learnly-paper p-6"
            >
              <f.icon size={22} className="text-learnly-primary mb-4" />
              <h3 className="font-semibold text-lg tracking-tight mb-2">{f.title}</h3>
              <p className="text-sm text-learnly-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
