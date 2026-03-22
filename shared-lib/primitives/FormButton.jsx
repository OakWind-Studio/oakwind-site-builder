import { cn } from '../utils/cn';

export default function FormButton({
  children,
  loading = false,
  variant = 'primary',
  type = 'submit',
  className,
  disabled,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 h-14 px-8 rounded-lg font-semibold text-base transition-all duration-200',
        'hover:-translate-y-0.5 active:translate-y-0',
        variant === 'primary'
          ? 'bg-[var(--color-accent)] text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/20'
          : 'border-2 border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
        isDisabled && 'opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none',
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
