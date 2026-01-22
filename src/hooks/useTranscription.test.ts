import { act, renderHook } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  startMock: vi.fn(),
  stopMock: vi.fn(),
  requestOutputFileMock: vi.fn(),
  startAutosaveMock: vi.fn(() => () => {}),
}));

vi.mock("../lib/speechRecognition", () => ({
  buildRecognition: vi.fn(() => ({
    start: mocks.startMock,
    stop: mocks.stopMock,
    continuous: false,
    interimResults: false,
    lang: "",
  })),
}));

vi.mock("../lib/fileOutput", () => ({
  requestOutputFile: mocks.requestOutputFileMock,
  startAutosave: mocks.startAutosaveMock,
}));

import useTranscription from "./useTranscription";

beforeEach(() => {
  mocks.startMock.mockClear();
  mocks.stopMock.mockClear();
  mocks.requestOutputFileMock.mockClear();
  mocks.startAutosaveMock.mockClear();
});

it("starts idle with an empty transcript", () => {
  const { result } = renderHook(() => useTranscription());

  expect(result.current.isListening).toBe(false);
  expect(result.current.items).toEqual([]);
  expect(result.current.liveText).toBe("");
});

it("toggles listening state", async () => {
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });
  expect(result.current.isListening).toBe(true);

  act(() => result.current.stop());
  expect(result.current.isListening).toBe(false);
});

it("starts and stops recognition", async () => {
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });
  expect(mocks.startMock).toHaveBeenCalledTimes(1);

  act(() => result.current.stop());
  expect(mocks.stopMock).toHaveBeenCalledTimes(1);
});

it("prompts for file selection on start when missing", async () => {
  mocks.requestOutputFileMock.mockResolvedValueOnce(null);
  const { result } = renderHook(() => useTranscription());

  await act(async () => {
    await result.current.start();
  });

  expect(mocks.requestOutputFileMock).toHaveBeenCalledTimes(1);
});
