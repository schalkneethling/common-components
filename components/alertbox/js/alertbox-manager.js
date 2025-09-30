import { AlertBoxBanner } from "./alertbox-banner.js";
import { validateBanner } from "./validator/schema.js";
import {
  emitBannerActionEvent,
  emitBannerDismissedEvent,
  emitBannerErrorEvent,
  emitBannerShownEvent,
} from "./alertbox-events.js";
import {
  ALERTBOX_BANNER_DISMISS,
  ALERTBOX_BANNER_ACTION_BUTTON,
} from "./alertbox-constants.js";

export class AlertBoxManager extends HTMLElement {
  #banners = new Map();
  #configId;
  #storageKey = "alertbox-banners";

  constructor() {
    super();

    this.#configId = this.getAttribute("config");
  }

  #hasBanner(bannerId) {
    return this.#banners.has(bannerId);
  }

  #render() {
    if (!this.#configId) {
      return;
    }

    const config = document.getElementById(this.#configId);
    if (!config) {
      return;
    }

    try {
      const configArray = JSON.parse(config.textContent);
      this.addBanners(configArray);
    } catch (error) {
      emitBannerErrorEvent(error);
    }
  }

  #containsBannerIdInStorage(bannerId) {
    return (
      this.#containsBannerIdForStorageType(bannerId, "session") ||
      this.#containsBannerIdForStorageType(bannerId, "local")
    );
  }

  #containsBannerIdForStorageType(bannerId, storageType) {
    const storage = storageType === "session" ? sessionStorage : localStorage;

    try {
      const storedBannerIds = storage.getItem(this.#storageKey);
      const storedBannerIdsArray = storedBannerIds
        ? JSON.parse(storedBannerIds)
        : [];
      return storedBannerIdsArray.some(
        (storedBannerId) => storedBannerId === bannerId,
      );
    } catch (error) {
      throw new Error("Error reading stored banners", { cause: error });
    }
  }

  #storeBannerId(bannerId, storageType) {
    const storage = storageType === "session" ? sessionStorage : localStorage;

    try {
      const storedBanners = storage.getItem(this.#storageKey);
      const storedBannersArray = storedBanners ? JSON.parse(storedBanners) : [];
      storedBannersArray.push(bannerId);
      storage.setItem(this.#storageKey, JSON.stringify(storedBannersArray));
    } catch (error) {
      throw new Error("Error storing banner", { cause: error });
    }
  }

  #isWithinDateRange(banner) {
    if (!banner.dateRange) {
      return true;
    }

    const today = new Date().toLocaleDateString();
    const startDate = new Date(banner.dateRange.start).toLocaleDateString();
    const endDate = new Date(banner.dateRange.end).toLocaleDateString();

    return today >= startDate && today <= endDate;
  }

  addBanners(banners) {
    if (!Array.isArray(banners)) {
      throw new Error("Banners must be an array");
    }

    banners.forEach((banner, index) => {
      const bannerId = banner.id;

      if (this.#hasBanner(bannerId)) {
        console.info(`Banner with id ${banner.id} already exists`);
        return;
      }

      try {
        validateBanner(banner, index);

        this.#banners.set(bannerId, banner);

        if (
          this.isConnected &&
          !this.#containsBannerIdInStorage(bannerId) &&
          this.#isWithinDateRange(banner)
        ) {
          const alertboxBanner = new AlertBoxBanner().getBanner(banner);
          this.append(alertboxBanner);
          emitBannerShownEvent(banner);
        }
      } catch (error) {
        if (error.cause && error.cause.name === "ZodError") {
          emitBannerErrorEvent(error.cause.issues, banner);
          return;
        }

        throw error;
      }
    });
  }

  addBanner(banner) {
    this.addBanners([banner]);
  }

  getBanners() {
    return Array.from(this.#banners.values());
  }

  connectedCallback() {
    this.#render();
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.addEventListener("click", this.#handleClick);
  }

  #handleClick(event) {
    const target = event.target;
    const dismissButton = target.closest(ALERTBOX_BANNER_DISMISS);
    const actionButton = target.classList.contains(
      ALERTBOX_BANNER_ACTION_BUTTON,
    )
      ? target
      : target.closest(ALERTBOX_BANNER_ACTION_BUTTON);

    if (actionButton) {
      emitBannerActionEvent(
        this.#banners.get(actionButton.dataset.bannerId),
        "button",
      );
      return;
    }

    if (!dismissButton) {
      return;
    }

    const banner = dismissButton.closest(".alertbox-banner");

    if (banner) {
      const { bannerId, dismissType } = banner.dataset;

      banner.remove();

      if (
        dismissType &&
        !this.#containsBannerIdForStorageType(bannerId, dismissType)
      ) {
        this.#storeBannerId(bannerId, dismissType);
      }

      emitBannerDismissedEvent(this.#banners.get(bannerId));
    }
  }
}

customElements.define("alertbox-manager", AlertBoxManager);
