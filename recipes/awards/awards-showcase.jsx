/**
 * @metadata
 * name: Awards Showcase
 * category: awards
 * KEEP: Award display with year, name, and badge icon, elevated cards,
 *       staggered entrance, professional prestige feel
 * CHANGE: Awards data, icon choices, card layout
 * DON'T: Remove badge icons, drop year, flatten to text
 */

import { motion } from 'motion/react';
import { Award, Trophy } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function AwardsShowcase({ business, copy }) {
  const [ref, inView] = useInViewport();
  const awards = copy?.awards || business.awards || [];

  return (
    <Section id="awards" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Trophy className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            {copy?.heading || 'Awards & Recognition'}
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Award className="w-10 h-10 text-[var(--color-accent)] mx-auto mb-4" />
              <h3 className="font-display text-base font-bold text-text-primary">{award.name || award}</h3>
              {award.year && (
                <p className="font-body text-sm text-muted mt-1">{award.year}</p>
              )}
              {award.issuer && (
                <p className="font-body text-xs text-muted mt-1">{award.issuer}</p>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
