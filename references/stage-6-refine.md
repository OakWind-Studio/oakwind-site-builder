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
| Same dimension fails 2x | Escalate — swap the recipe using the Recipe Alternatives Table below |
| Same dimension fails 3x | Accept the limitation, note it in build log, move to Stage 7 |
| Hard ceiling reached (3 iterations total) | Stop refining. Ship what you have. Log all remaining issues. |

---

## Recipe Alternatives Table

When a dimension fails twice, swap the recipe for the most relevant section. Use this table to pick a concrete replacement — do NOT guess. Pick the Primary first; if it was already in use, go to Fallback A, then B.

### Heroes

| Current Recipe | Primary (try first) | Fallback A | Fallback B |
|---|---|---|---|
| Cinematic Fullbleed | Parallax Depth Stack | Scroll Reveal Layers | Dark Split Hero |
| Split Agent Portrait | Gradient Editorial | Minimal Statement | Editorial Serif Hero |
| Gradient Editorial | Minimal Statement | Split Agent Portrait | Asymmetric Storytelling |
| Scroll Reveal Layers | Parallax Depth Stack | Cinematic Fullbleed | Luxury Reveal |
| Video Ambient | Cinematic Fullbleed | Dark Ambient Glow | Dark Split Hero |
| Asymmetric Storytelling | Split Agent Portrait | Gradient Editorial | Stats Authority |
| Parallax Depth Stack | Scroll Reveal Layers | Cinematic Fullbleed | Luxury Reveal |
| Minimal Statement | Gradient Editorial | Editorial Serif Hero | Asymmetric Storytelling |
| Dark Ambient Glow | Bold Condensed Hero | Transformation Split | Cinematic Fullbleed |
| Transformation Split | Dark Ambient Glow | Bold Condensed Hero | Before After Comparison Grid (services) |
| Comfort Gradient | Location Map Hero | Stats Authority | Asymmetric Storytelling |
| Food Showcase | Cinematic Fullbleed | Dark Split Hero | Video Ambient |
| Luxury Reveal | Scroll Reveal Layers | Minimal Statement | Editorial Serif Hero |
| Stats Authority | Asymmetric Storytelling | Comfort Gradient | Bold Condensed Hero |
| Location Map Hero | Comfort Gradient | Stats Authority | Bold Condensed Hero |
| Bold Condensed Hero | Dark Ambient Glow | Transformation Split | Stats Authority |
| Editorial Serif Hero | Minimal Statement | Gradient Editorial | Luxury Reveal |
| Dark Split Hero | Cinematic Fullbleed | Dark Ambient Glow | Video Ambient |

### Services

| Current Recipe | Primary (try first) | Fallback A | Fallback B |
|---|---|---|---|
| Bento Mixed Grid | Split Featured Plus Grid | Zigzag Alternating | Hover Reveal Detail |
| Zigzag Alternating | Process Timeline Vertical | Accordion Detailed | Split Featured Plus Grid |
| Tabbed Categories | Interactive Service Finder | Card Carousel | Bento Mixed Grid |
| Horizontal Showcase | Hover Reveal Detail | Bento Mixed Grid | Card Carousel |
| Accordion Detailed | Zigzag Alternating | Tabbed Categories | Process Timeline Vertical |
| Icon Grid Varied Stagger | Numbered Steps Grid | Before After Comparison Grid | Pricing Tier Cards |
| Split Featured Plus Grid | Bento Mixed Grid | Zigzag Alternating | Horizontal Showcase |
| Pricing Tier Cards | Icon Grid Varied Stagger | Numbered Steps Grid | Split Featured Plus Grid |
| Process Timeline Vertical | Zigzag Alternating | Accordion Detailed | Numbered Steps Grid |
| Before After Comparison Grid | Icon Grid Varied Stagger | Pricing Tier Cards | Zigzag Alternating |
| Hover Reveal Detail | Horizontal Showcase | Bento Mixed Grid | Card Carousel |
| Interactive Service Finder | Tabbed Categories | Bento Mixed Grid | Accordion Detailed |
| Numbered Steps Grid | Icon Grid Varied Stagger | Process Timeline Vertical | Before After Comparison Grid |
| Card Carousel | Horizontal Showcase | Tabbed Categories | Hover Reveal Detail |

### Testimonials

