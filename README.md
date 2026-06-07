# beyond280

A minimal, high-fidelity creator studio that transforms long-form thoughts into clean, typographic social cards. Built to bypass character limits while maintaining layout control and reading experience.

No complex grids, layers, or bloated dashboards—just clean typography and visual pacing.

---

## Features

- **Writing Studio:** A focused writing editor that estimates your reading time, readability scores, and estimated attention boost in real-time.
- **AI Refinement Engine:** A local-first polisher that filters out AI-generated buzzwords (like "delve", "tapestry", or "elevate") and refactors text for natural human rhythm.
- **Aesthetic Themes:** Preset themes designed for different styles (Ethereal Clinical, Obsidian Vault, Parchment, and Organic Clay).
- **Aspect Ratio Control:** Quick selectors for Auto (fluid height), 16:9, 4:3, and 1:1 layouts.
- **Pristine Exports:** Direct rendering to high-resolution 3x PNG using html-to-image to keep text sharp on retina and mobile screens.

---

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Renderer:** html-to-image (Retina-scaled 3x pipeline)

---

## Getting Started

Run the project locally in a few steps.

### 1. Clone and Install
```bash
git clone https://github.com/whypriyesh/beyond280.git
cd beyond280
npm install
```

### 2. Configure Environment (Optional)
If you want to use external LLM endpoints rather than the default client-side refiner, create a `.env` file in the root:
```env
GROQ_API_KEY=your_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

---

## How It Works

- **The Humanizer:** Most language models sound overly formal. beyond280 uses a heuristics script to swap common robotic phrases, adjust text flow, and format paragraphs to make them feel written by a person.
- **3x Resolution Output:** Mobile feeds compress raw screenshots. The export engine uses a custom pixel-ratio multiplier to ensure exported images remain perfectly crisp when shared.

---

Made by [@alwayspriyesh](https://x.com/alwayspriyesh).
