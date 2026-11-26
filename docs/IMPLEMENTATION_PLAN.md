# PGI Saathi - Production-Grade Transformation Plan

## Overview & Execution Roadmap

This plan governs the engineering transformation of PGI Saathi into an independent, production-grade patient navigation PWA.

---

## Phase Checklist & Progress Tracker

- [x] **Phase 0: Baseline & Repository Audit**
  - [x] Inspect directory, package manifests, workflows, and code structure
  - [x] Run baseline build and lint
  - [x] Produce `docs/ENGINEERING_AUDIT.md`
  - [x] Produce `docs/ARCHITECTURE_DECISIONS.md`
  - [x] Produce `docs/IMPLEMENTATION_PLAN.md`

- [x] **Phase 1: Establish Authoritative Data Architecture**
  - [x] Unify seed and runtime datasets into canonical, validated domain dataset (`authoritativeDirectory.js`)
  - [x] Enforce typed schemas and data validation at boundaries (`validateDepartment`, `validateBuilding`)
  - [x] Refactor `frontend/src/services/dataService.js` to support verified local snapshot + live Firestore hydration
  - [x] Eliminate dead code and duplicate filtering logic
  - [x] Align backend controller with authoritative dataset

- [x] **Phase 2: Verified Content & Data Governance**
  - [x] Introduce content lifecycle states (`draft`, `review`, `approved`, `published`, `withdrawn`)
  - [x] Add provenance metadata: record IDs, `verified_at`, `reviewer_role`, `source_reference`
  - [x] Tighten `firestore.rules` to enforce `resource.data.status == 'published'`
  - [x] Create `docs/CONTENT_GOVERNANCE.md` with verification policy and review checklist

- [x] **Phase 3: Safe Department Finder & Emergency Escalation**
  - [x] Build `src/utils/emergencyInterception.js` for acute symptom detection
  - [x] Enhance clinic search with normalized multilingual matching (English, Hindi, Punjabi)
  - [x] Provide match rationale ("Matched for: ...") and conservative non-diagnostic disclaimers
  - [x] Create `docs/SAFETY_AND_ESCALATION.md`
  - [x] Implement unit and integration tests for emergency interception and search queries

- [x] **Phase 4: Real Offline-First PWA**
  - [x] Overhaul `sw.js` with versioned precaching of bundles and assets
  - [x] Correct `manifest.json` start URL and scope for subpath / GitHub Pages hosting (`./`)
  - [x] Add real-time online/offline network status banner and cache age indicator in `App.jsx`
  - [x] Validate offline reload and deep-linking

- [x] **Phase 5: Security, Privacy & Abuse Resistance**
  - [x] Implement robust PII pattern sanitization (`src/utils/privacyValidator.js`)
  - [x] Add backend security headers, rate/payload limits (`10kb`), and sanitized feedback controller
  - [x] Create `docs/SECURITY_AND_PRIVACY.md` with threat model
  - [x] Fix false success reporting in offline feedback mode

- [x] **Phase 6: Multilingual Quality**
  - [x] Create automated translation key parity checker across `en`, `hi`, and `pa`
  - [x] Complete missing keys and refine Punjabi translations (42 keys across all 3 languages)
  - [x] Verify font rendering for Devanagari and Gurmukhi scripts

- [x] **Phase 7: Accessibility & UX**
  - [x] Add React Error Boundary for failure recovery
  - [x] Fix `LanguageContext` Fast Refresh lint warning
  - [x] Audit and improve keyboard navigation, focus indicators, and ARIA attributes
  - [x] Create `docs/ACCESSIBILITY_AUDIT.md`

- [x] **Phase 8: Performance & Reliability**
  - [x] Dynamically import Firebase to eliminate 480 kB unneeded upfront bundle payload
  - [x] Measure and record bundle metrics in `docs/PERFORMANCE.md`

- [x] **Phase 9: Automated Test Harness**
  - [x] Configure Node.js test runner across all critical domains
  - [x] Write unit tests: emergency interception, search matching, PII validation, translation completeness
  - [x] Write integration and contract tests for backend controllers
  - [x] Execute all 32 tests (100% passing)

- [x] **Phase 10: CI/CD & Release Engineering**
  - [x] Update `.github/workflows/ci.yml` with test, lint, and build stages
  - [x] Document deployment, release checklist, and rollback procedures in `docs/`

- [x] **Phase 11 & 12: Content Admin Ops & User Validation**
  - [x] Provide operational guidelines and usability validation protocols in `docs/USER_VALIDATION_PLAN.md`
