import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NameInput from "./NameInput";

describe("SignUp NameInput", () => {
  it("passes name field payload to updateField", () => {
    const updateField = vi.fn();

    render(<NameInput value="" error={null} updateField={updateField} />);

    const input = screen.getByPlaceholderText(/please write your name/i);
    fireEvent.change(input, { target: { value: "Alex" } });

    expect(updateField).toHaveBeenCalledWith(
      "name",
      "nameError",
      "Alex",
      15,
      "Name must be max 15 characters",
    );
  });
});
