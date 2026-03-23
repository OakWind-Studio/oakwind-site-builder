/**
 * @metadata
 * name: Service Area Map
 * category: niche-specialty
 * niche: home-services
 * KEEP: Decorative service area representation with coverage info, city/area list,
 *       MapPin icons, "We Serve" heading, grid of served areas
 * CHANGE: Area list, heading, coverage radius
 * DON'T: Remove area listing, make text-only, drop map visual
 */

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function ServiceAreaMap({ business, copy }) {
  const [ref, inView] = useInViewport();
  const areas = copy?.areas || [];

  return (
    <Section id="service-area" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MapPin className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            {copy?.heading || 'Areas We Serve'}
          </h2>
          <p className="mt-2 font-body text-muted max-w-lg mx-auto">
            {copy?.subtext || `Proudly serving ${business.city || 'the greater area'} and surrounding communities`}
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
              <span className="font-body text-sm text-text-primary">{area}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
