import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/**
 * MagneticButton - button that is attracted to the cursor when nearby.
 * Pure CSS + Framer Motion, no GSAP needed.
 *
 * Usage:
 *   <MagneticButton>Start learning</MagneticButton>
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  as: Tag = 'button',
  ...rest
}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setOffset({ x: x * strength, y: y * strength })
  }

  const onLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.4 }}
      className="inline-block"
    >
      <Tag className={cn('magnetic-button', className)} {...rest}>{children}</Tag>
    </motion.div>
  )
}
