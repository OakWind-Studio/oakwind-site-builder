/**
 * @metadata
 * name: Practice Areas Detail
 * category: niche-specialty
 * niche: attorney
 * KEEP: Expandable cards per practice area, icon + title + brief + expandable detail,
 *       useToggle for expand, professional depth, staggered entrance
 * CHANGE: Practice area data, icons, card styling
 * DON'T: Remove expandable behavior, flatten to plain list, make informal
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Section, Container } from '../lib';
import { fadeUp, cn } from '../lib';

export default function PracticeAreasDetail({ business, copy }) {
  const [openIndex, setOpenIndex] = useState(null);
  const areas = copy?.areas || [];

  return (
    <Section id="practice-areas" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Practice Areas'}
        </motion.h2>

        <div className="space-y-4">
          {areas.map((area, i) => {
            const Icon = area.icon;
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-text-primary">{area.title}</h3>
                    <p className="font-body text-sm text-muted mt-0.5">{area.brief}</p>
                  </div>
                  <ChevronDown className={cn('w-5 h-5 text-muted shrink-0 transition-transform duration-300', isOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 font-body text-sm text-muted leading-relaxed border-t border-[var(--color-border)] pt-4">
                        {area.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
