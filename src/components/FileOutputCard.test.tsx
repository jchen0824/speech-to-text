import { render, screen } from "@testing-library/react";
import FileOutputCard from "./FileOutputCard";

test("shows placeholder when no file is selected", () => {
  render(<FileOutputCard filePath="" fileName="" />);

  expect(screen.getByText(/No file selected/i)).toBeInTheDocument();
  expect(screen.getByText(/Choose output file/i)).toBeInTheDocument();
});
