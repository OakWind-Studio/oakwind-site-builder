/**
 * @metadata
 * name: Recognition Timeline
 * category: awards
 * KEEP: Timeline of awards/recognition over the years, vertical connecting line,
 *       year nodes, award details at each node, staggered entrance
 * CHANGE: Awards data, timeline length, node styling
 * DON'T: Remove timeline structure, flatten to list, drop year nodes
 */

import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function RecognitionTimeline({ business, copy }) {
  const [ref, inView] = useInViewport();
  const awards = copy?.awards || [];

  return (
    <Section id="recognition" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Years of Recognition'}
        </motion.h2>

        <div ref={ref} className="relative pl-12">
          {/* Connecting line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border)]" aria-hidden="true" />

          <div className="space-y-10">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Year node */}
                <div className="absolute -left-12 w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[var(--color-accent)]" />
                </div>

                <span className="font-display text-sm font-bold text-[var(--color-accent)]">
                  {award.year}
                </span>
                <h3 className="font-display text-base font-bold text-text-primary mt-1">
                  {award.name || award}
                </h3>
                {award.description && (
                  <p className="font-body text-sm text-muted mt-1">{award.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
