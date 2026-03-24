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

A wow moment is a specific, engineered interaction that would make a prospect watching the iPad demo visibly react. It must be:
- Technically distinct from a standard fade-up entrance
- Tied to a specific scroll position (use viewport-relative percentages, not time)
- One of these 8 concrete types:

| Type | What it is | Implementation | Best for |
|---|---|---|---|
| **Orchestrated Entrance** | Hero elements animate in sequence (logo → headline → subtext → CTA) with staggered timing | Motion stagger children, 0.1-0.15s gaps | Hero (0-5vh) |
| **Scroll-Pinned Reveal** | Section stays fixed while content transforms (images swap, text changes, progress bar fills) | GSAP ScrollTrigger pin | Process, How-it-works (30-50vh) |
| **Horizontal Traverse** | Content scrolls horizontally while page scrolls vertically | GSAP horizontal scroll container | Portfolio, Gallery (40-60vh) |
| **Parallax Depth** | Foreground and background layers move at different speeds creating 3D illusion | Motion useScroll + useTransform with different rates | Image breaks, About (30-50vh) |
| **Scale Counter** | Numbers animate from 0 to value when section enters viewport | Motion useInView + animate count | Stats, Trust proof (20-40vh) |
| **Before/After Reveal** | Draggable slider reveals transformation | Custom slider with clip-path | Detailing, Pressure washing (40-60vh) |
| **Image Sequence** | Multiple images crossfade or swap on scroll progress | Scroll-linked opacity/transform | About, Story sections (50-70vh) |
| **Magnetic CTA** | Button subtly follows cursor on hover, snaps back on leave | Motion useMotionValue + spring | Contact, Final CTA (75-90vh) |

**Distribution Rule:** Pick exactly 4 from the table. They must be distributed:
- **Position 1: 0-10vh (Hero zone)** — Orchestrated Entrance required
- **Position 2: 25-50vh (Discovery zone)** — Pick from Scroll-Pinned, Horizontal, Parallax, or Before/After
- **Position 3: 50-75vh (Depth zone)** — Pick from Scale Counter, Image Sequence, or Parallax
- **Position 4: 75-95vh (Decision zone)** — Magnetic CTA or a second Scroll-Pinned

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
