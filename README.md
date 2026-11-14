# Echoes of Space 🌑

An educational, scientifically grounded interactive 3D planetary exploration platform and atlas mapping historic and inactive NASA equipment on the Moon (with Mars planned as a future extension).

---

## 1. Project Overview

**Echoes of Space** transforms archival NASA space exploration datasets into a museum-grade 3D digital atlas. Users explore a true-scale 3D lunar globe rendered with verified topographic elevation and albedo mosaics, pinpoint historic human landing sites (Apollo 11 through 17, Surveyor, and Ranger), inspect technical hardware resting in situ on the lunar regolith, and learn the living scientific stories of humanity's boldest expeditions.

---

## 2. Description & Purpose

Across the silent regolith of the Moon rest the descent stages, roving vehicles, and scientific stations of humanity's lunar missions. Though inactive for over fifty years, this equipment is far from abandoned debris — each machine marks an irreplaceable archaeological landmark in human history.

The purpose of this platform is to:
- **Preserve Extraterrestrial Heritage**: Provide transparent, traceable geodetic coordinates for historical NASA hardware.
- **Uphold Scientific Integrity**: Adhere strictly to verified NASA datasets without synthesizing fake procedural craters or imaginary coordinates.
- **Deliver High-Performance 3D Visualization**: Render 60 FPS WebGL lunar geodesy and responsive interactive site telemetry across desktop and mobile devices.

---

## 3. Main Features

- **True-Scale 3D Lunar Visualization**:
  - Photometrically calibrated lunar surface using NASA CGI Moon Kit (SVS 4720) LROC WAC 2K global mosaic.
  - NASA LOLA (Lunar Orbiter Laser Altimeter) elevation displacement referenced to the official 1,737.4 km lunar sphere radius.
  - Realistic directional solar terminator shadowing and faint earthshine ambient illumination.
  - Smooth orbital controls, bounded zoom, and natural rotational damping.
- **Dynamic 3D Marker System**:
  - Non-colliding, high-performance WebGL marker pins with restrained category color coding.
  - Automatic boundary-aware repositioning: labels dynamically adjust anchor position near screen edges to prevent viewport overflow.
  - Constant scale during zoom: prevents labels from blowing up or obscuring the lunar surface when zooming close into landing sites.
  - Single-click contextual popups with direct camera flight targeting.
- **Curated Equipment Index (Sidebar)**:
  - Quick-search across mission names, equipment designations, and geographic landing sites.
  - Filter by category: Crewed Landers, Rovers, Science Packages, Robotic Landers, and Impactors.
- **Editorial Museum Drawer (Dossier)**:
  - Comprehensive mission timelines (touchdown, mission conclusion, last signal).
  - In situ physical condition on the lunar regolith.
  - Operational purpose and scientific legacy narratives.
  - Traceable NASA PDS, NSSDC, and LROC citations with direct archival links.
- **Interactive Geodetic Calibration**:
  - Adjust topographic relief exaggeration (0.0x flat to 3.0x exaggerated).
  - Fine-tune Prime Meridian (0° Longitude) texture alignment.
  - Toggle coordinate grids and day/night solar shadowing.
- **NASA Data Integrity & Provenance Modal**:
  - Full transparency on datasets, sensors, instruments, and altimetry units.

---

## 4. Technologies & Frameworks

