/**
 * OakWind Design Mapping — Niche Defaults & Style Recipes
 *
 * This file is READ BY THE AI, not executed. It provides two data structures:
 *
 * PRIMARY: nicheDefaults — curated design recommendations per niche.
 *   Look up the business niche to get palette suggestions, font mood,
 *   tier, personality presets, and design notes. This is the standard
 *   path for every build.
 *
 * SUPPLEMENTAL: styleToDesign — atmosphere recipes keyed by visual style.
 *   Useful for inspiration when you want a specific aesthetic (e.g.,
 *   glassmorphism, brutalism). The `architecture` field in styleToDesign
 *   uses descriptive mood names, NOT literal filenames from
 *   references/architectures/ (which use the-*.md naming).
 *   Actual architectures: the-converter, the-editorial, the-immersive,
 *   the-magazine, the-minimalist, the-one-pager, the-showcase, the-storyteller.
 */

const styleToDesign = {
  glassmorphism: {
    palettes: ["arctic-blue", "blush-cream", "midnight-sage"],
    fontMood: "Modern & Clean",
    architecture: "floating-cards",
    atmosphereRecipe: "frosted-glass panels with backdrop-blur, translucent card surfaces, subtle border highlights",
    notes: "Use backdrop-blur-md on cards. Background needs visible gradient for the glass effect to register."
  },

  minimalism: {
    palettes: ["sage-linen", "toasted-almond", "arctic-blue"],
    fontMood: "Modern & Clean",
    architecture: "open-canvas",
    atmosphereRecipe: "generous whitespace, restrained color, typography-driven hierarchy, minimal decoration",
    notes: "Let the font pairing do the heavy lifting. Fewer elements, more impact per element."
  },

  brutalism: {
    palettes: ["carbon-fiber", "noir-rouge", "steel-copper"],
    fontMood: "Bold & Confident",
    architecture: "raw-grid",
    atmosphereRecipe: "hard edges, visible grid structure, monospaced accents, raw textures, high contrast",
    notes: "Break border-radius conventions. Use sharp corners. Monospaced fonts for labels/captions."
  },

  "dark-mode": {
    palettes: ["obsidian", "midnight-velvet", "midnight-sage", "carbon-fiber"],
    fontMood: "Elegant & Refined",
    architecture: "layered-depth",
    atmosphereRecipe: "deep backgrounds, light text, metallic or luminous accents, dramatic lighting gradients",
    notes: "Dark palettes need extra attention to contrast ratios. Use accent sparingly — it glows on dark."
  },

  "motion-driven": {
    palettes: ["electric-coral", "teal-thunder", "noir-rouge"],
    fontMood: "Bold & Confident",
    architecture: "scroll-narrative",
    atmosphereRecipe: "scroll-triggered reveals, parallax layers, animated gradients, kinetic typography",
    notes: "Budget animations carefully. One hero sequence + one scroll moment + micro-interactions. Not wall-to-wall."
  },

  neumorphism: {
    palettes: ["sage-linen", "blush-cream", "toasted-almond"],
    fontMood: "Warm & Approachable",
    architecture: "soft-surface",
    atmosphereRecipe: "soft shadows (inset + outer), subtle depth, muted palette, tactile button states",
    notes: "Requires very specific shadow setup. Background and element colors must be nearly identical for the effect to work."
  },

  "flat-design": {
    palettes: ["arctic-blue", "golden-hour", "teal-thunder"],
    fontMood: "Modern & Clean",
    architecture: "grid-blocks",
    atmosphereRecipe: "solid color blocks, no shadows, clear hierarchy through color and size, crisp edges",
    notes: "Flat doesn't mean boring. Use bold color blocks and strong typography to create energy without depth effects."
  },

  "vibrant-block": {
    palettes: ["electric-coral", "teal-thunder", "golden-hour"],
    fontMood: "Bold & Confident",
    architecture: "section-blocks",
    atmosphereRecipe: "full-bleed color sections, bold type, high saturation, strong section contrast",
    notes: "Each section is its own color world. Use contrasting backgrounds between sections for maximum impact."
  },

  "retro-futurism": {
    palettes: ["midnight-velvet", "electric-coral", "noir-rouge"],
    fontMood: "Editorial & Distinctive",
    architecture: "geometric-grid",
    atmosphereRecipe: "neon accents on dark backgrounds, condensed type, geometric shapes, scan-line textures",
    notes: "Condensed display fonts are essential. Add subtle scan-line or dot-grid textures for the retro feel."
  },

  "organic-biophilic": {
    palettes: ["sage-linen", "terracotta-garden", "golden-hour"],
    fontMood: "Warm & Approachable",
    architecture: "flowing-sections",
    atmosphereRecipe: "natural colors, rounded forms, organic shapes, warm textures, earthy gradients",
    notes: "Use border-radius generously. Blob shapes as decorative elements. Warm off-whites as backgrounds."
  },

  _default: {
    palettes: ["sage-linen", "arctic-blue", "navy-brass"],
    fontMood: "Modern & Clean",
    architecture: "standard",
    atmosphereRecipe: "clean layout, balanced whitespace, standard section rhythm, professional defaults",
    notes: "Fallback when oracle returns an unknown style. Safe but should be customized based on niche."
  }
};

