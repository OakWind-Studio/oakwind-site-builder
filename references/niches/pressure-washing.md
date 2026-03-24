# Niche: Pressure Washing

Covers pressure washing, power washing, soft washing, exterior cleaning, driveway cleaning, deck restoration, commercial exterior maintenance, and gutter cleaning services.

---

## Required Page Elements

- **Before/after comparison sliders** — the primary conversion tool in this niche
- **Service area specificity** — neighborhoods, zip codes, or city list
- **Pricing transparency** — at minimum per-service starting prices or "free estimate"
- **Phone number** — prominent, click-to-call, sticky
- **Licensed & insured badge** — critical for home services trust
- **Service list** with photos per service type
- **Google rating and review count** — in first viewport
- **"Same-day / next-day" availability** messaging if applicable

## Trust Signals (priority order)

1. Google rating + review count
2. Before/after photos (multiple, high quality)
3. "Licensed & Insured" badge
4. Years in business
5. Service area map or list
6. Specific equipment/technique mentions (soft wash for roofs, hot water for grease)
7. Satisfaction guarantee
8. Real owner photo and name

## Section Priority Order

1. Hero (transformation photo + name + phone + "Free Estimate")
2. Trust strip (rating, years, licensed/insured, "same-day")
3. Services (with before/after per service)
4. Before/after gallery
5. About (owner story, equipment, approach)
6. Reviews
7. Service area
8. Contact / estimate form
9. Footer

---

## Style DNA Constraints

| Dimension | Preferred | Avoid |
|-----------|-----------|-------|
| Layout (1) | Full-Width (1B), Classic Centered (1A) | Single Column (1E), Overlap (1F) |
| Color (2) | Light + Vibrant (2A) — cleanliness association | Dark (2B), Pastel (2F) |
| Typography (3) | Bold Sans (3B), Condensed (3E), Slab (3D) | Script (3C), Serif (3A) |
| Hero (4) | Split (4B), Full-Screen (4A), Slider (4G) | Text-Centric (4C), Video (4D) |
| Animation (5) | Subtle (5B), Micro (5D) | Full Cinematic (5F) |
| Nav (6) | Sticky (6A) | Sidebar (6E) |
| Sections (7) | Before/After Sliders (7F), Card Grid (7B), Zigzag (7A) | Tabbed (7E) |
| Imagery (8) | Professional (8A), Lifestyle/Candid (8B) | Illustrations (8C), Geometric (8F) |

---

## Aesthetic Direction

Pressure washing sites need to feel **clean, trustworthy, and results-driven**. The transformation narrative is everything — dirty → clean is the entire sales pitch. Design should feel fresh, direct, and professional without being corporate.

### Color Approach
- Blue + white dominates (water/cleanliness association)
- Green accents work (eco-friendly, lawn care crossover)
- Yellow/orange for energy and urgency
- Clean backgrounds, bright and airy
- Avoid: dark themes (contradiction with "clean" messaging)

### Typography
- Bold, direct, no-nonsense
- Headlines should feel powerful: "We Make It Look New"
- Avoid delicate or decorative fonts

### Photography
- Before/after is king — high-contrast transformation photos
- Action shots of technician working
- Close-ups of surfaces being cleaned
- Drone shots of property exterior (impressive scale)

---

## Font Pairings

| Style | Display | Body |
|-------|---------|------|
| Bold Direct | Montserrat, Outfit | Open Sans, DM Sans |
| Industrial | Bebas Neue, Barlow Condensed | Barlow, Work Sans |
| Professional | Raleway, Poppins | Lato, Source Sans 3 |
| High Energy | Oswald, Teko | Nunito, Rubik |

---

## Color Palette Examples

### Palette A (Clean Blue)
- bg-primary: `#FFFFFF`
- bg-secondary: `#EFF6FF` (sky blue tint)
- accent-1: `#1D4ED8` (strong blue)
- accent-2: `#16A34A` (fresh green)
- text-primary: `#0F172A`
- text-secondary: `#475569`

### Palette B (Power Orange)
- bg-primary: `#FAFAFA`
- bg-secondary: `#FFF7ED` (warm cream)
- accent-1: `#EA580C` (bold orange)
- accent-2: `#1E40AF` (deep blue)
- text-primary: `#1C1917`
- text-secondary: `#57534E`

