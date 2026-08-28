import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import CourseCard from '../cards/CourseCard.jsx'
import { COURSES } from '../../data/courses.js'

/**
 * PopularCourses - horizontal scrolling row of courses.
 */
export default function PopularCourses({ title = 'Most popular certificates', filter }) {
  let courses = COURSES
  if (filter) courses = courses.filter(filter)
  const displayed = courses.slice(0, 6)

  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div className="max-w-2xl">
            <p className="caption mb-4">Popular right now</p>
            <h2 className="heading-2">
              <BlurText text={title} />
            </h2>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-learnly-ink pb-1 hover:text-learnly-primary hover:border-learnly-primary transition-colors"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
