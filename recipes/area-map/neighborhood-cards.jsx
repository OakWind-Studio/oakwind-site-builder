/**
 * @metadata
 * name: Neighborhood Cards
 * category: area-map
 * KEEP: Cards for each neighborhood served with description, grid layout,
 *       MapPin icons, warm neighborhood-focused tone
 * CHANGE: Neighborhood data, card count, descriptions
 * DON'T: Remove descriptions, flatten to list, drop card structure
 */

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function NeighborhoodCards({ business, copy }) {
  const [ref, inView] = useInViewport();
  const neighborhoods = copy?.neighborhoods || [];

  return (
    <Section id="neighborhoods" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Neighborhoods We Serve'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.map((hood, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                <h3 className="font-display text-base font-bold text-text-primary">{hood.name}</h3>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed">{hood.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
