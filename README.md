# OakWind Site Builder

A Claude Code skill that builds complete, deployment-ready websites for local businesses in a single prompt. Produces React 18 + Tailwind CSS sites with premium design, scroll-driven animations, real business images, and conversion optimization — ready to deploy on Cloudflare Pages.

Built for [OakWind Studio](https://oakwindstudio.com)'s iPad demo sales workflow. Every mockup looks like a $3K-$5K custom build because that's what we're selling.

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

The skill runs a 6-stage pipeline automatically:

| Stage | What happens |
|-------|-------------|
| **Stage 0 — Recall** | Checks past build learnings to avoid repeated mistakes |
| **Stage 1 — Research** | Gathers real business data, images, reviews, personality profile |
| **Stage 2 — Design Vision** | Selects niche guide, price tier, Style DNA code, color palette, fonts, animation map, emotional arc, restraint check |
| **Stage 3 — Build** | Scaffolds Vite project, applies design tokens, builds all components with real data |
| **Stage 4 — Verify** | Runs automated checks + manual verification checklist |
| **Stage 5 — Learn** | Saves bugs, patterns, and preferences for future builds |

After build:

```bash
cd project-name
npm install && npm run build
npm run dev                                                    # preview
npx wrangler pages deploy dist --project-name=project-name     # deploy
```

---

## Supported Niches (13)

Every niche has its own reference file with section priorities, trust signals, color palettes, typography, sub-niche variations, and a **3-variant rotation system** so two builds in the same niche never look the same.

### Standard Tier ($125-$175/mo or $1.5K-$2.5K upfront)

| Niche | Reference file | Key patterns | Variants |
|-------|---------------|-------------|----------|
| **Restaurant** | `niche-restaurant.md` | Food photography hero, menu tabs, reservation CTA | Dark Moody, Warm Rustic, Clean Modern |
| **Auto Repair** | `niche-auto-repair.md` | Shop-at-night hero, ASE badges, process timeline | Shop-at-Night, Heritage Trust, Modern Clean |
| **Barbershop** | `niche-barber.md` | Gallery thumbs, service filter, walk-in CTA | Dark Vintage, Modern Minimalist, Bold Street |
| **Pressure Washing** | `niche-pressure-washing.md` | Before/after slider, transformation hero | 2 color palettes, emphasis on visual proof |
| **Auto Detailing** | `niche-detailing.md` | Dark premium, before/after parallax, package cards | Carbon Neon, Clean Precision, Industrial Bold |
| **Home Services** | `niche-home-services.md` | Emergency CTA, service area list, license badges | Covers HVAC, plumbing, electrical, roofing, landscaping, handyman |
| **Solo Attorney** | `niche-attorney.md` | Credentials hero, case results, consultation CTA | Dark Authoritative, Classic Navy, Modern Minimal |

### Premium Tier ($3.5K-$10K upfront)

| Niche | Reference file | Key patterns | Variants |
|-------|---------------|-------------|----------|
| **Realtor** | `niche-realtor.md` | Agent split-screen hero, property showcase, Atropos tilt cards | Dark Luxury, Light Editorial, Modern Minimal |
| **Home Builder** | `niche-home-builder.md` | GSAP horizontal portfolio, lightbox room details, Atropos cards | Luxury Dark, Warm Craftsman, Modern Clean |
| **Cosmetic Dental** | `niche-dental.md` | Smile gallery + lightbox, rough-notation credentials, treatment filter | Elegant Editorial, Friendly Modern, Clinical Precision |
| **Boutique Law Firm** | `niche-law-firm.md` | Typewriter hero, attorney grid, scramble stats, case results | Dark Authoritative, Classic Navy, Modern Glass |
| **Med Spa** | `niche-med-spa.md` | Provider split-screen, Swiper coverflow treatments, rough highlights | Blush Luxury, Dark Sophisticated, Bright Modern |
| **Wedding Venue** | `niche-wedding-venue.md` | Coverflow gallery, lightbox, confetti on inquiry, couple testimonials | Romantic Blush, Modern Elegant, Garden Outdoor |

---

## The Design System

### Style DNA (8 Dimensions)

Every build gets a unique 8-character DNA code (e.g., `1C-2B-3F-4A-5E-6A-7A-8B`) that locks in the visual identity. Each dimension has 5-7 options:

| Dimension | Options |
|-----------|---------|
| **1. Layout** | Classic Centered, Full-Width, Asymmetric Split, Bento Grid, Single Column, Overlap/Layered |
| **2. Color** | Light + Vibrant, Dark/Moody, Monochromatic, Earth/Muted, High Contrast B&W, Pastel/Soft |
| **3. Typography** | Serif + Sans, Bold + Light Sans, Script + Clean, Slab + Geometric, Condensed + Rounded, Oversized + Minimal |
| **4. Hero** | Full-Screen Image, Split 50/50, Text-Centric, Video Background, Illustrated, Scroll-Animated, Slider |
| **5. Animation** | Static, Subtle Fade, Parallax, Micro-Interactions, Scroll Reveals, Full Cinematic |
| **6. Navigation** | Sticky Horizontal, Transparent Overlay, Hamburger, Minimal Logo + CTA, Sidebar |
| **7. Sections** | Zigzag, Card Grid, Timeline, Full-Width Breaks, Tabbed/Accordion, Before/After |
| **8. Imagery** | Professional Photo, Lifestyle/Candid, Illustrations, Textured/Vintage, Clean/Flat, Geometric |

Same-niche builds must differ in **4+ dimensions** to prevent convergence.

### Color Palettes (16 Curated)

Pre-tested palettes organized by mood. Each includes 6 CSS variables (bg-primary, bg-secondary, accent-1, accent-2, text-primary, text-secondary) with guaranteed contrast ratios.

| Mood | Palettes | Best for |
|------|----------|----------|
| **Warm & Inviting** | Toasted Almond, Terracotta Garden, Golden Hour, Campfire | Family businesses, restaurants, bakeries, BBQ |
| **Cool & Professional** | Midnight Sage, Steel & Copper, Navy Brass, Arctic Blue | Attorneys, auto repair, dental, medical |
| **Dark & Premium** | Obsidian, Carbon Fiber, Noir Rouge, Midnight Velvet | Detailing, barbers, trendy restaurants, luxury med spa |
| **Soft & Elegant** | Blush Cream, Sage Linen, Pearl | Cosmetic dental, weddings, wellness |
| **Bold & Energetic** | Neon Street, Electric Coral, Teal Thunder | Trendy taco bars, pressure washing, roofing |
| **High Contrast** | Ink & Gold, Monochrome + Red | Luxury brands, bold barbers |

### Font Pairings (17 Curated)

Google Fonts combinations organized by mood, with exact `<link>` tags ready to paste.

| Mood | Pairings |
|------|----------|
| **Elegant & Refined** | DM Serif Display + DM Sans, Cormorant Garamond + Outfit, Playfair Display + Source Sans 3, Libre Baskerville + Karla |
| **Bold & Confident** | Bebas Neue + Nunito, Oswald + Lato, Archivo Black + Work Sans, Anton + Cabin |
| **Warm & Approachable** | Quicksand + Nunito Sans, Josefin Sans + Open Sans, Sora + DM Sans |
| **Modern & Clean** | Montserrat + Hind, Lexend + Inter Tight, Urbanist + Plus Jakarta Sans |
| **Editorial & Distinctive** | Fraunces + Commissioner, Bitter + Raleway, Clash Display + Satoshi |

**Banned fonts:** Inter, Roboto, Arial, Space Grotesk, system defaults (AI tells).

---

## Animation & Scroll System

### 12 Animation Types

No two consecutive sections use the same type. Max 2 fade-ups per page.

| Type | Feeling | Best for |
|------|---------|----------|
| Fade-up | Clean arrival | Trust strip, simple content |
| Stagger cascade | Editorial reveal | Card grids, stats, team |
| Parallax drift | Cinematic depth | Heroes, image breaks |
| Scroll-pinned | Immersive storytelling | Process, about, how-it-works |
| Horizontal traverse | Gallery feel | Listings, portfolios |
| Scale reveal | Apple-style drama | Feature highlights, key stats |
| Clip reveal | Theatrical premium | Images, section transitions |
| Text progression | Personality | Headlines, key phrases |
| Slide-in lateral | Dynamic editorial | About sections, zigzag |
| Morph transition | Mood evolution | Section transitions |
| Perspective tilt | 3D impression | Feature sections |
| Varied stagger | Each card different | Card grids with personality |

### Visual Weight Map

Every section gets a weight class to create breathing rhythm:

- **Hero-weight** (2-3 per page): Full visual impact, oversized type, dramatic color
- **Standard-weight** (3-4 per page): Normal card grids, text + image layouts
- **Whisper-weight** (2-3 per page): Generous whitespace, single element, breathing room

Rule: Never stack two hero-weight sections back-to-back.

### Easing by Business Personality

| Personality | Easing | Duration | Stagger gap |
|-------------|--------|----------|-------------|
| Premium/luxury | `cubic-bezier(0.16, 1, 0.3, 1)` | 0.5s-0.8s | 0.12s-0.15s |
| Bold/energetic | Spring (stiffness 300, damping 25) | 0.3s-0.5s | 0.05s-0.08s |
| Calm/formal | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 0.6s-1.0s | 0.10s-0.12s |
| Warm/casual | Spring (stiffness 200, damping 20) | 0.4s-0.6s | 0.08s-0.10s |

### Restraint System (Tier-Based Motion Budgets)

| Tier | Max scroll animations | Max atmosphere recipes | Max wow moments |
|------|----------------------|----------------------|-----------------|
| Tier 1 (blue-collar) | 2 | 3 | 2 |
| Tier 2 (professional) | 3 | 4 | 3 |
| Tier 3 (brand-driven) | 4 | 5 | 4 |
| Tier 4 (luxury) | 5+ | 6+ | 4 |

More effects ≠ better. Right effects = better.

---

## Libraries (10)

Every niche gets a unique library combination. No two niches use the same toolkit.

| Library | What it does | Niches |
|---------|-------------|--------|
| **Motion** (motion/react) | Scroll reveals, entrance animations, springs | All builds (core) |
| **Lenis** | Buttery-smooth inertia scrolling | Tier 3-4 premium builds |
| **Swiper** | Coverflow 3D, parallax slides, thumbs gallery | Wedding, realtor, med spa, detailing, restaurant, barber |
| **GSAP + ScrollTrigger** | Horizontal scroll, pinned slideshow, scroll-linked | Home builder, premium showcases |
| **Atropos** | 3D tilt/parallax hover on cards | Realtor (property cards), home builder, med spa |
| **yet-another-react-lightbox** | Fullscreen photo viewer with zoom | Wedding, home builder, dental, detailing |
| **Rough Notation** | Hand-drawn circles, underlines, highlights | Dental, law firm, med spa, realtor, auto repair |
| **Canvas Confetti** | Particle bursts on form submit or milestone | Wedding, law firm (counter complete) |
| **@formkit/auto-animate** | One-line DOM transition animation | Dental, restaurant, auto repair, home services, barber |
| **React Three Fiber** | Subtle 3D floating shapes (Tier 4 only) | Luxury personal brands |

Full implementation code for each library is in `references/library-recipes.md`.

---

## Atmosphere Recipes (14 CSS Techniques)

Minimum 4 per build. These transform flat pages into hand-crafted feeling sites.

| Recipe | What it creates |
|--------|----------------|
| Noise texture overlay | Organic warmth via SVG fractal noise (3-5% opacity) |
| Diagonal pattern overlay | Subtle repeating lines at -45deg |
| Shimmer hover effect | Light sweep across cards on hover |
| Gradient mesh hero | Multi-stop radial gradients for depth |
| Barber stripe | Red/white/gold repeating diagonal bands |
| Food/restaurant warmth | Radial vignette darkening edges |
| Legal pinstripe | Vertical repeating gradient at 40px |
| Custom scrollbar | Branded thumb matching accent color |
| Stagger entrance animations | fadeSlideUp, scaleReveal, slideInLeft |
| Uppercase label + accent line | Thin line + tracking-wider text |
| Numbered section label | Large faded number with heading overlay |
| Gradient fade transition | Section-to-section bg gradient |
| Generous whitespace | 120-160px padding (premium signal) |
| Corner accent frame | Thin borders on diagonal corners |

Combination recipes by mood (dark premium, warm artisan, clean professional, luxury medical, etc.) are in the reference file.

---

## Image Presentation (13 Techniques)

Every image container uses at least one technique. No raw `<img>` tags in bare `<div>`s.

| Category | Techniques |
|----------|-----------|
| **Gradient overlays** | Cinematic bottom reveal, side fade, color wash |
| **Framing** | Floating offset frame, accent corner frame, reveal on scroll |
| **Gallery layouts** | Offset grid, featured + supporting, horizontal scroll strip |
| **Loading states** | Blur-up load, skeleton placeholder |
| **Comparisons** | Before/after slider with draggable handle |

---

## Copy System

### Hero Headline Formulas (6)

| Formula | Example |
|---------|---------|
| [City]'s [Superlative] [Thing] | "Dallas's boldest tacos" |
| [What you get], [How it feels] | "A smile that stops rooms" |
| [Number] + [Proof point] | "2,000+ smiles transformed" |
| [Action verb] + [Unexpected angle] | "Where paint becomes armor" |
| [Owner name]'s [Philosophy] | "Jake Morrison's obsessive standard" |
| [Emotional benefit] | "Walk in nervous. Walk out grinning." |

### Copy Rules

- **7 words max** for hero headline
- **Zero exclamation marks** per entire site
- **3+ hyper-specific details** that could only apply to this business
- Section labels have personality (not "Our Services" — use "What We Do Best")
- CTA buttons are action-specific (not "Contact Us" — use "Call Dr. Maria")
- Service descriptions: exactly 2 sentences (what you GET + what's DIFFERENT)
- Voice matches business personality (calm/formal vs. energetic/casual)

### Banned Phrases

"Committed to excellence", "state-of-the-art", "your satisfaction", "quality you can trust", "Welcome to", "premier", "leading provider"

---

## Blue-Collar Elevation

Trades businesses (auto repair, HVAC, plumbing, pressure washing, roofing, landscaping, electrical, handyman) get specialized treatment. The goal: look CAPABLE, not luxury. Think Milwaukee power tools, not Gucci.

### Trade-Specific Heroes

| Trade | Hero style |
|-------|-----------|
| Auto Repair | Shop-at-night with warm amber lighting |
| Pressure Washing | Split transformation (grimy vs. pristine) |
| HVAC | Comfort gradient (red/orange → cool blue) |
| Roofing | Dark bottom to dramatic sky |
| Landscaping | Lush green gradient with organic shapes |
| Plumbing | Water-blue palette, clean aesthetic |
| Electrical | Yellow/amber + dark grey, modern lighting |

### Industrial Textures (6 CSS patterns)

Carbon fiber crosshatch, concrete/aggregate, blueprint grid, brushed metal, and combinations — each mapped to specific trades.

### Emergency CTA

For HVAC, plumbing, and electrical: pulsing glow ring animation on the phone button. Subtle but signals urgency.

---

## Anti-Convergence System

Prevents sites from looking AI-generated.

### Banned Defaults

- **Fonts:** Inter, Roboto, Arial, Space Grotesk, Poppins
- **Colors:** Purple-to-blue gradients, Indigo-600, pure #FFFFFF without texture
- **Layouts:** Identical 3-column grids, perfect 50/50 splits, centered everything
- **Interactions:** Generic emoji as icons, zero micro-interactions

### 8 Aesthetic Directions

Each build commits to one: Brutalist, Organic/Warm, Luxury Editorial, Retro-Futuristic, Warm Artisan, Clean Corporate, Dark Premium, or Playful/Bold.

### 60/30/10 Color Rule

60% background, 30% secondary, 10% accent. Dominant + bold accent beats evenly distributed pastels.

---

## Conversion Design

### Trust Signal Hierarchy (first viewport)

1. Star rating + review count
2. Years in business
3. Owner's name
4. Certifications (BBB, licensed/insured, ASE, board-certified)
5. Real customer quotes (3+ per site)
6. Service area specificity

### Phone Number Placement (6 minimum)

Header (sticky), hero section, mid-page CTA break, contact section, footer, floating mobile CTA bar. All as `tel:` links.

### 4 iPad Demo "Wow Moments"

Every build engineers 4 specific points where the prospect visibly reacts:

1. **Hero reveal** (0-3s) — orchestrated entrance animation
2. **Scroll surprise** (30-50% scroll) — unexpected interaction (horizontal scroll, parallax, before/after)
3. **Deep impression** (50-75% scroll) — scroll-driven moment in the bottom half (NOT just fade-ups)
4. **Personal touch** (75-90% scroll) — their reviews, address, phone beautifully presented

### Emotional Arc

Each site maps three emotional beats that determine section ORDER:

- **Arrival** — What does the visitor feel when they land? (reassurance, aspiration, urgency)
- **Building** — What grows as they scroll? (trust, excitement, or connection — pick ONE)
- **Decision** — What tips them to act? (confidence, FOMO, or personal connection)

---

## Business Personality System

Every business gets profiled on 4 axes during research. This drives ALL design decisions — colors, typography, motion, spacing, copy tone.

| Axis | Spectrum | Example |
|------|----------|---------|
| **Energy** | Calm ←→ Energetic | Fine dining (calm) vs. taqueria (energetic) |
| **Formality** | Casual ←→ Formal | Barbershop (casual) vs. law firm (formal) |
| **Boldness** | Subtle ←→ Bold | Med spa (subtle) vs. pressure washing (bold) |
| **Era** | Traditional ←→ Modern | Family auto shop (traditional) vs. ceramic coating studio (modern) |

Two taco shops, completely different sites: a 30-year family spot (Calm + Casual + Traditional) gets warm browns, hand-drawn accents, vintage feel. A trendy street taco bar (Energetic + Bold + Modern) gets dark mode, neon accent, moody food photography.

---

## Micro-Details (Premium Signals)

Pick 4-6 for Tier 3-4 builds. Each one signals hand-crafted work.

| Detail | Best for |
|--------|----------|
| Text reveal animation | Agent/provider hero |
| Scroll progress bar | Any premium build |
| Animated SVG line draw | Section transitions |
| Image reveal on hover | Neighborhoods, team |
| Magnetic button | Primary CTA only |
| Smooth nav underline | Navigation links |
| Parallax inside cards | Property/portfolio cards |
| Animated section number | Numbered sections |
| Cursor dot follower | Tier 4, personality-driven |

---

## Compliance Notes

| Niche | Requirements |
|-------|-------------|
| **Med Spa & Dental** | "Results may vary" near before/after images |
| **Attorney & Law Firm** | "Past results do not guarantee future outcomes" on case results. Avoid "specialist" without board certification. Check state bar rules on testimonials |
| **Wedding Venue** | Photographer credit on real wedding photos |

---

## File Structure

```
oakwind-site-builder/
├── SKILL.md                              ← Main pipeline (6 stages + verification checklist)
├── README.md                             ← This file
│
├── references/
│   ├── style-dna-system.md               ← 8-dimension visual identity (390K+ combinations)
│   ├── color-palettes.md                 ← 16 curated palettes by mood
│   ├── font-pairings.md                  ← 17 Google Fonts pairings by mood
│   ├── atmosphere-recipes.md             ← 14 CSS texture/motion recipes
│   ├── scroll-experience.md             ← 12 animation types + easing guide + code patterns
│   ├── component-patterns.md             ← Hero, trust strip, service, review, CTA, nav patterns
│   ├── premium-patterns.md               ← 10 Tier 3-4 techniques + niche-library mapping
│   ├── micro-details.md                  ← 9 craft-signal techniques
│   ├── copy-craft.md                     ← Headline formulas, voice matching, CTA copy
│   ├── anti-convergence.md               ← AI-tell prevention rules + aesthetic directions
│   ├── image-presentation.md             ← 13 image treatment techniques
│   ├── blue-collar-elevation.md          ← Trades-specific heroes, textures, variants
│   ├── library-recipes.md                ← Copy-paste code for all 10 libraries
│   ├── verify-ui.md                      ← Post-build QA checklist
│   │
│   ├── niche-restaurant.md               ← Restaurant, taco shop, BBQ, cafe, bakery, food truck
│   ├── niche-auto-repair.md              ← Auto repair, mechanic, tire shop
│   ├── niche-med-spa.md                  ← Med spa, aesthetics, Botox, laser, wellness
│   ├── niche-attorney.md                 ← Solo attorney, lawyer
│   ├── niche-pressure-washing.md         ← Pressure washing, exterior cleaning
│   ├── niche-detailing.md                ← Auto detailing, ceramic coating, PPF
│   ├── niche-barber.md                   ← Barbershop, hair salon
│   ├── niche-home-services.md            ← HVAC, plumber, electrician, roofer, landscaper, handyman
│   ├── niche-realtor.md                  ← Real estate agents, brokerages
│   ├── niche-home-builder.md             ← Custom homes, contractors, remodelers
│   ├── niche-dental.md                   ← Dental, cosmetic dentistry, orthodontics
│   ├── niche-law-firm.md                 ← Boutique law firms (3-15 attorneys)
│   └── niche-wedding-venue.md            ← Wedding venues, event spaces
│
├── scripts/
│   ├── scaffold.sh                       ← Project scaffolding (Vite + React + Tailwind v4)
│   └── verify.sh                         ← Build verification (ESLint, tel: links, bundle size)
│
└── evals/                                ← Test cases for skill evaluation
```

---

## Post-Build QA

Install the [oakwind-verify](https://github.com/OakWind-Studio/oakwind-verify) skill for automated UI verification. It screenshots the site at 3 viewports (mobile, iPad, desktop) and checks for visual bugs, broken images, missing `tel:` links, console errors, and responsive issues.

```
verify the site on localhost:5173
```

---

## Contributing

1. Pull latest: `git pull`
2. Make changes to SKILL.md or reference files
3. Test with a build: "build a site for [test business]"
4. Commit and push

---

## Stack

React 18 · Tailwind CSS v4 · Vite · Cloudflare Pages · `.jsx` (not `.tsx` — Tailwind v4 Vite plugin compatibility)
