/**
 * @metadata
 * name: Grid Cards
 * category: faq
 * KEEP: FAQ as card grid, question as card title, answer as body,
 *       no accordion behavior, staggered entrance, elevated cards
 * CHANGE: FAQ data, grid columns, card styling
 * DON'T: Add accordion, flatten to list, drop card structure
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function GridCards({ faqs }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="faq" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Common Questions
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(faqs || []).map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="font-display text-base font-bold text-text-primary mb-3">
                {faq.question}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
