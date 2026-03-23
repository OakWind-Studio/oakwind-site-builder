/**
 * @metadata
 * name: Bold Accent Nav
 * category: nav
 * KEEP: Accent-colored background always, white text, business name bold,
 *       phone CTA with inverted colors (white bg, accent text), strong visual statement,
 *       mobile hamburger with white icon
 * CHANGE: Business name, nav links, CTA copy, accent color
 * DON'T: Remove the accent background, make it transparent, use muted colors
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref } from '../lib';

export default function BoldAccentNav({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-[var(--color-accent)] transition-shadow duration-300',
        scrolled && 'shadow-lg'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <a href="#hero" className="font-display text-xl font-black text-white tracking-tight">
          {business.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  'font-body text-sm font-medium transition-colors duration-200',
                  active === s.id ? 'text-white' : 'text-white/70 hover:text-white'
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — inverted colors */}
        <a
          href={telHref(business.phone)}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-[var(--color-accent)] font-body font-bold text-sm hover:bg-white/90 transition-all"
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
          {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="bg-[var(--color-accent)] border-t border-white/20 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 py-4 space-y-3">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block font-body text-base font-medium text-white/90 hover:text-white py-1"
                >
                  {s.label}
                </a>
              ))}
              <a
                href={telHref(business.phone)}
                className="flex items-center gap-2 justify-center px-5 py-3 rounded-lg bg-white text-[var(--color-accent)] font-body font-bold text-sm w-full mt-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
