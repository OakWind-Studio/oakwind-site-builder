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

#### Business Personality Profile

Every business has a personality, and the website should reflect it — not impose a generic "professional" look on everyone. During research, assess these four personality axes and write your assessment as a comment at the top of App.jsx alongside the DNA code. This profile drives design decisions throughout the build and is the primary mechanism that keeps 10 restaurant sites from looking the same.

| Axis | Spectrum | What to look for |
|------|----------|-----------------|
| **Energy** | Calm ←→ Energetic | Quiet, boutique feel vs. loud, bustling, high-volume. A fine-dining restaurant is calm; a taqueria is energetic. |
| **Formality** | Casual ←→ Formal | "Hey y'all" vs. "We welcome you." A barbershop is casual; a law firm is formal. Look at how they write on social media, their signage, their existing site copy. |
| **Boldness** | Subtle ←→ Bold | Understated and refined vs. in-your-face and confident. A med spa is subtle; a pressure washing company is bold. |
| **Era** | Traditional ←→ Modern | Old-school values vs. cutting-edge tech-forward. A family auto repair is traditional; a ceramic coating studio is modern. |

**How personality maps to design:**

| Personality trait | Design expression |
|-------------------|-------------------|
| Calm + Formal | Generous whitespace, serif type, muted palette, slow animations, editorial feel |
| Calm + Casual | Warm colors, rounded shapes, handwritten accents, inviting imagery |
| Energetic + Formal | Sharp contrasts, strong grid, dynamic motion, confident type, premium materials |
| Energetic + Casual | Bright colors, bold type, playful motion, candid photos, punchy copy |
| Subtle | Minimal motion, restrained palette (2-3 colors), elegant transitions |
| Bold | High contrast, oversized headlines, dramatic hero, strong CTA colors, more motion |
| Traditional | Warm earth tones, serif type, classic layouts, trust-focused |
| Modern | Cool palette, clean sans-serif, asymmetric layouts, tech-forward imagery |

Two taco shops: one is a family-owned spot that's been there 30 years (Calm + Casual + Traditional) — warm browns, hand-drawn accents, family photos, vintage feel. The other is a trendy street taco bar with craft cocktails (Energetic + Bold + Modern) — dark mode, neon accent, bold condensed type, moody food photography. Same niche, completely different sites.

#### Brand Alignment

Look for signals of existing branding in the brief or business info — logo colors, social media presence, existing website, signage photos, brand voice. If the business already has a strong identity (specific colors, a recognizable logo style, an established aesthetic), build the site around their existing brand rather than imposing a new one. Use their colors as the palette foundation. Match their tone (casual vs. formal, playful vs. serious). The mockup should feel like a premium upgrade of what they already have, not a replacement.

If the business has no strong brand presence, you have creative freedom — build them an identity that fits their niche and makes them look more established than they are.

#### Image Strategy

Mockups shown on iPads MUST have images. A site without images feels like a wireframe, not a $3K+ custom build. The images must be relevant to the actual business and niche — a dental practice with stock photos of mountains or random landscapes looks worse than no images at all. Every image should make the prospect say "that looks like my business."

**Image Discovery Pipeline (follow in order — use the cheapest tool that works):**

**Step 1 — Find the business online (WebSearch, free).**
Before touching any code, run WebSearch queries to locate the business's web presence:
- `"{business name}" {city} {state}` — find their website, Yelp, Google Business Profile
- `"{business name}" {city} site:facebook.com` — find their Facebook page
- `"{business name}" {city} site:instagram.com` — find their Instagram
- `"{business name}" {city} site:yelp.com` — Yelp often has customer-uploaded photos

Collect URLs for: their main website, Facebook page, Instagram profile, Yelp listing, and Google Business Profile. These are your image sources.

**Step 2 — Verify it's the same business.**
Before using any images from a found website or social profile, cross-reference at least 2 of these identifiers against what the user provided:
- Business name (exact or close match)
- City/address
- Phone number
- Owner name
- Services offered

If you can't confirm at least 2 identifiers match, don't use those images — it might be a different business with a similar name.

**Step 3 — Scrape images with WebFetch (free, no page limits).**
Use WebFetch to grab the business's existing website pages. Check these pages in order (most likely to have good images):
- Homepage
- About / Our Team page
- Gallery / Portfolio / Our Work page
- Services page
- Google Business Profile photos (often accessible via the GBP URL)
- Yelp business photos page
- Facebook page (cover photo and recent posts with images)

