# Quality Scoring Rubric

## How Scoring Works

9 dimensions, each pass/fail. A build passes when:
- 7+ dimensions pass (out of 9)
- AI Slop Gate passes (all 10 items)

If <7 pass OR slop gate fails → enter Stage 6 (Refine).

## Dimensions

### 1. Visual Hierarchy (Weight: 15%)
**Pass when ALL true:**
- Type size jumps ≥2x between heading levels (body 16px → h3 28px+ → h2 48px+ → h1 80px+)
- 3+ distinct font-weight levels used across the page (e.g., 300, 400, 700)
- Visual weight alternates between sections (no two HERO-weight back-to-back)
- At least 2 whisper-weight sections exist (breathing room)

### 2. Animation Quality (Weight: 10%)
**Pass when ALL true:**
- No two adjacent sections use the same animation type
- At least 1 section uses a scroll-driven technique (not just fade-up)
- No `linear` easing on UI transitions
- No `bounce` or `elastic` easing on scroll reveals
- Animation timing varies (not all same duration)

### 3. Responsive Design (Weight: 15%)
**Pass when ALL true:**
- No horizontal overflow at 390px viewport
- All grids collapse to single column on mobile (grid-cols-1)
- Touch targets ≥44px on all interactive elements
- Text readable at 16px+ body size on mobile
- Floating CTA bar visible on mobile, hidden on desktop

### 4. Conversion Design (Weight: 15%)
**Pass when ALL true:**
- tel: link count ≥6 (header, hero, mid-page CTA, contact, footer, floating bar)
- Primary CTA buttons ≥56px height
- Trust signals appear BEFORE every CTA (not after)
- Phone number formatted correctly with tel: href

### 5. Copy Quality (Weight: 10%)
**Pass when ALL true:**
- 3+ hyper-specific details that could ONLY apply to this business
- No zombie phrases: "committed to excellence", "state-of-the-art", "your satisfaction"
- Section labels have personality (not "Our Services", "About Us", "Testimonials")
- Hero headline is ≤7 words and doesn't start with "Welcome to"
- CTA text is action-specific (not "Contact Us" or "Learn More")

### 6. Uniqueness (Weight: 15%)
**Pass when ALL true:**
- Design fingerprint is <50% similar to past same-niche builds (or no past builds)
- Recipe combination has not been used in a previous build
- Hero type differs from last same-niche build

### 7. Performance (Weight: 10%)
**Pass when ALL true:**
- JS bundle <500KB (gzipped from dist/)
- Hero image uses loading="eager", all others loading="lazy"
- No unnecessary npm packages installed
- Build completes without warnings

### 8. Accessibility (Weight: 5%)
**Pass when ALL true:**
- Skip link present (<SkipLink /> component)
- :focus-visible styles applied (from a11y/focus-styles.css)
- prefers-reduced-motion respected (from a11y/reduced-motion.css)
- All images have alt text
- Semantic HTML: <nav>, <main>, <section>, <footer>

### 9. Polish (Weight: 5%)
**Pass when ALL true:**
- 4+ atmosphere recipes applied (noise, scrollbar, curtain + 1 more)
- Section spacing varies (not all same padding)
- Custom scrollbar styled
- Page entrance curtain present
- OakWind footer attribution present and linked

## AI Slop Gate (10 Items — ALL Must Pass)

1. No Inter, Roboto, or Poppins as primary font
2. No purple-to-blue gradients
3. Card grids are not all identical dimensions
4. Background is not pure #FFFFFF or #000000
5. Hero stats are not in a generic 3-column template
6. No bounce/elastic easing on scroll reveals
7. Not ALL sections are center-aligned
8. Font-weight range spans ≥300-800
9. Heading size jumps ≥2x between levels
10. Copy is not swappable with a competitor (business-specific)

## Dimension-Specific Fix Playbook

When a dimension fails, apply these specific fixes:

| Failing Dimension | Specific Fix Actions |
|---|---|
| Visual Hierarchy | Increase heading size jumps to 2.5x+, add weight contrast (300 vs 800), add a whisper-weight section |
| Animation Quality | Replace fade-ups with scroll-driven techniques, vary easing per section, add one CSS-native animation |
| Responsive | Fix 390px overflow, add mobile breakpoints to grids, increase touch targets to 44px+ |
| Conversion | Add tel: links to reach 6+, increase CTA button height to 56px+, move trust signals before CTAs |
| Copy Quality | Run copy specificity test, replace zombie phrases, add 3+ hyper-specific details |
| Uniqueness | Swap the most-similar recipe for an alternative, change hero type, shift palette mood |
| Performance | Lazy-load below-fold images, swap Motion → CSS-native animations, check bundle size |
| Accessibility | Add alt text to all images, verify contrast ratios, add skip link, verify reduced-motion |
| Polish | Add more atmosphere recipes, vary section spacing, add micro-interaction to primary CTA |
