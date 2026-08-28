import { cn } from '../../lib/utils.js'

export function Input({ label, error, className = '', id, ...rest }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="label-learnly">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'input-learnly',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', id, ...rest }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="label-learnly">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'input-learnly min-h-[120px] resize-y',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Select({ label, error, className = '', id, children, ...rest }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="label-learnly">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'input-learnly cursor-pointer',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...rest}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
