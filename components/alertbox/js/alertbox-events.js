// @ts-check
const emitBannerActionEvent = (banner, actionType) => {
  const event = new CustomEvent("alertbox-event", {
    detail: {
      bannerConfig: banner,
      bannerId: banner.id,
      eventType: "actioned",
      timestamp: new Date().toISOString(),
      actionType,
    },
  });

  document.dispatchEvent(event);
};

const emitBannerDismissedEvent = (banner) => {
  const event = new CustomEvent("alertbox-event", {
    detail: {
      bannerConfig: banner,
      bannerId: banner.id,
      dismissType: banner.dismissType || "page",
      eventType: "dismissed",
      timestamp: new Date().toISOString(),
    },
  });

  document.dispatchEvent(event);
};

const emitBannerErrorEvent = (error, banner) => {
  let detail = {
    timestamp: new Date().toISOString(),
    error,
  };

  if (banner) {
    detail.bannerConfig = banner;
    detail.bannerId = banner.id;
  }

  const event = new CustomEvent("alertbox-event", {
    detail,
  });

  document.dispatchEvent(event);
};

const emitBannerShownEvent = (banner) => {
  const event = new CustomEvent("alertbox-event", {
    detail: {
      bannerConfig: banner,
      bannerId: banner.id,
      eventType: "shown",
      timestamp: new Date().toISOString(),
    },
  });

  document.dispatchEvent(event);
};

export {
  emitBannerActionEvent,
  emitBannerDismissedEvent,
  emitBannerErrorEvent,
  emitBannerShownEvent,
};
