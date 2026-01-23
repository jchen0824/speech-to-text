import { buildRecognition } from "./speechRecognition";

describe("buildRecognition", () => {
  const originalSpeechRecognition = window.SpeechRecognition;
  const originalLanguages = navigator.languages;

  afterEach(() => {
    window.SpeechRecognition = originalSpeechRecognition;
    Object.defineProperty(navigator, "languages", {
      value: originalLanguages,
      configurable: true,
    });
  });

  test("buildRecognition configures defaults", () => {
    class MockRecognition {
      continuous = false;
      interimResults = false;
      lang = "";
      start = () => {};
      stop = () => {};
    }

    window.SpeechRecognition = MockRecognition as unknown as typeof SpeechRecognition;
    Object.defineProperty(navigator, "languages", {
      value: ["zh-CN", "en-US"],
      configurable: true,
    });

    const recognition = buildRecognition();

    expect(recognition.continuous).toBe(true);
    expect(recognition.interimResults).toBe(true);
    expect(recognition.lang).toBe("zh-CN");
  });
});
