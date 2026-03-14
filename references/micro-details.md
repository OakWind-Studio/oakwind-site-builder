# Micro-Details That Signal Craft

These are the tiny touches that make a client look at the iPad demo and think "this feels different from everything else I've seen." Each one is small in isolation, but together they create the sensation of a site that was hand-built by someone who obsesses over every pixel.

Pick 4-6 per premium build. Each one should feel intentional, not decorative — it should serve the experience, not just fill space.

---

## Text Reveal Animation

Letters or words slide up from behind a clipping mask, creating a theatrical reveal. Used by Sotheby's, luxury hotels, and high-end architecture firms. Apply to the agent's name in the hero.

```tsx
function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// Usage in hero:
<h1 className="font-display text-7xl md:text-[8rem] leading-[0.85]">
  <TextReveal text="Sarah" delay={0.3} />
  <br />
  <span className="text-brand-accent italic">
    <TextReveal text="Mitchell" delay={0.5} />
  </span>
</h1>
```

The text slides up smoothly from behind an invisible edge — it feels like a curtain lifting. Much more premium than a simple fade-in.

---

## Scroll Progress Bar

A hair-thin accent-colored line at the very top of the viewport that fills as you scroll. Signals polish without being flashy.

```tsx
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand-accent origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

Add `<ScrollProgress />` at the top of the App. Two pixels. That's it. But people notice.

---

## Animated Line Draw

An SVG path that draws itself as it scrolls into view. Use for a simple house outline, a signature flourish, or a section divider. Feels hand-crafted because it literally draws in front of you.

```tsx
function LineReveal({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 2"
      className={`w-32 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.line
        x1="0" y1="1" x2="200" y2="1"
        stroke="currentColor"
        strokeWidth="2"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: 'easeInOut' }
          }
        }}
      />
    </motion.svg>
  );
}
```

Use this instead of static `<div className="h-px w-32 bg-accent">` lines. Same visual result, but it draws itself. The motion tells the viewer "this was designed, not placed."

---

## Image Reveal on Hover

When hovering a text link (like a neighborhood name), a photo fades in behind it or to the side. This is one of the most striking interactions on luxury real estate sites — the text IS the navigation, and the photos reward curiosity.

```tsx
function NeighborhoodLink({ name, image }: { name: string; image: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative group py-4 border-b border-brand-text/5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div className="flex items-center justify-between cursor-pointer">
        <h3 className="font-display text-4xl md:text-6xl group-hover:text-brand-accent transition-colors duration-500">
          {name}
        </h3>
        <motion.span animate={{ x: hovered ? 8 : 0 }} className="text-brand-accent">
          <ArrowRight className="w-6 h-6" />
        </motion.span>
      </div>

      {/* Photo that appears on hover */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-40 rounded-lg overflow-hidden pointer-events-none z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
```

On mobile (where there's no hover), show the images inline as a horizontal scroll or small thumbnail grid instead.

---

## Magnetic Button

A button that subtly pulls toward the cursor as it approaches, as if attracted by a magnet. Used by high-end creative agencies and luxury brands. Makes CTAs feel interactive and alive.

```tsx
function MagneticButton({ children, href, className = '' }: {
  children: React.ReactNode; href: string; className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.a>
  );
}
```

Apply to the primary CTA only (not every button). One magnetic button per page is the right amount.

---

## Smooth Nav Link Underline

Instead of a color change on hover, a thin line slides in from the left. Small, but it signals that someone designed the interaction.

```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--color-accent-1);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}
.nav-link:hover::after {
  transform: scaleX(1);
}
```

---

## Parallax Image Inside Cards

The image inside a property card shifts slightly as you scroll past it, creating a sense of depth within the card itself. Subtle but unmistakable — it's the kind of thing people notice subconsciously.

```tsx
function ParallaxCard({ image, children }: { image: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <div ref={ref} className="relative rounded-xl overflow-hidden group">
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt=""
          className="w-full h-[110%] object-cover"
          style={{ y }}
        />
      </div>
      {children}
    </div>
  );
}
```

The image is 110% height so there's room to shift. The 5% movement is subtle — you feel it more than you see it.

---

## Animated Section Number

The oversized number behind a section heading counts from 00 to its final value as the section scrolls into view. Adds personality to the numbered section label pattern.

```tsx
function SectionNumber({ number }: { number: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, number, { duration: 0.8, ease: 'easeOut' });
      const unsub = count.on('change', v => setDisplay(Math.round(v)));
      return () => { controls.stop(); unsub(); };
    }
  }, [isInView]);

  return (
    <span ref={ref} className="font-display text-[8rem] leading-none text-brand-accent/8 select-none">
      {String(display).padStart(2, '0')}
    </span>
  );
}
```

---

## Cursor Dot Follower

A small dot that follows the cursor with a slight delay, creating a feeling of fluidity. Hides on mobile (no cursor). Used sparingly on premium portfolio and real estate sites.

```tsx
function CursorDot() {
  const [pos, setPos] = useState({ x: -50, y: -50 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    // Hide native cursor on desktop so only the dot shows
    const mq = window.matchMedia('(min-width: 768px)');
    const toggle = (e: MediaQueryList | MediaQueryListEvent) => {
      document.body.style.cursor = e.matches ? 'none' : '';
    };
    toggle(mq);
    mq.addEventListener('change', toggle);
    return () => {
      window.removeEventListener('mousemove', move);
      mq.removeEventListener('change', toggle);
      document.body.style.cursor = '';
    };
  }, []);
  return (
    <motion.div
      animate={{ x: pos.x - 6, y: pos.y - 6 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: 12, height: 12,
        borderRadius: '50%', background: 'rgba(176,141,110,0.5)',
        pointerEvents: 'none', zIndex: 9999, display: 'none',
      }}
      className="md:!block"
    />
  );
}
```

Add `<CursorDot />` at the top of App. Also add this CSS to index.css to hide the native cursor everywhere on desktop:

```css
@media (min-width: 768px) {
  *, *::before, *::after { cursor: none !important; }
}
```

The native cursor disappears on desktop and only the copper dot remains. On mobile (touch devices) neither shows — the dot is hidden via `display: none` + `md:!block`.

---

## When to Use What

| Detail | Best for | Impact level |
|--------|----------|-------------|
| Text reveal animation | Agent name in hero, section headings | High — first thing they see |
| Scroll progress bar | Any premium build | Medium — subtle but polished |
| Animated line draw | Section transitions, hero separator | Medium — replaces static lines |
| Image reveal on hover | Neighborhoods, property links, team members | High — genuinely delightful |
| Magnetic button | Primary CTA only | Medium — feels alive |
| Smooth nav underline | Navigation links | Low-medium — expected on premium |
| Parallax inside cards | Property cards, portfolio items | Medium — subconscious depth |
| Animated section number | Numbered sections | Low-medium — editorial feel |
| Cursor dot follower | Any Tier 4 build with personality | Medium — transforms the feel |

**Rule of thumb:** If you can imagine the interaction on an Apple product page or a Four Seasons website, it belongs. If you can imagine it on a free Wix template, it doesn't.
