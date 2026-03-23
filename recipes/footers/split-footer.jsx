/**
 * @metadata
 * name: Split Footer
 * category: footers
 * KEEP: Two halves — left has branding + description, right has contact/links grid,
 *       OakWindFooter at bottom, clean split layout, border-top
 * CHANGE: Branding text, links, contact details
 * DON'T: Remove OakWindFooter, merge halves, drop branding side
 */

import { Phone, Mail, MapPin } from 'lucide-react';
import { Container, OakWindFooter } from '../lib';
import { telHref, formatPhone } from '../lib';

export default function SplitFooter({ business, sections }) {
  const links = sections?.links || [];

  return (
    <footer className="bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)]">
      <Container maxWidth="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Branding */}
          <div>
            <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
              {business.name}
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed max-w-sm">
              {sections?.description || business.tagline}
            </p>
          </div>

          {/* Right: Contact + Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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

            {links.length > 0 && (
              <div>
                <h4 className="font-display text-sm font-bold text-text-primary uppercase tracking-wide mb-3">
                  Links
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
            )}
          </div>
        </div>
      </Container>
      <OakWindFooter />
    </footer>
  );
}
