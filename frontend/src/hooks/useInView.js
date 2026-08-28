import { useCallback, useEffect, useState } from 'react'

/**
 * useInView - returns [ref, isInView]. Uses IntersectionObserver.
 * Useful for triggering animations when an element enters the viewport.
 *
 * Usage:
 *   const [ref, inView] = useInView({ threshold: 0.2 })
 *   <div ref={ref}>{inView ? 'visible' : 'hidden'}</div>
 */
export default function useInView(options = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options
  const [element, setElement] = useState(null)
  const [inView, setInView] = useState(false)

  const callbackRef = useCallback((node) => {
    setElement(node)
  }, [])

  useEffect(() => {
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [element, threshold, rootMargin, once])

  return [callbackRef, inView]
}
