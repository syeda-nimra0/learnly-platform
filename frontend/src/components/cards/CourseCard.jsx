import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, BarChart3, ArrowUpRight } from 'lucide-react'
import { Badge } from '../ui/index.jsx'
import { formatNumber, formatRating, cn } from '../../lib/utils.js'

const BADGE_VARIANTS = {
  'Top AI program': 'primary',
  Bestseller: 'dark',
  'Trending right now': 'info',
  New: 'success',
  'Hot new release': 'warning',
  Popular: 'info',
  'Most popular': 'dark',
}

export default function CourseCard({ course, className = '', index = 0 }) {
  if (!course) return null
  const badgeVariant = BADGE_VARIANTS[course.badge] || 'default'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={cn('group', className)}
    >
      <Link
        to={`/courses/${course.id}`}
        className="block bg-learnly-paper border border-learnly-line hover:border-learnly-ink transition-all duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-learnly-mist">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {course.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={badgeVariant}>{course.badge}</Badge>
            </div>
          )}
          {course.price && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-learnly-paper/95 backdrop-blur-sm">
                {course.price}
              </Badge>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-learnly-muted font-medium">
              {course.provider}
            </span>
            <span className="text-xs text-learnly-muted">{course.type}</span>
          </div>

          <h3 className="font-semibold text-lg tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-learnly-primary transition-colors">
            {course.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-learnly-muted mb-4">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-learnly-ink text-learnly-ink" />
              <span className="font-medium text-learnly-ink">{formatRating(course.rating)}</span>
              <span>({formatNumber(course.reviews)})</span>
            </div>
            <span className="text-learnly-line">·</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{course.duration}</span>
            </div>
            <span className="text-learnly-line">·</span>
            <div className="flex items-center gap-1">
              <BarChart3 size={12} />
              <span>{course.level}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.skills?.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[11px] px-2 py-0.5 bg-learnly-mist text-learnly-muted border border-learnly-line"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-learnly-line">
            <span className="text-xs text-learnly-muted">
              {formatNumber(course.enrolled)} learners
            </span>
            <span className="text-sm font-medium flex items-center gap-1 group-hover:text-learnly-primary transition-colors">
              View course
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