For each image found, assess:
- Is it a proper rectangular photo or a circular/cropped headshot?
- What aspect ratio is it? (landscape, portrait, square)
- Is it high enough quality for the target placement? (at least 600px wide)
- Does it have baked-in text overlays that limit reuse?
- What does it depict? (team photo, storefront, work sample, food, interior, etc.)
- Where could it be used in the mockup? (hero, about section, gallery, service card)

**Step 4 — Use Firecrawl ONLY when WebFetch can't parse the site.**
Some websites are JavaScript-heavy SPAs that return empty content to WebFetch. If WebFetch returns no images or broken HTML from a site that clearly has photos (you can tell from the search results), THEN use Firecrawl to crawl that specific page. Limit Firecrawl to 1-3 pages per build maximum — every page costs against the free tier.

**Step 5 — Use real business photos that fit the placement.**
Only use images from the source site that match the target dimensions. NEVER use a circular-cropped headshot in a rectangular image slot — it will look broken. NEVER stretch or force an image into an aspect ratio it wasn't designed for. A landscape blog photo belongs in a landscape slot, a portrait headshot belongs in a portrait slot.

**Step 6 — Use brief-provided image URLs** — if the brief includes image URLs, verify each one before using it. Check if it's circular, has text overlays, or is too low-resolution. Don't blindly trust URLs from the brief.

**Step 7 — Search for niche-relevant stock photos (for gaps only).**
If you still have image gaps after Steps 1-6, search for actual niche-relevant stock photos — NOT random picsum. Use WebSearch to find real, relevant images:

| Niche | Search queries to find stock images |
|-------|-------------------------------------|
| Dental | `"unsplash.com" dental office modern`, `"pexels.com" dentist smile patient` |
| Restaurant | `"unsplash.com" restaurant interior food plating`, `"pexels.com" chef cooking kitchen` |
| Auto Repair | `"unsplash.com" auto mechanic garage`, `"pexels.com" car repair shop` |
| Med Spa | `"unsplash.com" spa treatment room`, `"pexels.com" aesthetic clinic facial` |
| Attorney | `"unsplash.com" law office conference room`, `"pexels.com" lawyer professional` |
| Barber | `"unsplash.com" barbershop haircut`, `"pexels.com" barber chair shop` |
| Detailing | `"unsplash.com" car detailing ceramic coating`, `"pexels.com" car wash detail` |
| Pressure Washing | `"unsplash.com" pressure washing house`, `"pexels.com" power washing driveway` |
| Realtor | `"unsplash.com" luxury home interior`, `"pexels.com" real estate house exterior` |
| Home Builder | `"unsplash.com" custom home construction`, `"pexels.com" new house build` |
| Wedding Venue | `"unsplash.com" wedding venue reception`, `"pexels.com" wedding ballroom elegant` |
| Home Services | `"unsplash.com" hvac technician`, `"pexels.com" plumber electrician working` |

Grab the actual image URLs from Unsplash or Pexels results. These are free to use and will show images that actually match the niche. Use different images for each placement — don't reuse the same photo.

**Step 8 — Styled photo placeholders (absolute last resort).**
If image services are completely unavailable, create beautiful placeholder cards with gradient backgrounds matching the site's palette, a Lucide icon relevant to the niche, and text like "Your Photo Here." These should look intentional and designed, not broken.

**Image quality rules:**
- NEVER use a circular-cropped image in a rectangular container. The transparent corners will show and it looks broken.
- NEVER use a landscape image forced into a portrait slot or vice versa.
- NEVER use a generic stock photo that doesn't match the niche. A photo of trees on a dental site is worse than a styled placeholder.
- Prefer fewer high-quality real images over many irrelevant placeholders. Three real photos of the actual business > six stock photos of unrelated content.
- Blog feature images often have text baked in — only use them if the text is small/unobtrusive or can be covered by a gradient overlay.
- Gallery photos, team photos, and professional headshots from a business's website are almost always usable.
- When in doubt, search for niche-relevant stock over using a bad real image. A clean, niche-appropriate stock photo is better than a grainy, circular, or wrong-dimension photo.

**Image placement requirements:**
Every mockup should have images in: the hero section (or agent photo for personal brands), the services/listings section, and at least one other section (about, neighborhoods, gallery). A minimum of 4-6 images per site, and every single image must be visually relevant to the business's niche.

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

