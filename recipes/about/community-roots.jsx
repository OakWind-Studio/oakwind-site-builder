/**
 * @metadata
 * name: Community Roots
 * category: about
 * KEEP: Neighborhood-focused messaging, "Proudly serving [area] since [year]",
 *       warm grounded tone, local landmark references, community involvement
 * CHANGE: Area name, year, landmarks, involvement details
 * DON'T: Remove local identity, make generic, drop the since-year element
 */

import { motion } from 'motion/react';
import { MapPin, Heart, Calendar } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport } from '../lib';

export default function CommunityRoots({ business, copy, images }) {
  const [ref, inView] = useInViewport();
  const highlights = copy?.highlights || [];

  return (
    <Section id="community" spacing="generous" bg="elevated">
      <Container maxWidth="lg">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.div
              className="flex items-center gap-2 text-[var(--color-accent)] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-body text-sm font-semibold uppercase tracking-wide">
                Local Roots
              </span>
            </motion.div>

            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-text-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Proudly Serving {copy?.area || business.city} Since {copy?.sinceYear || business.yearFounded}
            </motion.h2>

            <motion.p
              className="mt-4 font-body text-base text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {copy?.story}
            </motion.p>

            <div className="mt-8 space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <Heart className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-muted">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OakImage
              src={images?.community}
              alt={`${business.name} in the community`}
              aspect="4/3"
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
