/**
 * @metadata
 * name: Featured Plus Supporting
 * category: testimonials
 * KEEP: 1 large featured review (photo, full quote, detailed) on top,
 *       3-4 smaller review cards in a row below. Two-level hierarchy.
 * CHANGE: Featured card styling, supporting card count, accent treatment
 * DON'T: Make all cards the same size, remove the hierarchy, drop the featured review
 */

import { motion } from 'motion/react';
import { Section, Container, StarRating } from '../lib';
import { useInViewport, fadeUp, cn } from '../lib';

export default function FeaturedPlusSupporting({ reviews, business }) {
  if (!reviews?.length) return null;

  const featured = reviews[0];
  const supporting = reviews.slice(1, 5);
  const initials = (name) =>
    name?.split(' ').map((n) => n[0]).join('').slice(0, 2);

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
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Featured review — large card */}
        <FeaturedCard review={featured} initials={initials} />

        {/* Supporting reviews — row below */}
        {supporting.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {supporting.map((review, i) => (
              <SupportingCard key={i} review={review} index={i} initials={initials} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

function FeaturedCard({ review, initials }) {
  const [ref, inView] = useInViewport();

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-8 md:p-12 border border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex flex-col md:flex-row gap-8 items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Photo / avatar */}
      <div className="shrink-0">
        {review.photo ? (
          <img
            src={review.photo}
            alt={review.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[var(--color-accent)]/20"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {initials(review.name)}
          </div>
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <StarRating rating={review.rating || 5} size={20} className="justify-center md:justify-start" />
        <blockquote className="mt-4">
          <p className="font-display text-xl md:text-2xl leading-relaxed text-text-primary font-medium">
            &ldquo;{review.text}&rdquo;
          </p>
        </blockquote>
        <div className="mt-5">
          <p className="font-display font-bold text-text-primary">{review.name}</p>
          {review.service && (
            <p className="text-sm text-muted font-body mt-0.5">{review.service}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SupportingCard({ review, index, initials }) {
  const [ref, inView] = useInViewport();

  return (
    <motion.div
      ref={ref}
      className="rounded-xl p-5 border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <StarRating rating={review.rating || 5} size={14} />
      <p className="mt-3 text-sm text-text-primary font-body leading-relaxed line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {initials(review.name)}
        </div>
        <p className="font-display text-sm font-semibold text-text-primary truncate">
          {review.name}
        </p>
      </div>
    </motion.div>
  );
}