- **Core Framework**: [Next.js](https://nextjs.org/) 16 (App Router, Webpack engine)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type checking, zero `any`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 & PostCSS
- **3D Graphics & Canvas**:
  - [Three.js](https://threejs.org/) (r187)
  - [React Three Fiber](https://r3f.docs.pmnd.rs/) (v9)
  - [@react-three/drei](https://github.com/pmndrs/drei) (v10)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (v5)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 5. Project Folder Structure

```text
echoes-of-space/
├── AGENTS.md               # Core project rules, scientific integrity, and developer rules
├── README.md               # Complete project documentation and collaboration guide
├── eslint.config.mjs       # ESLint flat configuration
├── next.config.ts          # Next.js configuration (Webpack, worker thread limits)
├── package.json            # Declared dependencies and NPM build scripts
├── postcss.config.mjs      # PostCSS configuration for Tailwind CSS v4
├── tsconfig.json           # Strict TypeScript configuration with @/* path alias
├── public/                 # Static web assets
│   └── textures/moon/      # Official NASA LROC WAC and LOLA DEM textures
└── src/
    ├── app/                # Next.js App Router
    │   ├── globals.css     # Global styles and typography definitions
    │   ├── layout.tsx      # Root application layout
    │   ├── page.tsx        # Cinematic educational landing page
    │   └── explore/
    │       └── moon/
    │           └── page.tsx # Primary 3D Moon Atlas exploration route
    ├── components/
    │   ├── artifacts/
    │   │   └── ArtifactPanel.tsx      # Slide-out museum drawer with full mission dossier
    │   ├── globe/
    │   │   ├── ArtifactMarkers.tsx    # 3D native pins & boundary-aware popups
    │   │   ├── CameraController.tsx   # Smooth animated spherical camera flight
    │   │   ├── GlobeLoader.tsx        # Client-only dynamic WebGL loader
    │   │   ├── Moon.tsx               # 256-segment lunar sphere & PBR regolith shader
    │   │   ├── MoonCanvas.tsx         # R3F canvas, lights, OrbitControls, HUD dock
    │   │   └── RegionalTerrain.tsx    # Regional high-resolution DEM module slot
    │   ├── home/
    │   │   ├── FeatureSection.tsx     # Homepage framework pillars
    │   │   └── HeroMoon.tsx           # Stylized vector lunar illustration
    │   ├── layout/
    │   │   ├── AppHeader.tsx          # Minimalist navigation & telemetry bar
    │   │   └── ExploreSidebar.tsx     # Searchable scientific equipment catalog index
    │   └── ui/
    │       └── DataProvenanceModal.tsx # Full NASA dataset & altimetry documentation
    ├── data/
    │   └── moon-artifacts.ts          # Verified NASA artifact dataset with provenance
    ├── lib/
    │   └── coordinates.ts             # Spherical-to-Cartesian geodetic math utilities
    ├── store/
    │   └── explorer-store.ts          # Zustand state store for selection and layers
    └── types/
        └── artifact.ts                # Strict TypeScript models and source types
```

---

## 6. Prerequisites & Software Requirements

- **Node.js**: `v18.18.0` or higher (verified on Node `v20.x` and `v24.x`)
- **npm**: `v9.0.0` or higher (verified on npm `v11.x`)
- **Modern Web Browser**: Chrome, Firefox, Edge, or Safari with WebGL 2.0 hardware acceleration enabled.
- **Git**: Installed and configured on your machine.

---

## 7. Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   cd echoes-of-space
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify environment setup**:
   ```bash
   cp .env.example .env.local
   ```
   *(Note: No third-party API keys are required; all NASA planetary textures and data are bundled in the repository).*

---

## 8. Instructions to Run Locally

### Start Development Server

```bash
npm run dev
```

The application will start on **[http://localhost:3000](http://localhost:3000)**.
- Homepage: `http://localhost:3000`
- 3D Moon Atlas: `http://localhost:3000/explore/moon`

### Production Build & Linting

```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint check
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 9. Environment Variable Setup

The project includes a `.env.example` template:

```env
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Default Exploration Target ('moon')
NEXT_PUBLIC_DEFAULT_CELESTIAL_BODY=moon
```

To customize, create `.env.local`:
```bash
cp .env.example .env.local
```

---

## 10. Common Errors & Troubleshooting

### 1. Webpack vs Turbopack on Windows
- **Issue**: Turbopack IPC child-process conflicts on certain Windows installations.
- **Solution**: The project is configured with `"dev": "next dev --webpack"` and `"build": "next build --webpack"` to guarantee cross-platform build stability.

### 2. Port 3000 Already in Use
- **Issue**: `Error: listen EADDRINUSE: address already in use :::3000`.
- **Solution**: Either terminate the existing process or start on an alternate port:
  ```bash
  # Windows PowerShell: identify process on port 3000
  Get-NetTCPConnection -LocalPort 3000
  # Start on port 3001
  npx next dev -p 3001 --webpack
  ```

### 3. WebGL Context Loss / Fallback
- **Issue**: The browser displays the neutral loading sphere or reports WebGL context loss.
- **Solution**: Ensure hardware acceleration is enabled in your browser settings (`chrome://settings/system` &rarr; "Use graphics acceleration when available").

---

## 11. GitHub Collaboration & Workflow

### Initial Repository Setup (Project Owner)

Run the following commands in the root of the project to initialize and publish the repository to GitHub:

```bash
git init
git add .
git commit -m "Initial project setup: NASA 3D Moon Atlas with responsive markers"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### For Team Members (Cloning & Running)

To clone and run the project:

```bash
# 1. Clone repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd echoes-of-space

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

### Team Branching & Pull Request Workflow

All contributors should follow standard Git feature branch practices:

1. **Pull the latest changes from `main`**:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a dedicated feature or bugfix branch**:
   ```bash
   git checkout -b feature/apollo-rover-enhancement
   # or
   git checkout -b fix/mobile-panel-layout
   ```

3. **Make your changes, test, and verify**:
   ```bash
   npx tsc --noEmit
   npm run lint
   npm run build
   ```

4. **Commit and push your feature branch**:
   ```bash
   git add .
   git commit -m "feat: enhance mobile responsive drawer and clamp marker popup"
   git push -u origin feature/apollo-rover-enhancement
   ```

5. **Open a Pull Request (PR)** on GitHub:
   - Provide a clear description of the modifications.
   - Reference any relevant issues.
   - Request review from a team member before merging into `main`.

---

## 12. Scientific Data Provenance & NASA Attribution

All lunar imagery, altimetry, coordinates, and spacecraft parameters are sourced directly from NASA open data repositories:
- **Global Color**: [NASA SVS 4720](https://svs.gsfc.nasa.gov/4720/) (LROC Wide Angle Camera global mosaic).
- **Topography**: [NASA LOLA](https://pds-geosciences.wustl.edu/missions/lro/lola.htm) (Lunar Orbiter Laser Altimeter gridded DEM).
- **Sub-Meter Geodesy**: [LROC Featured Sites](https://www.lroc.asu.edu/featured_sites) (Arizona State University / NASA GSFC).
- **Spacecraft Master Records**: [NASA Space Science Data Coordinated Archive](https://nssdc.gsfc.nasa.gov/) (NSSDC / GSFC).

*Disclaimer: Echoes of Space is an independent educational and cultural exploration platform developed with open planetary data provided by NASA. This platform is not officially affiliated with or endorsed by NASA or the United States Government.*
