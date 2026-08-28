import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, GraduationCap, Landmark } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'

const SOLUTIONS = [
  {
    id: 'business',
    label: 'For Business',
    title: 'Close team skill gaps for what is next',
    description:
      'Unlock top team training with 30% off and build the skills to be ready for your busy season.',
    cta: 'Try Learnly for Business',
    to: '/business',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    discount: '30% off team training',
  },
  {
    id: 'universities',
    label: 'For Universities',
    title: 'Give your students world-class courses, credited',
    description:
      'Bring 350+ leading industry courses into your curriculum with credit transfer and faculty tools.',
    cta: 'Learn about campus plans',
    to: '/universities',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    discount: 'Credit-eligible',
  },
  {
    id: 'government',
    label: 'For Government',
    title: 'Train a workforce ready for the next decade',
    description:
      'Scale workforce development programs with secure, measurable, AI-assisted learning pathways.',
    cta: 'See government solutions',
    to: '/government',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80',
    discount: 'Workforce-scale',
  },
]

export default function LearningSolutions() {
  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="mb-12 max-w-2xl">
          <p className="caption mb-4">Learning for everyone</p>
          <h2 className="heading-2">
            <BlurText text="Built for individuals, teams, campuses, and nations." />
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-learnly-line border border-learnly-line">
          {SOLUTIONS.map((sol, i) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-learnly-paper"
            >
              <Link to={sol.to} className="block group">
                <div className="relative aspect-[16/10] overflow-hidden bg-learnly-mist">
                  <img
                    src={sol.image}
                    alt={sol.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-learnly-paper/95 backdrop-blur-sm text-xs font-medium tracking-tight">
                      <sol.icon size={14} />
                      {sol.label}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs font-medium bg-learnly-ink text-learnly-paper px-3 py-1.5">
                      {sol.discount}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight mb-3 leading-tight">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-learnly-muted leading-relaxed mb-6">
                    {sol.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium border-b border-learnly-ink pb-1 group-hover:text-learnly-primary group-hover:border-learnly-primary transition-colors">
                    {sol.cta}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
