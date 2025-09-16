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

  #getActionElement(action) {
    const { type, label, target, url } = action;

    if (type === "button") {
      const button = document.createElement("button");
      button.setAttribute("class", "alertbox-banner-action-button");
      button.textContent = label;
      return button;
    }

    if (type === "link") {
      const link = document.createElement("a");
      link.setAttribute("class", "alertbox-banner-action");
      link.textContent = label;
      link.setAttribute("href", url);

      if (target) {
        link.setAttribute("target", target);
      }

      if (target === "_blank") {
        link.setAttribute("rel", "external noopener noreferrer");
      }

      return link;
    }
  }

  getBanner(banner) {
    const { action, dismissable, dismissType, id, message, role, theme } =
      banner;
    const bannerContent = document.createElement("div");
    const bannerActions = document.createElement("div");
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

    this.append(bannerContent, bannerActions);

    if (dismissType) {
      this.setAttribute("data-dismiss-type", dismissType);
    }

    bannerActions.setAttribute("class", "alertbox-banner-actions");
    if (action) {
      const actionElement = this.#getActionElement(action);
      bannerActions.append(actionElement);
    }

    if (dismissable) {
      const dismissButton = this.#getDismissButton();
      this.setAttribute("data-banner-id", id);
      bannerActions.append(dismissButton);
    }

    return this;
  }
}

customElements.define("alertbox-banner", AlertBoxBanner);
