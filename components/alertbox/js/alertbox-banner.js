export class AlertBoxBanner extends HTMLElement {
  constructor() {
    super();
  }

  #getIcon(name) {
    const icon = document.createElement("svg-icon");
    icon.setAttribute("name", name);
    icon.setAttribute("sprite-src", "/components/svg-icon/sprite.svg");
    return icon;
  }

  #getDismissButton(bannerId) {
    const button = document.createElement("button");
    button.setAttribute("class", "alertbox-banner-dismiss");
    button.setAttribute("data-banner-id", bannerId);

    const icon = this.#getIcon("close");
    button.append(icon);

    const accText = document.createElement("span");
    accText.setAttribute("class", "visually-hidden");
    accText.textContent = "Close";
    button.append(accText);

    return button;
  }

  getBanner(banner) {
    const alertboxBanner = document.createElement("alertbox-banner");
    const bannerContent = document.createElement("div");
    const bannerIcon = this.#getIcon(banner.theme || "default");
    const bannerMessage = document.createElement("p");
    const bannerTheme = banner.theme || "default";

    alertboxBanner.setAttribute("id", banner.id);
    alertboxBanner.setAttribute("role", banner.role || "status");
    alertboxBanner.setAttribute(
      "class",
      `alertbox-banner alertbox-banner-${bannerTheme}`,
    );

    bannerMessage.textContent = banner.message;

    bannerContent.append(bannerIcon, bannerMessage);
    bannerContent.setAttribute("class", "alertbox-banner-content");

    alertboxBanner.append(bannerContent);

    if (banner.dismissable) {
      const dismissButton = this.#getDismissButton(banner.id);
      alertboxBanner.append(dismissButton);
    }

    return alertboxBanner;
  }
}

customElements.define("alertbox-banner", AlertBoxBanner);
