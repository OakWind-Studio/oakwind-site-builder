/**
 * @metadata
 * name: Mega Menu Nav
 * category: nav
 * KEEP: Standard horizontal nav but one item has a dropdown mega-menu (multi-column content),
 *       for businesses with many services, desktop-only mega dropdown, mobile gets hamburger,
 *       hover to open mega menu, click-away to close
 * CHANGE: Business name, nav links, mega menu content, column count
 * DON'T: Show mega menu on mobile, remove the multi-column layout, make it a simple dropdown
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref } from '../lib';

export default function MegaMenuNav({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef(null);

  // Find the "services" section for the mega menu trigger
  const megaSection = sections.find((s) => s.id === 'services') || sections[0];
  const regularSections = sections.filter((s) => s.id !== megaSection?.id);

  // Click outside to close mega menu
  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [megaOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        scrolled
          ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-md'
          : 'bg-[var(--color-surface)]'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="font-display text-xl font-bold text-text-primary">
          {business.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {/* Mega menu trigger */}
          <li
            ref={megaRef}
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              className={cn(
                'flex items-center gap-1 font-body text-sm font-medium transition-colors',
                megaOpen ? 'text-[var(--color-accent)]' : 'text-muted hover:text-text-primary'
              )}
            >
              {megaSection.label}
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', megaOpen && 'rotate-180')} />
            </button>

            {/* Mega dropdown */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-xl p-6"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-3 gap-4">
                    {(business.megaItems || sections).slice(0, 6).map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id || 'services'}`}
                        className="block p-3 rounded-lg hover:bg-[var(--color-accent)]/5 transition-colors"
                      >
                        <h4 className="font-display text-sm font-bold text-text-primary mb-1">
                          {item.label || item.title}
                        </h4>
                        <p className="text-xs text-muted font-body line-clamp-2">
                          {item.description || 'Learn more about this service'}
                        </p>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Regular links */}
          {regularSections.map((s) => (
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
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold text-sm hover:brightness-110 transition-all"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6 text-text-primary" /> : <Menu className="w-6 h-6 text-text-primary" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-lg lg:hidden"
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
