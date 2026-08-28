# Frontend Assets

This folder holds local static assets bundled into the Vite build.

## What goes here

- **`icons.jsx`** - Custom SVG icon components (brand marks, decorative shapes)
- **`*.svg`** - Small inline SVG illustrations
- **`*.png` / `*.jpg`** - Local images that should be bundled (NOT Cloudinary-hosted)
- **`*.webp`** - Optimized local photography

## What does NOT go here

- **Cloudinary-hosted images** — Use the full URL directly (e.g. the Learnly logo at `https://res.cloudinary.com/dy7z0znum/...`). These are already optimized, transformed, and CDN-delivered. Don't download them into `assets/`.
- **User-uploaded content** — Profile pictures, lesson resources, and PDFs are uploaded via the backend to Cloudinary. Never store them locally.
- **Large photography** — Use Cloudinary for any image >50KB so the Vite bundle stays small.

## Importing assets

```jsx
// JavaScript import (Vite will hash + bundle the file)
import logoFallback from '../assets/learnly-mark.svg'

// Or use the icons component
import { LearnlyMark } from '../assets/icons'
<LearnlyMark size={32} />
```

## Reference

- Learnly logo (Cloudinary): https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png
- Learnly favicon (Cloudinary): https://res.cloudinary.com/dy7z0znum/image/upload/v1787922537/7bc43e7b-a879-44bb-b0a6-240e1f7e3af3_jx8ygs.png

These are loaded directly from Cloudinary in `Navbar.jsx` and `Footer.jsx` — no need to copy them here.
