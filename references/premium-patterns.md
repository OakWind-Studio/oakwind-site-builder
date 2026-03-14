# Premium Design Patterns

These patterns are what separate a $3K site from a $6K-$10K site. They create experiences that feel custom-engineered, not template-assembled. Use them for Tier 3-4 builds where the client expects (and is paying for) something extraordinary.

Read this file when building for premium niches: realtors, luxury med spas, high-end attorneys, brand-conscious businesses that compete on perceived quality.

**CRITICAL: Do NOT use all patterns on every build.** Pick the combination that fits the niche. Using every pattern creates identical-looking sites.

## Recommended Pattern Combinations by Niche

| Niche | Hero | Showcase | Narrative | Libraries | Signature touches |
|-------|------|----------|-----------|-----------|-----------------|
| **Realtor** | Split-screen (agent) | Swiper thumbs + Atropos tilt | Sticky scroll | swiper, atropos, rough-notation | Rough underline on "$52M+", Atropos on property cards |
| **Home Builder** | GSAP parallax scrub | GSAP horizontal scroll | GSAP pinned slideshow | gsap, atropos, lightbox | Horizontal project scroll, Atropos cards, lightbox rooms |
| **Dental** | Gradient text-centric | Zigzag + lightbox gallery | Accordion + AutoAnimate | lightbox, rough-notation, auto-animate | Lightbox smile gallery, rough underline credentials |
| **Law Firm** | Typewriter/scramble | Card grid (attorneys) | Numbered cards | rough-notation, canvas-confetti | Typewriter hero, scramble "$125M+", confetti on counter |
| **Med Spa** | Split-screen (provider) | Swiper coverflow + Atropos | Timeline | swiper, atropos, rough-notation | Coverflow treatments, rough highlight "Diamond Provider" |
| **Wedding Venue** | Full-screen + parallax | Swiper coverflow + lightbox | Accordion | swiper, lightbox, confetti, rough-notation | Coverflow gallery, confetti on inquiry, rough "Best of" |
| **Barber** | Full-screen gradient | Swiper thumbs | Card grid + AutoAnimate | swiper, auto-animate | Thumbs cuts gallery, AutoAnimate service filter |
| **Detailing** | Dark full-screen | Swiper parallax + lightbox | Card grid (packages) | swiper, lightbox | Before/after parallax, lightbox detail shots |
| **Restaurant** | Full-screen food | Swiper + AutoAnimate tabs | Zigzag about | swiper, auto-animate | Food gallery, AutoAnimate menu tabs |
| **Auto Repair** | Split-screen (shop) | Card grid + AutoAnimate | Process cards | auto-animate, rough-notation | AutoAnimate filter, rough "ASE Certified" |
| **Pressure Washing** | Full-screen before/after | Swiper slider | Card grid | swiper | Before/after comparison |
| **Home Services** | Split or gradient | Card grid + AutoAnimate | Accordion FAQ | auto-animate | AutoAnimate service filter |

Each niche gets a structurally different site. This table overrides the instinct to use "all the premium patterns" and creates genuine variety.

---

## Lenis Smooth Scroll

The single highest-impact premium upgrade. Replaces native browser scroll with buttery-smooth inertia scrolling. Install `lenis` and initialize in the app:

```tsx
import Lenis from 'lenis';
import { useEffect } from 'react';

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}
```

Remove `scroll-behavior: smooth` from CSS when using Lenis (they conflict). Add `lenis` to package.json dependencies.

---

## Sticky Scroll Narrative

A section where one side stays pinned while the other scrolls through content. Creates a storytelling flow for "About" or "Process" sections.

