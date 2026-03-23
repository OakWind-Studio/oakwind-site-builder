/**
 * @metadata
 * name: Before After Drag
 * category: galleries
 * KEEP: Side-by-side draggable comparison, useBeforeAfter hook for drag position,
 *       touch + mouse support, slider handle in center, labels for before/after
 * CHANGE: Before/after images, label text
 * DON'T: Remove drag interaction, use static split, drop touch support
 */

import { GripVertical } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useBeforeAfter } from '../lib';

export default function BeforeAfterDrag({ images, business }) {
  const { position, containerRef, handleMouseDown, handleTouchStart } = useBeforeAfter(50);

  return (
    <Section id="gallery" spacing="generous">
      <Container maxWidth="md">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Before & After
        </h2>

        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden cursor-col-resize select-none aspect-video"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* After image (full, behind) */}
          <OakImage
            src={images?.after}
            alt={`${business.name} after`}
            className="absolute inset-0 w-full h-full"
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <OakImage
              src={images?.before}
              alt={`${business.name} before`}
              className="absolute inset-0 w-full h-full"
              style={{ minWidth: containerRef.current?.offsetWidth }}
            />
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
              <GripVertical className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* Labels */}
          <span className="absolute top-3 left-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-body">
            Before
          </span>
          <span className="absolute top-3 right-3 px-2 py-1 rounded bg-black/50 text-white text-xs font-body">
            After
          </span>
        </div>
      </Container>
    </Section>
  );
}
