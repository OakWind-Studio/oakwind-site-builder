# Anti-Convergence Rules

These rules exist because LLMs have well-documented "distributional convergence" — they gravitate toward the most common patterns in training data. For web design, this produces a recognizable "AI look" that undermines OakWind's value proposition. Every rule here is a specific countermeasure.

---

## Banned Defaults

### Fonts — Never Use
- Inter (the single biggest AI tell)
- Roboto
- Arial / Helvetica (system defaults signal laziness)
- Space Grotesk (trending AI-favorite, already overexposed)
- Poppins (close to overexposed — use only if the niche specifically calls for friendly geometric)
- system-ui / -apple-system stacks as the sole choice

### Colors — Never Default To
- Purple-to-blue gradients (the #1 AI-generated color pattern)
- Indigo-600 as primary (Tailwind's default, extremely common in AI output)
- Generic blue (#3B82F6 / blue-500) as the only accent
- Evenly distributed pastel palettes with no dominant color
- Pure white (#FFFFFF) backgrounds with no texture or warmth

### Layouts — Never Converge On
- Identical card grids (3-column, same height, same padding, same border-radius)
- Mathematically perfect 50/50 splits everywhere
- Every section at the same max-width
- Centered everything with no asymmetry
- Stock hero with centered H1 + subtitle + button (the SaaS template pattern)

### Interactions — Never Do
- Generic emoji as section icons (🚀 💡 ⭐ 🎯)
- Zero micro-interactions (static pages feel AI-generated)
- Wall-to-wall animations (overdoing it is equally AI-typical)
- Purple gradient CTA buttons

---

## Required Differentiation Per Build

Before any code, commit to a bold aesthetic direction. These are not suggestions — pick one:

| Direction | Characteristics |
|-----------|----------------|
| Brutalist | Raw, industrial, monospaced type, hard edges, visible grid |
| Organic/Warm | Hand-drawn elements, warm colors, rounded forms, natural textures |
| Luxury Editorial | Generous whitespace, serif type, muted palette, restrained animation |
| Retro-Futuristic | Bold geometric shapes, neon accents, condensed type, dark backgrounds |
| Warm Artisan | Earthy palette, textured backgrounds, script accents, craft feeling |
| Clean Corporate | Structured grid, professional photography, sans-serif, subtle motion |
| Dark Premium | Deep backgrounds, light text, metallic accents, dramatic lighting |
| Playful/Bold | Oversized type, bright colors, unexpected layouts, personality |

The aesthetic direction guides every decision — font choice, color weight, spacing rhythm, animation style, image treatment. No "safe middle ground." A site trying to be everything looks like nothing.

---

## The 60/30/10 Color Rule

Every palette uses a dominant/secondary/accent ratio:
- **60%** — Background/base color (creates atmosphere)
- **30%** — Secondary color (sections, cards, containers)
- **10%** — Accent color (CTAs, highlights, interactive elements)

Dominant colors with sharp accents outperform timid, evenly-distributed palettes. A site with a bold dark navy and a single orange accent is more memorable than one with five equally-weighted pastels.

---

## Background Depth

Backgrounds should create atmosphere, never default to solid white or solid black:

- Subtle noise texture at 3–5% opacity
- Brand secondary at 5–8% opacity for alternating sections
- Gradient mesh or radial gradient behind hero
- Subtle geometric patterns at very low opacity
- Warm off-white (#FAFAF5, #F5F0EB) instead of pure white
- Deep charcoal (#0A0A0A, #111827) instead of pure black

---

## Card Grid Breaking

When displaying services, reviews, or features in a grid:

- Mix card sizes (one large + two small, or 2+1 layout)
- Alternate full-bleed sections between card sections
- Stagger vertical alignment slightly
- Use different border treatments per section (rounded cards in one, sharp in another)
- One "featured" item that breaks the grid pattern

---

## One Orchestrated Moment > Scattered Effects

A single well-designed page load sequence with staggered reveals (hero text → hero image → trust strip → nav) creates more delight than 20 scattered fade-ins. Budget your animation:

- **1 hero animation** (the entrance moment)
- **1 scroll sequence** (a section that reveals with purpose)
- **2–3 hover/tap interactions** (buttons, cards)
- Everything else: instant or simple CSS transitions

---

## Per-Build Verification

After selecting your design approach, check these:

1. ❌ Does the hero look like a SaaS template? → Add asymmetry, texture, or an unexpected element
2. ❌ Are all sections the same width? → Vary max-width, use full-bleed breaks
3. ❌ Is the font pairing something an AI would pick? → Swap for something with more character
4. ❌ Are the cards all identical? → Break the grid, feature one, vary sizes
5. ❌ Is the background pure white or pure black? → Add warmth, texture, or depth
6. ❌ Could this have been made on Wix in 5 minutes? → Add a craft detail that signals custom work

If you answer "yes" to any of these, fix it before shipping.