### Palette C (Fresh Green)
- bg-primary: `#F8FAF8`
- bg-secondary: `#ECFDF5` (mint tint)
- accent-1: `#059669` (emerald)
- accent-2: `#0284C7` (sky blue)
- text-primary: `#111827`
- text-secondary: `#6B7280`

---

## Before/After Slider Pattern

The before/after slider is the hero component of this niche. Implementation:

```jsx
// Use a range input or drag handle for the comparison
// Mobile: swipe-friendly, large drag area (56px+ handle)
// Desktop: hover cursor changes to indicate draggable
// Default position: 50% (show both sides equally)
// Include labels: "BEFORE" and "AFTER" overlaid on each side
```

Each service should ideally have its own before/after pair:
- Driveway: oil stains → clean concrete
- Deck: grey/weathered → restored wood
- House siding: green algae → fresh
- Roof: black streaks → clean shingles

---

## Copy Patterns That Work

- "We make [city] homes look brand new"
- "See the difference — free estimates, no pressure"
- "Licensed, insured, and 5-star rated"
- "Same-day service available"
- "Soft wash safe for every surface"
- "Your neighbors will ask what happened"
- "{X}+ driveways, decks, and homes restored"

## Anti-Patterns

- Dark backgrounds — contradicts the "clean" narrative
- Overly technical language about PSI and equipment — customers care about results, not specs
- No before/after photos — wastes the niche's strongest conversion tool
- Generic "home services" feel — be specific to pressure washing

---

## Same-Niche Rotation System

Build 10 pressure washing sites and they should all look different. Pick the variant that matches the business personality, and rotate so consecutive same-niche builds use different variants.

| | **Variant A: Clean Machine / Bright Authority** | **Variant B: Industrial Power / Bold Direct** | **Variant C: Neighborhood Pro / Friendly Trust** |
|---|---|---|---|
| Hero | Bright white hero with strong blue accent, dramatic before/after split visible in hero, bold "We Make It Look New" headline, animated water-spray particle effect on hover | Dark slate hero with bold orange or red power accent, full-screen action shot of technician with pressure washer, industrial energy, oversized condensed headline | Warm friendly hero with real property transformation photo, green and earth-tone palette, owner photo or truck branding visible, community-rooted tagline |
| Palette | Palette A (Clean Blue — white + sky blue tint + strong blue + fresh green) or custom bright white + electric blue | Palette B (Power Orange — warm cream + bold orange + deep blue) adapted darker — charcoal sections + orange accent + amber secondary | Palette C (Fresh Green — mint tint + emerald + sky blue) or custom warm white + sage green + earth brown |
| Texture | None — ultra-clean with crisp geometric before/after frames, blue gradient washes on section backgrounds, water-droplet subtle pattern on hero | Industrial concrete texture on dark sections, bold diagonal stripe dividers, gritty grain overlay on hero, power-line geometric accents | Warm subtle noise on alternating sections, rounded section dividers, soft shadow depth on cards, friendly organic feel |
| Cards | Clean white service cards with strong blue top border, before/after thumbnail pair per service, crisp pricing in bold blue, "Get Estimate" per card | Dark charcoal service cards with bold orange accent stripe, condensed uppercase service names, dramatic before/after photos with high contrast | Rounded warm cards with sage or green accent border, friendly service descriptions, small before/after thumbnails, approachable pricing display |
| CTA style | Bright blue solid button with white text, clean and authoritative ("Get Your Free Estimate") | Bold orange full-width banner CTA with industrial energy, aggressive copy ("Blast Away the Grime — Call Now") | Soft green rounded button with friendly weight, community copy ("See What We Can Do For Your Home") |
| Special | Animated before/after slider as hero centerpiece with water-wipe transition effect, service area map with clean blue markers, certification badges in crisp grid | Horizontal scroll before/after gallery on dark rail with orange labels, equipment/technique showcase section with industrial photography, "Same-Day Service" urgency banner | Owner story section with real photos and community roots, neighborhood testimonial cards with street names, seasonal service reminder section with friendly icons |
| Font mood | Clean authority (Montserrat or Raleway + DM Sans) | Industrial power (Bebas Neue or Barlow Condensed + Barlow) | Friendly professional (Nunito or Poppins + Lato) |

**How to pick:** Match variant to business personality. A professional operation emphasizing cleanliness, precision, and certification → Variant A. A power-forward business with industrial equipment, commercial clients, and aggressive marketing → Variant B. A neighborhood-focused owner-operator with community roots and personal touch → Variant C. Document which variant in App.jsx header comment.
