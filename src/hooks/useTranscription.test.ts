import { act, renderHook } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

const startMock = vi.fn();
const stopMock = vi.fn();

vi.mock("../lib/speechRecognition", () => ({
  buildRecognition: vi.fn(() => ({
    start: startMock,
    stop: stopMock,
    continuous: false,
    interimResults: false,
    lang: "",
  })),
}));

import useTranscription from "./useTranscription";

beforeEach(() => {
  startMock.mockClear();
  stopMock.mockClear();
});

it("starts idle with an empty transcript", () => {
  const { result } = renderHook(() => useTranscription());

  expect(result.current.isListening).toBe(false);
  expect(result.current.items).toEqual([]);
  expect(result.current.liveText).toBe("");
});

it("toggles listening state", () => {
  const { result } = renderHook(() => useTranscription());

  act(() => result.current.start());
  expect(result.current.isListening).toBe(true);

  act(() => result.current.stop());
  expect(result.current.isListening).toBe(false);
});

it("starts and stops recognition", () => {
  const { result } = renderHook(() => useTranscription());

  act(() => result.current.start());
  expect(startMock).toHaveBeenCalledTimes(1);

  act(() => result.current.stop());
  expect(stopMock).toHaveBeenCalledTimes(1);
});
