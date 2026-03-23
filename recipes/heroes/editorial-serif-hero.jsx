/**
 * @metadata
 * name: Editorial Serif Hero
 * category: heroes
 * KEEP: Elegant serif headline at massive size, generous line-height, thin accent line
 *       separator, subtitle in sans-serif, refined editorial spacing, light background
 * CHANGE: Headline, subtitle, separator color, CTA label
 * DON'T: Use a dark background, switch to sans-serif headline, reduce whitespace
 */

import { motion } from 'motion/react';
import { Phone, ArrowRight } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function EditorialSerifHero({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="bg-surface">
      <Container maxWidth="lg" className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
        {/* Small business identifier */}
        <motion.p
          className="text-xs tracking-[0.35em] uppercase font-body text-muted mb-8 md:mb-12"
          initial={seq.badge.initial}
          animate={seq.badge.animate}
          transition={seq.badge.transition}
        >
          {business.name}
        </motion.p>

        {/* Elegant serif headline — massive with generous line-height */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-text-primary leading-[1.15] md:leading-[1.2] max-w-5xl"
          style={{ fontWeight: 400 }}
          initial={seq.headline.initial}
          animate={seq.headline.animate}
          transition={seq.headline.transition}
        >
          {copy?.headline}
        </motion.h1>

        {/* Thin accent line separator */}
        <motion.div
          className="mt-8 md:mt-10 w-16 h-[1px] mx-auto origin-center"
          style={{ backgroundColor: 'var(--color-accent)' }}
          initial={seq.separator.initial}
          animate={seq.separator.animate}
          transition={seq.separator.transition}
        />

        {/* Subtitle in sans-serif — refined contrast */}
        <motion.p
          className="mt-6 md:mt-8 text-base md:text-lg text-muted font-body max-w-lg leading-relaxed"
          initial={seq.subtext.initial}
          animate={seq.subtext.animate}
          transition={seq.subtext.transition}
        >
          {copy?.subtext}
        </motion.p>

        {/* Star rating */}
        <motion.div
          className="mt-6"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          <StarRating rating={reviews?.average || 5} size={16} count={reviews?.count} showCount className="justify-center" />
        </motion.div>

        {/* Dual CTAs — primary phone + secondary text link */}
        <motion.div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold shadow-lg hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Schedule a Consultation'}
          </a>
          {copy?.ctaSecondary && (
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 text-accent font-body font-medium hover:underline underline-offset-4 transition-all"
            >
              {copy.ctaSecondary}
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
