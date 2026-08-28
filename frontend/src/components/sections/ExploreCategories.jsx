import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import { CATEGORIES } from '../../data/courses.js'

const ICONS = {
  code: '⌨',
  database: '▦',
  cpu: '◈',
  shield: '◊',
  cloud: '☁',
  briefcase: '▣',
  dollar: '$',
  megaphone: '◯',
  palette: '◐',
  clipboard: '▤',
  'trending-up': '↗',
  sun: '☀',
}

/**
 * ExploreCategories - grid of all 12 categories.
 */
export default function ExploreCategories() {
  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div className="max-w-2xl">
            <p className="caption mb-4">Explore categories</p>
            <h2 className="heading-2">
              <BlurText text="Twelve worlds. One platform." />
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-learnly-ink pb-1 hover:text-learnly-primary hover:border-learnly-primary transition-colors"
          >
            Browse all
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-learnly-line border border-learnly-line">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            >
              <Link
                to={`/explore?category=${cat.id}`}
                className="group block bg-learnly-paper p-6 md:p-7 hover:bg-learnly-mist transition-colors h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-light text-learnly-primary leading-none">
                    {ICONS[cat.icon] || '◆'}
                  </span>
                  <span className="text-xs text-learnly-muted">{cat.count} courses</span>
                </div>
                <h3 className="font-semibold tracking-tight text-base md:text-lg leading-snug group-hover:text-learnly-primary transition-colors">
                  {cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
