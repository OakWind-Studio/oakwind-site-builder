/**
 * @metadata
 * name: Testimonial Plus CTA
 * category: cta-breaks
 * KEEP: Featured single review (large quote, stars, name) with CTA button beneath.
 *       Combines social proof with conversion. Centered layout, accent border accent.
 * CHANGE: Review data, CTA copy, card styling
 * DON'T: Add multiple reviews, remove the phone CTA, separate review from CTA
 */

import { motion } from 'motion/react';
import { Phone, Quote } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { useInViewport, telHref, cn } from '../lib';

export default function TestimonialPlusCta({ business, copy }) {
  const [ref, inView] = useInViewport();
  const review = copy?.review || {};

  return (
    <Section id="cta-testimonial" bg="elevated" spacing="generous" animate="none">
      <Container maxWidth="md">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative quote icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: 'var(--color-accent)', opacity: 0.9 }}
          >
            <Quote className="w-6 h-6 text-white" />
          </div>

          {/* Stars */}
          <StarRating
            rating={review.rating || 5}
            size={22}
            className="justify-center mb-6"
          />

          {/* Quote */}
          <blockquote>
            <p className="font-display text-xl md:text-3xl lg:text-4xl leading-relaxed text-text-primary font-medium">
              &ldquo;{review.text || 'Outstanding service from start to finish. I couldn\'t recommend them more highly.'}&rdquo;
            </p>
          </blockquote>

          {/* Attribution */}
          <p className="mt-6 font-display font-bold text-text-primary text-lg">
            {review.name || 'A Happy Client'}
          </p>
          {review.service && (
            <p className="text-sm text-muted font-body mt-1">{review.service}</p>
          )}

          {/* Divider */}
          <div
            className="w-16 h-px mx-auto my-8"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />

          {/* CTA */}
          <p className="text-muted font-body mb-5">
            {copy?.subtext || 'Ready for the same experience?'}
          </p>
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Call Us Today'}
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}
