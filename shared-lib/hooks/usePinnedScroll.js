import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

export function usePinnedScroll(stepCount = 3) {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const step = Math.min(Math.floor(value * stepCount), stepCount - 1);
    setActiveStep(step);
  });

  return { containerRef, activeStep, scrollYProgress };
}
