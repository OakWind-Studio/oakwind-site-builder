/**
 * @metadata
 * name: Booking Scheduler CTA
 * category: cta-breaks
 * KEEP: "Book Your Appointment" with calendar icon, form-like UI (select date/time
 *       dropdowns or prominent "Book Online" button). For appointment businesses.
 *       Phone CTA as primary, online booking as secondary.
 * CHANGE: Booking copy, available times, service types, button labels
 * DON'T: Remove the phone CTA, drop the calendar/scheduling feel, make it text-only
 */

import { motion } from 'motion/react';
import { Phone, Calendar, Clock, ChevronDown } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, telHref, cn } from '../lib';

export default function BookingSchedulerCta({ business, copy }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="cta-booking" bg="elevated" spacing="default" animate="none">
      <Container maxWidth="md">
        <motion.div
          ref={ref}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: 'var(--color-accent)', opacity: 0.9 }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {copy?.headline || 'Book Your Appointment'}
            </h2>
            <p className="mt-3 text-muted font-body">
              {copy?.subtext || 'Select a time that works for you, or call us directly.'}
            </p>
          </div>

          {/* Mock scheduling UI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="relative">
              <label className="block text-xs font-body text-muted mb-1.5 pl-1">
                Preferred Date
              </label>
              <div className="flex items-center gap-2 h-12 px-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                <Calendar className="w-4 h-4 text-muted shrink-0" />
                <span className="text-sm text-muted font-body flex-1">Select a date</span>
                <ChevronDown className="w-4 h-4 text-muted shrink-0" />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-body text-muted mb-1.5 pl-1">
                Preferred Time
              </label>
              <div className="flex items-center gap-2 h-12 px-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                <Clock className="w-4 h-4 text-muted shrink-0" />
                <span className="text-sm text-muted font-body flex-1">Select a time</span>
                <ChevronDown className="w-4 h-4 text-muted shrink-0" />
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {copy?.cta || 'Call to Book'}
            </a>
            {copy?.bookingUrl && (
              <a
                href={copy.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-[var(--color-border)] text-text-primary font-semibold text-lg hover:border-[var(--color-accent)] transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book Online
              </a>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
