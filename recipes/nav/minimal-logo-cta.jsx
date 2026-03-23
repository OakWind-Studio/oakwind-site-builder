/**
 * @metadata
 * name: Minimal Logo CTA
 * category: nav
 * KEEP: Just logo text left + phone CTA button right, no nav links visible,
 *       ultra clean layout, fixed top, background transitions on scroll
 * CHANGE: Business name, CTA copy, styling
 * DON'T: Add visible nav links, make it complex, drop the phone CTA
 */

import { Phone } from 'lucide-react';
import { useScrollNav, cn, telHref, formatPhone } from '../lib';

export default function MinimalLogoCta({ business, sections }) {
  const { scrolled } = useScrollNav(50);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        scrolled
          ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <a href="#hero" className="font-display text-lg md:text-xl font-bold text-text-primary">
          {business.name}
        </a>

        {/* Phone CTA */}
        <a
          href={telHref(business.phone)}
          className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-body font-semibold text-sm hover:brightness-110 transition-all"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">{formatPhone(business.phone)}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </nav>
    </header>
  );
}
