import { useRef, useLayoutEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils.js'
import './ScrollVelocity.css'

function useElementWidth(ref) {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const update = () => {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    update()
    const ro = new ResizeObserver(update)
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ref])
  return width
}

/**
 * ScrollVelocity - text scrolls horizontally at a speed based on scroll velocity.
 * Two copies create a seamless marquee effect.
 *
 * Adapted from components.md - converted to plain JS.
 *
 * Usage:
 *   <ScrollVelocity baseVelocity={2}>Learnly AI</ScrollVelocity>
 */
export default function ScrollVelocity({
  children,
  baseVelocity = 2,
  className = '',
  wrapperClassName = '',
}) {
  const baseRef = useRef(null)
  const baseWidth = useElementWidth(baseRef)
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState(1)
  const lastScrollY = useRef(0)
  const x = useTransform(scrollY, (latest) => {
    const delta = latest - lastScrollY.current
    if (delta > 0.5) setScrollDirection(1)
    else if (delta < -0.5) setScrollDirection(-1)
    lastScrollY.current = latest
    const offset = (latest * baseVelocity) / 100
    return `${-offset % (baseWidth / 2)}px`
  })

  const copies = useMemo(() => [0, 1], [])

  return (
    <section className={cn('scroll-velocity-wrapper', wrapperClassName)}>
      <div className="scroll-velocity-track" style={{ x }}>
        {copies.map((i) => (
          <span
            key={i}
            ref={i === 0 ? baseRef : null}
            className={cn('scroll-velocity-text', className)}
          >
            {children}
          </span>
        ))}
      </div>
    </section>
  )
}
