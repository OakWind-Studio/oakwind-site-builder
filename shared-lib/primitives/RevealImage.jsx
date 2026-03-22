import { motion } from 'motion/react';
import { usePersonality } from '../context/PersonalityContext';
import { presets } from '../animations/presets';
import { cn } from '../utils/cn';

function buildTransition(timing) {
  if (timing.type === 'spring') {
    return { type: 'spring', stiffness: timing.stiffness, damping: timing.damping };
  }
  return { duration: timing.duration, ease: timing.ease };
}

const revealTypes = {
  clip: (timing, delay) => ({
    hidden: { opacity: 0, clipPath: 'inset(0 50% 0 50%)' },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0%)',
      transition: { ...buildTransition(timing), delay },
    },
  }),
  scale: (timing, delay) => ({
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...buildTransition(timing), delay },
    },
  }),
  blur: (timing, delay) => ({
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { ...buildTransition(timing), delay },
    },
  }),
};

export default function RevealImage({
  type = 'clip',
  delay = 0,
  once = true,
  className,
  children,
}) {
  const personality = usePersonality();
  const timing =
    presets[personality]?.sectionReveal || presets.calmFormal.sectionReveal;

  const getVariant = revealTypes[type] || revealTypes.clip;
  const variant = getVariant(timing, delay);

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
    >
      {children}
    </motion.div>
  );
}
