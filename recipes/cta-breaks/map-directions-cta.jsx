/**
 * @metadata
 * name: Map Directions CTA
 * category: cta-breaks
 * KEEP: Mini map preview (or decorative map bg) + "Get Directions" link + phone CTA.
 *       For local discovery. Split layout with map visual on one side, CTA on other.
 * CHANGE: Address, map styling, CTA copy, directions link
 * DON'T: Remove the phone CTA, drop the map visual, remove the directions link
 */

import { motion } from 'motion/react';
import { Phone, MapPin, Navigation, Clock } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, telHref, cn } from '../lib';

export default function MapDirectionsCta({ business, copy }) {
  const [ref, inView] = useInViewport();
  const address = business.address || copy?.address || '';
  const mapsUrl = copy?.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <Section id="cta-directions" spacing="default" animate="none">
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[var(--color-border)]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Map visual side */}
          <div className="relative bg-[var(--color-surface-elevated)] min-h-[280px]">
            {/* Decorative map pattern */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
              </svg>
            </div>

            {/* Pin icon centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MapPin className="w-12 h-12 mx-auto" style={{ color: 'var(--color-accent)' }} />
                </motion.div>
                <p className="mt-3 text-sm font-body text-text-primary font-medium max-w-[200px]">
                  {address || business.name}
                </p>
              </div>
            </div>
          </div>

          {/* CTA side */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-[var(--color-surface)]">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {copy?.headline || 'Come Visit Us'}
            </h2>

            <p className="mt-4 text-muted font-body leading-relaxed">
              {copy?.subtext || "We'd love to see you in person. Stop by or give us a call."}
            </p>

            {/* Hours snippet */}
            {copy?.hours && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted font-body">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{copy.hours}</span>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={telHref(business.phone)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[var(--color-accent)] text-white font-semibold shadow-lg hover:brightness-110 transition-all"
              >
                <Phone className="w-5 h-5" />
                {copy?.cta || 'Call Now'}
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border-2 border-[var(--color-border)] text-text-primary font-semibold hover:border-[var(--color-accent)] transition-all"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
