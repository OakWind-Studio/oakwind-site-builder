/**
 * @metadata
 * name: Tabbed Categories
 * category: services
 * KEEP: Tab buttons at top for category filtering, useTabs hook, AnimatePresence on tab switch,
 *       services grouped by category, grid of filtered cards
 * CHANGE: Category names, service data, tab styling, card layout
 * DON'T: Remove tab interaction, show all categories at once, drop motion on switch
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, Container } from '../lib';
import { useTabs, cn, fadeUp } from '../lib';

export default function TabbedCategories({ services, business }) {
  const categories = [...new Set(services.map((s) => s.category || 'General'))];
  const { activeTab, setActiveTab } = useTabs(categories[0]);

  const filtered = services.filter(
    (s) => (s.category || 'General') === activeTab
  );

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                'px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300',
                activeTab === cat
                  ? 'bg-[var(--color-accent)] text-white shadow-md'
                  : 'bg-[var(--color-surface-elevated)] text-muted hover:text-text-primary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted font-body leading-relaxed">
                    {service.description}
                  </p>
                  {service.price && (
                    <p className="mt-3 font-display font-semibold text-[var(--color-accent)]">
                      {service.price}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
}
