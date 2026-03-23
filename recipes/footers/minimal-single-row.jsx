/**
 * @metadata
 * name: Minimal Single Row
 * category: footers
 * KEEP: Single row layout with business name, phone, address, OakWind credit,
 *       minimal design, border-top, responsive wrap
 * CHANGE: Contact details, separator style
 * DON'T: Remove OakWindFooter, add multiple rows, over-decorate
 */

import { Container, OakWindFooter } from '../lib';
import { telHref, formatPhone } from '../lib';

export default function MinimalSingleRow({ business }) {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container maxWidth="lg" className="py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-body text-muted">
          <span className="font-display font-semibold text-text-primary">{business.name}</span>
          <span className="hidden sm:inline text-[var(--color-border)]">|</span>
          <a href={telHref(business.phone)} className="hover:text-[var(--color-accent)] transition-colors">
            {formatPhone(business.phone)}
          </a>
          {business.address && (
            <>
              <span className="hidden sm:inline text-[var(--color-border)]">|</span>
              <span>{business.address}</span>
            </>
          )}
        </div>
      </Container>
      <OakWindFooter />
    </footer>
  );
}
