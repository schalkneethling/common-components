import { AlertBoxBanner } from "./alertbox-banner.js";
import { validateBanner } from "./validator/schema.js";

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

  #loadConfig() {
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
      throw new Error("Error parsing config", { cause: error });
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

        if (this.isConnected && !this.#containsBannerIdInStorage(bannerId)) {
          const alertboxBanner = new AlertBoxBanner().getBanner(banner);
          this.append(alertboxBanner);
        }
      } catch (error) {
        if (error.cause && error.cause.name === "ZodError") {
          // eslint-disable-next-line no-console
          console.error(error.message, error.cause.issues);
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
    this.#loadConfig();
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.addEventListener("click", this.#handleClick);
  }

  #handleClick(event) {
    const target = event.target;
    const dismissButton = target.closest(".alertbox-banner-dismiss");

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
    }
  }
}

customElements.define("alertbox-manager", AlertBoxManager);
