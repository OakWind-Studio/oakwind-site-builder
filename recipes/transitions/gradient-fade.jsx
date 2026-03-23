/**
 * @metadata
 * name: Gradient Fade
 * category: transitions
 * KEEP: Smooth gradient from section A bg to section B bg, 6rem height,
 *       purely decorative, linear-gradient transition
 * CHANGE: From/to colors via CSS variables
 * DON'T: Add content, increase height beyond visual bridge, add interactivity
 */

export default function GradientFade() {
  return (
    <div
      className="h-24 w-full"
      style={{
        background: 'linear-gradient(to bottom, var(--color-surface), var(--color-surface-elevated))',
      }}
      aria-hidden="true"
    />
  );
}
