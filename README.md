# Learnly - AI-Powered Learning & Career Platform

A modern, award-level learning platform built with **React 18 + Vite** on the frontend and **Node.js + Express** on the backend. Powered by **Gemini AI** (kept strictly server-side), **MongoDB Atlas** for data, and **Cloudinary** for media storage.

> Learnly does not simply give users courses. Learnly helps users understand **what to learn, why to learn it, how to learn it and what to do next.**

---

## Tech Stack

| Layer            | Tech                                                            |
| ---------------- | --------------------------------------------------------------- |
| Frontend         | React 18 + Vite (JavaScript, no TypeScript)                     |
| Styling          | Tailwind CSS + custom Cabinet Grotesk font                      |
| Animations       | Framer Motion, GSAP, custom WebGL shaders, Lenis smooth scroll  |
| Backend          | Node.js + Express                                               |
| Database         | MongoDB Atlas (Mongoose)                                        |
| Auth             | JWT access + refresh tokens, bcrypt password hashing, httpOnly cookies |
| AI               | Google Gemini API (server-side only, never exposed to client)   |
| Media            | Cloudinary (uploads, transforms, delivery)                      |
| Rate limiting    | express-rate-limit                                              |

---

## Project Structure

```
learnly/
├── frontend/            # React + Vite frontend application
│   ├── src/
│   │   ├── components/  # UI, animations, layout, sections, cards
│   │   ├── pages/       # All routes (landing, onboarding, dashboard, etc.)
│   │   ├── context/     # Auth + Toast contexts
│   │   ├── lib/         # API client, utilities, animation variants
│   │   ├── data/        # Seed course catalog, careers, skills
│   │   └── hooks/       # Custom React hooks
│   ├── .env.example     # Frontend env vars (no secrets!)
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/             # Node.js + Express API server
│   ├── src/
│   │   ├── routes/      # /auth, /ai, /courses, /enrollments, etc.
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # geminiService, cloudinaryService, etc.
│   │   ├── middleware/  # auth, rateLimit, errorHandler, cors
│   │   ├── config/      # env loader + DB connection
│   │   └── server.js    # Express app entry
│   ├── .env.example     # Backend env vars (all secrets live here)
│   └── package.json
│
├── .env.example         # Root env template (covers both sides)
├── package.json         # Root scripts (dev runs both frontend + backend)
└── README.md            # This file
```

---

## Quick Start

### 1. Install dependencies

```bash
cd learnly
npm run install:all
```

This installs root, frontend, and backend dependencies in one go.

### 2. Set up environment variables

Copy the example env files and fill them in:

```bash
cp .env.example frontend/.env
cp .env.example backend/.env
# Or use the more granular templates inside each folder
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Edit the `.env` files (see sections below for each service).

### 3. Run the dev servers

```bash
npm run dev
```

This launches both:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000

---

## Cloudinary Setup (Image & Media Storage)

Cloudinary is used for profile pictures, course thumbnails, lesson resources, generated PDFs, and any user-uploaded files. MongoDB only stores the **URL string**, never the binary.

### Step 1 - Create a Cloudinary account

1. Go to https://cloudinary.com/users/register_free and sign up (free tier is generous).
2. After verifying your email, log in to the dashboard.

### Step 2 - Grab your credentials

On the Cloudinary dashboard home page you will see three values:

| Field              | What it is                                  | Where it goes                     |
| ------------------ | ------------------------------------------- | --------------------------------- |
| **Cloud name**     | Public, identifies your account bucket      | `CLOUDINARY_CLOUD_NAME`           |
| **API Key**        | Public identifier (still keep it server-side) | `CLOUDINARY_API_KEY`            |
| **API Secret**     | **SECRET** - never expose to the frontend   | `CLOUDINARY_API_SECRET`           |

### Step 3 - Add to `backend/.env`

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_FOLDER=learnly
```

### Step 4 - Upload preset (optional, for direct browser uploads)

If you ever want users to upload directly to Cloudinary (bypassing your backend), create an **unsigned upload preset**:

1. Dashboard → Settings → Upload → Upload presets → Add upload preset
2. Set **Signing Mode** = **Unsigned**
3. Set a folder (e.g. `learnly/profiles`)
4. Save and copy the preset name into `frontend/.env` as `VITE_CLOUDINARY_UPLOAD_PRESET`

> For maximum security, **route all uploads through your Express backend** instead of using unsigned presets. The backend signs each upload request with your API secret so the secret never reaches the browser. The included `cloudinaryService` does exactly this.

### Step 5 - Already-configured brand assets

