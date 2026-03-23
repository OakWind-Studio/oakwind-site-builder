/**
 * @metadata
 * name: Dark Split Hero
 * category: heroes
 * KEEP: Dark background, split layout with large photo on one side (RevealImage with clip),
 *       text content on the other, accent glow behind photo, moody premium feel
 * CHANGE: Photo, headline, subtext, CTA label, which side gets the photo
 * DON'T: Lighten the background, remove the accent glow, make photo small
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, RevealImage, OakImage, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function DarkSplitHero({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative" style={{ backgroundColor: '#0F0F0F' }}>
      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise opacity-[0.02] pointer-events-none" aria-hidden="true" />

      <Container maxWidth="xl" className="relative z-10 min-h-screen flex items-center pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

          {/* Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              className="mb-4"
              initial={seq.badge.initial}
              animate={seq.badge.animate}
              transition={seq.badge.transition}
            >
              <span className="inline-block text-xs tracking-[0.25em] uppercase text-accent font-body">
                {copy?.badge || business.tagline}
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={seq.headline.initial}
              animate={seq.headline.animate}
              transition={seq.headline.transition}
            >
              {copy?.headline}
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-white/60 font-body max-w-md mx-auto lg:mx-0"
              initial={seq.subtext.initial}
              animate={seq.subtext.animate}
              transition={seq.subtext.transition}
            >
              {copy?.subtext}
            </motion.p>

            <motion.div
              className="mt-5 flex items-center gap-2 justify-center lg:justify-start"
              initial={seq.trust.initial}
              animate={seq.trust.animate}
              transition={seq.trust.transition}
            >
              <StarRating rating={reviews?.average || 5} size={16} count={reviews?.count} showCount />
            </motion.div>

            <motion.div
              className="mt-8"
              initial={seq.cta.initial}
              animate={seq.cta.animate}
              transition={seq.cta.transition}
            >
              <a
                href={telHref(business.phone)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
              >
                <Phone className="w-5 h-5" />
                {copy?.cta || 'Book Now'}
              </a>
            </motion.div>
          </div>

          {/* Photo with reveal + accent glow */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={seq.bg.initial}
            animate={seq.bg.animate}
            transition={seq.bg.transition}
          >
            {/* Accent glow behind photo */}
            <div
              className="absolute -inset-4 rounded-2xl opacity-20 blur-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, var(--color-accent), transparent 70%)',
              }}
              aria-hidden="true"
            />
            <RevealImage type="clip" delay={0.3} className="relative z-10 rounded-xl">
              <OakImage
                src={images?.hero || images?.portrait}
                alt={business.name}
                aspect="4/5"
                loading="eager"
                className="rounded-xl"
              />
            </RevealImage>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
