import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PasswordInput from "./PasswordInput";

describe("Login PasswordInput", () => {
  it("calls updateField for password changes", () => {
    const updateField = vi.fn();

    render(
      <PasswordInput
        value=""
        error={null}
        updateField={updateField}
        showPassword={false}
        setShowPassword={vi.fn()}
      />,
    );

    const input = screen.getByPlaceholderText(/please write your password/i);
    fireEvent.change(input, { target: { value: "Space123" } });

    expect(updateField).toHaveBeenCalledWith(
      "password",
      "passwordError",
      "Space123",
      40,
      "Password must be max 40 characters",
    );
  });

  it("toggles showPassword state via action button", async () => {
    const setShowPassword = vi.fn();
    const user = userEvent.setup();

    render(
      <PasswordInput
        value=""
        error={null}
        updateField={vi.fn()}
        showPassword={false}
        setShowPassword={setShowPassword}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(setShowPassword).toHaveBeenCalledWith(true);
  });
});
