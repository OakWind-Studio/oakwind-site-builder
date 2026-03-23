/**
 * @metadata
 * name: Rotating Spotlight
 * category: testimonials
 * KEEP: Single review display that fades/slides between 3-5 reviews on a 5s timer,
 *       navigation dots below, useState + setInterval rotation, centered layout
 * CHANGE: Transition style (fade/slide), timer interval, card styling
 * DON'T: Show multiple reviews at once, remove navigation dots, drop auto-rotation
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, Container, StarRating } from '../lib';
import { cn } from '../lib';

export default function RotatingSpotlight({ reviews, business }) {
  const items = reviews?.slice(0, 5) || [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Auto-rotation — 5s interval
  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, items.length]);

  if (!items.length) return null;
  const review = items[active];

  return (
    <Section id="reviews" bg="elevated" spacing="generous" animate="fadeUp">
      <Container maxWidth="md" className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-12">
          What People Are Saying
        </h2>

        {/* Rotating review display */}
        <div
          className="relative min-h-[200px] md:min-h-[180px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <StarRating
                rating={review.rating || 5}
                size={20}
                className="justify-center mb-6"
              />

              <blockquote>
                <p className="font-display text-xl md:text-2xl lg:text-3xl leading-relaxed text-text-primary font-medium">
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>

              <div className="mt-6">
                <p className="font-display font-bold text-text-primary text-lg">
                  {review.name}
                </p>
                {review.service && (
                  <p className="text-sm text-muted font-body mt-1">{review.service}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                i === active
                  ? 'w-8 bg-[var(--color-accent)]'
                  : 'bg-[var(--color-border)] hover:bg-[var(--color-muted)]'
              )}
              aria-label={`Show review ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
