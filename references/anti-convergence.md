# Anti-Convergence Rules — v2

These rules exist because LLMs have well-documented "distributional convergence" — they gravitate toward the most common patterns in training data. For web design, this produces a recognizable "AI look" that undermines OakWind's value proposition. Every rule here is a specific countermeasure.

---

## 1. AI Slop Gate Check

The final quality gate. Every item must pass before a build ships. If any item fails, fix it before declaring done.

| # | Check | Fail condition |
|---|-------|----------------|
| 1 | No Inter/Roboto/Poppins as primary font | Display font is Inter, Roboto, or Poppins |
| 2 | No purple-to-blue gradients | Any gradient transitioning from purple to blue |
| 3 | Card grids not all identical dimensions | Every card in a grid has the same height, width, padding, and border-radius |
| 4 | Background not pure #FFFFFF or #000000 | Any section using exact `#FFFFFF` or `#000000` as background |
| 5 | Hero stats not a generic 3-column template | Three evenly-spaced stat boxes with icon + number + label |
| 6 | No bounce/elastic easing on scroll reveals | Scroll-triggered animations using bounce or elastic curves |
| 7 | Not all sections center-aligned | Every section uses `text-center` and `mx-auto` with no asymmetry anywhere |
| 8 | Font-weight range spans >=300-800 | Page uses fewer than 3 distinct font weights, or range is narrower than 300-800 |
| 9 | Heading size jumps >=2x between levels | h2 is 24px and h1 is 32px (1.33x) — needs h2 48px → h1 80px+ (1.67x+) |
| 10 | Copy not swappable with competitor | Replace the business name with a competitor's — if the copy still works perfectly, it's too generic |

---

## 2. Named Easing Library

Standard easing curves for all OakWind builds. Reference by name in code comments and design decisions.

### CSS Easing Curves

