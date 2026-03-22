import { cn } from '../utils/cn';

export default function Select({
  label,
  name,
  options = [],
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
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={showError ? 'true' : undefined}
        aria-describedby={
          showError ? `${name}-error` : helper ? `${name}-helper` : undefined
        }
        className={cn(
          'peer w-full h-12 px-4 pt-5 pb-1 rounded-lg border bg-transparent text-[var(--color-text)] outline-none transition-colors duration-200 appearance-none cursor-pointer',
          showError
            ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
            : 'border-[var(--color-border)] focus:border-[var(--input-focus,var(--color-accent))] focus:ring-2 focus:ring-[var(--input-focus,var(--color-accent))]/30'
        )}
        {...props}
      >
        <option value="" disabled hidden>
          {' '}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Dropdown arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] transition-all duration-200 pointer-events-none',
            'peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[var(--input-focus,var(--color-accent))]',
            'peer-[:not(:has(option[value=""]:checked))]:top-2.5 peer-[:not(:has(option[value=""]:checked))]:translate-y-0 peer-[:not(:has(option[value=""]:checked))]:text-xs'
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