Read `references/color-palettes.md` and select a curated palette that matches the Business Personality Profile. Using a tested palette instead of picking individual hex values is the single biggest quality lever — it guarantees color harmony, readable contrast ratios, and cohesive atmosphere. If the business has strong existing brand colors, use their colors as accent-1 and build the rest of the palette around them using the closest curated palette as a starting point.

Read `references/font-pairings.md` and select a curated font pairing that matches the Business Personality Profile mood. If the previous build in the same niche used the same font pairing, pick a different one from the same mood category. The display font is the personality — it must feel right for the business at 80pt on an iPad.

From the DNA code + selected palette + selected font pairing, determine:
- Color palette (6 CSS variables: bg-primary, bg-secondary, accent-1, accent-2, text-primary, text-secondary) — use exact hex values from `references/color-palettes.md`
- Font pairing (display + body) — use exact values from `references/font-pairings.md`, including the Google Fonts `<link>` tag
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

#### 2e-bis. Same-niche differentiation system

OakWind serves local businesses — which means you might build 10 restaurant sites, 8 dental sites, or 5 barber sites. If all the restaurant sites look the same with different logos, clients will notice (and competitors will too). This section is specifically about making same-niche builds feel genuinely different.

**The personality profile (from Stage 1) is the primary driver of differentiation.** Two dental practices in the same city: one is a family practice run by a husband-and-wife team who post goofy TikToks (Energetic + Casual + Modern) and the other is a cosmetic specialist with 30 years of experience who does high-end veneer work (Calm + Formal + Subtle). These businesses should produce fundamentally different sites — different color families, different typography, different hero patterns, different motion levels, different section structures.

**Same-niche rotation checklist (verify before building):**

| Element | Rule |
|---------|------|
| Color family | If the last restaurant was warm/earth tones, this one gets cool/dark or bright/vibrant. Never two same-niche builds in a row with the same color family. |
| Hero type | Rotate through: full-screen image, split-screen, text-centric, gradient animated, left-aligned storytelling. No repeats within 3 same-niche builds. |
| Typography mood | Rotate between: elegant serif, bold condensed, warm rounded, modern geometric, editorial mixed. |
| Section order | Rearrange section order based on what matters most for THIS specific business. A BBQ joint leads with food photos; a fine dining restaurant leads with atmosphere and chef credentials. |
| Showcase pattern | If the last same-niche build used horizontal scroll, this one uses bento grid or zigzag. |
| Signature detail | The one memorable visual detail (from 2f) must be completely different per build. No two same-niche sites get the same signature element. |
| Library choices | Rotate which special libraries to feature. If the last restaurant used Swiper heavily, this one leans on GSAP or rough-notation or auto-animate instead. |

**The "studio consistency" question:** All OakWind sites should share certain quality markers that signal they came from a good studio: generous whitespace, strong typography hierarchy, smooth scroll behavior, professional-grade motion, mobile-first responsive design, and conversion-focused CTAs. These are the studio's signature. What changes between builds is the *personality* — the colors, the structure, the mood, the motion style, the section patterns. Think of it like an architecture firm that builds both modern minimalist homes and rustic farmhouses — the craftsmanship is consistent, the aesthetic is not.

#### 2f. Commit to a signature vision

Before writing any code, answer these three questions:

1. **What's the one thing someone will remember about this site?** Not "it's a barbershop site" — something specific and visual. Examples: "the barber-stripe divider that runs across section breaks," "the oversized gold quote marks behind testimonials," "the gradient that shifts from warm chile red to deep chocolate as you scroll." Every site needs one unforgettable detail.

2. **What mood does walking into this business feel like?** A taqueria feels festive, warm, aromatic. A law firm feels heavy, serious, expensive. An auto detailer feels dark, precise, obsessive. The CSS must create that atmosphere — through textures, gradients, color weight, spacing rhythm, and motion.

3. **What would make this look hand-designed rather than template-generated?** Identify 2-3 specific details that a $50/month template would never have. Examples: custom scrollbar matched to brand colors, a noise texture that adds organic warmth, a shimmer effect on the CTA button, decorative corner accents on the review cards, a gradient mesh hero instead of a flat color.

Write your answers as a brief comment at the top of App.jsx alongside the DNA code. This anchors every design decision that follows.

#### 2g. Anti-convergence check

Read `references/anti-convergence.md`. Verify the selections don't fall into AI-default patterns. If they do, rotate dimensions until at least 2 differ from the AI Default DNA.

#### 2h. Write the copy before touching code

