# NASA Lunar Global Texture Assets Guide

To enable high-resolution global lunar color and terrain displacement in **Echoes of Space**, place standard equirectangular map files in this directory (`public/textures/moon/`).

---

## 1. Supported Texture Files

The application automatically checks for and loads these files if present:

| Asset Type | Recommended Filename | Supported Alternatives | Format / Spec |
| :--- | :--- | :--- | :--- |
| **Global Color / Albedo** | `lunar_color.jpg` | `lunar_diffuse.jpg`, `moon_diffuse.jpg` | 2:1 Equirectangular RGB (e.g. 2048x1024, 4096x2048) |
| **Global Elevation Heightmap** | `lunar_elevation.jpg` | `lunar_displacement.jpg`, `lola_elevation.png` | 2:1 Single-channel grayscale (e.g. 2048x1024, 4096x2048) |

---

## 2. Where to Download Official NASA Datasets

Free, high-resolution scientific assets created by NASA's Scientific Visualization Studio (SVS) and Lunar Reconnaissance Orbiter (LRO) team:

1. **NASA CGI Moon Kit (Color & Elevation)**:
   - **URL**: [https://svs.gsfc.nasa.gov/4720](https://svs.gsfc.nasa.gov/4720)
   - **Color Map**: Lunar Reconnaissance Orbiter Camera (LROC) Wide Angle Camera (WAC) global mosaic (available in 2K, 4K, 8K).
   - **Displacement Map**: Lunar Orbiter Laser Altimeter (LOLA) global topography heightmap.

2. **USGS Astrogeology Lunar Maps**:
   - **URL**: [https://astrogeology.usgs.gov/search/map/Moon/LRO/LOLA/Lunar_LRO_LOLA_Global_LDIM_118m_Mar2014](https://astrogeology.usgs.gov/search/map/Moon/LRO/LOLA/Lunar_LRO_LOLA_Global_LDIM_118m_Mar2014)

---

## 3. Elevation Heightmap Requirements

To prevent mesh tearing and distortion, the 3D rendering engine validates heightmaps before applying displacement:
- **Projection**: Cylindrical Equirectangular (Plate Carrée), spanning 360° longitude and 180° latitude (2:1 aspect ratio).
- **Channels**: Grayscale / single-channel (`R = G = B`). Non-grayscale images are rejected for displacement to prevent distortion.
- **Orientation**: Prime Meridian (0° Longitude) centered at the image center or calibrated using the interactive longitude offset control.

*Note: If no files are placed here, Echoes of Space automatically falls back to a neutral, scientifically accurate albedo regolith model.*
