import { beforeEach, describe, expect, test } from "vitest";
import { AlertBoxManager } from "./alertbox-manager";

describe("AlertBoxManager", () => {
  let capturedEvent;

  beforeEach(() => {
    capturedEvent = null;
    document.addEventListener("alertbox-event", (event) => {
      capturedEvent = event;
    });
  });

  test("AlertBoxManager.addBanners adds four unique banners", () => {
    const alertboxManager = new AlertBoxManager();
    alertboxManager.addBanners([
      { id: "basic", message: "This is a basic alertbox" },
      {
        id: "success",
        message: "This is a success alertbox",
        theme: "success",
      },
      {
        id: "warning",
        message: "This is a warning alertbox",
        theme: "warning",
      },
      {
        id: "critical",
        message: "This is a critical alertbox",
        theme: "critical",
      },
    ]);

    expect(alertboxManager.getBanners()).toHaveLength(4);
    expect(alertboxManager.getBanners()[0].id).toBe("basic");
    expect(alertboxManager.getBanners()[1].id).toBe("success");
    expect(alertboxManager.getBanners()[2].id).toBe("warning");
    expect(alertboxManager.getBanners()[3].id).toBe("critical");
  });

  test("AlertBoxManager.addBanner adds a banner", () => {
    const alertboxManager = new AlertBoxManager();
    alertboxManager.addBanner({
      id: "basic",
      message: "This is a basic alertbox",
    });
    expect(alertboxManager.getBanners()).toHaveLength(1);
    expect(alertboxManager.getBanners()[0].id).toBe("basic");
  });

  test("AlertBoxManager.addBanners skips adding a banner that already exists", () => {
    const alertboxManager = new AlertBoxManager();
    alertboxManager.addBanners([
      { id: "basic", message: "This is a basic alertbox" },
      {
        id: "success",
        message: "This is a success alertbox",
        theme: "success",
      },
    ]);

    alertboxManager.addBanner({
      id: "basic",
      message: "This is a basic alertbox",
    });

    expect(alertboxManager.getBanners()).toHaveLength(2);
    expect(alertboxManager.getBanners()[0].id).toBe("basic");
    expect(alertboxManager.getBanners()[1].id).toBe("success");
  });

  test("AlertBoxManager.getBanners returns an array of banners", () => {
    const alertboxManager = new AlertBoxManager();
    alertboxManager.addBanners([
      { id: "basic", message: "This is a basic alertbox" },
    ]);
    expect(alertboxManager.getBanners()).toHaveLength(1);
    expect(alertboxManager.getBanners()[0].id).toBe("basic");
  });

  test("AlertBoxManager.addBanners adds a banner to the DOM if it is connected", () => {
    const alertboxManager = new AlertBoxManager();
    document.body.append(alertboxManager);
    alertboxManager.addBanners([
      { id: "basic", message: "This is a basic alertbox" },
    ]);
    expect(alertboxManager.getBanners()).toHaveLength(1);
    expect(alertboxManager.getBanners()[0].id).toBe("basic");

    expect(document.body.querySelector("alertbox-manager")).toBeDefined();
    expect(document.body.querySelectorAll("alertbox-banner")).toHaveLength(1);
    expect(document.body.querySelectorAll("alertbox-banner")[0].id).toBe(
      "basic",
    );
  });

  test("AlertBoxManager.addBanners throws an error if the banners are not an array", () => {
    const alertboxManager = new AlertBoxManager();
    expect(() => alertboxManager.addBanners("not an array")).toThrow();
  });

  test("AlertBoxManager.addBanners throws an error if the banners are not valid", () => {
    const invalidBanner = { message: "This is a basic alertbox" };
    const alertboxManager = new AlertBoxManager();
    alertboxManager.addBanners([invalidBanner]);

    expect(capturedEvent.detail.error).toBeDefined();
    expect(capturedEvent.detail.error[0].message).toEqual(
      "Banner ID is required",
    );
  });
});
