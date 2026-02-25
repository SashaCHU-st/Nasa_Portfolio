import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SignUp from "./SignUp";
import { AuthContext } from "../../../context/AuthContext";

const { navigateMock, signUpRequestMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  signUpRequestMock: vi.fn(),
}));

const loginUserMock = vi.fn();
const logoutMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../../../api/apiAuth", () => ({
  signUpRequest: signUpRequestMock,
}));

describe("SignUp", () => {
  const renderSignUp = () =>
    render(
      <AuthContext.Provider
        value={{
          isAuthorized: false,
          loading: false,
          login: loginUserMock,
          logout: logoutMock,
        }}
      >
        <SignUp />
      </AuthContext.Provider>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits valid form, logs in user and navigates to home", async () => {
    signUpRequestMock.mockResolvedValue({
      ok: true,
      data: { message: "User created" },
    });

    renderSignUp();
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/please write your name/i),
      "Alex",
    );
    await user.type(
      screen.getByPlaceholderText(/please write your email/i),
      "alex@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(/please write your password/i),
      "Space123",
    );
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(signUpRequestMock).toHaveBeenCalledWith({
      name: "Alex",
      email: "alex@example.com",
      password: "Space123",
    });

    await waitFor(() => {
      expect(loginUserMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/home");
    });
  });

  it("shows backend error and does not navigate when sign up fails", async () => {
    signUpRequestMock.mockResolvedValue({
      ok: false,
      data: { message: "Email already in use" },
    });

    renderSignUp();
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/please write your name/i),
      "Alex",
    );
    await user.type(
      screen.getByPlaceholderText(/please write your email/i),
      "alex@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(/please write your password/i),
      "Space123",
    );
    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByText("Email already in use")).toBeInTheDocument();
    expect(loginUserMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("shows validation errors and does not call API on empty submit", async () => {
    renderSignUp();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
    expect(signUpRequestMock).not.toHaveBeenCalled();
  });
});
