/**
 * @metadata
 * name: Announcement Plus Nav
 * category: nav
 * KEEP: Top announcement bar (e.g. "Now accepting new patients!") with accent bg,
 *       dismissible with X button, nav below, announcement uses accent color,
 *       smooth collapse when dismissed
 * CHANGE: Announcement text, business name, nav links, CTA copy
 * DON'T: Remove the dismissible announcement, make it permanent, drop the accent bg
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref } from '../lib';

export default function AnnouncementPlusNav({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <AnimatePresence>
        {showBanner && !scrolled && (
          <motion.div
            className="bg-[var(--color-accent)] text-white overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between py-2">
              <p className="text-xs md:text-sm font-body font-medium text-center flex-1">
                {business.announcement || 'Now accepting new clients! Call today for a free consultation.'}
              </p>
              <button
                onClick={() => setShowBanner(false)}
                className="ml-3 w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors flex-shrink-0"
                aria-label="Dismiss announcement"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main nav */}
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
                className="flex items-center gap-2 justify-center px-5 py-3 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold text-sm w-full mt-2"
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
