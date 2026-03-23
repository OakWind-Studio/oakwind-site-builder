/**
 * @metadata
 * name: Consultation Form
 * category: booking
 * KEEP: "Free Consultation" form with Input/Textarea/FormButton, warm heading,
 *       professional form layout, phone fallback, trust signal
 * CHANGE: Form fields, heading text, CTA label
 * DON'T: Remove form, drop phone fallback, make impersonal
 */

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Section, Container, Input, Textarea, FormButton } from '../lib';
import { telHref, formatPhone, fadeUp } from '../lib';

export default function ConsultationForm({ business, copy }) {
  return (
    <Section id="consultation" spacing="generous">
      <Container maxWidth="md">
        <motion.div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 md:p-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
              {copy?.heading || 'Free Consultation'}
            </h2>
            <p className="font-body text-sm text-muted mt-2">
              {copy?.subtext || 'Tell us about your needs and we\'ll get back to you within 24 hours.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="First Name" aria-label="First name" />
              <Input placeholder="Last Name" aria-label="Last name" />
            </div>
            <Input type="email" placeholder="Email Address" aria-label="Email" />
            <Input type="tel" placeholder="Phone Number" aria-label="Phone" />
            <Textarea placeholder="How can we help you?" rows={4} aria-label="Message" />
            <FormButton type="submit" className="w-full">
              {copy?.cta || 'Request Consultation'}
            </FormButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted font-body">Prefer to call?</p>
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-2 mt-2 text-[var(--color-accent)] font-semibold hover:brightness-110 transition-all"
            >
              <Phone className="w-4 h-4" />
              {formatPhone(business.phone)}
            </a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
