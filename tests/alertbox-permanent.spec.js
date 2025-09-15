// @ts-check
import { test, expect } from "@playwright/test";

test("has manager and five banners", async ({ page }) => {
  await page.goto("/components/alertbox/permanent.html");

  const manager = page.getByRole("group", { name: "Site notifications" });
  await expect(manager).toBeVisible();

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(5);
});

test("permanent success banner has dismissible close button", async ({
  page,
}) => {
  await page.goto("/components/alertbox/permanent.html");

  const successBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" });
  const successBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" })
    .getByRole("button");

  await expect(successBanner).toBeAttached();
  await expect(successBannerCloseButton).toBeAttached();
});

test("dismissed permanent success banner is not shown again after reload", async ({
  page,
}) => {
  await page.goto("/components/alertbox/permanent.html");

  const successBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" });
  const successBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" })
    .getByRole("button");

  await expect(successBanner).toBeAttached();
  await expect(successBannerCloseButton).toBeAttached();

  await successBannerCloseButton.click();
  await expect(successBanner).not.toBeAttached();

  await page.reload();

  await expect(successBanner).not.toBeAttached();
});

test("dismissed permanent success banner is not shown in new page", async ({
  browser,
  page,
}) => {
  await page.goto("/components/alertbox/permanent.html");

  const successBanner = page
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" });
  const successBannerCloseButton = page
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" })
    .getByRole("button");

  await expect(successBanner).toBeAttached();
  await expect(successBannerCloseButton).toBeAttached();

  await successBannerCloseButton.click();
  await expect(successBanner).not.toBeAttached();

  page.close();

  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto("/components/alertbox/permanent.html");

  const newSuccessBanner = newPage
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" });
  const newSuccessBannerCloseButton = newPage
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" })
    .getByRole("button");

  await expect(newSuccessBanner).toBeAttached();

  await newSuccessBannerCloseButton.click();
  await expect(newSuccessBanner).not.toBeAttached();

  await newPage.close();

  const finalPage = await context.newPage();
  await finalPage.goto("/components/alertbox/permanent.html");

  const finalSuccessBanner = finalPage
    .getByRole("status")
    .filter({ hasText: "This is a permanent success alertbox" });

  await expect(finalSuccessBanner).not.toBeAttached();

  await finalPage.close();
  await context.close();
});
