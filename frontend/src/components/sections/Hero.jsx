import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import VariableProximity from '../animations/VariableProximity.jsx'
import CountUp from '../animations/CountUp.jsx'
import CircularText from '../animations/CircularText.jsx'
import ScrollVelocity from '../animations/ScrollVelocity.jsx'
import { CAREERS, COURSES } from '../../data/courses.js'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100vh] pt-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-[0.04] pointer-events-none" />

      <div className="container-learnly relative z-10">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8 mt-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-learnly-line bg-learnly-paper">
            <Sparkles size={14} className="text-learnly-primary" />
            <span className="text-xs font-medium tracking-wide">Powered by Learnly AI</span>
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div style={{ y: textY, opacity }} className="text-center max-w-6xl mx-auto">
          <h1 className="text-[clamp(2.5rem,9vw,9rem)] font-bold leading-[0.9] tracking-ultra mb-6">
            <BlurText text="Learn what" as="span" delay={0.1} />
            <br />
            <span className="inline-flex items-baseline gap-4">
              <span className="italic font-light">matters,</span>
              <span className="inline-block relative">
                <VariableProximity
                  label={'become'}
                  className="text-learnly-primary"
                  radius={180}
                />
              </span>
            </span>
            <br />
            <BlurText text="who you want." as="span" delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-learnly-muted max-w-2xl mx-auto mb-10 leading-relaxed tracking-tight"
          >
            Learnly doesn't just give you courses. We help you understand what to learn, why to
            learn it, how to learn it, and what to do next — powered by AI that knows you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/signup" className="btn-primary group">
              Start Learning
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/explore" className="btn-secondary group">
              <Play size={14} className="fill-current" />
              Explore Courses
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-learnly-line border border-learnly-line"
        >
          {[
            { label: 'Active learners', value: 1250000, suffix: '+', decimals: 0 },
            { label: 'Courses', value: 425, suffix: '+', decimals: 0 },
            { label: 'Avg rating', value: 4.8, suffix: '', decimals: 1 },
            { label: 'Career paths', value: 38, suffix: '', decimals: 0 },
          ].map((stat) => (
            <div key={stat.label} className="bg-learnly-paper p-6 md:p-8 text-center">
              <div className="text-3xl md:text-5xl font-bold tracking-tightest mb-1">
                <CountUp end={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest text-learnly-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="relative mt-20 md:mt-32"
      >
        <div className="container-learnly">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Students learning with Learnly"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-learnly-ink/30 via-transparent to-transparent" />

            {/* Floating circular text */}
            <div className="absolute -bottom-12 right-8 md:right-16 hidden md:block">
              <div className="relative">
                <CircularText
                  text="• LEARN • EXPLORE • GROW • ACHIEVE "
                  spinDuration={25}
                  className="text-learnly-ink"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    to="/signup"
                    className="w-16 h-16 bg-learnly-ink text-learnly-paper rounded-full flex items-center justify-center hover:bg-learnly-primary hover:text-learnly-ink transition-colors"
                    aria-label="Get started"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll velocity marquee */}
      <div className="mt-20 border-y border-learnly-line py-6 overflow-hidden">
        <ScrollVelocity baseVelocity={3} className="text-4xl md:text-6xl font-bold tracking-tightest">
          <span className="px-8">LEARNLY AI</span>
          <span className="px-8 text-learnly-muted">•</span>
          <span className="px-8 italic font-light">personalized paths</span>
          <span className="px-8 text-learnly-muted">•</span>
          <span className="px-8">REAL PROJECTS</span>
          <span className="px-8 text-learnly-muted">•</span>
          <span className="px-8 italic font-light">verified certificates</span>
          <span className="px-8 text-learnly-muted">•</span>
        </ScrollVelocity>
      </div>
    </section>
  )
}
