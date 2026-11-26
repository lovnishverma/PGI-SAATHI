# PGI Saathi - Security & Privacy Specification

## 1. Threat Model & Privacy Stance

PGI Saathi is an **independent informational guide**. It does NOT require patient registration, personal accounts, medical records, or live tracking.

### Core Privacy Guarantees:
1. **Zero Patient Identifiers Collected**: The system never intentionally collects, stores, or transmits patient names, Aadhaar numbers, phone numbers, Central Registration (CR) numbers, prescriptions, or clinical notes.
2. **Anonymous Usage**: Patients navigate clinics, schedules, and checklists with 100% anonymity.
3. **Local-First Checklist**: All visit checklist items and ticks reside exclusively inside `localStorage` on the user's personal device. They are never sent across the network.

---

## 2. Threat Modeling Matrix

| Threat | Vulnerability Point | Protective Control |
| :--- | :--- | :--- |
| **Leakage of Unverified Data** | Firestore collections read publicly | Enforced `resource.data.status == 'published'` rule in `firestore.rules`. Unapproved/draft docs blocked. |
| **Accidental PHI in Feedback** | User submits CR card photo or doctor prescription text in feedback form | Multi-pattern regex sanitizer (`privacyValidator.js`) detecting Aadhaar (12-digit), mobile (10-digit), CR patterns, and medical terms. |
| **Tampering with Directory Data** | Public write to Firestore departments/buildings | Deny-by-default: only verified administrators can write (`isAdmin()`). |
| **Denial of Service / Memory Crash** | Large JSON payload sent to Express backend | Express body size strictly bounded to `10kb` (`express.json({ limit: '10kb' })`). |
| **Clickjacking / MIME Sniffing** | Web response headers | Injected security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`. |
| **False Data Trust Offline** | Stale cache presented as confirmed live fact | Explicit "Verified Offline Snapshot" badge with exact verification timestamp. |

---

## 3. PII Detection & Sanitization Engine

The client utility `src/utils/privacyValidator.js` validates user-submitted feedback before it leaves the browser:
- **Phone Pattern**: `\b[6-9]\d{9}\b`
- **Aadhaar Pattern**: `\b\d{4}\s?\d{4}\s?\d{4}\b`
- **CR Number Pattern**: `\b(?:cr\s*(?:no\.?|num(?:ber)?)?|c\.r\.?)\s*[:#-]?\s*\d{4,14}\b`
- **Email Pattern**: Standard RFC 5322 regex
- **Payload Bounds**: 5 characters minimum, 1200 characters maximum.

If any forbidden pattern is detected, submission is blocked with an educational prompt instructing the user to remove personal or patient identifiers.
