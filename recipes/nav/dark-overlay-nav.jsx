/**
 * @metadata
 * name: Dark Overlay Nav
 * category: nav
 * KEEP: Semi-transparent dark background always, light text, blends over hero image,
 *       becomes opaque on scroll, moody/dark theme nav, phone CTA in light color
 * CHANGE: Business name, nav links, opacity levels, CTA copy
 * DON'T: Make it light themed, remove the dark overlay, drop the transparency-to-opaque transition
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNav, useActiveSection, useToggle, cn, telHref } from '../lib';

export default function DarkOverlayNav({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-gray-950/95 backdrop-blur-md shadow-lg'
          : 'bg-gray-950/40 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="font-display text-xl font-bold text-white">
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
                  active === s.id ? 'text-[var(--color-accent)]' : 'text-white/70 hover:text-white'
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
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white font-body font-semibold text-sm hover:bg-white/10 transition-all"
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
            className="fixed inset-0 top-16 bg-gray-950/98 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
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
                className="font-display text-2xl font-bold text-white/90 hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
            <a
              href={telHref(business.phone)}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-body font-semibold"
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
