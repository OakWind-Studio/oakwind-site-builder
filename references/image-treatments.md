# Image Treatment Options for About/Profile Sections

> CRITICAL: Do NOT default to the accent-border-offset frame on every build. It looks generic and repetitive. Choose the treatment that matches the niche and palette.

## Anti-Pattern (BANNED)

```jsx
{/* DO NOT USE — the accent offset border frame. Looks the same on every site. */}
<div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-2 border-accent rounded-lg" />
```

---

## Treatment Options

### 1. Radial Accent Glow
**Best for:** Dark themes — barber, detailing, auto repair, nightlife
**Mood:** Bold, dramatic, atmospheric
**How:** A soft radial gradient of the accent color sits behind the image, bleeding out at the edges. Optional subtle breathing animation.

```jsx
{/* Static glow layer */}
<div
  className="absolute -inset-8 md:-inset-12 z-0 rounded-3xl pointer-events-none"
  style={{
    background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0.25), transparent 70%)',
  }}
/>
{/* Animated breathing layer */}
<motion.div
  className="absolute -inset-6 md:-inset-10 z-0 rounded-3xl pointer-events-none"
  style={{
    background: 'radial-gradient(ellipse 50% 45% at 50% 55%, rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0.15), transparent 65%)',
  }}
  animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1.02, 0.98] }}
  transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
/>
{/* Image on top */}
<div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
  <OakImage ... />
</div>
```

### 2. Overlapping Text Card
**Best for:** Professional niches — dental, attorney, realtor, law firm
**Mood:** Editorial, layered, sophisticated
**How:** Image at full height, text card overlaps it by ~80px creating z-depth. Card has subtle backdrop blur.

```jsx
<div className="relative">
  <div className="w-[60%]">
    <OakImage ... aspect="3/4" />
  </div>
  <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] bg-surface/90 backdrop-blur-sm border border-border rounded-xl p-8 shadow-2xl">
    {/* Text content */}
  </motion.div>
</div>
```

### 3. Gradient Shadow Stack
**Best for:** Luxury/editorial — wedding venue, med spa, fine dining
**Mood:** Elegant, refined, multi-layered
**How:** Multiple offset box-shadows in accent colors creating stacked depth. No borders.

```jsx
<div
  className="relative z-10 rounded-2xl overflow-hidden"
  style={{
    boxShadow: '8px 8px 0 0 rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0.3), 16px 16px 0 0 rgba(ACCENT_R, ACCENT_G, ACCENT_B, 0.15)',
  }}
>
  <OakImage ... />
</div>
```

### 4. Diagonal Clip-Path
**Best for:** Bold/energetic — restaurant, pressure washing, bold brands
**Mood:** Dynamic, unconventional, high-energy
**How:** Image is clipped with a diagonal or custom polygon. Accent-colored shape peeks behind.

```jsx
<div className="relative">
  <div className="absolute inset-0 bg-accent rounded-2xl" style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' }} />
  <div className="relative z-10 rounded-2xl overflow-hidden" style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)' }}>
    <OakImage ... />
  </div>
</div>
```

### 5. Soft Vignette with Grain
**Best for:** Warm/approachable — home builder, landscaping, family restaurant
**Mood:** Warm, inviting, tactile
**How:** Image has a soft dark vignette overlay at edges + subtle noise texture. Feels organic and touchable.

```jsx
<div className="relative rounded-2xl overflow-hidden">
  <OakImage ... />
  <div className="absolute inset-0 shadow-[inset_0_0_80px_40px_rgba(0,0,0,0.4)] pointer-events-none" />
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url(data:image/svg+xml,...)' }} />
</div>
```

### 6. Mouse-Follow Spotlight
**Best for:** Modern/tech-forward — modern dental, med spa, SaaS-adjacent
**Mood:** Interactive, premium, modern
**How:** A spotlight effect follows the cursor over the image on hover.

```jsx
// Track mouse position relative to container
<div onMouseMove={handleMouseMove} className="relative rounded-2xl overflow-hidden">
  <OakImage ... />
  <div
    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
    style={{
      opacity: isHovered ? 1 : 0,
      background: `radial-gradient(400px at ${pos.x}px ${pos.y}px, rgba(ACCENT, 0.15), transparent 60%)`,
    }}
  />
</div>
```

---

## Selection Guide

| Niche | Primary Treatment | Fallback |
|-------|------------------|----------|
| Barber, detailing, auto | Radial Accent Glow | Diagonal Clip-Path |
| Dental, attorney, realtor | Overlapping Text Card | Gradient Shadow Stack |
| Wedding venue, med spa | Gradient Shadow Stack | Soft Vignette |
| Restaurant, pressure wash | Diagonal Clip-Path | Radial Accent Glow |
| Home builder, home services | Soft Vignette | Overlapping Text Card |
| Modern dental, tech-forward | Mouse-Follow Spotlight | Overlapping Text Card |

**NEVER repeat the same treatment for consecutive same-niche builds.** Use the fallback if the primary was used recently.
