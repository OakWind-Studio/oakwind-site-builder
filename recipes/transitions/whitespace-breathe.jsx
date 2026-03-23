/**
 * @metadata
 * name: Whitespace Breathe
 * category: transitions
 * KEEP: Generous empty space (py-16 md:py-24), no content, the luxury option,
 *       purely decorative breathing room
 * CHANGE: Spacing amount
 * DON'T: Add content, reduce to less than py-12, add decorative elements
 */

export default function WhitespaceBreathe() {
  return <div className="py-16 md:py-24" aria-hidden="true" />;
}
