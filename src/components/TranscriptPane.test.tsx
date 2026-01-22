import { render, screen } from "@testing-library/react";
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
  expect(screen.getByText(/LIVE/i)).toBeInTheDocument();
});
