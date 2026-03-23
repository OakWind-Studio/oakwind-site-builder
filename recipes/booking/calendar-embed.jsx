/**
 * @metadata
 * name: Calendar Embed
 * category: booking
 * KEEP: Calendar visual placeholder + "Book Online" CTA, iframe embed area,
 *       fallback phone number, centered layout
 * CHANGE: Calendar embed URL, CTA text, heading
 * DON'T: Remove CTA, make text-only, drop phone fallback
 */

import { Calendar, Phone } from 'lucide-react';
import { Section, Container, FormButton } from '../lib';
import { telHref, formatPhone, fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function CalendarEmbed({ business, copy }) {
  return (
    <Section id="calendar" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.div
          className="text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Calendar className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
            {copy?.heading || 'Schedule Online'}
          </h2>
          <p className="font-body text-sm text-muted mt-2 max-w-md mx-auto">
            {copy?.subtext || 'Pick a time that works for you.'}
          </p>
        </motion.div>

        {/* Calendar embed area */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] min-h-[400px] flex items-center justify-center">
          {copy?.embedUrl ? (
            <iframe src={copy.embedUrl} className="w-full h-[500px]" title="Calendar" />
          ) : (
            <div className="text-center p-8">
              <Calendar className="w-16 h-16 text-[var(--color-accent)]/20 mx-auto mb-4" />
              <p className="font-body text-muted mb-4">Online scheduling</p>
              <FormButton>{copy?.cta || 'Book Online'}</FormButton>
            </div>
          )}
        </div>

        <p className="text-center mt-6 text-sm text-muted font-body">
          Or call{' '}
          <a href={telHref(business.phone)} className="text-[var(--color-accent)] font-semibold">
            {formatPhone(business.phone)}
          </a>
        </p>
      </Container>
    </Section>
  );
}
