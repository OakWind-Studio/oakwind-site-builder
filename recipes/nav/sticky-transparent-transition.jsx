/**
 * @metadata
 * name: Sticky Transparent Transition
 * category: nav
 * KEEP: Transparent on hero, transitions to solid bg + shadow on scroll, useScrollNav,
 *       logo left, nav links center, phone CTA right, mobile hamburger overlay
 * CHANGE: Business name, nav links, CTA copy, transition threshold
 * DON'T: Remove scroll transition, drop mobile hamburger, make always opaque
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref } from '../lib';

export default function StickyTransparentTransition({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        scrolled
          ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="font-display text-xl font-bold text-text-primary">
          {business.name}
        </a>

        {/* Desktop links — center */}
        <ul className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  'font-body text-sm font-medium transition-colors duration-200',
                  active === s.id ? 'text-[var(--color-accent)]' : 'text-muted hover:text-text-primary'
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={telHref(business.phone)}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold text-sm hover:brightness-110 transition-all"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6 text-text-primary" /> : <Menu className="w-6 h-6 text-text-primary" />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-[var(--color-surface)] z-40 flex flex-col items-center justify-center gap-6 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'font-display text-2xl font-bold transition-colors',
                  active === s.id ? 'text-[var(--color-accent)]' : 'text-text-primary'
                )}
              >
                {s.label}
              </a>
            ))}
            <a
              href={telHref(business.phone)}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
