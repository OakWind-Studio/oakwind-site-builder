# Atmosphere Recipes

These are production-ready CSS recipes that transform flat websites into ones that feel hand-designed. Copy and adapt these into every build — they're the difference between "AI made this" and "$3K custom build."

Every build must use **at minimum 4 recipes** from this file. The combination you choose should match the niche mood.

---

## Noise Texture Overlay

Adds organic warmth to any solid-color section. Works on both light and dark themes. Apply via a utility class.

```css
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 1;
}
```

Apply to sections: `<section className="relative noise">`. Content inside needs `relative z-10` to stay above the texture.

---

## Diagonal Pattern Overlay

Subtle repeating lines that add depth. Use brand accent color at very low opacity. Great for hero sections and alternating content blocks.

```css
.diagonal-lines {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 4px,
    var(--color-accent-1, currentColor) 4px,
    var(--color-accent-1, currentColor) 5px
  );
  opacity: 0.03;
}
```

---

## Shimmer Hover Effect

A light sweep that crosses a card or button on hover. Makes interactive elements feel premium.

```css
.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  transition: left 0.6s ease;
}
.shimmer:hover::before {
  left: 100%;
}
```

---

## Gradient Mesh Hero Background

Rich, multi-stop radial gradients that create depth without images. Layer 2-3 radial gradients at different positions.

```css
.gradient-hero {
  background:
    radial-gradient(ellipse at 20% 80%, var(--color-accent-1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, var(--color-accent-2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, var(--color-bg-secondary) 0%, var(--color-bg-primary) 80%);
}
```

For dark themes, use low-opacity accent colors. For light themes, use soft pastels. The result should feel like ambient lighting, not a paint splash.

---

## Niche-Specific Pattern Overlays

### Barber Stripe
```css
.barber-stripe {
  background: repeating-linear-gradient(
    45deg,
    var(--color-accent-1),
    var(--color-accent-1) 8px,
    var(--color-bg-primary) 8px,
    var(--color-bg-primary) 16px,
    #c41e3a 16px,
    #c41e3a 24px,
    var(--color-bg-primary) 24px,
    var(--color-bg-primary) 32px
  );
  height: 4px;
}
```

### Food/Restaurant Warmth
A warm vignette that makes food photos and warm palettes feel inviting:
```css
.warm-vignette::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
}
```

### Legal/Professional Pinstripe
Subtle vertical lines that evoke authority and tradition:
```css
.pinstripe {
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 40px,
    var(--color-accent-1) 40px,
    var(--color-accent-1) 41px
  );
  opacity: 0.04;
}
```

---

## Custom Scrollbar

Branded scrollbar that matches the site's palette. Small detail, big impact.

```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-bg-primary); }
::-webkit-scrollbar-thumb {
  background: var(--color-accent-1);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent-2);
}
```

---

## Staggered Entrance Animations

CSS-only stagger system. No JS required. Apply to children of a section that uses IntersectionObserver or `whileInView`.

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleReveal {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.1s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.2s; }
.stagger-5 { animation-delay: 0.25s; }
.stagger-6 { animation-delay: 0.3s; }
```

---

## Section Labels & Transitions

These are the details that separate premium from template. Luxury brands don't use gimmicky geometric shapes — they use typography, spacing, and subtlety.

**DO NOT use:** diamond shapes, rotated squares, decorative dots/circles, emoji-style ornaments, or any geometric divider that looks like it came from a WordPress theme. These look cheap and gimmicky on high-end sites.

**What luxury sites actually use:**

### Uppercase label with accent line
The most reliable premium pattern. A thin line + uppercase tracking creates editorial authority.
```jsx
<div className="flex items-center gap-4 mb-6">
  <div className="h-px w-12 bg-brand-accent" />
  <span className="text-xs tracking-[0.25em] uppercase text-brand-accent font-semibold">
    {label}
  </span>
</div>
```

### Numbered section label
Gives the page a curated, editorial feel. Used by Sotheby's, Compass, and luxury hotels.
```jsx
<div className="mb-8">
  <span className="font-display text-6xl text-brand-accent/10">03</span>
  <h2 className="font-display text-4xl md:text-5xl -mt-4 relative z-10">{title}</h2>
</div>
```

### Gradient fade transition
Instead of any visible divider, use a gradient that blends one section's background into the next. This feels seamless and high-end.
```jsx
<div className="h-24 bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]" />
```

### Generous whitespace as the divider
The most premium option: no divider at all. Just 120-160px of padding between sections. Space itself communicates luxury. Sites like Apple, Aesop, and high-end architecture firms use this.
```jsx
<section className="py-24 md:py-32 lg:py-40">
```

### Corner accents on cards (use sparingly)
One accent frame per page maximum. Works on a featured testimonial or a hero stat card. Overusing this makes it feel templatey.
```jsx
<div className="relative p-8">
  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-accent/30" />
  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-accent/30" />
  {/* content */}
</div>
```

---

## Oversized Decorative Quote Marks

For testimonial sections. The quote mark becomes a design element, not just punctuation.

```jsx
<div className="relative">
  <span className="absolute -top-8 -left-4 text-[120px] leading-none font-serif text-brand-accent/10 select-none pointer-events-none">
    &ldquo;
  </span>
  <blockquote className="relative z-10 text-lg italic">
    {quote}
  </blockquote>
</div>
```

---

## Glassmorphism Card

Frosted glass effect. Best on dark themes or over gradient backgrounds.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## Section Transition Gradient

Smooth color transitions between sections instead of hard color changes.

```jsx
{/* Gradient bridge between hero and next section */}
<div
  className="h-24 -mt-24 relative z-10"
  style={{
    background: `linear-gradient(to bottom, transparent, var(--color-bg-secondary))`
  }}
/>
```

---

## When to Use What

| Mood | Recipes to combine |
|------|-------------------|
| **Dark premium** (detailing, barber) | Noise + shimmer + gradient mesh + glass cards + custom scrollbar |
| **Warm artisan** (taqueria, bakery) | Noise + warm vignette + decorative accents + stagger animations |
| **Clean professional** (auto repair, home services) | Diagonal lines + accent lines + stagger + custom scrollbar |
| **Luxury medical** (med spa) | Gradient mesh + section transitions + glass cards + oversized quotes |
| **Authoritative** (attorney) | Pinstripe + accent lines + oversized quotes + custom scrollbar |
| **Fresh/active** (pressure washing, landscaping) | Noise + diagonal lines + stagger + shimmer on CTAs |
