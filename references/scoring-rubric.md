# Quality Scoring Rubric

## How Scoring Works

9 dimensions, each pass/fail. A build passes when:
- **7+ dimensions pass** (out of 9)
- **AI Slop Gate passes** (all 10 items must clear)

If <7 pass OR slop gate fails → enter Stage 6 (Refine).

---

## Dimensions

### 1. Visual Hierarchy

**Pass when ALL true:**
- Type size jumps ≥2x between heading levels (body 16px → h3 28px+ → h2 48px+ → h1 80px+)
- 3+ distinct font-weight levels used across the page (e.g., 300, 400, 700)
- Visual weight alternates between sections (no two HERO-weight sections back-to-back)
- At least 2 whisper-weight sections exist (breathing room between heavy blocks)

**Fail signal:** Squint test — if all sections blur into the same visual mass, hierarchy is flat.

### 2. Animation Quality

**Pass when ALL true:**
- No two adjacent sections use the same animation type
- At least 1 section uses a scroll-driven technique (parallax, reveal-on-scroll with progress, counter — NOT just fade-up)
- No `linear` easing on UI transitions (use cubic-bezier or named easings)
- No `bounce` or `elastic` easing on scroll reveals (reserve for micro-interactions only)
- Animation timing varies across sections (not all 0.6s or all 0.3s)

**Fail signal:** Scroll the full page — if everything fades up at the same speed, animation is monotone.

### 3. Responsive Design

**Pass when ALL true:**
- No horizontal overflow at 390px viewport width
- All multi-column grids collapse to single column on mobile (grid-cols-1 at base)
- Touch targets ≥44px on all interactive elements (buttons, links, nav items)
- Body text ≥16px on mobile (no 14px body copy)
- Floating mobile CTA bar visible on small screens, hidden on desktop

**Fail signal:** Drag browser to 390px — any horizontal scroll or overlapping elements = immediate fail.

### 4. Conversion Design

**Pass when ALL true:**
- `tel:` link count ≥6 across: header, hero, mid-page CTA, contact section, footer, floating mobile bar
- Primary CTA buttons ≥56px height (big enough to thumb-tap without hesitation)
- Trust signals (reviews, years in business, certifications) appear BEFORE every CTA, not after
- Phone number formatted consistently with proper `tel:` href on every instance

**Fail signal:** Search codebase for `tel:` — if count <6, conversion paths are incomplete.

### 5. Copy Quality

**Pass when ALL true:**
- 3+ hyper-specific details that could ONLY apply to this business (neighborhood names, service quirks, owner backstory)
- Zero zombie phrases: "committed to excellence", "state-of-the-art", "your satisfaction is our priority", "premier", "solutions"
- Section labels have personality (NOT "Our Services", "About Us", "Testimonials" — those are filing cabinet labels)
- Hero headline is ≤7 words and does not start with "Welcome to"
- CTA text is action-specific ("Call Mike Now", "Get Your Free Estimate") — never "Contact Us" or "Learn More"

**Fail signal:** Replace the business name with a competitor's — if the copy still works, it's too generic.

### 6. Uniqueness

**Pass when ALL true:**
- Design fingerprint is <50% similar to past same-niche builds (compare hero type + layout + palette mood + animation set)
- Recipe combination (hero + section types + atmosphere) has not been used in a previous build
- Hero variant differs from the last same-niche build

**Fail signal:** Place two same-niche builds side by side — if a client could confuse them, uniqueness fails.

### 7. Performance

**Pass when ALL true:**
- Total JS bundle <500KB (sum of all JS assets in dist/)
- Hero image uses `loading="eager"`, all below-fold images use `loading="lazy"`
- No unnecessary npm packages installed (no lodash for one utility, no moment.js)
- Build completes without warnings or errors

**Fail signal:** Run `du -sb dist/assets/*.js` — if total exceeds 512000 bytes, trim dependencies.

### 8. Accessibility

**Pass when ALL true:**
- Skip-to-content link present and functional (`<a href="#main" class="sr-only focus:not-sr-only">`)
- `:focus-visible` styles applied on all interactive elements (visible keyboard focus ring)
- `prefers-reduced-motion` media query respected (disables/reduces animations when set)
- All `<img>` tags have meaningful `alt` text (not "image" or empty string for decorative use "")
- Semantic HTML structure: `<nav>`, `<main>`, `<section>`, `<footer>` used correctly

**Fail signal:** Tab through the page with keyboard only — if you can't tell where focus is, accessibility fails.

### 9. Polish

**Pass when ALL true:**
- 4+ atmosphere recipes applied (noise texture, custom scrollbar, page entrance curtain + at least 1 more)
- Section spacing varies across the page (not all sections use identical `py-20`)
- Custom scrollbar styled and visible on desktop
- Page entrance curtain animation fires on initial load
- OakWind footer attribution present: "Website by OakWind Studio" linked to oakwindstudio.com

