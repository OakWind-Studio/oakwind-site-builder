# Error Recovery Guide

10 common failure modes during OakWind site builds with diagnostic steps and fixes.

---

## 1. npm create vite fails

**Symptoms:** Command hangs, permission error, or "command not found"
**Common causes:**
- Node.js not installed or outdated (need 18+)
- npm cache corrupted
- Network timeout on package registry
- Directory permissions issue on Windows

**Fix:**
```bash
# Check Node version (need 18+)
node --version

# Clear npm cache if corrupted
npm cache clean --force

# Try with explicit version
npm create vite@latest project-name -- --template react

# If permission error on Windows, run terminal as admin
# Or use: npx --yes create-vite project-name --template react
```

---

## 2. Build fails with import errors

**Symptoms:** `Module not found`, `Cannot resolve`, or named export errors
**Common causes:**
- Missing dependency (forgot to npm install a package)
- Wrong import path (case sensitivity matters)
- Importing from a package not in package.json
- Using CommonJS require() in ESM context

**Fix:**
```bash
# Check if dependency exists
npm ls package-name

# Install missing dependency
npm install package-name

# If import path issue, verify the file exists
ls src/components/ComponentName.jsx

# For ESM/CJS conflicts, check package.json "type" field
```

---

## 3. Tailwind classes not working

**Symptoms:** Classes appear in HTML but no styles applied, unstyled elements
**Common causes:**
- Tailwind v4 CSS import missing or wrong syntax
- Content paths not configured (v3) or CSS @import wrong (v4)
- Class name typo or non-existent utility
- CSS file not imported in main.jsx

**Fix:**
```css
/* Tailwind v4: index.css must have */
@import "tailwindcss";

/* NOT the old v3 directives: */
/* @tailwind base; @tailwind components; @tailwind utilities; */
```
```jsx
// main.jsx must import the CSS
import './index.css';
```

---

## 4. Fonts not loading offline

**Symptoms:** Fallback system fonts showing during iPad demo, FOUT flash
**Common causes:**
- Google Fonts loaded via CDN (no internet at demo)
- Font files not included in project
- @font-face paths incorrect
- Font weight/style mismatch

**Fix:**
```bash
# Download fonts locally instead of CDN
# Place in public/fonts/ directory

# In index.css, use local @font-face:
```
```css
@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/PlayfairDisplay-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```
- Always download font files into `public/fonts/` during build
- Test with airplane mode before the demo

---

## 5. Images broken during demo

**Symptoms:** Broken image icons, 404s in console, blank image areas
**Common causes:**
- Images referenced from external URLs (no internet at demo)
- Wrong path (relative vs absolute)
- File not in public/ directory
- Case sensitivity in filename

**Fix:**
- Use Unsplash images downloaded locally to `public/images/`
- Or use inline SVGs for icons/illustrations
- Reference with absolute paths: `src="/images/hero.jpg"`
- For demo mockups, use high-quality placeholder images embedded in the build
- Verify all images load with `npm run dev` before leaving for demo

---

## 6. Motion animations not working

**Symptoms:** Elements static, no scroll animations, framer-motion errors
**Common causes:**
- framer-motion not installed
- useInView hook not importing correctly
- Reduced motion preference enabled in OS
- Animation trigger threshold too high (element never enters viewport)

**Fix:**
```bash
npm install framer-motion
```
```jsx
// Verify import
import { motion, useInView } from 'framer-motion';

// Use reasonable threshold
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.2 });

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## 7. Lenis smooth scroll conflicts

**Symptoms:** Janky scroll, double scrollbars, scroll hijacking broken, sticky elements jumping
**Common causes:**
- Lenis conflicting with native scroll-snap
- Multiple scroll containers
- Body overflow settings conflicting
- Lenis not destroyed on unmount

**Fix:**
```jsx
// Initialize Lenis properly
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // CRITICAL: cleanup on unmount
  return () => lenis.destroy();
}, []);
```
- Don't use `scroll-snap` with Lenis
- Ensure only one scroll container (html or body, not both)

---

## 8. overflow-x hidden breaks sticky

**Symptoms:** `position: sticky` elements don't stick, scroll past without sticking
**Common causes:**
- Any ancestor has `overflow: hidden` or `overflow-x: hidden`
- Sticky element's container has no defined height
- `overflow: hidden` on body or main wrapper

**Fix:**
```css
/* WRONG: breaks sticky */
.wrapper {
  overflow-x: hidden;
}

/* RIGHT: use clip instead */
.wrapper {
  overflow-x: clip;
}

/* Or apply overflow-x: hidden only on the specific sections that need it,
   not on ancestors of sticky elements */
```
- Audit all parent elements for overflow properties
- Use `overflow: clip` instead of `overflow: hidden` where possible
- Move overflow containment to the narrowest possible scope

---

## 9. Wrangler deploy fails

**Symptoms:** Deploy command errors, 403/401, project not found
**Common causes:**
- Not authenticated with Cloudflare
- Project name doesn't exist yet
- Build output directory wrong
- wrangler not installed globally

**Fix:**
```bash
# Authenticate first
npx wrangler login

# Create project if first deploy
npx wrangler pages project create project-name

# Deploy with correct output directory
npx wrangler pages deploy dist --project-name=project-name

# If "dist" doesn't exist, build first
npm run build && npx wrangler pages deploy dist --project-name=project-name
```

---

## 10. Bundle too large

**Symptoms:** Slow load, Vite build warnings about chunk size, poor Lighthouse score
**Common causes:**
- Full framer-motion import (tree-shaking not working)
- Unoptimized images bundled in src/ instead of public/
- Importing entire icon libraries
- Not code-splitting large components

**Fix:**
```jsx
// Import only what you use from framer-motion
import { motion } from 'framer-motion';
// NOT: import * as motion from 'framer-motion';

// Use dynamic imports for heavy components
const Gallery = lazy(() => import('./components/Gallery'));

// Move images to public/ directory (not bundled by Vite)
// Use responsive images with srcSet
```
```bash
# Analyze bundle
npx vite-bundle-visualizer

# Target: <200KB JS, <500KB total first load
```

---

## General Recovery Strategy

When something breaks during a build:
1. Read the exact error message (don't guess)
2. Check the console for the first error (subsequent errors are often cascading)
3. Verify the file exists at the path mentioned
4. Check that all imports match actual exports
5. Run `npm install` to ensure dependencies are current
6. Clear Vite cache: `rm -rf node_modules/.vite` then restart dev server
7. If all else fails: scaffold a fresh Vite project and port files over
