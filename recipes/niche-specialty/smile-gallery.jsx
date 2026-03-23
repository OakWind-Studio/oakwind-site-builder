/**
 * @metadata
 * name: Smile Gallery
 * category: niche-specialty
 * niche: dental
 * KEEP: Before/after smile photos in lightbox grid, useLightbox for fullscreen,
 *       paired before/after layout, clean dental aesthetic
 * CHANGE: Photos, grid columns, caption text
 * DON'T: Remove lightbox, show single photos only, drop before/after pairing
 */

import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useLightbox, useInViewport, fadeUp } from '../lib';

export default function SmileGallery({ business, copy }) {
  const [ref, inView] = useInViewport();
  const cases = copy?.cases || [];
  const allImages = cases.flatMap((c) => [c.before, c.after]);
  const lb = useLightbox(allImages);

  return (
    <Section id="smile-gallery" spacing="generous">
      <Container maxWidth="lg">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {copy?.heading || 'Smile Transformations'}
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="grid grid-cols-2">
                <button onClick={() => lb.open(i * 2)} className="relative cursor-pointer">
                  <OakImage src={c.before} alt="Before" aspect="4/3" className="w-full" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/50 text-white text-xs">Before</span>
                </button>
                <button onClick={() => lb.open(i * 2 + 1)} className="relative cursor-pointer">
                  <OakImage src={c.after} alt="After" aspect="4/3" className="w-full" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/50 text-white text-xs">After</span>
                </button>
              </div>
              {c.treatment && (
                <p className="p-3 font-body text-sm text-muted text-center">{c.treatment}</p>
              )}
            </motion.div>
          ))}
        </div>
      </Container>

      {lb.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button onClick={lb.close} className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close"><X className="w-8 h-8" /></button>
          <button onClick={lb.prev} className="absolute left-4 text-white/70 hover:text-white" aria-label="Previous"><ChevronLeft className="w-10 h-10" /></button>
          <button onClick={lb.next} className="absolute right-4 text-white/70 hover:text-white" aria-label="Next"><ChevronRight className="w-10 h-10" /></button>
          <img src={lb.current} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" />
        </div>
      )}
    </Section>
  );
}
