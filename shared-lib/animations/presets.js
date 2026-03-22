// Animation presets mapped to personality strings
// Consumed by Section primitive (via PersonalityContext) and hero entrance system

export const presets = {
  calmFormal: {
    sectionReveal: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    cardStagger: { staggerDelay: 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    hoverLift: {
      y: -6,
      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },

  calmCasual: {
    sectionReveal: { duration: 0.6, type: 'spring', stiffness: 200, damping: 20 },
    cardStagger: { staggerDelay: 0.1, duration: 0.6, type: 'spring', stiffness: 200, damping: 20 },
    hoverLift: {
      y: -5,
      boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
  },

  energeticBold: {
    sectionReveal: { duration: 0.4, type: 'spring', stiffness: 300, damping: 25 },
    cardStagger: { staggerDelay: 0.06, duration: 0.4, type: 'spring', stiffness: 300, damping: 25 },
    hoverLift: {
      y: -8,
      scale: 1.03,
      boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  },

  energeticCasual: {
    sectionReveal: { duration: 0.45, type: 'spring', stiffness: 260, damping: 22 },
    cardStagger: { staggerDelay: 0.07, duration: 0.45, type: 'spring', stiffness: 260, damping: 22 },
    hoverLift: {
      y: -7,
      scale: 1.02,
      boxShadow: '0 14px 36px rgba(0,0,0,0.13)',
      transition: { type: 'spring', stiffness: 260, damping: 22 },
    },
  },

  subtleElegant: {
    sectionReveal: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    cardStagger: { staggerDelay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    hoverLift: {
      y: -4,
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  },

  boldConfident: {
    sectionReveal: { duration: 0.35, type: 'spring', stiffness: 350, damping: 28 },
    cardStagger: { staggerDelay: 0.05, duration: 0.35, type: 'spring', stiffness: 350, damping: 28 },
    hoverLift: {
      y: -10,
      scale: 1.04,
      boxShadow: '0 20px 48px rgba(0,0,0,0.18)',
      transition: { type: 'spring', stiffness: 350, damping: 28 },
    },
  },

  traditionalWarm: {
    sectionReveal: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    cardStagger: { staggerDelay: 0.1, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    hoverLift: {
      y: -5,
      boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },

  modernClean: {
    sectionReveal: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    cardStagger: { staggerDelay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    hoverLift: {
      y: -6,
      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

// ---------------------------------------------------------------------------
// Variant factory helpers
// ---------------------------------------------------------------------------

function buildTransition(timing) {
  if (timing.type === 'spring') {
    return { type: 'spring', stiffness: timing.stiffness, damping: timing.damping };
  }
  return { duration: timing.duration, ease: timing.ease };
}

// Stagger container + item variants for card grids
export function staggerVariants(timing) {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: timing.staggerDelay ?? 0.1,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: buildTransition(timing),
      },
    },
  };
}

// Fade-up reveal for sections / blocks
export function fadeUpVariant(timing) {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: buildTransition(timing),
    },
  };
}

// Scale reveal (zoom-in feel)
export function scaleRevealVariant(timing) {
  return {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: buildTransition(timing),
    },
  };
}

// Horizontal slide-in (left or right)
export function slideInVariant(timing, direction = 'left') {
  const xOffset = direction === 'left' ? -60 : 60;
  return {
    hidden: { opacity: 0, x: xOffset },
    visible: {
      opacity: 1,
      x: 0,
      transition: buildTransition(timing),
    },
  };
}

// Clip-path reveal (curtain open from center)
export function clipRevealVariant(timing) {
  return {
    hidden: { clipPath: 'inset(0 50% 0 50%)' },
    visible: {
      clipPath: 'inset(0 0% 0 0%)',
      transition: buildTransition(timing),
    },
  };
}
