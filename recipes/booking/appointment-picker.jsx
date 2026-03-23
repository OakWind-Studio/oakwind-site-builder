/**
 * @metadata
 * name: Appointment Picker
 * category: booking
 * KEEP: Date/time selection UI mockup, CTA button, visual calendar feel,
 *       service type selector, clean booking interface
 * CHANGE: Service options, CTA text, heading
 * DON'T: Remove CTA, make text-only, drop booking interface
 */

import { motion } from 'motion/react';
import { Calendar, Clock, Phone } from 'lucide-react';
import { Section, Container, FormButton } from '../lib';
import { telHref, fadeUp } from '../lib';

export default function AppointmentPicker({ business, copy }) {
  const services = copy?.services || [];

  return (
    <Section id="booking" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <Calendar className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
              {copy?.heading || 'Book an Appointment'}
            </h2>
            <p className="font-body text-sm text-muted mt-2">
              {copy?.subtext || 'Select a service and preferred time'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Service selector */}
            <div>
              <label className="font-body text-sm font-semibold text-text-primary block mb-2">Service</label>
              <select className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] font-body text-sm text-text-primary">
                <option>Select a service</option>
                {services.map((s, i) => <option key={i}>{s}</option>)}
              </select>
            </div>

            {/* Date/Time mockup row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm font-semibold text-text-primary block mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" /> Date
                </label>
                <div className="px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] font-body text-sm text-muted">
                  Select date
                </div>
              </div>
              <div>
                <label className="font-body text-sm font-semibold text-text-primary block mb-2">
                  <Clock className="inline w-4 h-4 mr-1" /> Time
                </label>
                <div className="px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] font-body text-sm text-muted">
                  Select time
                </div>
              </div>
            </div>

            <FormButton className="w-full">
              {copy?.cta || 'Book Now'}
            </FormButton>

            <p className="text-center text-xs text-muted font-body">
              Or call us at{' '}
              <a href={telHref(business.phone)} className="text-[var(--color-accent)]">
                {business.phone}
              </a>
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
