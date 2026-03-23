/**
 * @metadata
 * name: Single Spotlight Cinematic
 * category: testimonials
 * KEEP: One massive quote in hero-weight section, oversized decorative quote marks,
 *       reviewer name + rating below, bg-surface-elevated, scale reveal on scroll
 * CHANGE: Quote text, reviewer name, rating, background surface treatment
 * DON'T: Add multiple reviews, shrink the quote, remove decorative quote marks
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Section, Container, StarRating } from '../lib';
import { cn } from '../lib';

export default function SingleSpotlightCinematic({ reviews, business }) {
  const review = reviews?.[0];
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  if (!review) return null;

  return (
    <Section id="reviews" bg="elevated" spacing="generous" animate="none">
      <motion.div ref={sectionRef} style={{ scale, opacity }}>
        <Container maxWidth="md" className="text-center py-8 md:py-16">
          {/* Decorative quote marks */}
          <div
            className="decorative-quotes select-none font-display text-[8rem] md:text-[12rem] leading-none -mb-16 md:-mb-24"
            style={{ color: 'var(--color-accent)', opacity: 0.15 }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* The quote */}
          <blockquote className="relative">
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-snug text-text-primary">
              {review.text}
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <StarRating rating={review.rating || 5} size={22} />
            <p className="font-display text-lg font-semibold text-text-primary">
              {review.name}
            </p>
            {review.service && (
              <p className="text-sm font-body text-muted">{review.service}</p>
            )}
          </div>
        </Container>
      </motion.div>
    </Section>
  );
}
