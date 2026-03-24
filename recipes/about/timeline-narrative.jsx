/**
 * @metadata
 * name: Timeline Narrative
 * category: about
 * KEEP: Vertical connecting line, year nodes as circles, milestone title + description,
 *       alternating left/right on desktop, staggered entrance
 * CHANGE: Milestones data, accent colors, node styling
 * DON'T: Remove connecting line, flatten to plain list, drop year nodes
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, cn, fadeUp } from '../lib';

export default function TimelineNarrative({ business, copy }) {
  const [ref, inView] = useInViewport();
  const milestones = copy?.milestones || [];

  return (
    <Section id="about" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Our Journey'}
        </motion.h2>

        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />

          {milestones.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={cn(
                  'relative flex items-start gap-6 mb-12 last:mb-0',
                  'md:flex-row',
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {/* Year node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 shrink-0 flex flex-col items-center">
                  <span className="text-xs font-bold text-[var(--color-accent)]">{item.year}</span>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1" />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    'ml-20 md:ml-0 md:w-[calc(50%-2rem)]',
                    isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
                  )}
                >
                  <h3 className="font-display text-lg font-bold text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
