/**
 * @metadata
 * name: Video Ambient
 * category: heroes
 * KEEP: HTML5 video background (autoplay, muted, loop, playsinline), dark overlay,
 *       glass-card centered content, gradient fallback, prominent CTA
 * CHANGE: Video URL, headline, subtext, CTA label
 * DON'T: Remove video autoplay attributes, drop the fallback gradient, make card opaque
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useAnimationSequence, telHref } from '../lib';

export default function VideoAmbient({ business, copy, images, reviews }) {
  const seq = useAnimationSequence();
  const videoSrc = images?.video || null;

  return (
    <Section id="hero" weight="hero" spacing="hero" animate="none" className="relative bg-black">
      {/* Video background with gradient fallback */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={seq.bg.initial}
        animate={seq.bg.animate}
        transition={seq.bg.transition}
      >
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent) 0%, #1a1a2e 50%, #0a0a0a 100%)',
            }}
            aria-hidden="true"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </motion.div>

      {/* Glass card content */}
      <Container maxWidth="md" className="relative z-10 flex items-center justify-center min-h-screen pt-24 pb-16">
        <div
          className="w-full max-w-2xl rounded-2xl p-8 md:p-12 text-center"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={seq.headline.initial}
            animate={seq.headline.animate}
            transition={seq.headline.transition}
          >
            {copy?.headline}
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-white/75 font-body max-w-lg mx-auto"
            initial={seq.subtext.initial}
            animate={seq.subtext.animate}
            transition={seq.subtext.transition}
          >
            {copy?.subtext}
          </motion.p>

          <motion.div
            className="mt-4"
            initial={seq.trust.initial}
            animate={seq.trust.animate}
            transition={seq.trust.transition}
          >
            <StarRating rating={reviews?.average || 5} size={18} count={reviews?.count} showCount className="justify-center" />
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
      </Container>
    </Section>
  );
}
