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

# OakWind Site Builder

Hand-crafted sales demo websites shown on an iPad in person. Every mockup must look like a $3K-$5K custom build — because that is what you are selling.

## Stack

React 18 · Tailwind CSS v4 · Vite · Cloudflare Pages · single-page scroll with anchors (no router unless the brief specifies routes).

Use `.jsx` file extensions. TypeScript (`.tsx`) has compatibility issues with Tailwind v4's Vite plugin on some platforms — stick with JSX for reliable builds.

---

## The Pipeline

Every build follows four stages sequentially. Do not skip stages.

### Stage 1 — Research

Gather real business data before writing any code. Sources in priority order:

1. **Mockup brief** (if provided) — contains verified data, reviews, copy, design direction. Trust it.
2. **MCP tools** (if configured) — Firecrawl for web scraping, Google Maps for place details.
3. **User-supplied info** — business name, address, phone, niche, services.
4. **Intelligent defaults** — generate realistic placeholder content appropriate to the niche.

Collect and organize: name, address, phone, hours, services (with prices if available), 3+ reviews with attribution, differentiators, certifications, owner/team names, years in business.

#### Brand Alignment

Look for signals of existing branding in the brief or business info — logo colors, social media presence, existing website, signage photos, brand voice. If the business already has a strong identity (specific colors, a recognizable logo style, an established aesthetic), build the site around their existing brand rather than imposing a new one. Use their colors as the palette foundation. Match their tone (casual vs. formal, playful vs. serious). The mockup should feel like a premium upgrade of what they already have, not a replacement.

If the business has no strong brand presence, you have creative freedom — build them an identity that fits their niche and makes them look more established than they are.

#### Image Strategy

Mockups shown on iPads MUST have images. A site without images feels like a wireframe, not a $3K+ custom build. Even stock/placeholder images make the prospect envision their business on the site.

Use this priority order:

1. **User-provided images** — if the brief includes image URLs or paths, use them.
2. **Unsplash via picsum** — use `https://picsum.photos/seed/{descriptive-keyword}/{width}/{height}` for reliable placeholder images. The `seed` parameter generates a consistent image for each keyword. Examples:
   - Hero: `https://picsum.photos/seed/restaurant-food/1600/900`
   - Agent headshot: `https://picsum.photos/seed/professional-woman/600/800`
   - Property: `https://picsum.photos/seed/luxury-home-1/800/600`
   - Neighborhood: `https://picsum.photos/seed/downtown-cityscape/800/500`
   Use different seed keywords for each image so they don't repeat. Always include `loading="lazy"` on below-fold images.
3. **Styled photo placeholders (last resort)** — if image services are unavailable, create beautiful placeholder cards with gradient backgrounds, an icon, and text like "Your Photo Here." Make these look intentional and designed — not like missing images. But always prefer real photos over placeholders for demos.

Every mockup should have images in: the hero section (or agent photo for personal brands), the services/listings section, and at least one other section (about, neighborhoods, gallery). A minimum of 4-6 images per site.

### Stage 2 — Design Vision & Selection

This is where the site earns its price tag. Two things happen here: you commit to a bold creative direction, then you back it up with the Style DNA system. Both matter — DNA without vision produces correct-but-boring output.

#### 2a. Detect the niche and read the reference file

