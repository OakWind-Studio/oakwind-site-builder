# Performance Budgets

Per-architecture performance limits to ensure sites load fast and feel smooth — especially critical for iPad demo and mobile-first production sites.

## Budget Table by Architecture

| Architecture | JS Bundle (max) | Images (total max) | Scroll Animations (max) | Build Time Target | First Paint Target |
|---|---|---|---|---|---|
| The Editorial | 180KB | 800KB | 4 | < 30s | < 1.5s |
| The Showcase | 180KB | 1.2MB | 5 | < 35s | < 1.8s |
| The Storyteller | 200KB | 900KB | 4 | < 35s | < 1.5s |
| The Converter | 120KB | 500KB | 2 | < 20s | < 1.0s |
| The Minimalist | 100KB | 600KB | 3 | < 20s | < 1.0s |
| The Magazine | 200KB | 1.0MB | 4 | < 35s | < 1.5s |
| The One-Pager | 80KB | 400KB | 1 | < 15s | < 0.8s |
| The Immersive | 250KB | 1.5MB | 6+ | < 45s | < 2.0s |

## Loading Rules

### Images
- **Hero image:** Always `loading="eager"`, `fetchpriority="high"`
- **All other images:** `loading="lazy"`, no fetchpriority
- **Above the fold:** First 2 images eager, everything else lazy
- **Format preference:** WebP > JPEG > PNG (never use uncompressed PNG for photos)
- **Max single image:** 200KB for hero, 100KB for section images, 50KB for thumbnails
- **Responsive:** Use `srcSet` with 2 sizes minimum (mobile 640w, desktop 1280w)

### JavaScript
- **framer-motion:** Import only `motion` and specific hooks — never import the full library
- **Lenis:** ~15KB gzipped — always included, no lazy loading needed
- **Icons:** Import individual icons, never the full icon pack
- **Fonts:** Load via CSS @font-face, not JS — zero JS cost for typography

### Animations
- **Scroll-triggered reveals:** Use `IntersectionObserver` or framer-motion `useInView`
- **CSS-only when possible:** `@keyframes` for simple fades and slides (zero JS cost)
- **GPU-friendly properties only:** `transform`, `opacity`, `filter` — never animate `width`, `height`, `top`, `left`
- **Stagger limit:** Maximum 5 items in a staggered animation group
- **Duration range:** 0.3s-0.8s for reveals, 0.15s-0.3s for hovers

## Budget Tolerance

| Metric | Green (Ship) | Yellow (Optimize) | Red (Must Fix) |
|---|---|---|---|
| JS Bundle | Under budget | Up to 120% of budget | Over 120% of budget |
| Total Images | Under budget | Up to 130% of budget | Over 130% of budget |
| First Paint | Under target | Up to 150% of target | Over 150% of target |
| Lighthouse Perf | 90+ | 80-89 | Below 80 |

## Quick Checks

Before demo or deploy, verify:
- [ ] Hero image loads in < 1s on throttled connection
- [ ] No layout shift visible during load (CLS < 0.1)
- [ ] Scroll animations don't cause jank (maintain 60fps)
- [ ] Total page weight under architecture budget
- [ ] No render-blocking resources besides critical CSS
- [ ] Fonts loaded with `font-display: swap` (no invisible text)

## Architecture-Specific Notes

### The Converter / The One-Pager
Smallest budgets — these sites serve clients who need SPEED. No decorative animations. Every byte must earn its place. Test on 3G throttle.

### The Immersive
Largest budget — but still has limits. Use video sparingly (poster image + lazy video load). Preload the hero aggressively. Accept slightly slower first paint in exchange for cinematic experience.

### The Minimalist
Small budget but premium feel. The trick is making LESS feel like MORE. High-quality hero image is worth the bytes. Everything else should be typography-driven (near-zero image cost for body sections).
