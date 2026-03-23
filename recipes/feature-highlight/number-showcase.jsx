/**
 * @metadata
 * name: Number Showcase
 * category: feature-highlight
 * KEEP: One impressive number displayed huge with context, useCounter animation,
 *       centered layout, supporting text below the number
 * CHANGE: Number value, suffix, context text
 * DON'T: Add multiple numbers, make number small, drop context
 */

import { Section, Container } from '../lib';
import { useInViewport, useCounter } from '../lib';

export default function NumberShowcase({ business, copy }) {
  const [ref, inView] = useInViewport();
  const count = useCounter(copy?.value || 0, 2500, inView);

  return (
    <Section id="number" spacing="generous" bg="elevated">
      <Container maxWidth="sm" className="text-center">
        <div ref={ref}>
          <p className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--color-accent)] leading-none">
            {copy?.prefix}{count.toLocaleString()}{copy?.suffix}
          </p>
          <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary mt-6">
            {copy?.headline}
          </h2>
          <p className="font-body text-base text-muted mt-3 max-w-md mx-auto leading-relaxed">
            {copy?.description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
