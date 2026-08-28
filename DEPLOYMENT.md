# Learnly — Vercel Deployment Guide (Mini Steps)

> **Strategy:** Backend aur frontend ko **2 alag Vercel projects** ke tor par deploy karenge. Phir frontend ko backend ka URL denge.

---

## Phase 1 — Backend ko Vercel par deploy karna

### Step 1.1 — GitHub par code push karo
1. Apna project GitHub par push karo (agar abhi tak nahi kiya).
2. **Important:** `.env` files automatically ignore ho jayengi (`.gitignore` mein already hain).
3. Repo ka structure aesa hona chahiye:
   ```
   learnly/
   ├── backend/
   ├── frontend/
   ├── package.json
   └── ...
   ```

### Step 1.2 — Vercel par backend project banao
1. https://vercel.com par jao aur login karo (GitHub account se).
2. **"Add New..." → "Project"** par click karo.
3. Apna GitHub repo "Import" karo.
4. **Project Name:** `learnly-api` (ya jo chaaho)
5. **Root Directory:** `backend` select karo (ya `learnly/backend` agar repo root se start hota hai).
6. **Framework Preset:** "Other" rakho.
7. **Build Command:** chhoro empty (Vercel `vercel.json` se utha lega).
8. **Output Directory:** chhoro empty.
9. **"Deploy" click mat karo abhi** — pehle Environment Variables set karo (Step 1.3).

### Step 1.3 — Backend Environment Variables set karo
Vercel project settings ke **"Environment Variables"** section mein ye sab add karo:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Mandatory |
| `MONGODB_URI` | `mongodb+srv://nimrasyeda37_db_user:...` | Aapke `backend/.env` se uthao |
| `JWT_ACCESS_SECRET` | `bb79d8dbd3a49395042c92...` | Aapke `backend/.env` se uthao |
| `JWT_REFRESH_SECRET` | `fb6a4b4160e119604d7124...` | Aapke `backend/.env` se uthao |
| `JWT_ACCESS_EXPIRES` | `15m` | |
| `JWT_REFRESH_EXPIRES` | `7d` | |
| `COOKIE_SECURE` | `true` | Vercel HTTPS deta hai |
| `GEMINI_API_KEY` | `AQ.Ab8RN6KjHbXMKp...` | Aapke `backend/.env` se uthao |
| `GEMINI_MODEL` | `gemini-2.5-flash` | |
| `GEMINI_TIMEOUT_MS` | `30000` | |
| `GEMINI_MAX_INPUT_CHARS` | `8000` | |
| `CLOUDINARY_CLOUD_NAME` | `dy7z0znum` | |
| `CLOUDINARY_API_KEY` | `325519787824443` | |
| `CLOUDINARY_API_SECRET` | `KOz1GWwwgfoOJgLN-_txiqzjzjA` | |
| `CLOUDINARY_UPLOAD_FOLDER` | `learnly` | |
| `RATE_LIMIT_WINDOW_MS` | `60000` | |
| `RATE_LIMIT_MAX` | `100` | |
| `AI_RATE_LIMIT_MAX` | `20` | |
| `CLIENT_URL` | `https://learnly.vercel.app` | **Frontend ka URL** (Step 2 mein milega) |

> **Note:** `CLIENT_URL` mein initially `https://learnly.vercel.app` daal do. Agar Vercel koi aur subdomain de (jaise `learnly-xyz.vercel.app`), to baad mein yahan update kar dena.

### Step 1.4 — Backend Deploy karo
1. **"Deploy"** button click karo.
2. Vercel build logs dikhayega. Successful hone par ek URL milega, jaise:
   ```
   https://learnly-api.vercel.app
   ```
3. Is URL ko save kar lo — ye frontend mein chahiye.
4. Test karo: browser mein `https://learnly-api.vercel.app/health` kholo. Aisa JSON aana chahiye:
   ```json
   {"status":"ok","env":"production","gemini":"configured","db":"configured","cloudinary":"configured"}
   ```

---

## Phase 2 — Frontend ko Vercel par deploy karna

### Step 2.1 — Frontend ka naya Vercel project banao
1. Vercel dashboard mein **"Add New..." → "Project"**.
2. **Same GitHub repo** import karo.
3. **Project Name:** `learnly` (ya jo chaaho).
4. **Root Directory:** `frontend` select karo.
5. **Framework Preset:** "Vite" (auto-detect ho jayega).
6. **Build Command:** `npm run build` (default).
7. **Output Directory:** `dist` (default).
8. **"Deploy" mat dabao abhi** — pehle env var set karo.

