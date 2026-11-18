# PGI Saathi - Team Work Breakdown & Responsibilities

**Project Repository:** [lovnishverma/PGI-SAATHI](https://github.com/lovnishverma/PGI-SAATHI)  
**Target Platform:** React + Vite PWA (Frontend) | Firebase Spark Plan Serverless (Backend)  
**Team Members:**
1. **Lovnish Verma** (`@LovnishVerma`) — Project Lead & System Integration
2. **Prateek Dhar Dwivedi** (`@prateek-dhar-dwivedi`) — Frontend UI/UX, Design System & Accessibility Lead
3. **Mridul** (`@mridulck001`) — Cloud, Firebase & Backend Architecture Lead

---

## 1. Team Role & Module Ownership Matrix

| Area | Primary Owner | Secondary Reviewer | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **Project Leadership & Roadmap** | **Lovnish** | Mridul & Prateek | Overall sprint delivery, scope governance, release gating, stakeholder communication. |
| **Firebase & Cloud Setup** | **Mridul** | Lovnish | Firebase Project creation (Spark plan), Firestore setup, Hosting config, `firestore.rules`, deployment scripts. |
| **Frontend Framework & UI/UX** | **Prateek** | Lovnish | React + Vite setup, Tailwind CSS theme, responsive mobile-first shell, navigation bars, modal dialogs, Lucide icons. |
| **Directory & Symptom Finder** | **Lovnish** | Prateek | Non-diagnostic department mapper, keyword/symptom search bar, building locator, location details card. |
| **Multilingual Support (i18n)** | **Prateek** | Lovnish | English, Hindi, and Punjabi localization setup (`i18next`), language toggle switch, font rendering for Gurmukhi & Devanagari. |
| **Visit Checklist & Offline Persistence** | **Lovnish** | Mridul | Offline checklist (IndexedDB/localStorage), new vs. returning patient guidance, test-slip guide (Room 127/25). |
| **Admin Portal & Content Verification**| **Mridul** | Lovnish | Admin login (Firebase Auth), directory review dashboard, marking entries stale/verified, audit logging. |
| **Accessibility (WCAG 2.2 AA)** | **Prateek** | Lovnish | High-contrast toggle, screen-reader (TalkBack/VoiceOver) ARIA labels, 44x44px minimum tap targets, large typography. |
| **Seed Ingestion & Security** | **Lovnish** | Mridul | Ingestion scripts (`seed_data/import_seed.js`), test datasets, payload validation, feedback submission with PII scrubbing. |

---

## 2. Sprint Roadmap & Task Division

### 🏃 Sprint 1: Scaffolding, Firebase Spark Infrastructure & Seed Data
*Objective: Set up the project repositories, connect Firebase Spark services, and load the baseline PGIMER seed data.*

#### **Mridul** (Firebase & DevOps):
- [ ] Initialize Firebase Project on **Spark Plan (Free Tier)**.
- [ ] Configure `firebase.json` for Firebase Hosting (SPA rewrites) and Firestore indexes.
- [ ] Deploy and verify `firestore.rules` for public read and protected admin writes.
- [ ] Set up GitHub Actions CI/CD to deploy preview channels on PR and production builds on `main`.

#### **Prateek** (Frontend Scaffolding & Design System):
- [ ] Initialize React 18+ app with **Vite** and **Tailwind CSS**.
- [ ] Configure responsive mobile-first shell (bottom navigation bar for mobile, clean responsive header for desktop).
- [ ] Set up base typography supporting English, Hindi (Noto Sans Devanagari), and Punjabi (Noto Sans Gurmukhi).
- [ ] Build global Emergency Top Banner with one-tap action to call emergency reception or view warning signs.

#### **Lovnish** (Seed Data & Client Data Layer):
- [ ] Finalize `seed_data/pgi_directory_seed.json` matching the official PGIMER Help Guide.
- [ ] Implement and test `seed_data/import_seed.js` to seed Firestore with initial departments, buildings, and OPD schedules.
- [ ] Create client-side `firebase.js` initialization using `initializeFirestore` with `persistentLocalCache` (IndexedDB caching).
- [ ] Build React query hooks (`useDepartments`, `useBuildings`, `useSchedule`) with zero-latency cached reads.

---

### 🏃 Sprint 2: Core Patient Features (Directory, Search & Department Discovery)
*Objective: Deliver the primary value proposition: answering "Where do I start?" and "Which building do I visit?".*

#### **Lovnish** (Core Navigation & Search):
- [ ] **Department Directory & Search**:
  - Full-text instant search across department names, synonyms, and localized keywords (e.g. searching "bukhar", "sugar", "fever" routes to Internal Medicine).
  - Building filters (New OPD, ACC, APC, AEC, ATC, Nehru Hospital).
- [ ] **Guided Department Discovery ("Symptom Finder")**:
  - Interactive non-diagnostic quiz/picker asking: "What is the primary concern?"
  - Returns suggested starting department with prominent disclaimer: *"This is navigational guidance, not a medical diagnosis."*
  - Clear indicator if a referral from General Medicine is mandatory.

#### **Prateek** (UI Components & Multilingual Experience):
- [ ] Build reusable UI cards for **Department Details** and **Building Details**.
- [ ] Integrate `react-i18next` with complete translation strings for English, Hindi, and Punjabi.
- [ ] Build language selector floating pill / header dropdown with instant language switching.
- [ ] Implement color-coded building tags so visitors immediately recognize when a clinic is in a separate building (e.g., ACC or APC).

#### **Mridul** (Content Governance & Performance Optimization):
- [ ] Ensure Firestore read operations do not duplicate on navigation (cache verification).
- [ ] Add "Last Verified" date badge and verification status on every department card.
- [ ] Implement "Stale Content" warning banner for entries past their review window.

---

### 🏃 Sprint 3: Visit Checklist, Test Guide & Emergency Protocol
*Objective: Help visitors prepare before leaving home, handle lab tests, and handle emergencies safely.*

#### **Lovnish** (Checklist & Test-Slip Guide):
- [ ] **OPD Visit Preparation Checklist**:
  - Interactive local checklist: ID proof, old OPD card, prescription slip, prior reports, registered phone, online pre-registration confirmation.
  - New vs. Returning patient bifurcation mode.
  - Zero-server storage: checklist state persists strictly in browser `localStorage`.
- [ ] **Lab Test & Sample Collection Guide**:
  - Dedicated guide for blood, urine, stool, culture, and imaging tests.
  - Highlight published Room 127 (Routine Blood/Urine) and Room 25 (TDM) with explicit warnings to check the doctor's printed slip first.
  - Crucial advice on fasting and not stopping prescribed medicines without consulting doctor.

#### **Prateek** (Emergency Flow & Accessibility Polish):
- [ ] **Emergency Section**:
  - High-priority view detailing red-flag symptoms (chest pain, stroke signs, severe trauma, unconsciousness).
  - Prominent "DO NOT WAIT IN OPD QUEUE" warning.
  - Quick-dial links for Emergency reception (`0172-2755555`) and Trauma Center (`0172-2755454`).
- [ ] **Accessibility (WCAG 2.2 AA Compliance)**:
  - Add High Contrast Mode toggle.
  - Verify all touch targets exceed 44x44 CSS pixels.
  - Audit with screen readers (NVDA / TalkBack) ensuring all buttons and search results have descriptive aria-labels.

#### **Mridul** (Feedback & Error Boundaries):
- [ ] **Correction & Feedback Submission**:
  - Simple modal for patients/staff to report outdated room numbers, wrong timings, or directions.
  - Form validation that warns users NOT to paste patient names, CR numbers, or medical reports.
  - Submits directly to Firestore `/feedback` collection with strict size bounds.

---

### 🏃 Sprint 4: Admin Management, PWA Offline Service Worker & Final Launch
*Objective: Provide administrative content management, installable offline PWA, and release verification.*

#### **Mridul** (Admin Portal & Authentication):
- [ ] Enable Firebase Authentication (Email/Password & Google Sign-In) for administrators.
- [ ] Build lightweight `/admin` dashboard:
  - View, approve, or edit department information, phone numbers, and timings.
  - Mark entries as `published`, `stale`, or `draft`.
  - Review anonymous feedback submissions and resolve reports.
- [ ] Implement audit trail logging (`/audit_logs`) whenever content is updated.

#### **Prateek** (PWA & Offline Packaging):
- [ ] Configure `vite-plugin-pwa` with web app manifest and service worker.
- [ ] Add "Install App" prompt for Android/iOS users.
- [ ] Ensure full offline experience: directory, guides, and saved checklist work completely without internet connection.

#### **Lovnish** (Verification, Testing & Documentation):
- [ ] Execute End-to-End user journey test cases (UC-01 to UC-05 from SRS).
- [ ] Verify security rules using Firebase Emulator Suite.
- [ ] Document final release notes, user guide, and submission checklist.

---

## 3. Collaboration & Git Workflow

1. **Branching Strategy**:
   - `main`: Production-ready code; protected branch.
   - `develop`: Integration branch for sprints.
   - Feature branches: `feat/<feature-name>` (e.g., `feat/department-finder`, `feat/firebase-setup`, `feat/i18n-hindi`).
2. **Pull Request Protocol**:
   - Each PR must link to its assigned sprint task.
   - Requires at least 1 review approval from another team member before merging into `develop`.
   - Never commit API keys, service account JSONs, or personal patient data.
3. **Commit Convention**:
   - Follow standard prefixes: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
