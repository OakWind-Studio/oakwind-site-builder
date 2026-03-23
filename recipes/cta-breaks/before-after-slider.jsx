/**
 * @metadata
 * name: Before After Slider
 * category: cta-breaks
 * KEEP: Draggable comparison slider (useBeforeAfter hook), "See the Difference" headline,
 *       phone CTA below. Interactive drag handle with labels.
 * CHANGE: Before/after images, headline, CTA copy, slider labels
 * DON'T: Remove the drag interaction, drop the phone CTA, make it non-interactive
 */

import { Phone } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { useBeforeAfter, telHref, cn } from '../lib';

export default function BeforeAfterSlider({ business, copy }) {
  const { position, containerRef, handleMouseDown, handleTouchStart } = useBeforeAfter(50);

  return (
    <Section id="before-after" spacing="default" animate="fadeUp">
      <Container maxWidth="lg">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
            {copy?.headline || 'See the Difference'}
          </h2>
          <p className="mt-3 text-muted font-body">
            {copy?.subtext || 'Drag the slider to compare before and after'}
          </p>
        </div>

        {/* Slider container */}
        <div
          ref={containerRef}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[var(--color-border)]"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-label="Before and after comparison"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* After image (full width behind) */}
          <OakImage
            src={copy?.afterImage}
            alt="After"
            className="absolute inset-0 w-full h-full"
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <OakImage
              src={copy?.beforeImage}
              alt="Before"
              className="absolute inset-0 w-full h-full"
              style={{ minWidth: containerRef.current?.offsetWidth || '100%' }}
            />
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-1 z-10"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute inset-0 bg-white shadow-lg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-body font-medium z-20">
            Before
          </span>
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-body font-medium z-20">
            After
          </span>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-white font-semibold text-lg shadow-lg hover:brightness-110 transition-all"
          >
            <Phone className="w-5 h-5" />
            {copy?.cta || 'Get Your Free Estimate'}
          </a>
        </div>
      </Container>
    </Section>
  );
}
