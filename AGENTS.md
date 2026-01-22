# Repository Guidelines

## Project Structure & Module Organization
- `docs/plans/` holds design and planning docs (see `docs/plans/2026-01-22-speech-to-text-design.md`).
- Planned app layout (per design): `src/` for React UI and state, `src/components/` for UI blocks like `ControlBar` and `TranscriptView`, `src/lib/` for helpers, and `tests/` or `src/__tests__/` for unit tests.
- Assets (icons, fonts) should live under `src/assets/`.

## Build, Test, and Development Commands
Planned stack is Vite + React (Chrome-only Web Speech API).
- `npm install` — install dependencies.
- `npm run dev` — start the local dev server.
- `npm run build` — create a production build.
- `npm run test` — run unit tests (target: transcript merge + autosave cursor logic).

## Coding Style & Naming Conventions
- Use 2-space indentation for JS/TS and JSON.
- Components: `PascalCase` (e.g., `TranscriptView.tsx`).
- Hooks and helpers: `camelCase` (e.g., `useRecognition.ts`).
- Filenames: `kebab-case` for non-component utilities if needed.
- Format with the repo’s formatter once added (prefer Prettier) and lint with ESLint.

## Testing Guidelines
- Primary focus: unit tests for transcript append/merge and autosave cursor behavior.
- Name test files `*.test.ts` or `*.spec.ts` next to the module or under `tests/`.
- Keep tests deterministic; mock `SpeechRecognition` and File System Access APIs.

## Commit & Pull Request Guidelines
- Use Conventional Commits without bracketed tags (e.g., `feat: add autosave timer`, `fix: handle mic permission denial`). Keep subjects imperative.
- Commit hook: append `[ai:n]` to avoid the auto-added `[ai-assisted]` tag; `[ai:y]` prepends `[ai-assisted]`, and the hook strips the `[ai:n]` marker before saving.
- PRs should include: summary of changes, test notes (`npm run test` output or “not run”), and screenshots for UI changes.
- Link relevant issues or design doc sections where possible.

## Security & Configuration Tips
- This MVP is browser-only; do not add server secrets to the repo.
- Prefer browser APIs over external services unless explicitly approved.
