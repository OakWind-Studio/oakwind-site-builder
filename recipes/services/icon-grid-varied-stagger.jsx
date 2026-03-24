/**
 * @metadata
 * name: Icon Grid Varied Stagger
 * category: services
 * KEEP: Standard icon grid BUT each card has a DIFFERENT entrance animation
 *       (fadeUp, slideInLeft, scaleUp, slideInRight), varied stagger not uniform,
 *       rotation pattern cycles through 4 entrances
 * CHANGE: Service data, grid columns, animation speed
 * DON'T: Make all entrances the same, remove varied stagger, use uniform delay
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp, slideInLeft, slideInRight, scaleUp } from '../lib';

const entranceVariants = [fadeUp, slideInLeft, scaleUp, slideInRight];

export default function IconGridVariedStagger({ services, business }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="services" weight="standard">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What We Do
        </motion.h2>
        <motion.p
          className="text-muted font-body text-center mb-12 max-w-xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Quality service from start to finish
        </motion.p>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const entrance = entranceVariants[i % entranceVariants.length];
            const delays = [0.1, 0.25, 0.15, 0.3];

            return (
              <motion.div
                key={i}
                className="text-center p-6 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={entrance.hidden}
                animate={inView ? entrance.visible : {}}
                transition={{
                  duration: 0.6,
                  delay: delays[i % delays.length] + Math.floor(i / 4) * 0.2,
                }}
              >
                <div className="flex flex-col items-center mb-4">
                  <Icon className="w-7 h-7 text-[var(--color-accent)]" />
                  <div className="w-6 h-0.5 rounded-full bg-[var(--color-accent)]/40 mt-2" />
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted font-body leading-relaxed">
                  {service.description}
                </p>
                {service.price && (
                  <p className="mt-3 font-display font-semibold text-[var(--color-accent)]">
                    {service.price}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
