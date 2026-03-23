# Gradient Patterns — v2

5 adaptive gradient formulas that use CSS custom properties to adapt to any palette. All patterns reference `var(--color-accent)` and `var(--color-surface)` so they work automatically with every palette in `references/palettes/`.

---

## 1. Linear Accent Sweep

**Purpose:** CTA sections, accent bars, button backgrounds, feature highlights.

```css
background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
```

**When to use:** Any time you need a solid accent surface that feels more dynamic than a flat color. The 135-degree angle adds subtle directionality without being dramatic.

**Personalities:** Works with all personalities. The gradient angle and color intensity are what the palette controls — this formula is universal.

**Best niches:** Every niche. This is the workhorse gradient.

**Mobile considerations:** No performance concerns. Single linear gradient renders instantly. Looks identical on all devices.

**Visual effect:** A smooth diagonal sweep from the primary accent to its hover state. Creates the impression of a light source hitting a colored surface from the upper-left. Buttons using this feel tangible rather than flat — like they have physical material quality.

---

## 2. Radial Ambient Glow

**Purpose:** Hero backgrounds, full-section atmospheric backgrounds.

```css
background:
  radial-gradient(ellipse at 20% 50%, color-mix(in oklch, var(--color-accent) 15%, transparent), transparent 60%),
  radial-gradient(ellipse at 80% 20%, color-mix(in oklch, var(--color-accent) 10%, transparent), transparent 50%),
  var(--color-surface);
```

**When to use:** When you want a hero background that has depth and atmosphere without using an image. The two radial gradients create a sense of ambient lighting — like diffused spotlights in a room.

**Personalities:** Best for calm, elegant, and subtle personalities. The soft edges and low opacity feel restrained and sophisticated. Avoid for bold/energetic builds where the subtlety gets lost.

**Best niches:** Med spa, wedding venue, cosmetic dental, boutique law, wellness center.

**Mobile considerations:** Two radial gradients perform well on all devices. The `color-mix()` function is supported in all modern browsers (Chrome 111+, Safari 16.2+, Firefox 113+). For older browser fallback, use the surface color alone.

**Visual effect:** Imagine walking into a dimly lit luxury spa. There's a soft warm glow from the left side of the room and a fainter one in the upper right. The background isn't flat — it breathes. The accent color is barely visible (10-15%) but gives the surface warmth and direction. Content placed on top feels like it's floating in ambient light rather than sitting on a flat wall.

---

## 3. Mesh Gradient Hero

**Purpose:** Premium hero backgrounds, feature section backgrounds, pricing section backdrops.

```css
background:
  radial-gradient(ellipse at 30% 20%, color-mix(in oklch, var(--color-accent) 20%, transparent), transparent 50%),
  radial-gradient(ellipse at 70% 80%, color-mix(in oklch, var(--color-accent) 12%, transparent), transparent 50%),
  radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-accent) 8%, transparent), transparent 70%),
  var(--color-surface);
```

**When to use:** When you want the premium feel of Apple/Stripe hero backgrounds. The three overlapping radials create a multi-point lighting effect that feels dimensional. Use for the primary hero section or one key feature section — don't overuse.

**Personalities:** Best for subtleElegant, modernMinimal. Works for calmFormal when the palette is muted. Too subtle for boldEnergetic builds — those need higher opacity or more contrast.

**Best niches:** Med spa, luxury dental, high-end realtor, wedding venue, boutique hotel.

**Mobile considerations:** Three radial gradients are still lightweight. However, the ellipse positions are designed for landscape proportions. On mobile, the effect compresses vertically. Consider adjusting positions for mobile:
```css
@media (max-width: 768px) {
  .mesh-hero {
    background:
      radial-gradient(ellipse at 50% 20%, color-mix(in oklch, var(--color-accent) 20%, transparent), transparent 60%),
      radial-gradient(ellipse at 50% 80%, color-mix(in oklch, var(--color-accent) 12%, transparent), transparent 60%),
      var(--color-surface);
  }
}
```

**Visual effect:** Three pools of soft colored light overlapping at different intensities. The strongest glow (20%) sits upper-left, a medium glow (12%) lower-right, and a faint wash (8%) fills the center. The result is a surface that looks illuminated from multiple sources — like a premium product photography backdrop. It's the difference between a flat wall and a professionally lit studio.

---

## 4. Conic Rotation

**Purpose:** Animated gradient backgrounds for special sections, loading states, premium accent areas.

```css
background: conic-gradient(
  from var(--gradient-angle),
  color-mix(in oklch, var(--color-accent) 30%, var(--color-surface)),
  var(--color-surface),
  color-mix(in oklch, var(--color-accent) 30%, var(--color-surface))
);
```

**Animation setup (requires @property for CSS animation):**
```css
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.gradient-rotate {
  animation: gradient-spin 8s linear infinite;
}

@keyframes gradient-spin {
  to { --gradient-angle: 360deg; }
}
```

**When to use:** Sparingly. This is a statement piece — one per site maximum. Best for a premium hero background or a single accent section. The rotation draws the eye, so use it where you want attention. Static (without animation) works as a unique radial alternative.

**Personalities:** Best for modernMinimal and boldEnergetic. The motion feels tech-forward. Avoid for traditionalTrust and calmFormal — the rotation feels too dynamic for those moods.

**Best niches:** Detailing, tech service, creative agency, modern dental, trendy restaurant.

**Mobile considerations:** `@property` is supported in Chrome 85+, Safari 15.4+, Firefox 128+. For unsupported browsers, the gradient renders but doesn't animate — acceptable graceful degradation. The animation is GPU-accelerated and performs well on mobile. Use `prefers-reduced-motion` to disable:
```css
@media (prefers-reduced-motion: reduce) {
  .gradient-rotate { animation: none; }
}
```

**Visual effect:** A slow, hypnotic rotation of color — imagine a lighthouse beam made of your accent color sweeping across the surface. At 30% mix, the accent is present but not overwhelming. The surface shifts between accent-tinted and neutral as the angle rotates. It creates the feeling of something alive, breathing — the page has a pulse.

---

## 5. Layered Depth

**Purpose:** Section backgrounds that need subtle depth without being dramatic. About sections, contact areas, testimonial sections, footer backgrounds.

```css
background:
  linear-gradient(180deg, var(--color-surface) 0%, transparent 30%),
  radial-gradient(ellipse at 50% 100%, color-mix(in oklch, var(--color-accent) 10%, transparent), transparent 70%),
  var(--color-surface);
```

**When to use:** When a section needs to feel distinct from its neighbors without a hard color break. The top-down linear fade creates a smooth transition from the previous section, while the bottom radial adds a pool of warm accent light that draws the eye downward toward the next CTA or content block.

**Personalities:** Works with all personalities. The subtlety of this pattern makes it universally applicable. Increase the accent percentage (10% → 15%) for bolder builds, decrease (10% → 6%) for more restrained ones.

**Best niches:** Every niche. This is the section-break gradient — it replaces alternating white/gray sections with something that has actual atmosphere.

**Mobile considerations:** Two gradient layers perform excellently on all devices. The `ellipse at 50% 100%` positions the glow at the bottom center regardless of viewport width, so it looks consistent across breakpoints.

**Visual effect:** Imagine a section that fades in from the top (the surface color creating continuity with what's above) and has a subtle warm glow pooling at the bottom — like sunlight hitting the floor through a window. The content sits in a space that has vertical direction: lighter above, warmer below. This unconsciously guides the eye downward through the page.
