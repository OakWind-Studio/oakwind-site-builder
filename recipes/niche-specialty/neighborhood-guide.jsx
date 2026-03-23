/**
 * @metadata
 * name: Neighborhood Guide
 * category: niche-specialty
 * niche: realtor
 * KEEP: Area cards with photo, description, "homes from $X", grid layout,
 *       warm neighborhood feel, OakImage cards
 * CHANGE: Neighborhood data, card count, pricing format
 * DON'T: Remove pricing info, drop photos, flatten to list
 */

import { motion } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function NeighborhoodGuide({ business, copy }) {
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
          {copy?.heading || 'Explore the Area'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.map((hood, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <OakImage src={hood.photo} alt={hood.name} aspect="16/10" className="w-full" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-text-primary">{hood.name}</h3>
                <p className="font-body text-sm text-muted mt-2 leading-relaxed">{hood.description}</p>
                {hood.priceFrom && (
                  <p className="mt-3 font-display text-sm font-semibold text-[var(--color-accent)]">
                    Homes from {hood.priceFrom}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
