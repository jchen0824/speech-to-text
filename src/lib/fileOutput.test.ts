import { describe, expect, test, vi } from "vitest";
import { startAutosave } from "./fileOutput";

describe("startAutosave", () => {
  test("writes and notifies on interval", async () => {
    vi.useFakeTimers();

    const write = vi.fn();
    const close = vi.fn();
    const createWritable = vi.fn().mockResolvedValue({ write, close });
    const handle = { createWritable } as unknown as FileSystemFileHandle;

    const onSaved = vi.fn();

    const stop = startAutosave({
      getContent: () => "Hello",
      getFileHandle: () => handle,
      onSaved,
      intervalMs: 1000,
    });

    await vi.advanceTimersByTimeAsync(1000);

    expect(createWritable).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith("Hello");
    expect(close).toHaveBeenCalledTimes(1);
    expect(onSaved).toHaveBeenCalledTimes(1);

    stop();
    vi.useRealTimers();
  });
});
