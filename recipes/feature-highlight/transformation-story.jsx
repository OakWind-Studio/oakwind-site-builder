/**
 * @metadata
 * name: Transformation Story
 * category: feature-highlight
 * KEEP: Before -> process -> after narrative, three-step visual flow,
 *       arrow/connector between steps, images for before/after
 * CHANGE: Step content, images, connector style
 * DON'T: Remove three-step structure, drop images, flatten to text
 */

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function TransformationStory({ business, copy, images }) {
  const [ref, inView] = useInViewport();

  const steps = [
    { label: 'Before', image: images?.before, text: copy?.beforeText },
    { label: 'The Process', image: images?.process, text: copy?.processText },
    { label: 'After', image: images?.after, text: copy?.afterText },
  ];

  return (
    <Section id="transformation" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'The Transformation'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <OakImage src={step.image} alt={step.label} aspect="4/3" className="rounded-xl w-full" />
                <p className="font-display text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mt-3">
                  {step.label}
                </p>
                <p className="font-body text-sm text-muted mt-1">{step.text}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center self-center pt-4">
                  <ArrowRight className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
