import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils.js'

const VARIANTS = {
  primary: 'bg-learnly-ink text-learnly-paper hover:bg-learnly-primary hover:text-learnly-ink',
  secondary: 'border border-learnly-ink text-learnly-ink hover:bg-learnly-ink hover:text-learnly-paper',
  ghost: 'text-learnly-ink hover:bg-learnly-mist',
  accent: 'bg-learnly-primary text-learnly-ink hover:bg-learnly-secondary',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  ...rest
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
    VARIANTS[variant],
    SIZES[size],
    className
  )

  if (loading) {
    return (
      <button type="button" disabled className={classes} {...rest}>
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Loading...
      </button>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  )
}
