/**
 * @metadata
 * name: CTA Footer Combo
 * category: footers
 * KEEP: Final CTA section above that transitions into footer below, connected feel,
 *       CTA with phone button, accent background on CTA, OakWindFooter
 * CHANGE: CTA copy, contact details, accent treatment
 * DON'T: Remove OakWindFooter, separate CTA visually from footer, drop phone CTA
 */

import { Phone } from 'lucide-react';
import { Container, OakWindFooter } from '../lib';
import { telHref, formatPhone } from '../lib';

export default function CtaFooterCombo({ business, sections }) {
  return (
    <footer>
      {/* CTA section */}
      <div className="bg-[var(--color-accent)] text-white py-16 md:py-20">
        <Container maxWidth="md" className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {sections?.ctaHeadline || 'Ready to Get Started?'}
          </h2>
          <p className="font-body text-lg text-white/80 mb-8 max-w-lg mx-auto">
            {sections?.ctaSubtext || 'Give us a call today for a free consultation.'}
          </p>
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[var(--color-accent)] font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
          >
            <Phone className="w-5 h-5" />
            {sections?.ctaLabel || formatPhone(business.phone)}
          </a>
        </Container>
      </div>

      {/* Footer info */}
      <div className="bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)]">
        <Container maxWidth="lg" className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-muted">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="font-display font-semibold text-text-primary">{business.name}</span>
              {business.address && <span>{business.address}</span>}
            </div>
            <div className="flex items-center gap-4">
              <a href={telHref(business.phone)} className="hover:text-[var(--color-accent)] transition-colors">
                {formatPhone(business.phone)}
              </a>
              {business.email && <span>{business.email}</span>}
            </div>
          </div>
        </Container>
        <OakWindFooter />
      </div>
    </footer>
  );
}
