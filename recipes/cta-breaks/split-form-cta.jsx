/**
 * @metadata
 * name: Split Form CTA
 * category: cta-breaks
 * KEEP: Left side: headline + trust signals. Right side: simple contact form
 *       (Input, Textarea, FormButton from shared-lib). Split layout. Phone link in left column.
 * CHANGE: Form fields, headline, trust signals, CTA copy
 * DON'T: Remove the form, drop the phone CTA on left, make it single column on desktop
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Shield, CheckCircle } from 'lucide-react';
import { Section, Container, Input, Textarea, FormButton } from '../lib';
import { useInViewport, telHref, cn } from '../lib';

export default function SplitFormCta({ business, copy }) {
  const [ref, inView] = useInViewport();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="contact" spacing="default" animate="none">
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Left: headline + trust signals */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
              {copy?.headline || 'Get in Touch'}
            </h2>
            <p className="mt-4 text-lg text-muted font-body leading-relaxed">
              {copy?.subtext || 'Fill out the form or give us a call. We respond within 24 hours.'}
            </p>

            {/* Phone CTA */}
            <a
              href={telHref(business.phone)}
              className="mt-6 inline-flex items-center gap-2 text-lg font-display font-bold transition-colors hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
            >
              <Phone className="w-5 h-5" />
              {business.phone}
            </a>

            {/* Trust signals */}
            <div className="mt-8 space-y-3">
              {(copy?.trustItems || ['Free estimates', 'No obligation', 'Response within 24 hours']).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm font-body text-text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div className="rounded-2xl p-6 md:p-8 border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-accent)' }} />
                <p className="font-display text-xl font-bold text-text-primary">
                  Thank You!
                </p>
                <p className="mt-2 text-sm text-muted font-body">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name" name="name" required />
                <Input label="Phone Number" name="phone" type="tel" required />
                <Input label="Email" name="email" type="email" />
                <Textarea label="How can we help?" name="message" rows={3} />
                <FormButton className="w-full">
                  {copy?.formCta || 'Send Message'}
                </FormButton>
                <p className="text-xs text-muted font-body text-center mt-2">
                  Or call us directly at{' '}
                  <a href={telHref(business.phone)} className="underline" style={{ color: 'var(--color-accent)' }}>
                    {business.phone}
                  </a>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
