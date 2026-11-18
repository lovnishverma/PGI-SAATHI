# PGI SAATHI
## Software Requirements Specification (SRS)
### Patient Navigation & Visit Assistance for PGIMER Chandigarh
**Document ID:** PGIS-SRS-002  
**Version:** 2.0  
**Status:** Approved Engineering Baseline for Serverless Spark Stack  
**Date:** 18 November 2026  
**Product Type:** Progressive Web Application (PWA) & Mobile-Responsive Web Application  
**Primary Platforms:** React 18+ (Vite) PWA (Mobile-First) | Google Firebase Spark Plan (Serverless)  
**Primary Languages:** Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), and English  
**Authors & Engineering Team:**
- **Lovnish Verma** (`@LovnishVerma`) — Project Lead & System Integration
- **Prateek Dhar Dwivedi** (`@prateek-dhar-dwivedi`) — Frontend UI/UX, Design System & Accessibility Lead
- **Mridul** (`@mridulck001`) — Cloud, Firebase & Backend Architecture Lead

---

### IMPORTANT STATUS NOTICE
This document specifies an independent patient-help product concept. It does not imply PGIMER endorsement, authorization, system access, or an official institutional relationship. All hospital-specific locations, schedules, phone numbers, and procedures are verified against public patient guides and authoritative public notices before publication.

---

## Document Control & Version History

| Version | Date | Authors | Summary of Changes | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1.0 | 17-Nov-2026 | Team Baseline | Initial draft specifying Flutter mobile app, Python FastAPI REST backend, and PostgreSQL database. | Superseded |
| **2.0** | **18-Nov-2026** | **Mridul, Prateek, Lovnish** | **Major Architecture & Tech Stack Revision**: Migrated to **100% Serverless on Google Firebase Spark Plan (Free Forever)**. Replaced Flutter with **React 18+ (Vite) PWA**, PostgreSQL with **Cloud Firestore (IndexedDB offline persistence)**, custom API backend with direct **Firebase Client SDK + Declarative Firestore Security Rules**, and managed hosting with **Firebase Hosting CDN**. Updated data models, security rules, performance quotas, and sprint task allocations. | **Approved Baseline** |

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS v2.0) defines the functional, quality, data, interface, security, operational, and acceptance requirements for **PGI Saathi**, an independent, zero-cost, offline-resilient patient navigation and visit assistance application for the Postgraduate Institute of Medical Education and Research (PGIMER), Chandigarh.

### 1.2 Product Vision
Help patients and attendants visiting PGIMER answer four fundamental questions:
1. **Where should I start?** (Department matching based on non-diagnostic concerns / symptoms).
2. **Which building or counter should I approach?** (Differentiating New OPD from separate specialty centers like Advanced Cardiac, Eye, Paediatric, and Trauma Centres).
3. **What should I carry and ask?** (Visit preparation checklist, required documents, test-slip directions, fasting requirements).
4. **How do I confirm the information is current?** (Content freshness, verified dates, and clear fallback notices to confirm on-ground with staff).

### 1.3 Intended Use and Safety Boundaries
* **Administrative Navigation Only**: The application provides navigation, public-information discovery, visit preparation, and explanations of published hospital procedures.
* **Strictly Non-Diagnostic**: The application **does not** provide medical diagnosis, clinical triage, symptom assessment, or treatment plans. Any department recommendation is strictly an administrative routing suggestion.
* **Emergency Protocol**: Acute, life-threatening symptoms (chest pain, stroke signs, severe trauma, loss of consciousness) immediately instruct patients to bypass the OPD card queue and proceed directly to Emergency / Nehru Hospital or the Advanced Trauma Centre.
* **Data Minimization & Zero-PII**: The application operates anonymously for patients. It does not collect, transmit, or store Central Registration (CR) numbers, Aadhaar numbers, prescriptions, or clinical records.

### 1.4 Definitions and Acronyms
* **CR Number**: Central Registration patient identifier used by PGIMER. (Never stored or requested by PGI Saathi in MVP).
* **OPD**: Outpatient Department.
* **PWA**: Progressive Web App — an installable, mobile-responsive web app with offline Service Worker caching.
* **Spark Plan**: Google Firebase's free-tier operational quota (50k Firestore reads/day, 20k writes/day, 10 GB hosting, free SSL, zero cost forever).
* **persistentLocalCache**: Firestore web SDK capability that caches queried collections directly in browser IndexedDB for instant, zero-network, zero-read-quota access.

---

## 2. Overall Description

