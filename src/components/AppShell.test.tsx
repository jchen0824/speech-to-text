import { render, screen } from "@testing-library/react";
import App from "../App";

it("renders top bar and sidebar headers", () => {
  render(<App />);
  expect(screen.getByText(/Meeting Scribe/i)).toBeInTheDocument();
  expect(screen.getByText(/Controls/i)).toBeInTheDocument();
  expect(screen.getByText(/File Output/i)).toBeInTheDocument();
});
