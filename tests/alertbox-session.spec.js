// @ts-check
import { chromium, test, expect } from "@playwright/test";

test("has manager and five banners", async ({ page }) => {
  await page.goto("/components/alertbox/session.html");

  const manager = page.getByRole("group", { name: "Site notifications" });
  await expect(manager).toBeVisible();

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(5);
});

test("session success banner has dismissible close button", async ({
  page,
}) => {
  await page.goto("/components/alertbox/session.html");

  const successBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a session success alertbox" });
  const successBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a session success alertbox" })
    .getByRole("button");

  await expect(successBanner).toBeAttached();
  await expect(successBannerCloseButton).toBeAttached();
});

test("dismissed session success banner is not shown again after reload", async ({
  page,
}) => {
  await page.goto("/components/alertbox/session.html");

  const successBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a session success alertbox" });
  const successBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a session success alertbox" })
    .getByRole("button");

  await expect(successBanner).toBeAttached();
  await expect(successBannerCloseButton).toBeAttached();

  await successBannerCloseButton.click();
  await expect(successBanner).not.toBeAttached();

  await page.reload();

  await expect(successBanner).not.toBeAttached();
});

test("dismissed session success banner is shown in new context", async ({
  page,
}) => {
  await page.goto("/components/alertbox/session.html");

  const successBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a session success alertbox" });
  const successBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a session success alertbox" })
    .getByRole("button");

  await expect(successBanner).toBeAttached();
  await expect(successBannerCloseButton).toBeAttached();

  await successBannerCloseButton.click();
  await expect(successBanner).not.toBeAttached();

  page.close();

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto("/components/alertbox/session.html");

  const newSuccessBanner = newPage
    .getByRole("status")
    .filter({ hasText: "This is a session success alertbox" });

  await expect(newSuccessBanner).toBeAttached();

  await page.close();
  await context.close();
});
