# Learnly — Start Here

A complete, production-ready AI-powered learning platform. Built with React 18 + Vite on the frontend and Node.js + Express on the backend, with MongoDB Atlas, Cloudinary, and Google Gemini.

---

## 1. Prerequisites

- **Node.js 18+** (check with `node -v`)
- **npm 9+** (comes with Node.js)
- A free **MongoDB Atlas** account (https://www.mongodb.com/cloud/atlas/register)
- A free **Cloudinary** account (https://cloudinary.com/users/register_free)
- A free **Google Gemini API key** (https://aistudio.google.com/apikey)

---

## 2. Install

```bash
cd learnly
npm run install:all
```

This installs root, frontend, and backend dependencies in one go.

---

## 3. Configure Environment Variables

You need to fill in three sets of credentials. **All secrets go ONLY in `backend/.env`**, never in the frontend.

### 3.1 MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/cloud/atlas/register
2. Database Access → Add new user → save username + password
3. Network Access → Allow access from anywhere (for dev)
4. Database → Connect → Drivers → Node.js → copy the connection string
5. Replace `<username>` and `<password>` in the string
6. Paste into `backend/.env` as `MONGODB_URI`

### 3.2 Cloudinary

1. Sign up at https://cloudinary.com/users/register_free
2. From the dashboard, copy:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME` (also put in `frontend/.env` as `VITE_CLOUDINARY_CLOUD_NAME`)
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET` (BACKEND ONLY — never in frontend!)
3. Paste all three into `backend/.env`
4. Put just the cloud name in `frontend/.env`

### 3.3 Google Gemini API

> **CRITICAL SECURITY**: The Gemini API key must NEVER touch the browser.
> Vite exposes any variable prefixed with `VITE_` to the client bundle.
> Never use `VITE_GEMINI_API_KEY`. The key lives ONLY in `backend/.env`.

1. Go to https://aistudio.google.com/apikey
2. Sign in with Google
3. Click **Create API key** → copy it (starts with `AIza...`)
4. Paste into `backend/.env` as `GEMINI_API_KEY`
5. **Do NOT** add this to `frontend/.env` under any name

### 3.4 Generate JWT Secrets

Run this twice to get two random strings:

```bash
openssl rand -hex 32
```

Put one in `backend/.env` as `JWT_ACCESS_SECRET` and the other as `JWT_REFRESH_SECRET`.

---

## 4. Run

```bash
# From the project root
npm run dev
```

This launches both:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Visit http://localhost:5173 — you should see the Learnly landing page.

---

## 5. Seed the Database (optional but recommended)

Once MongoDB is connected, populate the course catalog:

```bash
cd backend
npm run seed
```

---

## 6. Test the AI Chat

1. Sign up for an account at http://localhost:5173/signup
2. Complete the 5-step onboarding
3. Click the chat bubble in the bottom-right corner
4. Try one of the 9 AI features (Career Navigator, Course Advisor, Lesson Tutor, etc.)

If you see a response, your Gemini setup is working. If you see "AI service is not available", check that `GEMINI_API_KEY` is set in `backend/.env` and that the backend has been restarted.

---

## 7. Build for Production

```bash
# Frontend
cd frontend
npm run build
# Output: frontend/dist/

# Backend - just deploy the backend/ folder to your hosting provider
```

---

## 8. Deploy

### Frontend → Vercel / Netlify

1. Import the `frontend/` folder
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set env vars in the hosting dashboard:
   - `VITE_API_URL` = your backend URL + `/api`
   - `VITE_CLOUDINARY_CLOUD_NAME` = your Cloudinary cloud name
5. **DO NOT** set `GEMINI_API_KEY` or any backend secret here

### Backend → Railway / Render / Fly.io / VPS

1. Deploy the `backend/` folder
2. Set ALL backend env vars in the hosting dashboard:
   - `PORT`, `NODE_ENV=production`, `CLIENT_URL=https://your-frontend.vercel.app`
   - `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `COOKIE_SECURE=true`
   - `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_TIMEOUT_MS`, `GEMINI_MAX_INPUT_CHARS`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `RATE_LIMIT_*`, `AI_RATE_LIMIT_MAX`
3. Whitelist your backend host's IP in MongoDB Atlas Network Access

---

## 9. Security Checklist (verify before going live)

- [ ] `GEMINI_API_KEY` is ONLY in `backend/.env`, never in `frontend/.env`
- [ ] No `VITE_GEMINI_API_KEY` anywhere in the codebase
- [ ] `MONGODB_URI` is only in `backend/.env`
- [ ] `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` are long random strings (not "secret")
- [ ] `CLOUDINARY_API_SECRET` is only in `backend/.env`
- [ ] `COOKIE_SECURE=true` in production
- [ ] `CLIENT_URL` is set to your real frontend URL (not localhost)
- [ ] MongoDB Atlas Network Access is restricted to your backend IPs
- [ ] `.env` files are NOT committed to git (check `git status`)
- [ ] Rate limiting is enabled (it is by default)

---

## 10. Troubleshooting

**"AI service is not available"** — Gemini API key missing or invalid. Check `backend/.env` for `GEMINI_API_KEY` and restart the backend.

**"MongoDB connection failed"** — Check `MONGODB_URI`, Network Access in Atlas, and your database user credentials.

**"Cloudinary is not configured"** — All three Cloudinary credentials must be set in `backend/.env`.

**CORS errors in browser** — Make sure `CLIENT_URL` in `backend/.env` matches your frontend URL exactly (including protocol).

**Cookies not being set** — In production, you need HTTPS and `COOKIE_SECURE=true`. In dev, cookies work over HTTP with `COOKIE_SECURE=false`.

**401 on every request** — Your access token expired (15 min). The frontend auto-refreshes via the refresh token cookie. If refresh also fails, log out and back in.

---

## Project Structure

```
learnly/
├── frontend/          # React 18 + Vite (JavaScript, no TypeScript)
│   ├── src/
│   │   ├── components/    # UI, animations, layout, sections, cards
│   │   ├── pages/         # All routes
│   │   ├── context/       # Auth, Toast, LearnlyAI
│   │   ├── lib/           # API client, utils
│   │   └── data/          # Seed catalog (fallback when backend offline)
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/           # Node.js + Express (ESM)
│   ├── src/
│   │   ├── routes/        # /auth, /ai, /courses, /enrollments, /profile
│   │   ├── services/      # geminiService, cloudinaryService, authService
│   │   ├── middleware/    # auth, rateLimit, errorHandler
│   │   ├── models/        # User, Course, Enrollment, Certificate
│   │   ├── config/        # env, db
│   │   └── server.js      # Express app entry
│   ├── .env.example
│   └── package.json
│
├── .env.example       # Combined env reference
├── .gitignore
├── .nvmrc
├── package.json       # Root scripts
├── README.md          # Full documentation
└── START_HERE.md      # This file
```

---

## Need Help?

- Full docs: `README.md`
- Frontend specifics: `frontend/README.md`
- Backend specifics: `backend/README.md`
- Gemini security: `backend/README.md` → "How Gemini Requests Flow"
