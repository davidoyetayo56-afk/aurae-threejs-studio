# AURAÈ Three.js Studio

An independent React + Vite prototype for AURAÈ's interactive 3D fashion experience.

## Stack

- React 19 and Vite
- Three.js
- React Three Fiber
- Drei helpers for studio lighting, environment and camera controls

## Run locally

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Current functionality

- Interactive 3D viewport with pointer/touch rotation and zoom
- Collection selector that changes the preview material and product details
- Responsive desktop and mobile layout
- Studio guide modal and clear product-detail states

## Important: current 3D asset status

The mannequin in this prototype is a **procedural blockout** built from basic Three.js geometry. It is useful for testing the viewer, lighting, controls and layout, but it is not a realistic human avatar and it does not simulate clothing on a body.

The next production step is to add:
1. A properly modelled and rigged avatar in GLB/GLTF format.
2. Garment-specific 3D meshes, correctly fitted to the avatar.
3. UV maps and PBR materials (texture maps that control fabric colour, roughness and surface response).
4. Optimised model variants and texture sizes for mobile devices.

The viewer is intentionally structured so the placeholder can be replaced by a real GLB/GLTF asset without pretending that a 3D fitting system already exists.

## Project status

Prototype foundation committed. Deployment is intentionally out of scope for this stage.
