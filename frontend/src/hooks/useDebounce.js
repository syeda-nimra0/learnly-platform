import { useState, useEffect } from 'react'

/**
 * useDebounce - delays updating a value until after `delay` ms of inactivity.
 * Used by the search input in Explore.jsx.
 *
 * Usage:
 *   const [query, setQuery] = useState('')
 *   const debouncedQuery = useDebounce(query, 300)
 *   useEffect(() => { search(debouncedQuery) }, [debouncedQuery])
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return debounced
}
