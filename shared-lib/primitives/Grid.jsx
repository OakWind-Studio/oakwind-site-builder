import { Children, cloneElement, isValidElement } from 'react';
import { cn } from '../utils/cn';

export default function Grid({
  variant = 'uniform',
  cols = 3,
  gap = 'gap-6',
  className,
  children,
}) {
  if (variant === 'bento') {
    return (
      <div
        className={cn(
          'grid grid-cols-4 md:grid-cols-12 auto-rows-auto',
          gap,
          className
        )}
      >
        {children}
      </div>
    );
  }

  if (variant === 'zigzag') {
    return (
      <div className={cn('flex flex-col', gap, className)}>
        {Children.map(children, (child, i) => (
          <div
            className={cn(
              'flex flex-col md:flex-row items-center',
              i % 2 !== 0 && 'md:flex-row-reverse',
              gap
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div
        className={cn(
          `grid grid-cols-1 md:grid-cols-${cols}`,
          gap,
          className
        )}
      >
        {Children.map(children, (child, i) => {
          if (i === 0 && isValidElement(child)) {
            return cloneElement(child, {
              className: cn(
                child.props.className,
                'md:col-span-2 md:row-span-2'
              ),
            });
          }
          return child;
        })}
      </div>
    );
  }

  // uniform (default)
  return (
    <div
      className={cn(
        `grid grid-cols-1 md:grid-cols-${cols}`,
        gap,
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoItem({ colSpan, rowSpan, className, children }) {
  return (
    <div
      className={cn(
        colSpan && `md:col-span-${colSpan}`,
        rowSpan && `md:row-span-${rowSpan}`,
        className
      )}
    >
      {children}
    </div>
  );
}