### 2.1 Product Perspective
PGI Saathi is a client-side serverless application. Instead of maintaining traditional backend application servers, it connects directly from the React client to Google Firebase Spark services:
* **Client Layer**: React 18+ Single Page App packaged as a Progressive Web App (PWA).
* **Database Layer**: Cloud Firestore (NoSQL) with real-time listeners and multi-tab IndexedDB persistence.
* **Authorization & Validation**: Declarative server-side Firestore Security Rules (`firestore.rules`).
* **Hosting**: Firebase Hosting global Content Delivery Network (CDN) with automated SSL.
* **Administration**: Role-based access control managed via Firebase Authentication for verified content editors.

### 2.2 Business & Community Objectives
* Eliminate patient confusion between New OPD and separate specialty centers (ACC, APC, AEC, ATC).
* Prevent missed registrations by prominently displaying OPD registration cut-off hours (8:00 AM – 11:00 AM weekdays).
* Provide full linguistic accessibility for patients across North India via Hindi, Punjabi, and English interfaces.
* Achieve 100% financial sustainability by guaranteeing zero monthly server hosting or database operational costs.

### 2.3 Scope Comparison: Baseline v1.0 vs Serverless v2.0

| Area | Baseline v1.0 (Superseded) | Serverless v2.0 (Approved) |
| :--- | :--- | :--- |
| **Frontend Framework** | Flutter (Android-first APK) | **React 18+ (Vite) PWA / Mobile Web** |
| **Backend Architecture** | Python FastAPI REST microservice | **100% Serverless on Firebase Spark Plan** |
| **Database** | Relational PostgreSQL | **Cloud Firestore (NoSQL Document Store)** |
| **Client Caching** | Local SQLite / Isar store | **Firestore `persistentLocalCache` (IndexedDB)** |
| **Hosting & Infra Cost** | \$15–\$40/month (VPS / Managed DB) | **\$0.00 / month (Free Forever on Spark Plan)** |
| **Checklist Storage** | Local device store | **Browser `localStorage` (Zero server transfer)** |
| **Security Mechanism** | Custom JWT middleware in Python | **Declarative Firebase Security Rules (`firestore.rules`)** |

---

## 3. User Classes and Personas

1. **First-Time Patient / Attendant**: Needs plain-language guidance to locate the initial card registration counter, understands what documents to bring, and learns registration cut-off times.
2. **Returning Patient**: Holds an existing CR card, needs to locate specific clinic rooms or follow-up test collection desks.
3. **Older Adult / Low-Vision User**: Requires large typography, high-contrast visual cues, simple one-touch navigation, and screen-reader compatibility.
4. **Out-of-State Visitor**: Travels from Punjab, Haryana, Himachal, or J&K; needs Punjabi/Hindi instructions and clear arrival instructions.
5. **Content Editor / Moderator**: Authenticated staff member who updates department schedules, adds phone extensions, or flags room relocations.
6. **System Administrator**: Manages team accounts, security rule deployments, and audit logs.

---

## 4. Product Scope and Release Strategy

### 4.1 Release Sprints (Phase 1 — MVP)
* **Sprint 1: Scaffolding & Spark Infrastructure**: Repository setup, Firebase project configuration, Firestore security rules, seed data pipeline (`seed_data/`), React + Vite shell.
* **Sprint 2: Directory, Search & Department Discovery**: Trilingual department directory, building identification cards, symptom-to-OPD guided finder.
* **Sprint 3: Visit Preparation, Test Guide & Emergency Protocol**: Interactive offline checklist, Room 127/Room 25 test guide, emergency fast-track banner, WCAG accessibility audit.
* **Sprint 4: Admin Portal, Offline PWA & Launch Gate**: Firebase Auth admin dashboard, service worker offline caching, end-to-end verification, production deployment.

---

## 5. Functional Requirements

### 5.1 Patient-Facing Capabilities (Mobile PWA)