| Niche | Reference file |
|-------|---------------|
| Restaurant, taco shop, BBQ, cafe, bakery, food truck, sushi | `references/niche-restaurant.md` |
| Auto repair, mechanic, tire shop, oil change | `references/niche-auto-repair.md` |
| Med spa, aesthetics, Botox, laser, wellness | `references/niche-med-spa.md` |
| Attorney, lawyer, law firm, legal | `references/niche-attorney.md` |
| Pressure washing, power washing, exterior cleaning | `references/niche-pressure-washing.md` |
| Auto detailing, ceramic coating, PPF | `references/niche-detailing.md` |
| Barber, barbershop, hair cuts | `references/niche-barber.md` |
| HVAC, plumber, electrician, roofing, landscaping, handyman | `references/niche-home-services.md` |
| Real estate agent, realtor, broker, property | `references/niche-realtor.md` |
| Home builder, custom homes, contractor, remodel | `references/niche-home-builder.md` |
| Dental, dentist, cosmetic dentistry, veneers, Invisalign | `references/niche-dental.md` |
| Law firm (3+ attorneys), boutique firm, PI firm | `references/niche-law-firm.md` |
| Wedding venue, event space, reception hall | `references/niche-wedding-venue.md` |

**No matching file?** Use the closest niche file as a starting point, then adapt: adjust the color palette to match the business's industry associations (e.g., green for eco-businesses, warm earth tones for artisan/craft), choose typography that reflects the brand personality (playful vs. authoritative vs. refined), and apply the trust signal hierarchy from the closest service category.

#### 2b. Determine the price tier

Read the context to classify the build:

| Tier | Signal | Art direction |
|------|--------|--------------|
| **Tier 1** ($125-175/mo, blue-collar) | Small budget, simple business, "just need something up" | Direct layout, CSS or light Motion, one premium technique max, one accent color, minimal deps |
| **Tier 2** ($1.5K-2.5K upfront, professionals) | Medium budget, established business, wants to look professional | Editorial spacing, Motion for hierarchy, 1-2 premium techniques, more typographic personality |
| **Tier 3** ($3.5K-5.5K upfront, brand-driven) | Premium budget, brand-conscious owner, wants to stand out | Distinctive hero architecture, 2-3 premium techniques, richer motion, layered surfaces. Still conversion-first |
| **Tier 4** ($6K-10K upfront, luxury/personal brand) | High-value niche (realtors, luxury med spa, high-end attorney), agent/owner IS the brand, competing on perceived quality | Read `references/premium-patterns.md` AND `references/micro-details.md`. Use Lenis smooth scroll, sticky scroll narrative, horizontal showcase, bento grids, orchestrated page load, parallax depth, split-screen hero. Apply 4-6 micro-details: text reveal animations, scroll progress bar, magnetic CTA button, image-on-hover for neighborhoods, parallax inside cards, cursor dot follower. The site should feel like a luxury brand experience — every scroll, hover, and transition is intentional. Photography integration is structural, not decorative |

Default to **Tier 2** if the brief doesn't indicate otherwise. These niches default to **Tier 3-4**: realtors, med spas/aesthetic clinics, boutique law firms, home builders, cosmetic dental practices, and wedding venues. The price tier shapes complexity and polish — not quality. Every tier should look hand-designed.

#### 2c. Select a Style DNA code

Read `references/style-dna-system.md`. Choose one option per dimension (8 total), respecting the niche constraints from the niche file. If previous builds exist for the same niche, ensure at least 4 of 8 dimensions differ.

#### 2d. Resolve design tokens

From the DNA code, determine:
- Color palette (6 CSS variables: bg-primary, bg-secondary, accent-1, accent-2, text-primary, text-secondary)
- Font pairing (display + body from Google Fonts)
- Border-radius approach (sharp / subtle / rounded / pill)
- The specific hero pattern, section layout, animation level, and nav style

#### 2e. Select a unique section pattern combination

Every site must feel structurally different from other OakWind builds. The biggest tell that sites come from the same tool is when they all use the same section patterns in the same order. To prevent this, choose ONE primary showcase pattern and ONE primary content pattern for each build — don't use them all.

**Primary showcase pattern (pick ONE per build):**
- Horizontal scroll carousel (best for: listings, treatments, services, gallery)
- Bento/masonry grid (best for: portfolio, team, neighborhoods, features)
- Zigzag alternating layout (best for: services, process, about sections)
- Full-width image breaks between content (best for: venues, builders, visual businesses)
- Tabbed/accordion content (best for: services, FAQ, treatment details)

