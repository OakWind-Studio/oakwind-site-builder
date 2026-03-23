/**
 * @metadata
 * name: Multi-City Display
 * category: area-map
 * KEEP: Multiple cities listed with office/coverage info, grid cards,
 *       phone per location, clean multi-city layout
 * CHANGE: City data, card count, contact details
 * DON'T: Remove city names, drop contact info, flatten to text
 */

import { motion } from 'motion/react';
import { MapPin, Phone } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, telHref, formatPhone, fadeUp } from '../lib';

export default function MultiCityDisplay({ business, copy }) {
  const [ref, inView] = useInViewport();
  const cities = copy?.cities || [];

  return (
    <Section id="cities" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Serving Multiple Cities'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <MapPin className="w-6 h-6 text-[var(--color-accent)] mb-3" />
              <h3 className="font-display text-lg font-bold text-text-primary">{city.name}</h3>
              {city.address && (
                <p className="font-body text-sm text-muted mt-2">{city.address}</p>
              )}
              {city.phone && (
                <a
                  href={telHref(city.phone)}
                  className="inline-flex items-center gap-1 mt-3 text-sm text-[var(--color-accent)] font-semibold hover:brightness-110 transition-all"
                >
                  <Phone className="w-3 h-3" />
                  {formatPhone(city.phone)}
                </a>
              )}
              {city.coverage && (
                <p className="font-body text-xs text-muted mt-2">{city.coverage}</p>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