| Current Recipe | Primary (try first) | Fallback A | Fallback B |
|---|---|---|---|
| Single Spotlight Cinematic | Featured Plus Supporting | Rotating Spotlight | Stacked Editorial Alternating |
| Carousel Horizontal | Masonry Varied Height | Quote Wall With Photos | Rotating Spotlight |
| Masonry Varied Height | Quote Wall With Photos | Carousel Horizontal | Featured Plus Supporting |
| Stacked Editorial Alternating | Single Spotlight Cinematic | Featured Plus Supporting | Video Testimonial Embed |
| Marquee Scroll Strip | Google Review Style | Carousel Horizontal | Featured Plus Supporting |
| Quote Wall With Photos | Masonry Varied Height | Carousel Horizontal | Featured Plus Supporting |
| Featured Plus Supporting | Single Spotlight Cinematic | Stacked Editorial Alternating | Rotating Spotlight |
| Video Testimonial Embed | Single Spotlight Cinematic | Stacked Editorial Alternating | Featured Plus Supporting |
| Google Review Style | Marquee Scroll Strip | Carousel Horizontal | Quote Wall With Photos |
| Rotating Spotlight | Single Spotlight Cinematic | Featured Plus Supporting | Carousel Horizontal |

### CTA Breaks

| Current Recipe | Primary (try first) | Fallback A | Fallback B |
|---|---|---|---|
| Split CTA Gallery | Cinematic Image Overlay | Scroll Fill Text | Testimonial Plus CTA |
| Stats Bar Glass | Social Proof CTA | Gradient Animated Headline | Emergency Urgency |
| Before After Slider | Scroll Fill Text | Cinematic Image Overlay | Split CTA Gallery |
| Scroll Fill Text | Cinematic Image Overlay | Before After Slider | Split CTA Gallery |
| Gradient Animated Headline | Stats Bar Glass | Emergency Urgency | Social Proof CTA |
| Testimonial Plus CTA | Social Proof CTA | Split CTA Gallery | Scroll Fill Text |
| Cinematic Image Overlay | Split CTA Gallery | Scroll Fill Text | Before After Slider |
| Emergency Urgency | Gradient Animated Headline | Stats Bar Glass | Map Directions CTA |
| Booking Scheduler CTA | Split Form CTA | Testimonial Plus CTA | Social Proof CTA |
| Map Directions CTA | Emergency Urgency | Stats Bar Glass | Social Proof CTA |
| Social Proof CTA | Testimonial Plus CTA | Stats Bar Glass | Gradient Animated Headline |
| Split Form CTA | Booking Scheduler CTA | Social Proof CTA | Testimonial Plus CTA |

### About

| Current Recipe | Primary (try first) | Fallback A | Fallback B |
|---|---|---|---|
| Timeline Narrative | Before And Now | Split Photo Story | Sticky Scroll Journey |
| Split Photo Story | Owner Spotlight | Family Story | Community Roots |
| Sticky Scroll Journey | Timeline Narrative | Credentials Showcase | Values Mission Cards |
| Team Grid With Hover | Credentials Showcase | Values Mission Cards | Split Photo Story |
| Owner Spotlight | Split Photo Story | Family Story | Community Roots |
| Values Mission Cards | Credentials Showcase | Team Grid With Hover | Sticky Scroll Journey |
| Community Roots | Owner Spotlight | Family Story | Split Photo Story |
| Credentials Showcase | Values Mission Cards | Team Grid With Hover | Sticky Scroll Journey |
| Family Story | Owner Spotlight | Community Roots | Before And Now |
| Before And Now | Timeline Narrative | Family Story | Split Photo Story |

### Galleries

| Current Recipe | Primary (try first) | Fallback A | Fallback B |
|---|---|---|---|
| Lightbox Masonry | Category Filtered | Offset Editorial | Horizontal Strip |
| Coverflow 3D | Fullscreen Slideshow | Lightbox Masonry | Offset Editorial |
| Before After Drag | Lightbox Masonry | Category Filtered | Horizontal Strip |
| Horizontal Strip | Lightbox Masonry | Category Filtered | Coverflow 3D |
| Category Filtered | Lightbox Masonry | Offset Editorial | Before After Drag |
| Fullscreen Slideshow | Coverflow 3D | Offset Editorial | Lightbox Masonry |
| Offset Editorial | Fullscreen Slideshow | Lightbox Masonry | Category Filtered |
| Property Listing Cards | Category Filtered | Lightbox Masonry | Offset Editorial |

---

## Dimension-to-Recipe Fix Mapping

When a dimension fails twice, the fix playbook alone is not enough. Use this decision tree to identify which recipe is most likely causing the failure, then swap it using the Recipe Alternatives Table above.

