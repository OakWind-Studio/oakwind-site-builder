/**
 * @metadata
 * name: Split Photo Story
 * category: about
 * KEEP: FramedImage left at 40% width on desktop, 3-paragraph narrative right,
 *       staggered text entrance, warm personal tone
 * CHANGE: Photo source, narrative text, frame accent
 * DON'T: Remove the photo, make photo full-width, drop narrative structure
 */

import { motion } from 'motion/react';
import { Section, Container, FramedImage } from '../lib';
import { useInViewport, fadeUp } from '../lib';

export default function SplitPhotoStory({ business, copy, images }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="about" spacing="generous">
      <Container maxWidth="lg">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Photo — 40% on desktop (2 of 5 cols) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <FramedImage
              src={images?.owner || images?.team}
              alt={`${business.name} owner`}
              aspect="3/4"
            />
          </motion.div>

          {/* Narrative — 60% on desktop (3 of 5 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-text-primary"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {copy?.heading || `About ${business.name}`}
            </motion.h2>

            {(copy?.paragraphs || []).map((text, i) => (
              <motion.p
                key={i}
                className="font-body text-base text-muted leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
