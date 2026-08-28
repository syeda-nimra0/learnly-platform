import { cn } from '../../lib/utils.js'

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-learnly-mist text-learnly-ink border border-learnly-line',
    primary: 'bg-learnly-primary text-learnly-ink',
    secondary: 'bg-learnly-secondary text-learnly-ink',
    dark: 'bg-learnly-ink text-learnly-paper',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium tracking-tight',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={cn('skeleton h-4 w-full', className)} />
}

export function Spinner({ size = 16, className = '' }) {
  return (
    <span
      className={cn(
        'inline-block border-2 border-current border-t-transparent rounded-full animate-spin',
        className
      )}
      style={{ width: size, height: size }}
    />
  )
}

export function Divider({ className = '', label = '' }) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4 my-6', className)}>
        <div className="flex-1 h-px bg-learnly-line" />
        <span className="text-xs uppercase tracking-widest text-learnly-muted">{label}</span>
        <div className="flex-1 h-px bg-learnly-line" />
      </div>
    )
  }
  return <div className={cn('h-px bg-learnly-line my-6', className)} />
}

export function EmptyState({ title, description, action, icon: Icon }) {
  return (
    <div className="text-center py-16 px-6">
      {Icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 border border-learnly-line mb-4">
          <Icon size={24} className="text-learnly-muted" />
        </div>
      )}
      <h3 className="heading-4 mb-2">{title}</h3>
      {description && <p className="body-default max-w-md mx-auto">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function Card({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={cn(
        'bg-learnly-paper border border-learnly-line transition-all duration-300',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
