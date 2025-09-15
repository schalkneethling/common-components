// @ts-check
import { test, expect } from "@playwright/test";

test("has manager and four banners", async ({ page }) => {
  await page.goto("/components/alertbox/index.html");

  const manager = page.getByRole("group", { name: "Site notifications" });
  await expect(manager).toBeVisible();

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(4);
});

test("default banner has dismissible close button", async ({ page }) => {
  await page.goto("/components/alertbox/index.html");

  const defaultBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a basic alertbox" });
  const defaultBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a basic alertbox" })
    .getByRole("button");

  await expect(defaultBanner).toBeAttached();
  await expect(defaultBannerCloseButton).toBeAttached();
});

test("success banner has no dismissible close button", async ({ page }) => {
  await page.goto("/components/alertbox/index.html");

  const successBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a success alertbox" });
  const successBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a success alertbox" })
    .getByRole("button");

  await expect(successBanner).toBeAttached();
  await expect(successBannerCloseButton).not.toBeAttached();
});

test("clicking close button removes banner", async ({ page }) => {
  await page.goto("/components/alertbox/index.html");

  const defaultBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a basic alertbox" });
  const defaultBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a basic alertbox" })
    .getByRole("button");

  await expect(defaultBanner).toBeAttached();
  await expect(defaultBannerCloseButton).toBeAttached();

  await defaultBannerCloseButton.click();
  await expect(defaultBanner).not.toBeAttached();
});

test("banner is shown again after page reload", async ({ page }) => {
  await page.goto("/components/alertbox/index.html");

  const defaultBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a basic alertbox" });
  const defaultBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a basic alertbox" })
    .getByRole("button");

  await expect(defaultBanner).toBeAttached();
  await expect(defaultBannerCloseButton).toBeAttached();

  await defaultBannerCloseButton.click();
  await expect(defaultBanner).not.toBeAttached();

  await page.reload();

  await expect(defaultBanner).toBeAttached();
  await expect(defaultBannerCloseButton).toBeAttached();
});
