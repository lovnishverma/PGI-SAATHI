# PGI Saathi - Release Roadmap & Milestones

This roadmap aligns engineering deliverables with the Software Requirements Specification (SRS v1.0).

---

## 📍 Phase 0: Discovery & Foundation (Current Baseline)
* **Status:** Complete ✅
* **Scope:**
  - Software Requirements Specification baseline (SRS v1.0).
  - Seed knowledge extraction from the PGIMER Patient Help Guide.
  - Architecture transition: Flutter/Postgres $\rightarrow$ **React + Firebase Spark Plan Serverless (0-Cost Forever)**.
  - Team alignment and task breakdown across **Mridul**, **Prateek**, and **Lovnish**.

---

## 📍 Phase 1: MVP Public Beta (Sprint 1 – Sprint 4)
* **Status:** In Progress 🚀
* **Target Platforms:** Progressive Web App (PWA) / Responsive Mobile Web
* **Key Deliverables:**
  - **Department & Building Directory:** Searchable directory with landmark guides and room details.
  - **Guided Department Discovery ("Symptom Finder"):** Non-diagnostic category matching to steer patients to the right initial clinic.
  - **Trilingual Support:** Instant language switching between Hindi, Punjabi, and English.
  - **OPD Visit Preparation:** Offline checklist for new vs. returning patients.
  - **Sample Collection Guide:** Routine Blood/Urine (Room 127), TDM (Room 25), and fasting advisory.
  - **Emergency Banner & Protocol:** Direct routing for acute warning signs to Emergency/ATC.
  - **Offline Resilience:** IndexedDB persistence with Firestore `persistentLocalCache` and Service Worker.
  - **Admin Content Management:** Authenticated portal for updating schedules and verifying locations.
  - **Anonymous Correction Reports:** Citizen feedback loop to report wrong room numbers or timings.

---

## 📍 Phase 2: Improvement & Field Validation
* **Status:** In Progress 🚀
* **Scope:**
  - Real-world usability testing on low-cost Android hardware with patient attendants at PGIMER.
  - Optional browser Text-to-Speech (TTS) audio readout of guides in Hindi and Punjabi.
  - Search refinement based on aggregated privacy-preserving search queries (common vernacular spelling variations).
  - Interactive static SVG campus landmark map highlighting walking routes between New OPD, ACC, APC, AEC, and ATC.

---

## 📍 Phase 3: Authorized Institutional Collaboration (Future)
* **Status:** Deferred / Subject to Official Sanction 🔒
* **Scope:**
  - Official PGIMER institutional endorsement and live system integration.
  - Live online OPD pre-registration status and queue token display (only if authorized via secure hospital API).
  - Official indoor wayfinding beacons or verified turn-by-turn routing.
