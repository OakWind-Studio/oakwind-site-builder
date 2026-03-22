#!/usr/bin/env bash
# OakWind Site Builder v2 — Project Scaffold
# Usage: bash scripts/scaffold.sh <project-slug> [light|dark]
# Creates a Vite + React 18 + Tailwind CSS v4 project with shared-lib pre-wired.

set -euo pipefail

PROJECT_NAME="${1:?Usage: scaffold.sh <project-slug> [light|dark]}"
MODE="${2:-light}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -d "$PROJECT_NAME" ]; then
  echo "Error: Directory '$PROJECT_NAME' already exists."
  exit 1
fi

echo "=== OakWind v2 Scaffold ==="
echo "Project: $PROJECT_NAME"
echo "Mode: $MODE"
echo ""

# 1. Create Vite + React project
npm create vite@latest "$PROJECT_NAME" -- --template react
cd "$PROJECT_NAME"

# 2. Overwrite package.json with pinned dependencies
cat > package.json << EOF
{
  "name": "${PROJECT_NAME}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^12.0.0",
    "lucide-react": "^0.468.0",
    "lenis": "^1.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0",
    "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0"
  }
}
EOF

# 3. Copy shared-lib into src/lib/
cp -r "$SKILL_DIR/shared-lib/" src/lib/

# 4. Write vite.config.js
cat > vite.config.js << 'VITE_EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
VITE_EOF

# 5. Write src/index.css
cat > src/index.css << 'CSS_EOF'
@import "tailwindcss";

/* === CSS-Native Animations === */
@import "./lib/animations/css-native/view-reveals.css";
@import "./lib/animations/css-native/stagger-children.css";
@import "./lib/animations/css-native/spring-easings.css";
@import "./lib/animations/css-native/scroll-progress.css";
@import "./lib/animations/css-native/gradient-animate.css";

/* === Atmosphere === */
@import "./lib/atmosphere/curtain.css";
@import "./lib/atmosphere/noise.css";
@import "./lib/atmosphere/scrollbar.css";
@import "./lib/atmosphere/shadows.css";
@import "./lib/atmosphere/gradients.css";
@import "./lib/atmosphere/recipes.css";

/* === A11y === */
@import "./lib/a11y/focus-styles.css";
@import "./lib/a11y/reduced-motion.css";
@import "./lib/a11y/scroll-padding.css";
@import "./lib/a11y/sr-only.css";

/* === Loading === */
@import "./lib/loading/FontLoading.css";

/* === Design Tokens === */
@theme {
  --color-accent: #6B7280;
  --color-accent-hover: #4B5563;
  --color-surface: #FAFAF9;
  --color-surface-elevated: #FFFFFF;
  --color-text-primary: #1C1917;
  --color-text-secondary: #78716C;
  --color-border: #E7E5E4;
  --color-border-subtle: #F5F5F4;
  --color-muted: #A8A29E;
  --color-ring: #6B7280;
  --shadow-hue: 0;
  --font-display: system-ui, sans-serif;
  --font-body: system-ui, sans-serif;
  --header-height: 72px;
  --curtain-duration: 600ms;
}

/* === Global Styles === */
body { overflow-x: hidden; font-family: var(--font-body); color: var(--color-text-primary); background: var(--color-surface); }
h1, h2, h3, h4 { text-wrap: balance; }
p { text-wrap: pretty; }
CSS_EOF

# 6. Write src/data.js
cat > src/data.js << 'DATA_EOF'
export const BRIEF = {
  business: { name: '', phone: '', phoneTel: '', address: '', city: '', state: '', zip: '', hours: {}, yearsInBusiness: null, ownerName: '', established: null },
  personality: { energy: '', formality: '', boldness: '', era: '' },
  competitors: [],
  images: {},
  reviews: [],
  services: [],
  differentiators: [],
  copy: { heroHeadline: '', heroSubtitle: '', sectionLabels: {}, ctaText: '', aboutNarrative: '', tagline: '' },
};

export const DESIGN_SYSTEM = {
  oracleRecommendation: {},
  palette: '',
  fonts: { display: '', body: '', url: '' },
  architecture: '',
  mode: 'light',
  typeScale: '',
  animationPersonality: 'calmFormal',
  tier: 2,
  fingerprint: '',
};
DATA_EOF

# 7. Write src/App.jsx
cat > src/App.jsx << 'APP_EOF'
import { SkipLink, AtmosphereKit, FloatingCTA, OakWindFooter } from './lib';
import { BRIEF } from './data';

/*
  === OAKWIND BUILD v2 ===
  Slug:
  Niche:
  Personality: { energy, formality, boldness, era }
  Architecture:
  Palette:
  Fonts:
  Animation Personality:
  Fingerprint:

  === SECTION MAP ===
  (Filled by Stage 3)

  === WOW MOMENTS ===
  1. Hero reveal:
  2. Scroll surprise:
  3. Deep impression:
  4. Personal touch:
*/

export default function App() {
  return (
    <>
      <SkipLink />
      <AtmosphereKit />
      <main id="main-content">
        {/* Sections composed here during Stage 4 */}
      </main>
      <FloatingCTA phone={BRIEF.business.phoneTel} />
      <OakWindFooter />
    </>
  );
}
APP_EOF

# 8. Write src/main.jsx
cat > src/main.jsx << 'MAIN_EOF'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PersonalityProvider } from './lib';
import { DESIGN_SYSTEM } from './data';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersonalityProvider personality={DESIGN_SYSTEM.animationPersonality}>
      <App />
    </PersonalityProvider>
  </StrictMode>
);
MAIN_EOF

# 9. Update index.html
cat > index.html << 'HTML_EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Business Name | City, ST</title>
    <meta name="description" content="Professional website for your local business" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏢</text></svg>" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
HTML_EOF

# 10. Create .oakwind-state
echo '{"stage":0,"completed":[]}' > .oakwind-state

# 11. Create empty dirs
mkdir -p src/components public/fonts

# 12. Delete Vite defaults
rm -f src/App.css
rm -rf src/assets/

# 13. Install dependencies
npm install

echo ""
echo "=== OakWind v2 project scaffolded: $PROJECT_NAME ==="
echo ""
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  npm run dev"
echo ""
