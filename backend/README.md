# PGI Saathi - Backend API Service

Lightweight, zero-cost Node.js / Express backend service powering **PGI Saathi**. Integrates with **Google Cloud Firestore** via the **Firebase Admin SDK** and features automatic mock fallback to the verified PGIMER seed dataset.

---

## 🌟 Features

* **Unified REST API**: Clean endpoints for departments, buildings, OPD registration timings, emergency guidance, and lab test protocols.
* **Dual Operation Mode**:
  * **Firebase Connected**: Reads/writes directly from Cloud Firestore collections (`departments`, `buildings`, `system_config`, `feedback`).
  * **Standalone Mock Fallback**: When no service account is provided, automatically serves from `seed_data/pgi_directory_seed.json` with zero setup.
* **Zero-PII Feedback Protection**: Automatically filters and rejects messages containing patient identifiers, CR numbers, or medical records.
* **CORS Enabled**: Seamlessly accepts requests from the React frontend running locally or on Render/Firebase Hosting.

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
```

The server starts on `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service health and status check | None |
| `GET` | `/api/departments` | List clinical departments | `?search=knee` or `?building=acc` |
| `GET` | `/api/buildings` | List hospital buildings & centers | None |
| `GET` | `/api/schedule` | General OPD registration timings | None |
| `GET` | `/api/emergency` | Red-flag symptoms & hotlines | None |
| `GET` | `/api/samples` | Room 127 & Room 25 lab test rules | None |
| `POST`| `/api/feedback` | Submit anonymous correction report | Payload: `{ category, message }` |

### Example Request
```bash
curl http://localhost:5000/api/departments?search=fever
```

---

## 🌐 Deploy to Render (Web Service)

To host the backend API on **Render.com's Free Web Service**:

1. In Render Dashboard, click **New +** $\rightarrow$ **Web Service**.
2. Connect `https://github.com/mridulck001/PGI-SAATHI`.
3. Settings:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `node src/server.js`
   * **Environment**: `Node`
4. Set Environment Variables if connecting to Firebase:
   * `PORT`: `5000`
   * `FIREBASE_PROJECT_ID`: your project id
