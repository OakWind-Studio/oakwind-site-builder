import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from '../utils/smoothScroll';

export default function AtmosphereKit({ curtainDuration = 600 }) {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <>
      {/* Page entrance curtain */}
      <div
        className="fixed inset-0 z-[9999] bg-[var(--color-surface)] pointer-events-none animate-[curtainLift_var(--curtain-duration)_ease-out_forwards]"
        style={{ '--curtain-duration': curtainDuration + 'ms' }}
      />

      {/* Noise texture overlay */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
        style={{ opacity: 0.04 }}
        aria-hidden="true"
      >
        <filter id="oakwind-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#oakwind-noise)" />
      </svg>
    </>
  );
}
