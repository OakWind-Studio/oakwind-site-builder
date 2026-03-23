/**
 * @metadata
 * name: Bold Condensed Hero
 * category: heroes
 * KEEP: Oversized condensed uppercase type, high contrast dark bg + bright accent text,
 *       color block accent behind part of headline, minimal content — headline + CTA only
 * CHANGE: Headline text, accent color, CTA label
 * DON'T: Add lots of extra content, use lowercase, reduce headline weight/size, lighten bg
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function BoldCondensedHero({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  // Split headline into accent part and rest
  const headlineParts = copy?.headlineParts || {
    before: copy?.headline?.split(' ').slice(0, 2).join(' ') || 'We Build',
    accent: copy?.headline?.split(' ').slice(2, 4).join(' ') || 'Your Dream',
    after: copy?.headline?.split(' ').slice(4).join(' ') || '',
  };

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" aria-hidden="true" />

      <Container maxWidth="xl" className="relative z-10 flex flex-col justify-center min-h-screen pt-24 pb-16">
        {/* Trust — small and out of the way */}
        <motion.div
          className="mb-6"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          <StarRating rating={reviews?.average || 5} size={14} count={reviews?.count} showCount />
        </motion.div>

        {/* Massive condensed headline */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] uppercase tracking-tight"
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {headlineParts.before && (
            <span className="block">{headlineParts.before}</span>
          )}
          {headlineParts.accent && (
            <span className="relative inline-block">
              {/* Color block accent behind text */}
              <span
                className="absolute -inset-x-3 inset-y-0 -skew-x-3 z-0"
                style={{ backgroundColor: 'var(--color-accent)' }}
                aria-hidden="true"
              />
              <span className="relative z-10">{headlineParts.accent}</span>
            </span>
          )}
          {headlineParts.after && (
            <span className="block">{headlineParts.after}</span>
          )}
        </motion.h1>

        {/* Minimal subtext */}
        <motion.p
          className="mt-6 text-lg text-white/50 font-body max-w-md"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-bold text-lg uppercase tracking-wider hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Call Now'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
