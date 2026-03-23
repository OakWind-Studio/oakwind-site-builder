/**
 * @metadata
 * name: Timeline FAQ
 * category: faq
 * KEEP: Vertical timeline where each node is a Q&A pair, connecting line,
 *       question as node title, answer as body, staggered entrance
 * CHANGE: FAQ data, node styling, line color
 * DON'T: Remove timeline line, flatten to plain list, drop node markers
 */

import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { Section, Container } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function TimelineFaq({ faqs }) {
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
          Frequently Asked Questions
        </motion.h2>

        <div ref={ref} className="relative pl-10">
          {/* Connecting line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {(faqs || []).map((faq, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Node marker */}
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-[var(--color-accent)]" />
                </div>

                <h3 className="font-display text-base font-bold text-text-primary mb-2">
                  {faq.question}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
