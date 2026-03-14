# Component Patterns

Production-grade section patterns. Each one is designed to feel hand-crafted, not template-generated. Adapt the structure, swap colors and content — but preserve the layering, animation choreography, and spatial relationships that make them work.

---

## Hero Patterns

The hero is the single most important section. It's what the business owner sees first on the iPad demo, and it's what closes the deal. A hero must do three things in under 3 seconds: identify the business, establish the mood, and build trust. Every hero needs these layers:

**Background depth** (minimum 3 layers):
1. Base color or gradient
2. Atmospheric layer (radial glows, blurred shapes, or subtle pattern)
3. Texture layer (noise, diagonal lines, or SVG pattern at very low opacity)

**Entrance choreography** — stagger every element with 150-200ms delays:
- Badge/tagline appears first (0ms)
- Headline next (200ms)
- Decorative separator (400ms)
- Subtext (600ms)
- CTAs (800ms)
- Trust indicators (1000ms)

**Typography scale** — heroes demand oversized type:
- Mobile: `text-5xl` to `text-6xl`
- Tablet: `text-7xl` to `text-8xl`
- Desktop: `text-8xl` to `text-[10rem]`
- Use `leading-[0.9]` or `leading-[0.95]` for tight line height
- Split the headline across lines with color variation (business name in white, descriptor in accent italic)

**Mobile hero layout (critical):** On mobile, heroes often have dead space at the top because the content is vertically centered in `min-h-screen` but the sticky header eats 64px. Fix this:
- Use `pt-28 pb-16 md:pt-0 md:pb-0 md:min-h-screen md:flex md:items-center` instead of `min-h-screen flex items-center` on the hero section
- On mobile, the hero should feel full but not force whitespace. Let content flow naturally with generous padding instead of forcing vertical centering
- Alternatively, use `items-end` with `pb-20` to push content toward the bottom (cinematic poster layout)
- Test mentally at 390px width: is the business name, tagline, and primary CTA all visible without scrolling?

**Gradient blending:** When using multiple `radial-gradient` layers, avoid hard color transitions by:
- Using `transparent` as the end stop (not a different color)
- Keeping gradient opacity low (0.15-0.30) so they blend smoothly into the base
- Using very wide spread (50-70% radius) so gradients feather softly
- Never mixing warm and cool gradients at equal intensity — make one dominant

**Scroll indicator** — always include at the bottom of the hero:
```jsx
<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
  <div className="flex flex-col items-center gap-2 text-brand-text-muted/50">
    <span className="text-xs tracking-[0.25em] uppercase">Scroll</span>
    <div className="w-5 h-8 border-2 border-brand-text-muted/30 rounded-full flex justify-center pt-1.5">
      <div className="w-1 h-2 bg-brand-accent rounded-full animate-bounce" />
    </div>
  </div>
</div>
```

