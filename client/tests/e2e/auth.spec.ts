import { test, expect } from "@playwright/test";

test.describe("Auth forms", () => {
  test("login shows required errors on empty submit", async ({ page }) => {
    await page.goto("/auth");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Email is required.")).toBeVisible();
    await expect(page.getByText("Password is required.")).toBeVisible();
  });

  test("can switch to sign up and fill fields", async ({ page }) => {
    await page.goto("/auth");

    await page
      .getByRole("button", { name: "Don't have account Register" })
      .click();

    await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();

    await page.getByPlaceholder("Please write your name * ").fill("Alex");
    await page
      .getByPlaceholder("Please write your email * ")
      .fill("alex@example.com");
    await page
      .getByPlaceholder("Please write your password * ")
      .fill("Space123");

    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("password show/hide toggles input type", async ({ page }) => {
    await page.goto("/auth");

    const passwordInput = page.getByPlaceholder(
      "Please write your password * ",
    );
    await expect(passwordInput).toHaveAttribute("type", "password");

    await page.getByRole("button", { name: "Show" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await page.getByRole("button", { name: "Hide" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });
});
