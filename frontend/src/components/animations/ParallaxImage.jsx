import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/**
 * ParallaxImage - image that translates slower than scroll, creating depth.
 * Adapted from the components.md scroll animation patterns.
 *
 * Usage:
 *   <ParallaxImage src="..." alt="..." speed={0.3} className="..." />
 */
export default function ParallaxImage({
  src,
  alt = '',
  speed = 0.3,
  className = '',
  imgClassName = '',
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])

  return (
    <div ref={ref} className={cn('parallax-image', className)} style={{ overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.2 }}
        className={cn('parallax-img', imgClassName)}
        loading="lazy"
      />
    </div>
  )
}
