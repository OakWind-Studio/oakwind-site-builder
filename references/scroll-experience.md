# Scroll Experience System

The scroll journey is the product. A business owner scrolling through this site on an iPad should feel like every inch of the page was choreographed — not just the hero. The hero gets you in the door; the scroll experience closes the deal.

This file contains scroll-driven animation patterns organized by complexity. Every build must use at least 3 different scroll animation types across its sections. The goal: no two consecutive sections should animate the same way.

Read this file during Stage 2j (Section Animation Map) and Stage 3d (Build Components).

---

## The Animation Type Vocabulary

These are the distinct animation "languages" you can assign to sections. Each one creates a fundamentally different feeling as the user scrolls.

| Type | What it does | Feeling it creates | Best sections |
|------|-------------|-------------------|---------------|
| **Fade-up** | Elements slide up and fade in on scroll | Clean, professional arrival | Trust strip, simple content |
| **Stagger cascade** | Children appear one by one with increasing delay | Curated, editorial reveal | Card grids, stats, team |
| **Parallax drift** | Layers move at different speeds | Depth, cinematic weight | Heroes, image breaks, about |
| **Scroll-pinned** | Section pins while internal content transforms | Immersive, storytelling | Process, about, how-it-works |
| **Horizontal traverse** | Content scrolls sideways within vertical scroll | Gallery, portfolio feel | Listings, menu items, portfolio |
| **Scale reveal** | Elements grow from small/far to full size | Dramatic, Apple-style | Feature highlights, key stats |
| **Clip reveal** | Content reveals through an expanding clip path | Theatrical, premium | Images, section transitions |
| **Text progression** | Text fills, types, scrambles, or cascades | Personality, engagement | Headlines, key phrases |
| **Slide-in lateral** | Elements enter from left or right | Dynamic, editorial | About sections, zigzag layouts |
| **Morph transition** | Background color/gradient shifts on scroll | Mood evolution, journey | Section transitions, full-page |

**The fade-up tax:** Basic `opacity: 0, y: 30` fade-ups are fine for 1-2 low-priority sections (trust strip, simple CTA break). But if more than 2 sections use this pattern, the page feels generated. Treat fade-up as your "budget" animation — spend it on sections that don't need attention, not on ones that should shine.

---

## Scroll-Pinned Storytelling

The most impressive scroll pattern for iPad demos. A section pins to the viewport while internal content transforms — images swap, text changes, progress indicators advance. The user scrolls but the section "stays" while telling a story.

### Pinned Image + Scrolling Text Steps

One side shows an image that changes; the other side scrolls through steps. Perfect for "Our Process" or "How It Works."

```jsx
import { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';

function PinnedProcess({ steps }) {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const stepIndex = Math.min(
      steps.length - 1,
      Math.floor(v * steps.length)
    );
    setActiveStep(stepIndex);
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen grid md:grid-cols-2 gap-0 overflow-hidden">
        {/* Left: pinned image that crossfades */}
        <div className="relative overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ opacity: activeStep === i ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${step.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-bg-primary)]" />
            </motion.div>
          ))}
        </div>

        {/* Right: scrolling step content */}
        <div className="flex items-center px-8 md:px-16">
          <div className="max-w-lg">
            {/* Progress indicator */}
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: activeStep === i ? 48 : 16,
                    background: activeStep === i
                      ? 'var(--color-accent-1)'
                      : 'rgba(128,128,128,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Step number */}
            <span
              className="font-display text-7xl leading-none"
              style={{ color: 'var(--color-accent-1)', opacity: 0.15 }}
            >
              {String(activeStep + 1).padStart(2, '0')}
            </span>

            {/* Step content with crossfade */}
            <div className="relative mt-4" style={{ minHeight: 200 }}>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{
                    opacity: activeStep === i ? 1 : 0,
                    y: activeStep === i ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <h3
                    className="font-display text-3xl md:text-4xl mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

On mobile, collapse to a simple stacked list — pinned sections don't work well on small screens:
```jsx
{/* Mobile: stacked steps */}
<div className="md:hidden space-y-16 py-16 px-6">
  {steps.map((step, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="font-display text-5xl" style={{ color: 'var(--color-accent-1)', opacity: 0.15 }}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <h3 className="font-display text-2xl mt-2 mb-3">{step.title}</h3>
      <p style={{ color: 'var(--color-text-secondary)' }}>{step.description}</p>
    </motion.div>
  ))}
