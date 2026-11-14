# Echoes of Space — Project Rules

## Product
Build a scientifically grounded interactive 3D atlas of historic
and inactive NASA equipment on the Moon. Mars is a future extension.

## Architecture
- Next.js App Router
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- Zustand for shared UI state
- Local typed JSON for initial mission and artifact data

## 3D requirements
- Desktop-first, responsive on mobile.
- Start with a 3D lunar globe.
- Use a hybrid terrain architecture:
  1. Global lunar imagery and elevation for the globe.
  2. High-resolution regional terrain when zoomed into a site.
- Do not attempt a full planetary tile engine in the MVP.
- Keep globe rendering in client-only components.
- Do not access window, document, or WebGL during server rendering.
- Load large textures lazily.
- Dispose of Three.js resources when appropriate.

## Scientific integrity
- Never invent artifact coordinates, mission dates, or technical facts.
- Keep sources with each artifact record.
- Label approximate coordinates as approximate.
- Distinguish last communication, mission end date, and physical status.
- Do not imply all inactive equipment is physically abandoned or destroyed.

## Code quality
- Use small, reusable components.
- Use strict TypeScript types; avoid `any`.
- Keep data separate from UI components.
- Do not put all application logic in one page.
- Explain new dependencies before adding them.
- Run type checks and lint after significant changes.
- Do not silently replace existing working functionality.

## Workflow
- Work in small stages.
- Before editing, explain the files you intend to change.
- After editing, report files changed and commands/tests run.
- Stop after each requested stage and wait for review.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
