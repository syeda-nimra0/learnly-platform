# Learnly Backend

Secure Express API that powers the Learnly frontend. Handles authentication, Gemini AI proxy, Cloudinary uploads, course catalog, enrollments, and certificates.

## Critical Security Rules

1. **The Gemini API key lives ONLY here** - in `backend/.env` as `GEMINI_API_KEY`. It is read from `process.env` by `src/services/geminiService.js` and NEVER sent to the frontend.
2. **Never use `VITE_GEMINI_API_KEY`** - Vite exposes any `VITE_` variable to the browser bundle, which would leak the key.
3. **JWT tokens are stored in httpOnly cookies** - not localStorage - so JavaScript cannot read them.
4. **Passwords are hashed with bcrypt** (cost factor 12) - never stored in plaintext.
5. **All AI requests require authentication + rate limiting** - 20 requests per minute per user.
6. **Input is validated with Zod** on every route - never trust client-supplied data.
7. **User identity is derived from the JWT** - never from client-supplied user IDs.
8. **CORS is locked to `CLIENT_URL`** - no wildcard origins.
9. **Helmet sets secure HTTP headers** - CSP, X-Frame-Options, etc.
10. **Error responses are sanitized** - no stack traces leaked in production.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your real credentials
npm run dev
```

The server runs on http://localhost:5000.

## Endpoints

### Auth (`/api/auth`)
| Method | Path              | Description                  | Auth |
| ------ | ----------------- | ---------------------------- | ---- |
| POST   | `/signup`         | Create account               | No   |
| POST   | `/login`          | Log in                       | No   |
| POST   | `/refresh`        | Refresh access token         | Cookie |
| POST   | `/logout`         | Log out (revokes refresh)    | Yes  |
| GET    | `/me`             | Get current user             | Yes  |
| PATCH  | `/me`             | Update profile               | Yes  |
| POST   | `/onboarding`     | Submit onboarding answers    | Yes  |

### AI (`/api/ai`)
| Method | Path         | Description                          | Auth | Rate Limit |
| ------ | ------------ | ------------------------------------ | ---- | ---------- |
| POST   | `/chat`      | Main chat endpoint (all 9 features)  | Yes  | 20/min     |
| POST   | `/quiz`      | Generate practice quiz               | Yes  | 20/min     |
| POST   | `/notes`     | Generate revision notes (Markdown)   | Yes  | 20/min     |
| POST   | `/translate` | Translate content                    | Yes  | 20/min     |
| GET    | `/features`  | List available AI features           | No   | Standard   |

### Courses (`/api/courses`)
| Method | Path                  | Description              | Auth |
| ------ | --------------------- | ------------------------ | ---- |
| GET    | `/`                   | List with filters+search | No   |
| GET    | `/search?q=...`       | Text search              | No   |
| GET    | `/categories`         | List categories          | No   |
| GET    | `/:id`                | Get course details       | Opt  |
| POST   | `/:id/view`           | Track recently viewed    | Opt  |

### Enrollments (`/api/enrollments`)
| Method | Path                          | Description              | Auth |
| ------ | ----------------------------- | ------------------------ | ---- |
| GET    | `/`                           | List my enrollments      | Yes  |
| POST   | `/`                           | Enroll in a course       | Yes  |
| GET    | `/:courseId`                  | Get enrollment status    | Yes  |
| PATCH  | `/:courseId/progress`         | Update progress          | Yes  |

### Profile (`/api/profile`)
| Method | Path            | Description                | Auth |
| ------ | --------------- | -------------------------- | ---- |
| GET    | `/`             | Get my profile             | Yes  |
| PATCH  | `/`             | Update profile             | Yes  |
| POST   | `/avatar`       | Upload avatar to Cloudinary| Yes  |
| GET    | `/achievements` | List achievements          | Yes  |
| GET    | `/certificates` | List certificates          | Yes  |

### Health
| Method | Path      | Description                |
| ------ | --------- | -------------------------- |
| GET    | `/health` | Service health + config status |

## Seed Database

After connecting MongoDB, seed the course catalog:

```bash
npm run seed
```

This inserts 6 starter courses. Extend `src/utils/seed.js` with more.

## How Gemini Requests Flow

```
Frontend (React)
  │
  │  POST /api/ai/chat
  │  Headers: Authorization: Bearer <jwt>
  │  Body: { message, feature, context, history }
  │
  ▼
Express (this server)
  │
  │  1. requireAuth middleware verifies JWT
  │  2. aiLimiter enforces 20 req/min
  │  3. Zod validates body
  │  4. Builds minimum user context from JWT (not from client)
  │  5. Calls geminiService.chat()
  │
  ▼
geminiService.js
  │
  │  - Reads GEMINI_API_KEY from process.env
  │  - Constructs Gemini client
  │  - Applies feature-specific system prompt
  │  - Sends message + history (max 10 turns)
  │  - 30s timeout
  │  - Sanitizes output (strips any leaked key)
  │
  ▼
Google Gemini API
  │
  ▼
Response → Frontend
```

The API key is NEVER:
- Sent in any HTTP response
- Logged to console
- Stored in a cookie
- Embedded in the frontend bundle
- Committed to git

## File Upload Security

Profile picture uploads (`POST /api/profile/avatar`) are validated:
- **MIME type allowlist**: only `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- **Size limit**: 5 MB max
- **Stored in memory** (multer memoryStorage) - never written to disk
- **Uploaded to Cloudinary server-side** using the API secret
- **Transformed on upload**: 400×400 cropped to face, auto-quality
- **Public ID includes user ID + timestamp** to prevent collisions

## Production Deployment

1. Set `NODE_ENV=production`
2. Set `COOKIE_SECURE=true` (requires HTTPS)
3. Set all secrets in the hosting dashboard (NOT in code)
4. Whitelist your backend IP in MongoDB Atlas Network Access
5. Set `CLIENT_URL` to your deployed frontend
6. Run `npm run seed` once to populate the catalog
7. Use a process manager (PM2, systemd) or container orchestrator
