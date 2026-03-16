# Blue-Collar Site Elevation

These patterns are specifically designed to make Tier 1-2 trades sites (auto repair, pressure washing, HVAC, plumbing, roofing, landscaping, handyman) look premium without making them feel like they're trying to be a med spa or a law firm. The goal: a business owner looks at the iPad and thinks "this looks like a real company, not a guy with a truck."

Read this file when building for any blue-collar / home services niche. Pick 3-5 patterns that fit the specific sub-niche.

---

## The Blue-Collar Premium Gap

Template sites for trades businesses all look the same: white background, blue accent, stock photo of a smiling technician, bulleted service list. The bar is low — which means even small design details create massive perceived value. A mechanic sees his competitor's GoDaddy template and then sees an OakWind build with a dark industrial hero, animated trust badges, and a glowing CTA — and he's signing.

The key insight: **trades sites shouldn't try to look "luxury" — they should look CAPABLE.** Confident typography, strong visual hierarchy, industrial textures, and bold colors. Think "premium tool brand" (Milwaukee, DeWalt) not "premium handbag" (Gucci, Hermès).

---

## Niche-Specific Hero Elevations

### Auto Repair: The Shop-at-Night Hero
Dark background with warm amber accent lighting — feels like looking into a well-lit shop bay after hours. Creates atmosphere without photos.

```jsx
function AutoRepairHero() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: '#111111' }}>
      {/* Ambient shop glow — warm pools of light */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: 'rgba(245, 158, 11, 0.08)' }} />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'rgba(239, 68, 68, 0.06)' }} />
      </div>

      {/* Metal grid texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px
          )`,
        }} />

      {/* Content */}
      <div className="relative z-10 ...">
        {/* Hero content here */}
      </div>
    </section>
  );
}
```

### Pressure Washing: The Transformation Hero
Split-screen hero with a dramatic before/after — the left side is grimy, the right side is pristine. A glowing divider line separates them.

```jsx
function PressureWashHero({ beforeLabel, afterLabel }) {
  return (
    <section className="relative min-h-screen grid md:grid-cols-2">
      {/* Before side — desaturated, darker */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-800/60" />
        <div className="relative z-10 flex items-center justify-center h-full p-8">
          <span className="text-xs tracking-[0.3em] uppercase text-stone-400">{beforeLabel}</span>
        </div>
      </div>

      {/* Glowing divider */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px z-20 hidden md:block"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-accent-1), transparent)',
          boxShadow: '0 0 20px var(--color-accent-1), 0 0 40px rgba(29,78,216,0.3)',
        }} />

      {/* After side — bright, saturated */}
      <div className="relative overflow-hidden" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="relative z-10 flex items-center justify-center h-full p-8">
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--color-accent-1)' }}>
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Hero content overlaid on center */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        {/* Name, CTA, trust indicators */}
      </div>
    </section>
  );
}
```

### HVAC: The Comfort-Zone Hero
Gradient transition from "uncomfortable" (red/orange warm side) to "comfortable" (cool blue) — the hero itself demonstrates what the business does.

```css
.hvac-hero {
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.15) 0%,      /* hot red zone */
    rgba(249, 115, 22, 0.08) 25%,     /* warm orange */
    var(--color-bg-primary) 50%,       /* neutral comfort */
    rgba(59, 130, 246, 0.08) 75%,     /* cool blue */
    rgba(29, 78, 216, 0.12) 100%      /* cold blue zone */
  );
}
```

### Roofing: The Skyline Hero
Dark bottom (the house) transitioning to dramatic sky — positions the company between earth and sky.

```css
.roofing-hero {
  background: linear-gradient(
    to top,
    #0F172A 0%,          /* dark base — the structure */
    #1E293B 30%,
    #334155 50%,
    #475569 70%,
    #64748B 85%,
    #94A3B8 100%         /* open sky */
  );
}
```

---

## Industrial Texture Overlays

These CSS patterns add grit and personality that separates a trades site from a generic template. They're subtle — visible at 3-5% opacity.

```css
/* Carbon fiber crosshatch — auto repair, detailing */
.carbon-fiber {
  background-image: repeating-linear-gradient(
    45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px
  ), repeating-linear-gradient(
    -45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px
  );
}

