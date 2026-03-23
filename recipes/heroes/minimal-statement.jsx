/**
 * @metadata
 * name: Minimal Statement
 * category: heroes
 * KEEP: Maximum whitespace, single massive headline (text-7xl+), one-line subtitle,
 *       tiny trust indicators near bottom, CTA as subtle link not button. Restraint IS the design.
 * CHANGE: Headline, subtitle, trust text, link label
 * DON'T: Add images, add more content blocks, make CTA a big button, reduce headline size
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function MinimalStatement({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="bg-surface">
      <Container maxWidth="xl" className="flex flex-col justify-center min-h-screen pt-24 pb-16">

        {/* Massive headline — the hero IS the typography */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-text-primary leading-[0.95] tracking-tight"
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {copy?.headline}
        </motion.h1>

        {/* Single-line subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-lg md:text-xl text-muted font-body"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        {/* Subtle CTA link — not a button */}
        <motion.div
          className="mt-8"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 text-accent font-body font-medium text-base hover:underline underline-offset-4 transition-all"
          >
            <Phone className="w-4 h-4" />
            {copy?.cta || 'Get in touch'}
          </a>
        </motion.div>

        {/* Spacer pushes trust to bottom area */}
        <div className="flex-1 min-h-16" />

        {/* Tiny trust indicators near bottom */}
        <motion.div
          className="flex flex-wrap items-center gap-4 text-xs text-muted/60 font-body"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          <StarRating rating={reviews?.average || 5} size={12} count={reviews?.count} showCount />
          <span className="w-px h-3 bg-border" aria-hidden="true" />
          <span>{copy?.trust1 || `Serving ${business.city || 'your area'}`}</span>
          <span className="w-px h-3 bg-border" aria-hidden="true" />
          <span>{copy?.trust2 || `Est. ${business.established || '2005'}`}</span>
        </motion.div>
      </Container>
    </Section>
  );
}
