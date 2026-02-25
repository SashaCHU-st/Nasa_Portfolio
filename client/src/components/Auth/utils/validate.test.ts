import { describe, expect, it } from "vitest";
import { validateForm, validateFormLogin } from "./validate";

describe("Auth validate utils", () => {
  it("returns required errors for empty sign up form", () => {
    const result = validateForm({
      name: "",
      email: "",
      password: "",
    });

    expect(result).toEqual({
      nameError: "Name is required.",
      emailErr: "Email is required.",
      passwordErr: "Password is required.",
    });
  });

  it("returns null errors for valid sign up form", () => {
    const result = validateForm({
      name: "Alex",
      email: "alex@example.com",
      password: "Space123",
    });

    expect(result).toEqual({
      nameError: null,
      emailErr: null,
      passwordErr: null,
    });
  });

  it("returns field-specific errors for invalid login form", () => {
    const result = validateFormLogin({
      email: "alex @example.com",
      password: "12",
    });

    expect(result).toEqual({
      emailErr: "Email cannot contain spaces.",
      passwordErr: "Password must be at least 4 characters.",
    });
  });
});
