/**
 * @metadata
 * name: Masonry Varied Height
 * category: testimonials
 * KEEP: Pinterest-style offset grid layout, varied card heights based on quote length,
 *       every-other-column mt-8 offset, card structure (stars + quote + name)
 * CHANGE: Column count, gap size, card styling, review data
 * DON'T: Make all cards same height, remove the offset pattern, use uniform grid
 */

import { motion } from 'motion/react';
import { Section, Container, StarRating } from '../lib';
import { useInViewport, fadeUp, cn } from '../lib';

export default function MasonryVariedHeight({ reviews, business }) {
  // Split reviews into 2 or 3 columns
  const cols = [[], [], []];
  reviews?.forEach((r, i) => cols[i % 3].push({ ...r, _i: i }));

  return (
    <Section id="reviews" spacing="default" animate="fadeUp">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            Trusted by Our Community
          </h2>
          <p className="mt-3 text-muted font-body max-w-xl mx-auto">
            Hear what our clients have to say
          </p>
        </motion.div>

        {/* Masonry grid with offset columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cols.map((col, colIdx) => (
            <div
              key={colIdx}
              className={cn('flex flex-col gap-6', colIdx % 2 !== 0 && 'md:mt-8')}
            >
              {col.map((review) => (
                <MasonryCard key={review._i} review={review} index={review._i} />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MasonryCard({ review, index }) {
  const [ref, inView] = useInViewport();

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-6 border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <StarRating rating={review.rating || 5} size={14} />
      <p className="mt-3 text-text-primary font-body leading-relaxed text-sm">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-2">
        {/* Initials circle */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {review.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-text-primary">{review.name}</p>
          {review.service && (
            <p className="text-xs text-muted font-body">{review.service}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
