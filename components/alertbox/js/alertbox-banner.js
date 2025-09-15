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

  #getDismissButton() {
    const button = document.createElement("button");
    button.setAttribute("class", "alertbox-banner-dismiss");

    const icon = this.#getIcon("close");
    button.append(icon);

    const accText = document.createElement("span");
    accText.setAttribute("class", "visually-hidden");
    accText.textContent = "Close";
    button.append(accText);

    return button;
  }

  getBanner(banner) {
    const { dismissable, dismissType, id, message, role, theme } = banner;
    const bannerContent = document.createElement("div");
    const bannerIcon = this.#getIcon(theme || "default");
    const bannerMessage = document.createElement("p");
    const bannerTheme = theme || "default";

    this.setAttribute("id", id);
    this.setAttribute("role", role || "status");
    this.setAttribute(
      "class",
      `alertbox-banner alertbox-banner-${bannerTheme}`,
    );

    bannerMessage.textContent = message;

    bannerContent.append(bannerIcon, bannerMessage);
    bannerContent.setAttribute("class", "alertbox-banner-content");

    this.append(bannerContent);

    if (dismissType) {
      this.setAttribute("data-dismiss-type", dismissType);
    }

    if (dismissable) {
      const dismissButton = this.#getDismissButton();
      this.setAttribute("data-banner-id", id);
      this.append(dismissButton);
    }

    return this;
  }
}

customElements.define("alertbox-banner", AlertBoxBanner);
