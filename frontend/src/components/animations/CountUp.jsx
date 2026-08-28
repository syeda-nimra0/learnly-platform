import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/**
 * CountUp - animates a number from 0 (or from) to `end` when scrolled into view.
 * Adapted from components.md - converted to plain JS.
 *
 * Usage:
 *   <CountUp end={12500} suffix="+" />
 *   <CountUp end={4.7} decimals={1} suffix=" stars" />
 */
export default function CountUp({
  end = 0,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
  onComplete,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [value, setValue] = useState(start)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (inView && !hasStarted) setHasStarted(true)
  }, [inView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    let raf
    const startTime = performance.now()
    const ease = (t) => 1 - Math.pow(1 - t, 3) // ease-out cubic

    const tick = (now) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = ease(progress)
      const current = start + (end - start) * eased
      setValue(current)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        if (onComplete) onComplete()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, end, start, duration, onComplete])

  const formatted = () => {
    const fixed = value.toFixed(decimals)
    if (decimals === 0 && separator) {
      const [intPart] = fixed.split('.')
      return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    }
    return fixed
  }

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formatted()}
      {suffix}
    </span>
  )
}
