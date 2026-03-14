# OakWind Site Builder

A Claude Code skill that builds complete, deployment-ready websites for local businesses in a single prompt. Produces React 18 + Tailwind CSS sites with premium design, animations, images, and conversion optimization — ready to deploy on Cloudflare Pages.

Built for [OakWind Studio](https://oakwindstudio.com)'s iPad demo sales workflow.

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

## Supported Niches (13)

**Standard Tier ($125-$3K):** Restaurant, Auto Repair, Barbershop, Pressure Washing, Auto Detailing, Home Services (HVAC/Plumber/Roofer/Landscaping), Solo Attorney

**Premium Tier ($3.5K-$10K):** Realtor, Home Builder, Cosmetic Dental, Boutique Law Firm, Med Spa, Wedding Venue

## Libraries (10)

Motion, Lenis, Swiper, GSAP + ScrollTrigger, Atropos, yet-another-react-lightbox, Rough Notation, Canvas Confetti, AutoAnimate, React Three Fiber

Each niche gets a unique library combination — no two niches use the same toolkit.

## Usage

```
build a site for Maria's Taqueria at 2100 W Berry St Fort Worth.
4.7 stars, 340 reviews, family-owned 12 years. (817) 555-0142.
```

After build:
```bash
cd project-name
npm install && npm run build
npm run dev  # preview
npx wrangler pages deploy dist --project-name=project-name  # deploy
```

## Post-Build QA

Also install the [oakwind-verify](https://github.com/OakWind-Studio/oakwind-verify) skill for automated UI verification via Playwright.

## Structure

```
SKILL.md                          — Main pipeline (4 stages)
references/
  niche-*.md (13 files)           — Niche-specific design guides
  style-dna-system.md             — 8-dimension visual identity system
  anti-convergence.md             — Rules to prevent AI-default patterns
  atmosphere-recipes.md           — CSS textures, shimmer, gradients
  component-patterns.md           — Hero, trust strip, section layouts
  premium-patterns.md             — Lenis, GSAP, Swiper patterns + niche mapping
  micro-details.md                — Text reveal, cursor dot, magnetic button
  library-recipes.md              — Copy-paste code for all 10 libraries
  verify-ui.md                    — Post-build QA checklist
scripts/
  scaffold.sh                     — Project scaffolding
  verify.sh                       — Build verification
```

## Contributing

1. Pull latest: `git pull`
2. Make changes to SKILL.md or reference files
3. Test with a build: "build a site for [test business]"
4. Commit and push
