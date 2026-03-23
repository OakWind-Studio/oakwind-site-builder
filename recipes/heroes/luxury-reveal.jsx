/**
 * @metadata
 * name: Luxury Reveal
 * category: heroes
 * KEEP: Theatrical clipPath entrance from center outward, elegant serif headline,
 *       soft gradient background, gold/accent accents, premium feel
 * CHANGE: Headline, subtext, CTA label, accent color
 * DON'T: Remove the clipPath reveal, use sans-serif for headline, speed up the entrance
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function LuxuryReveal({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative overflow-hidden">
      {/* Soft gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, var(--color-surface) 0%, var(--color-surface-elevated) 50%, var(--color-surface) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative accent lines */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[20%] left-[10%] w-px h-32 opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <div
          className="absolute bottom-[25%] right-[12%] w-px h-24 opacity-10"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 70%)' }}
        />
      </div>

      {/* Clip-path reveal wrapper */}
      <motion.div
        className="relative z-10"
        initial={{ clipPath: 'inset(0 50% 0 50%)' }}
        animate={{ clipPath: 'inset(0 0% 0 0%)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <Container maxWidth="md" className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
          {/* Elegant badge */}
          <motion.div
            className="mb-6"
            initial={seq.badge.initial}
            animate={seq.badge.animate}
            transition={seq.badge.transition}
          >
            <span
              className="inline-block px-5 py-1.5 text-xs tracking-[0.3em] uppercase font-body border"
              style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
            >
              {copy?.badge || business.tagline || 'Luxury Experience'}
            </span>
          </motion.div>

          {/* Elegant serif headline */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] tracking-tight"
            initial={seq.headline.initial}
            animate={seq.headline.animate}
            transition={seq.headline.transition}
          >
            {copy?.headline}
          </motion.h1>

          {/* Thin accent separator */}
          <motion.div
            className="mt-6 w-12 h-[1px] mx-auto origin-center"
            style={{ backgroundColor: 'var(--color-accent)' }}
            initial={seq.separator.initial}
            animate={seq.separator.animate}
            transition={seq.separator.transition}
          />

          <motion.p
            className="mt-6 text-lg text-muted font-body max-w-lg leading-relaxed"
            initial={seq.subtext.initial}
            animate={seq.subtext.animate}
            transition={seq.subtext.transition}
          >
            {copy?.subtext}
          </motion.p>

          <motion.div
            className="mt-5"
            initial={seq.trust.initial}
            animate={seq.trust.animate}
            transition={seq.trust.transition}
          >
            <StarRating rating={reviews?.average || 5} size={16} count={reviews?.count} showCount className="justify-center" />
          </motion.div>

          <motion.div
            className="mt-8"
            initial={seq.cta.initial}
            animate={seq.cta.animate}
            transition={seq.cta.transition}
          >
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {copy?.cta || 'Book Your Experience'}
            </a>
          </motion.div>
        </Container>
      </motion.div>
    </Section>
  );
}
