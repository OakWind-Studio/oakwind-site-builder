/**
 * @metadata
 * name: Full Hamburger Overlay
 * category: nav
 * KEEP: Always shows hamburger icon (no visible links on desktop either), click opens
 *       full-screen overlay with large centered nav links + phone, overlay uses AnimatePresence,
 *       hamburger transforms to X
 * CHANGE: Business name, nav links, overlay animation, background color
 * DON'T: Show nav links by default on desktop, remove the overlay, drop phone link
 */

import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X } from 'lucide-react';
import { useScrollNav, useToggle, cn, telHref, formatPhone } from '../lib';

export default function FullHamburgerOverlay({ business, sections }) {
  const { scrolled } = useScrollNav(50);
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          scrolled && !menuOpen
            ? 'bg-[var(--color-surface)]/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            className={cn(
              'font-display text-xl font-bold transition-colors z-50 relative',
              menuOpen ? 'text-white' : 'text-text-primary'
            )}
          >
            {business.name}
          </a>

          {/* Hamburger — always visible */}
          <button
            onClick={toggleMenu}
            className="relative z-50 w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </nav>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-accent)] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {sections.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl md:text-5xl font-bold text-white/90 hover:text-white transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
              >
                {s.label}
              </motion.a>
            ))}

            <motion.a
              href={telHref(business.phone)}
              className="mt-6 inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-[var(--color-accent)] font-body font-bold text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + sections.length * 0.06 }}
            >
              <Phone className="w-5 h-5" />
              {formatPhone(business.phone)}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
