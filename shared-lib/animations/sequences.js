// Hero entrance choreography per personality
// Consumed by useAnimationSequence hook

// ---------------------------------------------------------------------------
// Helper — builds per-slot animation configs with staggered delays
// ---------------------------------------------------------------------------

function buildTransition(delay, timing) {
  const base = { delay };
  if (timing.type === 'spring') {
    return { ...base, type: 'spring', stiffness: timing.stiffness, damping: timing.damping };
  }
  return { ...base, duration: timing.duration, ease: timing.ease };
}

function buildSequence(baseDelay, delayStep, timing) {
  const slots = ['bg', 'nav', 'badge', 'headline', 'separator', 'subtext', 'cta', 'trust'];
  const sequence = {};

  slots.forEach((slot, i) => {
    const delay = baseDelay + delayStep * i;
    const transition = buildTransition(delay, timing);

    if (slot === 'bg') {
      sequence[slot] = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition,
      };
    } else if (slot === 'badge') {
      sequence[slot] = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition,
      };
    } else if (slot === 'separator') {
      sequence[slot] = {
        initial: { scaleX: 0 },
        animate: { scaleX: 1 },
        transition,
      };
    } else {
      sequence[slot] = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition,
      };
    }
  });

  return sequence;
}

// ---------------------------------------------------------------------------
// Personality-specific hero sequences
// ---------------------------------------------------------------------------

export const heroSequences = {
  calmFormal: buildSequence(0.3, 0.12, {
    duration: 0.7,
    ease: [0.25, 0.46, 0.45, 0.94],
  }),

  calmCasual: buildSequence(0.2, 0.1, {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  }),

  energeticBold: buildSequence(0.1, 0.08, {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  }),

  energeticCasual: buildSequence(0.15, 0.08, {
    type: 'spring',
    stiffness: 260,
    damping: 22,
  }),

  subtleElegant: buildSequence(0.4, 0.15, {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  }),

  boldConfident: buildSequence(0.1, 0.06, {
    type: 'spring',
    stiffness: 350,
    damping: 28,
  }),

  traditionalWarm: buildSequence(0.3, 0.1, {
    duration: 0.65,
    ease: [0.25, 0.46, 0.45, 0.94],
  }),

  modernClean: buildSequence(0.2, 0.09, {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  }),
};
