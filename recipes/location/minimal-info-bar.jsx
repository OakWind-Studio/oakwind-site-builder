/**
 * @metadata
 * name: Minimal Info Bar
 * category: location
 * KEEP: Single compact row with address | phone | hours | directions link,
 *       minimal design, separator pipes, responsive wrap
 * CHANGE: Contact details, separator style
 * DON'T: Add multiple rows, over-decorate, drop phone link
 */

import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { Section, Container } from '../lib';
import { telHref, formatPhone } from '../lib';

export default function MinimalInfoBar({ business }) {
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(business.address || business.name)}`;

  return (
    <Section id="info" spacing="tight" bg="elevated">
      <Container maxWidth="lg">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-wrap">
          {business.address && (
            <div className="flex items-center gap-2 text-sm font-body text-muted">
              <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              <span>{business.address}</span>
            </div>
          )}
          <span className="hidden sm:inline text-[var(--color-border)]">|</span>
          <div className="flex items-center gap-2 text-sm font-body">
            <Phone className="w-4 h-4 text-[var(--color-accent)]" />
            <a href={telHref(business.phone)} className="text-muted hover:text-[var(--color-accent)] transition-colors">
              {formatPhone(business.phone)}
            </a>
          </div>
          <span className="hidden sm:inline text-[var(--color-border)]">|</span>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-body text-[var(--color-accent)] hover:brightness-110 transition-all"
          >
            Get Directions <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
