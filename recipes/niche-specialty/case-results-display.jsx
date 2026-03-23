/**
 * @metadata
 * name: Case Results Display
 * category: niche-specialty
 * niche: attorney
 * KEEP: Case results with settlement amounts, case types, outcomes,
 *       prominent dollar figures, professional tone, staggered cards
 * CHANGE: Case data, amount formatting, card layout
 * DON'T: Remove settlement amounts, make informal, flatten to text
 */

import { motion } from 'motion/react';
import { Scale } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function CaseResultsDisplay({ business, copy }) {
  const [ref, inView] = useInViewport();
  const cases = copy?.cases || [];

  return (
    <Section id="results" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Case Results'}
        </motion.h2>
        <motion.p
          className="font-body text-muted text-center max-w-xl mx-auto mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy?.disclaimer || 'Past results do not guarantee future outcomes.'}
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Scale className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-3" />
              <p className="font-display text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
                {c.amount}
              </p>
              <p className="font-display text-sm font-semibold text-text-primary mt-2">{c.type}</p>
              {c.outcome && (
                <p className="font-body text-xs text-muted mt-1">{c.outcome}</p>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
