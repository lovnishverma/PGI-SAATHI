# PGI Saathi - Technical Architecture Document

## 1. Architectural Philosophy: 100% Free Serverless on Firebase Spark Plan

PGI Saathi is architected to operate with **zero infrastructure cost forever** by strictly utilizing the Google Firebase **Spark Plan (Free Tier)**. It eliminates the need for expensive traditional servers (EC2, Droplets, or custom container runtimes) while delivering high availability, low latency, and offline resilience for hospital visitors at PGIMER Chandigarh.

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |             React 18+ Single Page App / Progressive Web App (PWA)           |  |
|  |                                                                             |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  |  | Department Finder   |  | Visit Checklist      |  | Emergency Guidance |  |  |
|  |  | (Symptom Matching)  |  | (Offline IndexedDB)  |  | & Quick Hotlines   |  |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  |  | Multilingual Engine |  | Test & Sample Lab    |  | Feedback System    |  |  |
|  |  | (Hindi/Punjabi/Eng) |  | Directory & Timings  |  | (PII Safeguards)   |  |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|                 Firebase JS SDK (Client-Side Direct Connection)                   |
|                        with Firestore persistentLocalCache                        |
+-----------------------------------------------------------------------------------+
                                          |
                      HTTPS / WSS (Secure SSL Connection)
                                          |
+-----------------------------------------------------------------------------------+
|                        FIREBASE SPARK PLAN SERVICES (FREE)                         |
|                                                                                   |
|  +----------------------------+   +--------------------------------------------+  |
|  |      Firebase Hosting      |   |            Cloud Firestore (NoSQL)         |  |
|  |  - Global Fast CDN         |   |  - persistentLocalCache (indexedDB)        |  |
|  |  - Automated SSL & HTTPS   |   |  - Public read on published directory      |  |
|  |  - 10 GB Storage Free      |   |  - Anonymous write-only feedback           |  |
|  |  - 360 MB/day bandwidth   |   |  - 50k reads / 20k writes per day free     |  |
|  +----------------------------+   +--------------------------------------------+  |
|                                                                                   |
|  +----------------------------+   +--------------------------------------------+  |
|  |   Firebase Authentication  |   |           Firestore Security Rules         |  |
|  |  - Free up to 50,000 MAUs  |   |  - Declarative role-based access control   |  |
|  |  - Admin & Editor Logins   |   |  - Zero server code required               |  |
|  |  - Email/Password & Google |   |  - Payload validation & anti-tampering     |  |
|  +----------------------------+   +--------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Spark Plan Free Quotas & Optimization Strategy

To guarantee that the system never incurs billing charges, the architecture follows strict optimization patterns:

| Firebase Service | Spark Free Quota | PGI Saathi Design Pattern |
| :--- | :--- | :--- |
| **Cloud Firestore Reads** | 50,000 document reads / day | **Persistent Local Cache**: The client initializes Firestore with `persistentLocalCache` (IndexedDB). Directory data is downloaded once per session and served directly from device cache. 50k reads can comfortably serve 5,000+ daily visitors. |
| **Cloud Firestore Writes** | 20,000 document writes / day | Anonymous feedback submissions and admin audits are throttled on the client and strictly size-bounded (<1 KB). Directory data is read-heavy and write-rare. |
| **Cloud Firestore Storage** | 1 GiB total storage | Text-only directory entries, department mapping, and schedules occupy < 5 MB of database space. |
| **Firebase Hosting** | 10 GB storage / 360 MB day transfer | Optimized Vite build bundle is gzip/brotli compressed (< 300 KB initial chunk). Static assets and icons are cached via Service Worker. |
| **Firebase Auth** | 50,000 Monthly Active Users | Only staff/administrators log in. Regular patients use the app completely anonymously without authentication. |
| **Cloud Functions** | *(Requires Blaze plan)* | **Not used.** We achieve full security and business validation purely through **declarative Firestore Security Rules** (`firestore.rules`) and client-side logic. |

---

## 3. Data Schema (Cloud Firestore)

### `buildings/{buildingId}`
* `id` *(string)*: Unique slug (`new_opd`, `acc`, `apc`, `aec`, `atc`, `nehru_hospital`).
* `name` *(string)*: English title.
* `hindi_name` *(string)*: Hindi title.
* `punjabi_name` *(string)*: Punjabi title.
* `description` *(string)*: Operational overview.
* `reception_phone` *(array of strings)*: Official reception numbers.
* `landmark` *(string)*: Practical walking cues.
* `is_separate_building` *(boolean)*: True if physically distinct from the main New OPD block.
* `status` *(string)*: `published` | `stale` | `draft`.
* `verified_at` *(timestamp)*: Date of last staff verification.

### `departments/{deptId}`
* `id` *(string)*: Department identifier (e.g. `cardiology`, `orthopaedics`).
* `name` *(string)*: Official department title.
* `hindi_name` *(string)* / `punjabi_name` *(string)*: Localized titles.
* `building_id` *(string)*: Foreign reference to `buildings`.
* `concerns` *(array of strings)*: Search keywords and symptom terms (e.g., `["fever", "bukhar", "sugar", "bp"]`).
* `notes` *(string)*: First-visit patient guidance.
* `referral_needed` *(boolean)*: Indicates if preliminary General Medicine visit is required.
* `status` *(string)*: `published` | `stale`.

### `system_config/{configId}`
Single-document configurations:
* `opd_schedule`: General OPD registration hours (Mon-Fri 8:00-11:00 AM; Sat 8:00-10:30 AM).
* `emergency_guidance`: Red-flag medical signs and instant redirect instructions.
* `sample_collection`: Verified collection points (Room 127, Room 25 TDM, Radiology).

### `feedback/{feedbackId}`
* `id` *(auto-id)*.
* `category` *(string)*: `incorrect_room`, `stale_timing`, `accessibility_issue`, `general`.
* `message` *(string)*: Plaintext message (limited to 5–1200 characters).
* `created_at` *(timestamp)*.
* `status` *(string)*: `pending` | `reviewed` | `resolved`.
* *Security constraint*: Strict rejection if payload contains keys like `cr_number`, `aadhaar`, or patient identifiers.

---

## 4. Privacy by Design & Zero-PII Policy

In compliance with SRS Section 7.2:
1. **No Accounts Required for Patients**: Patients browse, search, and navigate completely anonymously.
2. **Local Checklist Storage**: The visit preparation checklist (carrying ID proofs, old OPD cards, reports, prescriptions) is saved purely in the browser's `localStorage` / `IndexedDB`. It is **never** transmitted to Firestore or any server.
3. **No Clinical Diagnosis**: The symptom-to-department finder serves strictly as an administrative routing guide (e.g., directing knee pain to Orthopaedics), reinforced with clear disclaimers that it is not medical diagnosis.
4. **Emergency Priority**: Emergency symptoms provide immediate visual cues to bypass the OPD card line and report directly to Emergency / Nehru Hospital.
