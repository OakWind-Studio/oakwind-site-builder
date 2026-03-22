import { cn } from '../utils/cn';

function Star({ fill = 'full', size }) {
  const fillColor = 'var(--color-accent)';
  const emptyColor = 'var(--color-border)';

  if (fill === 'full') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (fill === 'half') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor={fillColor} />
            <stop offset="50%" stopColor={emptyColor} />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#halfStar)"
        />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={emptyColor} aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function StarRating({
  rating,
  size = 16,
  count,
  showCount = false,
  className,
}) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} fill="full" size={size} />);
    } else if (rating >= i - 0.5) {
      stars.push(<Star key={i} fill="half" size={size} />);
    } else {
      stars.push(<Star key={i} fill="empty" size={size} />);
    }
  }

  return (
    <div className={cn('flex items-center gap-0.5', className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {stars}
      {showCount && count != null && (
        <span className="ml-1.5 text-sm" style={{ color: 'var(--color-muted)' }}>
          ({count} reviews)
        </span>
      )}
    </div>
  );
}
