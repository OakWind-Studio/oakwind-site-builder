import { cn } from '../utils/cn';

export default function FramedImage({
  frame = 'none',
  className,
  children,
}) {
  if (frame === 'none') {
    return <div className={className}>{children}</div>;
  }

  if (frame === 'floating') {
    return (
      <div className={cn('relative', className)}>
        <div
          className="absolute inset-0 translate-x-3 translate-y-3 border-2 rounded-lg"
          style={{ borderColor: 'var(--color-accent)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 overflow-hidden rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    );
  }

  if (frame === 'warm-glow') {
    return (
      <div className={cn('relative', className)}>
        <div
          className="absolute -inset-2 rounded-xl opacity-40 blur-xl"
          style={{
            background:
              'radial-gradient(circle, var(--color-accent), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="relative z-10 overflow-hidden rounded-lg"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 24px color-mix(in srgb, var(--color-accent) 20%, transparent)',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  if (frame === 'corner-accent') {
    return (
      <div className={cn('relative p-3', className)}>
        {/* Top-left corner mark */}
        <div
          className="absolute top-0 left-0 w-6 h-6"
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-0 w-full h-[2px]"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          <div
            className="absolute top-0 left-0 h-full w-[2px]"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>
        {/* Bottom-right corner mark */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6"
          aria-hidden="true"
        >
          <div
            className="absolute bottom-0 right-0 w-full h-[2px]"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          <div
            className="absolute bottom-0 right-0 h-full w-[2px]"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          {children}
        </div>
      </div>
    );
  }

  // Fallback — same as none
  return <div className={className}>{children}</div>;
}
