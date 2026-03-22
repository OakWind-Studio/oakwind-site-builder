import { useState } from 'react';
import { cn } from '../utils/cn';
import Skeleton from '../loading/Skeleton';
import ImageError from '../loading/ImageError';

export default function OakImage({
  src,
  alt,
  aspect,
  loading = 'lazy',
  fallback = 'placeholder',
  className,
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn('relative overflow-hidden', className)}
        style={aspect ? { aspectRatio: aspect } : undefined}
      >
        {fallback === 'skeleton' ? (
          <Skeleton width="100%" height="100%" />
        ) : (
          <ImageError alt={alt} />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {!loaded && (
        <div className="absolute inset-0">
          {fallback === 'skeleton' ? (
            <Skeleton width="100%" height="100%" />
          ) : (
            <div
              className="w-full h-full"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
          )}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn(
          'object-cover w-full h-full transition-all duration-700',
          loaded
            ? 'blur-0 scale-100 opacity-100'
            : 'blur-md scale-105 opacity-0'
        )}
      />
    </div>
  );
}
