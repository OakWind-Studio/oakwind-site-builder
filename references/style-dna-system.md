# Style DNA System

Every OakWind site gets an 8-character DNA code that determines its visual identity. This system transforms visual diversity from a creative problem into a combinatorial one — with 5–7 options per dimension, there are over 390,000 theoretical unique combinations.

---

## The Eight Dimensions

### Dimension 1 — Layout Structure

| Code | Option | Description |
|------|--------|-------------|
| 1A | Classic Centered | 1200px max-width container, symmetric, clean |
| 1B | Full-Width Sections | Edge-to-edge hero and sections, contained text blocks |
| 1C | Asymmetric Split | Off-center grid, 55/45 or 60/40 splits |
| 1D | Bento Grid | Varied card sizes, magazine-style layout |
| 1E | Single Column Long-Scroll | Vertical storytelling, editorial feel |
| 1F | Overlap/Layered | Elements creating depth, overlapping cards and images |

### Dimension 2 — Color Approach

| Code | Option | Description |
|------|--------|-------------|
| 2A | Light + Vibrant Accents | White/cream base, bold accent colors |
| 2B | Dark/Moody | Dark backgrounds, light text, dramatic contrast |
| 2C | Monochromatic | Single hue with tints/shades, sophisticated depth |
| 2D | Earth/Muted Tones | Warm browns, sage, terracotta, cream |
| 2E | High Contrast B&W + One Accent | Stark black and white with a single pop color |
| 2F | Pastel/Soft | Gentle palette, approachable and calming |

### Dimension 3 — Typography Pairing

| Code | Option | Example Pairing |
|------|--------|-----------------|
| 3A | Serif Display + Sans Body | Playfair Display + Source Sans 3 |
| 3B | Bold Sans + Light Sans | Montserrat + Open Sans |
| 3C | Script/Handwritten + Clean Sans | Pacifico + Lato |
| 3D | Slab Serif + Geometric | Rockwell + Futura / Outfit |
| 3E | Condensed Uppercase + Rounded | Bebas Neue + Nunito |
| 3F | Oversized Display + Minimal Body | DM Serif Display + DM Sans |

**Banned fonts:** Inter, Roboto, Arial, Space Grotesk, system-ui defaults. These are AI tells.

### Dimension 4 — Hero Pattern

| Code | Option | Best for |
|------|--------|----------|
| 4A | Full-Screen Image | Restaurants, detailing (visual-first businesses) |
| 4B | Split 50/50 | Auto repair, attorneys (text + image balance) |
| 4C | Text-Centric Minimal | Attorneys, consultants (authority through words) |
| 4D | Video Background | Restaurants, med spas (immersive experience) |
| 4E | Illustrated/Custom Art | Creative businesses, unique brands |
| 4F | Scroll-Triggered Animated | Premium tier builds, brand-driven businesses |
| 4G | Slider/Carousel | Detailing, pressure washing (before/after showcase) |

### Dimension 5 — Animation Level

| Code | Option | Token budget |
|------|--------|-------------|
| 5A | None/Static | CSS transitions only, no JS animation lib |
| 5B | Subtle Fade-In | Intersection observer, opacity + translateY |
| 5C | Parallax Scrolling | Background attachment or scroll-driven transforms |
| 5D | Micro-Interactions | Hover effects, button states, card lifts |
| 5E | Scroll-Triggered Reveals | Staggered entrance animations on scroll |
| 5F | Full Cinematic | GSAP/Lottie-grade, reserved for Tier 3 builds |

### Dimension 6 — Navigation Style

| Code | Option | Notes |
|------|--------|-------|
| 6A | Sticky Horizontal | Most common, reliable, always include phone CTA |
| 6B | Transparent Overlay | Blends with hero, transitions to solid on scroll |
| 6C | Hamburger (even desktop) | Maximizes hero space, feels app-like |
| 6D | Minimal Logo + CTA Only | Clean, bold, pairs with text-centric heroes |
| 6E | Sidebar | Unconventional, editorial feel |

### Dimension 7 — Section Patterns

| Code | Option | Description |
|------|--------|-------------|
| 7A | Alternating Zigzag | Image left/right alternating with text |
| 7B | Card Grid | Service cards in 2–4 column grid |
| 7C | Timeline/Process Flow | Step-by-step with connecting elements |
| 7D | Full-Width Image Breaks | Photo sections separating content blocks |
| 7E | Tabbed/Accordion | Interactive content organization |
| 7F | Before/After Sliders | Comparison showcase (detailing, pressure washing) |

### Dimension 8 — Imagery Style

