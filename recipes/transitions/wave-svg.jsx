/**
 * @metadata
 * name: Wave SVG
 * category: transitions
 * KEEP: SVG wave shape divider, curved organic line, fills surface-elevated below,
 *       purely decorative, responsive width
 * CHANGE: Wave curve shape, fill color
 * DON'T: Add content, make interactive, use non-SVG approach
 */

export default function WaveSvg() {
  return (
    <div className="w-full overflow-hidden leading-none" aria-hidden="true">
      <svg
        className="w-full h-16 md:h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,50 L1440,100 L0,100 Z"
          fill="var(--color-surface-elevated)"
        />
      </svg>
    </div>
  );
}
