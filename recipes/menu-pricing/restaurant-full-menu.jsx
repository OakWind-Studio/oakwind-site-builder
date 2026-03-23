/**
 * @metadata
 * name: Restaurant Full Menu
 * category: menu-pricing
 * KEEP: Full restaurant menu with categories (useTabs), item name + description + price,
 *       tab per category, clean line item layout, elegant typography
 * CHANGE: Menu data, categories, item formatting
 * DON'T: Remove category tabs, drop prices, flatten to single list
 */

import { Section, Container } from '../lib';
import { useTabs, cn, fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function RestaurantFullMenu({ menu, business }) {
  const categories = Object.keys(menu || {});
  const { activeTab, setActiveTab } = useTabs(categories[0] || '');
  const items = menu?.[activeTab] || [];

  return (
    <Section id="menu" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Menu
        </motion.h2>

        {/* Category tabs */}
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

        {/* Menu items */}
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-start gap-4 pb-4 border-b border-[var(--color-border)] last:border-0">
              <div className="flex-1">
                <h3 className="font-display text-base font-semibold text-text-primary">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="font-body text-sm text-muted mt-1">{item.description}</p>
                )}
              </div>
              {item.price && (
                <span className="font-display text-base font-bold text-[var(--color-accent)] shrink-0">
                  {item.price}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
