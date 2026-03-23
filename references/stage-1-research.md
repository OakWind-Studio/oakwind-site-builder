# Stage 1 — Research

> Gather everything needed to build a site that could only belong to THIS business. Output: a populated `data.js` with the BRIEF export.

---

## 1. Structured BRIEF Format

The `data.js` file exports a single `BRIEF` object. Every field must be populated before Stage 2 begins.

```js
export const BRIEF = {
  business: {
    name: "",           // Legal/display name
    phone: "",          // Formatted: (817) 555-0142
    phoneTel: "",       // tel: format: +18175550142
    address: "",        // Street address
    city: "",           // City name
    state: "",          // 2-letter state code
    zip: "",            // ZIP code
    hours: "",          // e.g. "Mon-Fri 8am-6pm, Sat 9am-2pm"
    yearsInBusiness: 0, // Integer
    ownerName: "",      // First + Last
    established: ""     // Year string: "2012"
  },
  personality: {
    energy: "",         // "calm" | "balanced" | "energetic"
    formality: "",      // "casual" | "balanced" | "formal"
    boldness: "",       // "subtle" | "balanced" | "bold"
    era: ""             // "traditional" | "balanced" | "modern"
  },
  competitors: [
    { name: "", url: "", weaknesses: [], strengths: [] }
  ],
  images: {
    hero: "",           // URL — wide landscape, high-res
    about: "",          // URL — owner portrait or team photo
    gallery: [],        // URLs — 4-8 portfolio/showcase images
    services: []        // URLs — 1 per service if available
  },
  reviews: [
    { name: "", rating: 5, text: "", date: "", service: "" }
  ],
  services: [
    { icon: "", title: "", description: "", price: "" }
  ],
  differentiators: [],  // 3-5 strings: what makes them different
  copy: {
    heroHeadline: "",   // 7 words max
    heroSubtitle: "",   // One sentence with specific proof point
    sectionLabels: {},  // { services: "What We Do Best", about: "The Story", ... }
    ctaText: "",        // Action-specific: "Call Dr. Maria" not "Contact Us"
    aboutNarrative: "", // 3-paragraph owner story (origin, philosophy, proof)
    tagline: ""         // One-liner brand essence
  }
};
```

---

## 2. Business Personality Profiling

Score each axis based on available signals. When unsure, use niche defaults from `references/oracle-mapping.js` → `nicheDefaults`.

### Energy: Calm ←→ Energetic
| Signal | Calm | Energetic |
|--------|------|-----------|
| Social media voice | Measured, informative | Exclamation marks, emojis, hype |
| Signage/branding | Muted colors, serif fonts | Bright colors, bold sans |
| Service type | Consultative, high-touch | Fast-paced, high-volume |
| Niche default | Dental, law, med spa | Detailing, barber, pressure washing |

### Formality: Casual ←→ Formal
| Signal | Casual | Formal |
|--------|--------|--------|
| Owner communication | First names, slang | Titles, professional language |
| Dress code | T-shirts, casual | Suits, uniforms, scrubs |
| Price range | Budget-mid | Premium-luxury |
| Niche default | Barber, restaurant, home svc | Attorney, law firm, med spa |

### Boldness: Subtle ←→ Bold
| Signal | Subtle | Bold |
|--------|--------|------|
| Existing branding | Minimalist, muted | High-contrast, large type |
| Marketing tone | Understated confidence | Loud claims, superlatives |
| Target audience | Affluent, refined | Action-oriented, decisive |
| Niche default | Med spa, wedding venue | Detailing, pressure washing |

### Era: Traditional ←→ Modern
| Signal | Traditional | Modern |
|--------|-------------|--------|
| Business age | 20+ years, family legacy | <5 years, tech-forward |
| Aesthetic | Wood, leather, heritage | Glass, gradients, minimal |
| Owner age/style | Established, conservative | Young, trend-aware |
| Niche default | Home builder, attorney | Med spa, detailing |

---

## 3. Image Discovery Pipeline