| Name | Value | Use case |
|------|-------|----------|
| `reveal` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering the viewport — scroll reveals, section entrances |
| `revealGentle` | `cubic-bezier(0.33, 1, 0.68, 1)` | Softer entrance — hero text fade-in, subtle parallax |
| `exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the viewport — modal close, tooltip dismiss |
| `interactive` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Hover/press feedback — button hover, card lift, nav highlight |

### Motion Spring Values (for Framer Motion / React Spring)

| Name | Config | Use case |
|------|--------|----------|
| `spring` | `{ stiffness: 260, damping: 20 }` | General-purpose spring — menu open, card flip, layout shift |
| `springGentle` | `{ stiffness: 180, damping: 18 }` | Softer spring — page transitions, accordion expand, image reveal |
| `springSnap` | `{ stiffness: 350, damping: 28 }` | Quick decisive spring — toggle switch, tab change, dropdown |

### Banned Easings

- **`linear`** on UI transitions — feels robotic and lifeless. Only acceptable for infinite loops (loading spinners, marquees).
- **`bounce`** on scroll reveals — the hallmark of amateur jQuery sites. Never on viewport-triggered animations.
- **`elastic`** on scroll reveals — visually distracting, breaks reading flow, signals "I just discovered CSS animations."

---

## 3. Typography Weight & Size Rules

### Weight Spread

Every page must use a minimum weight range of **300-800** across all text elements. This creates visual hierarchy through typographic color (light vs. heavy).

| Role | Weight range | Purpose |
|------|-------------|---------|
| Display headings (h1) | 700-900 | Maximum impact, commands attention |
| Subheadings (h2, h3) | 500-600 | Clear hierarchy, distinct from body |
| Body text | 400 | Optimal readability at paragraph length |
| Labels / captions | 300-400 | Recedes visually, supporting role |

### Size Scale

Size jumps between heading levels must be **>=2x minimum** to create real visual hierarchy, not gentle slopes:

```
body:    16px (1rem)
h3:      28px (1.75rem)    — 1.75x body
h2:      48px (3rem)       — 1.7x h3
h1:      80px+ (5rem+)     — 1.67x h2
```

If your h1 and h2 look like siblings instead of parent-child, the jump isn't big enough. Headlines should feel like they're from a different scale entirely.

---

## 4. Banned Defaults

### Fonts — Never Use
- **Inter** — the #1 AI tell
- **Roboto** — Android system font, screams "default"
- **Arial / Helvetica** — system defaults signal laziness
- **Space Grotesk** — trending AI-favorite, overexposed
- **system-ui / -apple-system** as the sole display choice
- **Poppins as display** — acceptable only as body text, and even then prefer alternatives

### Colors — Never Default To
- **Purple-to-blue gradients** — the #1 AI-generated color pattern
- **Indigo-600** as primary — Tailwind's default, extremely common in AI output
- **Generic blue (#3B82F6 / blue-500)** as the only accent
- **Evenly distributed pastels** with no dominant color
- **Pure white (#FFFFFF)** backgrounds with no texture or warmth
- **Pure black (#000000)** backgrounds with no depth

### Layouts — Never Converge On
- **Identical card grids** — 3-column, same height, same padding, same border-radius
- **Mathematically perfect 50/50 splits** everywhere
- **Every section at the same max-width** — vary between 4xl, 5xl, 6xl, 7xl, and full-bleed
- **Centered everything** with no asymmetry — at least one section must break the centered pattern
- **Stock hero** with centered H1 + subtitle + button (the SaaS template pattern)

### Interactions — Never Do
- **Generic emoji as section icons** (rocket, lightbulb, star, target)
- **Zero micro-interactions** — static pages feel AI-generated
- **Wall-to-wall animations** — overdoing it is equally AI-typical
- **Purple gradient CTA buttons** — the universal AI call-to-action

---

## 5. 60/30/10 Color Rule

Every palette deployment must follow this ratio. Deviation from this is the most common reason sites feel "off."

| Ratio | Role | What it covers | Feeling |
|-------|------|----------------|---------|
| **60%** | Dominant | Surface color, page background, hero background, main sections | Atmosphere — sets the mood |
| **30%** | Secondary | Cards, alternate sections, containers, navbar, footer | Structure — creates rhythm |
| **10%** | Accent | CTAs, highlights, active states, links, badges, icons | Action — drives conversion |

**Common mistakes:**
- Using accent at 30% (too much — it stops being special)
- Using three equal colors at 33% each (no hierarchy, no focal point)
- Forgetting secondary entirely (flat pages with only background + accent)

**Rule of thumb:** If you squint at the page and can't immediately identify which color is dominant, which is secondary, and which is accent, the ratio is wrong.

---

## 6. Background Depth Requirement

Never use pure white or pure black as a background. Always add depth through at least one of these techniques:

### Instead of #FFFFFF
- Warm off-white: `#FAFAF5` (cream tint) or `#FAF9F6` (parchment)
- Cool off-white: `#F8FAFB` (blue tint) or `#F5F7FA` (slate tint)
- Subtle noise texture at 3-5% opacity layered on top
- At minimum: `#FAFAFA` — even one step off pure white makes a difference

### Instead of #000000
- Deep charcoal: `#0A0A0A` or `#0C0C0C`
- Warm dark: `#111111` or `#1A1A1A`
- Cool dark: `#0F172A` (slate-900) or `#111827` (gray-900)
- At minimum: `#0A0A0A` — pure black is harsher than you think on screens

### Required Depth Layers
Every page must include:
1. **Noise texture** — 3-5% opacity SVG or PNG noise over the body background
2. **At least one gradient layer on the hero** — use patterns from `gradient-patterns.md`
3. **Alternating section tones** — sections should not all be the same background; alternate between surface and a slightly different tone (surface-alt, card background, etc.)

---

## 7. Per-Build Verification Checklist

Quick self-check before declaring a build done. If any answer is "yes," fix it.

- [ ] Hero looks like a SaaS template? → Add asymmetry, texture, or an unexpected element
- [ ] All sections are the same width? → Vary max-width, use full-bleed breaks
- [ ] Font pairing screams AI? → Swap for something with more character (check banned list)
- [ ] Cards are all identical? → Break the grid, feature one, vary sizes or treatments
- [ ] Background is flat solid? → Add noise, warmth, gradient depth
- [ ] Every section is center-aligned? → Break the pattern with a left-aligned or asymmetric section
- [ ] Copy could belong to any competitor? → Make it business-specific with real details
- [ ] All animations use the same timing? → Vary durations and delays, use named easings
- [ ] Color ratio feels off? → Check 60/30/10 compliance
- [ ] Page feels "safe" and forgettable? → Push one element further — bigger type, bolder color, more whitespace
