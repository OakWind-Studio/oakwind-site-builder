/**
 * @metadata
 * name: Asymmetric Storytelling
 * category: heroes
 * KEEP: Left-aligned content (55% width desktop), editorial layout with multi-line subtitle,
 *       decorative gradient orbs/shapes on right, no photo needed
 * CHANGE: Headline, subtitle paragraphs, trust indicators, CTA label
 * DON'T: Center-align the content, add a photo, remove the decorative elements
 */

import { motion } from 'motion/react';
import { Phone, Shield, Clock } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function AsymmetricStorytelling({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative bg-surface">
      {/* Decorative accent elements — right side */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: 'var(--color-accent)' }}
        />
        <div
          className="absolute bottom-1/3 right-[15%] w-[200px] h-[200px] rounded-full opacity-[0.05] blur-2xl"
          style={{ background: 'var(--color-accent-2, var(--color-accent))' }}
        />
        <div
          className="absolute top-1/2 right-[8%] w-24 h-24 rotate-45 opacity-[0.06]"
          style={{ border: '2px solid var(--color-accent)' }}
        />
      </div>

      <Container maxWidth="xl" className="relative z-10 flex items-center min-h-screen pt-24 pb-16">
        <div className="w-full md:w-[55%]">
          <motion.div
            className="mb-4 flex items-center gap-2"
            initial={seq.badge.initial}
            animate={seq.badge.animate}
            transition={seq.badge.transition}
          >
            <StarRating rating={reviews?.average || 5} size={16} count={reviews?.count} showCount />
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
            initial={seq.headline.initial}
            animate={seq.headline.animate}
            transition={seq.headline.transition}
          >
            {copy?.headline}
          </motion.h1>

          {/* Multi-line subtitle — the story */}
          <motion.div
            className="mt-6 space-y-3 max-w-xl"
            initial={seq.subtext.initial}
            animate={seq.subtext.animate}
            transition={seq.subtext.transition}
          >
            <p className="text-lg text-muted font-body leading-relaxed">
              {copy?.subtext}
            </p>
            {copy?.subtextLine2 && (
              <p className="text-base text-muted/80 font-body leading-relaxed">
                {copy.subtextLine2}
              </p>
            )}
          </motion.div>

          {/* Small trust indicators */}
          <motion.div
            className="mt-6 flex flex-wrap gap-4"
            initial={seq.trust.initial}
            animate={seq.trust.animate}
            transition={seq.trust.transition}
          >
            <span className="flex items-center gap-1.5 text-sm text-muted font-body">
              <Shield className="w-4 h-4 text-accent" />
              {copy?.trust1 || 'Licensed & Insured'}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted font-body">
              <Clock className="w-4 h-4 text-accent" />
              {copy?.trust2 || 'Same-Day Service'}
            </span>
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
              {copy?.cta || 'Free Consultation'}
            </a>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
