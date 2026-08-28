import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Quote } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import { TESTIMONIALS } from '../../data/courses.js'

export default function Testimonials() {
  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="mb-12 max-w-2xl">
          <p className="caption mb-4">Why people choose Learnly</p>
          <h2 className="heading-2">
            <BlurText text="Stories from people who moved forward." />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-learnly-line border border-learnly-line">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-learnly-paper p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <Quote size={28} className="text-learnly-primary mb-4" />
                <blockquote className="text-xl md:text-2xl font-medium tracking-tight leading-snug mb-6">
                  "{t.quote}"
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-learnly-line">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold tracking-tight">{t.name}</div>
                  <div className="text-sm text-learnly-muted">{t.role}</div>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="fill-learnly-ink text-learnly-ink" />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
