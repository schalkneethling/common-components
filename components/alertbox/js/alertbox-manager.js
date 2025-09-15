import { AlertBoxBanner } from "./alertbox-banner.js";
import { validateBanner } from "./validator/schema.js";

export class AlertBoxManager extends HTMLElement {
  #banners = new Map();
  #configId;

  constructor() {
    super();

    this.#configId = this.getAttribute("config");
  }

  #hasBanner(bannerId) {
    return this.#banners.has(bannerId);
  }

  addBanners(banners) {
    if (!Array.isArray(banners)) {
      throw new Error("Banners must be an array");
    }

    banners.forEach((banner, index) => {
      if (this.#hasBanner(banner.id)) {
        console.info(`Banner with id ${banner.id} already exists`);
        return;
      }

      try {
        validateBanner(banner, index);

        this.#banners.set(banner.id, banner);

        if (this.isConnected) {
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

    const bannerId = dismissButton.dataset.bannerId;
    const banner = document.getElementById(bannerId);

    if (banner) {
      banner.remove();
    }
  }
}

customElements.define("alertbox-manager", AlertBoxManager);
