# Known Issues

## Auto language detection

The Web Speech API requires a single language (`SpeechRecognition.lang`) and does not provide built-in automatic language detection. As a result, the current implementation only selects one language at a time (best-effort based on browser preferences).

**Impact**
- Mixed Chinese/English meetings may produce inaccurate or missing segments for the non-selected language.
- Users must restart recognition to switch languages.

**Planned improvement**
- Add explicit language selection (English / Chinese).
- Evaluate alternative STT engines that support language identification for true auto-detect.

**Workaround**
- Set the browser’s preferred language order to prioritize the language you need, then restart the recording.
