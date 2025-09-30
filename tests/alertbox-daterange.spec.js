// @ts-check
import { test, expect } from "@playwright/test";

/**
 * The page used contain the following three banners:
 * 0 - "dateRange": { "start": "2025-09-18","end": "2025-09-19"}
 * 1 - "dateRange": { "start": "2025-09-10", "end": "2025-09-17"}
 * 2 - "dateRange": { "start": "2025-09-15", "end": "2025-09-19"}
 */
test("has manager and two banners", async ({ page }) => {
  await page.clock.setFixedTime("2025-09-19");
  await page.goto("/components/alertbox/date-range.html");

  const manager = page.getByRole("group", { name: "Site notifications" });
  await expect(manager).toBeVisible();

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(2);
});

test("loading page with a date set after September 19 2025 has no banners", async ({
  page,
}) => {
  await page.clock.setFixedTime("2025-09-20");
  await page.goto("/components/alertbox/date-range.html");

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(0);
});

test("loading page with a date set to September 9 2025 has no banners", async ({
  page,
}) => {
  await page.clock.setFixedTime("2025-09-09");
  await page.goto("/components/alertbox/date-range.html");

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(0);
});

test("loading page with a date set to September 10 2025 shows one banner", async ({
  page,
}) => {
  await page.clock.setFixedTime("2025-09-10");
  await page.goto("/components/alertbox/date-range.html");

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(1);
});

test("passing a date in an invalid format does not cause valid banners to be hidden", async ({
  page,
}) => {
  await page.clock.setFixedTime("2025-09-10");
  await page.goto("/components/alertbox/date-range-invalid.html");

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(1);
});

test("page dismissable banner can be dismissed, but is shown again after reload", async ({
  page,
}) => {
  await page.clock.setFixedTime("2025-09-19");
  await page.goto("/components/alertbox/date-range.html");

  const manager = page.getByRole("group", { name: "Site notifications" });
  await expect(manager).toBeVisible();

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(2);

  const pageDismissableBanner = banners.filter({
    hasText: "is page dismissable",
  });
  const pageDismissableBannerCloseButton =
    pageDismissableBanner.getByRole("button");

  await pageDismissableBannerCloseButton.click();
  await expect(pageDismissableBanner).not.toBeVisible();

  await page.reload();

  await expect(pageDismissableBanner).toBeVisible();
  await expect(pageDismissableBannerCloseButton).toBeVisible();
});

test("session dismissable banner can be dismissed, but is shown again in new context", async ({
  browser,
  page,
}) => {
  await page.clock.setFixedTime("2025-09-19");
  await page.goto("/components/alertbox/date-range.html");

  const manager = page.getByRole("group", { name: "Site notifications" });
  await expect(manager).toBeVisible();

  const banners = page.getByRole("status");
  await expect(banners).toHaveCount(2);

  const sessionDismissableBanner = banners.filter({
    hasText: "for the current session",
  });
  const sessionDismissableBannerCloseButton =
    sessionDismissableBanner.getByRole("button", { name: "Close" });

  await sessionDismissableBannerCloseButton.click();
  await expect(sessionDismissableBanner).not.toBeVisible();

  await page.reload();

  await expect(sessionDismissableBanner).not.toBeVisible();

  page.close();

  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto("/components/alertbox/date-range.html");

  const newBanners = newPage.getByRole("status");
  await expect(newBanners).toHaveCount(2);
});
