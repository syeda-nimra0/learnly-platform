import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import VariableProximity from '../animations/VariableProximity.jsx'

export default function FinalCTA() {
  return (
    <section className="section-padding bg-learnly-primary text-learnly-ink relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="container-learnly relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="caption mb-6"
        >
          Start your learning journey
        </motion.p>

        <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-ultra leading-[0.9] mb-8">
          <BlurText text="Your next chapter" />
          <br />
          <span className="italic font-light">
            <VariableProximity label={'starts here.'} radius={200} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join over 1.25 million learners building careers with AI-guided paths, real projects,
          and verified certificates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-learnly-ink text-learnly-paper px-8 py-4 font-medium hover:bg-learnly-paper hover:text-learnly-ink transition-colors"
          >
            Join for Free
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 border border-learnly-ink text-learnly-ink px-8 py-4 font-medium hover:bg-learnly-ink hover:text-learnly-paper transition-colors"
          >
            Explore Courses
          </Link>
        </motion.div>

        <p className="mt-6 text-xs text-learnly-ink/60">
          No credit card required · Cancel anytime · Free trial on most courses
        </p>
      </div>
    </section>
  )
}
