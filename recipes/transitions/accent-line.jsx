/**
 * @metadata
 * name: Accent Line
 * category: transitions
 * KEEP: Thin accent-colored horizontal line, width 60px, centered, simple elegance,
 *       purely decorative
 * CHANGE: Line width, thickness, color
 * DON'T: Add content, make full-width, add interactivity
 */

export default function AccentLine() {
  return (
    <div className="py-10 md:py-14 flex justify-center" aria-hidden="true">
      <div className="w-[60px] h-[3px] rounded-full bg-[var(--color-accent)]" />
    </div>
  );
}
