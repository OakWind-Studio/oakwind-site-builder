# Stage 6 — Refine

> Fix failing dimensions identified in Stage 5. Apply targeted fixes, then re-verify. Hard ceiling: 3 refinement iterations.

---

## Dimension Fix Playbook

For each failing dimension, apply the specific fix actions below. Do NOT rebuild sections from scratch -- make surgical edits to the existing components.

### Visual Hierarchy — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Increase heading jumps | Set h1 to 5rem+, h2 to 3rem, h3 to 1.75rem. Minimum 1.67x ratio between levels. |
| Add weight contrast | Use 300 for labels/captions, 400 for body, 600 for subheadings, 800 for display. |
| Add a whisper section | Insert a breathing section (trust strip, stat bar, or divider) between two heavy sections. |
| Break center alignment | Make at least one section left-aligned or asymmetric (split layout, offset heading). |
| Vary max-widths | Use 4xl for narrow content, 6xl for standard, 7xl for features, full-bleed for heroes. |

### Animation Quality — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Replace fade-ups | Swap identical `fadeUp` reveals for varied types: slideIn, scaleReveal, clipPath reveal. |
| Use scroll-driven | Add CSS `animation-timeline: view()` or intersection observer with scroll progress. |
| Vary easing per section | Use named easings from anti-convergence.md: `reveal`, `revealGentle`, `interactive`. |
| Add CSS-native animation | Replace JS animations with CSS `@keyframes` + `animation-timeline` where possible. |
| Budget animations | One hero sequence + one scroll moment + micro-interactions. Not wall-to-wall. |

### Responsive Design — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Fix 390px overflow | Check all sections at 390px width. Common culprits: wide images, long words, padding. |
| Add mobile breakpoints | Ensure every grid/flex layout has a `sm:` / `md:` / `lg:` responsive pattern. |
| Increase touch targets | All buttons and links: min height 44px, min width 44px. Padding counts. |
| Fix image scaling | Use `object-cover` with explicit aspect ratios. No stretched or squished images. |
| Mobile nav | Hamburger menu for mobile. No desktop nav showing at small viewports. |

### Conversion Design — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Add tel: links | Target: 6+ placements — header, hero CTA, mid-page CTA, contact section, footer, floating mobile bar. |
| Increase CTA height | Primary CTAs: min 56px height. Text size: 18px+. Clear visual contrast. |
| Move trust before CTAs | Reviews, credentials, or stats should appear ABOVE or BEFORE the primary conversion CTA. |
| Add FloatingCTA | Import `FloatingCTA` from shared-lib. Shows on mobile as a sticky bottom bar with phone number. |
| Clear next-action | Every section should guide to the next: scroll cue, CTA button, or visual flow. |

### Copy Quality — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Run specificity test | Count hyper-specific details. Need 3+ that only apply to THIS business. |
| Kill zombie phrases | Search for banned phrases from copy-craft.md. Replace each with specific alternatives. |
| Fix hero headline | Must be <= 7 words with a differentiator. Use a formula from copy-craft.md. |
| Add specific proof points | Replace vague claims with numbers, names, timeframes, locations. |
| CTA specificity | Replace "Contact Us" with "Call {Owner Name}" or "Book a Free {Service}". |

### Uniqueness — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Swap most-similar recipe | Identify which recipe segment matches past builds. Replace with an unused alternative. |
| Change hero type | If hero matches a recent same-niche build, swap to a different hero recipe. |
| Shift palette mood | Move to the next recommended palette in oracle-mapping.js for this niche. |
| Check anti-convergence | Run through the 10-item AI Slop Gate. Fix any failing items. |
| Rotate font pairing | If same pairing was used recently, pick the next one in the same mood category. |

### Performance — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Lazy-load images | Add `loading="lazy"` to all images below the fold. Hero image stays eager. |
| Swap Motion to CSS | Replace framer-motion animations with CSS `@keyframes` + `animation-timeline`. |
| Check bundle size | Run `npm run build` and check `dist/` size. Target: < 500KB total. |
| Remove unused deps | Check `package.json` for packages not actually imported in any component. |
| Optimize images | Compress large images. Use WebP format if possible. Target: < 200KB per image. |

### Accessibility — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Add alt text | Every `<img>` and `OakImage` needs descriptive alt text. Not "image" or "photo". |
| Check contrast | Body text vs surface: >= 4.5:1. Large text (18px+ or 14px bold): >= 3:1. |
| Add skip link | Import `SkipLink` from shared-lib. Place as first child of `<body>`. |
| Add focus styles | All interactive elements need visible focus rings. Use `focus-visible:ring-2 ring-ring`. |
| Respect reduced-motion | Wrap animations in `@media (prefers-reduced-motion: no-preference)` or use the shared-lib hook. |

### Polish & Atmosphere — FAIL

| Fix Action | What to Do |
|-----------|-----------|
| Add noise texture | SVG noise at 3-5% opacity on the body background. Pattern from anti-convergence.md. |
| Add entrance curtain | Use the Curtain component from shared-lib for page load animation. |
| Vary section spacing | Alternate between tight, default, and spacious spacing on Section components. |
| Add CTA micro-interaction | Hover state on primary buttons: scale, shadow lift, or color shift. |
| Check OakWind footer | Must include "Website by OakWind Studio" linked to oakwindstudio.com. Subtle, muted styling. |

---

## Escalation Rules

| Scenario | Action |
|----------|--------|
| Dimension fails on first attempt | Apply fix playbook, re-verify |
| Same dimension fails 2x | Escalate — consider swapping the recipe for that section entirely |
| Same dimension fails 3x | Accept the limitation, note it in build log, move to Stage 7 |
| Hard ceiling reached (3 iterations total) | Stop refining. Ship what you have. Log all remaining issues. |

---

## Re-Verification

After applying fixes, return to Stage 5 and re-run the full 9-dimension + Slop Gate evaluation. Do NOT selectively re-check only the dimensions you fixed — other changes may have introduced regressions.

Threshold remains: 7+/9 dimensions AND 10/10 slop gate items to pass.
