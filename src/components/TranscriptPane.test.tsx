import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TranscriptPane from "./TranscriptPane";

it("renders transcript rows and live indicator", () => {
  render(
    <TranscriptPane
      items={[{ id: "1", time: "10:02", text: "Hello" }]}
      liveText="Live text"
    />
  );
  expect(screen.getByText("10:02")).toBeInTheDocument();
  expect(screen.getByText(/Live text/i)).toBeInTheDocument();
  expect(screen.getByText("LIVE", { selector: "span" })).toBeInTheDocument();
});

it("renders today's date dynamically", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 0, 23, 12, 0, 0));

  render(<TranscriptPane items={[]} liveText="" />);
  expect(screen.getByText("Today, Jan 23")).toBeInTheDocument();

  vi.useRealTimers();
});
