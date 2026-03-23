#!/bin/bash
# OakWind Oracle — calls ui-ux-pro-max design system generator
# Usage: bash oracle.sh "dental calm formal modern"
# Returns: design system recommendations or FALLBACK message

QUERY="$1"
if [ -z "$QUERY" ]; then
  echo "Usage: oracle.sh '<niche> <personality keywords>'"
  exit 1
fi

# Find ui-ux-pro-max search.py
UPM_SCRIPT=$(find "$HOME/.claude/plugins/cache/ui-ux-pro-max-skill" -name "search.py" -path "*/scripts/*" 2>/dev/null | head -1)

if [ -z "$UPM_SCRIPT" ]; then
  echo "FALLBACK: ui-ux-pro-max not found. Use curated palettes and font pairings from references/."
  exit 0
fi

echo "=== OakWind Oracle ==="
echo "Query: $QUERY"
echo ""

python3 "$UPM_SCRIPT" "$QUERY" --design-system 2>/dev/null

if [ $? -ne 0 ]; then
  echo "FALLBACK: Oracle call failed. Use curated palettes and font pairings from references/."
  exit 0
fi
