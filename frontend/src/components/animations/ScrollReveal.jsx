import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/**
 * ScrollReveal - reveals children with a clip-path / opacity as it enters the viewport.
 *
 * Usage:
 *   <ScrollReveal><h2>Section title</h2></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  once = true,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 30%'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [y, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y: translateY }}
      transition={{ delay }}
      className={cn('scroll-reveal', className)}
    >
      {children}
    </motion.div>
  )
}
