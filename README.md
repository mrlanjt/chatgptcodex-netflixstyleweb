# Netflix Style Web (React + TypeScript)

A production-oriented starter for a Netflix-style streaming UI featuring:

- Animated card deck (Framer Motion)
- Lightweight state management (Zustand)
- Modular structure for components/services/store
- Responsive layout for desktop and mobile
- Unit tests with Vitest + Testing Library

## Quick start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build
- `npm run test` – run unit tests


## Git sync (avoid merge conflicts)

Before each change, sync your branch with the integration branch to reduce PR conflicts:

```bash
npm run sync:main
```

What it does:
- fetches `origin`
- auto-detects `origin/main` (or falls back to `origin/master`)
- rebases your current branch onto that base

If `package-lock.json` conflicts during rebase, follow the script hint to regenerate lockfile and continue rebase.