### Immersive Gradient Hero (no images needed)
```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Layer 1: Base */}
  <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />

  {/* Layer 2: Ambient radial glows — use brand colors at low opacity */}
  <div className="absolute inset-0" style={{
    background: `
      radial-gradient(ellipse at 20% 50%, var(--color-accent-1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 30%, var(--color-accent-2) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, var(--color-bg-secondary) 0%, transparent 60%)
    `,
    opacity: 0.25
  }} />

  {/* Layer 3: Texture — use noise class from atmosphere-recipes */}
  <div className="absolute inset-0 noise" />

  {/* Layer 4 (optional): Decorative geometric elements */}
  <div className="absolute top-32 left-8 w-20 h-20 border-l-2 border-t-2 border-brand-accent/20" />
  <div className="absolute bottom-16 right-8 w-20 h-20 border-r-2 border-b-2 border-brand-accent/20" />

  {/* Content — centered or left-aligned depending on DNA */}
  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
    {/* Badge */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
      <span className="inline-flex items-center gap-2 bg-brand-bg-alt/40 border border-brand-accent/20
        backdrop-blur-sm px-5 py-2 rounded-full text-xs tracking-[0.25em] uppercase text-brand-accent font-medium">
        <span className="w-2 h-2 bg-brand-accent rounded-full" />
        {badgeText}
      </span>
    </motion.div>

    {/* Headline — oversized, color-split */}
    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="mt-8 font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tight">
      {businessName}
      <br />
      <span className="text-brand-accent italic">{descriptor}</span>
    </motion.h1>

    {/* Decorative separator */}
    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
      className="mx-auto mt-6 h-[2px] w-32 bg-gradient-to-r from-transparent via-brand-accent to-transparent origin-center" />

    {/* Subtext */}
    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
      className="mt-6 text-lg md:text-xl text-brand-text-muted max-w-2xl mx-auto leading-relaxed font-light">
      {subtext}
    </motion.p>

    {/* CTAs — primary (call) + secondary (scroll) */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
      className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <a href={`tel:${phone}`}
        className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-8 py-4
          rounded-full text-lg font-semibold min-h-[56px] hover:-translate-y-0.5 hover:shadow-xl
          hover:shadow-brand-accent/30 transition-all duration-300 shimmer">
        <Phone className="w-5 h-5" />
        Call {formattedPhone}
      </a>
      <a href="#services"
        className="inline-flex items-center justify-center gap-2 border-2 border-brand-text-muted/30
          text-brand-text-muted hover:border-brand-accent hover:text-brand-accent px-8 py-4
          rounded-full text-lg font-medium min-h-[56px] transition-all duration-300">
        Our Services
        <ChevronDown className="w-4 h-4" />
      </a>
    </motion.div>

    {/* Trust indicators — inline with hero */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
      className="mt-12 inline-flex flex-wrap items-center justify-center gap-4 text-sm text-brand-text-muted">
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />)}
        </div>
        <span>{rating} stars · {reviewCount} reviews</span>
      </div>
      <span className="text-brand-text-muted/30">|</span>
      <span>{yearsInBusiness}+ years</span>
      <span className="text-brand-text-muted/30">|</span>
      <span>{ownerName}</span>
    </motion.div>
  </div>

  {/* Scroll indicator */}
</section>
```
Best for: any niche. This is the default hero when no hero image is available. The gradient mesh and geometric accents create a premium feel without photography.

### Left-Aligned Storytelling Hero
Same structure as above, but content is left-aligned with `max-w-3xl` instead of centered. Works well for businesses with a strong personal brand (landscaping, home services, attorneys). The asymmetry feels more editorial and confident than center-aligned.

Change: `text-center` → remove it. Content naturally aligns left. Add `max-w-3xl` to the content container.

### Full-Screen Photo Hero
When a real photo is available, layer it behind the content with a heavy gradient overlay:
```jsx
<section className="relative min-h-screen flex items-end overflow-hidden">
  <img src={heroImg} className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
  <div className="absolute inset-0 noise" />
  {/* Content positioned at bottom-left for dramatic effect */}
  <div className="relative z-10 max-w-4xl px-8 pb-20 md:pb-28">
    {/* Same content structure as above: badge, headline, separator, CTAs, trust */}
  </div>
</section>
```
Best for: restaurants, detailing (visual-first businesses). The bottom-aligned text creates a cinematic feel, like a movie poster.

---

## Trust Strips

### Horizontal Stats Bar
```jsx
<div className="bg-bg-secondary py-4">
  <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 px-6">
    <div className="text-center">
      <span className="text-3xl font-bold text-accent-1">{rating}★</span>
      <span className="text-sm text-text-secondary block">Google Rating</span>
    </div>
    <div className="text-center">
      <span className="text-3xl font-bold">{years}+</span>
      <span className="text-sm text-text-secondary block">Years Experience</span>
    </div>
    <div className="text-center">
      <span className="text-3xl font-bold">{reviewCount}+</span>
      <span className="text-sm text-text-secondary block">5-Star Reviews</span>
    </div>
  </div>
</div>
```

### Badge Row
```jsx
<div className="flex flex-wrap justify-center gap-6 py-6 px-4 opacity-70">
  {badges.map(b => (
    <div key={b.label} className="flex items-center gap-2 text-sm font-medium">
      <b.icon className="w-5 h-5" />
      <span>{b.label}</span>
    </div>
  ))}
</div>
```

---

## Service Sections

### Zigzag Services (alternating image/text)
Each service block alternates image position. Use `even:flex-row-reverse` for automatic alternation. Include an icon or number for each service.

### Bento Service Grid
Mixed-size cards: one large (spans 2 cols), rest standard. The featured service gets visual priority.

### Icon + Description List
Clean vertical list with large icons. Works for businesses with many services (8+). Group into categories if needed.

---

## Review Patterns

### Large Single Featured Quote
One review dominates with oversized quote marks, customer name, and rating. Remaining reviews in smaller cards below. Creates emotional impact.

### Horizontal Scroll Cards
Touch-friendly carousel with `embla-carousel-react`. Each card: quote, name, rating, date. Auto-play off (respect user control).

### Stacked Full-Width Quotes
Each review gets a full-width section with alternating background colors. Name and stars below the quote. Feels editorial.

### Masonry Grid
Reviews in varied-height cards. Short reviews and long reviews coexist naturally. Requires CSS grid with `grid-auto-rows: min-content` or masonry polyfill.

---

## CTA Sections

### Split CTA (info + form)
Two-column: left has headline, phone, address, hours. Right has a simple contact form or booking placeholder.

### Full-Width Bar CTA
Bold background color, large text, prominent phone button. Appears between sections as a visual break that converts.

### Floating Sticky CTA
Fixed to bottom of viewport on mobile. Phone icon + "Call Now" text. Appears after scrolling past the hero.

---

## Navigation Patterns

### Sticky + Transparent Transition
Starts transparent over hero image, transitions to solid background on scroll. Uses `IntersectionObserver` or scroll event listener.

```jsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

### Minimal Logo + CTA
Just the business name on the left, phone number/CTA on the right. No nav links. Pairs with single-page scroll sites where anchor navigation isn't needed.

---

## Animation Recipes

### Stagger Reveal (Motion)
```jsx
import { motion } from 'motion/react';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

<motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(i => <motion.div key={i} variants={item}>{/* content */}</motion.div>)}
</motion.div>
```

### Count-Up Numbers
```jsx
import { useInView, motion, useMotionValue, useTransform, animate } from 'motion/react';

function CountUp({ target, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));

  useEffect(() => {
    if (isInView) animate(count, target, { duration });
  }, [isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
```

### Scroll-Triggered Section
```jsx
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* section content */}
</motion.section>
```

---

## Learned Patterns Template

Create `references/learned-patterns.md` if it doesn't exist:

```markdown
# Learned Patterns

Living knowledge base. Written by Claude after each OakWind mockup build.
Entries are promoted to main reference files once confirmed across 2+ builds.
Do not add prose. Keep entries tight. Prune when file exceeds 200 lines.

---

## Niches

<!-- Entries added here after each build. Format: ### Niche — YYYY-MM -->

## Design Decisions

<!-- Cross-niche decisions: layout choices, section order experiments, CTA tests -->

## Anti-Patterns Discovered

<!-- Things that looked good but failed in practice or on iPad demo -->

## Technique Notes

<!-- Library quirks, version issues, browser edge cases found during builds -->
```
