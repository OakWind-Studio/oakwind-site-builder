# Design Token System

> Read during Stage 2 (Color & Typography). This is the single source of truth for how tokens work in the OakWind v2 design system.

## Architecture: 3 Layers

The token system uses three layers. Each layer builds on the one below it.

```
Layer 3: Component Tokens    --btn-primary-bg, --card-bg, --nav-bg ...
            ↑ references
Layer 2: Semantic Tokens      --color-accent, --color-surface, --color-text-primary ...
            ↑ derived from
Layer 1: Primitive Palette    OKLCH values designed in color space, output as hex
```

### Layer 1: Primitive Palette (OKLCH → Hex)

Palettes are **designed** in OKLCH color space because it provides perceptually uniform lightness, making it easy to create harmonious colors and ensure accessible contrast. However, they are **output** as hex values inside `@theme` blocks because:

- Tailwind v4's `@theme` processes values at build time
- Hex is universally supported and predictable
- The OKLCH math happens during palette design, not at runtime

Each palette file (e.g., `toasted-almond-light.css`) contains the final hex values. The OKLCH origins are documented in comments for reference only.

### Layer 2: Semantic Tokens

These give **meaning** to colors. The same token name (`--color-accent`) maps to different hex values depending on whether the palette is light or dark mode.

| Token | Purpose | Light Mode Guidance | Dark Mode Guidance |
|-------|---------|--------------------|--------------------|
| `--color-accent` | Brand/primary action color | Vibrant but not neon | Slightly brighter than light mode for contrast |
| `--color-accent-hover` | Hover state for accent | 10-15% darker | 10-15% lighter |
| `--color-surface` | Page background | Warm off-white (never pure #FFFFFF) | Deep charcoal (#0A0A0A to #121212, never pure black) |
| `--color-surface-elevated` | Cards, modals, dropdowns | #FFFFFF or near-white | Slightly lighter than surface (#1A1A1A to #222222) |
| `--color-text-primary` | Main body text | Dark (contrast >= 4.5:1 vs surface) | Near-white (#F0F0F0 to #FAFAFA) |
| `--color-text-secondary` | Supporting text, labels | Medium gray (contrast >= 3:1 vs surface) | Medium gray (#9A9A9A to #B0B0B0) |
| `--color-border` | Visible borders, dividers | Medium gray-ish | Subtle dark (#252525 to #333333) |
| `--color-border-subtle` | Barely-visible separation | Very light gray | Even subtler (#1A1A1A to #252525) |
| `--color-muted` | Placeholders, disabled text | Light gray | Dark gray |
| `--color-ring` | Focus rings | Matches accent | Matches accent |
| `--shadow-hue` | Hue angle for colored shadows (degrees, 0-360) | Warm or cool depending on palette | Same as light mode counterpart |

### Layer 3: Component Tokens

These map semantic tokens to specific UI components. They exist so components can be styled consistently without knowing which palette is active.

| Token | Default Value | Purpose |
|-------|--------------|---------|
| `--btn-primary-bg` | `var(--color-accent)` | Primary button background |
| `--btn-primary-hover` | `var(--color-accent-hover)` | Primary button hover state |
| `--card-bg` | `var(--color-surface-elevated)` | Card backgrounds |
| `--card-border` | `var(--color-border)` | Card border color |
| `--nav-bg` | `var(--color-surface)` | Navigation background |
| `--input-bg` | `var(--color-surface-elevated)` | Form input background |
| `--input-border` | `var(--color-border)` | Form input border |
| `--input-focus` | `var(--color-ring)` | Form input focus ring |

Component tokens almost always reference semantic tokens via `var()`. This means you define the semantic layer per palette, and the component layer stays the same across all palettes. Only override component tokens when a specific palette needs a non-standard mapping (rare).

## Typography Tokens

| Token | Purpose |
|-------|---------|
| `--font-display` | Headings, hero text, accent typography |
| `--font-body` | Body copy, UI text, form labels |
| `--header-height` | Fixed header height (used for scroll offset) |
| `--curtain-duration` | Page entrance curtain animation time |

### Type Scale Tokens

Fluid type scales use `clamp()` for responsive sizing without breakpoints.

| Token | Role |
|-------|------|
| `--font-xs` | Fine print, captions, badges |
| `--font-sm` | Labels, metadata, secondary info |
| `--font-base` | Body text (base: 16px) |
| `--font-lg` | Lead paragraphs, emphasized body |
| `--font-xl` | H4, card titles, subheadings |
| `--font-2xl` | H3, section subheadings |
| `--font-3xl` | H2, section headings |
| `--font-4xl` | H1, page titles |
| `--font-5xl` | Hero headlines, display text |

### Line Height & Letter Spacing

| Token | Value | Use |
|-------|-------|-----|
| `--leading-tight` | 1.1 | Display headings, hero text |
| `--leading-snug` | 1.3 | Subheadings, card titles |
| `--leading-normal` | 1.6 | Body text, paragraphs |
| `--leading-relaxed` | 1.8 | Long-form reading, testimonials |
| `--tracking-tight` | -0.02em | Large display text |
| `--tracking-normal` | 0 | Body text |
| `--tracking-wide` | 0.05em | Buttons, labels, small caps |
| `--tracking-wider` | 0.08em | All-caps text, badges |

## Dark/Light Mode: How It Works

The same component tokens work in both modes. Only the **semantic** layer changes.

```
Light palette file:
  @theme {
    --color-surface: #FAF7F2;           /* warm cream */
    --color-text-primary: #1A1A1A;      /* near-black */
    --card-bg: var(--color-surface-elevated);  /* → #FFFFFF */
  }

Dark palette file:
  @theme {
    --color-surface: #0D0D0D;           /* deep charcoal */
    --color-text-primary: #F5F5F5;      /* near-white */
    --card-bg: var(--color-surface-elevated);  /* → #1E1E1E */
  }
```

Components use `bg-[var(--card-bg)]` and it automatically resolves to the correct color based on which palette file is loaded. There is no runtime toggle — the palette file chosen at build time determines the mode.

## Stage 2 Step-by-Step Instructions

When you reach Stage 2 (Color & Typography), follow these steps exactly:

### Step 1: Select Palette

Based on the niche, personality, and style DNA, pick a palette from the palette library. Consider:
- Niche conventions (law firms → navy-brass; restaurants → terracotta-garden)
- Style DNA personality trait (calmFormal → muted tones; boldEdgy → high contrast)
- Light vs dark mode (most businesses → light; bars, nightlife, luxury → dark)

### Step 2: Copy @theme Block

Copy the complete `@theme` block from the chosen palette file into the project's CSS. This gives you all semantic tokens and component tokens in one block.

Use the light-mode or dark-mode template (`light-mode.css` / `dark-mode.css`) as a structural reference if building a new palette.

### Step 3: Add Fonts

Replace the placeholder `--font-display` and `--font-body` values with the chosen font pairing from `font-pairings.md`. Use the Google Fonts import or self-hosted @font-face declarations.

### Step 4: Add Type Scale

Choose one of the three type scales from `type-scales.css`:
- **Major Third (1.25)** — default for most businesses. Balanced, readable.
- **Perfect Fourth (1.333)** — bold niches, luxury, venues. Dramatic headings.
- **Minor Third (1.2)** — dense content, medical, legal. Subtle hierarchy.

Copy the chosen scale's tokens into the `@theme` block.

### Step 5: Verify

Check that all tokens are present:
- [ ] All 11 semantic color tokens (accent through shadow-hue)
- [ ] All 8 component tokens (btn through input-focus)
- [ ] Both font family tokens (display + body)
- [ ] Header height and curtain duration
- [ ] All 9 type scale tokens (xs through 5xl)
- [ ] All 4 leading + 4 tracking tokens

Every token must have a value. No `#____` placeholders should remain.
