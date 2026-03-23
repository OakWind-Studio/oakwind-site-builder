#!/bin/bash
# OakWind v2 Verify Script
# Usage: bash verify.sh <project-dir>
# Runs automated checks and reports results

PROJECT_DIR="${1:-.}"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "ERROR: Directory $PROJECT_DIR does not exist"
  exit 1
fi

cd "$PROJECT_DIR"

PASS=0
FAIL=0
WARN=0

check() {
  local name="$1"
  local result="$2"
  if [ "$result" = "pass" ]; then
    echo "  ✅ $name"
    PASS=$((PASS + 1))
  elif [ "$result" = "warn" ]; then
    echo "  ⚠️  $name"
    WARN=$((WARN + 1))
  else
    echo "  ❌ $name"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== OakWind v2 Verify ==="
echo ""

# Build check
echo "📦 Build"
if npm run build > /dev/null 2>&1; then
  check "Build succeeds" "pass"
else
  check "Build succeeds" "fail"
  echo "  Build failed — fix errors before continuing"
  exit 1
fi

# Bundle size
echo ""
echo "📊 Performance"
BUNDLE_SIZE=$(du -sb dist/assets/*.js 2>/dev/null | awk '{sum+=$1} END {print sum}')
if [ -z "$BUNDLE_SIZE" ] || [ "$BUNDLE_SIZE" -lt 500000 ]; then
  check "JS bundle <500KB ($((BUNDLE_SIZE / 1024))KB)" "pass"
else
  check "JS bundle <500KB ($((BUNDLE_SIZE / 1024))KB)" "fail"
fi

# Title check
echo ""
echo "📄 HTML Head"
if grep -q "Vite + React" index.html 2>/dev/null; then
  check "Page title (not 'Vite + React')" "fail"
else
  check "Page title customized" "pass"
fi

# Meta description
if grep -q 'name="description"' index.html 2>/dev/null; then
  check "Meta description present" "pass"
else
  check "Meta description present" "fail"
fi

# Favicon
if grep -q "data:image/svg" index.html 2>/dev/null; then
  check "Emoji favicon set" "pass"
else
  check "Emoji favicon set" "warn"
fi

# Tel links
echo ""
echo "📞 Conversion"
TEL_COUNT=$(grep -r "tel:" src/ --include="*.jsx" --include="*.js" 2>/dev/null | wc -l)
if [ "$TEL_COUNT" -ge 6 ]; then
  check "tel: links ≥6 (found $TEL_COUNT)" "pass"
else
  check "tel: links ≥6 (found $TEL_COUNT)" "fail"
fi

# OakWind footer
if grep -r "oakwindstudio.com" src/ --include="*.jsx" --include="*.js" > /dev/null 2>&1; then
  check "OakWind footer present" "pass"
else
  check "OakWind footer present" "fail"
fi

# Placeholder text
echo ""
echo "📝 Content"
if grep -ri "lorem ipsum\|placeholder\|your business\|business name" src/ --include="*.jsx" --include="*.js" > /dev/null 2>&1; then
  check "No placeholder text" "fail"
else
  check "No placeholder text" "pass"
fi

# overflow-x check
echo ""
echo "🎨 CSS"
if grep -r "overflow-x.*hidden" src/index.css 2>/dev/null | grep -v "body" | grep "html" > /dev/null 2>&1; then
  check "No overflow-x: hidden on html (only body)" "fail"
else
  check "overflow-x: hidden only on body" "pass"
fi

# Smooth scroll conflict
if grep -r "scroll-behavior.*smooth" src/ --include="*.css" > /dev/null 2>&1; then
  check "No scroll-behavior: smooth (Lenis handles it)" "warn"
else
  check "No scroll-behavior: smooth conflict" "pass"
fi

# Summary
echo ""
echo "=== Results ==="
echo "  ✅ Passed: $PASS"
echo "  ❌ Failed: $FAIL"
echo "  ⚠️  Warnings: $WARN"
echo ""

if [ "$FAIL" -eq 0 ]; then
  echo "All automated checks passed. Run the 9-dimension manual check next."
else
  echo "$FAIL check(s) failed. Fix before proceeding to Stage 5 verification."
  exit 1
fi
