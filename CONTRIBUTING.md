# Contributing to Hydro Industries Presentation Systems

Thank you for your interest in contributing to the Hydro Industries executive presentation platform. Please review the following standards before opening a pull request or submitting code.

---

## 1. Development Principles

1. **Executive-First Design**:
   - The presentation is used by C-suite executives in high-stakes environments. Visual fidelity, framerate consistency, and zero-flicker transitions take precedence.
2. **Strict TypeScript & Zero Build Warnings**:
   - Every file must pass `npm run lint` (`tsc --noEmit`) with zero errors and no `any` casts.
   - Production builds with `npm run build` (`vite build`) must compile cleanly.
3. **No Unmanaged Scroll State**:
   - Navigation between slides is discrete and state-managed in `App.tsx`. Do not re-introduce continuous window scrolling or third-party scrolling plugins that bypass the discrete controller.

---

## 2. Local Workflow

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Verify linting and build
npm run lint
npm run build
```

---

## 3. Commit Conventions

Follow conventional commit formats:
- `feat(globe): enhance Earth texture resolution and axial tilt`
- `fix(nav): prevent double slide skipping during trackpad momentum`
- `docs(pdr): update treatment performance dataset figures`
- `style(theme): refine electric blue contrast on ice background`
