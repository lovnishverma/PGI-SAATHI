# PGI Saathi - Baseline Engineering Audit

**Audit Date**: November 2026  
**Auditor**: Principal Architecture & Quality Engineering  
**Repository**: https://github.com/lovnishverma/PGI-SAATHI  
**Branch Audited**: `main` (commit clean baseline)  
**Target Domain**: PGIMER Chandigarh Patient Navigation & Visit Assistance (Independent PWA)

---

## 1. Executive Summary

PGI Saathi provides a valuable, compassionate concept for patient navigation at PGIMER Chandigarh. However, the existing implementation is in an unverified prototype state:
1. **Zero Test Coverage**: No unit tests, integration tests, or end-to-end tests exist anywhere in the repository.
2. **Disconnected Architecture**: The backend Express service is completely disconnected from the GitHub Pages static deployment; duplicate and unsynchronized seed data exists in `seed_data/` and `frontend/src/data/`.
3. **Safety Flaw in Clinic Finder**: Simple substring matching on symptom queries allows life-threatening symptoms (e.g., severe chest pain, acute breathlessness, heavy trauma) to match routine OPD clinics without emergency interception.
4. **Permissive Database Rules**: Cloud Firestore security rules allow unrestricted public reads to any document in `/departments`, `/buildings`, and `/system_config` regardless of publication state (`draft`, `archived`, or `unverified`).
5. **PWA Offline Gaps**: The service worker only caches `index.html`, `manifest.json`, and `favicon.svg`. Bundled JavaScript and CSS assets are not cached during install, leading to failure when opened offline or deep-linked on poor hospital networks.
6. **False Feedback Guarantees & Weak PII Filtering**: When running without live Firestore, the client writes feedback to `localStorage` and claims successful submission. Substring blocking (`'cr number'`, `'aadhaar'`) fails to detect structured numeric formats (e.g. 12-digit numbers, CR numbers, phone numbers).

---

## 2. Detailed Findings Register

| ID | Category | Severity | Title | Evidence | Impact | Proposed Fix | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AUDIT-01** | **Safety** | **Critical** | Emergency symptoms can match routine OPD clinics | `frontend/src/components/DepartmentFinder.jsx:28` uses unprioritized substring `.includes(q)` | A patient experiencing acute coronary syndrome or stroke searching "chest pain" could be directed to stand in New OPD morning line instead of going to Nehru Hospital Emergency or ATC. | Implement a dedicated Emergency Interception Engine that takes absolute precedence over routine clinic matching, triggers a modal/banner, and displays direct 24x7 hotlines. | **Identified** |
| **AUDIT-02** | **Security** | **High** | Firestore public read allows unpublished/draft data leakage | `firestore.rules:14-22` `allow read: if true;` | Draft, retracted, or incorrect hospital room data in Firestore is exposed to the public internet. | Restrict public read rules to `resource.data.status == 'published'`. | **Identified** |
| **AUDIT-03** | **Architecture**| **High** | Dual competing data models and dead backend routes | `frontend/src/services/dataService.js` vs `backend/src/controllers/directoryController.js` and `seed_data/pgi_directory_seed.json` | Changes made to seed data in one place drift. GitHub Pages deployment cannot execute Express backend. | Establish an authoritative data architecture: client uses authoritative versioned snapshot with Firestore hydration; backend and frontend share unified data contracts. | **Identified** |
| **AUDIT-04** | **Offline/PWA** | **High** | Service Worker fails to cache production asset bundles | `frontend/public/sw.js:6-11` only caches shell HTML and icons | When visitors enter concrete PGIMER basements or blocks with zero network coverage, uncached scripts fail to load, breaking navigation. | Cache versioned static assets, implement cache-first fallback with offline health indicators, and update manifest scope for GitHub Pages. | **Identified** |
| **AUDIT-05** | **Privacy** | **Medium** | Inadequate PII rejection in feedback collection | `backend/src/controllers/feedbackController.js:23-31` and `dataService.js:87-90` | Substring checks do not catch actual 10-digit phone numbers, 12-digit Aadhaar digits, or CR sequence numbers. | Implement robust pattern matching for phone numbers, Aadhaar, CR numbers, email, and provide clear non-collection warnings. | **Identified** |
| **AUDIT-06** | **Integrity** | **Medium** | False success reporting for unpersisted feedback | `frontend/src/services/dataService.js:107-116` returns `success: true` in mock mode | Patients believe a report has been sent to administrators when it is only in browser local storage. | Transparently distinguish locally cached feedback acknowledgments from confirmed cloud persistence. | **Identified** |
| **AUDIT-07** | **Quality** | **High** | Total absence of automated test harness | `package.json` (frontend and backend) has 0 test scripts and 0 test files | Regressions cannot be detected automatically in CI. | Integrate Vitest test runner for frontend and Node test runner for backend; implement unit, integration, and contract tests. | **Identified** |
| **AUDIT-08** | **Performance**| **Medium** | Monolithic Firebase bundle loads even in offline/mock mode | `vite build` shows `firebase-Byqjl0P0.js` is 634 kB (189 kB gzip) bundled into main path | Sluggish initial render on budget Android devices on 2G/3G networks. | Lazy-load / dynamically import Firebase SDK only when active configuration exists. | **Identified** |
| **AUDIT-09** | **Governance** | **Medium** | Missing content lifecycle and provenance metadata | Content items lack structured `status`, `verified_at`, `reviewer_role`, `source_reference` | Users and maintainers cannot verify freshness, traceability, or expiration of hospital data. | Formulate Content Governance Model with explicit lifecycle and verification checklists. | **Identified** |
| **AUDIT-10** | **Localization**| **Low** | Missing translation parity test and Punjabi fallback gaps | `translations.js` lacks automated key parity verification | Missing keys could fail silently or display confusing English text to Punjabi/Hindi visitors. | Build automated translation key validation test and audit all missing strings. | **Identified** |

---

## 3. Technology & Dependency Inventory

### Frontend
- **Runtime / Framework**: React 19.3.1, Vite 8.3.8, Tailwind CSS v4.3.5, Lucide React 1.75.0, Firebase SDK 13.4.0.
- **Build Status**: Succeeds (`vite build`), producing 980 kB total assets (~285 kB gzip).
- **Linter Status**: `oxlint` passes with 1 warning (`LanguageContext.jsx` export-components fast refresh).

### Backend
- **Runtime / Framework**: Node.js, Express 4.21.2, Firebase Admin 13.4.0, Cors 2.8.5.
- **Status**: Initializes cleanly in mock mode when no service account credentials exist.

### CI/CD
- `.github/workflows/ci.yml`: Only runs `npm run build` and `node -e require`. Runs zero tests.
- `.github/workflows/deploy-pages.yml`: Deploys `frontend/dist` to GitHub Pages under base path `/PGI-SAATHI/`.
