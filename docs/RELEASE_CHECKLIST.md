# PGI Saathi - Release Verification Checklist

This checklist must be reviewed and signed off by the engineering lead prior to any public production release or controlled pilot rollout.

---

## Pre-Release Quality Gates

- [ ] **Automated Test Suite**:
  - `node --test tests/*.test.mjs` executes and passes with 0 failures across all 32 tests.
- [ ] **Linter Quality**:
  - `cd frontend && npm run lint` passes with 0 errors and 0 warnings.
- [ ] **Production Build Integrity**:
  - `cd frontend && npm run build` completes cleanly.
  - Chunk size warnings evaluated; Firebase dynamic import verified.
- [ ] **Safety & Emergency Interception**:
  - Test query "chest pain" triggers immediate Red Alert banner and emergency calling buttons.
  - Test query "accident" triggers trauma center escalation.
  - Test queries for non-emergency symptoms ("fever", "knee pain") do not display false emergency alerts.
- [ ] **Privacy & PII Rejection**:
  - Submitting sample 10-digit mobile number or Aadhaar in feedback form is blocked before network transmission.
  - Offline feedback explicitly warns user that feedback is stored on device only.
- [ ] **Multilingual Consistency**:
  - Switch language to Hindi (हिन्दी) and confirm all tabs, titles, and disclaimer text render accurately.
  - Switch language to Punjabi (ਪੰਜਾਬੀ) and confirm Gurmukhi script renders without encoding defects.
- [ ] **Offline PWA Simulation**:
  - Load application once in Google Chrome / Chromium mobile viewport.
  - Toggle DevTools Network to "Offline" (Simulating basement of Nehru Hospital).
  - Refresh the page: App must load immediately with the yellow offline banner.
  - Search for "Cardiology" and "Eye": Verified local snapshot must return expected results.
- [ ] **Accessibility Check**:
  - High Contrast mode toggle successfully switches to dark theme with yellow/white high-contrast text.
  - Tab navigation cycles through all search and navigation controls with visible focus outline.
