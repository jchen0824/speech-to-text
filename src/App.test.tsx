import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the app shell", () => {
  const { container } = render(<App />);
  expect(screen.getByText(/Meeting Scribe/i)).toBeInTheDocument();
  expect(container.firstChild).toHaveClass("bg-background-light");
  expect(container.firstChild).toHaveClass("dark:bg-background-dark");
});
