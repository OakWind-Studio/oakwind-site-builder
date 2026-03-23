/**
 * @metadata
 * name: Dotted Divider
 * category: transitions
 * KEEP: Horizontal dotted line divider, subtle minimal, centered with max-width,
 *       purely decorative
 * CHANGE: Dot spacing, color, line width
 * DON'T: Add content, make solid line, add interactivity
 */

export default function DottedDivider() {
  return (
    <div className="py-8 md:py-12 flex justify-center" aria-hidden="true">
      <div
        className="w-full max-w-xs border-t-2 border-dotted border-[var(--color-border)]"
      />
    </div>
  );
}
