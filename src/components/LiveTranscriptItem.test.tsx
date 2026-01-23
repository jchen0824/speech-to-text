import { render, screen } from "@testing-library/react";
import LiveTranscriptItem from "./LiveTranscriptItem";

test("live line is not faded by container animation", () => {
  const { container } = render(<LiveTranscriptItem text="Live text" />);
  expect(screen.getByText(/Live text/i)).toBeInTheDocument();
  expect(container.firstChild).not.toHaveClass("animate-pulse");
});
