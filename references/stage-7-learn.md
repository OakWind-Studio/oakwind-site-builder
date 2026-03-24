# Stage 7 — Learn

> Record build decisions and outcomes for future builds. Output: updated intelligence files that inform recipe selection, palette rotation, and anti-convergence in future sessions.

---

## 0. Save Triggers & Timing

**When to save — non-negotiable:**

1. **`builds.json` + `recipe-scores.json`** — Save IMMEDIATELY after Stage 5 completes, before entering Stage 6. Record the raw pass/fail results as-is, even if every dimension failed. Refinement (Stage 6) does not retroactively update these scores — Stage 5 results are the ground truth.
2. **`fingerprints.json`** — Save AFTER Stage 5, not after Stage 6 refinement. The fingerprint captures what was built, not what was patched. If Stage 6 swaps a recipe entirely (not just CSS tweaks), append a second fingerprint entry with a `refined: true` flag.
3. **`anti-patterns.json`** — Save AFTER Stage 6 refinement, only when a dimension failed AND the fix involved swapping out a recipe (not just CSS/copy adjustments). Record the original recipe, not the replacement.
4. **`claude-mem`** — Save after all intelligence files are written (end of Stage 7).

**Why before refinement:** Scores must reflect how recipes perform out-of-the-box. If we scored post-refinement, every recipe would trend toward passing and the data would be useless for predicting which recipes need help.

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
- **avgScore** — computed using a running weighted average:

```
recipeScore = dimensionsPassedCount / 9
newAvgScore = (existingAvgScore * existingUsedCount + recipeScore) / (existingUsedCount + 1)
```

Example: recipe "gradient-editorial" has `used: 4, avgScore: 7.5`. New build passes 6/9 dimensions → `recipeScore = 6/9 = 0.667` (scaled to 6.0 out of 9). New avgScore = `(7.5 * 4 + 6.0) / 5 = 7.2`.

**Stage 0 consumption thresholds:**
- **avgScore < 5** (out of 9) in this niche → deprioritize during Stage 3 filtering (still selectable, but only if no better option exists)
- **avgScore < 3** in this niche → exclude entirely (treat as soft anti-pattern)
- **avgScore > 8** → preferred candidate, boost during Stage 3 filtering

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

If a specific pattern caused problems during the build, add it to `intelligence/anti-patterns.json`.

**Recording rules — all three conditions must be true:**
1. A dimension FAILED in Stage 5
2. The Stage 6 fix involved SWAPPING the recipe (not just tweaking CSS, copy, or spacing)
3. The failure is reproducible (niche-specific content mismatch, not a one-off coding error)

Record the ORIGINAL recipe (the one that failed), not the replacement:

```json
{
  "recipe": "video-ambient",
  "section": "hero",
  "niche": "dental",
  "dimension": "polish",
  "issue": "Fell back to static image with video container, looked broken",
  "fix": "Swapped to gradient-editorial. Check for actual video content before selecting video-dependent recipes.",
  "date": "2026-03-22"
}
```

**Stage 0 consumption:** During Stage 0, if an anti-pattern matches the current niche AND the same recipe+section combination, EXCLUDE that recipe from Stage 3 selection entirely. No exceptions — anti-patterns are hard blocks, not soft suggestions.

Anti-patterns do NOT expire. They can only be removed by `/oakwind-evolve` after manual review.

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
