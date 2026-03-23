/**
 * @metadata
 * name: Treatment Detail Menu
 * category: niche-specialty
 * niche: med-spa
 * KEEP: Treatments with descriptions, duration, pricing, elegant layout,
 *       clock icon for duration, accent price, categorized
 * CHANGE: Treatment data, category tabs, pricing format
 * DON'T: Remove pricing, drop duration, make clinical
 */

import { motion } from 'motion/react';
import { Clock, Sparkles } from 'lucide-react';
import { Section, Container } from '../lib';
import { useTabs, useInViewport, cn, fadeUp } from '../lib';

export default function TreatmentDetailMenu({ business, copy }) {
  const categories = Object.keys(copy?.treatments || {});
  const { activeTab, setActiveTab } = useTabs(categories[0] || '');
  const items = copy?.treatments?.[activeTab] || [];
  const [ref, inView] = useInViewport();

  return (
    <Section id="treatments" spacing="generous">
      <Container maxWidth="md">
        <motion.div
          className="text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            {copy?.heading || 'Treatment Menu'}
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-body font-semibold transition-all',
                activeTab === cat
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface-elevated)] text-muted hover:text-text-primary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className="space-y-3">
          {items.map((tx, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-text-primary">{tx.name}</h3>
                  {tx.description && <p className="font-body text-sm text-muted mt-1">{tx.description}</p>}
                  {tx.duration && (
                    <span className="inline-flex items-center gap-1 mt-2 text-xs text-muted">
                      <Clock className="w-3 h-3" /> {tx.duration}
                    </span>
                  )}
                </div>
                {tx.price && (
                  <span className="font-display text-lg font-bold text-[var(--color-accent)] shrink-0">{tx.price}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
