/**
 * @metadata
 * name: Stacked Editorial Alternating
 * category: testimonials
 * KEEP: Full-width vertical stack, alternating bg (surface/elevated), large serif quote text,
 *       right-aligned reviewer name, editorial magazine feel, generous vertical spacing
 * CHANGE: Quote text, reviewer names, font treatment, divider style
 * DON'T: Add grid layout, shrink quotes to small text, remove alternating backgrounds
 */

import { motion } from 'motion/react';
import { Section, Container, StarRating } from '../lib';
import { useInViewport, cn } from '../lib';

export default function StackedEditorialAlternating({ reviews, business }) {
  return (
    <Section id="reviews" spacing="default" animate="none">
      <Container maxWidth="md" className="mb-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
          Client Stories
        </h2>
      </Container>

      {reviews?.map((review, i) => (
        <EditorialQuote
          key={i}
          review={review}
          index={i}
          elevated={i % 2 !== 0}
        />
      ))}
    </Section>
  );
}

function EditorialQuote({ review, index, elevated }) {
  const [ref, inView] = useInViewport();

  return (
    <motion.div
      ref={ref}
      className={cn(
        'py-16 md:py-24',
        elevated ? 'bg-[var(--color-surface-elevated)]' : 'bg-[var(--color-surface)]'
      )}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {/* Decorative line */}
        <div
          className="w-12 h-px mb-8"
          style={{ backgroundColor: 'var(--color-accent)' }}
          aria-hidden="true"
        />

        <blockquote>
          <p className="font-display text-xl md:text-3xl lg:text-4xl leading-relaxed text-text-primary font-light italic">
            &ldquo;{review.text}&rdquo;
          </p>
        </blockquote>

        {/* Right-aligned attribution */}
        <div className="mt-8 flex flex-col items-end text-right">
          <StarRating rating={review.rating || 5} size={16} />
          <p className="mt-2 font-display font-semibold text-text-primary">
            {review.name}
          </p>
          {review.service && (
            <p className="text-sm text-muted font-body">{review.service}</p>
          )}
          {review.date && (
            <p className="text-xs text-muted font-body mt-1">{review.date}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
