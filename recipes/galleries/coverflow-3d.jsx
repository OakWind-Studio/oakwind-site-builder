/**
 * @metadata
 * name: Coverflow 3D
 * category: galleries
 * KEEP: 3D coverflow carousel using CSS transforms (perspective, rotateY),
 *       center image largest, side images rotated, prev/next navigation
 * CHANGE: Images data, perspective depth, rotation angle
 * DON'T: Remove 3D transforms, flatten to grid, drop navigation
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container, OakImage } from '../lib';
import { cn } from '../lib';

export default function Coverflow3D({ images, business }) {
  const gallery = images?.gallery || [];
  const [active, setActive] = useState(Math.floor(gallery.length / 2));

  const goNext = () => setActive((p) => (p + 1) % gallery.length);
  const goPrev = () => setActive((p) => (p - 1 + gallery.length) % gallery.length);

  return (
    <Section id="gallery" spacing="generous">
      <Container maxWidth="lg">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Gallery
        </h2>

        <div className="relative" style={{ perspective: '1200px' }}>
          <div className="flex items-center justify-center gap-2 md:gap-4 h-64 md:h-96">
            {gallery.map((img, i) => {
              const offset = i - active;
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              const src = typeof img === 'string' ? img : img.src;

              return (
                <div
                  key={i}
                  className={cn(
                    'absolute transition-all duration-500 rounded-xl overflow-hidden shadow-lg cursor-pointer',
                    isActive ? 'z-20' : absOffset === 1 ? 'z-10' : 'z-0',
                    absOffset > 2 && 'opacity-0 pointer-events-none'
                  )}
                  style={{
                    transform: `translateX(${offset * 120}px) scale(${isActive ? 1 : 0.75}) rotateY(${offset * -15}deg)`,
                    width: isActive ? '320px' : '240px',
                    opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25,
                  }}
                  onClick={() => setActive(i)}
                >
                  <OakImage src={src} alt={`${business.name} ${i + 1}`} aspect="4/3" />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={goPrev} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-muted hover:text-[var(--color-accent)] transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={goNext} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-muted hover:text-[var(--color-accent)] transition-colors" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
