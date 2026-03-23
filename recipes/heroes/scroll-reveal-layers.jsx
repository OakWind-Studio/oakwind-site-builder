/**
 * @metadata
 * name: Scroll Reveal Layers
 * category: heroes
 * KEEP: Three-speed parallax layers (bg 0.3, heading 0.5, CTA 1.0), content reveals
 *       on scroll, depth illusion, Section overflow hidden
 * CHANGE: Image, headline, subtext, CTA label
 * DON'T: Remove parallax speed differences, make all layers move at same speed
 */

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, OakImage, StarRating } from '../lib';
import { useParallaxY, useAnimationSequence, telHref } from '../lib';

export default function ScrollRevealLayers({ business, copy, images, reviews }) {
  const sectionRef = useRef(null);
  const bgY = useParallaxY(sectionRef, 0.3);
  const headingY = useParallaxY(sectionRef, 0.15);
  const seq = useAnimationSequence();

  return (
    <Section
      id="hero"
      weight="hero"
      spacing="hero"
      animate="none"
      overflow="hidden"
      className="relative bg-surface"
    >
      <div ref={sectionRef} className="relative min-h-screen">
        {/* Layer 1 — Background image (slowest) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY }}
          initial={seq.bg.initial}
          animate={seq.bg.animate}
          transition={seq.bg.transition}
        >
          <OakImage
            src={images?.hero}
            alt=""
            aspect="16/9"
            loading="eager"
            className="w-full h-[120%] -mt-[10%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, var(--color-surface) 5%, transparent 60%)',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Layer 2 — Heading (medium speed) */}
        <Container maxWidth="lg" className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-20 text-center">
          <motion.div style={{ y: headingY }}>
            <motion.h1
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight max-w-4xl drop-shadow-lg"
              initial={seq.headline.initial}
              animate={seq.headline.animate}
              transition={seq.headline.transition}
            >
              {copy?.headline}
            </motion.h1>

            <motion.p
              className="mt-4 md:mt-6 text-lg md:text-xl text-muted font-body max-w-2xl mx-auto"
              initial={seq.subtext.initial}
              animate={seq.subtext.animate}
              transition={seq.subtext.transition}
            >
              {copy?.subtext}
            </motion.p>
          </motion.div>

          {/* Layer 3 — CTA (fastest, stays with scroll) */}
          <motion.div
            className="mt-10"
            initial={seq.cta.initial}
            animate={seq.cta.animate}
            transition={seq.cta.transition}
          >
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {copy?.cta || 'Call Today'}
            </a>
          </motion.div>

          <motion.div
            className="mt-6"
            initial={seq.trust.initial}
            animate={seq.trust.animate}
            transition={seq.trust.transition}
          >
            <StarRating rating={reviews?.average || 5} size={18} count={reviews?.count} showCount />
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
