# Library Recipes

Production-ready code snippets for each approved library. Copy and adapt — these are proven patterns from tested builds.

---

## Swiper — Coverflow Gallery

```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function CoverflowGallery({ images }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      loop
      coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      style={{ paddingBottom: '3rem' }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i} style={{ width: '70%', maxWidth: 600 }}>
          <img src={img.src} alt={img.alt} style={{ width: '100%', borderRadius: 12, aspectRatio: '4/3', objectFit: 'cover' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

## Swiper — Thumbs Gallery

```jsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

function ThumbsGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      {/* Main image */}
      <Swiper
        modules={[Thumbs, Navigation]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        navigation
        loop
        style={{ borderRadius: 12, overflow: 'hidden' }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img.src} alt={img.alt} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail strip */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        watchSlidesProgress
        slidesPerView="auto"
        freeMode
        style={{ marginTop: 12 }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} style={{ width: 100, opacity: 0.5, cursor: 'pointer' }}>
            <img src={img.src} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 6 }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
```

## Swiper — Parallax Slides

```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ParallaxSlider({ slides }) {
  return (
    <Swiper
      modules={[Parallax, Navigation, Pagination]}
      parallax
      navigation
      pagination={{ clickable: true }}
      speed={800}
      style={{ height: '70vh' }}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i} style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            data-swiper-parallax="-30%"
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              width: '130%', left: '-15%',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 10, padding: '3rem', display: 'flex', alignItems: 'flex-end', height: '100%' }}>
            <div>
              <h3 data-swiper-parallax="-200" style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 700 }}>{slide.title}</h3>
              <p data-swiper-parallax="-100" data-swiper-parallax-opacity="0" style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

---

## GSAP — Horizontal Scroll Section

```jsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HorizontalScroll({ items }) {
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
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{ overflow: 'hidden' }}>
      <div ref={trackRef} style={{ display: 'flex', gap: '2rem', padding: '4rem 2rem', width: 'max-content' }}>
        {items.map((item, i) => (
          <div key={i} style={{ width: '80vw', maxWidth: 600, flexShrink: 0 }}>
            {/* Card content */}
          </div>
        ))}
      </div>
    </section>
  );
}
```

## GSAP — Pinned Slideshow

```jsx
function PinnedSlideshow({ slides }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: true,
        end: `+=${slides.length * 100}vh`,
      },
    });

    slides.forEach((_, i) => {
      if (i > 0) {
        tl.fromTo(`.slide-${i}`, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, i)
          .to(`.slide-${i - 1}`, { opacity: 0, y: -40 }, i);
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {slides.map((slide, i) => (
        <div key={i} className={`slide-${i}`} style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: i === 0 ? 1 : 0,
        }}>
          {/* Slide content */}
        </div>
      ))}
    </section>
  );
}
```

---

## Lightbox — Masonry Grid with Fullscreen Viewer

