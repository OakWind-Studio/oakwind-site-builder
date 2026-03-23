/**
 * @metadata
 * name: Bento Mixed Grid
 * category: services
 * KEEP: First card spans 2 cols + 2 rows (featured), remaining cards uniform,
 *       BentoItem primitives, staggered entrance, icon + title + description per card
 * CHANGE: Service data, number of services, accent colors
 * DON'T: Remove the featured-card hierarchy, flatten to uniform grid, drop icons
 */

import { motion } from 'motion/react';
import { Section, Container, Grid, BentoItem } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function BentoMixedGrid({ services, business }) {
  const [ref, inView] = useInViewport();

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

        <div ref={ref}>
          <Grid variant="bento" gap="gap-4 md:gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isFeatured = i === 0;

              return (
                <BentoItem
                  key={i}
                  colSpan={isFeatured ? 8 : 4}
                  rowSpan={isFeatured ? 2 : 1}
                  className="col-span-4"
                >
                  <motion.div
                    className={cn(
                      'h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 md:p-8',
                      'hover:shadow-lg transition-shadow duration-300',
                      isFeatured && 'flex flex-col justify-center'
                    )}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className={cn(
                      'flex items-center justify-center rounded-xl bg-[var(--color-accent)]/10',
                      isFeatured ? 'w-16 h-16 mb-6' : 'w-12 h-12 mb-4'
                    )}>
                      <Icon className={cn(
                        'text-[var(--color-accent)]',
                        isFeatured ? 'w-8 h-8' : 'w-6 h-6'
                      )} />
                    </div>

                    <h3 className={cn(
                      'font-display font-bold text-text-primary',
                      isFeatured ? 'text-2xl md:text-3xl mb-3' : 'text-lg mb-2'
                    )}>
                      {service.title}
                    </h3>

                    <p className={cn(
                      'font-body text-muted leading-relaxed',
                      isFeatured ? 'text-base md:text-lg max-w-xl' : 'text-sm'
                    )}>
                      {service.description}
                    </p>

                    {service.price && (
                      <p className={cn(
                        'font-display font-semibold text-[var(--color-accent)] mt-3',
                        isFeatured ? 'text-xl' : 'text-base'
                      )}>
                        {service.price}
                      </p>
                    )}
                  </motion.div>
                </BentoItem>
              );
            })}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
