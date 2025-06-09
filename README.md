## 🧩 Component Breakdown

### 1. `index.html` – Web Structure
Defines the entire user interface and layout. Key sections include:

- **Header** – Project title and description.
- **Disclaimer** – Explains PNG export limitations and font generation caveats.
- **Controls Area** – Includes:
  - Text input field
  - Font dropdown (Roboto, Open Sans, Montserrat, etc.)
  - Sliders for size, weight, spacing, line height
  - Cap height & width simulation via CSS `transform`
  - Text and background color pickers
- **Live Preview (`#textPreview`)** – Updates dynamically based on controls.
- **Hidden Canvas (`#textCanvas`)** – Used for PNG rendering.
- **Download Button** – Triggers PNG export.
- **Resource Links** – Guides users to professional font development tools.

### 2. `style.css` – Responsive Visual Design
- Applies DRAX-compliant UI logic:
  - Modular layout with grid/flex hybrid
  - Soft shadows, rounded containers
  - Accessible colors, focus rings
  - Responsive scaling for all controls
  - Live preview area is scroll-aware and resizable

### 3. `main.js` – Application Logic
Handles all front-end interaction. Key functionality includes:

- **DOM Binding** – Grabs all controls by `id` for live updates.
- **State Object** – Tracks current style settings in real-time.
- **`updatePreview()`** – Applies styles directly to `#textPreview`:
  - Updates font size, line height, spacing, transform scale
  - Updates sliders' numerical labels
- **`drawTextOnCanvas()`** – Renders styled text to hidden Canvas:
  - Dynamically sets canvas width/height based on text and scale
  - Uses `ctx.setTransform()` for visual width control
  - Adjusts vertical scale with simulated cap height
- **`downloadPng()`** – Saves canvas content as PNG:
  - Uses `toDataURL('image/png')`
  - Triggers download via temporary anchor link
- **Listeners & Initialization**:
  - Hooks into all inputs and updates on interaction
  - Calls `updatePreview()` on page load

### 4. `.gitignore` – Git Hygiene
Configured to ignore:
- Editor metadata: `.vscode/`, `.idea/`
- System clutter: `.DS_Store`, `Thumbs.db`
- Build folders: `/dist`, `/build`
- Node directories (if tooling is later added): `node_modules/`

## ⚠️ Limitations & Educational Scope

This is a **simulation-based, browser-only tool**. It does **not**:
- Export or compile real `.ttf` or `.otf` font files.
- Provide typographic glyph editing or kerning logic.
- Use any backend service or cloud rendering.

For **real font creation**, consider:
- [Glyphs](https://glyphsapp.com)
- [FontForge](https://fontforge.org)
- [RoboFont](https://robofont.com)
- [FontLab](https://www.fontlab.com)

## 📦 How to Use

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Customize text using the available controls.
4. Click **Download PNG** to save your styled preview.

> 🧠 This app runs **fully offline**. No server needed. Safe for experimentation, demos, or educational purposes.

## 🎨 UI Design & Compliance

Built with inspiration from the **DRAX UI Design System**:
- Responsive, mobile-first layout
- Modular input panels and preview windows
- Onboarding clarity and self-documenting structure
- Animation layers and knowledge-area logic (for future versions)

---

© 2025 – DRAX-Compliant Visual Simulation • MIT License  
