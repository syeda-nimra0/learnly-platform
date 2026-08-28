import { useState, useEffect } from 'react'

/**
 * useScrollPosition - returns the current window scroll Y position.
 * Uses passive listener + requestAnimationFrame throttling for performance.
 *
 * Usage:
 *   const scrollY = useScrollPosition()
 *   const isScrolled = scrollY > 20
 */
export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    setScrollY(window.scrollY)
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return scrollY
}
