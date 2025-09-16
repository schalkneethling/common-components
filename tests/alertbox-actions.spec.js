// @ts-check
import { test, expect } from "@playwright/test";

test("has manager and six banners", async ({ page }) => {
  await page.goto("/components/alertbox/button-link.html");

  const manager = page.getByRole("group", { name: "Site notifications" });
  await expect(manager).toBeVisible();

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(6);
});

test("banner with link action has link", async ({ page }) => {
  await page.goto("/components/alertbox/button-link.html");

  const banner = page
    .getByRole("status")
    .filter({ hasText: "No results for your search" });
  const link = banner.getByRole("link");

  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "https://www.duckduckgo.com");
});

test("banner with link action and target _blank has target and rel", async ({
  page,
}) => {
  await page.goto("/components/alertbox/button-link.html");

  const banner = page
    .getByRole("status")
    .filter({ hasText: "No results for your search" });
  const link = banner.getByRole("link");

  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "https://www.duckduckgo.com");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "external noopener noreferrer");
});

test("banner with link action and no target does not have target and rel", async ({
  page,
}) => {
  await page.goto("/components/alertbox/button-link.html");

  const banner = page
    .getByRole("status")
    .filter({ hasText: "Search using Google" });
  const link = banner.getByRole("link");

  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "https://www.google.com");
  await expect(link).not.toHaveAttribute("target");
  await expect(link).not.toHaveAttribute("rel");
});

test("banner with button action has button", async ({ page }) => {
  await page.goto("/components/alertbox/button-link.html");

  const banner = page
    .getByRole("status")
    .filter({ hasText: "This is a success alertbox" });
  const button = banner.getByRole("button");

  await expect(button).toBeVisible();
  await expect(button).toHaveText("Change preferences");
});

test("banner with button action and is dismissable have both actions buttons", async ({
  page,
}) => {
  await page.goto("/components/alertbox/button-link.html");

  const banner = page
    .getByRole("status")
    .filter({ hasText: "Theme changed successfully" });
  const changeThemeButton = banner.getByRole("button", {
    name: "Change theme",
  });

  const closeButton = banner.getByRole("button", { name: "Close" });

  await expect(changeThemeButton).toBeVisible();
  await expect(closeButton).toBeVisible();
});

test("action elements appear in correct tab order", async ({ page }) => {
  await page.goto("/components/alertbox/button-link.html");

  const banner = page
    .getByRole("status")
    .filter({ hasText: "Theme changed successfully" });

  const actionButton = banner.getByRole("button", { name: "Change theme" });
  const dismissButton = banner.getByRole("button", { name: "Close" });

  // Test that action button comes before dismiss button in tab order
  await actionButton.focus();
  await page.keyboard.press("Tab");
  await expect(dismissButton).toBeFocused();
});