| Code | Option | Description |
|------|--------|-------------|
| 8A | Professional Photography | Clean, well-lit, commercial quality |
| 8B | Lifestyle/Candid | Authentic, in-action, storytelling |
| 8C | Custom Illustrations | Hand-drawn or vector, unique to brand |
| 8D | Textured/Vintage Overlays | Film grain, duotone, warm processing |
| 8E | Clean/Flat/Minimal | Simple backgrounds, product focus |
| 8F | Pattern/Geometric Backgrounds | Abstract shapes, brand patterns |

---

## How to Use

### Step 1 — Generate the DNA Code

Select one option per dimension. Write it as an 8-character code:

**Example:** `1B-2B-3E-4A-5E-6B-7A-8D`
→ Full-Width + Dark/Moody + Condensed/Rounded + Full-Screen Hero + Scroll Reveals + Transparent Nav + Zigzag + Vintage Imagery

### Step 2 — Apply Niche Constraints

Each niche file lists dimensions that have strong preferences. Respect them:

| Niche | Strong preferences |
|-------|-------------------|
| Auto Detailing | 2B (dark), 4G or 4A (visual showcase), 7F (before/after) |
| Auto Repair | 2A or 2E, 3D or 3E (authority/industrial), 4B (split) |
| Restaurant | 4A or 4D (food-forward), any color approach by sub-niche |
| Med Spa | 2F or 2A (soft/clean), 3A (elegant serif), 5B–5D (subtle motion) |
| Attorney | 2E or 2C (serious), 3A or 3F (serif authority), 4C (text-centric) |
| Pressure Washing | 2A (light/clean), 4G (before/after), 7F (comparison) |

Constraints narrow the options but never reduce to a single choice. There's always room for variation within a niche.

### Step 3 — Minimum Variation Rule

When building a second (or third, or fifth) site in the same niche, at least **4 of the 8 dimensions** must differ from the previous build. The highest-impact dimensions to rotate are:

1. Color Approach (2)
2. Hero Pattern (4)
3. Typography Pairing (3)
4. Layout Structure (1)

Rotating these four alone creates unmistakable visual differentiation even if the remaining four stay similar.

### Step 4 — Translate DNA to Design Tokens

The DNA code maps directly to CSS custom properties:

```css
:root {
  /* From Dimension 2 (Color Approach) */
  --color-bg-primary: ;
  --color-bg-secondary: ;
  --color-accent-1: ;
  --color-accent-2: ;
  --color-text-primary: ;
  --color-text-secondary: ;

  /* From Dimension 3 (Typography) */
  --font-display: ;
  --font-body: ;

  /* From Dimensions 1, 6, 7 (Layout/Nav/Sections) */
  --container-max: ;
  --section-padding: ;
  --border-radius: ;
  --header-height: ;
}
```

These tokens get injected into `tailwind.config.js` as theme extensions, making every component automatically adopt the selected style.

---

## DNA Code Examples by Niche

### Taco Shop A
`1B-2A-3C-4A-5D-6B-7A-8B`
Full-Width + Vibrant + Script Font + Full-Screen Food Hero + Micro-Interactions + Transparent Nav + Zigzag + Lifestyle Photos
→ Festive, warm, authentic feel

### Taco Shop B
`1C-2B-3E-4D-5E-6A-7B-8D`
Asymmetric + Dark Mode + Condensed + Video Hero + Scroll Reveals + Sticky Nav + Card Grid + Vintage
→ Modern, moody, premium street food

### Auto Repair A
`1A-2E-3D-4B-5B-6A-7C-8A`
Centered + High Contrast + Slab Serif + Split Hero + Subtle Fade + Sticky Nav + Process Flow + Professional
→ Clean, trustworthy, no-nonsense

### Auto Repair B
`1B-2B-3E-4A-5E-6B-7A-8B`
Full-Width + Dark + Condensed + Full-Screen + Scroll Reveals + Transparent Nav + Zigzag + Candid
→ Premium garage, built tough

### Attorney A
`1A-2C-3A-4C-5B-6A-7A-8A`
Centered + Monochromatic + Serif + Text-Centric + Subtle + Sticky + Zigzag + Professional
→ Classic, dignified authority

### Attorney B
`1E-2E-3F-4C-5D-6D-7E-8E`
Single Column + B&W + Accent + Oversized Display + Micro-Interactions + Minimal Nav + Tabbed + Clean
→ Modern, bold, editorial

---

## Anti-Pattern Check

After selecting a DNA code, verify it doesn't match the "AI Default":
- **AI Default DNA:** `1A-2A-3B-4B-5B-6A-7B-8A`
  (Centered + Light + Bold Sans + Split + Subtle + Sticky + Card Grid + Professional)

If your code matches 6+ dimensions with the AI Default, rotate at least 2 more dimensions away. The goal is sites that look hand-designed, not template-generated.
