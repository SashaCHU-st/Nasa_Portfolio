import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RequiredFields from "./RequiredFields";

describe("RequiredFields", () => {
  it("renders required fields hint", () => {
    render(<RequiredFields />);

    expect(screen.getByText("* Required fields")).toBeInTheDocument();
  });
});
