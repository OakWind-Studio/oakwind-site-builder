/**
 * @metadata
 * name: Image Break Strip
 * category: transitions
 * KEEP: Full-width thin photo strip (h-48), OakImage with object-cover,
 *       visual break between content sections, no text overlay
 * CHANGE: Image source, strip height
 * DON'T: Add text overlay, make interactive, change to non-image
 */

import { OakImage } from '../lib';

export default function ImageBreakStrip({ images }) {
  return (
    <div className="w-full h-48 md:h-64 overflow-hidden" aria-hidden="true">
      <OakImage
        src={images?.break || images?.hero}
        alt=""
        className="w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
