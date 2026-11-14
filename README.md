# Hydro Industries — Executive Parallax Presentation Deck

[![Vite 6](https://img.shields.io/badge/Vite-6.2.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1.14-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> An ultra-high-performance, discrete-step 3D parallax executive presentation deck built for the Global CEO of **Hydro Industries** (*Water. Technology. Possibility.*), presenting company capabilities, proprietary electro-coagulation technology, wastewater recovery plants, and global corporate expansion.

---

## 🌟 Visual Showcase

| Slide 01: Hero Caustics & Water | Slide 06: Electro-Coagulation Sim |
|:---:|:---:|
| ![Slide 01 Cover](public/media/slides/hero-water.png) | ![Slide 06 Electro-Coagulation](public/media/slides/impact-abstract.png) |

| Slide 09: 3D Photorealistic Earth | Slide 13: 5-Stage Process Architecture |
|:---:|:---:|
| ![Slide 09 Earth Satellite](public/media/slides/earth-texture.png) | ![Slide 11 Plant](public/media/slides/beeah-plant.png) |

---

## ⚡ Highlights & Key Features

- **Discrete Multi-Layer Parallax Engine**:
  - Replaces traditional continuous free-scrolling with a high-end presentation deck model where **one keyboard stroke, one trackpad wheel gesture, or one touch swipe** advances exactly one slide with rich multi-layer inertia.
  - Three independent depth planes per slide:
    - **Background ($1800\text{ms}$ cubic-bezier)**: Cinematic wide-angle backgrounds, water refractions, and deep navy ambient gradients.
    - **Midground ($1600\text{ms}$ cubic-bezier)**: Dynamic procedural light caustics and radial glow fields.
    - **Foreground ($1450\text{ms}$ cubic-bezier with staggered delays)**: Editorial display typography, technical tables, and interactive telemetry.
- **Interactive Electro-Coagulation Chamber Simulation**:
  - HTML5 Canvas particle physics simulating raw influent wastewater with heavy metal ions passing between energized anode ($+$) and cathode ($-$) electrodes.
  - Live visual demonstration of electric micro-current pulses, flocculation, and clean phase separation ($>98\%$ pollutant removal).
- **Interactive 3D Photorealistic Floating Earth Globe**:
  - Pure mathematical spherical ray-traced projection using a high-resolution $2048 \times 1024$ equirectangular satellite map.
  - Ambient drop shadow, atmospheric Fresnel rim, real-time rotation, and interactive click-and-drag.
  - 3D-projected geographic milestones with depth-faded labels for the UK Global HQ, Sharjah UAE, Quito Ecuador, and Santa Cruz.
- **5-Stage Modular Water Treatment Architecture Flow**:
  - Interactive process diagram displaying Screening, DAF (Dissolved Air Flotation), MBBR (Moving Bed Biofilm Reactor), Reverse Osmosis ($70\%$ yield), and UV Disinfection.
- **Executive Presentation HUD**:
  - Minimalist floating bottom controller with previous/next controls, slide counter indicator, and interactive slide index drawer.
  - Real-time top progress bar tracking total presentation trajectory.

---

## 🏗️ Architecture & Component Topology

```mermaid
graph TD
    App[App.tsx<br/>Discrete Slide State Engine] --> DeckHud[DeckHud.tsx<br/>Progress Bar & CEO Navigation Pill]
    App --> Slides[Slides.tsx<br/>13 Presentation Stages]
    
    Slides --> P01[Slide 01: Cover]
    Slides --> P02[Slide 02: Introduction]
    Slides --> P03[Slide 03: Capabilities]
    Slides --> P04[Slide 04: Case Studies Intro]
    Slides --> P05[Slide 05: Quito Ecuador]
    Slides --> P06[Slide 06: Frongoch Wales]
    Slides --> P07[Slide 07: Roadbridge Turbidity]
    Slides --> P08[Slide 08: Treatment Performance]
    Slides --> P09[Slide 09: Corporate Development]
    Slides --> P10[Slide 10: Group Structure]
    Slides --> P11[Slide 11: BEEAH Sharjah]
    Slides --> P12[Slide 12: Desalination Yield]
    Slides --> P13[Slide 13: Capestone Poultry]

    P01 -.-> WaterCaustics[WaterCausticsCanvas.tsx<br/>Procedural Caustics Canvas]
    P06 -.-> ElectroSim[ElectroCoagulationSim.tsx<br/>Particle Physics Canvas]
    P09 -.-> Earth3D[EarthGlobe3D.tsx<br/>3D Raytraced Sphere Canvas]
    P13 -.-> ProcessFlow[TreatmentProcessDiagram.tsx<br/>Interactive SVG Architecture]

    App --> RAF[lib/scroll.ts<br/>Single Continuous Ambient Loop]
```

---

## 📊 Presentation Structure & Flow

```mermaid
journey
    title Executive Presentation Flow
    section Overview & Strategy
      01 Cover (Water. Technology. Possibility.): 5: CEO
      02 Intro (Technology for a world of water): 5: CEO
      03 Capabilities (Design to Operation): 5: CEO
      04 Case Studies (Experience with impact): 5: CEO
    section Field Deployments
      05 Quito Ecuador (Protecting river basins): 5: CEO
      06 Frongoch Wales (>98% Metal Removal Sim): 5: CEO
      07 Roadbridge Wales (Turbidity NTU 828 to 5.91): 5: CEO
      08 Treatment Performance (COD, BOD, TSS Table): 5: CEO
    section Corporate Growth & Tech
      09 Milestones & 3D Earth Globe: 5: CEO
      10 Group Structure (Wholly owned entities): 5: CEO
      11 BEEAH Sharjah (1.5M tonnes treated): 5: CEO
      12 Desalination Yield (40-50% to 70%+): 5: CEO
      13 Capestone Poultry & 5-Stage Process Flow: 5: CEO
```

---

## ⌨️ Executive Controls & Shortcuts

| Action | Control Keys / Gestures |
| :--- | :--- |
| **Next Slide** | `ArrowRight`, `ArrowDown`, `Space`, `PageDown`, Scroll Down, Swipe Up, or Click `→` |
| **Previous Slide** | `ArrowLeft`, `ArrowUp`, `PageUp`, Scroll Up, Swipe Down, or Click `←` |
| **Slide Directory** | Click the center `01 / 13` pill in the HUD |
| **Close Menu** | `Escape` or click backdrop |
| **3D Globe Interaction** | Click and drag directly on the Earth sphere (Slide 09) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.0.0` or later
- npm or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/hydro-presentation.git
cd hydro-presentation

# Install pinned dependencies
npm install
```

### Development
```bash
npm run dev
# Serves at http://localhost:3007/
```

### Production Build & Verification
```bash
# Type check and lint
npm run lint

# Compile production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 📐 Technical Specifications

- **Display Typeface**: *Fraunces* (Google Fonts) — Variable high-contrast serif for luxury editorial tone.
- **Body Typeface**: *DM Sans* (Google Fonts) — Precision sans-serif for executive readability.
- **Monospace Typeface**: *DM Mono* (Google Fonts) — Technical metrics, data labels, and coordinate pills.
- **Palette**:
  - Abyss: `#030d1d`
  - Cobalt: `#0e2f6b`
  - Electric Blue: `#1446ff`
  - Cyan Glow: `#38bdf8`
  - Ice Tint: `#eef4fb`
  - Pure White: `#ffffff`

---

## 📄 License & Attribution
Hydro Industries Ltd — Internal Executive Presentation Systems. Confidential & Proprietary.
All photographic assets and technical datasets derived from official Hydro Industries project documentation.
