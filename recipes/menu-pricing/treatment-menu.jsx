/**
 * @metadata
 * name: Treatment Menu
 * category: menu-pricing
 * KEEP: Med spa/dental treatment list, treatment name + description + duration + price,
 *       elegant layout, clock icon for duration, accent price
 * CHANGE: Treatment data, layout style, price format
 * DON'T: Remove price, drop duration, flatten to plain list
 */

import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function TreatmentMenu({ services, business }) {
  const [ref, inView] = useInViewport();
  const treatments = services || [];

  return (
    <Section id="treatments" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Treatment Menu
        </motion.h2>

        <div ref={ref} className="space-y-4">
          {treatments.map((tx, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {tx.name}
                  </h3>
                  {tx.description && (
                    <p className="font-body text-sm text-muted mt-1 leading-relaxed">{tx.description}</p>
                  )}
                  {tx.duration && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted">
                      <Clock className="w-3 h-3" />
                      <span className="font-body">{tx.duration}</span>
                    </div>
                  )}
                </div>
                {tx.price && (
                  <span className="font-display text-lg font-bold text-[var(--color-accent)] shrink-0">
                    {tx.price}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
