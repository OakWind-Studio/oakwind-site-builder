/**
 * @metadata
 * name: Cinematic Fullbleed
 * category: heroes
 * KEEP: Full-screen bg image + gradient overlay structure, staggered entrance sequence,
 *       scroll indicator at bottom, trust strip below CTA
 * CHANGE: Headline copy, subtext, CTA label, trust items, image source
 * DON'T: Remove the gradient overlay, change the entrance order, drop the scroll indicator
 */

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, OakImage, StarRating } from '../lib';
import { useAnimationSequence, telHref, cn } from '../lib';

export default function CinematicFullbleed({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative">
      {/* Background image layer */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={seq.bg.initial}
        animate={seq.bg.animate}
        transition={seq.bg.transition}
      >
        <OakImage
          src={images?.hero}
          alt={`${business.name} hero`}
          aspect="16/9"
          loading="eager"
          className="w-full h-full"
        />
        {/* Gradient overlay — bottom-to-top dark */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 100%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <Container maxWidth="lg" className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16 text-center">
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight max-w-4xl"
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
          initial={seq.cta.initial}
          animate={seq.cta.animate}
          transition={seq.cta.transition}
        >
          <a
            href={telHref(business.phone)}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Call Now'}
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6"
          initial={seq.trust.initial}
          animate={seq.trust.animate}
          transition={seq.trust.transition}
        >
          <StarRating rating={reviews?.average || 5} size={18} count={reviews?.count} showCount />
          {copy?.trustItems?.map((item, i) => (
            <span key={i} className="text-sm text-white/70 font-body">
              {item}
            </span>
          ))}
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </Section>
  );
}
