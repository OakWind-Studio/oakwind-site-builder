/**
 * @metadata
 * name: Hours Highlight
 * category: location
 * KEEP: Today's hours prominently featured, useIsOpen for "Open Now" badge,
 *       full weekly schedule below, Clock icon, clear visual hierarchy
 * CHANGE: Hours data, badge styling, heading
 * DON'T: Remove open/closed badge, hide weekly schedule, drop today highlight
 */

import { Clock } from 'lucide-react';
import { Section, Container } from '../lib';
import { useIsOpen, formatHours, cn } from '../lib';

export default function HoursHighlight({ business }) {
  const { isOpen, todayHours, currentDay } = useIsOpen(business.hours);
  const allHours = formatHours(business.hours);

  return (
    <Section id="hours" spacing="default">
      <Container maxWidth="sm" className="text-center">
        <Clock className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-6">
          Business Hours
        </h2>

        {/* Today highlight */}
        <div className="rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] p-5 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={cn(
              'w-2.5 h-2.5 rounded-full',
              isOpen ? 'bg-green-500' : 'bg-red-500'
            )} />
            <span className={cn(
              'font-display text-sm font-bold uppercase tracking-wide',
              isOpen ? 'text-green-600' : 'text-red-500'
            )}>
              {isOpen ? 'Open Now' : 'Currently Closed'}
            </span>
          </div>
          <p className="font-display text-lg font-bold text-text-primary">
            {currentDay}
          </p>
          <p className="font-body text-muted">{todayHours}</p>
        </div>

        {/* Full weekly schedule */}
        <div className="space-y-2">
          {allHours.map((h, i) => (
            <div
              key={i}
              className={cn(
                'flex justify-between py-2 px-4 rounded-lg font-body text-sm',
                h.day === currentDay
                  ? 'bg-[var(--color-accent)]/10 text-text-primary font-semibold'
                  : 'text-muted'
              )}
            >
              <span>{h.day}</span>
              <span>{h.time}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
