import { useState, useRef, useEffect } from 'react';

export function useHover() {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return [ref, isHovered];
}
