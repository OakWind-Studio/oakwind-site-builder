// Scroll-linked animation hooks
// Dependency: motion/react (installed at project scaffold time)

import { useScroll, useTransform } from 'motion/react';

// Parallax vertical offset driven by scroll position
export function useParallaxY(ref, strength = 0.2) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return useTransform(scrollYProgress, [0, 1], [strength * 100, strength * -100]);
}

// Scale + fade reveal as element scrolls into center
export function useScaleReveal(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  return {
    scale: useTransform(scrollYProgress, [0, 1], [0.85, 1]),
    opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
  };
}

// Color morph between two values driven by scroll
export function useSectionMorph(ref, fromColor, toColor) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return useTransform(scrollYProgress, [0, 1], [fromColor, toColor]);
}
