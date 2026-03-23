/**
 * @metadata
 * name: Construction Process
 * category: niche-specialty
 * niche: home-builder
 * KEEP: Phase-by-phase build timeline, numbered steps, connecting line,
 *       phase title + description, professional builder feel
 * CHANGE: Phase data, number of phases, descriptions
 * DON'T: Remove timeline structure, flatten to cards, drop numbering
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function ConstructionProcess({ business, copy }) {
  const [ref, inView] = useInViewport();
  const phases = copy?.phases || [];

  return (
    <Section id="process" spacing="generous" bg="elevated">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Our Build Process'}
        </motion.h2>

        <div ref={ref} className="relative pl-12">
          {/* Connecting line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border)]" aria-hidden="true" />

          <div className="space-y-10">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Step number */}
                <div className="absolute -left-12 w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-white">{i + 1}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                  {phase.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {phase.description}
                </p>
                {phase.duration && (
                  <p className="font-body text-xs text-[var(--color-accent)] mt-2 font-semibold">
                    ~{phase.duration}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
