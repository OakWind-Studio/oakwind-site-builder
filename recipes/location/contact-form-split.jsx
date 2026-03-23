/**
 * @metadata
 * name: Contact Form Split
 * category: location
 * KEEP: Form left (Input, Textarea, FormButton) + contact info right,
 *       split layout, phone/email/address on info side, form validation feel
 * CHANGE: Form fields, contact details, heading text
 * DON'T: Remove form, remove contact info side, flatten to single column
 */

import { Phone, Mail, MapPin } from 'lucide-react';
import { Section, Container, Input, Textarea, FormButton } from '../lib';
import { telHref, formatPhone, fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function ContactFormSplit({ business }) {
  return (
    <Section id="contact" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Your Name" aria-label="Name" />
              <Input type="email" placeholder="Email" aria-label="Email" />
            </div>
            <Input type="tel" placeholder="Phone Number" aria-label="Phone" />
            <Textarea placeholder="How can we help?" rows={5} aria-label="Message" />
            <FormButton type="submit" className="w-full sm:w-auto">
              Send Message
            </FormButton>
          </form>

          {/* Contact info */}
          <div className="flex flex-col justify-center">
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              Contact Information
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wide">Phone</p>
                  <a href={telHref(business.phone)} className="font-body text-text-primary hover:text-[var(--color-accent)] transition-colors">
                    {formatPhone(business.phone)}
                  </a>
                </div>
              </li>
              {business.email && (
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted uppercase tracking-wide">Email</p>
                    <p className="font-body text-text-primary">{business.email}</p>
                  </div>
                </li>
              )}
              {business.address && (
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted uppercase tracking-wide">Address</p>
                    <p className="font-body text-text-primary">{business.address}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
