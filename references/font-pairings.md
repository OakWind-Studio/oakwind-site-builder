# Curated Font Pairings — v2

25 tested, beautiful pairings from Google Fonts organized by mood. Each pairing includes exact Google Fonts import URLs, CSS variable values, personality mappings, and niche recommendations.

The font pairing sets the entire typographic personality of the site. It's the second biggest quality signal after color — and the most common way AI-built sites expose themselves.

---

## Banned Fonts (never use as primary display)

- **Inter** — the #1 AI tell. Never as display, never as primary body choice.
- **Roboto** — Android system font. Screams "default."
- **Arial / Helvetica** — system defaults signal zero design effort.
- **Space Grotesk** — was trendy in 2023, now overexposed in AI output.
- **Poppins** — acceptable ONLY as body text, never as display. Even as body, prefer alternatives.

---

## Selection Guidance

1. **Match mood to personality.** Map the Business Personality Profile to the right mood category. `calmFormal` → Elegant & Refined. `boldEnergetic` → Bold & Confident. Don't fight the personality with a mismatched font.
2. **Rotate within category for same-niche builds.** If you just built a dental site with DM Serif Display + DM Sans, the next dental site gets Cormorant Garamond + Outfit or Playfair Display + Source Sans 3.
3. **The display font IS the personality.** The body font's job is to be readable and stay out of the way. Get creative with display fonts, not body fonts.
4. **Contrast display and body.** Serif display + sans body is the safest bet. Sans display + sans body works when the weights and widths contrast strongly.
5. **Test at hero size.** Mentally render the business name at 80pt in the display font. "PRECISION AUTO DETAILING" in Bebas Neue = bold. In Cormorant Garamond = wrong niche.

---

## Elegant & Refined

### 1. DM Serif Display + DM Sans
**Mood:** Elegant & Refined
**Personality:** calmFormal, subtleElegant
**Best for:** med spa, cosmetic dental, boutique law, wedding venue
**Why it works:** High-contrast serif display with matching geometric sans — same design DNA, different voices.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "DM Serif Display", serif;
--font-body: "DM Sans", sans-serif;
```

### 2. Cormorant Garamond + Outfit
**Mood:** Elegant & Refined
**Personality:** calmFormal, subtleElegant
**Best for:** boutique law firm, high-end realtor, fine dining, wedding venue
**Why it works:** Ultra-elegant editorial serif with a modern geometric sans. Feels like Vogue — the contrast between ornate display and clean body creates instant sophistication.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Cormorant Garamond", serif;
--font-body: "Outfit", sans-serif;
```

### 3. Playfair Display + Source Sans 3
**Mood:** Elegant & Refined
**Personality:** calmFormal, traditionalTrust
**Best for:** attorney, traditional dental, formal professional services
**Why it works:** Classic, authoritative serif paired with a highly readable sans-serif. Timeless pairing that conveys establishment and trust without feeling stuffy.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Playfair Display", serif;
--font-body: "Source Sans 3", sans-serif;
```

### 4. Libre Baskerville + Karla
**Mood:** Elegant & Refined
**Personality:** calmFormal, traditionalTrust
**Best for:** home builder, traditional business, established brand, realtor
**Why it works:** Warm, trustworthy book-quality serif with a friendly geometric sans. The Baskerville heritage signals gravitas while Karla keeps body text modern and readable.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Karla:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Libre Baskerville", serif;
--font-body: "Karla", sans-serif;
```

### 5. Lora + Nunito Sans
**Mood:** Elegant & Refined
**Personality:** calmFormal, subtleElegant
**Best for:** wellness spa, upscale restaurant, interior designer, boutique hotel
**Why it works:** Lora's calligraphy-inspired curves bring warmth to the serif genre. Paired with Nunito Sans's rounded neutrality, it feels approachable yet refined — never cold.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Nunito+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Lora", serif;
--font-body: "Nunito Sans", sans-serif;
```

---

## Bold & Confident

### 6. Bebas Neue + Nunito
**Mood:** Bold & Confident
**Personality:** boldEnergetic, rugged
**Best for:** detailing, barber, pressure washing, trendy restaurant, bold brand
**Why it works:** Powerful condensed uppercase display with soft, approachable body text. The extreme contrast between Bebas's intensity and Nunito's friendliness creates visual drama without alienating.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Bebas Neue", sans-serif;
--font-body: "Nunito", sans-serif;
```

