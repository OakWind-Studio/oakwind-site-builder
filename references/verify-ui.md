# Post-Build UI Verification

Run this after a site is built to catch visual bugs, responsiveness issues, and conversion problems before showing the demo on iPad.

This verification uses Playwright to automatically screenshot the site at multiple viewports and check for common issues.

---

## How to Run

After building and starting a preview server, run verification with:

```
/oakwind-verify http://localhost:PORT
```

This triggers automated checks across 3 viewports (390px mobile, 768px iPad, 1024px desktop) and reports issues.

---

## Automated Checks

### 1. Visual Rendering (Playwright screenshots)

Take screenshots at all 3 viewports and visually inspect:

```
390px × 844px   — iPhone (mobile)
768px × 1024px  — iPad portrait (primary demo device)
1024px × 768px  — iPad landscape / desktop
```

For each viewport, check:
- [ ] Hero section is fully visible without excessive dead space
- [ ] Text is readable (no white-on-white, no overflow, no truncation)
- [ ] Images are loading (no broken image icons)
- [ ] Navigation is functional (hamburger on mobile, full nav on desktop)
- [ ] No horizontal overflow (content doesn't extend past viewport)

### 2. Content Accuracy

Scan the rendered DOM for:
- [ ] Business name appears correctly
- [ ] Phone number is present and formatted correctly
- [ ] Address is present
- [ ] `tel:` links — count them, report if fewer than 6
- [ ] OakWind footer is present with link to oakwindstudio.com
- [ ] No placeholder text ("Lorem ipsum", "Your Name Here", "placeholder")
- [ ] No broken image URLs (check for 404 responses on img src)

### 3. Conversion Elements

- [ ] Floating mobile CTA bar visible on 390px viewport (scroll past hero first)
- [ ] Primary CTA button has sufficient contrast and is tappable (44px+ height)
- [ ] Phone number is the correct `tel:+1XXXXXXXXXX` format
- [ ] Form inputs have labels and are tappable on mobile

### 4. Responsive Layout

- [ ] Cards/grid items are aligned (same heights in rows on desktop)
- [ ] No overlapping text or elements at any viewport
- [ ] Font sizes: body >= 16px, headlines >= 36px on mobile
- [ ] Images have correct aspect ratios (no stretching/squishing)
- [ ] Sections have adequate padding (no content touching edges)

### 5. Performance

- [ ] Bundle size under 500KB
- [ ] No console errors (check browser console)
- [ ] Images use `loading="lazy"` for below-fold content
- [ ] Google Fonts are loading (check `<link>` in HTML head)

---

## Issue Severity Levels

**Critical (must fix before demo):**
- Site doesn't render / blank page
- CSS not loading (unstyled content)
- Phone number wrong or missing
- Horizontal overflow on mobile
- Broken images in hero section

**High (should fix):**
- Cards misaligned in grid
- Fewer than 6 tel: links
- No floating mobile CTA
- Text too small on mobile (< 16px body)
- Hero has excessive dead space on mobile

**Medium (nice to fix):**
- Placeholder text in non-critical sections
- Inconsistent spacing between sections
- Animation not firing on certain sections
- Missing lazy loading on images

**Low (polish):**
- Slight color inconsistencies
- Animation timing could be smoother
- Minor typography hierarchy issues

---

## Verification Script

The subagent should:

1. Navigate to the URL with Playwright
2. Take screenshot at 1024px width
3. Resize to 768px, take screenshot
4. Resize to 390px, take screenshot
5. Scroll to bottom on mobile, take screenshot (check floating CTA)
6. Count all `tel:` links in the DOM
7. Check for console errors
8. Check all `<img>` elements for 404 responses
9. Verify OakWind footer exists
10. Report findings with severity levels

Return a structured report:
```
✅ PASS / ❌ FAIL — [check name]
  Details: ...
```
