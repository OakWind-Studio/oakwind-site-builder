---
name: oakwind-site-builder
description: >-
  Build a complete, deployment-ready React 18 + Tailwind CSS website mockup
  for a local business. Activate when user says "build a mockup", "build a
  site for", "create a website for", "demo site", "pitch site", "prospect
  site", "mockup brief", "sales demo", or provides a business name and niche.
  Also trigger on niche keywords: taqueria, auto repair, detailing, pressure
  washing, med spa, attorney, barber, HVAC, roofing, plumber, landscaping,
  restaurant, realtor, real estate agent, broker, home builder, custom homes,
  contractor, dentist, dental, veneers, law firm, wedding venue, event space,
  or any local service business. Produces one-prompt,
  deployment-ready sites via Vite for Cloudflare Pages that look like $3K+
  custom builds shown on an iPad in person. Use this skill instead of
  frontend-design for any OakWind prospect site — it handles sales strategy,
  niche routing, Style DNA variation, conversion design, and iPad demo
  optimization. Read this skill before writing any code.
---

# OakWind Site Builder v2

Hand-crafted sales demo websites shown on an iPad in person. Every mockup must look like a $3K-$10K custom build — because that is what you are selling.

## Stack

React 18 · Tailwind CSS v4 (`@theme`) · Vite · Cloudflare Pages · Motion · Lenis · Lucide React

Single-page scroll with anchors. Use `.jsx` file extensions (not .tsx). Multi-file output with shared component library.

## Output Structure

```
{project}/
├── src/
│   ├── lib/          ← Shared library (scaffold copies this automatically)
│   ├── components/   ← Unique sections adapted from recipes
│   ├── data.js       ← Business data (BRIEF) + design config (DESIGN_SYSTEM)
│   ├── App.jsx       ← Thin orchestrator (~50-80 lines) + section map comment
│   ├── index.css     ← @theme tokens + shared-lib CSS imports
│   └── main.jsx      ← Entry point with PersonalityProvider
├── public/fonts/     ← Self-hosted .woff2 (offline iPad demo safe)
└── dist/             ← Production build output
```

The AI writes ONLY `data.js`, `App.jsx`, `index.css` tokens, and `components/*.jsx`. Everything in `lib/` is pre-built and provided by the scaffold.

---

## The Pipeline

8 stages, sequential. Each stage produces a concrete artifact. DO NOT skip stages.

### Stage 0 — Recall

READ: `intelligence/builds.json`, `intelligence/anti-patterns.json`, `intelligence/recipe-scores.json`

Search for past builds in this niche. Note what worked, what failed, what recipes were used recently. If no data exists (first builds), skip and move on. Spend <30 seconds here.

### Stage 1 — Research

READ: `references/stage-1-research.md` + `references/niches/{niche}.md`

Gather real business data. Discover images. Scrape 2-3 competitors with Firecrawl. Profile business personality (4 axes: energy, formality, boldness, era). Write ALL copy before touching any code — hero headline, section labels, service descriptions, CTA text, about narrative.

**Produce:** `src/data.js` with complete `BRIEF` object + empty `DESIGN_SYSTEM`

**Tools:** Firecrawl (competitors, images), WebSearch/WebFetch (business info), Magic MCP logo_search

**Move on when:** data.js has business info, 4+ images, all copy written, competitor analysis complete.

### Stage 2 — Design System

READ: `references/stage-2-design-system.md`

Call the oracle (optional — `bash scripts/oracle.sh "{niche} {personality keywords}"`). If oracle unavailable, use curated defaults from `references/oracle-mapping.js`. Select palette from `references/palettes/`. Select font pairing from `references/font-pairings.md`. Select page architecture from `references/architectures/`. Select type scale, animation personality, light/dark mode. Generate design fingerprint. Compare against past builds — if >50% similar to a same-niche build, rotate dimensions.

**Produce:** `@theme` block in `index.css` + `DESIGN_SYSTEM` object in `data.js`

**Tools:** `scripts/oracle.sh` (optional), Firecrawl (inspiration sites from `references/inspiration/`)

**Move on when:** Palette, fonts, architecture, personality all selected. Fingerprint is <50% similar to past same-niche builds.

### Stage 3 — Compose

READ: `references/stage-3-compose.md` + `recipes/_metadata.json`

Filter recipes by niche → personality → tier → fingerprint exclusion. For 3-5 key sections, search Magic MCP for inspiration (search queries only — never use Magic-generated code directly). Pick one recipe per section category from filtered results. Write the section map as a comment block at the top of App.jsx.

**Produce:** Section map comment in App.jsx header (recipe, weight, animation, spacing per section) + 4 wow moments

**Tools:** 21st.dev Magic MCP (`component_inspiration` for reference, not code generation)

**Move on when:** Every section has a recipe assignment, visual weight, and animation type. No two adjacent sections share animation type or visual weight class.

### Stage 4 — Build

READ: `references/stage-4-build.md`

Run the scaffold: `bash <skill-path>/scripts/scaffold.sh <slug> <mode>`. Download fonts: `bash <skill-path>/scripts/download-fonts.sh "<font-spec>"`. Install extra deps from recipe `@requires` tags. Populate the `@theme` block with the selected palette's values. Set `PersonalityProvider` personality in `main.jsx`. For each section in the map, read the assigned recipe, follow its KEEP/CHANGE/DON'T guidelines, and write an adapted component in `src/components/`. Wire all components into App.jsx.

**Produce:** Complete multi-file project that builds successfully

**Tools:** `scripts/scaffold.sh`, `scripts/download-fonts.sh`, `npm run build`

**Move on when:** `npm run build` succeeds with zero errors.

### Stage 5 — Verify

