# PGI Saathi - Architecture Decisions Record (ADR)

## ADR-001: Authoritative Data Strategy (Client-Led Progressive PWA with Firestore Hydration)

### Status
Accepted

### Context
PGI Saathi is deployed as a static Progressive Web App (PWA) on GitHub Pages (and optionally Firebase Hosting). GitHub Pages cannot execute a persistent Node.js/Express backend server. The repository contained duplicate data sources:
- `seed_data/pgi_directory_seed.json` (read by backend)
- `frontend/src/data/localSeedData.js` (read by frontend)
- Direct client-side Firestore queries in `frontend/src/services/dataService.js`

### Decision
1. **Single Source of Truth**: Establish `src/data/authoritativeDirectory.js` as the canonical verified snapshot bundled inside the frontend. This snapshot contains rigorous provenance metadata (record IDs, status, verification dates, reviewer roles).
2. **Progressive Hydration**:
   - If Firebase credentials are configured and network is available, the client queries Firestore for real-time published records (`where('status', '==', 'published')`).
   - If offline, unconfigured, or if Firestore is unreachable, the client falls back seamlessly to the bundled verified snapshot.
   - The UI explicitly renders data status indicators (`Verified Offline Snapshot` vs `Live Cloud Synced`), displaying the exact verification timestamp so patients never mistake stale data for live confirmation.
3. **Backend Alignment**: The Express backend in `backend/` serves as an optional API gateway for external consumers or headless deployments, reading from the exact same validated canonical dataset.

### Consequences
- Zero hosting costs (runs 100% on free static hosting & Firebase Spark free tier).
- Complete offline resilience inside hospital buildings with poor cellular reception.
- Zero data drift between frontend and backend.

---

## ADR-002: Safety-First Emergency Interception Engine

### Status
Accepted

### Context
Visitors searching for symptoms such as "chest pain", "shortness of breath", "heart attack", "unconscious", or "severe bleeding" must NEVER be routed to routine morning OPD queues (which operate strictly 8:00 AM - 11:00 AM on weekdays).

### Decision
1. Implement a dedicated, clinically-informed **Emergency Interception Engine** (`src/utils/emergencyInterception.js`) that runs *before* any routine clinic keyword matching.
2. If an emergency red-flag term is detected (in English, Hindi, or Punjabi transliterations/scripts), the normal search results are intercepted:
   - A high-visibility emergency alert banner is displayed at the top of results.
   - The user is instructed: "DO NOT WAIT IN OPD QUEUES. Proceed immediately to Emergency / Nehru Hospital or Advanced Trauma Centre (ATC)."
   - Direct phone trigger buttons for Emergency (`0172-2755555`) and Trauma (`0172-2755454`) are rendered.
3. Ordinary clinic search results are demoted and clearly labeled with medical disclaimers.

### Consequences
- Prevents dangerous delays in emergency care.
- Fully offline and deterministic (requires no network or server-side AI inference).

---

## ADR-003: Privacy & Abuse-Resistant Feedback Collection

### Status
Accepted

### Context
Users reporting incorrect room numbers or schedules may inadvertently submit sensitive personally identifiable information (PII) or protected health information (PHI) such as Central Registration (CR) numbers, Aadhaar numbers, or mobile numbers.

### Decision
1. Implement client-side and server-side multi-pattern validators (`src/utils/privacyValidator.js`):
   - Regex detection for 10-digit Indian mobile numbers (`^[6-9]\d{9}$`).
   - Regex detection for 12-digit Aadhaar patterns (`\b\d{4}\s?\d{4}\s?\d{4}\b`).
   - Regex detection for PGIMER CR numbers (patterns matching `CR`, `CR NO`, 12-digit sequences).
   - Word boundaries for patient names, diagnosis terms, and medical records.
2. Rate-limiting and size boundaries: maximum message length bounded to 1200 characters, minimum 5 characters.
3. Truthful submission outcomes: When persistent storage is unconfigured, the UI clearly displays: "Stored in local review log on this device only (Cloud sync offline)", preventing false trust.

### Consequences
- Safeguards patient privacy.
- Mitigates automated spam and abuse.

---

## ADR-004: Real Offline-First PWA Caching Strategy

### Status
Accepted

### Context
The original service worker cached only four root files and used a network-first fetch policy. In concrete hospital environments, network requests hang, causing poor UX.

### Decision
1. Update `sw.js` with:
   - Cache versioning (`pgi-saathi-v2.x`).
   - Dynamic asset discovery: Cache all JavaScript, CSS, SVGs, and icon assets on first load and install.
   - Stale-While-Revalidate strategy for static assets and Cache-First with network fallback for offline reliability.
2. Fix `manifest.json` scope and `start_url` to respect dynamic GitHub Pages base path (`./`).
3. Add an Online/Offline status banner in the application header to inform users of connectivity state.

### Consequences
- Truly reliable offline experience on any mobile browser inside hospital corridors.
