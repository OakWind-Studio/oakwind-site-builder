/**
 * @metadata
 * name: Comparison Highlight
 * category: feature-highlight
 * KEEP: Before/After comparison for a feature, two columns with distinct styling,
 *       "without us" vs "with us" pattern, visual contrast
 * CHANGE: Before/after content, column styling, heading
 * DON'T: Remove comparison, make single column, drop visual contrast
 */

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function ComparisonHighlight({ business, copy }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="comparison" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'The Difference'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before / Without */}
          <motion.div
            className="rounded-2xl border border-gray-300 bg-gray-50 p-6 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-lg font-bold text-gray-500 mb-4">
              {copy?.beforeLabel || 'Without Us'}
            </h3>
            <ul className="space-y-3">
              {(copy?.beforeItems || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-gray-500">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After / With */}
          <motion.div
            className="rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/5 p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-display text-lg font-bold text-[var(--color-accent)] mb-4">
              {copy?.afterLabel || `With ${business.name}`}
            </h3>
            <ul className="space-y-3">
              {(copy?.afterItems || []).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
