/**
 * @metadata
 * name: Why Us Table
 * category: comparison
 * KEEP: "Why Choose Us" comparison table, us vs typical competitor columns,
 *       checkmarks for us, neutral/X for competitors, row-based features
 * CHANGE: Feature list, competitor label, table styling
 * DON'T: Remove comparison structure, make single column, drop check/X marks
 */

import { Check, X, Minus } from 'lucide-react';
import { Section, Container } from '../lib';
import { cn, fadeUp } from '../lib';
import { motion } from 'motion/react';

export default function WhyUsTable({ business, copy }) {
  const features = copy?.features || [];

  return (
    <Section id="why-us" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || `Why Choose ${business.name}?`}
        </motion.h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[var(--color-border)]">
                <th className="text-left p-4 font-body text-sm text-muted w-1/2">Feature</th>
                <th className="p-4 text-center">
                  <span className="font-display text-sm font-bold text-[var(--color-accent)]">{business.name}</span>
                </th>
                <th className="p-4 text-center">
                  <span className="font-display text-sm font-bold text-muted">{copy?.competitorLabel || 'Typical Competitor'}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feat, i) => (
                <tr key={i} className="border-b border-[var(--color-border)]">
                  <td className="p-4 font-body text-sm text-text-primary">{feat.name}</td>
                  <td className="p-4 text-center">
                    {feat.us ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {feat.them ? (
                      <Check className="w-5 h-5 text-gray-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
