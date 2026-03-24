# OakWind Site Builder v2

A Claude Code skill that builds complete, deployment-ready websites for local businesses in a single prompt. Produces React 18 + Tailwind CSS v4 sites with premium design, scroll-driven animations, real business images, and conversion optimization — ready to deploy on Cloudflare Pages.

Built for [OakWind Studio](https://oakwindstudio.com)'s iPad demo sales workflow. Every mockup looks like a $3K-$10K custom build because that's what we're selling.

---

## Install

```bash
# Clone into your Claude Code skills directory
cd ~/.claude/skills
git clone https://github.com/OakWind-Studio/oakwind-site-builder.git
```

Restart Claude Code. The skill triggers automatically when you say "build a site for [business]" or mention any supported niche.

## Update

```bash
cd ~/.claude/skills/oakwind-site-builder
git pull
```

---

## How It Works

Say something like:

```
build a site for Maria's Taqueria at 2100 W Berry St Fort Worth.
4.7 stars, 340 reviews, family-owned 12 years. (817) 555-0142.
```

The skill runs an 8-stage pipeline automatically:

| Stage | What happens |
|-------|-------------|
| **Stage 0 — Recall** | Checks past build learnings from intelligence database |
| **Stage 1 — Research** | Gathers real business data, images, reviews, personality profile, competitor analysis |
| **Stage 2 — Design System** | Selects palette, font pairing, page architecture, animation personality, generates fingerprint |
| **Stage 3 — Compose** | Filters and assigns recipes per section, maps visual weight and animation types |
| **Stage 4 — Build** | Scaffolds Vite project, copies shared-lib, adapts recipe components, wires App.jsx |
| **Stage 5 — Verify** | 9-dimension pass/fail check + AI Slop Gate (10 anti-convergence rules) |
| **Stage 6 — Refine** | Fix failing dimensions (max 3 iterations, escalates to user if stuck) |
| **Stage 7 — Learn** | Saves build record, recipe scores, fingerprint to intelligence database |

After build:

```bash
cd project-name
npm install && npm run build
npm run dev                                                    # preview
npx wrangler pages deploy dist --project-name=project-name     # deploy
```

---

## Output Structure

```
{project}/
├── src/
│   ├── lib/          ← Shared library (scaffold copies automatically)
│   ├── components/   ← Unique sections adapted from recipes
│   ├── data.js       ← Business data (BRIEF) + design config (DESIGN_SYSTEM)
│   ├── App.jsx       ← Thin orchestrator (~50-80 lines) + section map comment
│   ├── index.css     ← @theme tokens + shared-lib CSS imports
│   └── main.jsx      ← Entry point with PersonalityProvider
├── public/fonts/     ← Self-hosted .woff2 (offline iPad demo safe)
└── dist/             ← Production build output
```

The AI writes ONLY `data.js`, `App.jsx`, `index.css` tokens, and `components/*.jsx`. Everything in `lib/` is pre-built by the shared library.

---

## Supported Niches (13)

Every niche has its own reference file with section priorities, trust signals, color guidance, typography, sub-niche variations, and a premium inspiration library with real website URLs for benchmarking.

### Standard Tier ($125-$175/mo or $1.5K-$2.5K upfront)

| Niche | Reference file | Key patterns |
|-------|---------------|-------------|
| **Restaurant** | `niches/restaurant.md` | Food photography hero, menu tabs, reservation CTA |
| **Auto Repair** | `niches/auto-repair.md` | Shop-at-night hero, ASE badges, process timeline |
| **Barbershop** | `niches/barber.md` | Gallery thumbs, service filter, walk-in CTA |
| **Pressure Washing** | `niches/pressure-washing.md` | Before/after slider, transformation hero |
| **Auto Detailing** | `niches/detailing.md` | Dark premium, before/after parallax, package cards |
| **Home Services** | `niches/home-services.md` | Emergency CTA, service area, license badges |
| **Solo Attorney** | `niches/attorney.md` | Credentials hero, case results, consultation CTA |

### Premium Tier ($3.5K-$10K upfront)

| Niche | Reference file | Key patterns |
|-------|---------------|-------------|
| **Realtor** | `niches/realtor.md` | Agent split-screen hero, property showcase, tilt cards |
| **Home Builder** | `niches/home-builder.md` | Horizontal portfolio, lightbox details, project galleries |
| **Cosmetic Dental** | `niches/dental.md` | Smile gallery, credentials, treatment filter |
| **Boutique Law Firm** | `niches/law-firm.md` | Attorney grid, case results, scramble stats |
| **Med Spa** | `niches/med-spa.md` | Provider split-screen, coverflow treatments |
| **Wedding Venue** | `niches/wedding-venue.md` | Coverflow gallery, lightbox, couple testimonials |

---

## The Design System

### Color Palettes (16 Curated)

Pre-tested palettes as Tailwind v4 `@theme` CSS files. Each includes semantic tokens (`--color-accent`, `--color-surface`, `--color-text-primary`, `--color-border`) with guaranteed contrast ratios.

| Mood | Palettes | Best for |
|------|----------|----------|
| **Warm & Inviting** | Toasted Almond, Terracotta Garden, Golden Hour, Campfire | Family businesses, restaurants, bakeries, BBQ |
| **Cool & Professional** | Midnight Sage, Steel & Copper, Navy Brass, Arctic Blue | Attorneys, auto repair, dental, medical |
| **Dark & Premium** | Obsidian, Carbon Fiber, Noir Rouge, Midnight Velvet | Detailing, barbers, trendy restaurants, luxury med spa |
| **Soft & Elegant** | Blush Cream, Sage Linen, Pearl | Cosmetic dental, weddings, wellness |
| **Bold & Energetic** | Neon Street, Electric Coral, Teal Thunder | Trendy taco bars, pressure washing, roofing |
| **High Contrast** | Ink & Gold, Monochrome + Red | Luxury brands, bold barbers |

### Font Pairings (25 Curated)

Google Fonts combinations organized by mood, with exact CSS values and self-hosted .woff2 support.

**Banned fonts:** Inter, Roboto, Arial, Space Grotesk, Poppins (AI tells).

### Page Architectures (8)

Pre-designed section ordering templates adapted per niche:

| Architecture | Best for |
|-------------|----------|
| The Showcase | Portfolios, galleries, visual-first businesses |
| The Authority | Law firms, medical, credentialed professionals |
| The Storyteller | Family businesses, origin stories, community roots |
| The Converter | High-volume services, trades, urgent needs |
| The Editorial | Premium brands, lifestyle businesses |
| The Comparison | Before/after businesses, transformations |
| The Navigator | Multi-service businesses, complex offerings |
| The Experience | Venues, hospitality, immersive environments |

---

## Recipe System (169 Templates)

Every section is built from a recipe — a JSX template with KEEP/CHANGE/DON'T guidelines. Recipes are organized by category:

| Category | Count | Examples |
|----------|-------|---------|
| Heroes | 12 | Cinematic fullbleed, split-screen, text-centric, video bg |
| Trust strips | 8 | Rating bar, credential badges, client logos |
| Services | 14 | Card grid, accordion, tabbed, pricing tiers |
| About | 10 | Sticky scroll journey, team grid, origin story |
| Reviews | 10 | Carousel, editorial quotes, video testimonials |
| Contact | 8 | Split form, map embed, booking widget |
| CTAs | 8 | Mid-page break, floating bar, urgency banner |
| Galleries | 12 | Bento grid, horizontal scroll, before/after |
| Pricing | 8 | Tier cards, comparison table, service menu |
| Location | 6 | Map + hours, service area, multi-location |
| + 10 more categories | 73 | Atmosphere, navigation, footer, specialty sections |

### Recipe Filtering (Stage 3)

Recipes are filtered by: niche compatibility → personality match → tier appropriateness → fingerprint exclusion (no repeats of same-niche builds).

---

## Shared Component Library

Pre-built React components copied into every project by the scaffold:

| Category | Components |
|----------|-----------|
| **Primitives** | Input, Textarea, Select, Button (floating label pattern) |
| **Context** | PersonalityContext (animation timing distribution) |
| **Hooks** | useInViewport, useChapterScroll, useMediaQuery |
| **Utils** | telLink, cn (classname merge), formatPhone |
| **Layout** | OakWindFooter, SmoothScroll, PageCurtain, NoiseOverlay |

---

## Inspiration Library

13 niche-specific files with real premium website URLs for design benchmarking during Stage 2. Each file contains 6 curated examples with:

- **Real URL** — scrapeable with Firecrawl for design reference
- **What makes it premium** — specific design techniques observed
- **Technique to borrow** — one actionable pattern to adapt

Niches covered: dental, restaurant, attorney, med-spa, realtor, home-builder, wedding-venue, barber, detailing, pressure-washing, home-services, auto-repair, plus a general-premium cross-niche file.

---

## Intelligence Database

Self-improving system that learns from every build:

| File | What it tracks |
|------|---------------|
| `intelligence/builds.json` | Palette, fonts, architecture, personality per build |
| `intelligence/recipe-scores.json` | Which recipes performed well in verify |
| `intelligence/anti-patterns.json` | What failed and why |
| `intelligence/fingerprints.json` | Design fingerprints for uniqueness checking |
| `intelligence/niche-insights.json` | Niche-specific learnings |
| `intelligence/evolution-log.json` | Skill improvements over time |

Run `/oakwind-evolve` after 5+ builds to review patterns and propose skill improvements.

---

## Conversion Design

### Phone Number Enforcement (6 minimum)

`tel:` links in: sticky header, hero CTA, mid-page break, contact section, footer, floating mobile bar.

### Trust Signal Hierarchy (first viewport)

1. Star rating + review count
2. Years in business
3. Owner's name
4. Certifications (BBB, licensed/insured, ASE, board-certified)
5. Real customer quotes (3+ per site)

### 4 iPad Demo "Wow Moments"

Every build engineers 4 specific points where the prospect visibly reacts:

1. **Hero reveal** (0-3s) — orchestrated entrance animation
2. **Scroll surprise** (30-50% scroll) — unexpected interaction
3. **Deep impression** (50-75% scroll) — scroll-driven moment
4. **Personal touch** (75-90% scroll) — their reviews, address, phone beautifully presented

---

## Anti-Convergence System

Prevents sites from looking AI-generated.

### AI Slop Gate (10 checks, all must pass)

1. No Inter/Roboto/Poppins as primary font
2. No purple-to-blue gradients
3. Card grids not all identical
4. Background not pure #fff/#000
5. Hero stats not generic 3-column template
6. No bounce/elastic easing on scroll reveals
7. Not all sections center-aligned
8. Font-weight range spans ≥300-800
9. Heading size jumps ≥2x
10. Copy not swappable with competitor

---

## Verify (9 Dimensions)

| Dimension | Pass Criteria |
|-----------|--------------|
| Visual Hierarchy | Type size jumps ≥2x, 3+ weight levels |
| Animation | No two adjacent same type, ≥1 scroll-driven |
| Responsive | No overflow at 390px, touch targets ≥44px |
| Conversion | tel: count ≥6, CTA ≥56px height |
| Copy | 3+ hyper-specific details, no zombie phrases |
| Uniqueness | Fingerprint <50% similar to past same-niche |
| Performance | Bundle <500KB, images lazy-loaded |
| Accessibility | Skip link, focus-visible, reduced-motion |
| Polish | 4+ atmosphere recipes, spacing varies |

Pass threshold: 7+/9 dimensions AND slop gate passes.

---

## Post-Build QA

Run `/oakwind-verify` for automated UI verification — screenshots at 3 viewports (mobile, iPad, desktop), checks for visual bugs, broken images, missing `tel:` links, console errors, and responsive issues.

---

## File Structure

```
oakwind-site-builder/
├── SKILL.md                              ← v2 pipeline (8 stages)
├── SKILL.v1.md                           ← v1 pipeline (archived)
├── README.md                             ← This file
│
├── references/
│   ├── stage-1-research.md               ← Stage 1 guide
│   ├── stage-2-design-system.md          ← Stage 2 guide
│   ├── stage-3-compose.md                ← Stage 3 guide
│   ├── stage-4-build.md                  ← Stage 4 guide
│   ├── stage-5-verify.md                 ← Stage 5 guide
│   ├── stage-6-refine.md                 ← Stage 6 guide
│   ├── stage-7-learn.md                  ← Stage 7 guide
│   ├── oracle-mapping.js                 ← Style → palette/font translation
│   ├── color-palettes.md                 ← 16 curated palettes
│   ├── font-pairings.md                  ← 25 Google Fonts pairings
│   ├── copy-craft.md                     ← Headline formulas, voice matching
│   ├── anti-convergence.md               ← Slop gate + banned defaults
│   ├── gradient-patterns.md              ← 5 adaptive gradient formulas
│   ├── competitive-template.md           ← Structured competitor analysis
│   ├── niche-fallback.md                 ← Unmapped niches → closest match
│   ├── error-recovery.md                 ← Common build failures + fixes
│   ├── performance-budgets.md            ← Per-architecture limits
│   │
│   ├── niches/                           ← Niche-specific content guidance
│   │   ├── restaurant.md
│   │   ├── auto-repair.md
│   │   ├── dental.md
│   │   ├── med-spa.md
│   │   ├── attorney.md
│   │   ├── barber.md
│   │   ├── detailing.md
│   │   ├── pressure-washing.md
│   │   ├── home-services.md
│   │   ├── realtor.md
│   │   ├── home-builder.md
│   │   ├── law-firm.md
│   │   ├── wedding-venue.md
│   │   └── emotional-arcs.md
│   │
│   ├── inspiration/                      ← Premium site URLs per niche
│   │   ├── dental.md
│   │   ├── restaurant.md
│   │   ├── attorney.md
│   │   ├── med-spa.md
│   │   ├── realtor.md
│   │   ├── home-builder.md
│   │   ├── wedding-venue.md
│   │   ├── barber.md
│   │   ├── detailing.md
│   │   ├── pressure-washing.md
│   │   ├── home-services.md
│   │   ├── auto-repair.md
│   │   └── general-premium.md
│   │
│   ├── architectures/                    ← 8 page structure templates
│   ├── palettes/                         ← @theme CSS files per palette
│   └── design-tokens/                    ← Token system + type scales
│
├── recipes/                              ← 169 section blueprints
│   ├── _metadata.json                    ← Recipe index for filtering
│   ├── heroes/
│   ├── trust/
│   ├── services/
│   ├── about/
│   ├── reviews/
│   ├── contact/
│   ├── cta/
│   ├── gallery/
│   ├── pricing/
│   ├── location/
│   └── ...20 categories
│
├── shared-lib/                           ← Pre-built React components
│   ├── primitives/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   └── index.js
│
├── intelligence/                         ← Self-improving build database
│   ├── builds.json
│   ├── recipe-scores.json
│   ├── anti-patterns.json
│   ├── fingerprints.json
│   ├── niche-insights.json
│   └── evolution-log.json
│
├── scripts/
│   ├── scaffold.sh                       ← Vite + React + Tailwind v4 project setup
│   ├── download-fonts.sh                 ← Google Fonts → self-hosted .woff2
│   ├── oracle.sh                         ← Style oracle (optional)
│   └── verify.sh                         ← Automated build verification
│
└── templates/
    └── design-token-template.json        ← Token naming reference
```

---

## Stack

React 18 · Tailwind CSS v4 (`@theme`) · Vite · Cloudflare Pages · Motion · Lenis · Lucide React

Single-page scroll with anchors. `.jsx` file extensions (not `.tsx`). Multi-file output with shared component library.

---

## Deploy

```bash
npx wrangler pages deploy dist --project-name={slug}
```

Every site also gets pushed to GitHub under the [OakWind-Studio](https://github.com/OakWind-Studio) org.
