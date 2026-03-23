# Stage 5 — Verify

> Evaluate the build against 9 quality dimensions and the AI Slop Gate. Output: pass/fail scorecard with specific findings per dimension.

---

## 1. Run verify.sh

```bash
bash <skill-path>/scripts/verify.sh <project-dir>
```

Automated checks:
- Build succeeds (`npm run build`)
- ESLint passes (if installed)
- OakWind Studio footer present in source
- `tel:` links present in source
- `scroll-behavior: smooth` present
- Bundle size under 500KB

Fix any failures before proceeding to manual review.

---

## 2. Screenshots

If Playwright MCP is available, take screenshots at 3 viewports:

| Viewport | Width | Device Proxy | What to Check |
|----------|-------|-------------|--------------|
| Mobile | 390px | iPhone 15 | Touch targets, overflow, stacking, CTA visibility |
| Tablet | 768px | iPad Mini | The demo device — must look flawless |
| Desktop | 1024px | Laptop | Max-width usage, whitespace balance, hero scale |

Start the dev server first: `npm run dev` — then screenshot at `http://localhost:5173`.

Take full-page screenshots. Review each viewport for layout issues, text overflow, image cropping, and touch target sizing.

---

## 3. 9-Dimension Pass/Fail

Score each dimension as PASS or FAIL. Provide specific evidence for each.

### 1. Visual Hierarchy
- **PASS:** Heading size jumps >= 2x between levels. Font weight range spans 300-800. Clear distinction between h1, h2, h3, and body text. At least one section with asymmetric layout.
- **FAIL:** Headings feel similar in size. Narrow weight range. Everything centered with no variation.

### 2. Animation Quality
- **PASS:** Scroll-triggered reveals with varied easing. No bounce/elastic on scroll. At least 2 distinct animation types (e.g., fade + slide + scale). Animations feel intentional, not decorative.
- **FAIL:** All sections use identical fade-up. Bounce/elastic easing on reveals. No animation at all. Wall-to-wall identical motion.

### 3. Responsive Design
- **PASS:** No horizontal overflow at 390px. Touch targets >= 44px. Text readable without zoom. Images scale properly. Nav works on mobile.
- **FAIL:** Content overflows on mobile. Tiny tap targets. Text too small. Images cropped badly. Desktop nav shown on mobile.

### 4. Conversion Design
- **PASS:** 6+ `tel:` link placements (header, hero, mid-page CTA, contact, footer, floating mobile bar). CTA buttons >= 56px height. Trust signals (reviews, credentials) placed before primary CTA. Clear next-action on every viewport.
- **FAIL:** Fewer than 6 tel: links. Small CTAs. No trust signals before conversion points. Dead-end sections with no next step.

### 5. Copy Quality
- **PASS:** Hero headline <= 7 words with a differentiator. No zombie phrases (see copy-craft.md banned list). 3+ hyper-specific details unique to this business. Copy fails the "swap competitor name" test (it wouldn't work for someone else).
- **FAIL:** Generic headlines. Zombie phrases present. Copy works for any business in the niche. No specific details.

### 6. Uniqueness
- **PASS:** Fingerprint similarity < 5/8 with any past same-niche build. Hero layout differs from last same-niche build. Color palette differs from last same-niche build. No banned AI patterns from anti-convergence.md.
- **FAIL:** Fingerprint similarity >= 5/8. Same hero type as recent build. Same palette. AI slop patterns present.

### 7. Performance
- **PASS:** Bundle < 500KB. Images lazy-loaded below the fold. No unnecessary npm packages. CSS animations preferred over JS where possible. First Contentful Paint feels instant.
- **FAIL:** Bundle > 500KB. All images eager-loaded. Unused heavy packages. JS-driven animations for simple transitions.

### 8. Accessibility
- **PASS:** All images have descriptive alt text. Color contrast >= 4.5:1 for body text, >= 3:1 for large text. Skip-to-content link present. Focus styles visible. `prefers-reduced-motion` respected.
- **FAIL:** Missing alt text. Poor contrast. No skip link. No visible focus states. Animations ignore reduced-motion.

### 9. Polish & Atmosphere
- **PASS:** Custom scrollbar styled. Page entrance curtain animation. Noise texture on backgrounds. Varied section spacing (not all identical). At least one micro-interaction on CTA hover. OakWind footer present with correct link.
- **FAIL:** Browser default scrollbar. No entrance animation. Flat backgrounds. Identical spacing. Static CTAs. Missing OakWind footer.

---

## 4. AI Slop Gate

The final 10-item gate from `references/anti-convergence.md`. Every item must pass.

| # | Check | Pass Condition |
|---|-------|---------------|
| 1 | No Inter/Roboto/Poppins as display font | Display font is from curated pairings, not a banned font |
| 2 | No purple-to-blue gradients | No gradient transitions from purple to blue anywhere |
| 3 | Card grids not all identical | Cards vary in at least one dimension: height, width, padding, or radius |
| 4 | Background not pure #FFFFFF or #000000 | All backgrounds use off-white, off-black, or palette surface tokens |
| 5 | Hero stats not generic 3-column | If stats exist, they break the "3 boxes with icon + number + label" pattern |
| 6 | No bounce/elastic on scroll reveals | All scroll animations use named easings from anti-convergence.md |
| 7 | Not all sections center-aligned | At least one section breaks center alignment with asymmetry |
| 8 | Font-weight range >= 300-800 | Page uses 3+ distinct weights spanning the full range |
| 9 | Heading size jumps >= 2x | h1 to h2 ratio is 1.67x+ (e.g., 80px h1, 48px h2) |
| 10 | Copy not swappable with competitor | Business name swap test fails — copy is specific to this business |

---

## 5. Scoring

**Pass threshold:** 7+ of 9 dimensions pass AND all 10 AI Slop Gate items pass.

| Score | Action |
|-------|--------|
| 9/9 dimensions + 10/10 slop | Ship it. Proceed to Stage 7 (Learn). |
| 7-8/9 dimensions + 10/10 slop | Acceptable. Note failing dimensions for future improvement. Proceed to Stage 7. |
| 7+/9 dimensions but slop failures | Fix slop items first (they're usually quick fixes), then re-score. |
| < 7/9 dimensions | Proceed to Stage 6 (Refine). List each failing dimension with specific issues. |

Record the scorecard in the build log for Stage 7.
