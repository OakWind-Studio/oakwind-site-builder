/**
 * @metadata
 * name: Google Review Style
 * category: testimonials
 * KEEP: Cards styled like Google review cards (white card, Google "G" icon, blue stars,
 *       reviewer name, date, snippet). Familiar trust pattern. Grid layout.
 * CHANGE: Review data, card count, grid columns
 * DON'T: Remove the Google-style visual cues, change star color from blue, drop the "G" icon
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp, cn } from '../lib';

function GoogleStar({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#FBBC04' : '#dadce0'} aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function GoogleReviewStyle({ reviews, business }) {
  return (
    <Section id="reviews" spacing="default" bg="elevated" animate="fadeUp">
      <Container maxWidth="lg">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              Google Reviews
            </h2>
            <p className="mt-2 text-muted font-body">
              See what customers say about {business.name}
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
            <GoogleIcon />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <GoogleStar key={n} filled />
              ))}
            </div>
            <span className="text-sm font-body font-semibold text-text-primary">
              {reviews?.length || 0} reviews
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews?.map((review, i) => (
            <GoogleCard key={i} review={review} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function GoogleCard({ review, index }) {
  const [ref, inView] = useInViewport();
  const initials = review.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <motion.div
      ref={ref}
      className="rounded-lg p-5 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
    >
      {/* Header: avatar + name + date */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: '#1a73e8' }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-primary truncate">{review.name}</p>
          {review.date && (
            <p className="text-xs text-muted">{review.date}</p>
          )}
        </div>
        <GoogleIcon />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <GoogleStar key={n} filled={n <= (review.rating || 5)} />
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm text-text-primary font-body leading-relaxed line-clamp-4">
        {review.text}
      </p>

      {review.service && (
        <p className="mt-2 text-xs text-muted font-body italic">
          Service: {review.service}
        </p>
      )}
    </motion.div>
  );
}
