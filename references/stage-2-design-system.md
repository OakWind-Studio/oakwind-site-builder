# Stage 2 — Design System

> Translate the BRIEF's personality into a concrete visual system: palette, fonts, architecture, type scale, animation preset. Output: populated `index.css` @theme block and `DESIGN_SYSTEM` export in `data.js`.

---

## 1. Oracle Call (Optional)

```bash
bash <skill-path>/scripts/oracle.sh "{niche} {personality keywords}"
# Example: bash scripts/oracle.sh "dental calm formal modern"
```

If the oracle returns a style name (e.g., "minimalism", "glassmorphism"), proceed to step 2.
If it returns `FALLBACK`, skip to step 3 and use curated defaults from `references/oracle-mapping.js` → `nicheDefaults`.

---

## 2. Oracle Translation

Read `references/oracle-mapping.js`. Look up the oracle's returned style in `styleToDesign`:

```
styleToDesign[styleName] → { palettes[], fontMood, architecture, atmosphereRecipe, notes }
```

This gives you:
- **palettes** — filenames to load from `references/palettes/`
- **fontMood** — category to match in `references/font-pairings.md`
- **architecture** — layout template name from `references/architectures/`
- **atmosphereRecipe** — descriptive guidance for visual atmosphere

If oracle was unavailable, use `nicheDefaults[niche]` from the same file — it provides the same structure.

---

## 3. Palette Selection

Pick ONE palette from `references/palettes/`. Selection priority:

1. Oracle/niche-default recommended palettes (try first in list)
2. Mood match — read the palette file's header comments for personality/niche fit
3. Differentiation — if a recent same-niche build used this palette, pick next in list

Available palettes (16): arctic-blue, blush-cream, campfire, carbon-fiber, electric-coral, golden-hour, midnight-sage, midnight-velvet, navy-brass, noir-rouge, obsidian, sage-linen, steel-copper, teal-thunder, terracotta-garden, toasted-almond.

Read the chosen palette `.css` file. It contains a complete `@theme` block with all semantic color tokens.

---

## 4. Font Pairing Selection

Pick ONE pairing from `references/font-pairings.md`. Match by mood category:

| Mood Category | Personalities | Typical Niches |
|---------------|---------------|----------------|
| Elegant & Refined | calmFormal, subtleElegant, traditionalTrust | Med spa, dental, attorney, wedding |
| Bold & Confident | boldEnergetic, rugged, boldConfident | Detailing, barber, pressure washing |
| Warm & Approachable | warmFriendly, traditionalWarm, calmCasual | Restaurant, home builder, home services |
| Modern & Clean | modernClean, modernMinimal, professionalMinimal | Realtor, tech-forward dental, clean brands |
| Editorial & Distinctive | dramaticLuxury, grandTraditional, editorialBold | Luxury niches, high-end venues |

**Rules:**
- Never use Inter, Roboto, Poppins, or Space Grotesk as display font
- If a recent same-niche build used this pairing, rotate to the next one in the same mood category
- Test mentally: render the business name at 80pt in the display font — does it fit the niche?

---

## 5. Architecture Selection

Pick ONE architecture from `references/architectures/`. Match to niche + personality + tier.

The architecture template defines:
- Required section categories (which recipe slots to fill)
- Section order and spacing rhythm
- Max-width variations per section
- Responsive behavior patterns

Architecture is selected based on oracle recommendation, niche fit, and personality alignment. If no architecture file exists yet, use a standard single-page layout with 6-8 sections.

---

## 6. Tier Determination

| Tier | Price Range | Client Type | Visual Treatment |
|------|-----------|-------------|-----------------|
| 1 | $125-175/mo | Blue-collar, budget | Clean and professional, minimal animation |
| 2 | $200-350/mo | Mid-market, established | Polished, moderate animation, premium touches |
| 3 | $400-600/mo | Professional, growth | Refined, scroll-driven animation, editorial feel |
| 4 | $6K-10K | Luxury, high-end | Maximal polish, cinematic animation, bespoke details |

