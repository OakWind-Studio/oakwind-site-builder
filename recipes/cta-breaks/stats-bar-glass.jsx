/**
 * @metadata
 * name: Stats Bar Glass
 * category: cta-breaks
 * KEEP: Glass card (.glass-card class) with 3-4 animated stats (useCounter + useInViewport)
 *       in a row, CTA button below. Weight: standard.
 * CHANGE: Stat values, stat labels, CTA copy, glass blur intensity
 * DON'T: Remove the glass effect, drop animated counters, remove phone CTA
 */

import { Phone } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, useCounter, telHref, cn } from '../lib';

const defaultStats = [
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 24, suffix: '/7', label: 'Availability' },
];

function AnimatedStat({ value, suffix, label, inView }) {
  const count = useCounter(value, 2000, inView);

  return (
    <div className="text-center px-4">
      <p className="font-display text-4xl md:text-5xl font-bold text-text-primary">
        {count}
        <span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted font-body">{label}</p>
    </div>
  );
}

export default function StatsBarGlass({ business, copy }) {
  const [ref, inView] = useInViewport({ threshold: 0.3 });
  const stats = copy?.stats || defaultStats;

  return (
    <Section id="stats-cta" spacing="default" animate="fadeUp">
      <Container maxWidth="lg">
        <div
          ref={ref}
          className="glass-card rounded-2xl p-8 md:p-12 backdrop-blur-xl border border-white/10"
          style={{
            background: 'rgba(var(--color-surface-rgb, 255,255,255), 0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat key={i} {...stat} inView={inView} />
            ))}
          </div>

          {/* Divider */}
          <div
            className="h-px my-8 mx-auto max-w-xs"
            style={{ backgroundColor: 'var(--color-border)' }}
          />

          {/* CTA */}
          <div className="text-center">
            <p className="font-display text-xl md:text-2xl font-bold text-text-primary mb-5">
              {copy?.headline || 'Join Our Growing Family'}
            </p>
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5" />
              {copy?.cta || 'Call Today'}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
