import { forwardRef, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils.js'
import './VariableProximity.css'

function useAnimationFrame(callback) {
  const lastRef = useRef(performance.now())
  const rafRef = useRef(null)
  useEffect(() => {
    const loop = (now) => {
      const dt = (now - lastRef.current) / 1000
      lastRef.current = now
      callback(dt, now)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [callback])
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const update = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      positionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    window.addEventListener('mousemove', update)
    return () => window.removeEventListener('mousemove', update)
  }, [containerRef])
  return positionRef
}

/**
 * VariableProximity - text font-weight morphs based on cursor proximity.
 * Creates a beautiful "interactive" typographic effect.
 *
 * Adapted from components.md - converted to plain JS.
 *
 * Usage:
 *   <VariableProximity label={'Learnly'} className="text-8xl" />
 */
const VariableProximity = forwardRef(({
  label = 'Learnly',
  className = '',
  fromFontVariationSettings = '"wght" 400, "wdth" 100',
  toFontVariationSettings = '"wght" 900, "wdth" 125',
  containerClassName = '',
  radius = 100,
  falloff = 'gaussian',
  onClick = null,
}, ref) => {
  const containerRef = useRef(null)
  const mousePositionRef = useMousePositionRef(containerRef)
  const letterRefs = useRef([])

  const interpolatedSettingsRef = useRef([])
  const renderedSettingsRef = useRef([])

  useAnimationFrame((_, now) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const mouse = mousePositionRef.current

    letterRefs.current.forEach((letterRef, i) => {
      if (!letterRef) return
      const rect = letterRef.getBoundingClientRect()
      const letterCenterX = rect.left - containerRect.left + rect.width / 2
      const letterCenterY = rect.top - containerRect.top + rect.height / 2
      const distance = Math.sqrt(
        Math.pow(mouse.x - letterCenterX, 2) + Math.pow(mouse.y - letterCenterY, 2)
      )

      let intensity
      if (falloff === 'linear') intensity = Math.max(0, 1 - distance / radius)
      else if (falloff === 'exponential')
        intensity = Math.max(0, Math.exp(-Math.pow(distance / (radius / 2), 2)))
      else intensity = Math.max(0, Math.exp(-Math.pow(distance / (radius / 2.5), 2)))

      interpolatedSettingsRef.current[i] = intensity
    })

    // Smooth easing
    letterRefs.current.forEach((_, i) => {
      const target = interpolatedSettingsRef.current[i] || 0
      const current = renderedSettingsRef.current[i] || 0
      renderedSettingsRef.current[i] = current + (target - current) * 0.15
    })

    // Apply
    const fromSettings = parseSettings(fromFontVariationSettings)
    const toSettings = parseSettings(toFontVariationSettings)

    letterRefs.current.forEach((letterRef, i) => {
      if (!letterRef) return
      const intensity = renderedSettingsRef.current[i] || 0
      const settings = []
      Object.keys(toSettings).forEach((key) => {
        const from = fromSettings[key] ?? 100
        const to = toSettings[key] ?? 100
        const value = from + (to - from) * intensity
        settings.push(`"${key}" ${value.toFixed(0)}`)
      })
      letterRef.style.fontVariationSettings = settings.join(', ')
    })
  })

  const letters = label.split('')

  return (
    <div
      ref={containerRef}
      className={cn('variable-proximity-container', containerClassName)}
      onClick={onClick}
    >
      <span className={cn('variable-proximity-text', className)}>
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            className="variable-proximity-letter"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </div>
  )
})

function parseSettings(str) {
  const result = {}
  const matches = str.matchAll(/"([^"]+)"\s+(\d+(?:\.\d+)?)/g)
  for (const m of matches) {
    result[m[1]] = parseFloat(m[2])
  }
  return result
}

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity
