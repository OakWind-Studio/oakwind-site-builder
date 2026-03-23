/**
 * @metadata
 * name: Family Story
 * category: about
 * KEEP: Multi-generational narrative, old + new photos side by side, warm traditional feel,
 *       "A Family Tradition" heading pattern, FramedImage for photos
 * CHANGE: Family story text, photos, generation details
 * DON'T: Remove generational element, use single photo, make cold/corporate
 */

import { motion } from 'motion/react';
import { Section, Container, FramedImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function FamilyStory({ business, copy, images }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="about" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'A Family Tradition'}
        </motion.h2>
        <motion.p
          className="font-body text-muted text-center max-w-xl mx-auto mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy?.subtext}
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <FramedImage
              src={images?.old || images?.historic}
              alt="The early days"
              aspect="4/3"
            />
            <p className="mt-3 text-sm text-muted font-body text-center italic">
              {copy?.oldCaption || 'Where it all began'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FramedImage
              src={images?.current || images?.team}
              alt={`${business.name} today`}
              aspect="4/3"
            />
            <p className="mt-3 text-sm text-muted font-body text-center italic">
              {copy?.newCaption || `${business.name} today`}
            </p>
          </motion.div>
        </div>

        <motion.p
          className="font-body text-base text-muted leading-relaxed max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {copy?.story}
        </motion.p>
      </Container>
    </Section>
  );
}
