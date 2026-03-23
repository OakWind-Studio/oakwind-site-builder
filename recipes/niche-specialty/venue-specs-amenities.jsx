/**
 * @metadata
 * name: Venue Specs & Amenities
 * category: niche-specialty
 * niche: wedding-venue
 * KEEP: Capacity info, amenities list, packages, feature cards,
 *       elegant venue feel, icon + label layout
 * CHANGE: Amenities data, capacity numbers, package details
 * DON'T: Remove capacity info, flatten to text, drop icons
 */

import { motion } from 'motion/react';
import { Users, Check } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function VenueSpecsAmenities({ business, copy }) {
  const [ref, inView] = useInViewport();
  const amenities = copy?.amenities || [];
  const specs = copy?.specs || {};

  return (
    <Section id="venue-details" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Venue Details'}
        </motion.h2>

        {/* Specs row */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.entries(specs).map(([key, val], i) => (
            <motion.div
              key={key}
              className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Users className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-2" />
              <p className="font-display text-xl font-bold text-text-primary">{val}</p>
              <p className="font-body text-xs text-muted mt-1 capitalize">{key.replace(/_/g, ' ')}</p>
            </motion.div>
          ))}
        </div>

        {/* Amenities grid */}
        <h3 className="font-display text-xl font-bold text-text-primary text-center mb-6">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {amenities.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 p-3"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
            >
              <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
              <span className="font-body text-sm text-muted">{item}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
