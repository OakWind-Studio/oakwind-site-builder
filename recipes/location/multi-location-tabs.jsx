/**
 * @metadata
 * name: Multi-Location Tabs
 * category: location
 * KEEP: Tab per location using useTabs, each tab shows address/hours/phone,
 *       clean tab switcher, location details card
 * CHANGE: Location data, tab labels, number of locations
 * DON'T: Remove tabs, show all locations at once, drop phone links
 */

import { MapPin, Phone, Clock } from 'lucide-react';
import { Section, Container } from '../lib';
import { useTabs, formatHours, telHref, formatPhone, cn } from '../lib';

export default function MultiLocationTabs({ business }) {
  const locations = business.locations || [];
  const { activeTab, setActiveTab } = useTabs(locations[0]?.name || '');
  const active = locations.find((l) => l.name === activeTab) || locations[0];

  return (
    <Section id="locations" spacing="generous">
      <Container maxWidth="md">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-8">
          Our Locations
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {locations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => setActiveTab(loc.name)}
              className={cn(
                'px-5 py-2 rounded-full font-body text-sm font-semibold transition-all',
                activeTab === loc.name
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface-elevated)] text-muted hover:text-text-primary'
              )}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Location details */}
        {active && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">{active.name}</h3>

            <div className="space-y-4">
              {active.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-muted">{active.address}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <a href={telHref(active.phone || business.phone)} className="font-body text-sm text-muted hover:text-[var(--color-accent)] transition-colors">
                  {formatPhone(active.phone || business.phone)}
                </a>
              </div>
              {active.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {formatHours(active.hours).map((h, i) => (
                      <div key={i} className="flex gap-4 font-body text-sm text-muted">
                        <span className="w-24">{h.day}</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