READ: `references/stage-5-verify.md`

Run `scripts/verify.sh`. Take Playwright screenshots at 390px, 768px, 1024px (if Playwright available). Run 9-dimension pass/fail check:

| Dimension | Pass Criteria |
|-----------|--------------|
| Visual Hierarchy | Type size jumps ≥2x, 3+ weight levels, weight alternation |
| Animation | No two adjacent sections same animation, ≥1 scroll-driven, no linear easing |
| Responsive | No overflow at 390px, grids collapse, touch targets ≥44px |
| Conversion | tel: count ≥6, CTA ≥56px height, trust before CTAs |
| Copy | 3+ hyper-specific details, no zombie phrases, labels have personality |
| Uniqueness | Fingerprint <50% similar to past same-niche builds |
| Performance | Bundle <500KB, images lazy-loaded, hero eager |
| Accessibility | Skip link, focus-visible, reduced-motion, alt text |
| Polish | 4+ atmosphere recipes, spacing varies, curtain + scrollbar |

Run AI Slop Gate (all 10 must pass):
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

**Produce:** Pass/fail per dimension + slop gate result

**Move on when:** 7+/9 dimensions pass AND slop gate passes. If <7/9, proceed to Stage 6.

### Stage 6 — Refine

READ: `references/stage-6-refine.md`

Identify failing dimensions. Apply the fix playbook (specific actions per dimension). Re-run Stage 5.

**Escalation rules (in order):**
1. Same dimension fails twice → escalate that dimension to user immediately
2. Hard ceiling: 3 total iterations
3. After 3 iterations still <7/9 → report all failing dimensions to user

### Stage 7 — Learn

READ: `references/stage-7-learn.md`

Save build record to `intelligence/builds.json`. Update recipe scores in `intelligence/recipe-scores.json`. Save fingerprint. If something failed, save to `intelligence/anti-patterns.json`.

Suggest to user: *"Build #{N} saved. Run `/oakwind-evolve` when ready to review patterns and improve the skill."*

---

## Conversion Design

### Phone Number Enforcement
Phone `tel:` link must appear in ALL of these locations (6 minimum):
1. Sticky header
2. Hero CTA
3. Mid-page CTA break
4. Contact/location section
5. Footer
6. Floating mobile CTA bar (fixed bottom, `md:hidden`)

Create a constant: `const PHONE_TEL = BRIEF.business.phoneTel` and use it everywhere.

### CTA Rules
- Primary: click-to-call `tel:` link, 56px+ height, bold accent background
- Secondary: scroll anchor to services or menu
- Trust signals must appear BEFORE every CTA, not after

### Scroll Story (default section order)
Hook (hero) → Proof (trust strip) → What (services) → Why (differentiator) → Evidence (reviews) → Action (contact)

Adapt per niche using the selected architecture template. The architecture overrides this default.

---

## iPad Demo Rules

- Touch targets: 44px minimum, phone buttons 56px+
- No hover-only states — everything works on tap
- First viewport: business name + what they do + rating. No scroll required.
- Body text: 16px minimum. Headlines: 36px+ mobile, 60px+ desktop.
- Sticky header: 56-72px, solid background, business name + phone number.
- Page weight: under 500KB JS bundle. Lazy-load below fold.

---

## OakWind Branding

Every mockup footer: `Website by OakWind Studio` linked to oakwindstudio.com. Subtle, muted, always clickable. The shared-lib `<OakWindFooter>` component handles this.

---

## Reference Files

Read these when the pipeline stage directs you to. They cost zero tokens until opened.

| File | When to read |
|------|-------------|
| `references/stage-1-research.md` | Stage 1 |
| `references/stage-2-design-system.md` | Stage 2 |
| `references/stage-3-compose.md` | Stage 3 |
| `references/stage-4-build.md` | Stage 4 |
| `references/stage-5-verify.md` | Stage 5 |
| `references/stage-6-refine.md` | Stage 6 |
| `references/stage-7-learn.md` | Stage 7 |
| `references/niches/{niche}.md` | Stage 1 — niche-specific content guidance |
| `references/niches/emotional-arcs.md` | Stage 3 — emotional arc mapping |
| `references/architectures/the-*.md` | Stage 3 — page structure template |
| `references/palettes/*.css` | Stage 2 — complete @theme token blocks |
| `references/font-pairings.md` | Stage 2 — 25 curated pairings by mood |
| `references/copy-craft.md` | Stage 1 — headline formulas, voice matching |
| `references/anti-convergence.md` | Stage 5 — slop gate, easing library, banned defaults |
| `references/gradient-patterns.md` | Stage 4 — 5 adaptive gradient formulas |
| `references/design-tokens/token-system.md` | Stage 2 — 3-layer token architecture |
| `references/design-tokens/type-scales.css` | Stage 2 — fluid typography scales |
| `references/oracle-mapping.js` | Stage 2 — oracle output → palette/font translation |
| `references/competitive-template.md` | Stage 1 — structured competitor analysis |
| `references/inspiration/{niche}.md` | Stage 2 — premium site reference URLs |
| `references/niche-fallback.md` | Stage 1 — unmapped niches → closest match |
| `references/error-recovery.md` | Stage 4 — common build failures + fixes |
| `references/performance-budgets.md` | Stage 5 — per-architecture limits |
| `recipes/_metadata.json` | Stage 3 — recipe index for filtering |
| `recipes/{category}/{name}.jsx` | Stage 4 — section blueprints to adapt |

---

## Deploy

```bash
npx wrangler pages deploy dist --project-name={slug}
```

## Post-Build QA

Run `/oakwind-verify` to automatically screenshot at 3 viewports and check for visual bugs, tel: links, console errors, and responsive issues.