```jsx
import { useState, useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

function GalleryWithLightbox({ photos, categories }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() =>
    activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory),
    [activeCategory, photos]
  );

  return (
    <div>
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {['All', ...categories].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px', borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              background: activeCategory === cat ? 'var(--color-accent-1)' : 'transparent',
              color: activeCategory === cat ? '#fff' : 'var(--color-text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'var(--color-accent-1)' : 'rgba(0,0,0,0.1)'}`,
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div style={{ columnCount: 3, columnGap: 16 }}>
        {filtered.map((photo, i) => (
          <div key={photo.src} onClick={() => setLightboxIndex(i)}
            style={{ marginBottom: 16, cursor: 'pointer', borderRadius: 8, overflow: 'hidden', breakInside: 'avoid' }}>
            <img src={photo.src} alt={photo.alt} style={{ width: '100%', display: 'block' }} />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={filtered.map(p => ({ src: p.src, alt: p.alt }))}
        plugins={[Zoom, Counter]}
        zoom={{ maxZoomPixelRatio: 3 }}
        animation={{ fade: 300, swipe: 400 }}
      />
    </div>
  );
}
```

---

## Text Effects — Typewriter Hook

```jsx
function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

// Usage:
function TypewriterHero() {
  const { displayed, done } = useTypewriter('Thornton, Reeves & Associates', 60);
  return (
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
      {displayed}
      {!done && <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>}
    </h1>
  );
}
// CSS: @keyframes blink { 50% { opacity: 0; } }
```

## Text Effects — Scramble/Decode Hook

```jsx
function useScramble(text, { speed = 30, settleEvery = 3 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

  useEffect(() => {
    let settled = 0;
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      if (tick % settleEvery === 0 && settled < text.length) settled++;
      const result = text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < settled) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      setDisplayed(result);
      if (settled >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return displayed;
}

// Usage:
function ScrambleHero() {
  const text = useScramble('$125 Million+ In Verdicts');
  return <h1 style={{ fontFamily: 'monospace', fontSize: '4rem' }}>{text}</h1>;
}
```

---

## Atropos — 3D Tilt Cards

```jsx
import Atropos from 'atropos/react';
import 'atropos/css';

function TiltCard({ image, title, subtitle, description }) {
  return (
    <Atropos
      rotateXMax={12}
      rotateYMax={12}
      shadow
      shadowScale={1.05}
      highlight={false}
      style={{ width: '100%' }}
    >
      <div style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        {/* Image layer — pushes back on tilt */}
        <div data-atropos-offset="-4" style={{ overflow: 'hidden' }}>
          <img src={image} alt={title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
        </div>
        {/* Text layer — comes forward on tilt */}
        <div data-atropos-offset="3" style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>{subtitle}</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: 4 }}>{title}</h3>
          <p style={{ marginTop: 8, opacity: 0.7 }}>{description}</p>
        </div>
      </div>
    </Atropos>
  );
}
```

---

## AutoAnimate — One-Line DOM Transitions

```jsx
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Filterable grid — items animate in/out automatically
function FilterableGrid({ items, categories }) {
  const [active, setActive] = useState('All');
  const [gridRef] = useAutoAnimate();

  const filtered = active === 'All' ? items : items.filter(i => i.category === active);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['All', ...categories].map(cat => (
          <button key={cat} onClick={() => setActive(cat)}>{cat}</button>
        ))}
      </div>
      <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(item => <Card key={item.id} {...item} />)}
      </div>
    </div>
  );
}

