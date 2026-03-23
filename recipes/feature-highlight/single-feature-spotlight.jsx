/**
 * @metadata
 * name: Single Feature Spotlight
 * category: feature-highlight
 * KEEP: One killer differentiator showcased dramatically, large text + visual,
 *       accent emphasis, full section devoted to one feature
 * CHANGE: Feature text, visual, accent treatment
 * DON'T: Add multiple features, make subtle, drop visual element
 */

import { motion } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport } from '../lib';

export default function SingleFeatureSpotlight({ business, copy, images }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="feature" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3 block">
              {copy?.label || 'What Sets Us Apart'}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary leading-tight">
              {copy?.headline}
            </h2>
            <p className="mt-4 font-body text-lg text-muted leading-relaxed">
              {copy?.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OakImage
              src={images?.feature}
              alt={copy?.headline || 'Feature highlight'}
              aspect="4/3"
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
