/**
 * @metadata
 * name: Pricing Tier Cards
 * category: services
 * KEEP: Bronze/Silver/Gold or Basic/Premium tier cards, middle card highlighted with
 *       accent border + "Most Popular" badge, price prominent, feature list per tier
 * CHANGE: Tier names, pricing, feature lists, highlight position
 * DON'T: Remove the highlighted tier, make all cards identical, drop pricing display
 */

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function PricingTierCards({ services, business }) {
  const [ref, inView] = useInViewport();
  const midIndex = Math.floor(services.length / 2);

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            Choose Your Plan
          </h2>
          <p className="mt-3 text-muted font-body max-w-xl mx-auto">
            Transparent pricing for every budget
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {services.slice(0, 3).map((service, i) => {
            const Icon = service.icon;
            const isPopular = i === midIndex;

            return (
              <motion.div
                key={i}
                className={cn(
                  'relative rounded-2xl p-6 md:p-8 flex flex-col',
                  isPopular
                    ? 'border-2 border-[var(--color-accent)] bg-[var(--color-surface-elevated)] shadow-xl md:-mt-4 md:mb-[-1rem] z-10'
                    : 'border border-[var(--color-border)] bg-[var(--color-surface)]'
                )}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-accent)] text-white text-xs font-bold font-body rounded-full uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                {/* Tier icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    isPopular ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent)]/10'
                  )}>
                    <Icon className={cn('w-5 h-5', !isPopular && 'text-[var(--color-accent)]')} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {service.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <span className="font-display text-4xl font-bold text-text-primary">
                    {service.price || '$---'}
                  </span>
                </div>

                {/* Description as feature list */}
                <p className="text-sm text-muted font-body leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Feature bullets */}
                {service.features && (
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {service.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm font-body text-text-primary">
                        <Check className="w-4 h-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <button
                  className={cn(
                    'mt-auto w-full py-3 rounded-lg font-body font-semibold text-sm transition-all',
                    isPopular
                      ? 'bg-[var(--color-accent)] text-white hover:brightness-110'
                      : 'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5'
                  )}
                >
                  Get Started
                </button>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
