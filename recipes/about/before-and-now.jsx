/**
 * @metadata
 * name: Before and Now
 * category: about
 * KEEP: Split then-vs-now layout, old photo/story left + current right,
 *       shows growth and evolution, established business feel, divider accent
 * CHANGE: Then/now content, photos, year references
 * DON'T: Remove the comparison element, show only current, drop photos
 */

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function BeforeAndNow({ business, copy, images }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="about" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Then & Now'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-stretch">
          {/* Then */}
          <motion.div
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <OakImage
              src={images?.old}
              alt="The early days"
              aspect="16/9"
              className="w-full"
            />
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
                {copy?.thenLabel || `Est. ${business.yearFounded || 'Then'}`}
              </span>
              <h3 className="font-display text-xl font-bold text-text-primary mt-2 mb-2">
                {copy?.thenTitle || 'Where We Started'}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {copy?.thenText}
              </p>
            </div>
          </motion.div>

          {/* Arrow divider (desktop) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <ArrowRight className="w-8 h-8 text-[var(--color-accent)] drop-shadow-md" />
          </div>

          {/* Now */}
          <motion.div
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OakImage
              src={images?.current}
              alt={`${business.name} today`}
              aspect="16/9"
              className="w-full"
            />
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
                {copy?.nowLabel || 'Today'}
              </span>
              <h3 className="font-display text-xl font-bold text-text-primary mt-2 mb-2">
                {copy?.nowTitle || 'Where We Are Now'}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {copy?.nowText}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
