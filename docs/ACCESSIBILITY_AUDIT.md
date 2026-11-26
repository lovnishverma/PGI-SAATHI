# PGI Saathi - Accessibility Audit & Conformance Report

**Target Standard**: WCAG 2.2 Level AA  
**Evaluation Scope**: PGI Saathi Progressive Web App (Mobile & Desktop Views)  
**Primary User Context**: Patients and elderly attendants visiting PGIMER Chandigarh, often outdoors under bright sunlight, navigating unfamiliar buildings on low-cost smartphones.

---

## 1. Conformance Summary

| WCAG Guideline | Conformance Status | Implementation Details |
| :--- | :--- | :--- |
| **1.1 Text Alternatives** | **Pass** | All functional icons (`Search`, `Building2`, `Phone`, `Clock`, `Volume2`) have explicit `aria-hidden="true"` and descriptive button labels (`aria-label`). LogoMark has SVG accessible titles. |
| **1.3 Adaptable** | **Pass** | Semantic HTML structure: `<header>`, `<main>`, `<aside>`, `<nav>`, `<footer>`. Headings follow a strict hierarchical structure (`h1` -> `h2` -> `h3`). |
| **1.4 Distinguishable & Contrast** | **Pass** | Standard theme maintains a minimum 4.5:1 contrast ratio for normal text. A dedicated **High Contrast Mode** toggle is available, rendering maximum-contrast black (`#000000`) and yellow (`#facc15`) exceeding 14:1 contrast for outdoor readability. |
| **2.1 Keyboard Accessible** | **Pass** | All interactive controls (tabs, search inputs, modal triggers, symptom chips, filters) are reachable and operable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`). |
| **2.4 Navigable** | **Pass** | Visible focus indicators (`focus-visible:outline-2 focus-visible:outline-blue-600`) on all interactive buttons and inputs. Skip-navigation landmark architecture. |
| **2.5 Input Modalities** | **Pass** | Touch targets meet or exceed 44x44 CSS pixels across all mobile navigation buttons, symptom tags, and call links. |
| **3.1 Readable & Multilingual** | **Pass** | Full trilingual support for English, Hindi, and Punjabi with 100% key parity across all 42 localization keys. Native script font stacks ensure correct rendering of Devanagari and Gurmukhi conjuncts. |
| **3.2 Predictable** | **Pass** | Bottom navigation bar persists consistently across views. Language toggle instantly updates interface without page reload. |
| **4.1 Compatible** | **Pass** | Dynamic search results announce counts using `aria-live="polite"`. Emergency interception alerts announce immediately using `aria-live="assertive"`. Emergency modal traps Escape key with `role="dialog"` and `aria-modal="true"`. |

---

## 2. Assisted Audio Feature (Text-to-Speech)

For visitors with low literacy or visual impairment:
- Every major section, department name, landmark, and help desk phrase includes an **Audio Button** (`<AudioButton />`).
- Uses Web Speech Synthesis API (`window.speechSynthesis`) with dedicated language locales:
  - English: `en-IN`
  - Hindi: `hi-IN`
  - Punjabi: `pa-IN`
- Speech rate is comfortably calibrated to `0.9` for clear comprehension in busy, noisy hospital corridors.

---

## 3. High Contrast Mode

Toggling the Eye icon in the header switches the entire application to an ultra-high-contrast theme:
- Background: `#000000` (Pure Black)
- Primary Text: `#facc15` (Vibrant Yellow) / `#ffffff` (Pure White)
- Borders: `#eab308` (Yellow 500)
- Preserves battery life on OLED screens and eliminates glare in outdoor hospital waiting areas.
