/**
 * @metadata
 * name: Diagonal Clip
 * category: transitions
 * KEEP: Angled divider using clip-path polygon, one color above another below,
 *       purely decorative, sharp diagonal line
 * CHANGE: Angle steepness, colors
 * DON'T: Add content, make interactive, remove clip-path
 */

export default function DiagonalClip() {
  return (
    <div className="relative h-20 md:h-28 w-full" aria-hidden="true">
      <div
        className="absolute inset-0 bg-[var(--color-surface)]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 100%)' }}
      />
      <div
        className="absolute inset-0 bg-[var(--color-surface-elevated)]"
        style={{ clipPath: 'polygon(0 100%, 100% 30%, 100% 100%)' }}
      />
    </div>
  );
}
