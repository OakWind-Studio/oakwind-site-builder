/**
 * @metadata
 * name: Split Nav Centered Logo
 * category: nav
 * KEEP: Links split on both sides of a centered logo, left has first half of links,
 *       center has business name/logo, right has second half + phone CTA,
 *       mobile collapses to hamburger
 * CHANGE: Business name, nav links, CTA copy, split point
 * DON'T: Remove the centered logo pattern, put all links on one side, drop the split
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref } from '../lib';

export default function SplitNavCenteredLogo({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  const mid = Math.ceil(sections.length / 2);
  const leftLinks = sections.slice(0, mid);
  const rightLinks = sections.slice(mid);

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
        {/* Left links (desktop) */}
        <ul className="hidden lg:flex items-center gap-5 flex-1">
          {leftLinks.map((s) => (
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

        {/* Centered logo */}
        <a href="#hero" className="font-display text-xl md:text-2xl font-bold text-text-primary lg:text-center lg:flex-shrink-0">
          {business.name}
        </a>

        {/* Right links + CTA (desktop) */}
        <div className="hidden lg:flex items-center gap-5 flex-1 justify-end">
          {rightLinks.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                'font-body text-sm font-medium transition-colors',
                active === s.id ? 'text-[var(--color-accent)]' : 'text-muted hover:text-text-primary'
              )}
            >
              {s.label}
            </a>
          ))}
          <a
            href={telHref(business.phone)}
            className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold text-sm hover:brightness-110 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
        </div>

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
            className="fixed inset-0 top-16 bg-[var(--color-surface)] z-40 flex flex-col items-center justify-center gap-5 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl font-bold text-text-primary"
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
