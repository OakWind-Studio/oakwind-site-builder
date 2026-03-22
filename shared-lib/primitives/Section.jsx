import { Children, cloneElement, isValidElement } from 'react';
import { motion } from 'motion/react';
import { usePersonality } from '../context/PersonalityContext';
import {
  presets,
  staggerVariants,
  fadeUpVariant,
  scaleRevealVariant,
  slideInVariant,
  clipRevealVariant,
} from '../animations/presets';
import { cn } from '../utils/cn';

const spacingMap = {
  hero: 'py-24 md:py-0',
  generous: 'py-20 md:py-28',
  default: 'py-16 md:py-20',
  tight: 'py-10 md:py-12',
};

const bgMap = {
  surface: 'bg-[var(--color-surface)]',
  elevated: 'bg-[var(--color-surface-elevated)]',
  accent: 'bg-[var(--color-accent)] text-white',
  transparent: '',
};

function getVariant(animate, timing) {
  switch (animate) {
    case 'orchestrated':
    case 'fadeUp':
      return fadeUpVariant(timing);
    case 'stagger':
      return staggerVariants(timing).container;
    case 'scaleReveal':
      return scaleRevealVariant(timing);
    case 'clipReveal':
      return clipRevealVariant(timing);
    case 'slideIn':
      return slideInVariant(timing);
    default:
      return fadeUpVariant(timing);
  }
}

export default function Section({
  id,
  weight,
  animate = 'fadeUp',
  spacing = 'default',
  bg = 'transparent',
  bgImage,
  sticky = false,
  overflow = 'hidden',
  minHeight = 'auto',
  transitionTop = false,
  transitionBottom = false,
  className,
  children,
  as = 'section',
}) {
  const personality = usePersonality();
  // Use cardStagger timing for stagger animations (has staggerDelay),
  // sectionReveal timing for everything else
  const timing =
    animate === 'stagger'
      ? presets[personality]?.cardStagger || presets.calmFormal.cardStagger
      : presets[personality]?.sectionReveal || presets.calmFormal.sectionReveal;

  // When weight is 'whisper', it overrides spacing to provide extra breathing room
  const spacingCls = weight === 'whisper' ? '' : (spacingMap[spacing] || spacingMap.default);
  const bgCls = bgMap[bg] || '';

  const weightCls =
    weight === 'hero'
      ? 'min-h-screen'
      : weight === 'whisper'
        ? 'py-24 md:py-32 opacity-90'
        : '';

  const overflowCls = overflow === 'hidden' ? 'overflow-hidden' : '';

  const minHeightStyle =
    minHeight === 'auto'
      ? undefined
      : minHeight === 'screen'
        ? '100vh'
        : minHeight;

  const combinedCls = cn(
    'relative',
    spacingCls,
    bgCls,
    weightCls,
    overflowCls,
    className
  );

  // Background image layer
  const bgImageLayer = bgImage ? (
    <img
      src={bgImage}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
  ) : null;

  // Transition bridges
  const topBridge = transitionTop ? (
    <div
      className="absolute top-0 left-0 right-0 h-16 z-10"
      style={{
        background: `linear-gradient(to bottom, var(--color-surface), transparent)`,
      }}
    />
  ) : null;

  const bottomBridge = transitionBottom ? (
    <div
      className="absolute bottom-0 left-0 right-0 h-16 z-10"
      style={{
        background: `linear-gradient(to top, var(--color-surface), transparent)`,
      }}
    />
  ) : null;

  // Inner content wrapper for sticky
  const innerStyle = sticky ? { position: 'sticky', top: 0 } : undefined;

  // Build content
  const content = (
    <>
      {bgImageLayer}
      {topBridge}
      <div className="relative z-[1]" style={innerStyle}>
        {children}
      </div>
      {bottomBridge}
    </>
  );

  // No animation — plain element
  if (animate === 'none') {
    const Tag = as;
    return (
      <Tag
        id={id}
        className={combinedCls}
        style={minHeightStyle ? { minHeight: minHeightStyle } : undefined}
      >
        {content}
      </Tag>
    );
  }

  // Stagger variant — wrap each direct child with motion item
  if (animate === 'stagger') {
    const { container, item } = staggerVariants(timing);
    const MotionTag = motion[as] || motion.section;

    return (
      <MotionTag
        id={id}
        className={combinedCls}
        style={minHeightStyle ? { minHeight: minHeightStyle } : undefined}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        {bgImageLayer}
        {topBridge}
        <div className="relative z-[1]" style={innerStyle}>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;
            return (
              <motion.div variants={item}>
                {child}
              </motion.div>
            );
          })}
        </div>
        {bottomBridge}
      </MotionTag>
    );
  }

  // All other animated variants
  const variant = getVariant(animate, timing);
  const MotionTag = motion[as] || motion.section;

  return (
    <MotionTag
      id={id}
      className={combinedCls}
      style={minHeightStyle ? { minHeight: minHeightStyle } : undefined}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {content}
    </MotionTag>
  );
}
