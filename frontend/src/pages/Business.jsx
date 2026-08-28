import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Users, TrendingUp, Shield, BarChart3 } from 'lucide-react'
import BlurText from '../components/animations/BlurText.jsx'
import CountUp from '../components/animations/CountUp.jsx'

const FEATURES = [
  { icon: Users, title: 'Team management', desc: 'Invite team members, assign learning paths, track progress in real time.' },
  { icon: TrendingUp, title: 'Skill gap analysis', desc: 'Identify and close team skill gaps with AI-powered assessments.' },
  { icon: BarChart3, title: 'Custom analytics', desc: 'Measure learning ROI with completion rates, time invested, and skill growth.' },
  { icon: Shield, title: 'Enterprise security', desc: 'SSO, SCIM, audit logs, and enterprise-grade security for your organization.' },
]

export default function Business() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="container-learnly py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-learnly-line mb-6">
              <Building2 size={14} />
              <span className="text-xs font-medium tracking-wide">Learnly for Business</span>
            </span>
            <h1 className="heading-1 mb-6">
              <BlurText text="Close team skill gaps for what is next." />
            </h1>
            <p className="body-large mb-8">
              Unlock top team training with 30% off and build the skills to be ready for your busy
              season. Trusted by 2,400+ companies worldwide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary">
                Try Learnly for Business
                <ArrowRight size={14} />
              </Link>
              <Link to="/explore" className="btn-secondary">Browse team courses</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Team training"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-learnly-line bg-learnly-mist">
        <div className="container-learnly py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 2400, suffix: '+', label: 'Companies' },
            { value: 87, suffix: '%', label: 'Skill gap closure' },
            { value: 12, suffix: 'M+', label: 'Team learners' },
            { value: 4.8, decimals: 1, label: 'Avg rating' },
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

      {/* Features */}
      <section className="container-learnly py-20">
        <div className="mb-12 max-w-2xl">
          <p className="caption mb-4">Why teams choose Learnly</p>
          <h2 className="heading-2">
            <BlurText text="Everything your team needs to grow." />
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-learnly-line border border-learnly-line">
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

      {/* CTA */}
      <section className="container-learnly pb-20">
        <div className="bg-learnly-ink text-learnly-paper p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tightest mb-4">
            Start with easy savings for hard-working teams.
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            30% off team training. Get a demo and see how Learnly can transform your team.
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 bg-learnly-primary text-learnly-ink px-8 py-4 font-medium hover:bg-learnly-paper transition-colors">
            Get a demo
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
