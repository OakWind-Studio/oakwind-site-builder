/**
 * @metadata
 * name: Parallax Depth Stack
 * category: heroes
 * KEEP: Three distinct parallax layers (bg slow, mid decorative medium, fg text fast),
 *       immersive depth effect, overflow hidden, scroll-driven motion
 * CHANGE: Background image, headline, subtext, CTA label, decorative element colors
 * DON'T: Remove layer speed differences, reduce to fewer than 3 layers, disable overflow hidden
 */

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, OakImage, StarRating } from '../lib';
import { useParallaxY, useAnimationSequence, telHref } from '../lib';

export default function ParallaxDepthStack({ business, copy, images, reviews }) {
  const sectionRef = useRef(null);
  const bgY = useParallaxY(sectionRef, 0.3);
  const midY = useParallaxY(sectionRef, 0.15);
  const fgY = useParallaxY(sectionRef, 0.05);
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" overflow="hidden">
      <div ref={sectionRef} className="relative min-h-screen">

        {/* Layer 1 — Background image (slowest) */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <OakImage
            src={images?.hero}
            alt=""
            loading="eager"
            className="w-full h-[130%] -mt-[15%]"
          />
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
          />
        </motion.div>

        {/* Layer 2 — Decorative elements (medium speed) */}
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ y: midY }}
          aria-hidden="true"
        >
          <div
            className="absolute top-[20%] left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full opacity-20 blur-xl"
            style={{ background: 'var(--color-accent)' }}
          />
          <div
            className="absolute bottom-[30%] right-[10%] w-24 h-24 md:w-36 md:h-36 rounded-full opacity-15 blur-lg"
            style={{ background: 'var(--color-accent-2, var(--color-accent))' }}
          />
          <div
            className="absolute top-[40%] right-[25%] w-px h-40 opacity-20"
            style={{ background: 'var(--color-accent)' }}
          />
        </motion.div>

        {/* Layer 3 — Foreground text (fastest) */}
        <motion.div className="relative z-[3]" style={{ y: fgY }}>
          <Container maxWidth="lg" className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
            <motion.h1
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl"
              initial={seq.headline.initial}
              animate={seq.headline.animate}
              transition={seq.headline.transition}
            >
              {copy?.headline}
            </motion.h1>

            <motion.p
              className="mt-4 md:mt-6 text-lg md:text-xl text-white/80 font-body max-w-2xl"
              initial={seq.subtext.initial}
              animate={seq.subtext.animate}
              transition={seq.subtext.transition}
            >
              {copy?.subtext}
            </motion.p>

            <motion.div
              className="mt-6"
              initial={seq.trust.initial}
              animate={seq.trust.animate}
              transition={seq.trust.transition}
            >
              <StarRating rating={reviews?.average || 5} size={18} count={reviews?.count} showCount />
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
                {copy?.cta || 'Get Started'}
              </a>
            </motion.div>
          </Container>
        </motion.div>
      </div>
    </Section>
  );
}