| ID | Priority | Feature | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **FR-001** | P0 | **Trilingual Interface** | User can toggle between English, Hindi (हिन्दी), and Punjabi (ਪੰਜਾਬੀ). Preference is saved locally. | UI labels, department names, guidance text, and checklists instantly render in the chosen language. |
| **FR-002** | P0 | **Department Directory** | Searchable list of all PGIMER clinical departments with building locations and operating details. | Instant client-side search across English names, Hindi/Punjabi names, and common aliases (e.g. "Kidney" $\rightarrow$ Nephrology). |
| **FR-003** | P0 | **Symptom-to-OPD Matcher** | Interactive picker allowing patients to select common non-diagnostic symptoms/concerns (e.g. fever, knee pain, eye issue). | Maps to the correct initial clinic; displays mandatory disclaimer that advice is navigational, not medical. |
| **FR-004** | P0 | **Separate Building Alerts** | Visual color-coded warning whenever a clinic is housed in a separate building (ACC, APC, AEC, ATC). | Explicitly cautions users: *"Do not look for this clinic in New OPD. Proceed to the separate building."* |
| **FR-005** | P0 | **OPD Registration Timings** | Live status indicator displaying current registration window (Mon–Fri 8:00–11:00 AM; Sat 8:00–10:30 AM). | Accurately indicates whether OPD registration is currently Open, Closing Soon (<30 min), or Closed. |
| **FR-006** | P0 | **Offline Visit Checklist** | Interactive checklist for required items: ID proof, old OPD cards, prescription slips, reports, water/food. | Checkbox state persists in `localStorage`; works 100% offline; zero data transmitted to server. |
| **FR-007** | P0 | **Lab Test & Sample Guide** | Step-by-step guidance for blood/urine tests (Room 127), TDM (Room 25), and fasting advisory. | Stresses: *"Check doctor's test slip first; confirm fasting before stopping medicines."* |
| **FR-008** | P0 | **Emergency Fast-Track** | High-visibility emergency view covering critical signs (chest pain, stroke symptoms, acute bleeding). | Provides direct 1-tap call to Emergency Reception (`0172-2755555`) and ATC (`0172-2755454`); warns not to wait in OPD queue. |
| **FR-009** | P0 | **Content Freshness Badge** | Every department and guide entry displays its last staff-verification date and status. | Entries marked `stale` display a warning banner advising patient to confirm at hospital help desks. |
| **FR-010** | P0 | **Anonymous Feedback** | Form allowing visitors to report outdated room numbers or wrong information without submitting personal data. | Validates payload size (5–1200 chars); rejects any input containing CR numbers or medical reports. |
| **FR-011** | P1 | **PWA Offline Mode** | Full application caching via Service Worker and Firestore IndexedDB persistence. | All directory pages, checklists, and emergency guides load instantly with zero mobile connectivity. |
| **FR-012** | P1 | **Accessibility (WCAG 2.2 AA)** | High-contrast theme toggle, min 44x44px touch targets, and full TalkBack / VoiceOver screen-reader labels. | Passes automated axe accessibility audits with 0 critical/serious violations. |

### 5.2 Administrative & Governance Capabilities

| ID | Priority | Feature | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **FR-013** | P0 | **Admin Authentication** | Secure login for content moderators using Firebase Authentication. | Unauthenticated users cannot view admin dashboards or write to directory collections. |
| **FR-014** | P0 | **Content Lifecycle Workflow** | Support document states: `draft`, `published`, `stale`, and `archived`. | Only verified and published records are visible in the public patient directory. |
| **FR-015** | P0 | **Audit Trail Logging** | Records administrative updates in `/audit_logs` (admin UID, timestamp, document ID, change summary). | Immutable audit log stored in Firestore, readable only by authorized administrators. |
| **FR-016** | P1 | **Feedback Triage Queue** | Dashboard for staff to review user-submitted correction notices and update the directory. | Allows staff to mark feedback items as `reviewed` or `resolved`. |

---

## 6. External Interface & Technical Architecture Requirements

### 6.1 Frontend User Interface Architecture
* **Framework**: React 18+ bootstrapped with **Vite** for ultra-fast compilation and minimal bundle footprint (< 300 KB gzip initial bundle).
* **Styling & Design System**: **Tailwind CSS** with a mobile-first responsive layout (bottom navigation bar on mobile viewports; top header on desktop).
* **Typography**: Unicode font stacks supporting:
  * English: Inter / System UI
  * Hindi: Noto Sans Devanagari
  * Punjabi: Noto Sans Gurmukhi
* **Iconography**: Lucide React (lightweight, tree-shaken SVGs).

### 6.2 Firebase Spark Plan Cloud Architecture
* **Client SDK Integration**: The React client uses the official `firebase/firestore`, `firebase/auth`, and `firebase/analytics` modular web SDKs.
* **Persistent Cache Configuration**:
  ```javascript
  import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
  const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
  });
  ```
  This guarantees that all document reads are cached in IndexedDB across browser tabs and app reloads, minimizing billable reads to practically zero.
* **Declarative Security Rules**: Complete enforcement of access boundaries directly at the database layer in `firestore.rules`. Zero application server code required.

---

## 7. Data Requirements and Schema (Firestore NoSQL)

### 7.1 Collections Specification

