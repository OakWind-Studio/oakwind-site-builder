/**
 * @metadata
 * name: Tiered Pricing
 * category: menu-pricing
 * KEEP: Pricing table with columns per tier, rows for features, checkmarks/X marks,
 *       header row with tier names + prices, clean table layout
 * CHANGE: Tier data, features, pricing, column count
 * DON'T: Remove comparison structure, drop checkmarks, flatten to cards
 */

import { Check, X } from 'lucide-react';
import { Section, Container } from '../lib';
import { cn, fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function TieredPricing({ services, business }) {
  const tiers = services?.tiers || [];
  const features = services?.features || [];

  return (
    <Section id="pricing" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Compare Plans
        </motion.h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-4 font-body text-sm text-muted">Features</th>
                {tiers.map((tier, i) => (
                  <th key={i} className={cn('p-4 text-center', tier.recommended && 'bg-[var(--color-accent)]/5 rounded-t-xl')}>
                    <span className="font-display text-base font-bold text-text-primary block">{tier.name}</span>
                    <span className="font-display text-xl font-bold text-[var(--color-accent)] block mt-1">{tier.price}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, i) => (
                <tr key={i} className="border-t border-[var(--color-border)]">
                  <td className="p-4 font-body text-sm text-text-primary">{feat.name}</td>
                  {tiers.map((tier, j) => {
                    const included = tier.features?.includes(feat.name) ?? feat.tiers?.[j];
                    return (
                      <td key={j} className={cn('p-4 text-center', tier.recommended && 'bg-[var(--color-accent)]/5')}>
                        {included ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
