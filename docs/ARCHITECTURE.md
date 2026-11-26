# PGI Saathi - Technical Architecture Specification

## 1. Architectural Philosophy: Free Serverless Progressive Web App

PGI Saathi is designed for zero infrastructure operating costs, high availability, complete privacy, and offline resilience for visitors at PGIMER Chandigarh.

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |           React 19 Progressive Web App (PWA) on GitHub Pages / CDN          |  |
|  |                                                                             |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  |  | Emergency Engine    |  | Department Finder    |  | Offline Checklist  |  |  |
|  |  | (Red-Flag Priority) |  | (Multilingual Match) |  | (Local Storage)    |  |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  |  | Trilingual Engine   |  | Lab Test Preparation |  | Privacy Feedback   |  |  |
|  |  | (En / Hi / Pa)      |  | & Timings Guide      |  | (Regex Sanitizer)  |  |  |
|  |  +---------------------+  +----------------------+  +--------------------+  |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|      +----------------------------------+----------------------------------+      |
|      |                                                                     |      |
|      v                                                                     v      |
|  [ Bundled Authoritative Snapshot ]                    [ Cloud Firestore (Optional) ]
|  - 100% Offline Single Source of Truth                 - Live updates when online
|  - Provenance & Lifecycle metadata                     - Rule: status == 'published'
|  - Instant load, zero network latency                  - Persistent IndexedDB cache
+-----------------------------------------------------------------------------------+
```

---

## 2. Authoritative Data Strategy

The repository follows a single unified authoritative data architecture:
1. **Canonical Local Dataset**: `src/data/authoritativeDirectory.js` contains the complete verified snapshot with full provenance metadata.
2. **Dynamic Hydration**:
   - When Firebase credentials are present and network is online, `dataService.js` queries Cloud Firestore strictly for records where `status == 'published'`.
   - When offline, unconfigured, or in standalone mode, `dataService.js` directly serves the versioned, verified local snapshot.
3. **Data Parity with Backend**: The backend (`backend/src/controllers/directoryController.js`) reads from `seed_data/pgi_directory_seed.json`, which is synchronized with the exact same data schema and content versions.

---

## 3. Security Boundary & Database Rules

- **Deny-by-default**: All unmatched paths in Firestore are blocked (`allow read, write: if false;`).
- **Publication Gate**: Public reads for `/departments`, `/buildings`, and `/system_config` require `resource.data.status == 'published'`. Unapproved or draft records can never be leaked to public clients.
- **Feedback Boundary**: Anonymous feedback creates documents only if payload size is between 5 and 1200 characters and contains zero PII fields (`cr_number`, `aadhaar`, `phone`, `patient_name`, etc.). Reads, updates, and deletes are restricted strictly to administrators.
