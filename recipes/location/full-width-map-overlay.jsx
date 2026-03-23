/**
 * @metadata
 * name: Full Width Map Overlay
 * category: location
 * KEEP: Full-width decorative map area, floating info card overlaid on top,
 *       card has address + phone + hours, elevated card with shadow
 * CHANGE: Map visual, card content, card position
 * DON'T: Remove floating card, make card full-width, drop contact info
 */

import { MapPin, Phone, Clock } from 'lucide-react';
import { Section, Container } from '../lib';
import { telHref, formatPhone } from '../lib';

export default function FullWidthMapOverlay({ business }) {
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(business.address || business.name)}`;

  return (
    <Section id="location" spacing="default" animate="none">
      <div className="relative">
        {/* Map background area */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-[50vh] bg-[var(--color-surface-elevated)] relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-16 h-16 text-[var(--color-accent)]/30" />
          </div>
        </a>

        {/* Floating info card */}
        <Container maxWidth="sm" className="relative -mt-24 z-10 pb-8">
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl border border-[var(--color-border)] p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-text-primary mb-4">
              {business.name}
            </h2>

            <div className="space-y-3">
              {business.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-muted">{business.address}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <a href={telHref(business.phone)} className="font-body text-sm text-muted hover:text-[var(--color-accent)] transition-colors">
                  {formatPhone(business.phone)}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
