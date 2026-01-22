import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Switcher from "./Switcher";

vi.mock("./Login/Login", () => ({
  default: () => <div>LoginView</div>,
}));

vi.mock("./SignUp/SignUp", () => ({
  default: () => <div>SignUpView</div>,
}));

describe("Switcher", () => {
  it("renders SignUp when switcher is true and switches to login on click", async () => {
    const setSwitcher = vi.fn();
    render(<Switcher switcher={true} setSwitcher={setSwitcher} />);

    expect(screen.getByText("SignUpView")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /have an account\? login/i });
    await userEvent.click(button);

    expect(setSwitcher).toHaveBeenCalledWith(false);
  });

  it("renders Login when switcher is false and switches to register on click", async () => {
    const setSwitcher = vi.fn();
    render(<Switcher switcher={false} setSwitcher={setSwitcher} />);

    expect(screen.getByText("LoginView")).toBeInTheDocument();
    const button = screen.getByRole("button", {
      name: /don't have account register/i,
    });
    await userEvent.click(button);

    expect(setSwitcher).toHaveBeenCalledWith(true);
  });
});
