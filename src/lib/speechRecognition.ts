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

const pickRecognitionLanguage = () => {
  if (typeof navigator === "undefined") {
    return "en-US";
  }

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);

  const normalized = languages.map((lang) => lang.toLowerCase());
  if (normalized.some((lang) => lang.startsWith("zh"))) {
    return "zh-CN";
  }

  if (normalized.some((lang) => lang.startsWith("en"))) {
    return "en-US";
  }

  return navigator.language || "en-US";
};

export const buildRecognition = (): SpeechRecognition => {
  const SpeechRecognitionCtor = getSpeechRecognitionConstructor();

  if (!SpeechRecognitionCtor) {
    throw new Error("SpeechRecognition not supported");
  }

  const recognition = new SpeechRecognitionCtor();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = pickRecognitionLanguage();
  return recognition;
};
