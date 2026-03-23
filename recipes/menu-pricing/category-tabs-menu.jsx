/**
 * @metadata
 * name: Category Tabs Menu
 * category: menu-pricing
 * KEEP: Tab buttons for categories, menu items filtered by active tab,
 *       for multi-category menus, clean item layout with price
 * CHANGE: Categories, menu items, tab styling
 * DON'T: Remove tabs, show all categories, drop prices
 */

import { Section, Container } from '../lib';
import { useTabs, cn, fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function CategoryTabsMenu({ menu, business }) {
  const categories = Object.keys(menu || {});
  const { activeTab, setActiveTab } = useTabs(categories[0] || '');
  const items = menu?.[activeTab] || [];

  return (
    <Section id="menu" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {business.name} Menu
        </motion.h2>

        {/* Tab buttons */}
        <div className="flex overflow-x-auto gap-1 mb-10 pb-2 justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-body font-semibold whitespace-nowrap transition-all',
                activeTab === cat
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-muted hover:text-text-primary hover:bg-[var(--color-surface)]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-baseline gap-2 py-3 border-b border-[var(--color-border)] last:border-0"
            >
              <div>
                <span className="font-display text-base font-semibold text-text-primary">{item.name}</span>
                {item.description && (
                  <span className="font-body text-sm text-muted ml-2">{item.description}</span>
                )}
              </div>
              {item.price && (
                <span className="font-display text-base font-bold text-[var(--color-accent)] shrink-0">{item.price}</span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