```tsx
<section className="relative">
  <div className="grid md:grid-cols-2 gap-0">
    {/* Left side: sticky */}
    <div className="md:sticky md:top-0 md:h-screen flex items-center px-8 md:px-16 py-20">
      <div>
        <h2 className="font-display text-5xl md:text-7xl">Your Journey<br /><span className="text-brand-accent italic">Home</span></h2>
        <p className="mt-6 text-brand-text-muted text-lg max-w-md">From first conversation to closing day, here's what working with me looks like.</p>
      </div>
    </div>

    {/* Right side: scrolling steps */}
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="min-h-screen flex items-center px-8 md:px-16 py-20 border-l border-brand-accent/10">
          <div>
            <span className="text-brand-accent font-display text-6xl opacity-20">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-3xl mt-4">{step.title}</h3>
            <p className="mt-4 text-brand-text-muted max-w-md">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

Best for: agent process sections, "How It Works," about/story narratives. Creates a sense of depth and intentionality that flat sections can't match.

---

## Horizontal Scroll Showcase

A section that scrolls horizontally within the vertical page. Perfect for property listings, portfolio items, or service highlights.

```tsx
function HorizontalShowcase({ items }: { items: ShowcaseItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <h2 className="font-display text-5xl md:text-7xl">Featured<br /><span className="text-brand-accent italic">Properties</span></h2>
      </div>

      <div ref={containerRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-8 pb-8 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}>
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] snap-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-sm tracking-wider uppercase">{item.neighborhood}</p>
                <p className="text-white font-display text-3xl mt-1">{item.price}</p>
                <p className="text-white/60 text-sm mt-2">{item.beds} bed · {item.baths} bath · {item.sqft} sqft</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Hide the scrollbar with CSS: `.scrollbar-hide::-webkit-scrollbar { display: none; }`

---

## Bento Grid Layout

Magazine-style mixed-size cards that break the monotony of uniform grids. Use CSS Grid with named areas or span utilities.

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  {/* Featured item spans 2 cols and 2 rows */}
  <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group min-h-[400px]">
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-8">
      {/* Featured content */}
    </div>
  </div>

  {/* Smaller items */}
  <div className="relative rounded-2xl overflow-hidden min-h-[200px]">
    {/* ... */}
  </div>
  <div className="relative rounded-2xl overflow-hidden min-h-[200px]">
    {/* ... */}
  </div>
  <div className="col-span-2 relative rounded-2xl overflow-hidden min-h-[200px]">
    {/* Wide item */}
  </div>
</div>
```

---

## Orchestrated Page Load

Instead of a simple fade-in, choreograph the entire first viewport's entrance. Each element appears in sequence with distinct animations:

```tsx
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background fades in first */}
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} >
        {/* gradient layers */}
      </motion.div>

      {/* Nav slides down */}
      <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
        {/* ... */}
      </motion.nav>

      {/* Badge scales in */}
      <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
        {/* ... */}
      </motion.span>

      {/* Name slides up with spring */}
      <motion.h1 initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}>
        {/* ... */}
      </motion.h1>

      {/* Separator grows from center */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.0, duration: 0.8 }} className="origin-center">
        {/* gradient line */}
      </motion.div>

      {/* Stats count up */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        {/* count-up numbers */}
      </motion.div>

      {/* CTAs slide up with stagger */}
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.4 }}>
        {/* buttons */}
      </motion.div>
    </section>
  );
}
```

The key is that each element uses a different animation type (fade, slide, scale, spring, grow) so it feels choreographed rather than uniform.

---

## Split-Screen Agent Hero

For realtors and personal brand businesses. The agent's photo takes one half, their name and credentials take the other.

```tsx
<section className="relative min-h-screen grid md:grid-cols-[45fr_55fr]">
  {/* Photo side */}
  <div className="relative overflow-hidden">
    <img src={agentPhoto} className="absolute inset-0 w-full h-full object-cover object-top" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-bg-primary)]" />
  </div>

  {/* Content side */}
  <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 relative">
    {/* Decorative line */}
    <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-brand-accent/50 to-transparent" />

    <span className="text-xs tracking-[0.3em] uppercase text-brand-accent font-semibold">
      Licensed Realtor · Fort Worth, TX
    </span>
    <h1 className="mt-6 font-display text-6xl md:text-8xl lg:text-[7rem] leading-[0.85]">
      {firstName}<br />
      <span className="text-brand-accent italic">{lastName}</span>
    </h1>
    <p className="mt-8 text-brand-text-muted text-lg max-w-lg leading-relaxed">
      {tagline}
    </p>

    {/* Stats row */}
    <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg">
      <div>
        <span className="font-display text-4xl text-brand-accent"><CountUp target={47} />M+</span>
        <span className="block text-xs tracking-wider uppercase text-brand-text-muted mt-1">In Sales</span>
      </div>
      <div>
        <span className="font-display text-4xl"><CountUp target={200} />+</span>
        <span className="block text-xs tracking-wider uppercase text-brand-text-muted mt-1">Homes Sold</span>
      </div>
      <div>
        <span className="font-display text-4xl"><CountUp target={15} />+</span>
        <span className="block text-xs tracking-wider uppercase text-brand-text-muted mt-1">Years</span>
      </div>
    </div>

    {/* CTAs */}
    <div className="mt-12 flex flex-col sm:flex-row gap-4">
      <a href="tel:..." className="btn-primary">Schedule a Consultation</a>
      <a href="#listings" className="btn-secondary">View Listings</a>
    </div>
  </div>
</section>
```

On mobile, stack: photo on top (aspect-[4/3]), content below.

---

## Parallax Depth Layers

Create depth by moving background elements at different scroll speeds. Use `motion`'s `useScroll` and `useTransform`:

```tsx
import { useScroll, useTransform, motion } from 'motion/react';

function ParallaxHero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {/* Background moves slower — feels further away */}
      </motion.div>
      <motion.div className="relative z-10" style={{ y: textY, opacity }}>
        {/* Text moves faster — feels closer, fades as you scroll */}
      </motion.div>
    </section>
  );
}
```

---

## Number Counter with Context

Not just animated numbers — numbers with narrative weight. Each stat gets visual hierarchy and context.

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {[
    { number: 47, suffix: 'M+', label: 'In Closed Sales', icon: DollarSign },
    { number: 200, suffix: '+', label: 'Families Served', icon: Home },
    { number: 12, suffix: '', label: 'Avg Days on Market', icon: Clock },
    { number: 15, suffix: '+', label: 'Years of Experience', icon: Award },
  ].map((stat, i) => (
    <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: i * 0.15 }}>
      <stat.icon className="w-5 h-5 text-brand-accent mx-auto mb-3 opacity-60" />
      <div className="font-display text-5xl md:text-6xl">
        {stat.prefix}<CountUp target={stat.number} />{stat.suffix}
      </div>
      <div className="text-xs tracking-[0.2em] uppercase text-brand-text-muted mt-2">{stat.label}</div>
    </motion.div>
  ))}
</div>
```

---

## When to Use Premium Patterns

| Pattern | Best for | Tier |
|---------|----------|------|
| Lenis smooth scroll | Any premium build | 3-4 |
| Sticky scroll narrative | Realtors (process), attorneys (approach), med spas (treatment journey) | 3-4 |
| Horizontal scroll showcase | Realtors (listings), detailers (portfolio), restaurants (menu highlights) | 3-4 |
| Bento grid | Realtors (listings), any business with diverse visual content | 3-4 |
| Orchestrated page load | Any build where the first impression must be exceptional | 3-4 |
| Split-screen agent hero | Realtors, attorneys, any personal brand business | 3-4 |
| Parallax depth | Luxury builds, brand-driven businesses | 4 |
| Number counters with context | Realtors, med spas, attorneys — anyone with impressive stats | 2-4 |
