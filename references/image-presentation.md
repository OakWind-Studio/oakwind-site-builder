# Image Presentation Techniques

Finding good images is only half the battle. How you present them determines whether the site feels like a template or a $5K custom build. These techniques transform ordinary photos into designed visual experiences.

---

## Gradient Overlays That Actually Work

Most gradient overlays look like someone slapped `bg-black/50` on top. Premium overlays use multiple gradient layers and color-aware blending.

### Cinematic Bottom Reveal
The image fades into the site's background color. Content sits at the bottom. Used on hero sections and full-width image breaks.
```jsx
<div className="relative min-h-[70vh] overflow-hidden">
  <img src={img} className="absolute inset-0 w-full h-full object-cover" alt="" />
  <div className="absolute inset-0" style={{
    background: `linear-gradient(to top,
      var(--color-bg-primary) 0%,
      var(--color-bg-primary) 5%,
      rgba(0,0,0,0.4) 40%,
      rgba(0,0,0,0.1) 70%,
      transparent 100%)`
  }} />
  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
    {/* Content */}
  </div>
</div>
```

### Side Fade (for split layouts)
Image fades into a solid color on one side, allowing text to sit next to it without a hard edge.
```jsx
<div className="relative overflow-hidden">
  <img src={img} className="absolute inset-0 w-full h-full object-cover" alt="" />
  <div className="absolute inset-0" style={{
    background: `linear-gradient(to right,
      transparent 0%,
      transparent 40%,
      var(--color-bg-primary) 75%,
      var(--color-bg-primary) 100%)`
  }} />
</div>
```

### Color Wash
Tints the image with the brand's accent color for cohesion. Good for gallery grids where images from different sources need visual unity.
```jsx
<div className="relative overflow-hidden">
  <img src={img} className="absolute inset-0 w-full h-full object-cover" alt="" />
  <div className="absolute inset-0 bg-[var(--color-accent-1)] mix-blend-multiply opacity-15" />
</div>
```

---

## Image Framing Techniques

### Floating Frame
Image sits inside a frame with a subtle shadow and offset border, creating depth. Feels hand-placed, not template-slotted.
```jsx
<div className="relative">
  {/* Offset accent border behind image */}
  <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[var(--color-accent-1)]/30 rounded-lg" />
  <img src={img} className="relative z-10 w-full rounded-lg shadow-xl" alt="" />
</div>
```

### Warm Glow Shadow
A soft radial gradient glow behind the image in the accent color, plus a heavy warm box-shadow. Creates a luxurious "lit from behind" effect without any visible border element. Best for provider portraits and about sections.
```jsx
<div className="relative">
  <div
    className="absolute -inset-6 rounded-3xl blur-2xl opacity-30"
    style={{ background: 'radial-gradient(ellipse at center, var(--color-accent-1), transparent 70%)' }}
  />
  <img
    src={img}
    className="relative z-10 w-full rounded-2xl"
    style={{ boxShadow: '0 25px 60px -12px rgba(139,115,85,0.25), 0 12px 28px -8px rgba(0,0,0,0.15)' }}
    alt=""
  />
</div>
```

### Accent Corner Frame
Thin corner accents at diagonal corners, suggesting a custom picture frame.
```jsx
<div className="relative p-3">
  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[var(--color-accent-1)]/40" />
  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[var(--color-accent-1)]/40" />
  <img src={img} className="w-full rounded-lg" alt="" />
</div>
```

### Reveal on Scroll
Image starts slightly cropped (scale 1.1) and zoomed out as it enters the viewport. Creates a cinematic reveal effect.
```jsx
<motion.div className="overflow-hidden rounded-xl"
  initial={{ clipPath: 'inset(10% 10% 10% 10%)' }}
  whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}>
  <motion.img src={img} className="w-full" alt=""
    initial={{ scale: 1.15 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }} />
</motion.div>
```

---

## Gallery Layouts That Feel Designed

### Offset Grid
Instead of a uniform grid, offset every other column by half a row height. Creates a dynamic, magazine-style layout.
```jsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {photos.map((photo, i) => (
    <div key={i} className={`${i % 3 === 1 ? 'mt-8' : ''}`}>
      <img src={photo.src} className="w-full rounded-lg aspect-[3/4] object-cover" alt={photo.alt} />
    </div>
  ))}
</div>
```

### Featured + Supporting
One large image with 2-4 smaller images alongside. The featured image tells the story; supporting images add context.
```jsx
<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
  {/* Featured image */}
  <div className="md:row-span-2">
    <img src={featured} className="w-full h-full object-cover rounded-xl" alt="" />
  </div>
  {/* Supporting images */}
  <img src={support1} className="w-full aspect-square object-cover rounded-xl" alt="" />
  <img src={support2} className="w-full aspect-square object-cover rounded-xl" alt="" />
</div>
```

### Horizontal Scroll Strip
A thin, wide strip of images that scrolls horizontally. Works as a visual break between content sections. Not a full gallery — a taste.
```jsx
<div className="overflow-x-auto snap-x snap-mandatory flex gap-4 py-8 px-4 -mx-4"
  style={{ scrollbarWidth: 'none' }}>
  {photos.map((photo, i) => (
    <div key={i} className="flex-shrink-0 w-[250px] md:w-[300px] snap-center">
      <img src={photo.src} className="w-full aspect-[4/3] object-cover rounded-lg" alt={photo.alt} />
    </div>
  ))}
</div>
```

---

## Image Loading States

Images that pop in suddenly feel jarring. Smooth load transitions make the site feel polished.

### Blur-Up Load
Image starts blurred and sharpens as it loads. Uses a CSS transition on a wrapper.
```jsx
function SmoothImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'blur-0 scale-100' : 'blur-md scale-105'
        }`}
      />
    </div>
  );
}
```

### Skeleton Placeholder
A pulsing skeleton in the brand's secondary color that gives way to the image. Better than empty space.
```jsx
function ImageWithSkeleton({ src, alt, className, aspectRatio = '4/3' }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      {!loaded && (
        <div className="absolute inset-0 bg-[var(--color-bg-secondary)] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />
    </div>
  );
}
```

---

## Before/After Comparisons

### Slider Comparison
A draggable slider that reveals before/after. Works for detailing, pressure washing, dental whitening.
```jsx
function BeforeAfter({ before, after }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(x);
  };

  return (
    <div ref={containerRef} className="relative aspect-[16/9] rounded-xl overflow-hidden cursor-col-resize select-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}>
      {/* After (full) */}
      <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={before} className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${(100 / position) * 100}%`, maxWidth: 'none' }} alt="Before" />
      </div>
      {/* Slider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <span className="text-gray-600 text-xs font-bold">↔</span>
        </div>
      </div>
    </div>
  );
}
```

---

## When to Use What

| Situation | Technique |
|---|---|
| Hero with full-screen photo | Cinematic Bottom Reveal |
| About section with owner portrait | Warm Glow Shadow, Floating Frame, or Accent Corner Frame (rotate — never use same frame on consecutive builds) |
| Services with images | Side Fade in zigzag layouts |
| Gallery/portfolio grid | Offset Grid or Featured + Supporting |
| Transitional visual break | Horizontal Scroll Strip |
| Any image container | SmoothImage blur-up load |
| Detailing/pressure washing | Before/After Slider |
| Multi-source image gallery | Color Wash for visual unity |
| Premium first impression | Reveal on Scroll for hero images |
