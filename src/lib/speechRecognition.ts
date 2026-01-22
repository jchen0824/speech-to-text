type SpeechRecognitionConstructor = new () => SpeechRecognition;

type WindowWithSpeech = Window & {
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const getSpeechRecognitionConstructor = (): SpeechRecognitionConstructor | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    window.SpeechRecognition || (window as WindowWithSpeech).webkitSpeechRecognition
  ) ?? null;
};

export const buildRecognition = (): SpeechRecognition => {
  const SpeechRecognitionCtor = getSpeechRecognitionConstructor();

  if (!SpeechRecognitionCtor) {
    throw new Error("SpeechRecognition not supported");
  }

  const recognition = new SpeechRecognitionCtor();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  return recognition;
};
