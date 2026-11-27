# PGI Saathi - Backend API Service

Lightweight, zero-cost Node.js / Express backend service powering **PGI Saathi**. Integrates with **Google Cloud Firestore** via the **Firebase Admin SDK** and features automatic mock fallback to the verified PGIMER seed dataset.

---

## 🌟 Features

* **Unified REST API**: Clean endpoints for departments, buildings, guided symptom/concern finder, golden rules, OPD registration timings, emergency guidance, and lab test protocols.
* **Dual Operation Mode**:
  * **Firebase Connected**: Reads/writes directly from Cloud Firestore collections (`departments`, `buildings`, `system_config`, `feedback`, `audit_logs`, `admins`).
  * **Standalone Mock Fallback**: When no service account is provided, automatically serves from `seed_data/pgi_directory_seed.json` with zero setup.
* **Spark Plan Quota Protection**: In-memory TTL caching (`Cache-Control` + cache invalidation on admin writes) and sliding-window rate limiting on feedback submissions.
* **Content Governance & Freshness**: Tracks `status` (`published`, `stale`, `draft`), `verified_at`, and computed `is_stale` flags.
* **Zero-PII Feedback Protection**: Automatically filters and rejects messages containing patient identifiers, CR numbers, Aadhaar numbers, phone numbers, emails, or medical records.
* **Admin Portal & Audit Trail**: Bearer-authenticated admin endpoints (Firebase ID token or `ADMIN_API_KEY` in local mock mode) that log every mutation to `audit_logs`.

---

## 🚀 How to Run Locally

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Start the server
```bash
# Production mode:
npm start

# Development mode (auto-reload on file changes):
npm run dev

# Run automated tests:
npm test
```

The server starts on `http://localhost:5000`.

---

## 📡 API Endpoints

### Public Endpoints
| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service health and status check | None |
| `GET` | `/api/departments` | List published clinical departments | `?search=knee` or `?building=acc` |
| `GET` | `/api/departments/:id` | Single department with building info | None |
| `GET` | `/api/buildings` | List published hospital buildings & centers | `?separate_only=true` |
| `GET` | `/api/buildings/:id` | Single building with its departments | None |
| `GET` | `/api/finder` | Guided non-diagnostic department finder | `?q=chest` (required) |
| `GET` | `/api/schedule` | General OPD registration timings | None |
| `GET` | `/api/emergency` | Red-flag symptoms & hotlines | None |
| `GET` | `/api/samples` | Room 127 & Room 25 lab test rules | None |
| `GET` | `/api/golden-rules` | 5 Golden Rules for PGIMER visitors | None |
| `POST`| `/api/feedback` | Submit anonymous correction report (rate-limited) | `{ category, message, target_id?, target_type? }` |

### Admin Endpoints (`Authorization: Bearer <token>`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/departments` | List all departments (including `draft` and `stale`) |
| `PATCH` | `/api/admin/departments/:id` | Update department details/status & write audit log |
| `POST` | `/api/admin/departments/:id/verify` | Mark department `published` & refresh `verified_at` |
| `GET` | `/api/admin/buildings` | List all buildings (including `draft` and `stale`) |
| `PATCH` | `/api/admin/buildings/:id` | Update building details/status & write audit log |
| `GET` | `/api/admin/feedback` | List feedback submissions (`?status=&category=`) |
| `PATCH` | `/api/admin/feedback/:id` | Update feedback status (`pending` \| `reviewed` \| `resolved`) |
| `GET` | `/api/admin/audit-logs` | View recent admin audit trail (`?limit=50`) |

---

## 🌐 Deploy to Render (Web Service)

To host the backend API on **Render.com's Free Web Service**:

1. In Render Dashboard, click **New +** $\rightarrow$ **Web Service**.
2. Connect your repository.
3. Settings:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `node src/server.js`
   * **Environment**: `Node`
4. Set Environment Variables if connecting to Firebase:
   * `PORT`: `5000`
   * `FIREBASE_PROJECT_ID`: your project id
