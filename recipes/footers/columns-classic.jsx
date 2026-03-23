/**
 * @metadata
 * name: Columns Classic
 * category: footers
 * KEEP: 3-4 columns layout (about blurb, quick links, contact info, hours),
 *       standard professional footer, OakWindFooter at bottom, border-top divider
 * CHANGE: Column content, link list, contact details
 * DON'T: Remove OakWindFooter, drop contact info column, remove columns structure
 */

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Container, OakWindFooter } from '../lib';
import { telHref, formatPhone, formatHours } from '../lib';

export default function ColumnsClassic({ business, sections }) {
  const links = sections?.links || [];
  const hours = formatHours(business.hours);

  return (
    <footer className="bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)]">
      <Container maxWidth="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About blurb */}
          <div>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">
              {business.name}
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              {sections?.about || business.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-primary uppercase tracking-wide mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="font-body text-sm text-muted hover:text-[var(--color-accent)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-primary uppercase tracking-wide mb-3">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <a href={telHref(business.phone)} className="font-body text-sm text-muted hover:text-[var(--color-accent)] transition-colors">
                  {formatPhone(business.phone)}
                </a>
              </li>
              {business.email && (
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-muted">{business.email}</span>
                </li>
              )}
              {business.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-muted">{business.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-primary uppercase tracking-wide mb-3">
              Hours
            </h4>
            <ul className="space-y-1">
              {hours.map((h, i) => (
                <li key={i} className="flex justify-between font-body text-sm text-muted">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <OakWindFooter />
    </footer>
  );
}
