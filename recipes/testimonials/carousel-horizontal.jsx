/**
 * @metadata
 * name: Carousel Horizontal
 * category: testimonials
 * KEEP: Horizontal scroll cards with snap-x, arrow buttons for desktop,
 *       swipe on mobile, auto-scroll option, card structure (quote + name + stars + service)
 * CHANGE: Card styling, review data, auto-scroll interval
 * DON'T: Remove snap scrolling, drop arrow navigation, remove star ratings
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container, StarRating } from '../lib';
import { cn, fadeUp } from '../lib';

export default function CarouselHorizontal({ reviews, business }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector('[data-card]')?.offsetWidth || 320;
    el.scrollBy({ left: dir * (cardW + 24), behavior: 'smooth' });
  };

  // Auto-scroll every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll(1);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section id="reviews" spacing="default" animate="fadeUp">
      <Container maxWidth="xl">
        <motion.div
          className="flex items-end justify-between mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              What Our Clients Say
            </h2>
            <p className="mt-2 text-muted font-body">Real reviews from real customers</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-colors hover:border-[var(--color-accent)] disabled:opacity-30"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-colors hover:border-[var(--color-accent)] disabled:opacity-30"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </Container>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 md:px-8 pb-4 no-scrollbar"
        style={{ scrollPaddingLeft: '1.25rem' }}
      >
        {reviews?.map((review, i) => (
          <div
            key={i}
            data-card
            className="snap-start shrink-0 w-[85vw] md:w-[380px] rounded-2xl p-6 border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
          >
            <StarRating rating={review.rating || 5} size={16} />
            <p className="mt-4 text-text-primary font-body leading-relaxed line-clamp-5">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
              <p className="font-display font-semibold text-text-primary">{review.name}</p>
              {review.service && (
                <p className="text-sm text-muted font-body mt-0.5">{review.service}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
