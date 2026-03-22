import { cn } from '../utils/cn';

export default function Skeleton({ width, height, rounded = false, className }) {
  return (
    <div
      className={cn(
        'animate-pulse',
        rounded ? 'rounded-full' : 'rounded',
        className
      )}
      style={{
        width,
        height,
        background: `linear-gradient(
          90deg,
          var(--color-border) 25%,
          color-mix(in srgb, var(--color-border) 60%, transparent) 50%,
          var(--color-border) 75%
        )`,
        backgroundSize: '200% 100%',
        animation: 'pulse 2s ease-in-out infinite, shimmer 2s ease-in-out infinite',
      }}
    />
  );
}
