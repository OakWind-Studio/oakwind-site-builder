/**
 * @metadata
 * name: Split CTA Gallery
 * category: cta-breaks
 * KEEP: Text CTA on left (headline + subtitle + phone button), staggered photo grid
 *       on right (4 images in offset grid areas). Weight: hero. Split layout.
 * CHANGE: Headline copy, images, CTA label, subtitle
 * DON'T: Remove the phone CTA, make images full-width, drop the split layout
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, telHref, cn } from '../lib';

export default function SplitCtaGallery({ business, copy }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="cta-gallery" weight="hero" spacing="hero" animate="none">
      <Container maxWidth="xl" className="min-h-screen flex items-center py-20">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Text CTA side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              {copy?.headline || 'Ready to Get Started?'}
            </h2>
            <p className="mt-5 text-lg text-muted font-body max-w-lg leading-relaxed">
              {copy?.subtext || 'Give us a call today for a free consultation.'}
            </p>
            <a
              href={telHref(business.phone)}
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-xl hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {copy?.cta || 'Call Now'}
            </a>
          </motion.div>

          {/* Staggered photo grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4">
              <OakImage
                src={copy?.images?.[0]}
                alt={`${business.name} work 1`}
                aspect="3/4"
                className="rounded-2xl"
              />
              <OakImage
                src={copy?.images?.[1]}
                alt={`${business.name} work 2`}
                aspect="1/1"
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-4 mt-8">
              <OakImage
                src={copy?.images?.[2]}
                alt={`${business.name} work 3`}
                aspect="1/1"
                className="rounded-2xl"
              />
              <OakImage
                src={copy?.images?.[3]}
                alt={`${business.name} work 4`}
                aspect="3/4"
                className="rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
