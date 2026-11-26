# PGI Saathi - Rollback & Incident Recovery Procedure

## 1. Rollback Triggers

Initiate a rollback immediately if any of the following conditions occur post-deployment:
1. **Critical Safety Regression**: Emergency red-flag symptoms fail to trigger the priority emergency banner, or routine clinics are falsely suggested for acute emergencies.
2. **Offline Blackout**: Service worker cache corruption causes the PWA to show a blank screen on offline reload.
3. **Data Integrity Failure**: Erroneous room numbers, schedules, or contact numbers are identified in published datasets.

---

## 2. Emergency Rollback Procedures

### Scenario A: Rollback GitHub Pages Deployment
1. Identify the last known stable Git commit hash on `main`:
   ```bash
   git log --oneline -n 5
   ```
2. Revert the problematic commit using Git revert:
   ```bash
   git revert <bad_commit_hash> -m "Emergency Rollback: Reverting to stable release"
   git push origin main
   ```
3. GitHub Actions `deploy-pages.yml` will automatically build and publish the reverted commit artifact within 2 minutes.

### Scenario B: Service Worker Cache Invalidation
If clients have cached a corrupted service worker:
1. Increment `CACHE_NAME` in `frontend/public/sw.js`:
   ```javascript
   const CACHE_NAME = 'pgi-saathi-v2.2.1-hotfix';
   ```
2. Push the change to `main`.
3. When users reconnect to cellular or Wi-Fi, the browser detects the modified service worker byte-for-byte, triggers the `install` and `activate` lifecycle events, and automatically deletes the outdated cache partition.
