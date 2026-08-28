import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import { TRENDING_SKILLS } from '../../data/courses.js'

/**
 * TrendingSkills - chip cloud of trending skills + promotional banner.
 */
export default function TrendingSkills() {
  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left - intro */}
          <div className="lg:col-span-4">
            <p className="caption mb-4">Trending skills</p>
            <h2 className="heading-3 mb-6">
              <BlurText text="What the world is learning right now." />
            </h2>
            <p className="body-default mb-6">
              Skills ranked by enrollment growth over the last 30 days. Click any skill to find
              related courses, career paths, and AI-recommended next steps.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-medium border-b border-learnly-ink pb-1 hover:text-learnly-primary hover:border-learnly-primary transition-colors"
            >
              Browse all skills
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right - chip cloud */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-2">
              {TRENDING_SKILLS.map((skill, i) => (
                <motion.button
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  whileHover={{ y: -3 }}
                  className="px-4 py-2 border border-learnly-line bg-learnly-paper text-sm font-medium tracking-tight hover:border-learnly-ink hover:bg-learnly-mist transition-all"
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
