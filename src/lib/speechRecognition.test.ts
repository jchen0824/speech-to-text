import { buildRecognition } from "./speechRecognition";

describe("buildRecognition", () => {
  const originalSpeechRecognition = window.SpeechRecognition;

  afterEach(() => {
    window.SpeechRecognition = originalSpeechRecognition;
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

    const recognition = buildRecognition();

    expect(recognition.continuous).toBe(true);
    expect(recognition.interimResults).toBe(true);
    expect(recognition.lang).toBe("en-US");
  });
});
