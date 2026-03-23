/**
 * @metadata
 * name: Quote Wall With Photos
 * category: testimonials
 * KEEP: Dense grid of cards with reviewer photo (or initials circle), quote excerpt,
 *       name, stars. Compact social-proof-heavy layout. 2-col mobile, 3-col desktop
 * CHANGE: Grid density, card style, photo size, excerpt length
 * DON'T: Make cards large and spacious, remove photos/initials, reduce to single column
 */

import { motion } from 'motion/react';
import { Section, Container, StarRating } from '../lib';
import { useInViewport, cn } from '../lib';

export default function QuoteWallWithPhotos({ reviews, business }) {
  return (
    <Section id="reviews" spacing="default" animate="stagger">
      <Container maxWidth="xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            Loved by Our Clients
          </h2>
          <p className="mt-3 text-muted font-body">
            {reviews?.length || 0}+ five-star reviews and counting
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews?.map((review, i) => (
            <WallCard key={i} review={review} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WallCard({ review, index }) {
  const [ref, inView] = useInViewport();
  const initials = review.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <motion.div
      ref={ref}
      className="flex gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
    >
      {/* Photo or initials */}
      <div className="shrink-0">
        {review.photo ? (
          <img
            src={review.photo}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-display text-sm font-semibold text-text-primary truncate">
            {review.name}
          </p>
          <StarRating rating={review.rating || 5} size={12} />
        </div>
        <p className="text-sm text-muted font-body leading-relaxed line-clamp-3">
          {review.text}
        </p>
        {review.service && (
          <p className="mt-1.5 text-xs font-body" style={{ color: 'var(--color-accent)' }}>
            {review.service}
          </p>
        )}
      </div>
    </motion.div>
  );
}
