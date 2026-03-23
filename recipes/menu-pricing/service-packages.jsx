/**
 * @metadata
 * name: Service Packages
 * category: menu-pricing
 * KEEP: Package cards (Basic/Standard/Premium), feature list in each card,
 *       highlighted recommended package, price prominent, CTA per card
 * CHANGE: Package data, tier names, features, pricing
 * DON'T: Remove feature lists, drop pricing, remove card structure
 */

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function ServicePackages({ services, business }) {
  const [ref, inView] = useInViewport();
  const packages = services || [];

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
          Our Packages
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              className={cn(
                'rounded-2xl border p-6 md:p-8 flex flex-col',
                pkg.recommended
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-lg scale-[1.02]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface-elevated)]'
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {pkg.recommended && (
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-text-primary">{pkg.name}</h3>
              <p className="font-display text-3xl font-bold text-[var(--color-accent)] mt-3">
                {pkg.price}
              </p>
              {pkg.description && (
                <p className="font-body text-sm text-muted mt-2">{pkg.description}</p>
              )}

              <ul className="mt-6 space-y-3 flex-1">
                {(pkg.features || []).map((feat, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-muted">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
