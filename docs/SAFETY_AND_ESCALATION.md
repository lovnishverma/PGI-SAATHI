# PGI Saathi - Clinical Safety & Emergency Escalation Policy

## 1. Prime Directive: Emergency Priority Interception

Routine OPD registrations at PGIMER operate on weekday mornings (8:00 AM – 11:00 AM). In a tertiary medical complex as large as PGIMER Chandigarh, patients or attendants experiencing acute, life-threatening symptoms (e.g. myocardial infarction, cerebrovascular accident, acute respiratory failure, or severe poly-trauma) may intuitively search for symptoms like "chest pain" or "shortness of breath".

**Rule**: Keyword matching must NEVER intercept, delay, or downgrade a medical emergency into a routine OPD clinic visit.

---

## 2. Emergency Interception Architecture

Whenever a visitor types or searches in the Department Finder:

1. **Safety Pre-Evaluation**: The query is normalized and passed through `detectEmergency(query)`.
2. **Red-Flag Keywords**: If an acute sign (in English, Hindi, Punjabi, or transliterated vernacular) is detected:
   - Routine OPD clinic matching is superseded.
   - An assertive, high-urgency **RED ALERT BANNER** is displayed at the top of the interface.
   - The user is explicitly told: **"DO NOT WAIT IN OPD REGISTRATION QUEUES"**.
   - Immediate contact actions to Nehru Hospital Emergency (`0172-2755555`) and Advanced Trauma Centre (`0172-2755454`) are rendered.
3. **Deterministic & Offline**: Emergency interception is implemented locally in client JavaScript; it does not depend on cloud connectivity, server-side availability, or AI inference.

---

## 3. Acute Red-Flag Symptom Registry

The following symptoms trigger immediate emergency priority:

| Category | Typical Search Terms (Multi-lingual) | Primary Escalation Target |
| :--- | :--- | :--- |
| **Cardiac Emergency** | "chest pain", "heart attack", "chhati mein dard", "seene mein dard", "छाती में तेज दर्द", "ਦਿਲ ਦਾ ਦੌਰਾ" | Nehru Hospital Emergency Block |
| **Respiratory Failure** | "shortness of breath", "cannot breathe", "choking", "saans phoolna", "dam ghutna", "ਸਾਹ ਚੜ੍ਹਨਾ" | Nehru Hospital Emergency Block |
| **Acute Stroke** | "stroke", "paralysis", "face drooping", "slurred speech", "lakwa", "लकवा", "ਅਧਰੰਗ" | Nehru Hospital Emergency Triage |
| **Major Trauma / Hemorrhage** | "heavy bleeding", "profuse bleeding", "accident", "head injury", "सड़क दुर्घटना", "ਭਾਰੀ ਖੂਨ ਵਗਣਾ" | Advanced Trauma Centre (ATC) |
| **Neurological Crisis** | "unconscious", "loss of consciousness", "behosh", "daura", "fits", "seizure", "बेहोशी" | Nehru Hospital Emergency Block |
| **Poisoning / Toxins** | "poisoning", "snake bite", "snakebite", "zehar", "ਜ਼ਹਿਰ" | Nehru Hospital Emergency Block |

---

## 4. Operational Boundaries & Disclaimers

1. **Not a Diagnostic Tool**: PGI Saathi is an orientation aid. A recommendation to visit a clinic or an emergency block is not a medical diagnosis or triage assessment.
2. **No Automatic Dispatch**: The application does NOT contact emergency services or dispatch ambulances automatically. The user or attendant must place the phone call or proceed to the triage desk physically.
3. **When to Seek Human Assistance**: If the user is unsure, confused, or deteriorating, they are instructed to approach any uniformed hospital staff member, security guard, or reception desk immediately.
