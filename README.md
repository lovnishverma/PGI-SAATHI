# PGI Saathi (पीजीआई साथी / ਪੀਜੀਆਈ ਸਾਥੀ)

> **Empowering patients and attendants visiting PGIMER Chandigarh with instant, multilingual, offline-ready navigation and visit guidance.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend: React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](https://react.dev/)
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?logo=github)](https://www.lovnishverma.in/PGI-SAATHI/)
[![Backend: Firebase Spark Plan](https://img.shields.io/badge/Backend-Firebase%20Spark%20Plan%20(Free%20Forever)-FFA611.svg)](https://firebase.google.com/)
[![Architecture: Serverless](https://img.shields.io/badge/Architecture-100%25%20Serverless-green.svg)](ARCHITECTURE.md)
[![Status: Release Ready v2.2.0](https://img.shields.io/badge/Status-Release%20Ready%20v2.2.0-brightgreen.svg)](ROADMAP.md)

---

## 🌟 Vision & Key Objectives

Visiting a premier medical tertiary center like **PGIMER Chandigarh** can be overwhelming. With over 10,000 daily outpatient visitors, multiple independent specialty centers (Advanced Cardiac, Eye, Paediatric, and Trauma Centres), strict registration cut-offs, and separate lab collection counters, patients often lose critical hours navigating the campus.

**PGI Saathi** solves this through an independent, lightweight, accessible digital guide that answers four practical questions:
1. **Where should I start?** (Department matching based on non-diagnostic concerns / symptoms).
2. **Which building or counter should I approach?** (Differentiating New OPD from separate specialty centers).
3. **What should I carry and ask?** (Visit checklists, documents, test-slip directions, fasting requirements).
4. **How do I confirm the information is current?** (Content freshness, verified dates, and clear fallback notices to confirm on-ground with staff).

---

## ⚡ Zero-Cost Serverless Architecture (Firebase Spark Plan)

PGI Saathi is designed to run **free forever** on the **Firebase Spark Plan**, requiring **zero monthly hosting fees or cloud server maintenance**.

```
[ React 18 + Vite PWA ] (Mobile & Desktop Responsive)
       │
       ├── Multilingual Engine (English, Hindi, Punjabi)
       ├── Offline IndexedDB Local Persistence
       ├── Local-Only Visit Checklist (Zero PII stored)
       │
       ▼ (Direct Client Connection via Firebase JS SDK)
[ Google Firebase Spark Plan (100% Free Forever) ]
       ├── Firebase Hosting (Global CDN, Automated SSL, Free custom domain)
       ├── Cloud Firestore (persistentLocalCache, 50k free reads / 20k writes daily)
       ├── Firebase Authentication (Staff & Content Reviewer Login)
       └── Declarative Security Rules (Strict access control, zero cloud functions needed)
```

For complete technical and data specifications, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 👥 Team Work Distribution

| Team Member | Core Focus | Primary Deliverables |
| :--- | :--- | :--- |
| **Lovnish Verma** (`@LovnishVerma`) | **Project Lead & System Integration** | Project leadership, overall architecture coordination, Non-diagnostic Department Finder ("Symptom Matcher"), full-text search engine, offline visit checklist, test collection guide (Room 127/25), seed data pipeline (`seed_data/`), feedback module with PII safeguards. |
| **Prateek Dhar Dwivedi** (`@prateek-dhar-dwivedi`) | **Frontend UI/UX & Accessibility Lead** | React 18 + Vite scaffold, Tailwind CSS mobile-first design, Multilingual localization (English, Hindi, Punjabi), WCAG 2.2 AA accessibility (high contrast, TalkBack screen-reader support), PWA service worker. |
| **Mridul** (`@mridulck001`) | **Cloud, Firebase & Backend Architecture Lead** | Firebase project setup (Spark plan), Firestore database design, security rules (`firestore.rules`), CI/CD GitHub Actions, Admin authentication & verification portal. |

Detailed sprint milestones, task assignments, and pull-request procedures are outlined in [TEAM_WORK_BREAKDOWN.md](TEAM_WORK_BREAKDOWN.md).

---

## 📱 Core Features (Production Standard)

* 🔍 **Smart Department Finder**: Suggests the right starting department based on common symptoms or health concerns in Hindi, Punjabi, or English with instant clinical red-flag emergency interception.
* 👣 **6-Step Chronological Patient Journey Wizard**: Interactive step-by-step roadmap from Gate arrival (7:30–8:00 AM) to Token Dispenser, ₹10 CR card generation, Room 127 blood lab, doctor consultation, and discounted pharmacy.
* 🗺️ **Interactive 2D Campus Map**: SVG spatial schematic showing Gate 1, 2, 3 access relative to New OPD, Nehru Hospital, ACC, AEC, APC, ATC, and Sarais with interactive directions.
* 🏢 **New OPD Floor-by-Floor Directory**: Verified Ground through 5th Floor layout mapping Room 127 (Block C 1st Floor), Room 25 TDM, Internal Medicine units, Surgery, and specialty clinics.
* 🚌 **Free Campus Transit & Wheelchairs**: Free battery-operated golf carts (BOV) for senior citizens and disabled visitors, Swaraj Mazda shuttle buses, wheelchair/stretcher stations, and security control assistance.
* 💊 **Subsidized AMRIT Pharmacies & Night Stays**: Directs patients to in-campus HLL AMRIT pharmacies (50%–70% discount), Jan Aushadhi generic stores, and affordable Sarais (Infosys Red Cross Sarai, Rotary Sarai, Hansraj Dharamshala at ₹50–₹100/night).
* 🏥 **Govt Schemes & 24x7 Blood Bank**: Physical help desks for Ayushman Bharat (AB-PMJAY), Poor Patient Welfare Fund (PPWF) BPL assistance, and Department of Transfusion Medicine replacement donor slip guidelines.
* 🚨 **Color-Coded Emergency Triage Protocol**: Educates attendants on Nehru Hospital & ATC Red Zone (Hall A immediate resuscitation), Yellow Zone (Hall C observation), and Green Zone (minor ambulatory).
* 🌐 **Online Pre-Registration Rules**: Clear guidance for `pgimer.edu.in` pre-registration, 30-day advance booking, 6:00 AM visit cutoff, and dedicated Counter No. 1 morning reporting times.
* ⏰ **OPD Timing & Cut-offs**: Shows general morning registration windows (8:00 AM – 11:00 AM weekdays; 8:00 AM – 10:30 AM Saturdays), afternoon special clinics (2:00 PM – 3:00 PM registration), and inpatient visiting hours (6:00–7:00 AM & 6:30–7:30 PM).
* 🧪 **Lab Test & Sample Collection Guide**: Practical walkthrough for blood/urine collection (Room 127), Therapeutic Drug Monitoring (Room 25), and 4 Golden Sample questions.
* 📝 **Offline Preparation Checklist**: Saves required documents in device local storage without transmitting personal data, with one-tap WhatsApp checklist sharing.
* 🗣️ **Help Desk Pocket Phrases**: Multilingual audio-enabled enquiry phrases in Hindi, Punjabi, and English for asking directions at hospital reception.
* 🛡️ **Strict PII Privacy Protection**: Client- and backend-level regex redaction intercepting phone numbers, 12-digit Aadhaar, and CR numbers in feedback submissions.
* 🚨 **Off-Campus Vaccine & Rabies Deflection**: Real-time search interception warning patients that PGIMER does not run routine outpatient Anti-Rabies (ARV) or Yellow Fever clinics, deflecting to GMSH-16 (24x7 Emergency ARV) and Civil Hospital Sector 22.
* 👶 **Dedicated Paediatric Immunization Clinic**: Timings (8:00 AM – 12:00 PM Mon–Fri) and reception contacts for child vaccinations at Advanced Paediatric Centre (APC) Ground Floor.
* 🅿️ **MLCP Parking & Clamping Rules**: Rates, early morning capacity cut-offs (fills by 8:30 AM), and strict ₹1,000+ towing/clamping warnings for unauthorized parking.
* 🏧 **Strategic 24x7 Campus ATMs**: Precise on-ground locations of State Bank of India, Punjab National Bank, and Union Bank ATMs across New OPD, Nehru Hospital, and Eye Centre.
* 🚓 **Police Post & Rotary Eye Bank**: Direct contacts for PGI Police Post (0172-2928012 / 9779580940) for lost belongings, and 24x7 Rotary PGI Eye Bank (`7087008200`) for posthumous eye donations.
* 🕊️ **Hearse & Mortuary Transport**: Clear directory of UT Red Cross hearse vans (0172-2744188), Punjab/Haryana Red Cross inter-state lines, and Senior Medical Officer control room numbers.
* 🧪 **Automated Quality Testing**: 49 comprehensive automated unit and regression tests (`node --test tests/*.test.mjs`) guarding schemas, security, clinical keywords, deflection alerts, and translations.
* 📴 **100% Offline-First PWA**: Versioned service worker caching (`pgi-saathi-v2.2.0`) enabling full navigation inside hospital basements with zero network signal.

---

## 💻 How to Run Locally

### Prerequisites
* **Node.js** (v18.0 or higher) — [Download Node.js](https://nodejs.org/)
* **npm** (comes with Node) or **pnpm**
* (Optional) **Firebase CLI** (`npm install -g firebase-tools`)

---

### 1. Running the Frontend (React 18 PWA)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lovnishverma/PGI-SAATHI.git
   cd PGI-SAATHI
   ```

2. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

3. **Install frontend dependencies**:
   ```bash
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Open **`http://localhost:5173`** in your browser.
   > **Note on Mock Mode**: By default, the application runs instantly with verified local seed data even without Firebase credentials configured! You can freely explore the department finder, building locator, checklists, and audio readout immediately.

6. **(Optional) Connect to live Firebase**:
   Copy `.env.example` to `.env` in the `frontend` folder and add your Firebase credentials:
   ```bash
   cp .env.example .env
   ```

---

### 2. Running the Backend API Locally (Node.js / Express)

The backend provides a REST API with Firebase Admin SDK integration and automatic seed fallback.

1. **Open a new terminal and navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Start the backend development server**:
   ```bash
   npm run dev
   ```
   *(Or run `npm start` for production mode)*

4. **Verify the server is running**:
   * **Health Check**: `http://localhost:5000/health`
   * **Departments API**: `http://localhost:5000/api/departments`
   * **Buildings API**: `http://localhost:5000/api/buildings`
   * **OPD Schedule**: `http://localhost:5000/api/schedule`
   * **Emergency Protocols**: `http://localhost:5000/api/emergency`
   * **Sample Collection Counters**: `http://localhost:5000/api/samples`

5. **Test an API query with curl**:
   ```bash
   curl "http://localhost:5000/api/departments?search=knee"
   ```

---

## 🚀 Live Deployment on GitHub Pages

The React PWA frontend is configured to automatically deploy to **GitHub Pages** on every push to `main` via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

### 🔗 Live URL: [https://www.lovnishverma.in/PGI-SAATHI/](https://www.lovnishverma.in/PGI-SAATHI/)

### One-Time Setup in GitHub Repository Settings:
To enable automated deployments for your repository:
1. Open your repository on GitHub: **`https://github.com/lovnishverma/PGI-SAATHI`**.
2. Click **Settings** $\rightarrow$ **Pages** (under the *Code and automation* section in the left sidebar).
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
4. That's it! Every future commit to `main` will build and publish the frontend automatically.

---

## 🌐 How to Deploy on Render

You can deploy both the **React Frontend (Static Site)** and the **Node.js Backend (Web Service)** for free on [Render.com](https://render.com/).

### Option A: 1-Click Blueprints via `render.yaml` (Recommended)
This repository includes a [`render.yaml`](render.yaml) blueprint that configures both services automatically:

1. Push or fork this repository to your GitHub account.
2. Go to **[dashboard.render.com](https://dashboard.render.com/)** $\rightarrow$ click **New +** $\rightarrow$ select **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml` and provision:
   * **`pgi-saathi-ui`**: Static Site hosting the React PWA (build: `npm install && npm run build`, publish: `dist`).
   * **`pgi-saathi-api`**: Node.js Web Service hosting the Express REST API (port: `5000`).
4. Click **Apply**. Render will build and deploy both services!

---

### Option B: Manual Setup on Render Dashboard

#### 1. Deploying the Frontend (Static Site)
1. In Render Dashboard, click **New +** $\rightarrow$ **Static Site**.
2. Connect your GitHub repository: `https://github.com/lovnishverma/PGI-SAATHI`.
3. Configure settings:
   * **Name**: `pgi-saathi-ui`
   * **Root Directory**: `frontend`
   * **Build Command**: `npm install && npm run build`
   * **Publish Directory**: `dist`
4. **Add Single Page Application (SPA) Rewrite**:
   * Under the **Redirects/Rewrites** tab, add:
     * **Type**: `Rewrite`
     * **Source**: `/*`
     * **Destination**: `/index.html`
5. Click **Create Static Site**.

#### 2. Deploying the Backend (Web Service)
1. In Render Dashboard, click **New +** $\rightarrow$ **Web Service**.
2. Connect your GitHub repository: `https://github.com/lovnishverma/PGI-SAATHI`.
3. Configure settings:
   * **Name**: `pgi-saathi-api`
   * **Root Directory**: `backend`
   * **Environment**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node src/server.js`
4. Under **Environment Variables**, set:
   * `PORT`: `5000`
   * `NODE_ENV`: `production`
5. Click **Create Web Service**. Render will assign a free URL like `https://pgi-saathi-api.onrender.com`.

---

## ☁️ How to Deploy on Firebase Hosting (Spark Plan)

1. **Login to Firebase**:
   ```bash
   firebase login
   ```
2. **Initialize or link your project**:
   ```bash
   firebase use --add
   ```
3. **Build and deploy**:
   ```bash
   cd frontend && npm run build && cd ..
   firebase deploy --only hosting,firestore
   ```

---

## 🔒 Safety, Privacy & Disclaimers

1. **Independent Product Concept**: PGI Saathi is an independent community patient-assistance project. It does not imply PGIMER institutional endorsement or official authorization.
2. **Strictly Non-Diagnostic**: This tool provides navigational guidance only and does not provide clinical diagnosis, medical advice, or treatment plans.
3. **Zero Patient Data Collection**: In accordance with privacy-by-design standards, PGI Saathi does not collect, transmit, or store CR numbers, patient medical records, Aadhaar numbers, or contact lists.

---

## 📄 License & Documentation
* [Software Requirements Specification v2.0 (Markdown)](docs/PGI_Saathi_Software_Requirements_Specification_SRS_v2.0.md)
* [Software Requirements Specification v2.0 (PDF)](docs/PGI_Saathi_Software_Requirements_Specification_SRS_v2.0.pdf)
* [Software Requirements Specification v2.0 (Word DOCX)](docs/PGI_Saathi_Software_Requirements_Specification_SRS_v2.0.docx)
* [PGIMER Patient Help Guide Reference](docs/Pgimer_opd_guide.pdf)
* [System Architecture](ARCHITECTURE.md)
* [Team Work Breakdown](TEAM_WORK_BREAKDOWN.md)
* [Release Roadmap](ROADMAP.md)
* [Archived SRS v1.0 Baseline](docs/PGI_Saathi_Software_Requirements_Specification_SRS_v1.0.pdf)
