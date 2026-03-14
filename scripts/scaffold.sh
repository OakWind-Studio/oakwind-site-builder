#!/usr/bin/env bash
# OakWind Site Builder — Project Scaffold
# Usage: bash scripts/scaffold.sh <project-name>
# Creates a Vite + React 18 + Tailwind CSS project ready for OakWind mockups.

set -euo pipefail

PROJECT_NAME="${1:?Usage: scaffold.sh <project-name>}"
PROJECT_DIR="./${PROJECT_NAME}"

if [ -d "$PROJECT_DIR" ]; then
  echo "Error: Directory '$PROJECT_DIR' already exists."
  exit 1
fi

echo "Scaffolding OakWind project: $PROJECT_NAME"

# Create Vite + React + TypeScript project
npm create vite@latest "$PROJECT_NAME" -- --template react-ts 2>/dev/null
cd "$PROJECT_DIR"

# Install core dependencies
echo "Installing dependencies..."
npm install
npm install -D tailwindcss @tailwindcss/vite

# Install default OakWind libraries
npm install motion lucide-react

echo "Configuring Tailwind..."

# Configure Vite with Tailwind plugin
cat > vite.config.js << 'VITE_EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
VITE_EOF

# Update index.html with Google Fonts placeholder
cat > index.html << 'HTML_EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Business Name</title>

    <!-- Google Fonts — Replace DISPLAY_FONT and BODY_FONT with selected fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- <link href="https://fonts.googleapis.com/css2?family=DISPLAY_FONT:wght@400;700&family=BODY_FONT:wght@400;600&display=swap" rel="stylesheet"> -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
HTML_EOF

# Set up main CSS with Tailwind + CSS variables
cat > src/index.css << 'CSS_EOF'
@import "tailwindcss";

/* ============================================
   OakWind Design Tokens — Style DNA
   Replace these values per build based on the
   selected 8-dimension DNA code.
   ============================================ */

:root {
  /* Color Approach (Dimension 2) */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F5F5F5;
  --color-accent-1: #2563EB;
  --color-accent-2: #F97316;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;

  /* Typography (Dimension 3) */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Source Sans 3', sans-serif;

  /* Layout (Dimensions 1, 6) */
  --container-max: 1200px;
  --section-padding: 5rem;
  --header-height: 64px;
  --border-radius: 0.5rem;
}

/* ============================================
   Base Styles
   ============================================ */

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  margin: 0;
}

/* ============================================
   Tailwind Theme Extensions
   ============================================ */

@theme {
  --color-brand-bg: var(--color-bg-primary);
  --color-brand-bg-alt: var(--color-bg-secondary);
  --color-brand-accent: var(--color-accent-1);
  --color-brand-accent-2: var(--color-accent-2);
  --color-brand-text: var(--color-text-primary);
  --color-brand-text-muted: var(--color-text-secondary);
  --font-family-display: var(--font-display);
  --font-family-body: var(--font-body);
}
CSS_EOF

# Clean up default files
rm -f src/App.css

# Create a minimal App.tsx placeholder
cat > src/App.tsx << 'APP_EOF'
// OakWind Site Builder — Style DNA: [REPLACE WITH YOUR DNA CODE]
// e.g. 1B-2B-3E-4A-5E-6B-7A-8D

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      {/* Replace this with generated components */}
      <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur border-b border-brand-text/10"
        style={{ height: 'var(--header-height)' }}>
        <div className="max-w-[var(--container-max)] mx-auto px-6 h-full flex items-center justify-between">
          <span className="font-display text-xl font-bold">Business Name</span>
          <a href="tel:+18175551234"
            className="bg-brand-accent text-white px-5 py-2.5 rounded font-semibold text-sm hover:-translate-y-0.5 transition-transform">
            (817) 555-1234
          </a>
        </div>
      </header>

      <main>
        <section className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="text-center max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              Your Business Name
            </h1>
            <p className="text-brand-text-muted text-xl mt-6">
              Tagline goes here — generated from business data.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-brand-text-muted border-t border-brand-text/10">
        <p>
          Website by{' '}
          <a href="https://oakwindstudio.com" className="hover:text-brand-accent transition-colors"
            target="_blank" rel="noopener noreferrer">
            OakWind Studio
          </a>
        </p>
      </footer>
    </div>
  )
}
APP_EOF

echo ""
echo "Project scaffolded: $PROJECT_DIR"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  1. Uncomment and update the Google Fonts link in index.html"
echo "  2. Update CSS custom properties in src/index.css"
echo "  3. Replace App.jsx with generated components"
echo ""
echo "Dev:    npm run dev"
echo "Build:  npm run build"
echo "Deploy: npx wrangler pages deploy dist --project-name=$PROJECT_NAME"
echo ""
