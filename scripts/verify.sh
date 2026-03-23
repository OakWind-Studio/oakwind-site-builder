#!/bin/bash
# ============================================================
# OakWind v2 — Automated Verify Script
# Usage: bash scripts/verify.sh [project-dir]
# Default project-dir: "."
# ============================================================

PROJECT_DIR="${1:-.}"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "ERROR: Directory '$PROJECT_DIR' does not exist"
  exit 1
fi

cd "$PROJECT_DIR" || exit 1

PASS=0
FAIL=0
WARN=0

pass() {
  echo "  [PASS] $1"
  PASS=$((PASS + 1))
}

fail() {
  echo "  [FAIL] $1"
  FAIL=$((FAIL + 1))
}

warn() {
  echo "  [WARN] $1"
  WARN=$((WARN + 1))
}

divider() {
  echo ""
  echo "--- $1 ---"
}

# ============================================================
divider "BUILD"
# ============================================================

if npm run build > /dev/null 2>&1; then
  pass "Build succeeds"
else
  fail "Build failed — fix errors before continuing"
  echo ""
  echo "=== RESULTS ==="
  echo "  Passed:   $PASS"
  echo "  Failed:   $FAIL"
  echo "  Warnings: $WARN"
  exit 1
fi

# ============================================================
divider "PERFORMANCE"
# ============================================================

# Bundle size: sum all JS files in dist/assets/
if [ -d "dist/assets" ]; then
  BUNDLE_BYTES=$(find dist/assets -name "*.js" -exec wc -c {} + 2>/dev/null | tail -1 | awk '{print $1}')
  BUNDLE_BYTES=${BUNDLE_BYTES:-0}
  BUNDLE_KB=$((BUNDLE_BYTES / 1024))
  if [ "$BUNDLE_BYTES" -lt 512000 ]; then
    pass "JS bundle < 500KB (${BUNDLE_KB}KB)"
  else
    fail "JS bundle >= 500KB (${BUNDLE_KB}KB) — trim dependencies"
  fi
else
  fail "dist/assets/ not found after build"
fi

# ============================================================
divider "HTML HEAD"
# ============================================================

# Title check — must not be default Vite title
if [ -f "index.html" ]; then
  if grep -q "Vite + React" index.html 2>/dev/null; then
    fail "Page title is still 'Vite + React' — set a real title"
  else
    TITLE=$(grep -oP '(?<=<title>).*?(?=</title>)' index.html 2>/dev/null)
    if [ -n "$TITLE" ]; then
      pass "Page title set: '$TITLE'"
    else
      fail "No <title> tag found in index.html"
    fi
  fi
else
  fail "index.html not found in project root"
fi

# Meta description
if grep -q 'name="description"' index.html 2>/dev/null; then
  pass "Meta description present"
else
  fail "Meta description missing — add <meta name=\"description\" content=\"...\">"
fi

# Emoji favicon (data:image/svg or emoji-based favicon)
if grep -q "data:image/svg" index.html 2>/dev/null; then
  pass "Emoji favicon set"
else
  warn "Emoji favicon not detected — consider adding one in <link rel=\"icon\">"
fi

# ============================================================
divider "CONVERSION"
# ============================================================

# tel: link count across all JSX and JS source files
TEL_COUNT=$(grep -r "tel:" src/ --include="*.jsx" --include="*.js" 2>/dev/null | wc -l)
TEL_COUNT=$(echo "$TEL_COUNT" | tr -d '[:space:]')
if [ "$TEL_COUNT" -ge 6 ]; then
  pass "tel: links >= 6 (found $TEL_COUNT)"
else
  fail "tel: links < 6 (found $TEL_COUNT) — need header, hero, mid-CTA, contact, footer, floating bar"
fi

# OakWind footer attribution
if grep -r "oakwindstudio\.com" src/ --include="*.jsx" --include="*.js" > /dev/null 2>&1; then
  pass "OakWind footer present (oakwindstudio.com link found)"
else
  fail "OakWind footer missing — add 'Website by OakWind Studio' linked to oakwindstudio.com"
fi

# ============================================================
divider "CONTENT"
# ============================================================

# Placeholder / lorem ipsum text
PLACEHOLDER_HITS=$(grep -riE "lorem ipsum|placeholder text|your business name|your company|insert (name|text|logo)" src/ --include="*.jsx" --include="*.js" 2>/dev/null | wc -l)
PLACEHOLDER_HITS=$(echo "$PLACEHOLDER_HITS" | tr -d '[:space:]')
if [ "$PLACEHOLDER_HITS" -gt 0 ]; then
  fail "Placeholder text found ($PLACEHOLDER_HITS occurrence(s)) — replace with real content"
else
  pass "No placeholder text detected"
fi

# ============================================================
divider "CSS HYGIENE"
# ============================================================

# overflow-x: hidden on html (should only be on body, not html)
if grep -rE "html.*overflow-x\s*:\s*hidden|overflow-x\s*:\s*hidden.*html" src/ --include="*.css" 2>/dev/null | grep -iv "body" > /dev/null 2>&1; then
  fail "overflow-x: hidden found on html element — move to body only"
else
  pass "No overflow-x: hidden on html (correct)"
fi

# scroll-behavior: smooth conflict (Lenis or custom scroll handling should own this)
if grep -rE "scroll-behavior\s*:\s*smooth" src/ --include="*.css" 2>/dev/null > /dev/null 2>&1; then
  warn "scroll-behavior: smooth in CSS — may conflict with Lenis/custom scroll; remove if using JS scroll"
else
  pass "No scroll-behavior: smooth conflict"
fi

# ============================================================
divider "SUMMARY"
# ============================================================

TOTAL=$((PASS + FAIL + WARN))

echo ""
echo "=== RESULTS ==="
echo "  Passed:   $PASS"
echo "  Failed:   $FAIL"
echo "  Warnings: $WARN"
echo "  Total:    $TOTAL checks"
echo ""

if [ "$FAIL" -eq 0 ] && [ "$WARN" -eq 0 ]; then
  echo "All checks passed. Proceed to manual 9-dimension scoring."
  exit 0
elif [ "$FAIL" -eq 0 ]; then
  echo "All hard checks passed ($WARN warning(s)). Review warnings, then proceed to manual scoring."
  exit 0
else
  echo "$FAIL check(s) failed. Fix before proceeding to Stage 5 verification."
  exit 1
fi
