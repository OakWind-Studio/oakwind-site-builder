# Stage 4 — Build

> Transform the section map into working React + Tailwind code. Output: a complete, building project with all components wired and styled.

---

## 1. Scaffold

```bash
bash <skill-path>/scripts/scaffold.sh <slug> <mode>
# Example: bash scripts/scaffold.sh sonrisas-dental light
```

This creates a Vite + React 18 + Tailwind CSS v4 project with:
- `src/lib/` symlinked to `shared-lib/` (primitives, hooks, context, utils)
- `src/data.js` (empty BRIEF + DESIGN_SYSTEM templates)
- `src/App.jsx`, `src/main.jsx`, `src/index.css` (starter files)
- `index.html` with viewport meta and preconnects
- `package.json` with pinned dependencies

Mode is `light` or `dark` — sets the initial @theme surface tokens.

---

## 2. Download Fonts

```bash
bash <skill-path>/scripts/download-fonts.sh "FontFamily:wght@300;400;700" "SecondFont:wght@400;600"
```

Run from inside the project directory. Downloads `.woff2` files to `public/fonts/` and outputs `@font-face` CSS blocks. Copy the font URLs from the selected pairing in `references/font-pairings.md`.

---

## 3. Populate @theme

Open `src/index.css`. Replace the default `@theme { }` block with:

1. **Color tokens** — copy the entire `@theme` block from the selected palette file in `references/palettes/{palette}.css`
2. **Font tokens** — add `--font-display` and `--font-body` values from `references/font-pairings.md`
3. **Type scale tokens** — copy the chosen scale's `clamp()` values from `references/design-tokens/type-scales.css`
4. **Spacing tokens** — if not already in the palette, add standard spacing tokens

The @theme block is the single source of truth for all visual tokens. Components never hardcode hex values, font names, or pixel sizes.

---

## 4. Set Personality

In `src/main.jsx`, wrap the App with PersonalityProvider:

```jsx
import { PersonalityProvider } from './lib/context/PersonalityContext';

<PersonalityProvider personality="calmFormal">
  <App />
</PersonalityProvider>
```

Set `personality` to the preset name chosen in Stage 2. This controls all animation timing, easing curves, and intensity automatically.

---

## 5. Install Extra Dependencies

Check the `@requires` tags on each selected recipe in `recipes/_metadata.json`. Install any needed packages:

```bash
npm install swiper          # for carousel/slider recipes
npm install gsap            # for advanced scroll animations
npm install atropos          # for 3D card tilt effects
npm install framer-motion   # for orchestrated animations (if not already included)
```

Only install what the selected recipes actually need. Keep the bundle lean.

---

## 6. Adapt Recipes

For each section in the section map, create a component file:

### Process per section:
1. **Read the recipe** — `recipes/{category}/{recipe-name}.jsx`
2. **Read the KEEP / CHANGE / DON'T guidelines** in the recipe's header comments
3. **Write** `src/components/{SectionName}.jsx`

### Adaptation rules:

**Colors** — Replace all hardcoded colors with @theme utility classes:
```jsx
// WRONG: bg-blue-600, text-gray-900, border-gray-200
// RIGHT: bg-accent, text-primary, border-border
```

**Fonts** — Use `font-display` and `font-body` utilities:
```jsx
<h1 className="font-display text-5xl">      // Display font for headings
<p className="font-body text-base">          // Body font for paragraphs
```

**Content** — Import from data.js BRIEF, never hardcode:
```jsx
import { BRIEF } from '../data';
// Use: BRIEF.business.name, BRIEF.services, BRIEF.reviews, etc.
```

**Images** — Use shared-lib image components with correct aspect ratios:
```jsx
import { OakImage } from '../lib/primitives/OakImage';
import { FramedImage } from '../lib/primitives/FramedImage';
import { RevealImage } from '../lib/primitives/RevealImage';

<OakImage src={BRIEF.images.hero} alt="..." aspect="16/9" />
<FramedImage src={BRIEF.images.about} alt="..." aspect="3/4" />
<RevealImage src={img} alt="..." aspect="4/3" />
```

**Animations** — Let PersonalityContext handle timing. Do NOT hardcode:
```jsx
// WRONG: transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
// RIGHT: Use the animation hooks from shared-lib, or CSS-native animations
```

**Sections** — Use the Section primitive for consistent spacing:
```jsx
import { Section } from '../lib/primitives/Section';
<Section spacing="default" maxWidth="6xl">
  {/* section content */}
</Section>
```

### What to KEEP from recipes:
- Structural HTML pattern and component hierarchy
- Responsive breakpoints and mobile-first approach
- Premium details: hover states, micro-interactions, visual tricks
- Accessibility attributes: aria labels, roles, alt text

### What to CHANGE:
- All color values → @theme tokens
- All font references → font-display / font-body
- Hardcoded content → BRIEF imports
- Static images → OakImage / FramedImage / RevealImage

### What NOT to do:
- Simplify animations — keep the recipe's animation complexity
- Flatten layouts — preserve the recipe's structural depth (grids, overlaps, z-layers)
- Remove hover states — they're premium signals
- Skip responsive breakpoints — every recipe is mobile-first

---

## 7. Wire App.jsx

Import all section components and compose in section map order. App.jsx should be clean and simple (~50-80 lines):

```jsx
import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Services from './components/Services';
// ... etc

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      {/* ... remaining sections in section map order */}
      <Footer />
      <FloatingCTA />
    </>
  );
}
```

Include the section map comment block at the top (from Stage 3).

---

## 8. Head Polish

Update `index.html`:

- **Title:** `{Business Name} | {City}, {ST}` — e.g., "Sonrisas Dental | Fort Worth, TX"
- **Meta description:** One sentence summarizing the business with location
- **Favicon:** Emoji favicon — `<link rel="icon" href="data:image/svg+xml,<svg ...>🦷</svg>">`
- **Preconnect:** Google Fonts preconnect tags (if using Google Fonts CDN as fallback)
- **Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

---

## 9. Build & Fix

```bash
npm run build
```

Must succeed with zero errors. Common fixes:

- **Import errors** — check file paths, ensure `.jsx` extension matches
- **Missing dependencies** — run `npm install {package}` for any missing `@requires`
- **Tailwind class errors** — ensure @theme tokens are properly defined in index.css
- **JSX syntax** — check for unclosed tags, missing parentheses

If the build fails repeatedly, read `references/error-recovery.md` for the fix playbook.

After a successful build, the `dist/` folder is ready for preview or deployment.