| Failing Dimension | Most Likely Cause | Recipe Fix Action |
|---|---|---|
| **Visual Hierarchy** | Hero or services recipe too flat — uniform text sizes, center-aligned everything, no breathing room | Swap **hero** to one with a larger type scale or split layout (e.g., Cinematic Fullbleed -> Parallax Depth Stack). If hero is fine, swap **services** to a recipe with built-in weight contrast (Zigzag Alternating, Split Featured Plus Grid, Bento Mixed Grid). If both are fine, insert a **trust-proof** whisper section between the two heaviest sections. |
| **Animation Quality** | Wall-to-wall identical fadeUp reveals, no scroll-driven moments | Swap the **middle content section** (services or about) to a recipe with built-in scroll interaction: Sticky Scroll Journey, Horizontal Showcase, Scroll Reveal Layers, or Before After Drag. If hero is static, swap hero to Scroll Reveal Layers or Parallax Depth Stack. Add a **cta-break** with scroll motion: Scroll Fill Text or Before After Slider. |
| **Responsive Design** | Complex grid recipe breaking at 390px, horizontal scroll overflows | Swap **services** from a grid-heavy recipe (Bento Mixed Grid, Icon Grid Varied Stagger) to a stacked recipe (Zigzag Alternating, Accordion Detailed, Process Timeline Vertical). Swap **gallery** from Horizontal Strip or Coverflow 3D to Lightbox Masonry or Category Filtered. Check **nav** — swap Mega Menu Nav to Minimal Logo CTA or Scroll Hide Nav. |
| **Conversion Design** | Missing tel: placements, CTAs buried, no trust before conversion points | Swap **cta-break** to one with built-in conversion: Booking Scheduler CTA, Split Form CTA, or Social Proof CTA. Swap **nav** to Top Bar Plus Nav (has phone in top bar). Swap **footer** to CTA Footer Combo. If no trust section exists, add Stats Trust Strip or Google Rating Widget before the primary CTA. |
| **Copy Quality** | Generic headlines, zombie phrases, no specificity — recipe structure is fine, content is the problem | Copy issues are rarely fixed by recipe swaps. Keep recipes, rewrite content. **Exception:** if hero recipe is typography-only (Minimal Statement, Gradient Editorial), weak copy is amplified — swap to an image-led hero (Cinematic Fullbleed, Split Agent Portrait) where visuals carry more weight. |
| **Uniqueness** | Same hero/services combo as a recent build in the same niche | Swap **hero** to a recipe from a different tag family (e.g., if using "split" tags, move to "parallax" or "editorial" tags). Swap **services** to a structurally different layout (e.g., if using a grid, move to timeline or accordion). Swap **testimonials** from the most common recipe (Featured Plus Supporting) to Masonry Varied Height or Stacked Editorial Alternating. |
| **Performance** | Too many Motion/framer-motion animations, large carousel dependencies | Swap **gallery** from Coverflow 3D (requires swiper) to Lightbox Masonry (no deps). Swap **services** from Card Carousel (requires swiper) to Bento Mixed Grid or Icon Grid Varied Stagger. Swap **testimonials** from Carousel Horizontal (requires swiper) to Featured Plus Supporting or Masonry Varied Height. Replace Motion hero with CSS-animated alternative. |
| **Accessibility** | Low contrast on dark recipes, missing landmarks, interactive elements not focusable | Swap **hero** from dark recipes (Dark Ambient Glow, Dark Split Hero) to lighter alternatives (Gradient Editorial, Minimal Statement, Split Agent Portrait). Swap **nav** from overlay-heavy recipes (Full Hamburger Overlay) to standard layouts (Sticky Transparent Transition, Top Bar Plus Nav). Keep recipe but increase contrast in palette if possible before swapping. |
| **Polish & Atmosphere** | Site feels flat, no texture, no transitions between sections, mechanical feel | Add or swap **transition** recipes between sections: Parallax Overlap, Image Break Strip, or Full Bleed Photo for drama; Whitespace Breathe or Accent Line for subtlety. Swap **about** to Sticky Scroll Journey for immersive feel. Swap **footer** from Minimal Single Row to Dark Premium Map or CTA Footer Combo for a stronger finish. |

### Decision Tree (step by step)

```
1. Identify the failing dimension from Stage 5 scorecard
2. Read the "Most Likely Cause" column above
3. Inspect the current recipe for the implicated section:
   a. Does the current recipe match the described cause? → Swap it
   b. Current recipe seems fine? → Check the next section mentioned
   c. No recipe matches the cause? → Apply fix playbook again (surgical edits, not swaps)
4. Look up the current recipe in the Recipe Alternatives Table
5. Pick the Primary alternative
   - If Primary was already tried or doesn't fit the niche/personality → use Fallback A
   - If Fallback A also doesn't fit → use Fallback B
6. Swap the recipe component file, preserve all content/data from data.js
7. Return to Stage 5 for re-verification
```

---

## Re-Verification

After applying fixes, return to Stage 5 and re-run the full 9-dimension + Slop Gate evaluation. Do NOT selectively re-check only the dimensions you fixed — other changes may have introduced regressions.

Threshold remains: 7+/9 dimensions AND 10/10 slop gate items to pass.