// Accordion — answers slide in/out automatically
function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      {items.map(item => {
        const [ref] = useAutoAnimate();
        return (
          <div key={item.id} ref={ref}>
            <button onClick={() => setOpenId(openId === item.id ? null : item.id)}>{item.question}</button>
            {openId === item.id && <div>{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
```

---

## Rough Notation — Hand-Drawn Annotations

**Known gotchas:**
- **Always use a static import** (`import { annotate } from 'rough-notation'`), NOT a dynamic import (`import('rough-notation').then(...)`). Dynamic imports cause timing issues — by the time the import resolves, the element's position has often shifted due to page entrance animations, scroll, or layout changes, and the annotation draws in the wrong place.
- **Always use hex or rgba color values** (e.g., `'#B08D6E'`, `'rgba(176,141,110,0.25)'`), NOT CSS custom properties (`'var(--color-accent-1)'`). rough-notation renders inline SVG and CSS variables can cause inconsistent rendering across browsers.
- **Use a 500ms setTimeout** before showing the annotation — NOT just `requestAnimationFrame`. The element needs time for all Motion entrance animations (whileInView, initial→animate transitions) to fully complete before rough-notation measures its position. A single rAF fires before CSS transitions finish, so the annotation draws in the wrong place.
- **Never put AnnotatedText inside a `motion.div` that has `initial`/`whileInView` transforms** (like `y: 30` or `scale: 0.9`). The parent's transform shifts the element's bounding rect, and rough-notation draws the SVG at the wrong position. Instead, put the AnnotatedText in a non-animated wrapper, or use the annotation only on elements in sections that DON'T have entrance animations.
- **Keep annotations simple** — use `underline` and `highlight` types. Avoid `circle` and `bracket` on inline text inside complex layouts — they're the most sensitive to positioning errors.

```jsx
import { annotate, annotationGroup } from 'rough-notation';

// Annotation on a keyword (triggered on scroll)
function AnnotatedText({ children, type = 'underline', color = '#B08D6E' }) {
  const ref = useRef(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasFired.current) {
        hasFired.current = true;
        // Wait 500ms for all entrance animations to fully complete
        setTimeout(() => {
          const annotation = annotate(el, { type, color, strokeWidth: 2, padding: 8, animationDuration: 800 });
          annotation.show();
        }, 500);
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [type, color]);

  return <span ref={ref} style={{ display: 'inline' }}>{children}</span>;
}

// Usage:
<h1>Fort Worth's <AnnotatedText type="circle" color="#B08D6E">Most Trusted</AnnotatedText> Realtor</h1>
<p><AnnotatedText type="underline" color="#B08D6E">$52M+</AnnotatedText> in Sales</p>
<span><AnnotatedText type="highlight" color="rgba(176,141,110,0.25)">Board Certified</AnnotatedText></span>

// Sequential annotations (stats that underline one after another):
function SequentialAnnotations() {
  const refs = [useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    const annotations = refs.map(ref =>
      annotate(ref.current, { type: 'underline', color: '#B08D6E', strokeWidth: 2 })
    );
    const group = annotationGroup(annotations);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { group.show(); observer.disconnect(); }
    }, { threshold: 0.4 });
    observer.observe(refs[0].current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <span ref={refs[0]}>$52M+</span> in Sales ·
      <span ref={refs[1]}>230+</span> Homes Sold ·
      <span ref={refs[2]}>9 Days</span> Avg on Market
    </div>
  );
}
```

---

## Canvas Confetti — Celebration Effects

```jsx
import confetti from 'canvas-confetti';

// Form submit burst
function handleFormSubmit(buttonRef) {
  const rect = buttonRef.current.getBoundingClientRect();
  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
    colors: ['#B08D6E', '#C9A96E', '#D4C5B2', '#8B7355'],
  });
}

// Counter completion burst (subtle, fewer particles)
function handleCounterComplete(elementRef) {
  const rect = elementRef.current.getBoundingClientRect();
  confetti({
    particleCount: 40,
    spread: 50,
    scalar: 0.8,
    gravity: 1.2,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: rect.top / window.innerHeight,
    },
    colors: ['#B08D6E', '#C9A96E'],
  });
}

// Side cannons (scroll milestone)
function fireSideCannons() {
  confetti({ angle: 60, spread: 55, particleCount: 80, origin: { x: 0, y: 0.6 }, colors: ['#B08D6E', '#C9A96E'] });
  confetti({ angle: 120, spread: 55, particleCount: 80, origin: { x: 1, y: 0.6 }, colors: ['#B08D6E', '#C9A96E'] });
}
```

---

## React Three Fiber — Subtle 3D Accents

```jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

// Floating wireframe shapes behind hero text
function FloatingShapes() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
          <mesh position={[-3, 1, 0]}>
            <icosahedronGeometry args={[1.2, 0]} />
            <MeshDistortMaterial wireframe color="#B08D6E" opacity={0.12} transparent distort={0.2} speed={1.5} />
          </mesh>
        </Float>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
          <mesh position={[3, -1, -1]}>
            <torusGeometry args={[1, 0.3, 12, 32]} />
            <MeshDistortMaterial wireframe color="#C9A96E" opacity={0.1} transparent distort={0.15} speed={2} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}

// Layer it behind hero text:
<section style={{ position: 'relative', minHeight: '100vh' }}>
  <FloatingShapes />
  <div style={{ position: 'relative', zIndex: 10 }}>
    {/* Hero text content */}
  </div>
</section>
```

---

## Character-Level Text Animations (Custom — No Library)

```jsx
// Character cascade with stagger
function CharacterCascade({ text, delay = 0 }) {
  return (
    <span>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.03, duration: 0.4, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Color fill on scroll
function ColorFillText({ text, scrollProgress }) {
  const filledCount = useTransform(scrollProgress, [0.2, 0.8], [0, text.length]);
  const [count, setCount] = useState(0);
  useMotionValueEvent(filledCount, 'change', v => setCount(Math.round(v)));

  return (
    <span>
      {text.split('').map((char, i) => (
        <span key={i} style={{
          color: i < count ? 'var(--color-accent-1)' : 'rgba(255,255,255,0.3)',
          transition: 'color 0.15s ease',
          display: 'inline-block',
        }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
```
