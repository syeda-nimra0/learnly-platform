/**
 * Local SVG icons that don't need a library import.
 * Used as fallback when lucide-react doesn't have what we need, or
 * for brand-specific marks.
 *
 * Usage:
 *   import { LearnlyMark } from '../assets/icons'
 *   <LearnlyMark className="h-8 w-8" />
 */

export function LearnlyMark({ className = '', size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Learnly"
    >
      <rect width="32" height="32" fill="#0A0A0A" />
      <path
        d="M8 22V10L16 18V10"
        stroke="#80B7FA"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path d="M20 10V22H24" stroke="#80B7FA" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  )
}

export function Spark({ className = '', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Arrow({ className = '', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 13L13 3M13 3H6M13 3V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function Check({ className = '', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M2 8L6 12L14 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}
