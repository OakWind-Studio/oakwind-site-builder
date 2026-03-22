#!/bin/bash
# Usage: bash download-fonts.sh "Cormorant+Garamond:wght@400;700" "Outfit:wght@300;400;500"
# Downloads .woff2 from Google Fonts API to public/fonts/ and outputs @font-face CSS

FONTS_DIR="public/fonts"
mkdir -p "$FONTS_DIR"

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

for FONT_SPEC in "$@"; do
  FONT_URL="https://fonts.googleapis.com/css2?family=${FONT_SPEC}&display=swap"
  echo "Fetching: $FONT_URL"
  CSS=$(curl -s -H "User-Agent: $UA" "$FONT_URL")

  if [ -z "$CSS" ]; then
    echo "  ERROR: No CSS returned for $FONT_SPEC"
    continue
  fi

  echo "$CSS" | grep -oP 'url\(\K[^)]+\.woff2' | while read -r WOFF_URL; do
    FILENAME=$(echo "$WOFF_URL" | grep -oP '[^/]+$')
    curl -s -o "${FONTS_DIR}/${FILENAME}" "$WOFF_URL"
    echo "  Downloaded: ${FILENAME}"
  done

  echo ""
  echo "/* === @font-face for ${FONT_SPEC} === */"
  echo "$CSS"
  echo ""
done

echo "Done. Copy the @font-face blocks above into your design tokens."