/* Concrete/aggregate — pressure washing, masonry, roofing */
.concrete-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}

/* Blueprint grid — construction, electrical, HVAC */
.blueprint-grid {
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Brushed metal — premium trades, auto */
.brushed-metal {
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 1px,
    rgba(255,255,255,0.02) 1px,
    rgba(255,255,255,0.02) 2px
  );
}
```

Use these instead of the noise texture from `atmosphere-recipes.md` — they feel industrial rather than artisanal.

---

## Pulsing Emergency CTA

For HVAC, plumbing, electrical, and any niche where emergencies drive calls. The CTA pulses with a subtle glow ring to draw attention without being obnoxious.

```jsx
function EmergencyCTA({ phone, label = 'Emergency? Call Now' }) {
  return (
    <a
      href={`tel:${phone}`}
      className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold text-white min-h-[56px]"
      style={{ background: 'var(--color-accent-1)' }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping-slow"
        style={{
          background: 'var(--color-accent-1)',
          opacity: 0.3,
        }} />
      <Phone className="w-5 h-5 relative z-10" />
      <span className="relative z-10">{label}</span>
    </a>
  );
}
```

```css
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.3; }
  70% { transform: scale(1.15); opacity: 0; }
  100% { transform: scale(1.15); opacity: 0; }
}
.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
```

Use this for the hero CTA on emergency-driven niches. Don't use it on every button — one per page.

---

## Animated Process Timeline

Trades businesses sell trust through process transparency. "Here's exactly what happens when you call us" is extremely effective. This vertical timeline animates step by step as you scroll.

```jsx
function ProcessTimeline({ steps }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Connecting line */}
      <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'rgba(128,128,128,0.15)' }} />

      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="relative flex gap-6 mb-12 last:mb-0"
        >
          {/* Step number circle */}
          <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ background: 'var(--color-accent-1)' }}>
            {i + 1}
          </div>

          {/* Step content */}
          <div className="pt-2">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              {step.title}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

Trades-specific step templates:

**Auto Repair:** 1. Call or drop in → 2. Free diagnostic → 3. Transparent quote (no surprises) → 4. Expert repair → 5. Quality check + warranty

**HVAC:** 1. Call anytime (24/7) → 2. Same-day dispatch → 3. Diagnose on-site → 4. Upfront pricing → 5. Fix it right → 6. Follow-up check

**Pressure Washing:** 1. Free estimate → 2. Walk the property together → 3. Protect your landscaping → 4. Professional cleaning → 5. Final walkthrough

**Roofing:** 1. Free inspection → 2. Detailed report with photos → 3. Transparent quote → 4. Quality installation → 5. Warranty registration

---

## Before/After Slider (Premium Version)

The basic slider is a commodity. This version has a glowing handle, labels, and smooth drag feel. Essential for pressure washing, detailing, roofing, and landscaping.