**Primary narrative pattern (pick ONE per build):**
- Sticky scroll narrative with numbered steps (DO NOT use on every build — rotate)
- Timeline with connecting line (vertical on mobile, horizontal on desktop)
- Simple numbered cards in a grid (no sticky behavior)
- Accordion/expandable sections
- Icon + description list with stagger reveal

**Anti-sameness rules:**
- If the last build used sticky scroll narrative, this build MUST NOT
- If the last build used horizontal scroll for services, use bento grid or zigzag instead
- Never use numbered section labels (01, 02, 03) on more than 2 sections per site
- Vary hero style: not every site gets a split-screen hero. Alternate between full-screen image, gradient text-centric, split-screen, and left-aligned storytelling
- Vary CTA break style: full-width accent bar, split layout with form, image + text overlay, or simple centered text with generous whitespace

The combination of showcase + narrative + hero + CTA style creates the structural fingerprint of the site. Each build should have a unique fingerprint.

#### 2f. Commit to a signature vision

Before writing any code, answer these three questions:

1. **What's the one thing someone will remember about this site?** Not "it's a barbershop site" — something specific and visual. Examples: "the barber-stripe divider that runs across section breaks," "the oversized gold quote marks behind testimonials," "the gradient that shifts from warm chile red to deep chocolate as you scroll." Every site needs one unforgettable detail.

2. **What mood does walking into this business feel like?** A taqueria feels festive, warm, aromatic. A law firm feels heavy, serious, expensive. An auto detailer feels dark, precise, obsessive. The CSS must create that atmosphere — through textures, gradients, color weight, spacing rhythm, and motion.

3. **What would make this look hand-designed rather than template-generated?** Identify 2-3 specific details that a $50/month template would never have. Examples: custom scrollbar matched to brand colors, a noise texture that adds organic warmth, a shimmer effect on the CTA button, decorative corner accents on the review cards, a gradient mesh hero instead of a flat color.

Write your answers as a brief comment at the top of App.jsx alongside the DNA code. This anchors every design decision that follows.

#### 2g. Anti-convergence check

Read `references/anti-convergence.md`. Verify the selections don't fall into AI-default patterns. If they do, rotate dimensions until at least 2 differ from the AI Default DNA.

### Stage 3 — Build

#### 3a. Scaffold the project

Run the scaffold script to create the Vite + React + Tailwind project:

```bash
bash <skill-path>/scripts/scaffold.sh <project-slug>
```

This creates the project with Tailwind v4 configured, CSS custom properties ready for your design tokens, and `motion` + `lucide-react` pre-installed.

#### 3b. Install Google Fonts

