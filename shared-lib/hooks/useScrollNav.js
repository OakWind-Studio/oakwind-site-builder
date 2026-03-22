import { useState, useEffect } from 'react';

export function useScrollNav(threshold = 50) {
  const [state, setState] = useState({ scrolled: false, scrollY: 0 });

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setState({ scrolled: y > threshold, scrollY: y });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}
