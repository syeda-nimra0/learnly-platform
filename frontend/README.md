# Learnly Frontend

React 18 + Vite frontend for the Learnly learning platform. JavaScript only - no TypeScript.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your values (NO secrets here!)
npm run dev
```

Runs on http://localhost:5173.

## Environment Variables

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Cloudinary cloud name - PUBLIC (used to build image URLs)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Optional: unsigned upload preset (NOT recommended for production)
# VITE_CLOUDINARY_UPLOAD_PRESET=learnly_unsigned
```

**CRITICAL**: Never put `VITE_GEMINI_API_KEY`, MongoDB URIs, JWT secrets, or Cloudinary API secret here. Any variable prefixed with `VITE_` is embedded in the client bundle and visible to anyone who opens the browser dev tools.

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173) |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

## Project Structure

```
src/
├── main.jsx                  # App entry (React Router + providers)
├── App.jsx                   # Routes definition
├── index.css                 # Tailwind + global styles
│
├── components/
│   ├── ui/                   # Buttons, Inputs, Badges, etc.
│   ├── animations/           # BlurText, CountUp, CircularText, etc.
│   ├── layout/               # Navbar, Footer
│   ├── sections/             # Landing page sections
│   ├── cards/                # CourseCard, etc.
│   ├── auth/                 # ProtectedRoute
│   └── LearnlyAIWidget.jsx   # AI chat popup
│
├── pages/                    # Route pages
│   ├── Landing.jsx
│   ├── Login.jsx / Signup.jsx
│   ├── Onboarding.jsx        # 5-step wizard
│   ├── Welcome.jsx
│   ├── Explore.jsx           # Course catalog
│   ├── CourseDetail.jsx
│   ├── Learn.jsx             # 3-level dashboard
│   ├── Lesson.jsx
│   ├── MyLearning.jsx
│   ├── Profile.jsx
│   ├── Degrees / Business / Universities / Government
│   └── NotFound.jsx
│
├── context/
│   ├── AuthContext.jsx       # JWT auth state
│   ├── ToastContext.jsx      # Toast notifications
│   └── LearnlyAIContext.jsx  # AI chat state
│
├── lib/
│   ├── api.js                # Axios client + API helpers
│   ├── utils.js              # cn(), formatters, helpers
│   └── animationVariants.js  # Framer Motion variants
│
└── data/
    └── courses.js            # Seed catalog (used when backend is offline)
```

## Animations

Custom animations from components.md, converted to plain JS:

| Component             | Description                                    |
| --------------------- | ---------------------------------------------- |
| `BlurText`            | Word-by-word blur-in reveal                    |
| `CircularText`        | Rotating circular text badge                   |
| `ScrollVelocity`      | Text scrolls based on scroll velocity          |
| `VariableProximity`   | Font weight morphs based on cursor proximity   |
| `CountUp`             | Animated number counter                        |
| `AnimatedList`        | Staggered list reveal                          |
| `FlowingMenu`         | Vertical menu with reveal-on-hover             |
| `ExpandablePanel`     | Image panel accordion                          |
| `CustomCursor`        | Dot + ring cursor with hover detection         |
| `Crosshair`           | Crosshair cursor lines                         |
| `MagneticButton`      | Button attracted to cursor                     |
| `ParallaxImage`       | Image translates slower than scroll            |
| `ScrollReveal`        | Generic scroll-triggered reveal                |
| `TextLoader`          | Loading text with animated dots                |

All animations respect `prefers-reduced-motion`.

## Build

```bash
npm run build
```

Output goes to `dist/`. The Vite config splits vendor bundles for better caching:

- `react-vendor` - react, react-dom, react-router-dom
- `animation-vendor` - framer-motion, motion, gsap, ogl
- `markdown-vendor` - react-markdown, remark-gfm

## Deploy

### Vercel
1. Import the `frontend/` folder
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set env vars: `VITE_API_URL`, `VITE_CLOUDINARY_CLOUD_NAME`

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set env vars in Site settings → Environment
