/**
 * @metadata
 * name: Conversational
 * category: faq
 * KEEP: Chat-bubble style, questions in accent bubbles left, answers in neutral right,
 *       staggered entrance mimicking conversation flow, rounded bubble shapes
 * CHANGE: FAQ data, bubble colors, alignment
 * DON'T: Remove bubble style, flatten to plain text, drop conversation layout
 */

import { motion } from 'motion/react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function Conversational({ faqs }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="faq" spacing="generous">
      <Container maxWidth="md">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Got Questions?
        </motion.h2>

        <div ref={ref} className="space-y-6">
          {(faqs || []).map((faq, i) => (
            <div key={i} className="space-y-3">
              {/* Question bubble — left aligned */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <div className="max-w-[80%] px-5 py-3 rounded-2xl rounded-bl-sm bg-[var(--color-accent)] text-white">
                  <p className="font-body text-sm font-semibold">{faq.question}</p>
                </div>
              </motion.div>

              {/* Answer bubble — right aligned */}
              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
              >
                <div className="max-w-[80%] px-5 py-3 rounded-2xl rounded-br-sm bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                  <p className="font-body text-sm text-muted leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
