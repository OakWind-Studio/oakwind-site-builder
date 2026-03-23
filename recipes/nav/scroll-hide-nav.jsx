/**
 * @metadata
 * name: Scroll Hide Nav
 * category: nav
 * KEEP: Nav visible at top, hides when scrolling down, reappears when scrolling up,
 *       scroll direction detection (comparing current vs previous scrollY),
 *       standard links + phone CTA, mobile hamburger
 * CHANGE: Business name, nav links, hide/show speed, CTA copy
 * DON'T: Remove the scroll-direction behavior, make always visible, drop the reappear
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useActiveSection, useToggle, cn, telHref } from '../lib';

function useScrollDirection(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const prevY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (Math.abs(y - prevY.current) < threshold) return;
      setVisible(y < prevY.current || y < 80);
      prevY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { visible, scrolled };
}

export default function ScrollHideNav({ business, sections }) {
  const { visible, scrolled } = useScrollDirection();
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        visible ? 'translate-y-0' : '-translate-y-full',
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
                  className="block font-body text-base text-text-primary py-1"
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
