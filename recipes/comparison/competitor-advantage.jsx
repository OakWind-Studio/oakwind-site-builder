/**
 * @metadata
 * name: Competitor Advantage
 * category: comparison
 * KEEP: Key advantages displayed as cards with icons, staggered entrance,
 *       accent highlights, clear benefit statements
 * CHANGE: Advantage data, icons, card count
 * DON'T: Remove icons, flatten to text, drop card structure
 */

import { motion } from 'motion/react';
import { Zap, Shield, Clock, Star } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

const defaultIcons = [Zap, Shield, Clock, Star];

export default function CompetitorAdvantage({ business, copy }) {
  const [ref, inView] = useInViewport();
  const advantages = copy?.advantages || [];

  return (
    <Section id="advantages" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || `Why ${business.name}?`}
        </motion.h2>
        <motion.p
          className="font-body text-muted text-center max-w-xl mx-auto mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy?.subtext}
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {advantages.map((adv, i) => {
            const Icon = adv.icon || defaultIcons[i % defaultIcons.length];
            return (
              <motion.div
                key={i}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 flex items-start gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-text-primary">{adv.title}</h3>
                  <p className="font-body text-sm text-muted mt-1 leading-relaxed">{adv.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
