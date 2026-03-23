/**
 * @metadata
 * name: Package Comparison
 * category: niche-specialty
 * niche: detailing
 * KEEP: Bronze/Silver/Gold packages with feature matrix, highlighted tier,
 *       check/x marks per feature, price prominent, clean comparison
 * CHANGE: Package data, tier names, features, pricing
 * DON'T: Remove comparison structure, flatten to cards, drop feature matrix
 */

import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function PackageComparison({ business, copy }) {
  const [ref, inView] = useInViewport();
  const packages = copy?.packages || [];
  const features = copy?.features || [];

  return (
    <Section id="packages" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Choose Your Package'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              className={cn(
                'rounded-2xl border p-6 flex flex-col',
                pkg.highlighted
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-lg'
                  : 'border-[var(--color-border)] bg-[var(--color-surface-elevated)]'
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {pkg.highlighted && (
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">Best Value</span>
              )}
              <h3 className="font-display text-xl font-bold text-text-primary">{pkg.name}</h3>
              <p className="font-display text-3xl font-bold text-[var(--color-accent)] mt-2">{pkg.price}</p>

              <ul className="mt-6 space-y-3 flex-1">
                {features.map((feat, j) => {
                  const included = pkg.included?.includes(feat);
                  return (
                    <li key={j} className="flex items-center gap-2">
                      {included ? (
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span className={cn('font-body text-sm', included ? 'text-text-primary' : 'text-muted/50')}>
                        {feat}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