The Learnly logo and favicon are already hosted on Cloudinary and referenced in the frontend:

- Logo: `https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png`
- Favicon: `https://res.cloudinary.com/dy7z0znum/image/upload/v1787922537/7bc43e7b-a879-44bb-b0a6-240e1f7e3af3_jx8ygs.png`

You do **not** need to re-upload these.

---

## Gemini API Setup (CRITICAL - Security)

**The Gemini API key must NEVER touch the browser.** Vite exposes any variable prefixed with `VITE_` to the client bundle, so we never use `VITE_GEMINI_API_KEY`. The key lives **only** in `backend/.env` and is consumed by the Express server.

### Step 1 - Get a Gemini API key

1. Go to https://aistudio.google.com/apikey
2. Sign in with a Google account
3. Click **Create API key**
4. Copy the key (it starts with `AIza...`)

### Step 2 - Add to `backend/.env` ONLY

```env
GEMINI_API_KEY=AIzaSy...your_key_here
GEMINI_MODEL=gemini-1.5-flash
```

**NEVER** put this in:
- `frontend/.env`
- Any `VITE_*` variable
- Git commits
- Frontend source code
- Browser localStorage / sessionStorage

### Step 3 - How requests flow

```
React frontend
    │
    │  POST /api/ai/chat  { message, context, feature }
    │  (sends only JWT auth cookie, never the API key)
    ▼
Express backend  (verifies JWT, rate-limits, validates input)
    │
    │  Calls Gemini SDK with GEMINI_API_KEY from process.env
    ▼
Google Gemini API
    │
    ▼
Validated, sanitized response  ─►  back to frontend
```

### Step 4 - What the backend protects against

The `/api/ai/chat` endpoint includes:
- **JWT auth required** - no anonymous AI calls
- **Rate limiting** - 20 requests / minute / user
- **Input length cap** - max 8000 chars per message
- **Feature allowlist** - only `career_navigator | course_advisor | lesson_tutor | quiz_generator | study_planner | notes_pdf | translation | resume | progress` are accepted
- **Context validation** - server derives the user's identity from the JWT, never trusts client-supplied user IDs
- **Timeout** - 30s hard limit
- **Error sanitization** - never returns Gemini API errors or stack traces to the client

---

## MongoDB Atlas Setup

### Step 1 - Create a free cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free **M0** cluster (512MB, enough for development)
3. Pick a cloud provider and region close to your users

### Step 2 - Create a database user

1. Left sidebar → **Database Access** → **Add new database user**
2. Set a strong username + password (save these!)
3. Role: **Read and write to any database** (dev only - tighten in production)

### Step 3 - Allow network access

1. Left sidebar → **Network Access** → **Add IP address**
2. For dev, click **Allow access from anywhere** (`0.0.0.0/0`)
3. For production, add only your hosting provider's IPs

### Step 4 - Get the connection string

1. Left sidebar → **Database** → **Connect** → **Drivers** → **Node.js**
2. Copy the string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
3. Replace `<username>` and `<password>` with your user

### Step 5 - Add to `backend/.env`

```env
MONGODB_URI=mongodb+srv://learnly_user:your_password@cluster0.abc123.mongodb.net/learnly?retryWrites=true&w=majority
```

---

## Frontend Environment Variables

Edit `frontend/.env`:

```env
# Backend API URL (no secrets here!)
VITE_API_URL=http://localhost:5000/api

# Cloudinary cloud name ONLY - this is public, used for image URL construction
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Optional: only if you use unsigned browser uploads (not recommended for production)
VITE_CLOUDINARY_UPLOAD_PRESET=learnly_unsigned
```

---

## Backend Environment Variables

Edit `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/learnly?retryWrites=true&w=majority

# JWT secrets (use long random strings - generate with: openssl rand -hex 32)
JWT_ACCESS_SECRET=replace_with_64_char_random_hex_string
JWT_REFRESH_SECRET=replace_with_another_64_char_random_hex_string
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
COOKIE_SECURE=false

# Gemini API (NEVER EXPOSE TO FRONTEND)
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-1.5-flash
GEMINI_TIMEOUT_MS=30000
GEMINI_MAX_INPUT_CHARS=8000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_FOLDER=learnly

# Rate limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
AI_RATE_LIMIT_MAX=20
```

---

## Available Scripts

| Command                  | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `npm run install:all`    | Install root + frontend + backend deps         |
| `npm run dev`            | Run both frontend and backend concurrently     |
| `npm run dev:frontend`   | Run only the Vite dev server                   |
| `npm run dev:backend`    | Run only the Express server (with nodemon)     |
| `npm run build`          | Build the frontend for production              |
| `npm start`              | Start the backend in production mode           |

