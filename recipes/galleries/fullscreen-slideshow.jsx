/**
 * @metadata
 * name: Fullscreen Slideshow
 * category: galleries
 * KEEP: Full-viewport slideshow, prev/next arrows, auto-advance timer,
 *       counter showing "3 / 12", fade transitions between slides
 * CHANGE: Images, auto-advance speed, counter position
 * DON'T: Remove navigation arrows, remove counter, drop auto-advance
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, OakImage } from '../lib';

export default function FullscreenSlideshow({ images, business }) {
  const gallery = images?.gallery || [];
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((p) => (p + 1) % gallery.length);
  const goPrev = () => setCurrent((p) => (p - 1 + gallery.length) % gallery.length);

  useEffect(() => {
    if (gallery.length < 2) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  if (!gallery.length) return null;
  const src = typeof gallery[current] === 'string' ? gallery[current] : gallery[current]?.src;

  return (
    <Section id="slideshow" weight="hero" spacing="hero" animate="none" className="relative bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <OakImage src={src} alt={`${business.name} ${current + 1}`} className="w-full h-full" loading="eager" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors" aria-label="Previous">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors" aria-label="Next">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-body">
        {current + 1} / {gallery.length}
      </div>
    </Section>
  );
}
