import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils.js'
import { lerp } from '../../lib/utils.js'

/**
 * Crosshair - custom cursor that follows the mouse with smooth lerp.
 * Two lines (horizontal + vertical) cross at the cursor position.
 *
 * Adapted from components.md - simplified, no library deps.
 *
 * Usage:
 *   <Crosshair color="#80B7FA" />
 */
export default function Crosshair({ color = '#80B7FA', containerRef = null }) {
  const lineHRef = useRef(null)
  const lineVRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return
    setEnabled(true)

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: mouse.x, y: mouse.y }
    let raf

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const loop = () => {
      current.x = lerp(current.x, mouse.x, 0.18)
      current.y = lerp(current.y, mouse.y, 0.18)
      if (lineHRef.current) {
        lineHRef.current.style.transform = `translateY(${current.y}px)`
      }
      if (lineVRef.current) {
        lineVRef.current.style.transform = `translateX(${current.x}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={lineHRef}
        className="crosshair-line crosshair-horizontal"
        style={{ background: color }}
      />
      <div
        ref={lineVRef}
        className="crosshair-line crosshair-vertical"
        style={{ background: color }}
      />
    </>
  )
}
