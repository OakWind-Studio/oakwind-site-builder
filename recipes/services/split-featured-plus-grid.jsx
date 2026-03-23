/**
 * @metadata
 * name: Split Featured Plus Grid
 * category: services
 * KEEP: 1 large featured service (half width, big description) + remaining smaller cards
 *       in a grid beside it, two distinct visual hierarchies, featured has image/accent
 * CHANGE: Service data, which service is featured, grid density
 * DON'T: Make all cards same size, remove the split hierarchy, flatten to uniform grid
 */

import { motion } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function SplitFeaturedPlusGrid({ services, business }) {
  const [ref, inView] = useInViewport();
  const featured = services[0];
  const rest = services.slice(1);
  const FeaturedIcon = featured?.icon;

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured card — left half */}
          {featured && (
            <motion.div
              className="row-span-2 rounded-2xl overflow-hidden bg-[var(--color-accent)] text-white p-8 md:p-10 flex flex-col justify-between min-h-[400px]"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div>
                {FeaturedIcon && (
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                    <FeaturedIcon className="w-8 h-8 text-white" />
                  </div>
                )}
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  {featured.title}
                </h3>
                <p className="font-body text-white/80 leading-relaxed text-base md:text-lg">
                  {featured.description}
                </p>
              </div>
              {featured.price && (
                <p className="mt-6 text-2xl font-display font-bold">
                  {featured.price}
                </p>
              )}
            </motion.div>
          )}

          {/* Smaller cards — right side grid */}
          {rest.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              >
                <div className="w-11 h-11 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-text-primary mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted font-body leading-relaxed">
                    {service.description}
                  </p>
                  {service.price && (
                    <p className="mt-2 text-sm font-display font-semibold text-[var(--color-accent)]">
                      {service.price}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
