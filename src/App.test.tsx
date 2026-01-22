import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the app shell", () => {
  render(<App />);
  expect(screen.getByText(/Meeting Scribe/i)).toBeInTheDocument();
});