const nicheDefaults = {
  dental: {
    palettes: ["arctic-blue", "sage-linen", "blush-cream"],
    fontMood: "Modern & Clean",
    tier: 3,
    personality: ["calmFormal", "warmFriendly"],
    notes: "Dental spans wide — cosmetic dental leans elegant, family dental leans warm. Check the sub-niche."
  },

  restaurant: {
    palettes: ["golden-hour", "campfire", "noir-rouge"],
    fontMood: "Warm & Approachable",
    tier: 3,
    personality: ["warmFriendly", "boldEnergetic"],
    notes: "Cuisine type matters — Italian gets warm earth, sushi gets minimal, BBQ gets bold. Match the food's energy."
  },

  attorney: {
    palettes: ["navy-brass", "midnight-sage", "obsidian"],
    fontMood: "Elegant & Refined",
    tier: 3,
    personality: ["calmFormal", "traditionalTrust"],
    notes: "Law firms want trust signals. Dark palettes with metallic accents. Serif display fonts. No playful elements."
  },

  "med-spa": {
    palettes: ["blush-cream", "sage-linen", "midnight-velvet"],
    fontMood: "Elegant & Refined",
    tier: 4,
    personality: ["subtleElegant", "calmFormal"],
    notes: "Premium feel is essential. Generous whitespace, editorial typography, restrained color. Think Aesop, not CVS."
  },

  realtor: {
    palettes: ["navy-brass", "golden-hour", "arctic-blue"],
    fontMood: "Modern & Clean",
    tier: 3,
    personality: ["calmFormal", "modernMinimal"],
    notes: "Real estate is about the properties, not the agent's brand. Clean layouts that let listing photos breathe."
  },

  "home-builder": {
    palettes: ["steel-copper", "campfire", "toasted-almond"],
    fontMood: "Warm & Approachable",
    tier: 3,
    personality: ["traditionalTrust", "warmFriendly"],
    notes: "Craftsmanship narrative. Show the process, the materials, the details. Earthy tones reinforce 'built to last.'"
  },

  "wedding-venue": {
    palettes: ["blush-cream", "golden-hour", "sage-linen"],
    fontMood: "Elegant & Refined",
    tier: 4,
    personality: ["subtleElegant", "warmFriendly"],
    notes: "Romance without cliche. Avoid pink overload. Muted warm tones with editorial serif typography."
  },

  barber: {
    palettes: ["carbon-fiber", "noir-rouge", "steel-copper"],
    fontMood: "Bold & Confident",
    tier: 2,
    personality: ["boldEnergetic", "rugged"],
    notes: "Dark backgrounds, sharp typography, masculine energy. Think vintage barbershop meets modern streetwear."
  },

  detailing: {
    palettes: ["obsidian", "carbon-fiber", "midnight-velvet"],
    fontMood: "Bold & Confident",
    tier: 3,
    personality: ["boldEnergetic", "rugged"],
    notes: "Dark and premium. The cars are the stars — dark backgrounds make paint colors pop. Bold condensed type."
  },

  "pressure-washing": {
    palettes: ["teal-thunder", "steel-copper", "arctic-blue"],
    fontMood: "Bold & Confident",
    tier: 2,
    personality: ["boldEnergetic", "rugged"],
    notes: "Before/after is the whole pitch. Bold type, high contrast, action-oriented. Blue tones reinforce 'clean.'"
  },

  "home-services": {
    palettes: ["steel-copper", "navy-brass", "campfire"],
    fontMood: "Bold & Confident",
    tier: 2,
    personality: ["rugged", "traditionalTrust"],
    notes: "HVAC, plumbing, electrical. Trust and reliability matter most. Strong, grounded palettes. No-nonsense type."
  },

  "auto-repair": {
    palettes: ["carbon-fiber", "steel-copper", "noir-rouge"],
    fontMood: "Bold & Confident",
    tier: 2,
    personality: ["rugged", "boldEnergetic"],
    notes: "Industrial feel. Dark backgrounds, metallic accents, condensed type. Honest and mechanical."
  },

  "law-firm": {
    palettes: ["navy-brass", "midnight-sage", "obsidian"],
    fontMood: "Elegant & Refined",
    tier: 3,
    personality: ["calmFormal", "traditionalTrust"],
    notes: "Alias for attorney. Same design approach — trust, authority, tradition. Serif display is almost mandatory."
  }
};

/**
 * Usage flow:
 *
 * 1. Look up the business niche in nicheDefaults (primary path)
 * 2. Use the returned palette filenames to load from references/palettes/
 * 3. Use fontMood to select from references/font-pairings.md
 * 4. Use tier and personality to guide architecture + animation decisions
 * 5. (Optional) If oracle.sh is available, run it for atmosphere inspiration
 *    and look up the style in styleToDesign for supplemental guidance
 *
 * Example:
 *   nicheDefaults.dental → palettes: ["arctic-blue", "sage-linen", "blush-cream"]
 *   Load references/palettes/arctic-blue.css
 *   Select font from "Modern & Clean" category in font-pairings.md
 *   Tier 3 + calmFormal personality → the-minimalist or the-editorial architecture
 */
