import { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { cn } from '../../lib/utils.js'
import './CircularText.css'

/**
 * CircularText - rotates a string around a circle.
 * Adapted from components.md - converted to plain JS.
 *
 * Usage:
 *   <CircularText text="LEARNLY • AI POWERED LEARNING • " spinDuration={20} />
 */
export default function CircularText({
  text = 'LEARNLY • AI POWERED LEARNING • ',
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
}) {
  const controls = useAnimation()
  const rotation = useMotionValue(0)
  const hoverRef = useRef(false)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const animate = (now) => {
      const dt = (now - lastTimeRef.current) / 1000
      lastTimeRef.current = now
      let speed = 360 / spinDuration
      if (hoverRef.current) {
        if (onHover === 'speedUp') speed *= 4
        else if (onHover === 'slowDown') speed *= 0.25
        else if (onHover === 'pause') speed = 0
      }
      rotation.set((rotation.get() + speed * dt) % 360)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [spinDuration, onHover, rotation])

  const handleHoverStart = () => {
    hoverRef.current = true
  }
  const handleHoverEnd = () => {
    hoverRef.current = false
  }

  const chars = text.split('')

  return (
    <motion.div
      className={cn('circular-text-container', className)}
      style={{ rotate: rotation }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {chars.map((char, i) => {
        const angle = (i / chars.length) * 360
        return (
          <span
            key={i}
            className="circular-text-char"
            style={{
              transform: `rotate(${angle}deg) translateY(calc(-50% + 4px))`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
    </motion.div>
  )
}
