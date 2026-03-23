/**
 * @metadata
 * name: Map Embed Split
 * category: location
 * KEEP: Map link/visual left + hours/info right, formatHours for schedule,
 *       useIsOpen for live status badge, split layout, phone link
 * CHANGE: Map URL, hours data, contact details
 * DON'T: Remove hours display, drop open/closed badge, flatten layout
 */

import { MapPin, Phone, Clock } from 'lucide-react';
import { Section, Container } from '../lib';
import { useIsOpen, formatHours, telHref, formatPhone, cn } from '../lib';

export default function MapEmbedSplit({ business }) {
  const { isOpen, todayHours, currentDay } = useIsOpen(business.hours);
  const allHours = formatHours(business.hours);
  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(business.address || business.name)}`;

  return (
    <Section id="location" spacing="generous">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map area */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden bg-[var(--color-surface-elevated)] border border-[var(--color-border)] aspect-video relative group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-3" />
                <p className="font-body text-sm text-muted group-hover:text-[var(--color-accent)] transition-colors">
                  {business.address || 'Get Directions'}
                </p>
              </div>
            </div>
          </a>

          {/* Info side */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-6">
              Visit Us
            </h2>

            {/* Open/Closed badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className={cn(
                'w-2.5 h-2.5 rounded-full',
                isOpen ? 'bg-green-500' : 'bg-red-500'
              )} />
              <span className="font-body text-sm font-semibold text-text-primary">
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className="text-sm text-muted font-body">
                — {currentDay}: {todayHours}
              </span>
            </div>

            {/* Phone */}
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold mb-6 hover:brightness-110 transition-all"
            >
              <Phone className="w-4 h-4" />
              {formatPhone(business.phone)}
            </a>

            {/* Weekly hours */}
            <div>
              <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wide mb-3">
                <Clock className="inline w-4 h-4 mr-1" />
                Hours
              </h3>
              <ul className="space-y-1">
                {allHours.map((h, i) => (
                  <li key={i} className="flex justify-between font-body text-sm text-muted">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
