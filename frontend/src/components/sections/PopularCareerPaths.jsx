import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import { CAREERS } from '../../data/courses.js'

/**
 * PopularCareerPaths - grid of career cards with image, salary, growth, skills.
 */
export default function PopularCareerPaths() {
  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div className="max-w-2xl">
            <p className="caption mb-4">Popular career paths</p>
            <h2 className="heading-2">
              <BlurText text="Find a path worth walking." />
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-learnly-ink pb-1 hover:text-learnly-primary hover:border-learnly-primary transition-colors"
          >
            Explore all careers
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-learnly-line border border-learnly-line">
          {CAREERS.slice(0, 8).map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-learnly-paper group"
            >
              <Link to="/onboarding" className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-learnly-mist">
                  <img
                    src={career.image}
                    alt={career.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-learnly-ink/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <h3 className="text-learnly-paper font-semibold text-lg tracking-tight leading-tight">
                      {career.name}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-learnly-paper opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm text-learnly-muted line-clamp-3 mb-4 leading-relaxed">
                    {career.description}
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-learnly-muted">Salary range</span>
                      <span className="font-medium">{career.avgSalary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-learnly-muted">Job growth</span>
                      <span className="font-medium flex items-center gap-1 text-emerald-700">
                        <TrendingUp size={11} />
                        {career.growthRate}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-learnly-line">
                    {career.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 bg-learnly-mist text-learnly-muted border border-learnly-line"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
