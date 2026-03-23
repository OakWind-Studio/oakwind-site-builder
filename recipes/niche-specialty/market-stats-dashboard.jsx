/**
 * @metadata
 * name: Market Stats Dashboard
 * category: niche-specialty
 * niche: realtor
 * KEEP: Median price, days on market, inventory stats, animated counters (useCounter),
 *       dashboard card layout, professional data display
 * CHANGE: Stats values, labels, card styling
 * DON'T: Remove counter animation, drop stat cards, make informal
 */

import { motion } from 'motion/react';
import { TrendingUp, Clock, Home, DollarSign } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, useCounter, fadeUp } from '../lib';

function StatCard({ icon: Icon, value, prefix, suffix, label, inView, delay }) {
  const count = useCounter(value, 2000, inView);
  return (
    <motion.div
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <Icon className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
      <p className="font-display text-3xl font-bold text-text-primary">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="font-body text-sm text-muted mt-1">{label}</p>
    </motion.div>
  );
}

export default function MarketStatsDashboard({ business, copy }) {
  const [ref, inView] = useInViewport();
  const stats = copy?.stats || [
    { icon: DollarSign, value: 425000, prefix: '$', suffix: '', label: 'Median Price' },
    { icon: Clock, value: 18, prefix: '', suffix: ' days', label: 'Avg Days on Market' },
    { icon: Home, value: 142, prefix: '', suffix: '', label: 'Active Listings' },
    { icon: TrendingUp, value: 12, prefix: '', suffix: '%', label: 'Year Over Year Growth' },
  ];

  return (
    <Section id="market-stats" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Local Market Snapshot'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} inView={inView} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
