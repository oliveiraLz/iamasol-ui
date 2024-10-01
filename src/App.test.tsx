import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("demo", () => {
  expect(true).toBe(true);
});

describe("App Component with Routes", () => {
  it("renders the main route correctly", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const mainContent = screen.getByText(/home/i);
    expect(mainContent).toBeInTheDocument();
  });
});