Read `references/copy-craft.md`. Write all copy — hero headline, hero subtitle, section labels, service descriptions, CTA button text, and about section narrative — BEFORE opening App.jsx. Copy written during coding tends to be generic filler. Copy written as a deliberate creative step sounds like a human wrote it for this specific business.

**Pre-build copy checklist (write all of these first):**
- Hero headline (7 words max, uses a formula from copy-craft.md)
- Hero subtitle (one sentence, includes a specific proof point)
- 6 section labels (not "Our Services" — something with personality)
- Service descriptions (2 sentences each: what you GET + what's DIFFERENT)
- CTA button text (action-specific, not "Contact Us")
- About section narrative (origin + philosophy + proof, 3 paragraphs)
- 3-5 review quotes (selected for specificity and voice, not generic praise)

Write these as constants at the top of App.jsx alongside the business data. The copy quality is what makes a business owner look at the iPad and say "that's exactly what I'd want it to say."

#### 2i. Plan iPad demo "wow moments"

The site will be shown on an iPad in a face-to-face sales meeting. Engineer 3 specific moments where the prospect will visibly react during the scroll:

1. **The hero reveal** (0-3 seconds) — the first viewport must make them say "whoa." Orchestrated entrance animation, oversized typography, trust indicators visible without scrolling. This is the money shot.

2. **The scroll surprise** (30-50% scroll) — one section that does something unexpected: a horizontal scroll showcase, a sticky scroll narrative, a before/after slider, or a parallax depth effect. Something they haven't seen on competitor websites.

3. **The personal touch** (60-80% scroll) — their reviews displayed beautifully with real names and specific services, their address with a "Get Directions" link, their phone number as a prominent CTA. This is where they see their identity reflected in the design and start to emotionally commit.

Write these three moments as a comment in App.jsx alongside the DNA code and signature vision. Then build toward them intentionally.

### Stage 3 — Build

#### 3a. Scaffold the project

Run the scaffold script to create the Vite + React + Tailwind project:

```bash
bash <skill-path>/scripts/scaffold.sh <project-slug>
```

This creates the project with Tailwind v4 configured, CSS custom properties ready for your design tokens, and `motion` + `lucide-react` pre-installed.

#### 3b. Polish the HTML head

The `index.html` `<head>` is what shows in the browser tab and social previews. Make it professional:

```html
<title>{Business Name} | {City, ST}</title>
<meta name="description" content="{One-line pitch — what they do + where}">
<meta property="og:title" content="{Business Name}">
<meta property="og:description" content="{Same pitch line}">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>{EMOJI}</text></svg>">
```

Pick an emoji favicon that matches the niche: `🦷` dental, `🌮` taco, `🚗` detailing, `💈` barber, `⚖️` attorney, `🏡` realtor, `🏠` home builder, `💉` med spa, `🌿` landscaping, `🔧` auto repair, `💒` wedding venue. It's one line but the browser tab looks instantly professional instead of showing the Vite default.

Add the Google Fonts `<link>` tag using the exact URL from `references/font-pairings.md`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{GOOGLE_FONTS_URL_FROM_FONT_PAIRINGS_MD}" rel="stylesheet">
```

#### 3b-bis. Add a page entrance curtain

When the prospect opens the URL on the iPad, the site should reveal itself elegantly — not pop in all at once. Add a simple CSS-only page entrance that fades out after 0.6s:

```css
/* Page entrance curtain */
.page-curtain {
  position: fixed;
  inset: 0;
  background: var(--color-bg-primary);
  z-index: 9999;
  pointer-events: none;
  animation: curtainLift 0.6s ease-out 0.2s forwards;
}
@keyframes curtainLift {
  to { opacity: 0; visibility: hidden; }
}
```

```jsx
{/* First element inside App */}
<div className="page-curtain" />
```

This creates a smooth "curtain lift" — the page loads behind a solid color, then the curtain fades away to reveal the content. Combined with the hero's orchestrated stagger animation, this creates a theatrical first impression. The 0.2s delay ensures fonts and images have a moment to load before the reveal.

#### 3c. Apply design tokens, build atmosphere, and set spacing rhythm

Update the CSS custom properties in `src/index.css` with the resolved values from Stage 2d. But don't stop at tokens — **read `references/atmosphere-recipes.md`** and add at minimum 4 CSS atmosphere recipes to index.css. These recipes (noise textures, shimmer effects, gradient meshes, pattern overlays, custom scrollbar, stagger animations) are what transform a flat token-driven page into something that feels hand-crafted. Pick recipes that match your signature vision from Step 2e.

**Read `references/image-presentation.md`** for premium image treatment techniques — gradient overlays, floating frames, reveal-on-scroll, blur-up loading, and before/after comparisons. Every image container should use at least one technique from this file. Raw `<img>` tags in bare `<div>`s look template-generated.

**Spacing rhythm system (non-negotiable):** Premium sites have intentional, escalating section padding — not uniform `py-16` on every section. Use this escalating scale:

```css
/* Section spacing scale — escalates for breathing room */
.section-tight   { padding-top: 4rem; padding-bottom: 4rem; }     /* 64px — trust strips, CTA bars */
.section-default  { padding-top: 5rem; padding-bottom: 5rem; }     /* 80px — services, reviews */
.section-generous { padding-top: 7rem; padding-bottom: 7rem; }     /* 112px — about, featured sections */
.section-hero     { padding-top: 8rem; padding-bottom: 8rem; }     /* 128px — hero, final CTA */
@media (min-width: 768px) {
  .section-default  { padding-top: 6rem; padding-bottom: 6rem; }
  .section-generous { padding-top: 9rem; padding-bottom: 9rem; }
  .section-hero     { padding-top: 0; padding-bottom: 0; min-height: 100vh; }
}
```

Vary the padding per section. The alternating rhythm of tight → generous → default → generous creates visual breathing that feels designed, not generated. Never use the same padding on 3 consecutive sections.

The index.css file should contain: design tokens, Tailwind theme extensions, spacing scale, atmosphere recipe CSS classes, keyframe animations, image presentation utilities, and the custom scrollbar. A good index.css for an OakWind build is 100-200 lines — not 20.

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
| About | Business story, owner/doctor PORTRAIT photo (use the actual person photo, not a building), years in business |
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
- [ ] Google Fonts are loading (check the `<link>` tag in index.html — should match exact URL from `references/font-pairings.md`)
- [ ] Font pairing is different from the last build in the same niche
- [ ] About section uses the owner/doctor PORTRAIT image, not a building or office photo

**Head polish:**
- [ ] `<title>` shows business name + city (not "Vite + React")
- [ ] `<meta name="description">` has a one-line pitch
- [ ] Emoji favicon via SVG data URI (niche-appropriate emoji)
- [ ] Page entrance curtain (`<div className="page-curtain" />`) is first element in App

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
- [ ] Color palette uses exact hex values from `references/color-palettes.md` (not ad-hoc picks)
- [ ] Section padding varies (not all `py-16`) — uses escalating rhythm from spacing scale
- [ ] Images use presentation techniques (gradient overlays, frames, blur-up) not raw `<img>` tags

**Copy quality (scan for AI tells):**
- [ ] Hero headline is 7 words or fewer and doesn't start with "Welcome to"
- [ ] No zombie phrases: "committed to excellence", "state-of-the-art", "your satisfaction"
- [ ] Section labels have personality (not "Our Services", "About Us", "Testimonials")
- [ ] CTA buttons are specific ("Call Dr. Maria", not "Contact Us")
- [ ] About section tells the owner's story with origin + philosophy + proof
- [ ] Reviews include first name + last initial + specific service mentioned

**iPad demo moments (verify 3 wow points exist):**
- [ ] Hero reveal: orchestrated entrance animation that makes the prospect say "whoa"
- [ ] Scroll surprise: one section does something unexpected (horizontal scroll, parallax, before/after)
- [ ] Personal touch: their reviews, their address, their phone number — beautifully presented

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
- Gallery grids with `col-span-2 row-span-2` featured items: use `md:col-span-2 md:row-span-2` so they don't blow up on mobile. On a 2-column mobile grid, `col-span-2` takes the full width AND double height — making the image insanely large. Always scope span utilities to `md:` breakpoint or higher.

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
| `references/color-palettes.md` | **Every build** — select a curated, tested color palette by mood |
| `references/font-pairings.md` | **Every build** — select a curated font pairing by mood, enforce rotation |
| `references/copy-craft.md` | **Every build** — write headlines, CTAs, and microcopy that sound human |
| `references/anti-convergence.md` | **Every build** — verify selections aren't AI-default |
| `references/atmosphere-recipes.md` | **Every build** — pick 4+ CSS recipes for texture, motion, and atmosphere |
| `references/image-presentation.md` | **Every build** — gradient overlays, floating frames, blur-up loading, before/after |
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
