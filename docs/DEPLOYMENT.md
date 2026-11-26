# PGI Saathi - Deployment Architecture & Operations Guide

## 1. Hosting Architecture Overview

PGI Saathi is deployed as a static Progressive Web App (PWA).

### Primary Production Target: GitHub Pages
- **URL**: `https://lovnishverma.github.io/PGI-SAATHI/`
- **Workflow**: `.github/workflows/deploy-pages.yml`
- **Base Path**: `/PGI-SAATHI/` (configured via `VITE_BASE_PATH` in workflow)
- **Deep-Link Handling**: `dist/index.html` is mirrored to `dist/404.html` so client-side SPA routing can resolve deep links on GitHub Pages.

### Secondary Alternative: Firebase Hosting
- **Configuration**: `firebase.json`
- **Root Directory**: `frontend/dist`
- **Routing**: Rewrites all requests (`/**`) to `/index.html` with immutable cache headers for hashed bundles and `no-cache` for `service-worker.js`.

---

## 2. Step-by-Step Deployment Procedure

### Automated Deployment (Recommended)
1. Ensure all local tests and linter checks pass:
   ```bash
   npm test
   npm run lint
   npm run build
   ```
2. Merge pull request into `main` branch.
3. The GitHub Actions workflow (`deploy-pages.yml`) triggers automatically:
   - Installs frontend dependencies via `npm install`.
   - Compiles Vite bundle with base path `/PGI-SAATHI/`.
   - Generates `404.html` fallback.
   - Deploys static build artifact to GitHub Pages CDN.

### Manual Local Verification before Release
```bash
cd frontend
npm run build
npm run preview
```
Visit `http://localhost:4173` to test the production build locally.
