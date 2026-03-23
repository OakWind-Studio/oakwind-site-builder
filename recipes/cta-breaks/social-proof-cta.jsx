/**
 * @metadata
 * name: Social Proof CTA
 * category: cta-breaks
 * KEEP: Star rating + review count + "Join X Happy Customers" + phone CTA.
 *       Trust-stacked conversion. Centered layout with stacked trust signals.
 * CHANGE: Review count, customer count, trust badges, CTA copy
 * DON'T: Remove star rating, drop review count, remove the phone CTA
 */

import { motion } from 'motion/react';
import { Phone, Star, Users, Shield } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useInViewport, useCounter, telHref, cn } from '../lib';

export default function SocialProofCta({ business, copy }) {
  const [ref, inView] = useInViewport({ threshold: 0.3 });
  const customerCount = useCounter(copy?.customerCount || 500, 2000, inView);

  return (
    <Section id="cta-social-proof" bg="elevated" spacing="default" animate="none">
      <Container maxWidth="md">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Star rating prominent display */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <StarRating
              rating={copy?.rating || 4.9}
              size={28}
              count={copy?.reviewCount}
              showCount
            />
            <p className="text-lg font-display font-bold text-text-primary">
              {copy?.rating || '4.9'} out of 5 stars
            </p>
          </div>

          {/* Customer count */}
          <p className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Join{' '}
            <span style={{ color: 'var(--color-accent)' }}>{customerCount}+</span>{' '}
            Happy Customers
          </p>
          <p className="text-muted font-body max-w-lg mx-auto">
            {copy?.subtext || "See why your neighbors trust us with their most important projects."}
          </p>

          {/* Trust badges row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {(copy?.trustItems || ['Licensed & Insured', 'Satisfaction Guaranteed', 'Locally Owned']).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <Shield className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm font-body text-text-primary font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={telHref(business.phone)}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Get Your Free Quote'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
