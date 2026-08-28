import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/utils.js'

/**
 * BlurText - animates each word from blurred + offset to sharp + in place.
 * Adapted from components.md - converted to plain JS + Framer Motion.
 *
 * Usage:
 *   <BlurText text="Learn what matters, become who you want" as="h1" className="..." />
 */
export default function BlurText({
  text = '',
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 0.06,
  blur = 8,
  y = 12,
  once = true,
  ...rest
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const word = {
    hidden: { opacity: 0, filter: `blur(${blur}px)`, y },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={cn('inline-block', className)}
      {...rest}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="inline-block will-change-[transform,filter,opacity]"
          style={{ marginRight: '0.25em' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  )
}