**Niche defaults:**
- Tier 1: Pressure washing, basic home services
- Tier 2: Barber, auto repair, home services, pressure washing (established)
- Tier 3: Dental, restaurant, attorney, realtor, home builder, detailing, law firm
- Tier 4: Med spa, wedding venue, luxury dental, high-end detailing

Default to Tier 2 when unsure. Adjust up/down based on the business's actual positioning.

---

## 7. Type Scale Selection

Pick ONE scale from `references/design-tokens/type-scales.css`:

| Scale | Ratio | Best For | Personalities |
|-------|-------|----------|---------------|
| Major Third | 1.25 | Most businesses — balanced, readable | calmFormal, calmCasual, traditionalWarm, modernClean |
| Perfect Fourth | 1.333 | Bold niches, luxury, venues, high-impact | boldEdgy, dramaticLuxury, grandTraditional |
| Minor Third | 1.2 | Dense content, medical, legal, info-heavy | calmFormal, modernClean, professionalMinimal |

Copy the chosen scale's `clamp()` values into the @theme block.

---

## 8. Animation Personality

Map the BRIEF's 4-axis personality profile to a preset name for the `PersonalityProvider`:

| Preset Name | Energy | Formality | Boldness | Era |
|-------------|--------|-----------|----------|-----|
| `calmFormal` | calm | formal | subtle | any |
| `calmCasual` | calm | casual | subtle | any |
| `warmFriendly` | balanced | casual | balanced | traditional |
| `modernClean` | balanced | balanced | subtle | modern |
| `boldEnergetic` | energetic | casual | bold | modern |
| `boldConfident` | energetic | any | bold | any |
| `subtleElegant` | calm | formal | subtle | modern |
| `traditionalTrust` | calm | formal | balanced | traditional |

Pick the closest match. This preset controls all animation timing, easing, and intensity automatically via `PersonalityContext`.

---

## 9. Dark / Light Mode

**Dark mode** for: detailing, barber, nightlife, auto repair, moody restaurants, carbon-fiber/obsidian/noir-rouge/midnight-velvet palettes.

**Light mode** for: dental, wedding venue, med spa, realtor, home builder, most restaurants, blush-cream/sage-linen/toasted-almond/arctic-blue palettes.

The palette file itself is designed for one mode. Pick the palette that matches your mode decision — don't try to invert a light palette to dark.

---

## 10. Fingerprint Generation

Generate a build fingerprint to prevent same-niche convergence:

```
hero:{recipe}|svc:{recipe}|test:{recipe}|cta:{recipe}|arch:{arch}|palette:{palette}|fonts:{pairing}|personality:{preset}
```

**Similarity check:** Compare against past same-niche builds in `intelligence/fingerprints.json`. Similarity = matching segments / 8. If similarity >= 5/8 with any past same-niche build, rotate the most-similar segments (swap a recipe, shift palette, change font pairing).

---

## 11. Inspiration Harvest

If `references/inspiration/{niche}.md` exists, read it for curated design references.

Additionally, scrape 2-3 best-in-class sites in the niche with Firecrawl for technique reference. Study their:
- Hero treatment and visual weight
- Section transition techniques
- Typography scale and weight usage
- Color application patterns

Use as inspiration for adaptation, never for direct copying.

---

## 12. Output

### index.css @theme block
Copy the selected palette's `@theme { }` block into `index.css`. Add to it:
```css
@theme {
  /* ... palette color tokens ... */
  --font-display: "Display Font", serif;    /* from font-pairings.md */
  --font-body: "Body Font", sans-serif;     /* from font-pairings.md */
  /* ... type scale clamp() values from type-scales.css ... */
}
```

### DESIGN_SYSTEM export in data.js
```js
export const DESIGN_SYSTEM = {
  palette: "sage-linen",
  fontPairing: "Cormorant Garamond + Outfit",
  typeScale: "major-third",
  architecture: "standard",
  personality: "calmFormal",
  tier: 3,
  mode: "light",
  fingerprint: "hero:cinematic-fullbleed|svc:bento-mixed-grid|..."
};
```
