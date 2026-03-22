import { cn } from '../utils/cn';

export default function Textarea({
  label,
  name,
  rows = 4,
  error,
  helper,
  required,
  touched,
  className,
  ...props
}) {
  const showError = touched && error;

  return (
    <div className={cn('relative', className)}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder=" "
        aria-invalid={showError ? 'true' : undefined}
        aria-describedby={
          showError ? `${name}-error` : helper ? `${name}-helper` : undefined
        }
        className={cn(
          'peer w-full px-4 pt-6 pb-2 rounded-lg border bg-transparent text-[var(--color-text)] outline-none transition-colors duration-200 resize-y min-h-[48px]',
          showError
            ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
            : 'border-[var(--color-border)] focus:border-[var(--input-focus,var(--color-accent))] focus:ring-2 focus:ring-[var(--input-focus,var(--color-accent))]/30'
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'absolute left-4 top-4 text-[var(--color-muted)] transition-all duration-200 pointer-events-none',
            'peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--input-focus,var(--color-accent))]',
            'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs'
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {showError && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
      {!showError && helper && (
        <p id={`${name}-helper`} className="mt-1 text-xs text-[var(--color-muted)]">
          {helper}
        </p>
      )}
    </div>
  );
}
