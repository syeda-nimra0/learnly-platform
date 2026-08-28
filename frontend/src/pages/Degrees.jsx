import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Building2 } from 'lucide-react'
import BlurText from '../components/animations/BlurText.jsx'

const DEGREES = [
  {
    id: 'msc-data',
    title: 'Master of Science in Data Analytics Engineering',
    provider: 'Northeastern University',
    category: 'Job ready',
    duration: '24 months',
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80',
  },
  {
    id: 'bsc-cs',
    title: 'Bachelor of Science in Computer Science',
    provider: 'University of London',
    category: 'Job ready',
    duration: '36 months',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  },
  {
    id: 'msc-eng',
    title: 'Master of Advanced Study in Engineering',
    provider: 'University of California, Berkeley',
    category: 'Job ready',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
  },
  {
    id: 'bsc-ds',
    title: 'BSc Data Science',
    provider: 'University of Huddersfield',
    category: 'Job ready',
    duration: '36 months',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
  {
    id: 'mba',
    title: 'Master of Business Administration',
    provider: 'Illinois Tech',
    category: 'Job ready',
    duration: '24 months',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  },
  {
    id: 'msc-ds-illinois',
    title: 'Master of Data Science',
    provider: 'Illinois Tech',
    category: 'Job ready',
    duration: '24 months',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
]

export default function Degrees() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-learnly">
        <div className="mb-12 max-w-3xl">
          <p className="caption mb-3">Earn Your Degree</p>
          <h1 className="heading-1 mb-4">
            <BlurText text="Degrees from world-class universities." />
          </h1>
          <p className="body-large">
            Earn credit towards a recognized degree from leading universities. Learnly course
            completions can be credited towards these programs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEGREES.map((deg, i) => (
            <motion.div
              key={deg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/explore" className="group block border border-learnly-line hover:border-learnly-ink transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden bg-learnly-mist">
                  <img
                    src={deg.image}
                    alt={deg.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-xs px-2 py-1 bg-learnly-ink text-learnly-paper">
                    {deg.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-xs text-learnly-muted">
                    <Building2 size={12} />
                    {deg.provider}
                  </div>
                  <h3 className="font-semibold text-lg tracking-tight mb-2 leading-snug">
                    {deg.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-learnly-muted">
                    <span>{deg.duration}</span>
                    <span className="flex items-center gap-1 font-medium text-learnly-ink group-hover:text-learnly-primary transition-colors">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Credit note */}
        <div className="mt-16 p-8 bg-learnly-mist border border-learnly-line">
          <div className="flex items-start gap-4">
            <GraduationCap size={28} className="text-learnly-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg tracking-tight mb-2">
                Earn credit towards a degree
              </h3>
              <p className="text-sm text-learnly-muted leading-relaxed">
                Your enrollment in any Learnly Professional Certificate is eligible for college
                credit towards these degrees. If you complete the certificate and are admitted
                into the program, you can transfer your credit. Each university determines the
                number of pre-approved prior learning credits that may count towards the degree
                requirements according to institutional policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
