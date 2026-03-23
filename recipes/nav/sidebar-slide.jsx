/**
 * @metadata
 * name: Sidebar Slide
 * category: nav
 * KEEP: No top nav bar — hamburger icon in corner only, opens a sidebar that slides in
 *       from left with full nav + contact info + social links, sidebar overlay dims background
 * CHANGE: Business name, nav links, contact info, slide direction
 * DON'T: Add a top nav bar, make sidebar always visible, remove the slide animation
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useScrollNav, useToggle, cn, telHref, formatPhone } from '../lib';

export default function SidebarSlide({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <>
      {/* Floating hamburger + logo */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
          <button
            onClick={toggleMenu}
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
              scrolled ? 'bg-[var(--color-surface)]/90 shadow-md backdrop-blur-sm' : ''
            )}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-text-primary" />
          </button>

          <a href="#hero" className="font-display text-xl font-bold text-text-primary">
            {business.name}
          </a>

          <a
            href={telHref(business.phone)}
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
              scrolled ? 'bg-[var(--color-accent)] shadow-md' : 'bg-[var(--color-accent)]'
            )}
            aria-label="Call us"
          >
            <Phone className="w-5 h-5 text-white" />
          </a>
        </div>
      </header>

      {/* Overlay backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="fixed top-0 left-0 bottom-0 z-50 w-[280px] md:w-[320px] bg-[var(--color-surface)] shadow-2xl flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--color-border)]">
              <span className="font-display text-lg font-bold text-text-primary">
                {business.name}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-1">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <motion.a
                      href={`#${s.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 font-display text-lg font-medium text-text-primary hover:text-[var(--color-accent)] transition-colors border-b border-[var(--color-border)]/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      {s.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact info */}
            <div className="px-6 py-6 border-t border-[var(--color-border)] space-y-3">
              <a
                href={telHref(business.phone)}
                className="flex items-center gap-3 text-sm font-body text-muted hover:text-[var(--color-accent)] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {formatPhone(business.phone)}
              </a>
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-3 text-sm font-body text-muted hover:text-[var(--color-accent)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {business.email}
                </a>
              )}
              {business.address && (
                <span className="flex items-center gap-3 text-sm font-body text-muted">
                  <MapPin className="w-4 h-4" />
                  {business.address}
                </span>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
