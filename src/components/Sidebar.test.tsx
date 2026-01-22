import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

it("renders control buttons and file output", () => {
  render(
    <Sidebar
      isListening
      filePath="/Users/Design/Documents/Notes"
      fileName="meeting-oct24.txt"
    />
  );

  expect(screen.getByText(/Stop Recording/i)).toBeInTheDocument();
  expect(screen.getByText(/Copy All/i)).toBeInTheDocument();
  expect(screen.getByText(/Clear/i)).toBeInTheDocument();
  expect(screen.getByText(/File Output/i)).toBeInTheDocument();
});