```jsx
function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handleMove(clientX);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
      onTouchStart={(e) => { isDragging.current = true; handleMove(e.touches[0].clientX); }}
    >
      {/* After image (full width, always visible) */}
      <img src={afterSrc} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />

      {/* Before image (clipped to slider position) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeSrc} alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${containerRef.current?.offsetWidth || 0}px`, maxWidth: 'none' }} />
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 text-white">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
        style={{ background: 'var(--color-accent-1)' }}>
        {afterLabel}
      </span>

      {/* Slider handle with glow */}
      <div
        className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-10"
        style={{
          left: `${position}%`,
          background: 'white',
          boxShadow: '0 0 12px rgba(255,255,255,0.5), 0 0 24px rgba(255,255,255,0.2)',
        }}
      >
        {/* Drag handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: '0 0 16px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 3L14 8L11 13" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
```

---

## Badge/Certification Strip

Trades businesses live on certifications. This animated strip scrolls badges in with a trust-building stagger — more impactful than static badge images.

```jsx
function CertificationStrip({ badges }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
          className="flex items-center gap-3 px-5 py-3 rounded-xl border"
          style={{
            borderColor: 'rgba(128,128,128,0.15)',
            background: 'rgba(128,128,128,0.04)',
          }}
        >
          <badge.icon className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--color-accent-1)' }} />
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{badge.label}</p>
            {badge.sub && <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{badge.sub}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Usage:
<CertificationStrip badges={[
  { icon: Shield, label: 'Licensed & Insured', sub: 'Texas #12345' },
  { icon: Award, label: 'ASE Certified', sub: 'Master Technician' },
  { icon: Star, label: '4.9 ★ Rating', sub: '200+ reviews' },
  { icon: Clock, label: 'Since 2008', sub: '16 years serving DFW' },
]} />
```

---

## Service Cards with Niche Personality

Instead of generic white cards, these have industrial-themed visual treatments that match the trade.

```css
/* Dark industrial card — auto repair, roofing */
.industrial-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.industrial-card:hover {
  border-color: var(--color-accent-1);
  box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.1);
  transform: translateY(-4px);
}

