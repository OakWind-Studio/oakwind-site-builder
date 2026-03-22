import { useState, useEffect, useRef } from 'react';

export function useCounter(end, duration = 2000, shouldStart = true) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldStart || !end) return;
    const startTime = performance.now();
    const startValue = 0;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (end - startValue) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [shouldStart, end, duration]);

  return count;
}
