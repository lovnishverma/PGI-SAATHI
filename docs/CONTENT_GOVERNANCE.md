# PGI Saathi - Content Governance & Verification Policy

## 1. Purpose & Core Principles

PGI Saathi is an **independent patient navigation aid** designed to help patients and attendants orient themselves when visiting PGIMER Chandigarh. Because vulnerable patients rely on this information during stressful hospital visits, information integrity is treated with the highest ethical and engineering rigor.

### Non-Negotiable Rules:
1. **Zero Fabrication**: Room numbers, department locations, OPD timings, contact details, or test preparation guidelines must NEVER be invented, inferred, or guessed. If verified data is unavailable, the application must display that limitation explicitly.
2. **Strict Publication Boundary**: Only records with `status: 'published'` are accessible through public interfaces (enforced both at the client query level and database security rule boundary).
3. **Traceability**: Every operationally critical record must cite a documented source reference, last verification date, and an accountable reviewer role.
4. **No Medical Advice**: Department listings assist in building orientation and queue selection; they never diagnose illnesses, predict clinical outcomes, or replace triage clinicians.

---

## 2. Content Lifecycle

All hospital operational records adhere to a formal 5-stage lifecycle:

```
[ Draft ] ---> [ In Review ] ---> [ Approved ] ---> [ Published ] ---> [ Withdrawn / Expired ]
   |                                                     |
   +----------------- (Rejected / Scrapped) <-----------+
```

| Lifecycle State | Description | Public Visibility |
| :--- | :--- | :--- |
| `draft` | Record newly created or imported from raw notes. Under active authoring. | **NEVER** visible to public |
| `review` | Submitted for verification against official hospital signage, noticeboards, or clinical staff. | **NEVER** visible to public |
| `approved` | Validated by a designated coordinator or reviewer; scheduled for publication. | **NEVER** visible to public |
| `published` | Active, verified record currently deployed to production and client caches. | **VISIBLE** to public |
| `withdrawn` | Deprecated, superseded, or erroneous record temporarily or permanently disabled. | **NEVER** visible to public |

---

## 3. Schema & Provenance Requirements

Every record within `authoritativeDirectory.js` and Firestore collections (`departments`, `buildings`, `system_config`) must include:

```typescript
interface OperationalRecord {
  id: string;                         // Stable slug (e.g., 'internal_medicine', 'acc')
  name: string;                       // Primary English title
  hindi_name?: string;                // Reviewed Hindi title
  punjabi_name?: string;              // Reviewed Punjabi title
  status: 'draft' | 'review' | 'approved' | 'published' | 'withdrawn';
  verified_at: string;                // ISO 8601 Date (YYYY-MM-DD)
  reviewer_role: string;              // e.g., 'Clinical Navigation Reviewer'
  source_reference: string;           // Documented source (e.g. 'PGIMER Official OPD Schedule 2026')
  version: string;                    // Semantic data version (e.g. '2.2.0')
  expires_at?: string;                // Re-verification due date
}
```

---

## 4. Verification Checklist for Content Maintainers

Before transitioning any record from `approved` to `published`:

- [ ] **Physical Location Reconfirmation**: Has the building, block, floor, or room number been confirmed on-site or against official PGIMER publications within the last 90 days?
- [ ] **OPD Registration Hours**: Are the stated registration windows aligned with official PGIMER OPD hours (Mon–Fri 8:00 AM – 11:00 AM; Saturday 8:00 AM – 10:30 AM; Sunday closed for routine OPD)?
- [ ] **Separate Building Verification**: If the department is in a separate specialty center (ACC, AEC, APC, ATC, Nehru Hospital), is the separate building flag explicitly set to prevent patients from queueing in New OPD?
- [ ] **Referral Requirements**: Does this specialty require an initial referral slip from General Medicine before patients can register? If yes, is `referral_needed: true`?
- [ ] **Trilingual Accuracy**: Have the Hindi and Punjabi translations been checked for plain-language clarity rather than robotic literal translations?
- [ ] **Emergency Non-Interception**: Does the department's concern array exclude acute emergency conditions that belong strictly to the 24x7 Emergency Ward or ATC?
