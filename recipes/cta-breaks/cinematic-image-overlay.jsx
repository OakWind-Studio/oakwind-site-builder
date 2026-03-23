/**
 * @metadata
 * name: Cinematic Image Overlay
 * category: cta-breaks
 * KEEP: Full-bleed background image (OakImage) + dark gradient overlay + centered headline
 *       + CTA. Dramatic, cinematic. Weight: hero. Phone is primary action.
 * CHANGE: Background image, headline, CTA copy, overlay intensity
 * DON'T: Remove the gradient overlay, drop the background image, remove phone CTA
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, telHref, cn } from '../lib';

export default function CinematicImageOverlay({ business, copy }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="cta-cinematic" weight="hero" spacing="hero" animate="none" className="relative">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <OakImage
          src={copy?.bgImage}
          alt=""
          className="w-full h-full"
          loading="lazy"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <Container maxWidth="md" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center py-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
            {copy?.headline || 'Your Project Starts Here'}
          </h2>

          <p className="mt-6 text-lg md:text-xl text-white/80 font-body max-w-xl mx-auto">
            {copy?.subtext || 'Call today and take the first step toward something great.'}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {copy?.cta || 'Call Now'}
            </a>
            {copy?.secondaryCta && (
              <a
                href={copy.secondaryHref || '#contact'}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold text-lg hover:border-white/60 transition-all"
              >
                {copy.secondaryCta}
              </a>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
