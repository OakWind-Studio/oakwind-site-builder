/**
 * @metadata
 * name: Horizontal Strip
 * category: galleries
 * KEEP: Thin auto-scrolling photo strip (h-32), CSS marquee animation,
 *       visual break, continuous scroll, duplicated images for seamlessness
 * CHANGE: Images, strip height, scroll speed
 * DON'T: Add interactivity, make vertical, add text overlay
 */

import { OakImage } from '../lib';

export default function HorizontalStrip({ images, business }) {
  const gallery = images?.gallery || [];
  const doubled = [...gallery, ...gallery];

  return (
    <div className="w-full h-32 md:h-40 overflow-hidden" aria-label={`${business.name} photo gallery`}>
      <div
        className="flex gap-2 h-full animate-marquee"
        style={{
          width: 'max-content',
          animation: 'marquee 30s linear infinite',
        }}
      >
        {doubled.map((img, i) => {
          const src = typeof img === 'string' ? img : img.src;
          return (
            <div key={i} className="h-full w-48 md:w-56 shrink-0 rounded-lg overflow-hidden">
              <OakImage src={src} alt="" className="w-full h-full" />
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
