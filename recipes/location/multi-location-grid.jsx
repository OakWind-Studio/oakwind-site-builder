/**
 * @metadata
 * name: Multi-Location Grid
 * category: location
 * KEEP: Card grid of locations, each card has address/phone/hours/"Get Directions" link,
 *       staggered entrance, elevated cards, MapPin icons
 * CHANGE: Location data, card count, grid columns
 * DON'T: Remove direction links, flatten to list, drop phone links
 */

import { motion } from 'motion/react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, telHref, formatPhone, fadeUp } from '../lib';

export default function MultiLocationGrid({ business }) {
  const [ref, inView] = useInViewport();
  const locations = business.locations || [];

  return (
    <Section id="locations" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Locations
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, i) => {
            const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(loc.address || loc.name)}`;
            return (
              <motion.div
                key={i}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                  {loc.name}
                </h3>

                <div className="space-y-3 mb-4">
                  {loc.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-muted">{loc.address}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                    <a href={telHref(loc.phone || business.phone)} className="font-body text-sm text-muted hover:text-[var(--color-accent)] transition-colors">
                      {formatPhone(loc.phone || business.phone)}
                    </a>
                  </div>
                </div>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-body text-sm text-[var(--color-accent)] font-semibold hover:brightness-110 transition-all"
                >
                  Get Directions <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
