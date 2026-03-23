/**
 * @metadata
 * name: Full Bleed Photo
 * category: transitions
 * KEEP: Full-width full-height photo as visual break, OakImage with object-cover,
 *       RevealImage clip animation on scroll, no text overlay
 * CHANGE: Image source, aspect ratio
 * DON'T: Add text overlay, shrink width, remove reveal animation
 */

import { RevealImage } from '../lib';

export default function FullBleedPhoto({ images }) {
  return (
    <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <RevealImage
        src={images?.break || images?.hero}
        alt=""
        className="w-full h-full"
      />
    </div>
  );
}
