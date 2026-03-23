# Stage 3 — Compose

> Select recipes for each section slot, plan the visual rhythm, and map the emotional arc. Output: section map comment at the top of App.jsx, wow moment plan, and recipe selection rationale.

---

## 1. Read Metadata

Load `recipes/_metadata.json`. It indexes all 169 recipes with:
```json
{
  "name": "Recipe Name",
  "category": "heroes",
  "file": "heroes/recipe-name.jsx",
  "niches": ["dental", "restaurant"],
  "personality": ["calmFormal", "boldEnergetic"],
  "tier": [2, 3],
  "weight": "hero",
  "requires": ["swiper"],
  "tags": ["fullscreen", "dark-overlay"]
}
```

Categories: heroes, services, testimonials, cta-breaks, about, location, galleries, nav, footers, transitions, faq, trust-proof, menu-pricing, niche-specialty, feature-highlight, video, booking, area-map, awards, comparison.

---

## 2. Filter Pipeline

For each section category needed, filter recipes through this pipeline:

1. **Niche match** — recipe's `niches[]` includes this build's niche
2. **Personality match** — recipe's `personality[]` includes this build's preset
3. **Tier match** — recipe's `tier[]` includes this build's tier level
4. **Freshness check** — recipe not used in a recent same-niche build (check fingerprint in `intelligence/fingerprints.json`)

Result: 5-8 candidate recipes per category. If fewer than 3 candidates after filtering, relax tier match first, then personality match.

---

## 3. Recipe Selection

Pick ONE recipe per section category required by the architecture template. Selection criteria:

- **Visual weight diversity** — don't pick all heavy or all light recipes
- **Tag compatibility** — tags should complement (e.g., a "dark-overlay" hero pairs well with a "glass" services section on dark builds)
- **Requires check** — note any `@requires` tags for npm dependencies needed in Stage 4
- **Personal judgment** — which recipe will make this business owner say "wow" on the iPad?

---

## 4. Magic MCP Inspiration

Search `21st_magic_component_inspiration` with short, specific queries:

```
"hero gradient dark"
"testimonial cards glass"
"bento grid services"
"stats counter scroll"
```

Study the returned component patterns for:
- Structural layout ideas (how elements are arranged)
- Animation techniques (reveal patterns, hover states)
- Visual details (shadows, borders, spacing)

**NEVER copy Magic-generated code directly.** Use it as structural inspiration, then implement using OakWind's recipe system, @theme tokens, and shared-lib components.

---

## 5. Section Map Format

Write the section map as a comment block at the top of `App.jsx`:

```jsx
/**
 * === SECTION MAP ===
 * # | Section         | Recipe                | Weight   | Animation    | Spacing
 * 1 | Nav             | glass-topbar          | WHISPER  | none         | fixed
 * 2 | Hero            | cinematic-fullbleed   | HERO     | orchestrated | hero
 * 3 | Trust Strip     | stats-trust-strip     | WHISPER  | countUp      | tight
 * 4 | Services        | bento-mixed-grid      | STANDARD | stagger      | default
 * 5 | About           | split-narrative       | STANDARD | slideIn      | spacious
 * 6 | CTA Break       | gradient-cta-band     | WHISPER  | none         | tight
 * 7 | Testimonials    | carousel-cards        | STANDARD | fadeSlide    | default
 * 8 | Gallery         | masonry-lightbox      | STANDARD | stagger      | default
 * 9 | Location        | map-hours-contact     | STANDARD | fadeUp       | default
 * 10| CTA Final       | full-bleed-cta        | HERO     | orchestrated | spacious
 * 11| Footer          | stacked-footer        | WHISPER  | none         | default
 *
 * Fingerprint: hero:cinematic-fullbleed|svc:bento-mixed-grid|test:carousel-cards|...
 * Palette: campfire | Fonts: Bebas Neue + DM Sans | Personality: boldEnergetic
 */
```

---

## 6. Visual Weight Rhythm

Every section has a weight classification:

| Weight | Visual Impact | Examples |
|--------|-------------|----------|
| **HERO** | Maximum — full-bleed, large type, dramatic | Hero section, final CTA |
| **STANDARD** | Normal — content-focused, balanced | Services, about, testimonials |
| **WHISPER** | Minimal — breathing room, subtle | Trust strips, CTA breaks, dividers |

**Rhythm rules:**
- HERO → whisper → standard → whisper → standard → ... → HERO
- Never two HERO-weight sections back-to-back
- Never two STANDARD sections back-to-back without a WHISPER between them
- Include at least 2 WHISPER sections for breathing room
- The page should feel like inhale/exhale — tension and release

---

## 7. Wow Moments

Plan exactly 4 wow moments distributed across the scroll journey:

| Moment | Scroll Position | Purpose | Examples |
|--------|----------------|---------|----------|
| **Hero Reveal** | 0-3 seconds | Immediate impact, "this is different" | Curtain lift, parallax reveal, animated headline |
| **Scroll Surprise** | 30-50% | Reward for scrolling, maintain engagement | Counter animation, before/after slider, card flip |
| **Deep Impression** | 50-75% | Build emotional connection | Owner story reveal, portfolio showcase, video autoplay |
| **Personal Touch** | 75-90% | Humanize the business, prompt action | Review highlight, team photo, handwritten element |

Assign each wow moment to a specific section in the section map. Note it in the map's Animation column.

---

## 8. Emotional Arc

Read `references/niches/emotional-arcs.md`. Identify this niche's arc template:

| Arc Template | Section Order | Best For |
|-------------|--------------|----------|
| **Trust-First** | Hero (reassurance) → Credentials → Reviews → Services → About → CTA | Dental, auto repair, attorney, home services |
| **Excitement-First** | Hero (aspiration) → Gallery → Services → Reviews → About → CTA | Restaurant, wedding venue, home builder, detailing |
| **Connection-First** | Hero (personality) → About/Owner → Services → Reviews → Community → CTA | Barber, casual restaurant, med spa |
| **Urgency-First** | Hero (solution) → Availability → Services → Reviews → Contact → CTA | Pressure washing, emergency home services |

The arc determines section ORDER, not content. A trust-first arc front-loads credentials and reviews before services. An excitement-first arc leads with the portfolio. Map the arc template to your section map, adjusting as needed for the specific business's strengths.