Work through these steps in priority order. Stop when you have enough images.

1. **WebSearch** for the business web presence — Google, Yelp, Facebook, Instagram
2. **Verify identity** — match 2+ identifiers (name + city, phone, address) before scraping
3. **WebFetch / Firecrawl** to scrape images from their existing site or social profiles
4. **Firecrawl** for JS-heavy sites (SPAs, Wix, Squarespace) — limit to 1-3 pages to avoid rate limits
5. **Match images to placements** — use real photos that fit their destination slot (no circular crops in rectangular spaces, no portrait shots for hero banners)
6. **Brief-provided URLs** — if the user supplies image URLs, verify each one loads correctly
7. **Niche-relevant stock** — Unsplash/Pexels search with niche-specific terms as last resort

**Fallback:** If no suitable images are found, use styled placeholder cards with Lucide icons matching each service. Never leave `<img>` tags with broken `src` attributes.

**Image requirements by slot:**
| Slot | Aspect | Min width | Notes |
|------|--------|-----------|-------|
| Hero | 16:9 or wider | 1200px | Landscape only, dark overlays work best |
| About | 3:4 or 1:1 | 400px | Owner portrait preferred |
| Gallery | Mixed | 600px | Variety of aspects adds visual interest |
| Services | 4:3 or 16:9 | 400px | One per service category |

---

## 4. Competitive Analysis

Reference: `references/competitive-template.md` (being created in Task 5).

Scrape 2-3 local competitors with Firecrawl. For each, note:

- **Colors used** — dominant palette, accent colors
- **Layout pattern** — hero style, section count, navigation type
- **Trust signals** — reviews displayed, certifications, years in business
- **Mobile experience** — responsive quality, load time, touch targets
- **Weaknesses to beat** — template look, slow load, poor mobile, weak copy, missing tel: links

The goal is differentiation: the mockup must look clearly different from and better than every competitor analyzed.

---

## 5. Copy Rules

Reference: `references/copy-craft.md` for full guidance.

**Key rules for Stage 1 copy:**

- **Hero headline:** 7 words max. Use a formula from copy-craft.md: `[City]'s [Superlative] [Thing]`, `[Number] + [Proof point]`, `[Action verb] + [Unexpected angle]`, etc.
- **Hero subtitle:** One sentence with a specific, concrete proof point. Not a second headline.
- **Section labels:** Give personality — "What We Do Best" not "Our Services", "The Story" not "About Us"
- **CTA text:** Action-specific — "Call Dr. Maria" not "Contact Us", "Book a Free Consult" not "Get Started"
- **Copy specificity test:** The copy must contain 3+ hyper-specific details that only apply to THIS business (owner name, years, stat, technique, neighborhood). If you can swap in a competitor's name and the copy still works, rewrite it.

**Kill zombie phrases:** "Welcome to", "committed to excellence", "state-of-the-art", "customer satisfaction is our priority", "quality you can trust". See full banned list in copy-craft.md.

---

## 6. Brand Alignment

Before creating any visual identity, check for existing brand signals:

- **Strong existing brand** (consistent colors, logo, fonts across signage/web/social): Build around it. Extract their hex values, match to the closest OakWind palette, respect their visual language.
- **Weak or no brand** (template website, inconsistent visuals, no clear identity): Create a new identity that fits the niche. Use oracle-mapping.js niche defaults as the starting point.
- **Partial brand** (has a logo/colors but no consistency): Incorporate what works (logo colors as accent), supplement the rest from the palette system.

---

## 7. Niche Reference

Read the matching niche file from `references/niches/{niche}.md` for niche-specific guidance on:
- Common services and pricing tiers
- Trust signals that matter in this industry
- Visual patterns that resonate with the target audience
- Emotional arc for section ordering

If no matching niche file exists, identify the closest niche from the 13 available files (dental, restaurant, attorney, med-spa, realtor, home-builder, wedding-venue, barber, detailing, pressure-washing, home-services, auto-repair, law-firm) and adapt its patterns. Note the closest match in BRIEF comments.
