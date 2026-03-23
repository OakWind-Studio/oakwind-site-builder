/**
 * @metadata
 * name: Side by Side
 * category: comparison
 * KEEP: Two columns comparing features side by side, distinct visual styling,
 *       our column highlighted with accent, competitor column muted
 * CHANGE: Feature lists, column labels, styling
 * DON'T: Remove two-column layout, merge columns, drop visual contrast
 */

import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function SideBySide({ business, copy }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="compare" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'See the Difference'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Us */}
          <motion.div
            className="rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/5 p-6 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-lg font-bold text-[var(--color-accent)] mb-6">
              {copy?.usLabel || business.name}
            </h3>
            <ul className="space-y-3">
              {(copy?.usFeatures || []).map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-text-primary">{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Them */}
          <motion.div
            className="rounded-2xl border border-gray-300 bg-gray-50 p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-display text-lg font-bold text-gray-400 mb-6">
              {copy?.themLabel || 'Other Companies'}
            </h3>
            <ul className="space-y-3">
              {(copy?.themFeatures || []).map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-gray-500">{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