---

## Pages & Routes

| Route                  | Page               | Description                                    |
| ---------------------- | ------------------ | ---------------------------------------------- |
| `/`                    | Landing            | Hero, careers, courses, AI, FAQ, etc.          |
| `/login`               | Login              | Email + password                               |
| `/signup`              | Signup             | Create account                                 |
| `/onboarding`          | Onboarding         | 5-step wizard (goal → roles → skills → job → education) |
| `/welcome`             | Welcome            | "Welcome, {name}" post-onboarding              |
| `/explore`             | Course Catalog     | Search, filter, sort, pagination               |
| `/courses/:id`         | Course Detail      | Modules, lessons, enroll button                |
| `/my-learning`         | My Learning        | Enrolled courses list                          |
| `/learn/:courseId`     | Learning Dashboard | 3 levels (Foundation / Practice / Job Ready)   |
| `/learn/:id/lesson/:lid` | Lesson           | Lesson content + Learnly AI tutor              |
| `/profile`             | Profile            | Bio, DP, achievements, progress                |
| `/degrees`             | Degrees            | Degree programs catalog                        |
| `/business`            | Business           | Learnly for Business                           |
| `/universities`        | Universities       | Learnly for Universities                       |
| `/government`          | Government         | Learnly for Government                         |

---

## Learnly AI Features

The AI assistant is accessed through the chat widget (bottom-right corner on every authenticated page). It supports 9 specialized modes:

1. **Career Navigator** - Recommends career paths based on onboarding answers
2. **Course Advisor** - Analyzes course suitability, prerequisites
3. **Lesson Tutor** - Explains current lesson concepts
4. **AI Quiz Generator** - Creates practice quizzes (MCQ, true/false, scenario)
5. **Study Planner** - Daily/weekly learning plans
6. **Notes & PDF Assistant** - Generates revision notes + downloadable PDFs
7. **Translation Assistant** - Translates course content preserving code syntax
8. **Career & Resume Assistant** - Resume builder using only verified data
9. **Learning Progress Assistant** - Explains progress, identifies weak areas

---

## Deployment Guide

### Frontend → Vercel / Netlify

1. Build: `npm run build --prefix frontend`
2. Output dir: `frontend/dist`
3. Set env vars in the hosting dashboard:
   - `VITE_API_URL=https://your-backend-url.com/api`
   - `VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name`
4. **Do NOT** set `GEMINI_API_KEY`, `MONGODB_URI`, or any backend secret here

### Backend → Railway / Render / Fly.io / VPS

1. Deploy the `backend/` folder
2. Set ALL backend env vars in the hosting dashboard (never commit `.env`)
3. Set `CLIENT_URL` to your deployed frontend URL
4. Set `COOKIE_SECURE=true` for HTTPS

### Database → MongoDB Atlas

Already cloud-hosted. Just make sure your backend host IP is whitelisted in Atlas Network Access.

### Cloudinary

Already cloud-hosted. No deployment needed.

---

## Security Checklist

- [x] Gemini API key only in `backend/.env`, never in `frontend/.env`
- [x] No `VITE_GEMINI_API_KEY` anywhere
- [x] JWT stored in httpOnly cookies, not localStorage
- [x] bcrypt password hashing (cost factor 12)
- [x] Refresh token rotation
- [x] Rate limiting on all endpoints, especially `/api/ai/*`
- [x] CORS configured to only allow `CLIENT_URL`
- [x] Helmet for secure HTTP headers
- [x] Input validation on every route
- [x] Server-side authorization (never trust client-supplied user IDs)
- [x] `.env` files in `.gitignore`
- [x] No secrets in source code
- [x] Error responses sanitized (no stack traces leaked)
- [x] File upload validation (MIME type + size limit)

---

## Design System

| Token              | Value      | Usage                              |
| ------------------ | ---------- | ---------------------------------- |
| Primary            | `#80B7FA`  | Buttons, links, active states      |
| Secondary          | `#95C3FA`  | Hover, gradients, accents          |
| Black              | `#000000`  | Body text, headers                 |
| White              | `#FFFFFF`  | Backgrounds                        |
| Font               | Cabinet Grotesk | All UI text                  |

Design principles (anti-AI-slop):
- No emojis in the UI - SVG icons only
- Restrained use of shadows and gradients
- Borders + whitespace create structure, not glassmorphism
- Different visual treatments per section (no monotonous card grids)
- Editorial typography hierarchy
- Touch-friendly on mobile

---

## License

MIT - Learnly is a demo project. Course content is illustrative.

