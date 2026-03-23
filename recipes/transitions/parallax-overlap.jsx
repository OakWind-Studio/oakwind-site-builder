/**
 * @metadata
 * name: Parallax Overlap
 * category: transitions
 * KEEP: Elements from section above overlap into transition zone, creates depth,
 *       useParallaxY for parallax effect, decorative circles/shapes
 * CHANGE: Shape elements, parallax strength, colors
 * DON'T: Add text content, remove parallax, flatten to static
 */

import { useRef } from 'react';
import { motion } from 'motion/react';
import { useParallaxY } from '../lib';

export default function ParallaxOverlap() {
  const ref = useRef(null);
  const y = useParallaxY(ref, 0.3);

  return (
    <div ref={ref} className="relative h-32 md:h-40 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-8 left-[15%] w-24 h-24 rounded-full bg-[var(--color-accent)]/10"
        style={{ y }}
      />
      <motion.div
        className="absolute -top-4 right-[20%] w-16 h-16 rounded-full bg-[var(--color-accent)]/5"
        style={{ y }}
      />
      <motion.div
        className="absolute top-4 left-[50%] w-20 h-20 rounded-full bg-[var(--color-accent)]/8"
        style={{ y }}
      />
    </div>
  );
}
