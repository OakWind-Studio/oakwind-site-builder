// Named Motion variant objects for direct motion.div usage
// Standalone — no personality dependency

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

export const clipExpand = {
  hidden: { opacity: 0, clipPath: 'inset(0 50% 0 50%)' },
  visible: { opacity: 1, clipPath: 'inset(0 0% 0 0%)' },
};
