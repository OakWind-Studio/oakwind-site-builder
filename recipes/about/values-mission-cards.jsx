/**
 * @metadata
 * name: Values Mission Cards
 * category: about
 * KEEP: 3-4 cards in grid, each with Lucide icon + value name + description,
 *       "What We Believe In" pattern, staggered entrance, elevated surface cards
 * CHANGE: Values data, icons, heading text, card count
 * DON'T: Remove icons, flatten to plain text, drop card structure
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function ValuesMissionCards({ business, copy }) {
  const [ref, inView] = useInViewport();
  const values = copy?.values || [];

  return (
    <Section id="values" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'What We Believe In'}
        </motion.h2>
        <motion.p
          className="font-body text-muted text-center max-w-xl mx-auto mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy?.subtext}
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={i}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mx-auto w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-[var(--color-accent)]" />
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                  {value.name}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
