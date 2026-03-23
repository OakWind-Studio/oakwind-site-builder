/**
 * @metadata
 * name: Directions Landmarks
 * category: area-map
 * KEEP: "Near [landmark]" directions display, familiar reference points,
 *       distance/time from each landmark, MapPin icons, easy scannable
 * CHANGE: Landmarks data, distances, area name
 * DON'T: Remove landmarks, use technical addresses only, drop distance info
 */

import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function DirectionsLandmarks({ business, copy }) {
  const [ref, inView] = useInViewport();
  const landmarks = copy?.landmarks || [];

  return (
    <Section id="find-us" spacing="generous" bg="elevated">
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
            {copy?.heading || 'Find Us Easily'}
          </h2>
          <p className="mt-2 font-body text-muted">
            {copy?.subtext || `We're conveniently located near these landmarks`}
          </p>
        </motion.div>

        <div ref={ref} className="space-y-3 max-w-lg mx-auto">
          {landmarks.map((lm, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
              <div className="flex-1">
                <p className="font-body text-sm text-text-primary font-semibold">{lm.name}</p>
              </div>
              <span className="font-body text-sm text-[var(--color-accent)] font-bold shrink-0">
                {lm.distance || lm.time}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
