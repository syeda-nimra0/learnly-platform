import { useState, useEffect } from 'react'

/**
 * useMediaQuery - returns true when the given CSS media query matches.
 * Useful for conditional rendering on mobile/desktop without Tailwind.
 *
 * Usage:
 *   const isMobile = useMediaQuery('(max-width: 768px)')
 *   const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
