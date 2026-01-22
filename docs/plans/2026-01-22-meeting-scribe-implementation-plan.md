# Meeting Scribe UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Meeting Scribe UI to match the provided mockup/HTML and wire it to the MVP speech-to-text flow.

**Architecture:** Vite + React + TypeScript SPA with a fixed top bar, transcript canvas, and right sidebar. UI components are presentational and driven by a single app state hook; Web Speech API and File System Access API are isolated in utilities to keep UI pure.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS (for parity with the provided HTML), Vitest + React Testing Library.

### Task 1: Scaffold app + Tailwind base

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`
- Modify: `index.html`

**Step 1: Write the failing test**

Create `src/App.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the app shell", () => {
  render(<App />);
  expect(screen.getByText(/Meeting Scribe/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL because tooling and App are not set up.

**Step 3: Write minimal implementation**

- Scaffold Vite app (`npm create vite@latest . -- --template react-ts`).
- Add Tailwind config and `src/index.css` with base styles.
- Add Google Fonts (Inter) and Material Symbols in `index.html`.
- Implement a minimal `src/App.tsx` rendering `Meeting Scribe`.

**Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: PASS for the app shell test.

**Step 5: Commit**

```bash
git add package.json vite.config.ts tailwind.config.js postcss.config.js index.html src/App.tsx src/index.css src/App.test.tsx
git commit -m "chore: scaffold vite react app"
```

### Task 2: App shell layout (top bar + main split)

**Files:**
- Create: `src/components/TopBar.tsx`
- Create: `src/components/Sidebar.tsx`
- Create: `src/components/TranscriptPane.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Step 1: Write the failing test**

Create `src/components/AppShell.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import App from "../App";

it("renders top bar and sidebar headers", () => {
  render(<App />);
  expect(screen.getByText(/Meeting Scribe/i)).toBeInTheDocument();
  expect(screen.getByText(/Controls/i)).toBeInTheDocument();
  expect(screen.getByText(/File Output/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL because layout components are missing.

**Step 3: Write minimal implementation**

- Implement `TopBar` with logo, title, listening chip, help/settings icons, avatar gradient.
- Implement `Sidebar` container with section headers.
- Implement `TranscriptPane` container with scroll area.
- Wire `App` layout to match the mockup (flex split; sidebar hidden under lg).

**Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: PASS for app shell test.

**Step 5: Commit**

```bash
git add src/components/TopBar.tsx src/components/Sidebar.tsx src/components/TranscriptPane.tsx src/App.tsx src/index.css src/components/AppShell.test.tsx
git commit -m "feat: add app shell layout"
```

### Task 3: Transcript list + live row

**Files:**
- Create: `src/components/TranscriptItem.tsx`
- Create: `src/components/LiveTranscriptItem.tsx`
- Modify: `src/components/TranscriptPane.tsx`
- Create: `src/types/transcript.ts`

**Step 1: Write the failing test**

Create `src/components/TranscriptPane.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import TranscriptPane from "./TranscriptPane";

it("renders transcript rows and live indicator", () => {
  render(
    <TranscriptPane
      items={[{ id: "1", time: "10:02", text: "Hello" }]}
      liveText="Live text"
    />
  );
  expect(screen.getByText("10:02")).toBeInTheDocument();
  expect(screen.getByText(/Live text/i)).toBeInTheDocument();
  expect(screen.getByText(/LIVE/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL because components are missing.

**Step 3: Write minimal implementation**

- Define `TranscriptItem` type with `id`, `time`, `text`.
- Render date separator line and transcript rows as in mockup.
- Render live row with italic interim text and blinking caret.

**Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/TranscriptItem.tsx src/components/LiveTranscriptItem.tsx src/components/TranscriptPane.tsx src/types/transcript.ts src/components/TranscriptPane.test.tsx
git commit -m "feat: render transcript list and live row"
```

### Task 4: Controls + file output card + toast

**Files:**
- Create: `src/components/ControlsPanel.tsx`
- Create: `src/components/FileOutputCard.tsx`
- Create: `src/components/Toast.tsx`
- Modify: `src/components/Sidebar.tsx`

**Step 1: Write the failing test**

Create `src/components/Sidebar.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

it("renders control buttons and file output", () => {
  render(
    <Sidebar
      isListening
      filePath="/Users/Design/Documents/Notes"
      fileName="meeting-oct24.txt"
    />
  );
  expect(screen.getByText(/Stop Recording/i)).toBeInTheDocument();
  expect(screen.getByText(/Copy All/i)).toBeInTheDocument();
  expect(screen.getByText(/Clear/i)).toBeInTheDocument();
  expect(screen.getByText(/File Output/i)).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL because components are missing.

**Step 3: Write minimal implementation**

- Implement primary stop/start button styles and layout.
- Implement `Copy All` and `Clear` tiles.
- Implement file output card with path, filename, and Change link.
- Add toast component matching mockup style.

**Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/ControlsPanel.tsx src/components/FileOutputCard.tsx src/components/Toast.tsx src/components/Sidebar.tsx src/components/Sidebar.test.tsx
git commit -m "feat: add controls, file output, and toast"
```

### Task 5: UI state hook + wiring actions

**Files:**
- Create: `src/hooks/useTranscription.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/TopBar.tsx`
- Modify: `src/components/ControlsPanel.tsx`

**Step 1: Write the failing test**

Create `src/hooks/useTranscription.test.ts`:
```ts
import { renderHook, act } from "@testing-library/react";
import useTranscription from "./useTranscription";

it("toggles listening state", () => {
  const { result } = renderHook(() => useTranscription());
  act(() => result.current.start());
  expect(result.current.isListening).toBe(true);
  act(() => result.current.stop());
  expect(result.current.isListening).toBe(false);
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL because hook is missing.

**Step 3: Write minimal implementation**

- Implement `useTranscription` with `isListening`, `items`, `liveText`.
- Wire `Start/Stop`, `Copy All`, `Clear` actions (use clipboard API for copy).
- Reflect listening state in the top bar chip and stop button.

**Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/hooks/useTranscription.ts src/hooks/useTranscription.test.ts src/App.tsx src/components/TopBar.tsx src/components/ControlsPanel.tsx
git commit -m "feat: add transcription UI state"
```

### Task 6: Web Speech API + autosave integration

**Files:**
- Create: `src/lib/speechRecognition.ts`
- Create: `src/lib/fileOutput.ts`
- Modify: `src/hooks/useTranscription.ts`

**Step 1: Write the failing test**

Create `src/lib/speechRecognition.test.ts`:
```ts
import { buildRecognition } from "./speechRecognition";

test("buildRecognition configures defaults", () => {
  const recognition = buildRecognition();
  expect(recognition.continuous).toBe(true);
  expect(recognition.interimResults).toBe(true);
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL because helpers are missing.

**Step 3: Write minimal implementation**

- Implement `buildRecognition()` wrapper around `window.SpeechRecognition`.
- Implement autosave helpers using File System Access API with 30s interval.
- Update hook to append finalized segments and update `liveText` from interim results.

**Step 4: Run test to verify it passes**

Run: `npm run test`
Expected: PASS (mock `SpeechRecognition` in tests).

**Step 5: Commit**

```bash
git add src/lib/speechRecognition.ts src/lib/fileOutput.ts src/lib/speechRecognition.test.ts src/hooks/useTranscription.ts
git commit -m "feat: integrate speech recognition and autosave"
```

### Task 7: Polish and QA checklist

**Files:**
- Modify: `docs/plans/2026-01-22-speech-to-text-design.md`
- Create: `docs/qa-checklist.md`

**Step 1: Write the failing test**

Create `docs/qa-checklist.md` with checkboxes and mark as TODO.

**Step 2: Run test to verify it fails**

Run: `git status`
Expected: new QA checklist file to review.

**Step 3: Write minimal implementation**

- Update design doc to note UI parity with mockup.
- Add QA checklist for mic permission, autosave, clipboard copy, and file change flow.

**Step 4: Run test to verify it passes**

Run: `git status`
Expected: updated docs are staged cleanly.

**Step 5: Commit**

```bash
git add docs/plans/2026-01-22-speech-to-text-design.md docs/qa-checklist.md
git commit -m "docs: add QA checklist"
```

Plan complete and saved to `docs/plans/2026-01-22-meeting-scribe-implementation-plan.md`. Two execution options:

1. Subagent-Driven (this session) - I dispatch fresh subagent per task, review between tasks, fast iteration
2. Parallel Session (separate) - Open new session with executing-plans, batch execution with checkpoints

Which approach?
