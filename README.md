<div align="center">

<!-- Animated Logo / Title -->
<img src="https://res.cloudinary.com/dy7z0znum/image/upload/v1787922537/7bc43e7b-a879-44bb-b0a6-240e1f7e3af3_jx8ygs.png" width="120" height="120" alt="Learnly Logo" />

# 🎓 Learnly

### *Learn what matters. Become who you want.*

**An AI-powered, award-level learning & career platform that doesn't just hand you courses — it helps you understand *what* to learn, *why* to learn it, *how* to learn it, and *what to do next*.**

<br />

<!-- Live Badges -->
[![Live Frontend](https://img.shields.io/badge/LIVE-frontend-80B7FA?style=for-the-badge&logo=vercel&logoColor=white)](https://learnly-platform.vercel.app)
[![Live API](https://img.shields.io/badge/LIVE-api-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://learnly-platform-i32x.vercel.app/health)
[![Status](https://img.shields.io/badge/status-production%20ready-brightgreen?style=for-the-badge)]()
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)]()

<br />

<!-- Tech Stack Badges -->
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google-Gemini-4285F4?style=flat-square&logo=google&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white)

<br />

<!-- Tagline -->
```text
┌─────────────────────────────────────────────────────────────┐
│  🚀  AI-driven learning paths · 🎯  Personalized journeys   │
│  📚  Smart course catalog     · 🤖  Gemini-powered mentors   │
│  🏆  Achievement system        · ☁️  Serverless on Vercel   │
└─────────────────────────────────────────────────────────────┘
```

</div>

<br />

---

## 🌟 Why Learnly? — The Differentiator

> Most learning platforms dump a course list on you. **Learnly doesn't.**

| Other Platforms | Learnly |
|-----------------|---------|
| Static catalog | AI-curated paths based on your goals |
| Generic recommendations | Personalized onboarding + journey |
| Certificate-only outcomes | Career-aligned skill roadmap |
| Cookie-cutter UI | WebGL shaders · Lenis smooth scroll · GSAP animations |
| API keys in frontend (🤦) | Gemini key stays server-side, **always** |

<br />

---

## ✨ Features

### 🤖 AI-Powered Learning (Server-side Gemini)
- **AI Chat Mentor** — Personal tutor that answers your questions in real-time
- **Smart Quiz Generator** — AI creates quizzes from course material
- **Auto Notes Generator** — Summarize any lesson instantly
- **Translation Engine** — Multi-language content delivery
- **Career Path Suggester** — AI-driven career recommendations

### 🎓 Learning Experience
- **Personalized Onboarding** — Goal, job title, education-based journey
- **Smart Course Catalog** — Search, filter, recently viewed
- **Progress Tracking** — Module-level progress with completion %
- **Quiz System** — Submit answers, get instant feedback
- **Achievements & Certificates** — Gamified learning rewards

### 👤 User System
- **JWT Auth** — Access + refresh tokens (httpOnly cookies)
- **Profile Management** — Avatar (Cloudinary), bio, age, role
- **Onboarding Flow** — Personalized learning setup
- **Role-based Access** — Student, Instructor, Admin

### 🎨 Frontend Polish (Award-level)
- **WebGL Shaders** — Custom OGL-based animations
- **GSAP + Framer Motion** — Smooth, choreographed transitions
- **Lenis Smooth Scroll** — Buttery scroll experience
- **Cabinet Grotesk Typography** — Editorial-grade type system
- **Dark Mode Ready** — Designed with depth and contrast

<br />

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Browser["🌐 Browser (Client)"]
        UI[React 18 + Vite SPA]
        UI -->|Axios + withCredentials| LB
    end

    subgraph Vercel["☁️ Vercel (Serverless)"]
        subgraph Frontend["Frontend Project"]
            FE[React Build<br/>Static CDN]
        end
        subgraph Backend["Backend Project (API)"]
            LB[Vercel Load Balancer]
            LB --> SF1[Serverless Fn 1]
            LB --> SF2[Serverless Fn 2]
            LB --> SF3[Serverless Fn N]
            SF1 & SF2 & SF3 --> EX[Express App]
            EX --> CORS[CORS Middleware]
            EX --> RL[Rate Limiter]
            EX --> AUTH[JWT Auth MW]
            EX --> R[Routes: /auth /ai /courses /enrollments /profile]
            R --> CTRL[Controllers]
            CTRL --> SVC[Services Layer]
            SVC --> GEM[Gemini AI Service]
            SVC --> CLOU[Cloudinary Service]
        end
    end

    subgraph External["🔧 External Services"]
        MDB[(MongoDB Atlas<br/>Users · Courses · Enrollments)]
        GEMINI[Google Gemini API]
        CDN[Cloudinary CDN<br/>Media Storage]
    end

    UI -.->|Static Assets| FE
    SVC --> MDB
    GEM --> GEMINI
    CLOU --> CDN

    style UI fill:#80B7FA,stroke:#0A0A0A,color:#000
    style FE fill:#61DAFB,stroke:#0A0A0A,color:#000
    style EX fill:#000000,stroke:#80B7FA,color:#fff
    style MDB fill:#47A248,stroke:#0A0A0A,color:#fff
    style GEMINI fill:#4285F4,stroke:#fff,color:#fff
    style CDN fill:#3448C5,stroke:#fff,color:#fff
```

<br />

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | Fast SPA with HMR |
| **Styling** | Tailwind CSS 3 | Utility-first design system |
| **Animations** | Framer Motion + GSAP + OGL | Choreographed motion & WebGL |
| **Smooth Scroll** | Lenis | Buttery scroll experience |
| **Backend** | Node.js + Express | REST API server |
| **Database** | MongoDB Atlas + Mongoose 8 | Cloud document storage |
| **Auth** | JWT + bcrypt + httpOnly cookies | Secure credential flow |
| **AI** | Google Gemini (gemini-2.5-flash) | Server-side AI inference |
| **Media** | Cloudinary | Image upload & delivery |
| **Security** | Helmet + CORS + express-rate-limit | Defense in depth |
| **Hosting** | Vercel (Serverless) | Both frontend + backend |

<br />

---

## 📂 Project Structure

```
learnly/
├── 📁 frontend/                # React + Vite frontend application
│   ├── src/
│   │   ├── 📁 components/       # 39 components across 6 categories
│   │   │   ├── animations/      # 19 — Framer Motion + GSAP pieces
│   │   │   ├── sections/        # 12 — Landing page sections
│   │   │   ├── ui/              # 5  — Reusable UI primitives
│   │   │   ├── layout/          # 2  — Navbar + Footer
│   │   │   ├── auth/            # 1  — Auth guard
│   │   │   └── cards/           # 1  — Course card
│   │   ├── 📁 pages/            # 16 routes
│   │   │   ├── Landing.jsx      # Hero + sections
│   │   │   ├── Onboarding.jsx   # Personalization flow
│   │   │   ├── Explore.jsx      # Course catalog
│   │   │   ├── CourseDetail.jsx # Course view
│   │   │   ├── Learn.jsx        # Learning dashboard
│   │   │   ├── Lesson.jsx       # Single lesson
│   │   │   ├── Profile.jsx      # User profile
│   │   │   ├── MyLearning.jsx   # Enrolled courses
│   │   │   ├── Universities.jsx # University listings
│   │   │   ├── Degrees.jsx      # Degree programs
│   │   │   ├── Government.jsx   # Govt initiatives
│   │   │   ├── Business.jsx     # B2B page
│   │   │   ├── Welcome.jsx      # Post-signup welcome
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── NotFound.jsx
│   │   ├── 📁 context/          # Auth + Toast contexts
│   │   ├── 📁 lib/              # API client, utilities
│   │   ├── 📁 data/             # Seed courses, careers, skills
│   │   └── 📁 hooks/            # Custom React hooks
│   ├── tailwind.config.js       # Custom design tokens
│   ├── vite.config.js           # Vite config + manual chunks
│   └── vercel.json              # SPA rewrite rules
│
├── 📁 backend/                  # Node.js + Express API server
│   ├── src/
│   │   ├── 📁 config/           # env.js + db.js (Vercel-ready caching)
│   │   ├── 📁 routes/           # /auth /ai /courses /enrollments /profile
│   │   ├── 📁 controllers/      # Request handlers
│   │   ├── 📁 services/         # geminiService, cloudinaryService, authService
│   │   ├── 📁 middleware/       # auth, cors, rateLimit, errorHandler
│   │   ├── 📁 models/           # User, Course, Enrollment (Mongoose schemas)
│   │   └── server.js            # Express entry (Vercel serverless export)
│   └── vercel.json              # @vercel/node config
│
├── 📁 download/                 # Final deliverables
├── .env.example                 # Combined env var reference
├── DEPLOYMENT.md                # Step-by-step Vercel guide
└── package.json                 # Root scripts (concurrently)
```

<br />

---

## 🚀 Quick Start

### ⚡ One-liner (Development)

```bash
git clone https://github.com/syeda-nimra0/learnly-platform.git && \
cd learnly-platform && \
npm run install:all && \
npm run dev
```

This spins up **both frontend + backend concurrently** with hot reload.

- 🖥️ Frontend: http://localhost:5173
- ⚙️ Backend: http://localhost:5000

### 📋 Prerequisites

- Node.js 18+ (see `.nvmrc`)
- MongoDB Atlas account (free tier is fine)
- Google Gemini API key
- Cloudinary account (free tier is fine)

<br />

---

## 🔐 Environment Variables

<details>
<summary><b>📁 Backend <code>backend/.env</code></b> — <i>click to expand</i></summary>

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Atlas
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/learnly?appName=Learnly

# JWT secrets (generate: openssl rand -hex 32)
JWT_ACCESS_SECRET=your_64_char_hex_secret
JWT_REFRESH_SECRET=another_64_char_hex_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
COOKIE_SECURE=false

# Gemini AI (server-side ONLY — NEVER expose)
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_TIMEOUT_MS=30000
GEMINI_MAX_INPUT_CHARS=8000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_FOLDER=learnly

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
AI_RATE_LIMIT_MAX=20
```

</details>

<details>
<summary><b>📁 Frontend <code>frontend/.env</code></b> — <i>click to expand</i></summary>

```env
# Backend API URL (no secrets here!)
VITE_API_URL=http://localhost:5000/api

# Cloudinary cloud name (PUBLIC — used to build image URLs)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

</details>

> ⚠️ **Security Note:** `VITE_` prefixed variables are embedded in the browser bundle. **Never** put API keys, JWT secrets, or passwords in `frontend/.env`.

<br />

---

## 📡 API Reference

<details>
<summary><b>🔑 Auth Routes (<code>/api/auth</code>)</b></summary>

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/signup` | ❌ | Create new account |
| `POST` | `/login` | ❌ | Login + set refresh cookie |
| `POST` | `/refresh` | 🍪 | Refresh access token |
| `POST` | `/logout` | ✅ | Clear auth cookies |
| `GET` | `/me` | ✅ | Get current user |
| `PATCH` | `/me` | ✅ | Update profile |
| `POST` | `/onboarding` | ✅ | Complete onboarding |

</details>

<details>
<summary><b>🤖 AI Routes (<code>/api/ai</code>)</b></summary>

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/chat` | ✅ | AI chat mentor |
| `POST` | `/quiz` | ✅ | Generate quiz from content |
| `POST` | `/notes` | ✅ | Generate study notes |
| `POST` | `/translate` | ✅ | Translate content |
| `GET` | `/career-path` | ✅ | Get AI career suggestions |
| `GET` | `/features` | ❌ | List available AI features |

</details>

<details>
<summary><b>📚 Course Routes (<code>/api/courses</code>)</b></summary>

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ❌ | List courses (paginated) |
| `GET` | `/search?q=` | ❌ | Search courses |
| `GET` | `/:id` | ❌ | Get course details |
| `GET` | `/:id/modules` | ❌ | Get course modules |
| `GET` | `/categories` | ❌ | List categories |
| `GET` | `/recently-viewed` | ✅ | User's recent views |
| `POST` | `/:id/view` | ✅ | Track course view |

</details>

<details>
<summary><b>🎓 Enrollment Routes (<code>/api/enrollments</code>)</b></summary>

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✅ | List user enrollments |
| `POST` | `/` | ✅ | Enroll in course |
| `GET` | `/:courseId` | ✅ | Get enrollment detail |
| `PATCH` | `/:courseId/progress` | ✅ | Update progress |
| `POST` | `/:courseId/quizzes/:quizId/submit` | ✅ | Submit quiz answers |

</details>

<details>
<summary><b>👤 Profile Routes (<code>/api/profile</code>)</b></summary>

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✅ | Get profile |
| `PATCH` | `/` | ✅ | Update profile |
| `POST` | `/avatar` | ✅ | Upload avatar (Cloudinary) |
| `GET` | `/achievements` | ✅ | List achievements |
| `GET` | `/certificates` | ✅ | List certificates |

</details>

<br />

---

## 🎨 Design System

Learnly uses a custom design language built on Tailwind:

| Token | Value | Usage |
|-------|-------|-------|
| `learnly.primary` | `#80B7FA` | Brand blue |
| `learnly.secondary` | `#95C3FA` | Lighter blue |
| `learnly.dark` | `#0A0A0A` | Deep background |
| `learnly.paper` | `#FFFFFF` | Card surfaces |
| `learnly.mist` | `#F6F8FC` | Subtle backgrounds |
| `fontFamily.display` | Cabinet Grotesk | Headings + body |

**Typography Scale:** Up to `text-11xl` (14rem) for hero headlines, with `tracking-ultra` (-0.08em) for that editorial tight feel.

<br />

---

## ☁️ Deployment

Learnly is **fully deployed on Vercel** as 2 separate projects:

| Project | URL | Stack |
|---------|-----|-------|
| 🌐 Frontend | `learnly-platform.vercel.app` | React + Vite (static) |
| ⚙️ Backend | `learnly-platform-i32x.vercel.app` | Express (serverless) |

📖 **Full deployment guide:** See [`DEPLOYMENT.md`](./DEPLOYMENT.md)

<details>
<summary><b>🚀 Quick Deploy Summary</b></summary>

1. **MongoDB Atlas:** Add `0.0.0.0/0` to Network Access
2. **Backend on Vercel:**
   - Root Directory: `backend`
   - Add all env vars (NODE_ENV=production, MONGODB_URI, JWT secrets, Gemini, Cloudinary, CLIENT_URL)
   - Deploy
3. **Frontend on Vercel:**
   - Root Directory: `frontend`
   - Add `VITE_API_URL=https://your-backend.vercel.app/api`
   - Add `VITE_CLOUDINARY_CLOUD_NAME=your_cloud`
   - Deploy
4. **Update backend `CLIENT_URL`** with frontend URL → Redeploy backend

</details>

<br />

---

## 📊 Project Stats

```
┌─────────────────────────────────────────────────────┐
│  📁 Total Files (JS/JSX)        :  70+ frontend     │
│  🎨 Custom Components            :  39               │
│  📄 Pages (Routes)               :  16               │
│  🎬 Animation Components         :  19               │
│  🔌 API Endpoints                :  25+              │
│  🗄️ Database Models              :  3                │
│  🤖 AI Features                  :  5                │
│  🔒 Auth Layers                  :  3 (JWT+cookie+bcrypt) │
└─────────────────────────────────────────────────────┘
```

<br />

---

## 🛡️ Security Highlights

- ✅ **No secrets in frontend** — Gemini API key, JWT secrets, MongoDB URI all stay server-side
- ✅ **httpOnly cookies** — Refresh tokens inaccessible to JavaScript
- ✅ **`SameSite=None` + `Secure`** — Cross-domain cookie protection (production)
- ✅ **bcrypt password hashing** — Industry-standard password storage
- ✅ **Helmet** — Secure HTTP headers
- ✅ **Rate limiting** — Separate limits for general API + auth + AI
- ✅ **CORS allowlist** — Only specific origins allowed (no wildcard)
- ✅ **JWT access + refresh** — Short-lived access (15m) + long-lived refresh (7d)

<br />

---

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend concurrently (with color-coded logs) |
| `npm run dev:frontend` | Start only frontend |
| `npm run dev:backend` | Start only backend |
| `npm run install:all` | Install root + frontend + backend deps |
| `npm run build` | Build frontend for production |
| `npm run start` | Start backend in production mode |
| `npm run seed --prefix backend` | Seed database with sample data |

<br />

---

## 🗺️ Roadmap

- [x] 🎉 Initial release
- [x] 🔐 JWT auth + refresh tokens
- [x] 🤖 Gemini AI integration
- [x] 📚 Course catalog + enrollment
- [x] 🏆 Achievements + certificates
- [x] ☁️ Vercel deployment
- [ ] 💬 Real-time chat (Socket.io)
- [ ] 📊 Analytics dashboard
- [ ] 🌐 Multi-language UI
- [ ] 📱 PWA + mobile app
- [ ] 🎥 Video lessons streaming
- [ ] 👥 Social learning features

<br />

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:

1. 🍴 Fork the repo
2. 🌿 Create a branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 🚀 Push to branch (`git push origin feature/amazing-feature`)
5. 📬 Open a Pull Request

<br />

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<br />

---

## 👩‍💻 Author

<div align="center">

**Syeda Nimra**

[![GitHub](https://img.shields.io/badge/GitHub-syeda--nimra0-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/syeda-nimra0)
[![Portfolio](https://img.shields.io/badge/Portfolio-Learnly-80B7FA?style=for-the-badge&logo=vercel&logoColor=white)](https://learnly-platform.vercel.app)

</div>

<br />

---

<div align="center">

### 💜 Made with love & lots of coffee

**If this project helped you, give it a ⭐!**

![Stars](https://img.shields.io/github/stars/syeda-nimra0/learnly-platform?style=social)
![Forks](https://img.shields.io/github/forks/syeda-nimra0/learnly-platform?style=social)

<br />

```text
  ╔═══════════════════════════════════════════════╗
  ║  "The capacity to learn is a gift;            ║
  ║   the ability to learn is a skill;            ║
  ║   the willingness to learn is a choice."      ║
  ║                  — Brian Herbert              ║
  ╚═══════════════════════════════════════════════╝
```

<br />

**🚀 Live Demo:** [learnly-platform.vercel.app](https://learnly-platform.vercel.app)

</div>
