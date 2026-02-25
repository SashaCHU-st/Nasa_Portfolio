import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AuthComponent from "./AuthComponent";

vi.mock("./Switcher", () => ({
  default: ({ switcher }: { switcher: boolean }) => (
    <div>{`Switcher ${String(switcher)}`}</div>
  ),
}));

vi.mock("./RequiredFields", () => ({
  default: () => <div>RequiredFields</div>,
}));

describe("AuthComponent", () => {
  it("renders switcher and required fields", () => {
    render(<AuthComponent />);

    expect(screen.getByText("Switcher false")).toBeInTheDocument();
    expect(screen.getByText("RequiredFields")).toBeInTheDocument();
  });
});
