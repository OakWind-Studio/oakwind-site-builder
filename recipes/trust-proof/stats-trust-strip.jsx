/**
 * @metadata
 * name: Stats Trust Strip
 * category: trust-proof
 * KEEP: Horizontal row of trust stats (years, customers, rating), useCounter for animation,
 *       whisper weight, centered layout, animated numbers on scroll
 * CHANGE: Stats data, number values, labels
 * DON'T: Remove counter animation, flatten to text, add heavy decoration
 */

import { Section, Container } from '../lib';
import { useInViewport, useCounter } from '../lib';

function StatItem({ value, suffix, label, inView }) {
  const count = useCounter(value, 2000, inView);
  return (
    <div className="text-center px-4">
      <p className="font-display text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
        {count}{suffix}
      </p>
      <p className="font-body text-sm text-muted mt-1">{label}</p>
    </div>
  );
}

export default function StatsTrustStrip({ business }) {
  const [ref, inView] = useInViewport();
  const stats = business.stats || [
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 500, suffix: '+', label: 'Happy Customers' },
    { value: 5, suffix: '★', label: 'Google Rating' },
  ];

  return (
    <Section id="stats" weight="whisper">
      <Container maxWidth="lg">
        <div
          ref={ref}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16"
        >
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              suffix={stat.suffix || ''}
              label={stat.label}
              inView={inView}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