### 7. Oswald + Lato
**Mood:** Bold & Confident
**Personality:** boldEnergetic, rugged
**Best for:** auto repair, HVAC, roofing, contractor, industrial service
**Why it works:** Strong condensed sans with a clean, readable body. Feels mechanical and reliable — the condensed width signals efficiency, while Lato's humanist touches keep it from feeling robotic.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Oswald", sans-serif;
--font-body: "Lato", sans-serif;
```

### 8. Archivo Black + Work Sans
**Mood:** Bold & Confident
**Personality:** boldEnergetic, rugged
**Best for:** pressure washing, bold restaurant, energetic service, sports facility
**Why it works:** Ultra-bold display with a clean, versatile body. In-your-face but professional — Archivo Black's heaviness demands attention while Work Sans provides neutral, readable contrast.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Archivo Black", sans-serif;
--font-body: "Work Sans", sans-serif;
```

### 9. Anton + Cabin
**Mood:** Bold & Confident
**Personality:** boldEnergetic, playfulCreative
**Best for:** trendy restaurant, nightlife, food truck, bold casual dining
**Why it works:** Massive impact headlines with a warm, humanist body. Billboard energy — Anton commands the room while Cabin's subtle roundedness keeps the overall feel inviting rather than aggressive.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Cabin:wght@400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Anton", sans-serif;
--font-body: "Cabin", sans-serif;
```

### 10. Barlow Condensed + Barlow
**Mood:** Bold & Confident
**Personality:** boldEnergetic, rugged
**Best for:** contractor, home services, fleet branding, manufacturing, logistics
**Why it works:** Same font family in two widths creates cohesion with built-in contrast. The condensed display feels industrial and space-efficient; the regular-width body is effortlessly readable. Shared DNA, zero conflict.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Barlow Condensed", sans-serif;
--font-body: "Barlow", sans-serif;
```

---

## Warm & Approachable

### 11. Quicksand + Nunito Sans
**Mood:** Warm & Approachable
**Personality:** warmFriendly, playfulCreative
**Best for:** family restaurant, pediatric dental, friendly service, wellness
**Why it works:** Rounded, friendly display with a matching soft body. Both fonts share rounded terminals that create a cohesive warmth — inviting without being childish.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Nunito+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Quicksand", sans-serif;
--font-body: "Nunito Sans", sans-serif;
```

### 12. Josefin Sans + Open Sans
**Mood:** Warm & Approachable
**Personality:** warmFriendly, calmFormal
**Best for:** bakery, cafe, landscaping, casual professional service
**Why it works:** Geometric elegance with a universally readable body. Josefin's vintage-inspired letterforms add character while Open Sans handles paragraphs with zero friction.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Josefin Sans", sans-serif;
--font-body: "Open Sans", sans-serif;
```

### 13. Sora + DM Sans
**Mood:** Warm & Approachable
**Personality:** warmFriendly, subtleElegant
**Best for:** med spa, modern wellness, aesthetic clinic, clean brand
**Why it works:** Contemporary geometric display with a clean geometric body. Feels Apple-adjacent — both fonts are warm without being soft, modern without being cold.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Sora", sans-serif;
--font-body: "DM Sans", sans-serif;
```

### 14. Outfit + Plus Jakarta Sans
**Mood:** Warm & Approachable
**Personality:** warmFriendly, subtleElegant
**Best for:** modern dental, family practice, co-working space, boutique fitness
**Why it works:** Two premium geometric sans-serifs that both feel designed (not defaulted). Outfit's slightly wider letterforms create display authority while Plus Jakarta Sans reads beautifully at small sizes.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Outfit", sans-serif;
--font-body: "Plus Jakarta Sans", sans-serif;
```

### 15. Nunito + Mulish
**Mood:** Warm & Approachable
**Personality:** warmFriendly, playfulCreative
**Best for:** daycare, pet groomer, family service, community organization
**Why it works:** Both fonts have rounded terminals and friendly proportions, but Nunito's bolder weights create clear hierarchy. Together they feel like a hug — warm, safe, and welcoming.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&family=Mulish:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Nunito", sans-serif;
--font-body: "Mulish", sans-serif;
```

---

## Modern & Clean

### 16. Montserrat + Hind
**Mood:** Modern & Clean
**Personality:** modernMinimal, calmFormal
**Best for:** home service, contractor, modern professional, tech-forward
**Why it works:** Versatile geometric display with an efficient, readable body. Montserrat's wide letter-spacing at heavy weights feels premium; Hind's Devanagari-derived rhythm makes body text flow naturally.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Montserrat", sans-serif;
--font-body: "Hind", sans-serif;
```

