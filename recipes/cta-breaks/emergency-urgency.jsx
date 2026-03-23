/**
 * @metadata
 * name: Emergency Urgency
 * category: cta-breaks
 * KEEP: "Call Now" CTA with pulsing animation, availability indicator
 *       ("Available 24/7" or "Open Today Until 6PM"), red/accent urgency colors.
 *       For emergency services. Pulsing ring animation on CTA button.
 * CHANGE: Availability text, urgency messaging, CTA label
 * DON'T: Remove the pulsing animation, drop availability indicator, soften the urgency
 */

import { motion } from 'motion/react';
import { Phone, Clock, AlertCircle } from 'lucide-react';
import { Section, Container } from '../lib';
import { telHref, cn } from '../lib';

export default function EmergencyUrgency({ business, copy }) {
  return (
    <Section id="cta-emergency" spacing="default" animate="fadeUp">
      <Container maxWidth="md" className="text-center">
        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm font-body font-semibold text-red-500">
            {copy?.badge || 'Emergency Service Available'}
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary leading-tight">
          {copy?.headline || 'Need Help Right Now?'}
        </h2>

        <p className="mt-4 text-lg text-muted font-body max-w-lg mx-auto">
          {copy?.subtext || "Don't wait. Our team is standing by to help you immediately."}
        </p>

        {/* Pulsing CTA button */}
        <div className="mt-10 relative inline-flex">
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ backgroundColor: 'var(--color-accent)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <a
            href={telHref(business.phone)}
            className="relative inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-[var(--color-accent)] text-white font-bold text-xl shadow-2xl hover:brightness-110 transition-all"
          >
            <Phone className="w-6 h-6" />
            {copy?.cta || 'Call Now'}
          </a>
        </div>

        {/* Availability indicator */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-sm font-body font-medium text-text-primary">
            {copy?.availability || 'Available 24/7'}
          </span>
        </div>

        {/* Response time */}
        <div className="mt-4 inline-flex items-center gap-2 text-muted">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-body">
            {copy?.responseTime || 'Average response time: 30 minutes'}
          </span>
        </div>
      </Container>
    </Section>
  );
}
