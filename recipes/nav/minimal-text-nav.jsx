/**
 * @metadata
 * name: Minimal Text Nav
 * category: nav
 * KEEP: Text-only nav with no background until scroll, just floating text links + logo,
 *       becomes solid on scroll, very minimal/modern aesthetic, thin font weight
 * CHANGE: Business name, nav links, font weight, transition style
 * DON'T: Add background by default, make it heavy/bold, remove the scroll transition
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref } from '../lib';

export default function MinimalTextNav({ business, sections }) {
  const { scrolled } = useScrollNav(80);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-sm py-0'
          : 'bg-transparent py-2'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-14 md:h-16">
        {/* Logo — light weight */}
        <a href="#hero" className="font-display text-lg font-medium text-text-primary tracking-wide">
          {business.name}
        </a>

        {/* Desktop links — minimal style */}
        <ul className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  'font-body text-xs uppercase tracking-widest font-medium transition-colors duration-300',
                  active === s.id ? 'text-text-primary' : 'text-muted/60 hover:text-text-primary'
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop phone — text link, not button */}
        <a
          href={telHref(business.phone)}
          className="hidden md:inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest font-medium text-muted hover:text-[var(--color-accent)] transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5 text-text-primary" /> : <Menu className="w-5 h-5 text-text-primary" />}
        </button>
      </nav>

      {/* Mobile menu — minimal overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-14 bg-[var(--color-surface)] z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="font-body text-xs uppercase tracking-[0.3em] font-medium text-text-primary"
              >
                {s.label}
              </a>
            ))}
            <a
              href={telHref(business.phone)}
              className="mt-4 inline-flex items-center gap-2 font-body text-sm text-[var(--color-accent)]"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
