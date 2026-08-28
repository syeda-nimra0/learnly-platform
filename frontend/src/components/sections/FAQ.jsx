import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'
import { FAQS } from '../../data/courses.js'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-padding border-b border-learnly-line">
      <div className="container-learnly">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="caption mb-4">Frequently asked questions</p>
            <h2 className="heading-3 mb-6">
              <BlurText text="Answers, before you ask." />
            </h2>
            <p className="body-default">
              Still have questions? Ask Learnly AI in the chat bubble, or browse our full help
              center.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-learnly-line">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i
                return (
                  <div key={i} className="border-b border-learnly-line">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                    >
                      <span className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-learnly-primary transition-colors">
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 mt-1.5">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-base text-learnly-muted leading-relaxed pb-6 pr-12">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