Add the font `<link>` tag to `index.html` inside `<head>`. Use the Google Fonts API with display=swap:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DISPLAY_FONT:wght@400;700&family=BODY_FONT:wght@400;600&display=swap" rel="stylesheet">
```

Replace `DISPLAY_FONT` and `BODY_FONT` with the selected fonts from Stage 2d. This step is critical — without it, fonts fall back to system defaults and the site loses its visual identity.

#### 3c. Apply design tokens and build atmosphere

Update the CSS custom properties in `src/index.css` with the resolved values from Stage 2d. But don't stop at tokens — **read `references/atmosphere-recipes.md`** and add at minimum 4 CSS atmosphere recipes to index.css. These recipes (noise textures, shimmer effects, gradient meshes, pattern overlays, custom scrollbar, stagger animations) are what transform a flat token-driven page into something that feels hand-crafted. Pick recipes that match your signature vision from Step 2e.

The index.css file should contain: design tokens, Tailwind theme extensions, atmosphere recipe CSS classes, keyframe animations, and the custom scrollbar. A good index.css for an OakWind build is 80-160 lines — not 20.

#### Styling approach: Tailwind utilities + CSS variables

Use standard Tailwind utility classes for layout, spacing, responsive, and common styles (`flex`, `grid`, `gap-8`, `px-6`, `md:grid-cols-2`, `min-h-screen`, `text-sm`, `font-semibold`, etc.). For brand-specific colors and fonts, use CSS custom properties via `style={{ }}` or Tailwind's arbitrary value syntax (`bg-[var(--color-accent)]`, `text-[var(--color-text)]`). This hybrid approach works reliably across all environments.

Define colors as CSS variables in `:root` in index.css, then reference them in JSX. This avoids Tailwind v4 scanner issues on some platforms while keeping responsive and layout utilities working properly.

#### 3d. Build components

Read `references/component-patterns.md` for section patterns that match the selected DNA. Generate these React components populated with real business data:

| Component | Requirements |
|-----------|-------------|
| Header | Logo text, nav links, phone CTA (sticky, 56-64px, solid bg) |
| Hero | Selected hero pattern, headline, subtext, CTA, trust strip |
| Services | 4-8 services with icons or images |
| About | Business story, team/owner photo placeholder, years in business |
| Reviews | 3-5 testimonials with names and star ratings |
| Hours & Location | Address, map link, hours table |
| Contact | Phone, email, form placeholder or booking link |
| Footer | Links, address, social icons, copyright, "Website by OakWind Studio" |
| Floating Mobile CTA | Fixed to bottom on mobile (`fixed bottom-0 left-0 right-0 z-50 md:hidden`), appears after scrolling past hero. Contains phone `tel:` link with accent background, 56px+ height |
| Mid-Page CTA Break | Full-width accent-colored section between services and reviews with phone `tel:` link — a visual break that converts |

**Phone number enforcement:** Create a constant at the top of the file (`const PHONE_TEL = 'tel:+1XXXXXXXXXX'`) and use it in ALL of these components: Header, Hero, Mid-Page CTA Break, Contact/Location, Footer, and Floating Mobile CTA. Count your `tel:` usages before finishing — if fewer than 6, add more.

#### 3e. Craft the details that justify the price tag

This is not optional polish — it's what makes the difference between a site that closes a deal and one that gets a "looks nice" and nothing else. Apply techniques from each category:

**Typography (apply all):** optical letter-spacing (-0.02em headlines, +0.08em uppercase labels) · 4+ distinct hierarchy levels · decorative section labels with accent lines or geometric markers · oversized decorative quote marks behind testimonials (see `references/atmosphere-recipes.md`).

**Design taste (what NOT to do):** Avoid gimmicky decorative elements that scream "template" — no diamond shapes, rotated squares, decorative dots between sections, or geometric dividers. Luxury is restraint. Use generous whitespace, gradient fades, or numbered section labels instead. If a design element would look at home in a free WordPress theme, don't use it. Study what Apple, Aesop, Sotheby's, and Four Seasons do — they use space, typography, and photography, not ornaments.

**Atmosphere (apply 4+ recipes from atmosphere-recipes.md):** noise texture, shimmer hover effects, gradient mesh heroes, pattern overlays, custom scrollbar, glass cards, section gradient transitions — these create the feeling of being in a designed space. A flat background with Tailwind utility classes is not atmosphere. See the mood table in atmosphere-recipes.md to pick the right combination for the niche.

**Layout:** intentional asymmetry (55/45 splits, not 50/50) · one element breaking the grid per page · varying max-width per section (not every section at 1200px) · generous hero padding (min-h-screen or min-h-[80vh]).

**Motion (use Motion library):** staggered scroll reveals with `whileInView` · count-up numbers on trust strip stats · button hover translateY(-2px) + shadow lift · card hover lift 4-6px. Budget: 1 hero entrance sequence + 1 scroll reveal sequence + 2-3 hover interactions. Everything else: CSS transitions.

**Conversion micro-details:** phone CTA buttons must be visually dominant (bold background color, 56px+ height, impossible to miss) · add a floating mobile CTA bar that appears after scrolling past the hero · reviews should feel real (include dates, specific service mentions, first name + last initial).

#### Approved Libraries

**Core (always install):** `motion` (import from `motion/react`), `lucide-react`, `lenis`.

**Gallery & Carousel:**
- `swiper` — coverflow 3D, parallax slides, thumbs navigation. Import from `swiper/react` and `swiper/modules`.
- `yet-another-react-lightbox` — fullscreen photo viewer with zoom, swipe, counter. Import CSS: `import 'yet-another-react-lightbox/styles.css'`.

**Scroll & Animation:**
- `gsap` + `@gsap/react` — scroll-driven horizontal sections (pin + scrub), pinned slideshows, parallax tied to scroll position. Use `useGSAP` hook and register `ScrollTrigger`.

**Card Interactions:**
- `atropos` — 3D tilt/parallax hover on cards. Image and text layers at different depths create parallax-within-card. Import from `atropos/react`, import `atropos/css`. Use `data-atropos-offset` for depth layers.

**DOM Transitions:**
- `@formkit/auto-animate` — one-line animation for any DOM change. Filtering, sorting, accordion, form field changes all animate automatically. `const [ref] = useAutoAnimate()` on the parent — that's it.

**Hand-Drawn Accents:**
- `rough-notation` — hand-drawn circles, underlines, highlights, brackets on key text. Use `annotate()` + IntersectionObserver to trigger on scroll. Use `annotationGroup()` for sequential drawing.

**Celebration Effects:**
- `canvas-confetti` — particle bursts on form submit, counter completion, CTA hover sparkles. Use sparingly — one moment per site maximum.

**3D Elements (Tier 4 only):**
- `@react-three/fiber` + `@react-three/drei` + `three` — subtle floating 3D shapes behind hero text, scroll-reactive 3D icons. Keep it accent-level, never centerpiece. Heavy bundle — only use when justified.

**Text Effects (no library — build from scratch):**
- Typewriter: custom `useTypewriter` hook, character by character with blinking cursor
- Scramble/decode: custom `useScramble` hook, random chars settling into real text
- Character cascade: split text into `motion.span` per character with stagger
- Color fill on scroll: `useScroll` + `useTransform` to progressively color characters
- Wave: CSS keyframe with staggered `animation-delay` per character
- Hover spotlight: track mouse distance to each character, blur/unblur within radius

**Niche-to-library mapping (which libraries to install per niche):**

| Niche | Install these | Signature effect |
|-------|--------------|-----------------|
| **Wedding Venue** | swiper, yet-another-react-lightbox, canvas-confetti, rough-notation | Swiper coverflow gallery, lightbox for detail viewing, confetti on inquiry submit, hand-drawn circle on "Best of Weddings" |
| **Home Builder** | gsap + @gsap/react, atropos, yet-another-react-lightbox | GSAP horizontal scroll portfolio, Atropos tilt on project cards, lightbox for room details |
| **Dental** | yet-another-react-lightbox, rough-notation, @formkit/auto-animate | Lightbox smile gallery with category filters, rough underline on credentials, AutoAnimate on treatment filter |
| **Boutique Law Firm** | rough-notation, canvas-confetti | Typewriter hero (custom), scramble on "$125M+" stat, rough circle on "Board Certified", subtle confetti on counter completion |
| **Med Spa** | swiper, atropos, rough-notation | Swiper parallax treatment showcase, Atropos tilt on treatment cards, rough highlight on "Allergan Diamond Provider" |
| **Realtor** | swiper, atropos, rough-notation | Swiper thumbs for listings, Atropos tilt on property cards, rough underline on "$52M+" |
| **Barber** | swiper, @formkit/auto-animate | Swiper thumbs for cuts gallery, AutoAnimate on service filter |
| **Detailing** | swiper, yet-another-react-lightbox | Swiper before/after parallax, lightbox for detail shots |
| **Restaurant** | swiper, @formkit/auto-animate | Swiper for food photos, AutoAnimate on menu category tabs |
| **Auto Repair** | @formkit/auto-animate, rough-notation | AutoAnimate on service filter, rough circle on "ASE Certified" |
| **Pressure Washing** | swiper | Swiper before/after slider |
| **Home Services** | @formkit/auto-animate | AutoAnimate on service category filter |

Read `references/library-recipes.md` for copy-paste implementation code for each library.

Do not use: hover.dev, SyntaxUI, any paid/pro component packs.

### Stage 4 — Verify

Run the verification script:

```bash
bash <skill-path>/scripts/verify.sh <project-dir>
```

This checks: build success, ESLint, OakWind footer, click-to-call links, smooth scroll, and bundle size.

Then manually verify these items the script can't check:

**Data accuracy:**
- [ ] Business name, address, and phone are correct and match the brief
- [ ] Phone number appears as `tel:` link in 6+ locations (header, hero, mid-page CTA, contact, footer, floating mobile bar)
- [ ] Google Fonts are loading (check the `<link>` tag in index.html)

**Hero quality (most important visual check):**
- [ ] Hero has 3+ background layers (base color + ambient glows + texture)
- [ ] Headline is oversized (text-7xl+ on desktop) with color variation
- [ ] Elements stagger in with choreographed animation delays
- [ ] Trust indicators (stars, reviews, years) are visible in the hero viewport
- [ ] Scroll indicator is present at the bottom of the hero

**Responsive design (test at these widths):**
- [ ] 390px (iPhone) — all content readable, no horizontal overflow, phone CTA dominant
- [ ] 768px (iPad portrait) — this is the primary demo device. Layout must look polished
- [ ] 1024px (iPad landscape / desktop) — full layout, no awkward spacing
- [ ] Cards and grid items are aligned properly — same heights in rows, consistent gutters
- [ ] No text overflow, truncation, or orphaned words in headlines

**Design quality:**
- [ ] At least one section breaks the default centered SaaS pattern
- [ ] Style DNA code and signature vision documented in a comment at the top of App.jsx
- [ ] Site looks like it cost $3K+ and could NOT be made in 5 minutes on Wix
- [ ] CSS includes 4+ atmosphere recipes (noise, shimmer, scrollbar, etc.)

Deploy command: `npx wrangler pages deploy dist --project-name={slug}`

**Post-build QA:** After building, run the `oakwind-verify` skill to automatically screenshot the site at 3 viewports, check for visual bugs, tel: link count, console errors, and responsive issues. Say "verify the site on localhost:PORT" to trigger it.

---

## Conversion Design

### Trust Signal Hierarchy (first viewport, every time)
1. Star rating + review count
2. Years in business
3. Owner's name
4. Certifications (BBB, licensed/insured, ASE, board-certified)
5. Real customer quotes (minimum 3 per mockup)
6. Service area specificity

### CTA Rules
- Primary: click-to-call `tel:` link, minimum 56px height, bold accent background color.
- Secondary: scroll anchor to services or menu.
- Tertiary: quote form or booking link.
- **Phone number must appear as a `tel:` link in ALL of these locations:** header (sticky), hero section, a mid-page CTA break between sections, contact/location section, footer, and a floating mobile CTA bar (fixed to bottom on small screens, appears after scrolling past hero). That's 6 minimum placements. This is non-negotiable — it's how local businesses get calls.

### Scroll Story (default section order)
Hook (hero) → Proof (trust strip) → What (services) → Why (differentiator) → Evidence (reviews) → Action (contact).

Adapt per niche: restaurants lead with food, detailers with transformations, attorneys with practice areas, med spas with results. The brief's section structure overrides this default.

---

## Mobile-First Design (non-negotiable)

Over 50% of all website traffic is mobile. Every site must be built mobile-first and look polished at every breakpoint. This is not optional polish — a site that looks great on desktop but breaks on mobile is a failed build.

**Development approach:**
- Write mobile styles first, then layer desktop overrides with `md:` and `lg:` prefixes
- Test mentally at 390px (iPhone), 768px (iPad portrait), and 1024px (iPad landscape / desktop) while coding every section
- Every grid should collapse gracefully: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Horizontal scroll sections must be swipe-friendly on mobile with `overflow-x-auto snap-x`
- Text sizes: minimum 16px body, 36px+ headlines on mobile
- No horizontal overflow — add `overflow-x: hidden` on body
- Sticky scroll sections should unstick on mobile (use `md:sticky` not `sticky`)

**Mobile-specific patterns:**
- Hamburger menu with full-screen overlay (not a dropdown)
- Floating mobile CTA bar fixed to bottom
- Single-column layouts below `md:` breakpoint
- Touch targets 44px+ minimum on all interactive elements
- Form inputs 48px+ height for comfortable thumb tapping
- Images with `aspect-ratio` to prevent layout shift while loading

## iPad Demo Rules

- Touch targets: 44px minimum, phone buttons 56px+.
- No hover-only states. Everything works on tap.
- First viewport: business name + what they do + rating. No scroll required.
- Body text: 16px minimum. Headlines: 36px+ on mobile.
- Sticky header: 56-64px, solid background, business name + phone number.
- Smooth scroll: `scroll-behavior: smooth` on html (or Lenis if explicitly chosen).
- Page weight: under 500KB. Lazy-load below fold. No unnecessary packages.

---

## OakWind Branding

Every mockup footer: `Website by OakWind Studio` linked to oakwindstudio.com. Subtle, muted, always clickable.

If the repo exposes `oak-*`, `charcoal-*`, `gold-*`, `cream-*` tokens, preserve them. Prospect-facing typography still rotates per niche.

---

## Reference Files

Read these when the build needs deeper direction. They cost zero tokens until opened.

| File | When to read |
|------|-------------|
| `references/style-dna-system.md` | **Every build** — select the 8-dimension DNA code |
| `references/anti-convergence.md` | **Every build** — verify selections aren't AI-default |
| `references/atmosphere-recipes.md` | **Every build** — pick 4+ CSS recipes for texture, motion, and atmosphere |
| `references/component-patterns.md` | When selecting section components and animations |
| `references/premium-patterns.md` | **Tier 3-4 builds** — sticky scroll, horizontal showcase, bento grids, parallax, Lenis |
| `references/micro-details.md` | **Tier 3-4 builds** — text reveals, magnetic buttons, cursor dot, parallax cards, image-on-hover |
| `references/library-recipes.md` | Copy-paste code for Swiper, GSAP, lightbox, and text effect implementations |
| `references/niche-realtor.md` | Real estate agents, realtors, brokerages |
| `references/niche-home-builder.md` | Home builders, custom home contractors, remodelers |
| `references/niche-dental.md` | Dental practices, cosmetic dentistry, orthodontics |
| `references/niche-law-firm.md` | Boutique law firms (3-15 attorneys), PI firms, family law firms |
| `references/niche-wedding-venue.md` | Wedding venues, event spaces, reception halls |
| `references/niche-restaurant.md` | Restaurants, taco shops, BBQ, cafes, bakeries, food trucks, sushi |
| `references/niche-auto-repair.md` | Auto repair, mechanics, tire shops |
| `references/niche-med-spa.md` | Med spas, aesthetics, wellness clinics |
| `references/niche-attorney.md` | Attorneys, law firms, legal services |
| `references/niche-pressure-washing.md` | Pressure washing, exterior cleaning |
| `references/niche-detailing.md` | Auto detailing, ceramic coating, PPF |
| `references/niche-barber.md` | Barbershops, hair salons, grooming |
| `references/niche-home-services.md` | HVAC, plumbing, roofing, landscaping, electrician, handyman |
