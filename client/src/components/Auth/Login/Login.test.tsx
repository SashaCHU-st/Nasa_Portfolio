import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from "./Login";
import { AuthContext } from "../../../context/AuthContext";

const { navigateMock, loginRequestMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  loginRequestMock: vi.fn(),
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
  loginRequest: loginRequestMock,
}));

describe("Login", () => {
  const renderLogin = () =>
    render(
      <AuthContext.Provider
        value={{
          isAuthorized: false,
          loading: false,
          login: loginUserMock,
          logout: logoutMock,
        }}
      >
        <Login />
      </AuthContext.Provider>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits valid credentials, logs in user and navigates to home", async () => {
    loginRequestMock.mockResolvedValue({
      ok: true,
      data: { message: "Logged in" },
    });

    renderLogin();
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/please write your email/i),
      "alex@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(/please write your password/i),
      "Space123",
    );
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(loginRequestMock).toHaveBeenCalledWith({
      email: "alex@example.com",
      password: "Space123",
    });

    await waitFor(() => {
      expect(loginUserMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/home");
    });
  });

  it("shows backend error and does not navigate when login fails", async () => {
    loginRequestMock.mockResolvedValue({
      ok: false,
      data: { message: "Invalid credentials" },
    });

    renderLogin();
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/please write your email/i),
      "alex@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(/please write your password/i),
      "WrongPass1",
    );
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    expect(loginUserMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("shows validation errors and does not call API on empty submit", async () => {
    renderLogin();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
    expect(loginRequestMock).not.toHaveBeenCalled();
  });
});
