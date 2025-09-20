import { afterEach, beforeEach, describe, expect, test } from "vitest";
import {
  emitBannerActionEvent,
  emitBannerDismissedEvent,
  emitBannerErrorEvent,
  emitBannerShownEvent,
} from "./alertbox-events";

describe("alertbox-events", () => {
  let capturedEvent;

  beforeEach(() => {
    capturedEvent = null;
    document.addEventListener("alertbox-event", (event) => {
      capturedEvent = event;
    });
  });

  test("emitBannerActionEvent", () => {
    const banner = { id: "test", message: "Test banner" };
    emitBannerActionEvent(banner, "button");

    const { bannerConfig, bannerId, eventType, timestamp, actionType } =
      capturedEvent.detail;

    expect(bannerConfig).toEqual(banner);
    expect(bannerId).toEqual(banner.id);
    expect(eventType).toEqual("actioned");
    expect(actionType).toEqual("button");
    expect(timestamp).toBeDefined();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test("emitBannerDismissedEvent with default dismissType", () => {
    const banner = { id: "test", message: "Test banner" };
    emitBannerDismissedEvent(banner);

    const { bannerConfig, bannerId, eventType, timestamp, dismissType } =
      capturedEvent.detail;

    expect(bannerConfig).toEqual(banner);
    expect(bannerId).toEqual(banner.id);
    expect(eventType).toEqual("dismissed");
    expect(dismissType).toEqual("page");
    expect(timestamp).toBeDefined();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test("emitBannerErrorEvent", () => {
    const testError = new Error("Test error");
    const banner = { id: "test", message: "Test banner" };
    emitBannerErrorEvent(testError, banner);

    const { bannerConfig, bannerId, timestamp, error } = capturedEvent.detail;

    expect(bannerConfig).toEqual(banner);
    expect(bannerId).toEqual(banner.id);
    expect(error).toEqual(testError);
    expect(timestamp).toBeDefined();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test("emitBannerErrorEvent without banner", () => {
    const testError = new Error("Test error");
    emitBannerErrorEvent(testError);

    const { bannerConfig, bannerId, timestamp, error } = capturedEvent.detail;

    expect(bannerConfig).toBeUndefined();
    expect(bannerId).toBeUndefined();
    expect(error).toEqual(testError);
    expect(timestamp).toBeDefined();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test("emitBannerDismissedEvent with custom dismissType", () => {
    const banner = {
      id: "test",
      message: "Test banner",
      dismissType: "session",
    };
    emitBannerDismissedEvent(banner);

    const { bannerConfig, bannerId, eventType, timestamp, dismissType } =
      capturedEvent.detail;

    expect(bannerConfig).toEqual(banner);
    expect(bannerId).toEqual(banner.id);
    expect(eventType).toEqual("dismissed");
    expect(dismissType).toEqual("session");
    expect(timestamp).toBeDefined();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test("emitBannerShownEvent", () => {
    const banner = { id: "test", message: "Test banner" };
    emitBannerShownEvent(banner);

    const { bannerConfig, bannerId, eventType, timestamp } =
      capturedEvent.detail;

    expect(bannerConfig).toEqual(banner);
    expect(bannerId).toEqual(banner.id);
    expect(eventType).toEqual("shown");
    expect(timestamp).toBeDefined();
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  afterEach(() => {
    document.removeEventListener("alertbox-event", (event) => {
      capturedEvent = event;
    });
  });
});
