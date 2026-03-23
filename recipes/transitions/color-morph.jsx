/**
 * @metadata
 * name: Color Morph
 * category: transitions
 * KEEP: Background color shifts as you scroll past, useSectionMorph from scroll.js,
 *       smooth scroll-driven color transition, decorative
 * CHANGE: From/to colors
 * DON'T: Add content, remove scroll linkage, use static color
 */

import { useRef } from 'react';
import { motion } from 'motion/react';
import { useSectionMorph } from '../lib';

export default function ColorMorph() {
  const ref = useRef(null);
  const bg = useSectionMorph(ref, 'var(--color-surface)', 'var(--color-surface-elevated)');

  return (
    <motion.div
      ref={ref}
      className="h-24 md:h-32 w-full"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    />
  );
}