### Step 2.2 — Frontend Environment Variables set karo
Vercel project settings ke **"Environment Variables"** mein ye add karo:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://learnly-api.vercel.app/api` |
| `VITE_CLOUDINARY_CLOUD_NAME` | `dy7z0znum` |

> **Important:** `VITE_API_URL` mein backend ka URL + `/api` ending hona chahiye.

### Step 2.3 — Frontend Deploy karo
1. **"Deploy"** click karo.
2. Build complete hone par URL milega: `https://learnly.vercel.app`
3. Is URL ko copy karo.

### Step 2.4 — Backend mein `CLIENT_URL` update karo (IMPORTANT)
1. Vercel dashboard mein apne **backend project** (`learnly-api`) kholo.
2. **Settings → Environment Variables** mein jao.
3. `CLIENT_URL` ko update karo:
   ```
   https://learnly.vercel.app
   ```
   (Jo bhi actual frontend URL mila hai)
4. **"Save"** karo.
5. **Redeploy** karo: Deployments tab → latest deployment → 3 dots menu → "Redeploy".

---

## Phase 3 — Test & Verify

### Step 3.1 — Basic checks
1. `https://learnly-api.vercel.app/health` — JSON response aana chahiye.
2. `https://learnly.vercel.app` — frontend load hona chahiye.

### Step 3.2 — Login test
1. Frontend par jao.
2. Login/signup karo.
3. Agar login ho gaya aur dashboard khula → 🎉 successfully deployed!
4. Agar login fail ho ya token save na ho → **browser console** kholo aur errors check karo.

### Step 3.3 — Common issues aur fixes

| Issue | Solution |
|-------|----------|
| **CORS error** (`blocked by CORS policy`) | Backend ke `CLIENT_URL` mein frontend URL correctly set hai? Check karo. |
| **Cookie not set** (`Set-Cookie` red/missing) | Backend ke `COOKIE_SECURE=true` ho, aur `CLIENT_URL` sahi ho. |
| **`/api/*` 404** | `VITE_API_URL` mein `/api` ending hai? Backend URL `https://...vercel.app/api` hona chahiye. |
| **MongoDB connection failed** | Atlas dashboard mein **Network Access** mein `0.0.0.0/0` (allow from anywhere) add karo. |
| **Refresh token not working** | Browser DevTools → Application → Cookies. Check karo `learnly_refresh_token` cookie `SameSite=None; Secure` ke saath set hui hai. |
| **Build failed: vite not found** | Vercel build logs mein `npm install` fail ho raha hai? `frontend/package.json` check karo. |

### Step 3.4 — MongoDB Atlas Network Access
1. https://cloud.mongodb.com par jao.
2. Apna cluster "Learnly" kholo.
3. **Network Access** tab → "Add IP Address" → "Allow Access From Anywhere" (`0.0.0.0/0`).
4. Save karo. (Vercel serverless IPs change hote rehte hain, is liye 0.0.0.0/0 safest hai.)

---

## Phase 4 (Optional) — Custom Domain

Agar apna domain (jaise `learnly.com`) use karna hai:
1. Vercel project → **Settings → Domains**.
2. Domain add karo, DNS record update karo (Vercel instructions dega).
3. Backend ko bhi custom subdomain do (jaise `api.learnly.com`).
4. Phir `VITE_API_URL` ko `https://api.learnly.com/api` update karke frontend rebuild karo.

---

## Quick Reference — Files Modified for Vercel

| File | Change |
|------|--------|
| `backend/vercel.json` | **NEW** — Tells Vercel to wrap Express as serverless function |
| `backend/src/server.js` | Added `export default app` at end |
| `backend/src/controllers/authController.js` | Cookie `sameSite: 'none'`, `secure: true` in production |
| `frontend/vercel.json` | **NEW** — Vite build + SPA rewrites for React Router |

---

## Important Notes

1. **Cold starts:** Vercel serverless functions thodi slow hote hain first request par (5-10s). Baad mein fast ho jata hai. Production app ke liye agar hamesha fast chahiye to Render/Railway backend host karna behtar hai.
2. **Function timeout:** Vercel free plan mein 10s timeout hai. Agar Gemini API slow ho to AI requests fail ho sakti hain. Pro plan mein 60s milta hai.
3. **File uploads:** Avatar uploads `multer.memoryStorage()` use karte hain, jo Cloudinary pe upload ho jate hain. Vercel par `uploads/` directory kaam nahi karegi (read-only filesystem). Aapka code already sahi hai (memory storage use karta hai).
4. **Never commit `.env` files** — Vercel dashboard mein env vars set karte hain, code mein nahi.
