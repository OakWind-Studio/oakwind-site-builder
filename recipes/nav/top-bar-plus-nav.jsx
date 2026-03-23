/**
 * @metadata
 * name: Top Bar Plus Nav
 * category: nav
 * KEEP: Thin utility bar on top (phone + hours + address in small text), main nav bar below
 *       with logo + links + CTA, two-tiered layout, utility bar hides on mobile scroll
 * CHANGE: Business info, nav links, utility bar items, CTA copy
 * DON'T: Merge the two bars into one, remove the utility bar, drop phone from top bar
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Clock, MapPin, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref, formatPhone } from '../lib';

export default function TopBarPlusNav({ business, sections }) {
  const { scrolled } = useScrollNav(80);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Utility bar — hides on scroll */}
      <div
        className={cn(
          'bg-[var(--color-accent)] text-white transition-all duration-300 overflow-hidden',
          scrolled ? 'h-0' : 'h-8 md:h-9'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-full text-xs font-body">
          <div className="flex items-center gap-4">
            <a href={telHref(business.phone)} className="flex items-center gap-1.5 hover:underline">
              <Phone className="w-3 h-3" />
              {formatPhone(business.phone)}
            </a>
            {business.hours && (
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {business.hours}
              </span>
            )}
          </div>
          {business.address && (
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {business.address}
            </span>
          )}
        </div>
      </div>

      {/* Main nav bar */}
      <nav
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-md'
            : 'bg-[var(--color-surface)]'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="#hero" className="font-display text-xl font-bold text-text-primary">
            {business.name}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    'font-body text-sm font-medium transition-colors',
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
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-lg md:hidden"
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
                  className="block font-body text-base font-medium text-text-primary py-1"
                >
                  {s.label}
                </a>
              ))}
              <a
                href={telHref(business.phone)}
                className="mt-2 flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold text-sm w-full justify-center"
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
