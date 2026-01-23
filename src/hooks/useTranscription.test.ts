import { act, renderHook } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

type MockRecognition = {
  start: () => void;
  stop: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult?: (event: SpeechRecognitionEvent) => void;
  onerror?: (event: SpeechRecognitionErrorEvent) => void;
  onend?: () => void;
};

const mocks = vi.hoisted(() => {
  const recognition: MockRecognition = {
    start: vi.fn(),
    stop: vi.fn(),
    continuous: false,
    interimResults: false,
    lang: "",
  };

  return {
    recognition,
    requestOutputFileMock: vi.fn(),
    startAutosaveMock: vi.fn(() => () => {}),
  };
});

vi.mock("../lib/speechRecognition", () => ({
  buildRecognition: vi.fn(() => mocks.recognition),
}));

vi.mock("../lib/fileOutput", () => ({
  requestOutputFile: mocks.requestOutputFileMock,
  startAutosave: mocks.startAutosaveMock,
}));

import useTranscription from "./useTranscription";

beforeEach(() => {
  mocks.recognition.start = vi.fn();
  mocks.recognition.stop = vi.fn();
  mocks.recognition.onresult = undefined;
  mocks.recognition.onerror = undefined;
  mocks.recognition.onend = undefined;
  mocks.requestOutputFileMock.mockClear();
  mocks.startAutosaveMock.mockClear();
  vi.useRealTimers();
});

it("starts idle with an empty transcript", () => {
  const { result } = renderHook(() => useTranscription());

  expect(result.current.isListening).toBe(false);
  expect(result.current.items).toEqual([]);
  expect(result.current.liveText).toBe("");
  expect(result.current.filePath).toBe("");
  expect(result.current.fileName).toBe("");
});

it("toggles listening state", async () => {
  mocks.requestOutputFileMock.mockResolvedValueOnce(null);
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });
  expect(result.current.isListening).toBe(true);

  act(() => result.current.stop());
  expect(result.current.isListening).toBe(false);
});

it("starts and stops recognition", async () => {
  mocks.requestOutputFileMock.mockResolvedValueOnce(null);
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });
  expect(mocks.recognition.start).toHaveBeenCalledTimes(1);

  act(() => result.current.stop());
  expect(mocks.recognition.stop).toHaveBeenCalledTimes(1);
});

it("prompts for file selection on start when missing", async () => {
  mocks.requestOutputFileMock.mockResolvedValueOnce(null);
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });

  expect(mocks.requestOutputFileMock).toHaveBeenCalledTimes(1);
});

it("does not restart autosave on transcript updates", async () => {
  const handle = { createWritable: vi.fn() } as unknown as FileSystemFileHandle;
  mocks.requestOutputFileMock.mockResolvedValueOnce(handle);

  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });

  expect(mocks.startAutosaveMock).toHaveBeenCalledTimes(1);

  act(() => {
    mocks.recognition.onresult?.({
      resultIndex: 0,
      results: [
        Object.assign([{ transcript: "Hello" }], {
          isFinal: true,
        }),
      ],
    } as unknown as SpeechRecognitionEvent);
  });

  expect(mocks.startAutosaveMock).toHaveBeenCalledTimes(1);
});

it("restarts recognition when it ends unexpectedly", async () => {
  vi.useFakeTimers();
  mocks.requestOutputFileMock.mockResolvedValueOnce(null);
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });

  act(() => {
    mocks.recognition.onend?.();
  });

  await act(async () => {
    await vi.runAllTimersAsync();
  });

  expect(mocks.recognition.start).toHaveBeenCalledTimes(2);
});

it("does not restart recognition after user stops", async () => {
  vi.useFakeTimers();
  mocks.requestOutputFileMock.mockResolvedValueOnce(null);
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });

  act(() => result.current.stop());

  act(() => {
    mocks.recognition.onend?.();
  });

  await act(async () => {
    await vi.runAllTimersAsync();
  });

  expect(mocks.recognition.start).toHaveBeenCalledTimes(1);
});
