/**
 * @metadata
 * name: Offset Editorial
 * category: galleries
 * KEEP: Staggered grid with every other column offset by mt-8, magazine editorial feel,
 *       mixed aspect ratios, elegant spacing, rounded corners
 * CHANGE: Images, column count, offset amount
 * DON'T: Remove stagger offset, make uniform grid, drop rounded corners
 */

import { motion } from 'motion/react';
import { Section, Container, OakImage } from '../lib';
import { useInViewport } from '../lib';

export default function OffsetEditorial({ images, business }) {
  const gallery = images?.gallery || [];
  const [ref, inView] = useInViewport();

  const col1 = gallery.filter((_, i) => i % 2 === 0);
  const col2 = gallery.filter((_, i) => i % 2 === 1);

  return (
    <Section id="gallery" spacing="generous">
      <Container maxWidth="lg">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Portfolio
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 — flush */}
          <div className="space-y-6">
            {col1.map((img, i) => {
              const src = typeof img === 'string' ? img : img.src;
              return (
                <motion.div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <OakImage
                    src={src}
                    alt={`${business.name} work`}
                    aspect={i % 2 === 0 ? '4/3' : '3/4'}
                    className="w-full"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Column 2 — offset */}
          <div className="space-y-6 mt-0 md:mt-8">
            {col2.map((img, i) => {
              const src = typeof img === 'string' ? img : img.src;
              return (
                <motion.div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                >
                  <OakImage
                    src={src}
                    alt={`${business.name} work`}
                    aspect={i % 2 === 0 ? '3/4' : '4/3'}
                    className="w-full"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
