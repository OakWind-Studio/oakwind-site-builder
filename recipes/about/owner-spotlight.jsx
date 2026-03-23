/**
 * @metadata
 * name: Owner Spotlight
 * category: about
 * KEEP: Full-width section, large owner photo, pull quote in accent, brief story,
 *       personal warm tone, solo operator focus
 * CHANGE: Owner name, photo, quote, story text
 * DON'T: Add team grid, shrink the photo, remove pull quote
 */

import { motion } from 'motion/react';
import { Section, Container, FramedImage } from '../lib';
import { useInViewport } from '../lib';

export default function OwnerSpotlight({ business, copy, images }) {
  const [ref, inView] = useInViewport();

  return (
    <Section id="about" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <FramedImage
              src={images?.owner}
              alt={copy?.ownerName || 'Business owner'}
              aspect="4/5"
            />
          </motion.div>

          <div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {copy?.heading || `Meet ${copy?.ownerName || 'the Owner'}`}
            </motion.h2>

            {/* Pull quote */}
            <motion.blockquote
              className="mt-6 pl-4 border-l-4 border-[var(--color-accent)] italic font-display text-lg text-text-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              &ldquo;{copy?.quote}&rdquo;
            </motion.blockquote>

            <motion.p
              className="mt-6 font-body text-base text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {copy?.story}
            </motion.p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