**Fail signal:** Does the site feel "finished" or "templated"? If you'd hesitate to show it on an iPad, polish is incomplete.

---

## AI Slop Gate (10 Items — ALL Must Pass)

Every item must clear. One failure = slop gate fails = build fails regardless of dimension score.

| # | Check | Why It Matters |
|---|-------|---------------|
| 1 | No Inter, Roboto, or Poppins as primary font | These are the "I didn't choose a font" defaults — instantly signals AI-generated |
| 2 | No purple-to-blue gradients anywhere on the page | The most overused AI design cliché — clients have seen it 100 times |
| 3 | Card grids are NOT all identical dimensions/layout | Uniform 3-column same-height cards scream template; vary sizes or stagger |
| 4 | Background is not pure `#FFFFFF` or `#000000` | Pure white/black is lazy — use warm/cool off-whites and rich darks |
| 5 | Hero stats are not in a generic 3-column counter layout | The "20+ Years / 500+ Projects / 100% Satisfaction" block is AI slop patient zero |
| 6 | No bounce/elastic easing on scroll-triggered reveals | Bouncy scroll animations are the hallmark of AI demos, not real sites |
| 7 | Not ALL sections are center-aligned | Real designs mix alignments — left-heavy hero, centered testimonials, etc. |
| 8 | Font-weight range spans at least 300–800 | AI tends to use 400/700 only; real typography uses the full weight spectrum |
| 9 | Heading size jumps are ≥2x between levels | AI generates evenly-spaced sizes (24/28/32); real hierarchy uses dramatic jumps |
| 10 | Copy is not swappable with a competitor | If you can replace the business name and nothing feels wrong, the copy is generic slop |

---

## Dimension-Specific Fix Playbook

When a dimension fails, apply these targeted fixes before re-scoring:

| Failing Dimension | Specific Fix Actions |
|---|---|
| **Visual Hierarchy** | Increase heading jumps to 2.5x+. Add weight contrast (pair 300 with 800). Insert a whisper-weight spacer section. Use display font for hero, text font for body — never same family for both. |
| **Animation Quality** | Replace duplicate fade-ups with scroll-driven parallax or reveal-on-progress. Vary easing per section (ease-out for entrances, ease-in-out for transforms). Add one CSS-native keyframe animation. Stagger child elements within sections. |
| **Responsive Design** | Fix 390px overflow: check for fixed-width elements, wide images, horizontal padding. Convert grids to `grid-cols-1` at base. Increase all touch targets to 48px (exceeds 44px minimum). Verify floating CTA bar appears on mobile. |
| **Conversion Design** | Audit tel: placements — add missing locations to reach 6+. Increase CTA button height to 56px minimum with generous horizontal padding. Reorder sections so trust signals (reviews, badges, years) precede every CTA. Add urgency text near primary CTA. |
| **Copy Quality** | Run the swap test (replace business name with competitor). Kill every zombie phrase. Add neighborhood names, specific service details, owner name/story. Rewrite section labels with voice ("What Your Neighbors Are Saying" not "Testimonials"). Make hero headline ≤7 words with specificity. |
| **Uniqueness** | Compare against past builds with `style-dna-system.md` fingerprint. Swap the most-similar recipe for an unused alternative. Change hero variant type. Shift palette to a different mood while keeping brand-appropriate tones. |
| **Performance** | Lazy-load all below-fold images. Replace Motion library animations with CSS-native where possible. Tree-shake unused imports. Check for accidentally bundled dev dependencies. Run build and verify dist/ size. |
| **Accessibility** | Add skip link component if missing. Add `:focus-visible` outline styles (2px solid, offset 2px). Wrap animations in `prefers-reduced-motion` media query. Audit all `<img>` for meaningful alt text. Verify semantic landmark elements (`<nav>`, `<main>`, `<footer>`). |
| **Polish** | Add atmosphere recipes until count reaches 4+ (noise, scrollbar, curtain, grain overlay, vignette, glow). Vary section padding (alternate py-16, py-24, py-32). Style scrollbar with brand accent color. Verify curtain animation fires. Check OakWind footer link. |

---

## Scoring Workflow

1. **Automated checks first** — run `scripts/verify.sh` to catch Performance, Conversion (tel: count), Polish (footer), and Content issues
2. **AI Slop Gate** — scan the build against all 10 items; any failure blocks the build
3. **Manual dimension review** — evaluate each of the 9 dimensions against criteria above
4. **Score** — count passing dimensions; 7+/9 AND slop gate clear = build passes
5. **If failing** — use the fix playbook, apply fixes, re-score; repeat until passing
