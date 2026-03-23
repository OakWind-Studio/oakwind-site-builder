/**
 * @metadata
 * name: Tabbed FAQ
 * category: faq
 * KEEP: FAQs grouped by category tabs (useTabs), each tab shows relevant Q&A accordion,
 *       tab buttons with active state, smooth content switch
 * CHANGE: Categories, FAQ data, tab styling
 * DON'T: Remove tabs, show all categories at once, drop accordion per tab
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Section, Container } from '../lib';
import { useTabs, fadeUp, cn } from '../lib';

export default function TabbedFaq({ faqs }) {
  const grouped = (faqs || []).reduce((acc, faq) => {
    const cat = faq.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const { activeTab, setActiveTab } = useTabs(categories[0] || 'General');
  const [openIndex, setOpenIndex] = useState(null);

  const activeFaqs = grouped[activeTab] || [];

  return (
    <Section id="faq" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          FAQ
        </motion.h2>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveTab(cat); setOpenIndex(null); }}
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

        {/* Accordion for active tab */}
        <div className="space-y-3">
          {activeFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-text-primary pr-4">{faq.question}</span>
                  <ChevronDown className={cn('w-5 h-5 text-muted shrink-0 transition-transform duration-300', isOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-5 pb-5 font-body text-sm text-muted leading-relaxed">{faq.answer}</p>
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
