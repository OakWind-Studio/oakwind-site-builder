/**
 * @metadata
 * name: Service Area Interactive
 * category: area-map
 * KEEP: Visual service area with cities/neighborhoods listed, map pin icons,
 *       decorative map background, searchable/scannable area list
 * CHANGE: Area list, heading, map visual
 * DON'T: Remove area listing, make text-only, drop visual element
 */

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function ServiceAreaInteractive({ business, copy }) {
  const [ref, inView] = useInViewport();
  const areas = copy?.areas || [];

  return (
    <Section id="service-area" spacing="generous">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual map area */}
          <motion.div
            className="rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] aspect-square flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[var(--color-accent)]/20 mx-auto" />
              <p className="mt-2 font-body text-sm text-muted">Service Coverage Area</p>
            </div>
          </motion.div>

          {/* Area list */}
          <div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {copy?.heading || 'Areas We Serve'}
            </motion.h2>
            <p className="font-body text-muted mb-8">{copy?.subtext}</p>

            <div ref={ref} className="grid grid-cols-2 gap-2">
              {areas.map((area, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 p-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                  <span className="font-body text-sm text-text-primary">{area}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
