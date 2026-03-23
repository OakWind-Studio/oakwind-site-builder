/**
 * @metadata
 * name: Lightbox Masonry
 * category: galleries
 * KEEP: Masonry grid of clickable photos, useLightbox for fullscreen view,
 *       keyboard nav (arrow keys + escape), staggered entrance, overlay close button
 * CHANGE: Images data, column count, gap size
 * DON'T: Remove lightbox, flatten to uniform grid, drop keyboard nav
 */

import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useLightbox, useInViewport } from '../lib';

export default function LightboxMasonry({ images, business }) {
  const gallery = images?.gallery || [];
  const { isOpen, current, currentIndex, open, close, next, prev } = useLightbox(gallery);
  const [ref, inView] = useInViewport();

  return (
    <Section id="gallery" spacing="generous">
      <Container maxWidth="lg">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Our Work
        </h2>

        <div ref={ref} className="columns-2 md:columns-3 gap-4 space-y-4">
          {gallery.map((img, i) => (
            <motion.button
              key={i}
              className="w-full break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
              onClick={() => open(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <OakImage
                src={typeof img === 'string' ? img : img.src}
                alt={typeof img === 'string' ? `${business.name} work ${i + 1}` : img.alt}
                className="w-full hover:scale-105 transition-transform duration-300"
              />
            </motion.button>
          ))}
        </div>
      </Container>

      {/* Lightbox overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button onClick={close} className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close">
            <X className="w-8 h-8" />
          </button>
          <button onClick={prev} className="absolute left-4 text-white/70 hover:text-white" aria-label="Previous">
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button onClick={next} className="absolute right-4 text-white/70 hover:text-white" aria-label="Next">
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={typeof current === 'string' ? current : current?.src}
            alt=""
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body">
            {currentIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </Section>
  );
}