</div>
```

Best for: realtor process, dental treatment journey, detailing packages, attorney case process, home builder timeline.

---

## Horizontal Scroll Gallery (GSAP)

Scrolling vertically moves a track horizontally. Creates a gallery/portfolio feel that's viscerally different from card grids.

```jsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HorizontalGallery({ items, sectionLabel, headline }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="overflow-hidden hidden md:block"
      style={{ background: 'var(--color-bg-secondary)' }}>
      <div
        ref={trackRef}
        className="flex items-center gap-8 py-20 px-16"
        style={{ width: 'max-content' }}
      >
        {/* Leading text card */}
        <div className="w-[40vw] flex-shrink-0 pr-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: 'var(--color-accent-1)' }} />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ color: 'var(--color-accent-1)' }}>
              {sectionLabel}
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl leading-tight"
            style={{ color: 'var(--color-text-primary)' }}>
            {headline}
          </h2>
        </div>

        {/* Gallery items */}
        {items.map((item, i) => (
          <div key={i} className="w-[35vw] flex-shrink-0 group">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/60 text-sm tracking-wider uppercase">{item.category}</p>
                <h3 className="text-white font-display text-2xl mt-1">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

On mobile, fall back to a swipeable horizontal scroll:
```jsx
{/* Mobile: native horizontal scroll */}
<div className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 py-12"
  style={{ scrollbarWidth: 'none' }}>
  {items.map((item, i) => (
    <div key={i} className="flex-shrink-0 w-[80vw] snap-center">
      {/* Same card content */}
    </div>
  ))}
</div>
```

Best for: listing showcases, food galleries, portfolio items, treatment results, project galleries.

---

## Scale Reveal on Scroll

Elements start small and scaled down, then grow to full size as the user scrolls. Creates an Apple-style "zooming into detail" feeling. Use on 1-2 key sections, not everywhere.

```jsx
function ScaleRevealSection({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{ scale, opacity }}
    >
      {children}
    </motion.section>
  );
}
```

Usage — wrap an entire section for a dramatic entrance:
```jsx
<ScaleRevealSection className="section-generous">
  <div className="max-w-[var(--container-max)] mx-auto px-6">
    {/* Featured testimonial, key stat, or signature image */}
  </div>
</ScaleRevealSection>
```

Best for: featured testimonial, hero stats callout, signature image break, "the one thing that matters" section.

---

## Clip-Path Image Reveal

An image or section reveals through an expanding clip path — like a curtain opening from the center. Creates a theatrical moment.

```jsx
function ClipRevealImage({ src, alt, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        clipPath: useMotionTemplate`inset(0 ${useTransform(clipProgress, v => 50 - v)}% 0 ${useTransform(clipProgress, v => 50 - v)}%)`,
      }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}
```

Simpler approach using CSS and a class toggle:
```jsx
function ClipRevealImage({ src, alt }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <div
      ref={ref}
      className="overflow-hidden transition-all duration-1000 ease-out"
      style={{
        clipPath: isInView
          ? 'inset(0 0% 0 0%)'
          : 'inset(0 50% 0 50%)',
      }}
    >
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
  );
}
```

Best for: full-width image breaks, about section photos, venue/storefront reveals.

---

## Scroll-Linked Background Morph

The background color or gradient shifts as the user scrolls through a section. Creates a mood evolution — like walking deeper into the business's atmosphere.

```jsx
function MorphingSection({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Morph from bg-primary to a richer tone
  const bg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'var(--color-bg-primary)',
      'var(--color-bg-secondary)',
      'var(--color-bg-primary)',
    ]
  );

  return (
    <motion.section ref={ref} style={{ background: bg }} className="section-generous">
      {children}
    </motion.section>
  );
}
```

For more dramatic morphs, interpolate between hex values:
```jsx
const bg = useTransform(
  scrollYProgress,
  [0, 1],
  ['#FAFAF8', '#1C1814'] // light to dark transition
);
```

Best for: transitions between content moods, about sections, "our story" narratives.

---

## Stagger Cascade with Personality

Not just "items appear one by one" — each item uses a slightly different animation. The first slides up, the second scales in, the third fades from the side. Creates the feeling of hand-placed elements rather than a uniform grid.

```jsx
const CARD_ANIMATIONS = [
  { initial: { opacity: 0, y: 40 }, transition: { type: 'spring', stiffness: 100 } },
  { initial: { opacity: 0, scale: 0.9 }, transition: { duration: 0.5 } },
  { initial: { opacity: 0, x: -30 }, transition: { duration: 0.6, ease: 'easeOut' } },
  { initial: { opacity: 0, y: 30, rotate: -2 }, transition: { type: 'spring', damping: 12 } },
  { initial: { opacity: 0, scale: 0.95, y: 20 }, transition: { duration: 0.5 } },
  { initial: { opacity: 0, x: 30 }, transition: { duration: 0.6, ease: 'easeOut' } },
];

function VariedStaggerGrid({ items, renderCard }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => {
        const anim = CARD_ANIMATIONS[i % CARD_ANIMATIONS.length];
        return (
          <motion.div
            key={i}
            initial={anim.initial}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ ...anim.transition, delay: i * 0.1 }}
          >
            {renderCard(item, i)}
          </motion.div>
        );
      })}
    </div>
  );
}
```

Best for: services grids, team members, treatment cards — any grid that currently uses uniform fade-up.

---

## Scroll-Linked Counter Section

Stats that don't just count up when in view — they're linked to scroll position so the number tracks with how far you've scrolled through the section. Creates a visceral "I'm controlling this" feeling.

```jsx
function ScrollLinkedStats({ stats }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={ref} className="section-default" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <ScrollStat
            key={i}
            target={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            scrollProgress={scrollYProgress}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function ScrollStat({ target, suffix, label, scrollProgress, index }) {
  // Each stat starts counting at a staggered scroll position
  const startAt = 0.2 + index * 0.05;
  const endAt = 0.6 + index * 0.05;

  const value = useTransform(scrollProgress, [startAt, endAt], [0, target]);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(value, 'change', (v) => setDisplay(Math.round(v)));

  return (
    <div className="text-center">
      <span className="font-display text-5xl md:text-6xl" style={{ color: 'var(--color-accent-1)' }}>
        {display}{suffix}
      </span>
      <span className="text-xs tracking-wider uppercase block mt-2"
        style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
    </div>
  );
}
```

Best for: trust strips, stats sections — replaces the standard "count up once" pattern with something more engaging.

---

## Parallax Image Stack

Multiple images at different depths that shift at different rates as you scroll. Creates a 3D collage effect without any WebGL.

```jsx
function ParallaxImageStack({ images }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Each image moves at a different rate
  const y1 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['-5%', '15%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={ref} className="relative py-24 md:py-40 overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6 relative" style={{ minHeight: '60vh' }}>
        {/* Background image — largest, slowest */}
        <motion.div
          className="absolute top-0 right-0 w-[55%] rounded-2xl overflow-hidden shadow-2xl"
          style={{ y: y1, aspectRatio: '4/3' }}
        >
          <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
        </motion.div>

        {/* Midground image — medium */}
        <motion.div
          className="absolute top-[15%] left-0 w-[45%] rounded-2xl overflow-hidden shadow-xl z-10"
          style={{ y: y2, aspectRatio: '3/4' }}
        >
          <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
        </motion.div>

        {/* Foreground accent — smallest, fastest */}
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[30%] rounded-xl overflow-hidden shadow-lg z-20"
          style={{ y: y3, aspectRatio: '1/1' }}
        >
          <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
```

On mobile, stack as a simple vertical gallery since the parallax effect needs horizontal space.

Best for: about sections, venue showcases, portfolio highlights, "our space" sections.

---

## Text Fill on Scroll

A headline that fills with color character by character as you scroll past it. Extremely eye-catching for a key statement or tagline.

```jsx
function ScrollFillText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 40%'],
  });

  const filledCount = useTransform(scrollYProgress, [0, 1], [0, text.length]);
  const [count, setCount] = useState(0);
  useMotionValueEvent(filledCount, 'change', (v) => setCount(Math.round(v)));

  return (
    <section ref={ref} className="section-generous">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight">
          {text.split('').map((char, i) => (
            <span
              key={i}
              style={{
                color: i < count ? 'var(--color-text-primary)' : 'rgba(128,128,128,0.15)',
                transition: 'color 0.1s ease',
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

// Usage:
<ScrollFillText text="Where every smile tells a story of confidence restored." />
```

Best for: mission statements, taglines, about section pull quotes — one per page maximum.

---

## Perspective Tilt Section

An entire section that subtly rotates in 3D as you scroll through it, creating a "looking at it from an angle" effect that resolves to flat. Pure CSS transform, no WebGL.

```jsx
function PerspectiveTiltSection({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div style={{ perspective: 1200 }}>
      <motion.section
        ref={ref}
        className="section-generous"
        style={{
          rotateX,
          scale,
          transformOrigin: 'center bottom',
        }}
      >
        {children}
      </motion.section>
    </div>
  );
}
```

Best for: featured sections, services showcase, about section — adds cinematic weight.

---

## Section Animation Map — Quick Reference

Use this table when planning the animation map in Stage 2j. Assign types so that no two consecutive sections share the same animation language.

| Section position | Good animation types | Avoid |
|-----------------|---------------------|-------|
| Hero (1st) | Orchestrated entrance, parallax drift | Fade-up (too weak) |
| Trust strip (2nd) | Scroll-linked counters, stagger cascade | Scroll-pinned (overkill) |
| Services (3rd) | Varied stagger, horizontal traverse, perspective tilt | Fade-up (boring for key section) |
| Image break (4th) | Clip reveal, parallax drift | Fade-up |
| About (5th) | Slide-in lateral, parallax image stack, scroll-pinned | Same as services |
| Reviews (6th) | Scale reveal (featured), stagger cascade (supporting) | Same as about |
| CTA break (7th) | Text fill on scroll, morph transition | Card grid |
| Contact (8th) | Slide-in lateral, simple fade-up (OK here — it's info) | Scroll-pinned (too late) |
| Footer | No animation needed | Anything heavy |

The bottom half of the page (sections 5-8) is where most sites get lazy. This is exactly where you should deploy your second wow moment — a scroll-pinned about section, a scale-reveal featured testimonial, or a text-fill tagline.

---

## Critical Gotchas — Scroll-Pinned Sections

These are real bugs that have broken builds. Read this before using any scroll-pinned or sticky pattern.

**1. `overflow-x: hidden` on `html` breaks `position: sticky`.**
When `overflow` (any axis) is set on the `<html>` element, browsers create a new scroll context that prevents `position: sticky` from working against the viewport. The sticky element just scrolls normally as if it were `position: relative`.

**Fix:** NEVER put `overflow-x: hidden` on `html`. Put it only on `body`:
```css
/* WRONG — breaks sticky */
html { overflow-x: hidden; }

/* CORRECT — sticky still works */
body { overflow-x: hidden; }
```

If you need to prevent horizontal overflow, `body { overflow-x: hidden }` is sufficient. The `html` element should have no overflow rules.

**2. No `overflow: hidden` on ancestors of sticky elements.**
If the scroll-pinned section is nested inside ANY element with `overflow: hidden`, `overflow: auto`, or `overflow: scroll`, the sticky behavior breaks. Check the full ancestor chain: `App div > main > section`. None of these can have overflow hidden.

**3. The tall container must be the ref target for `useScroll`.**
When using Motion's `useScroll({ target: containerRef })`, the ref must be on the tall outer container (the one with `height: N * 100vh`), NOT on the sticky inner element. The scroll progress tracks how much of the tall container has scrolled through the viewport.

**4. Lenis compatibility.**
Lenis smooth scroll works with `position: sticky` — no special handling needed. But if you're also using GSAP ScrollTrigger in the same build, ensure Lenis and GSAP aren't fighting over the scroll position. Use Lenis's `scroll` event to sync if needed.

---

## Mobile Considerations

Scroll-driven animations that depend on precise scroll position can feel janky on mobile due to momentum scrolling and address bar resize. Follow these rules:

1. **Scroll-pinned sections:** Use `md:` breakpoint wrapper — show the pinned version on tablet+ and a stacked version on mobile
2. **Horizontal GSAP scroll:** Same — GSAP pin on desktop, native swipe scroll on mobile
3. **Parallax:** Keep movement subtle on all devices (max ±10%). Mobile parallax that's too aggressive causes nausea
4. **Scale reveal:** Works fine on mobile — no special handling needed
5. **Text fill on scroll:** Works on mobile but make the text larger (text-3xl minimum)
6. **Clip reveal:** Works everywhere
7. **Perspective tilt:** Reduce the rotation amount on mobile (4deg instead of 8deg)

---

## Easing & Timing (The Taste Differentiator)

Two sites can use the exact same animation type and feel completely different based on easing and duration. Easing is where taste lives — it's the difference between "smooth" and "cheap."

**Easing by business personality:**

| Personality | Easing curve | Duration | Stagger gap | Feeling |
|---|---|---|---|---|
| Premium/luxury (med spa, wedding venue, cosmetic dental) | `cubic-bezier(0.16, 1, 0.3, 1)` | 0.5s-0.8s | 0.12s-0.15s | Graceful arrival, unhurried elegance |
| Bold/energetic (taqueria, barber, pressure washing) | Spring: `stiffness: 300, damping: 25` | 0.3s-0.5s | 0.05s-0.08s | Confident snap, alive |
| Calm/formal (attorney, law firm, financial) | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 0.6s-1.0s | 0.10s-0.12s | Measured, authoritative |
| Warm/casual (family restaurant, home services) | Spring: `stiffness: 200, damping: 20` | 0.4s-0.6s | 0.08s-0.10s | Friendly, approachable |

**Hard rules:**
- Never use `linear` easing on scroll reveals — it feels robotic and is the #1 tell of generated animation
- Never use the same duration on every animation — vary by 0.1s-0.2s between sections to avoid mechanical rhythm
- Stagger gap IS personality: tight gaps (0.05s) feel energetic, wide gaps (0.15s) feel curated and deliberate

**Motion `transition` examples:**
```jsx
// Premium/luxury
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}

// Bold/energetic
transition={{ type: "spring", stiffness: 300, damping: 25 }}

// Calm/formal
transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}

// Stagger children (luxury pace)
transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
```

Match the easing to the Business Personality Profile from Stage 1. A bold barber with luxury easing feels sluggish. A luxury med spa with snappy springs feels cheap. The animation timing should feel like the business *moves* — fast businesses move fast, premium businesses move deliberately.

---

## Performance Notes

- Prefer `transform` and `opacity` animations (GPU-composited) over `width`, `height`, `margin` (layout-triggering)
- GSAP ScrollTrigger with `scrub` is highly optimized — more performant than manual scroll listeners
- Motion's `useScroll` + `useTransform` creates no React re-renders when using `motion.div` with `style` — the values flow directly to the DOM
- Keep scroll-pinned sections to 1-2 per page maximum — more than that makes the page feel sluggish
- Lazy-load images in horizontal scroll galleries since they're off-screen initially
