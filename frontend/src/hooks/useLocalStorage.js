import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage - persists state to localStorage.
 * JSON-serialized. Falls back gracefully if localStorage is unavailable.
 *
 * Usage:
 *   const [theme, setTheme] = useLocalStorage('theme', 'light')
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore quota / privacy mode errors
    }
  }, [key, value])

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
    setValue(initialValue)
  }, [key, initialValue])

  return [value, setValue, remove]
}
