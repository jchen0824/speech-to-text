# Speech-to-Text MVP Design

Date: 2026-01-22

## Goal
Build a local, front-end-only web app (Chrome on macOS) that captures microphone audio and produces a real-time transcript for meetings. The MVP shows a continuous transcript stream (no timestamps), supports English and Chinese on a best-effort basis, and autosaves to a user-chosen file every 30 seconds.

## Constraints
- Chrome-only: relies on Web Speech API and File System Access API.
- No backend services.
- No explicit per-minute billing; uses browser-provided recognition, which is typically server-based.
- Best-effort language handling: uses browser default language (no manual toggle in MVP).

## Recommended Approach (and Alternatives)
**Recommended:** Web Speech API in Chrome
- Pros: fastest MVP, no API keys, real-time UX.
- Cons: network-dependent, availability limits are browser-controlled.

**Alternative 1:** Cloud STT (paid APIs)
- Pros: higher accuracy, stability, diarization options.
- Cons: cost, backend/auth work.

**Alternative 2:** On-device STT (e.g., Whisper WASM)
- Pros: offline-capable, privacy-first.
- Cons: heavy CPU/RAM, more engineering.

## Architecture
- Vite + React SPA.
- Use `SpeechRecognition` for live transcription.
- Use File System Access API for autosave to a selected file.
- No server-side components.

## Components
- **ControlBar**: Start/Stop, Clear, Choose File, Status.
- **TranscriptView**: scrollable, auto-scrolls on new text.
- **App State**:
  - `isListening`
  - `transcript` (array of finalized segments)
  - `interimText`
  - `fileHandle`
  - `lastSavedIndex`
  - `error`

## Data Flow
1. User clicks Start.
2. App checks `SpeechRecognition` availability.
3. App requests mic permission.
4. Recognition starts with `continuous=true`, `interimResults=true`, `lang=navigator.language`.
5. On `result` events:
   - Append finalized text to transcript.
   - Show interim text while speaking.
6. Autosave timer (every 30s while listening):
   - Append new transcript chunks since `lastSavedIndex` to chosen file.
7. Stop:
   - Stop recognition.
   - Flush pending autosave.
8. Clear:
   - Reset in-memory transcript and autosave cursor.
   - Do not delete file contents.

## Error Handling
- If Web Speech API is unavailable: disable Start and show “Chrome required.”
- Mic permission denied: show guidance and allow retry.
- Recognition errors (network, no-speech, audio-capture, not-allowed): show readable status; stop for fatal errors.
- File System Access errors (permission revoked, write failure): show warning and pause autosave until re-selected.

## Testing
- Unit tests for transcript append/merge and autosave cursor logic.
- Manual QA checklist:
  - Mic permission flow.
  - Continuous recognition stability.
  - Autosave writes and flush on Stop.
  - Error states display correctly.

## Open Questions / Future Enhancements
- Add manual language toggle (English/Chinese).
- Add timestamps and/or speaker segmentation.
- Add export formats (txt/markdown) and summaries.
