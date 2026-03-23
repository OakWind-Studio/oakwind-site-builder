# Stage 7 — Learn

> Record build decisions and outcomes for future builds. Output: updated intelligence files that inform recipe selection, palette rotation, and anti-convergence in future sessions.

---

## 1. Build Record Format

Create or append to `intelligence/builds.json`:

```json
{
  "slug": "sonrisas-dental",
  "niche": "dental",
  "date": "2026-03-22",
  "personality": {
    "energy": "calm",
    "formality": "formal",
    "boldness": "subtle",
    "era": "modern",
    "preset": "calmFormal"
  },
  "architecture": "standard",
  "palette": "arctic-blue",
  "fontPairing": "Cormorant Garamond + Outfit",
  "typeScale": "major-third",
  "tier": 3,
  "mode": "light",
  "recipes": {
    "hero": "gradient-editorial",
    "services": "bento-mixed-grid",
    "testimonials": "carousel-cards",
    "cta": "gradient-cta-band",
    "about": "split-narrative",
    "nav": "glass-topbar",
    "footer": "stacked-footer"
  },
  "fingerprint": "hero:gradient-editorial|svc:bento-mixed-grid|test:carousel-cards|cta:gradient-cta-band|arch:standard|palette:arctic-blue|fonts:cormorant-outfit|personality:calmFormal",
  "passedDimensions": ["hierarchy", "animation", "responsive", "conversion", "copy", "uniqueness", "performance", "accessibility", "polish"],
  "failedDimensions": [],
  "slopGate": "10/10",
  "refinementIterations": 0,
  "feedback": ""
}
```

---

## 2. Where to Write

| File | Purpose | Format |
|------|---------|--------|
| `intelligence/builds.json` | Complete build records | Array of build objects (see above) |
| `intelligence/recipe-scores.json` | Per-recipe pass/fail tracking | `{ "recipe-name": { "used": N, "passed": N, "failed": N } }` |
| `intelligence/fingerprints.json` | Fingerprint index for similarity checks | `{ "niche": [{ "slug": "...", "fingerprint": "...", "date": "..." }] }` |
| `intelligence/anti-patterns.json` | Patterns that failed or caused issues | `[{ "pattern": "...", "niche": "...", "issue": "...", "date": "..." }]` |

Create the `intelligence/` directory if it does not exist. Create each file with an empty array `[]` or object `{}` if it does not exist.

---

## 3. Recipe Scoring

For each recipe used in this build, update `intelligence/recipe-scores.json`:

```json
{
  "gradient-editorial": {
    "used": 5,
    "passed": 4,
    "failed": 1,
    "lastUsed": "2026-03-22",
    "niches": ["dental", "med-spa", "law-firm", "dental", "attorney"],
    "avgScore": 8.2
  }
}
```

Scoring rules:
- **passed** increments if the recipe's section passed all relevant dimensions in Stage 5
- **failed** increments if the recipe's section was flagged as a problem in any dimension
- **avgScore** is the average dimension pass count (out of 9) across all builds using this recipe

Low-scoring recipes (avgScore < 6) should be deprioritized in future Stage 3 recipe selection. High-scoring recipes (avgScore > 8) are preferred candidates.

---

## 4. What NOT to Save

Do not record:
- **Ephemeral details** — debug attempts, temporary workarounds, one-off fixes
- **Redundant observations** — things already captured in the recipe or palette files themselves
- **Code patterns** — the recipes ARE the code patterns; don't duplicate them in intelligence files
- **Personal opinions** — stick to measurable outcomes (pass/fail, scores, specific issues)
- **Client personal data** — no phone numbers, addresses, or owner names in intelligence files

---

## 5. Anti-Pattern Recording

If a specific pattern caused problems during the build, add it to `intelligence/anti-patterns.json`:

```json
{
  "pattern": "Using video-ambient hero on a business with no video content",
  "niche": "dental",
  "issue": "Fell back to static image with video container, looked broken",
  "dimension": "polish",
  "date": "2026-03-22",
  "fix": "Check for actual video content before selecting video-dependent recipes"
}
```

These anti-patterns are checked during Stage 3 recipe selection to avoid repeating mistakes.

---

## 6. Fingerprint Storage

Append the build's fingerprint to `intelligence/fingerprints.json`, indexed by niche:

```json
{
  "dental": [
    {
      "slug": "sonrisas-dental",
      "fingerprint": "hero:gradient-editorial|svc:bento-mixed-grid|...",
      "date": "2026-03-22"
    }
  ]
}
```

This index is read during Stage 2 (fingerprint generation) and Stage 3 (recipe freshness check) to ensure same-niche builds stay visually distinct.

---

## 7. Claude-Mem Save

Save key build decisions to persistent memory using claude-mem with the standardized tag:

```
oakwind:build-log:{slug}
```

Include: niche, palette, font pairing, architecture, personality preset, dimension scores, and any notable learnings. This allows future sessions to recall past build decisions without reading the intelligence files.

---

## 8. Evolution Suggestion

After all intelligence files are updated, suggest:

> "Build #{N} saved. Run `/oakwind-evolve` when ready."

The evolve command (future) will analyze accumulated intelligence to:
- Identify consistently high-performing recipe + palette + font combinations
- Surface niches that need more recipe variety
- Recommend new recipes to create based on gaps in coverage
- Flag stale recipes that haven't been used or score poorly
