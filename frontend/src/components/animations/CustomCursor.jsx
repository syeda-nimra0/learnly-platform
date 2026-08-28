import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils.js'
import { lerp } from '../../lib/utils.js'

/**
 * CustomCursor - dot + outline that follows the mouse, grows on hover over interactive elements.
 * Combines the TargetCursor + Crosshair concepts from components.md.
 *
 * Auto-disables on touch devices and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [isDown, setIsDown] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEnabled(true)

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let raf

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
      }
      const target = e.target
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor]'
      )
      if (interactive) {
        const cursorLabel = interactive.getAttribute('data-cursor-label')
        setLabel(cursorLabel || '')
        setIsHover(true)
      } else {
        setIsHover(false)
        setLabel('')
      }
    }
    const onDown = () => setIsDown(true)
    const onUp = () => setIsDown(false)
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const loop = () => {
      ring.x = lerp(ring.x, mouse.x, 0.18)
      ring.y = lerp(ring.y, mouse.y, 0.18)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHover ? 'is-hover' : ''} ${isDown ? 'is-down' : ''}`}
      >
        {label && <span className="custom-cursor-label">{label}</span>}
      </div>
    </>
  )
}
