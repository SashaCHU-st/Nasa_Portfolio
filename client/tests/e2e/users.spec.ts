import { test, expect } from "@playwright/test";

const mockUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    image: "",
  },
  {
    id: 2,
    name: "Bob Space",
    email: "bob@example.com",
    image: "",
  },
  {
    id: 3,
    name: "Carol Orbit",
    email: "carol@example.com",
    image: "",
  },
];

test.describe("Users page", () => {
  test("renders users and filters by search", async ({ page }) => {
    await page.route("**/users", async (route, request) => {
      if (request.resourceType() === "document") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ allUsers: mockUsers }),
      });
    });

    await page.goto("/users");

    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
    await expect(page.getByText("Alice Johnson")).toBeVisible();
    await expect(page.getByText("Bob Space")).toBeVisible();
    await expect(page.getByText("Carol Orbit")).toBeVisible();

    const searchInput = page.getByPlaceholder("...Search users");
    await searchInput.fill("bob");

    await expect(page.getByText("Bob Space")).toBeVisible();
    await expect(page.getByText("Alice Johnson")).toBeHidden();
    await expect(page.getByText("Carol Orbit")).toBeHidden();

    await searchInput.fill("");
    await expect(page.getByText("Alice Johnson")).toBeVisible();
    await expect(page.getByText("Bob Space")).toBeVisible();
    await expect(page.getByText("Carol Orbit")).toBeVisible();
  });

  test("navigates to profile on card click", async ({ page }) => {
    await page.route("**/users", async (route, request) => {
      if (request.resourceType() === "document") {
        await route.continue();
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ allUsers: mockUsers }),
      });
    });

    await page.goto("/users");

    await page.getByText("Alice Johnson").click();
    await expect(page).toHaveURL(/\/profile\/1$/);
  });
});