### 17. Lexend + Inter Tight
**Mood:** Modern & Clean
**Personality:** modernMinimal, subtleElegant
**Best for:** modern dental, tech service, startup, clean brand
**Why it works:** Lexend was literally designed for readability — it reduces visual noise. Inter Tight's condensed proportions create density without clutter. Together they feel optimized and intentional.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Inter+Tight:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Lexend", sans-serif;
--font-body: "Inter Tight", sans-serif;
```

### 18. Urbanist + Plus Jakarta Sans
**Mood:** Modern & Clean
**Personality:** modernMinimal, subtleElegant
**Best for:** modern realtor, contemporary professional, upscale service
**Why it works:** Geometric with subtle personality, paired with a premium-feeling body. Urbanist's slightly quirky letterforms prevent the generic geometric trap while Plus Jakarta Sans grounds everything in readability.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Urbanist", sans-serif;
--font-body: "Plus Jakarta Sans", sans-serif;
```

### 19. Manrope + DM Sans
**Mood:** Modern & Clean
**Personality:** modernMinimal, warmFriendly
**Best for:** SaaS-adjacent service, fintech, modern law firm, consulting
**Why it works:** Manrope's slightly condensed proportions and distinct character set it apart from generic sans-serifs. DM Sans provides the perfect neutral partner — designed by the same philosophy of precision geometry.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Manrope", sans-serif;
--font-body: "DM Sans", sans-serif;
```

### 20. Figtree + Outfit
**Mood:** Modern & Clean
**Personality:** modernMinimal, warmFriendly
**Best for:** creative agency, modern clinic, coworking, lifestyle brand
**Why it works:** Figtree is one of Google Fonts' newest geometric sans-serifs — fresh and not yet overexposed. Its open apertures pair beautifully with Outfit's slightly wider proportions. Both feel designed, not defaulted.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Figtree", sans-serif;
--font-body: "Outfit", sans-serif;
```

---

## Editorial & Distinctive

### 21. Fraunces + Commissioner
**Mood:** Editorial & Distinctive
**Personality:** playfulCreative, subtleElegant
**Best for:** artisan restaurant, craft business, unique brand, wine bar
**Why it works:** Quirky, opinionated variable serif with a balanced geometric sans. Fraunces' "wonky" axis creates memorable headlines that no AI would default to — it's too specific, too designed. Commissioner provides clean counterbalance.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Commissioner:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Fraunces", serif;
--font-body: "Commissioner", sans-serif;
```

### 22. Bitter + Raleway
**Mood:** Editorial & Distinctive
**Personality:** traditionalTrust, calmFormal
**Best for:** traditional restaurant, family business, established brand, pub
**Why it works:** Strong slab serif with an elegant, wide-set sans-serif. Bitter's slab serifs feel grounded and substantial — like carved signage. Raleway's wide tracking creates a feeling of openness and refinement in body text.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;0,700;0,800;1,400&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Bitter", serif;
--font-body: "Raleway", sans-serif;
```

### 23. Vollkorn + Fira Sans
**Mood:** Editorial & Distinctive
**Personality:** traditionalTrust, subtleElegant
**Best for:** bookshop, law office, academic institution, heritage brand
**Why it works:** Vollkorn is a robust text serif designed for screen — it reads beautifully at all sizes. Fira Sans (Mozilla's open-source sans) provides a technical yet friendly complement. Together they feel like a well-edited publication.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Fira+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Vollkorn", serif;
--font-body: "Fira Sans", sans-serif;
```

### 24. Crimson Pro + Atkinson Hyperlegible
**Mood:** Editorial & Distinctive
**Personality:** calmFormal, traditionalTrust
**Best for:** healthcare, senior care, accessibility-focused brand, nonprofit
**Why it works:** Crimson Pro is a refined text serif with sharp details. Atkinson Hyperlegible (designed by the Braille Institute) is literally the most readable sans-serif available — every letterform is maximally distinct. This pairing signals "we care about every user."
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Crimson Pro", serif;
--font-body: "Atkinson Hyperlegible", sans-serif;
```

### 25. Merriweather + Lato
**Mood:** Editorial & Distinctive
**Personality:** traditionalTrust, calmFormal
**Best for:** law firm, insurance agency, financial advisor, church, established brand
**Why it works:** Merriweather was designed specifically for screen readability — its generous x-height and strong serifs work at any size. Lato's humanist warmth prevents the pairing from feeling sterile. A classic combination that ages well and reads perfectly.
**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
```
**@theme values:**
```css
--font-display: "Merriweather", serif;
--font-body: "Lato", sans-serif;
```
