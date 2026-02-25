import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EmailInput from "./EmailInput";

describe("SignUp EmailInput", () => {
  it("passes email field payload to updateField", () => {
    const updateField = vi.fn();

    render(<EmailInput value="" error={null} updateField={updateField} />);

    const input = screen.getByPlaceholderText(/please write your email/i);
    fireEvent.change(input, { target: { value: "alex@example.com" } });

    expect(updateField).toHaveBeenCalledWith(
      "email",
      "emailError",
      "alex@example.com",
      40,
      "Email must be max 40 characters",
    );
  });
});
