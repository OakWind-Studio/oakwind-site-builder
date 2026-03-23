/**
 * @metadata
 * name: Category Filtered
 * category: galleries
 * KEEP: Filter buttons using useTabs, image grid that filters by category,
 *       motion animation on filter change, "All" tab default, staggered reveal
 * CHANGE: Categories, images, grid columns
 * DON'T: Remove filter buttons, show all without filtering, drop animation
 */

import { motion, AnimatePresence } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useTabs, cn } from '../lib';

export default function CategoryFiltered({ images, business }) {
  const gallery = images?.gallery || [];
  const categories = ['All', ...new Set(gallery.map((img) => img.category).filter(Boolean))];
  const { activeTab, setActiveTab } = useTabs('All');

  const filtered = activeTab === 'All' ? gallery : gallery.filter((img) => img.category === activeTab);

  return (
    <Section id="gallery" spacing="generous">
      <Container maxWidth="lg">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-8">
          Our Work
        </h2>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-body font-semibold transition-all',
                activeTab === cat
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface-elevated)] text-muted hover:text-text-primary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src || i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden"
              >
                <OakImage
                  src={typeof img === 'string' ? img : img.src}
                  alt={img.alt || `${business.name} work`}
                  aspect="4/3"
                  className="w-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
