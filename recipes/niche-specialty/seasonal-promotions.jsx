/**
 * @metadata
 * name: Seasonal Promotions
 * category: niche-specialty
 * niche: general
 * KEEP: Seasonal/holiday promotions with date range, accent callout cards,
 *       Sparkles icon, prominent offer display, urgency feel
 * CHANGE: Promotion data, dates, offer details
 * DON'T: Remove date info, make subtle, drop accent styling
 */

import { motion } from 'motion/react';
import { Sparkles, Calendar } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function SeasonalPromotions({ business, copy }) {
  const [ref, inView] = useInViewport();
  const promos = copy?.promotions || [];

  return (
    <Section id="promos" spacing="generous">
      <Container maxWidth="md">
        <motion.div
          className="text-center mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            {copy?.heading || 'Current Specials'}
          </h2>
        </motion.div>

        <div ref={ref} className="space-y-4">
          {promos.map((promo, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border-2 border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-display text-xl font-bold text-text-primary">{promo.title}</h3>
              {promo.offer && (
                <p className="font-display text-2xl font-bold text-[var(--color-accent)] mt-2">{promo.offer}</p>
              )}
              {promo.description && (
                <p className="font-body text-sm text-muted mt-2">{promo.description}</p>
              )}
              {promo.dates && (
                <div className="flex items-center gap-2 mt-3 text-xs text-muted font-body">
                  <Calendar className="w-3 h-3" />
                  <span>{promo.dates}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
