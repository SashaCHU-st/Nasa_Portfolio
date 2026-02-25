import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PasswordInput from "./PasswordInput";

describe("SignUp PasswordInput", () => {
  it("calls onChange with typed value", () => {
    const onChange = vi.fn();

    render(
      <PasswordInput
        value=""
        error={null}
        onChange={onChange}
        showPassword={false}
        setShowPassword={vi.fn()}
      />,
    );

    const input = screen.getByPlaceholderText(/please write your password/i);
    fireEvent.change(input, { target: { value: "Space123" } });

    expect(onChange).toHaveBeenCalledWith("Space123");
  });

  it("toggles showPassword state via action button", async () => {
    const setShowPassword = vi.fn();
    const user = userEvent.setup();

    render(
      <PasswordInput
        value=""
        error={null}
        onChange={vi.fn()}
        showPassword={false}
        setShowPassword={setShowPassword}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(setShowPassword).toHaveBeenCalledWith(true);
  });
});
