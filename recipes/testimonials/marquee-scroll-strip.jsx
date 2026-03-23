/**
 * @metadata
 * name: Marquee Scroll Strip
 * category: testimonials
 * KEEP: Continuous auto-scrolling horizontal marquee, CSS-only animation,
 *       whisper weight (visual break), short review excerpts, no interaction needed
 * CHANGE: Scroll speed, text styling, accent treatment
 * DON'T: Add click handlers, make it full-height, use JS-based scroll
 */

import { Section, StarRating } from '../lib';
import { cn } from '../lib';

export default function MarqueeScrollStrip({ reviews, business }) {
  // Duplicate reviews for seamless loop
  const items = reviews?.length ? [...reviews, ...reviews] : [];

  return (
    <Section id="reviews" weight="whisper" animate="none" className="overflow-hidden">
      {/* CSS marquee animation */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="flex items-center gap-2 mb-6 justify-center">
        <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'var(--color-border)' }} />
        <h2 className="font-display text-sm uppercase tracking-widest text-muted font-medium">
          What People Say
        </h2>
        <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'var(--color-border)' }} />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-surface), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-surface), transparent)' }}
        />

        {/* Marquee track */}
        <div className="marquee-track flex gap-8 whitespace-nowrap w-max">
          {items.map((review, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
            >
              <StarRating rating={review.rating || 5} size={12} />
              <p className="text-sm font-body text-text-primary whitespace-nowrap max-w-[280px] truncate">
                &ldquo;{review.text}&rdquo;
              </p>
              <span className="text-xs text-muted font-body whitespace-nowrap">
                — {review.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
