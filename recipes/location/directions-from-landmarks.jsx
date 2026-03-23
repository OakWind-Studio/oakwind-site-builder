/**
 * @metadata
 * name: Directions from Landmarks
 * category: location
 * KEEP: "X min from [landmark]" style directions, familiar local references,
 *       MapPin icons, easy-to-scan layout, warm welcoming tone
 * CHANGE: Landmarks data, distances, area name
 * DON'T: Remove landmark references, use technical addresses only, drop icons
 */

import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function DirectionsFromLandmarks({ business }) {
  const landmarks = business.landmarks || [];

  const [ref, inView] = useInViewport();

  return (
    <Section id="directions" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.div
          className="text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Navigation className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
            Easy to Find
          </h2>
          <p className="mt-2 font-body text-muted">
            Conveniently located in {business.city || 'your neighborhood'}
          </p>
        </motion.div>

        <div ref={ref} className="space-y-4 max-w-lg mx-auto">
          {landmarks.map((lm, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
              <span className="font-body text-sm text-text-primary">
                <strong>{lm.time || lm.distance}</strong> from {lm.name}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
