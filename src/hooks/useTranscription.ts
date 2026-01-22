import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { startAutosave, requestOutputFile } from "../lib/fileOutput";
import { buildRecognition } from "../lib/speechRecognition";
import type { TranscriptItem } from "../types/transcript";

const initialTranscript: TranscriptItem[] = [
  {
    id: "1",
    time: "10:02",
    text: "Alright everyone, let's get started. Thanks for joining on such short notice. We need to go over the Q3 performance metrics before the board meeting tomorrow.",
  },
  {
    id: "2",
    time: "10:03",
    text: "Looking at the acquisition channels, the organic search traffic has increased by 15% month over month. That's a strong signal that our SEO strategy is finally paying off.",
  },
  {
    id: "3",
    time: "10:04",
    text: "However, paid social seems to be lagging behind. The CPC has gone up significantly on LinkedIn ads.",
  },
];

const initialLiveText =
  "I think we should consider reallocating some budget to Google Ads instead because the intent is higher there... wait, let me pull up the chart... yes, the conversion rate is double.";

const TOAST_DURATION_MS = 3000;

const formatTimestamp = (date = new Date()) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const useTranscription = () => {
  const [isListening, setIsListening] = useState(true);
  const [items, setItems] = useState<TranscriptItem[]>(initialTranscript);
  const [liveText, setLiveText] = useState(initialLiveText);
  const [toastMessage, setToastMessage] = useState("Transcript saved successfully");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [filePath, setFilePath] = useState("/Users/Design/Documents/Notes");
  const [fileName, setFileName] = useState("meeting-oct24.txt");
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
    null
  );
  const toastTimerRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const start = useCallback(() => {
    try {
      if (!recognitionRef.current) {
        recognitionRef.current = buildRecognition();
      }

      recognitionRef.current.onresult = (event) => {
        const finalTranscripts: string[] = [];
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const result = event.results[i];
          const transcript = result[0]?.transcript?.trim() ?? "";

          if (result.isFinal) {
            if (transcript) {
              finalTranscripts.push(transcript);
            }
          } else {
            interimTranscript = transcript;
          }
        }

        if (finalTranscripts.length) {
          setItems((prev) => [
            ...prev,
            ...finalTranscripts.map((text) => ({
              id: createId(),
              time: formatTimestamp(),
              text,
            })),
          ]);
        }

        setLiveText(interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Speech recognition unavailable", error);
      setIsListening(false);
    }
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setLiveText("");
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setLiveText("");
  }, []);

  const copyAll = useCallback(async () => {
    const fullText = [
      ...items.map((item) => item.text),
      liveText ? `(${liveText})` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(fullText);
    } catch (error) {
      console.error("Failed to copy transcript", error);
    }
  }, [items, liveText]);

  const notifySaved = useCallback((message = "Transcript saved successfully") => {
    setToastMessage(message);
    setIsToastOpen(true);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setIsToastOpen(false);
    }, TOAST_DURATION_MS);
  }, []);

  const changeFile = useCallback(async () => {
    try {
      const handle = await requestOutputFile(fileName);
      if (!handle) {
        return;
      }

      setFileHandle(handle);
      setFileName(handle.name || fileName);
      setFilePath("Selected location");
    } catch (error) {
      console.error("Failed to select file", error);
    }
  }, [fileName]);

  const transcriptText = useMemo(() => {
    const finalized = items.map((item) => item.text).join("\n\n");
    if (!liveText) {
      return finalized;
    }

    return [finalized, `(${liveText})`].filter(Boolean).join("\n\n");
  }, [items, liveText]);

  useEffect(() => {
    if (!fileHandle) {
      return undefined;
    }

    const stopAutosave = startAutosave({
      getContent: () => transcriptText,
      getFileHandle: () => fileHandle,
      onSaved: () => notifySaved(),
    });

    return stopAutosave;
  }, [fileHandle, transcriptText, notifySaved]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return {
    isListening,
    items,
    liveText,
    filePath,
    fileName,
    isToastOpen,
    toastMessage,
    start,
    stop,
    clear,
    copyAll,
    notifySaved,
    changeFile,
  };
};

export default useTranscription;
