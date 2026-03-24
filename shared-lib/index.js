// shared-lib/index.js

// Context
export { PersonalityProvider, usePersonality } from './context/PersonalityContext';

// Hooks
export { useInViewport } from './hooks/useInViewport';
export { useCounter } from './hooks/useCounter';
export { useActiveSection } from './hooks/useActiveSection';
export { useScrollProgress } from './hooks/useScrollProgress';
export { useScrollNav } from './hooks/useScrollNav';
export { useAnimationSequence } from './hooks/useAnimationSequence';
export { useIsOpen } from './hooks/useIsOpen';
export { useMediaQuery } from './hooks/useMediaQuery';
export { useToggle } from './hooks/useToggle';
export { useTabs } from './hooks/useTabs';
export { useLightbox } from './hooks/useLightbox';
export { useBeforeAfter } from './hooks/useBeforeAfter';
export { usePinnedScroll } from './hooks/usePinnedScroll';
export { useChapterScroll } from './hooks/useChapterScroll';
export { useHover } from './hooks/useHover';
export { useTypewriter } from './hooks/useTypewriter';

// Animation presets
export { presets, staggerVariants, fadeUpVariant, scaleRevealVariant, slideInVariant, clipRevealVariant } from './animations/presets';
export { heroSequences } from './animations/sequences';
export { fadeUp, fadeIn, slideInLeft, slideInRight, scaleUp, clipExpand } from './animations/entrances';
export { useParallaxY, useScaleReveal, useSectionMorph } from './animations/scroll';

// Primitives
export { default as Section } from './primitives/Section';
export { default as Container } from './primitives/Container';
export { default as Grid, BentoItem } from './primitives/Grid';
export { default as OakImage } from './primitives/OakImage';
export { default as FramedImage } from './primitives/FramedImage';
export { default as RevealImage } from './primitives/RevealImage';
export { default as StarRating } from './primitives/StarRating';
export { default as FloatingCTA } from './primitives/FloatingCTA';
export { default as OakWindFooter } from './primitives/OakWindFooter';
export { default as SkipLink } from './primitives/SkipLink';
export { default as AtmosphereKit } from './primitives/AtmosphereKit';
export { default as Input } from './primitives/Input';
export { default as Textarea } from './primitives/Textarea';
export { default as Select } from './primitives/Select';
export { default as FormButton } from './primitives/FormButton';
export { default as FormFeedback } from './primitives/FormFeedback';

// Loading
export { default as Skeleton } from './loading/Skeleton';
export { default as BlurUp } from './loading/BlurUp';
export { default as ImageError } from './loading/ImageError';

// Utils
export { cn } from './utils/cn';
export { slugify } from './utils/slugify';
export { formatPhone, telHref } from './utils/telLink';
export { formatHours } from './utils/formatHours';
export { initSmoothScroll, destroySmoothScroll } from './utils/smoothScroll';