#### 1. `departments/{deptId}`
* `id` *(string)*: Unique key (e.g. `cardiology`, `internal_medicine`).
* `name` *(string)*: English title.
* `hindi_name` *(string)*: Hindi title.
* `punjabi_name` *(string)*: Punjabi title.
* `building_id` *(string)*: Reference to `buildings/{buildingId}`.
* `concerns` *(array of strings)*: Search and matching keywords (e.g. `["fever", "bukhar", "sugar", "bp"]`).
* `notes` *(string)*: Practical arrival guidance.
* `referral_needed` *(boolean)*: Whether consultation from General Medicine is mandatory.
* `status` *(string)*: `published` | `stale` | `draft`.
* `verified_at` *(timestamp)*: Timestamp of last manual verification.

#### 2. `buildings/{buildingId}`
* `id` *(string)*: `new_opd`, `acc`, `apc`, `aec`, `atc`, `nehru_hospital`.
* `name` *(string)* / `hindi_name` *(string)* / `punjabi_name` *(string)*.
* `description` *(string)*: Summary of facilities housed within.
* `reception_phone` *(array of strings)*: Published reception desk contact numbers.
* `landmark` *(string)*: Walking cues from main campus gates.
* `is_separate_building` *(boolean)*: True if distinct from New OPD block.

#### 3. `system_config/{configId}`
* `opd_schedule`: Contains registration timings and holiday rules.
* `emergency_guidance`: List of red-flag symptoms and triage phone numbers.
* `sample_collection`: Verified collection counter descriptions (Room 127, Room 25 TDM, etc.).

#### 4. `feedback/{feedbackId}`
* `id` *(string)*: Auto-generated document ID.
* `category` *(string)*: `incorrect_room`, `stale_timing`, `accessibility_issue`, `general`.
* `message` *(string)*: User description (5 to 1200 characters).
* `created_at` *(timestamp)*: Server timestamp.
* `status` *(string)*: `pending` | `reviewed` | `resolved`.

#### 5. `admins/{adminUid}` & `audit_logs/{logId}`
* Stored strictly for authorized staff authentication, role mapping, and immutable modification histories.

---

## 8. Non-Functional Requirements (NFR)

| ID | Quality Attribute | Priority | Requirement | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **NFR-001** | **Performance** | P0 | Cached directory search and screen navigation shall execute in $\le 150\text{ ms}$ on low-tier mobile devices. | Lighthouse & Chrome DevTools Performance profiling on simulated 4x CPU slowdown. |
| **NFR-002** | **Zero-Cost Operation** | P0 | Monthly operating cost must remain \$0.00 by never exceeding Firebase Spark tier quotas. | Firestore daily usage dashboard monitoring; persistent IndexedDB caching verification. |
| **NFR-003** | **Availability** | P0 | Directory information shall achieve 99.9% client-side availability via PWA Service Worker caching, even during complete network dropouts. | Network offline simulation in browser DevTools. |
| **NFR-004** | **Security & Access** | P0 | No unauthenticated or non-admin user shall be permitted to write, modify, or delete directory documents or inspect other users' feedback. | Automated Firebase Rules unit tests using `@firebase/rules-unit-testing`. |
| **NFR-005** | **Privacy Protection** | P0 | The application shall collect 0 medical records, CR numbers, or personal identifying data. Feedback form shall reject PII fields. | Network payload inspection and security rule schema validation tests. |
| **NFR-006** | **Accessibility** | P0 | All core user journeys shall satisfy WCAG 2.2 AA standards, including color contrast $\ge 4.5:1$ and touch targets $\ge 44\times 44\text{ px}$. | Automated axe-core testing and manual screen reader audits. |
| **NFR-007** | **Offline Footprint** | P1 | Total cached storage footprint shall remain under 15 MB on the user's device. | StorageManager API inspection on reference Android smartphone. |

---

## 9. Verification, Validation & Acceptance Plan

1. **Firebase Security Rules Testing**: Complete suite of test cases executing against the local Firebase Emulator testing public reads, admin-only writes, and feedback payload limits.
2. **Directory Accuracy & Seed Validation**: Manual verification of all seed data against published PGIMER patient guides and official notices.
3. **Accessibility Audits**: Verification using Android TalkBack, iOS VoiceOver, and desktop NVDA screen readers.
4. **Offline Resilience Validation**: Performing end-to-end patient flows (finding departments, checking sample collection rules, ticking preparation items) under simulated airplane mode.

---

## 10. Operational Sign-Off & Approvals

| Role | Name | Status | Date |
| :--- | :--- | :--- | :--- |
| Project Lead & System Integration | **Lovnish Verma** | Approved | 18-Nov-2026 |
| Frontend UI/UX & Accessibility Lead | **Prateek Dhar Dwivedi** | Approved | 18-Nov-2026 |
| Cloud, Firebase & Backend Architecture Lead | **Mridul** | Approved | 18-Nov-2026 |
