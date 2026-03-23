/**
 * @metadata
 * name: Checklist Comparison
 * category: comparison
 * KEEP: Green checkmarks for us, red X for competitors, single list format,
 *       each item shows both icons side by side, clean scannable layout
 * CHANGE: Feature list, column headers, icon colors
 * DON'T: Remove check/X pattern, use single column, drop visual contrast
 */

import { Check, X } from 'lucide-react';
import { Section, Container } from '../lib';
import { fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function ChecklistComparison({ business, copy }) {
  const items = copy?.items || [];

  return (
    <Section id="checklist" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || `The ${business.name} Advantage`}
        </motion.h2>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
            <span className="font-body text-sm text-muted">Feature</span>
            <span className="font-display text-sm font-bold text-[var(--color-accent)] w-20 text-center">Us</span>
            <span className="font-display text-sm font-bold text-muted w-20 text-center">Others</span>
          </div>

          {/* Items */}
          {items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto] gap-4 p-4 border-b border-[var(--color-border)] last:border-0"
            >
              <span className="font-body text-sm text-text-primary">{item.name}</span>
              <div className="w-20 flex justify-center">
                {item.us !== false ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <div className="w-20 flex justify-center">
                {item.them ? (
                  <Check className="w-5 h-5 text-gray-400" />
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
