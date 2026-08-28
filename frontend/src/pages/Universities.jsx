import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, BookOpen, Award, Users } from 'lucide-react'
import BlurText from '../components/animations/BlurText.jsx'
import CountUp from '../components/animations/CountUp.jsx'

const FEATURES = [
  { icon: BookOpen, title: 'Credit-eligible courses', desc: 'Bring 350+ leading industry courses into your curriculum with credit transfer.' },
  { icon: Users, title: 'Faculty tools', desc: 'Cohort management, gradebook, assignments, and plagiarism detection built-in.' },
  { icon: Award, title: 'Verified certificates', desc: 'Students earn industry-recognized certificates alongside academic credit.' },
]

export default function Universities() {
  return (
    <div className="pt-24 pb-20">
      <section className="container-learnly py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-learnly-line mb-6">
              <GraduationCap size={14} />
              <span className="text-xs font-medium tracking-wide">Learnly for Universities</span>
            </span>
            <h1 className="heading-1 mb-6">
              <BlurText text="World-class courses, credited for your students." />
            </h1>
            <p className="body-large mb-8">
              Bring 350+ leading industry courses into your curriculum. Students earn verified
              certificates and academic credit simultaneously.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary">
                Learn about campus plans
                <ArrowRight size={14} />
              </Link>
              <Link to="/explore" className="btn-secondary">Browse catalog</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80"
              alt="University campus"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-learnly-line bg-learnly-mist">
        <div className="container-learnly py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 350, suffix: '+', label: 'University partners' },
            { value: 1200, suffix: '+', label: 'Credit-eligible courses' },
            { value: 4.5, decimals: 1, suffix: 'M', label: 'Student learners' },
            { value: 92, suffix: '%', label: 'Faculty satisfaction' },
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
          <p className="caption mb-4">Built for higher education</p>
          <h2 className="heading-2">
            <BlurText text="Everything your campus needs." />
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