/* Clean professional card — HVAC, plumbing, electrical */
.pro-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  border-left: 4px solid var(--color-accent-1);
  transition: all 0.3s ease;
}
.pro-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* Outdoor card — landscaping, pressure washing */
.nature-card {
  background: rgba(22, 101, 52, 0.04);
  border: 1px solid rgba(22, 101, 52, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}
.nature-card:hover {
  background: rgba(22, 101, 52, 0.08);
  transform: translateY(-3px);
}
```

---

## Same-Niche Rotation System

This is critical: if you build 10 HVAC sites, they cannot all use the comfort-zone gradient hero with blueprint grid and the same process timeline layout. Each niche has **3 distinct design variants** — rotate through them so consecutive same-niche builds look structurally different.

### HVAC — 3 Variants

| | **Variant A: Comfort Zone** | **Variant B: Industrial Pro** | **Variant C: Clean & Bright** |
|---|---|---|---|
| Hero | Comfort-zone gradient (warm→cool) | Dark industrial with blueprint grid | Light split-screen (tech on left, content right) |
| Palette | Steel & Copper (warm neutrals) | Dark Industrial (charcoal + red/amber) | Professional Blue (white + blue + orange) |
| Texture | Blueprint grid | Carbon fiber crosshatch | Diagonal lines (subtle) |
| Cards | Pro card (left accent border) | Industrial card (dark glass) | Clean white cards with shadow lift |
| CTA style | Pulsing emergency glow | Bold full-width banner | Rounded pill with arrow icon |
| Special | Animated process timeline | Certification badge strip (spring stagger) | Seasonal urgency banner + financing callout |
| Font mood | Bold & Confident | Industrial Authority | Professional Clean |

### Auto Repair — 3 Variants

| | **Variant A: Shop at Night** | **Variant B: Heritage Trust** | **Variant C: Modern Clean** |
|---|---|---|---|
| Hero | Dark + amber shop glow | Light with navy/red heritage colors | Split-screen (shop photo + content) |
| Palette | Noir Rouge (dark + amber + red) | Heritage Blue (warm white + navy + orange) | Classic Trust (white + blue + red) |
| Texture | Carbon fiber + brushed metal | Noise texture (warm) | No texture — clean with strong shadows |
| Cards | Industrial card (dark) | Heritage cards (rounded, warm bg) | Flat cards with colored top border |
| CTA style | Amber glow button | Navy button with red hover | Blue pill with phone icon |
| Special | Wrench icon animations | "Since 2006" heritage badge + family photo | Interactive service filter (AutoAnimate) |
| Font mood | Industrial Authority | Heritage/Trust | Professional Clean |

### Pressure Washing — 3 Variants

| | **Variant A: Transformation** | **Variant B: Fresh & Clean** | **Variant C: Bold Results** |
|---|---|---|---|
| Hero | Split-screen (grimy vs clean) | Light airy hero with water-blue gradient | Dark hero with dramatic before/after stats |
| Palette | Teal Thunder (teal + navy) | Clean Blue (white + bright blue + green) | Power Orange (white + bold orange + blue) |
| Texture | Concrete texture | None — ultra-clean | Diagonal lines |
| Cards | Pro card (left border) | Nature card (rounded, soft bg) | Bold cards with orange accent hover |
| CTA style | Teal glow with before/after metaphor | Green "Free Estimate" pill | Orange full-width banner |
| Special | Premium before/after slider | Service area map with city pills | Dramatic counter stats (homes cleaned, gallons) |
| Font mood | Bold & Confident | Professional Clean | High Energy |

### Roofing — 3 Variants

| | **Variant A: Skyline** | **Variant B: Storm Ready** | **Variant C: Craftsman** |
|---|---|---|---|
| Hero | Skyline gradient (dark→sky) | Dark dramatic with lightning/storm imagery feel | Warm earthy hero with craftsmanship focus |
| Palette | Dark Industrial (charcoal + red) | Dark + amber warning palette | Heritage (warm white + earth tones + forest) |
| Cards | Industrial card | Glass card with amber glow | Warm rounded cards |
| Special | Aerial perspective image breaks | "Storm damage? Call now" emergency CTA | Material comparison cards (shingle vs metal vs tile) |

### Landscaping — 3 Variants

| | **Variant A: Garden Oasis** | **Variant B: Bold Outdoors** | **Variant C: Modern Minimal** |
|---|---|---|---|
| Hero | Lush green gradient with organic shapes | Bold full-screen with earth tones | Clean white with single accent green |
| Palette | Green Earth (forest + brown) | Fresh Green (emerald + sky blue) | Sage minimal (white + sage + charcoal) |
| Cards | Nature card (green tint) | Bold cards with green border | Flat minimal cards with icon accent |
| Special | Seasonal color palette section | Before/after transformation gallery | Service packages as pricing table |

### How to pick a variant

1. Check if previous same-niche builds exist. If the last HVAC build used Variant A, this one uses B or C.
2. Match the variant to the business personality. A heritage family shop → Heritage Trust variant. A modern tech-forward operation → Modern Clean variant.
3. If no previous builds exist, choose the variant that best matches the Business Personality Profile from Stage 1.
4. Document which variant you chose in the App.jsx header comment alongside the DNA code.

---

## Quick Reference Table

| Niche | Default variant | Rotate to | Also try |
|-------|----------------|-----------|----------|
| Auto Repair | Shop-at-night (A) | Heritage Trust (B) | Modern Clean (C) |
| Pressure Washing | Transformation (A) | Fresh & Clean (B) | Bold Results (C) |
| HVAC | Comfort Zone (A) | Industrial Pro (B) | Clean & Bright (C) |
| Plumbing | Clean & Bright (C) | Industrial Pro (B) | Comfort Zone (A) |
| Roofing | Skyline (A) | Storm Ready (B) | Craftsman (C) |
| Landscaping | Garden Oasis (A) | Bold Outdoors (B) | Modern Minimal (C) |
| Electrician | Shop-at-night (A, amber→yellow) | Industrial Pro (B) | Clean & Bright (C) |
| Handyman | Heritage Trust (B, warm) | Modern Clean (C) | Bold Results-adapted (C) |

---

## The "Looks Like a Real Company" Checklist

These are the details that make a solo operator or small shop look established:

1. **Uniform section labels** with accent line — not "Our Services" but the same styled label treatment across all sections
2. **Consistent icon style** — all Lucide, all the same stroke weight, all the same accent color
3. **Branded stat counters** — not just numbers but formatted with the accent color and a label
4. **Professional CTA sizing** — minimum 56px height, full-width on mobile, not thin text links
5. **Warranty badge** in a prominent position — "12-month / 12,000-mile warranty" feels institutional
6. **Service area section** — listing specific cities/neighborhoods signals "we're local, we're real"
7. **Footer with business details** — full address, license number, hours, phone — not just a copyright line
