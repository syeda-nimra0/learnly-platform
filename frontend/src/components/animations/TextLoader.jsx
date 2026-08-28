import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils.js'

/**
 * TextLoader - displays a string with a shimmering/blinking loading effect.
 * Adapted from components.md - converted to plain JS.
 *
 * Usage:
 *   <TextLoader text="Learnly is thinking" />
 */
export default function TextLoader({
  text = 'Loading',
  className = '',
  dotClassName = '',
  duration = 1200,
}) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const i = setInterval(() => setPhase((p) => (p + 1) % 4), duration / 4)
    return () => clearInterval(i)
  }, [duration])

  return (
    <span className={cn('text-loader', className)}>
      {text}
      <span className="text-loader-dots">
        <span className={cn('text-loader-dot', phase >= 1 && 'is-on', dotClassName)}>.</span>
        <span className={cn('text-loader-dot', phase >= 2 && 'is-on', dotClassName)}>.</span>
        <span className={cn('text-loader-dot', phase >= 3 && 'is-on', dotClassName)}>.</span>
      </span>
    </span>
  )
}
