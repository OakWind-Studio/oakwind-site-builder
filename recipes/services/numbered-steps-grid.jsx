/**
 * @metadata
 * name: Numbered Steps Grid
 * category: services
 * KEEP: Grid of cards each with large decorative number (01, 02, 03...) in oversized
 *       accent color, icon + title + description below, numbers are dominant visual element
 * CHANGE: Service data, grid density, number styling, accent color
 * DON'T: Remove the large numbers, make numbers small, use bullet points instead
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function NumberedStepsGrid({ services, business }) {
  const [ref, inView] = useInViewport();

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
            How It Works
          </h2>
          <p className="mt-3 text-muted font-body max-w-xl mx-auto">
            Our proven process delivers results
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const num = String(i + 1).padStart(2, '0');

            return (
              <motion.div
                key={i}
                className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 pt-8 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Large decorative number */}
                <span
                  className="absolute -top-4 -right-2 font-display text-8xl md:text-9xl font-black text-[var(--color-accent)]/8 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {num}
                </span>

                {/* Foreground number badge */}
                <span className="inline-block font-display text-2xl font-bold text-[var(--color-accent)] mb-3">
                  {num}
                </span>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {service.title}
                  </h3>
                </div>

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
