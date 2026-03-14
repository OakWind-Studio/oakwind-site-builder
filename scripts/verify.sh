#!/usr/bin/env bash
# OakWind Site Builder — Verify Pipeline
# Usage: bash scripts/verify.sh [project-dir]
# Runs build, lint, and basic checks on the mockup project.

set -euo pipefail

PROJECT_DIR="${1:-.}"

if [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo "❌ No package.json found in $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"
echo "🔍  Verifying OakWind build: $(basename $(pwd))"
echo ""

PASS=0
FAIL=0

run_check() {
  local label="$1"
  shift
  echo -n "  [$label] "
  if "$@" > /tmp/oakwind-verify-output.log 2>&1; then
    echo "✅ PASS"
    PASS=$((PASS + 1))
  else
    echo "❌ FAIL"
    cat /tmp/oakwind-verify-output.log | head -20
    FAIL=$((FAIL + 1))
  fi
}

# Step 1: Build
echo "── Build ──"
run_check "npm run build" npm run build

# Step 2: Lint (non-blocking — warn only)
echo ""
echo "── Lint ──"
if command -v npx &> /dev/null && npx eslint --version &> /dev/null; then
  run_check "ESLint" npx eslint src/ --max-warnings=10
else
  echo "  [ESLint] ⏭️  Skipped (not installed)"
fi

# Step 3: Content checks
echo ""
echo "── Content ──"

# Check for OakWind footer
if grep -rq "OakWind Studio" src/; then
  echo "  [OakWind footer] ✅ PASS"
  PASS=$((PASS + 1))
else
  echo "  [OakWind footer] ❌ FAIL — Missing 'Website by OakWind Studio'"
  FAIL=$((FAIL + 1))
fi

# Check for tel: link
if grep -rq 'tel:' src/; then
  echo "  [Click-to-call] ✅ PASS"
  PASS=$((PASS + 1))
else
  echo "  [Click-to-call] ❌ FAIL — No tel: link found"
  FAIL=$((FAIL + 1))
fi

# Check for smooth scroll
if grep -rq 'scroll-behavior' src/ || grep -rq 'scroll-behavior' src/**/*.css 2>/dev/null; then
  echo "  [Smooth scroll] ✅ PASS"
  PASS=$((PASS + 1))
else
  echo "  [Smooth scroll] ⚠️  WARN — No scroll-behavior: smooth found"
fi

# Step 4: Bundle size check
echo ""
echo "── Performance ──"
if [ -d "dist" ]; then
  TOTAL_SIZE=$(du -sk dist/ | cut -f1)
  if [ "$TOTAL_SIZE" -lt 500 ]; then
    echo "  [Bundle size] ✅ PASS — ${TOTAL_SIZE}KB (under 500KB)"
    PASS=$((PASS + 1))
  else
    echo "  [Bundle size] ⚠️  WARN — ${TOTAL_SIZE}KB (target: under 500KB)"
  fi
else
  echo "  [Bundle size] ⏭️  Skipped (no dist/ directory)"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Results: $PASS passed, $FAIL failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "Fix the failures above before deploying."
  exit 1
else
  echo ""
  echo "✅ All checks passed. Ready to deploy:"
  echo "   npx wrangler pages deploy dist --project-name=$(basename $(pwd))"
fi
