import { getIcon } from "./svg-icon-util.js";

export class SVGIcon extends HTMLElement {
  static observedAttributes = ["height", "name", "sprite-src", "width"];

  #accessibleName = null;
  #spriteSrc = null;

  #svgAttrs = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    viewBox: "0 0 16 16",
  };

  constructor() {
    super();

    this.#accessibleName = this.getAttribute("accessible-name");
    this.#spriteSrc = this.getAttribute("sprite-src");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name" && oldValue !== newValue) {
      this.#renderIcon(newValue);
    }

    if (name === "height" && oldValue !== newValue) {
      this.#svgAttrs.height = newValue;
    }

    if (name === "width" && oldValue !== newValue) {
      this.#svgAttrs.width = newValue;
    }
  }

  #renderIcon = async (iconName) => {
    const icon = await getIcon(iconName, this.#spriteSrc);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    if (this.#accessibleName) {
      const title = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "title",
      );
      title.textContent = this.#accessibleName;
      svg.append(title);
    } else {
      svg.setAttribute("aria-hidden", "true");
    }

    svg.append(...icon.childNodes);

    Object.keys(this.#svgAttrs).forEach((attr) => {
      svg.setAttribute(attr, this.#svgAttrs[attr]);
    });

    svg.classList.add("icon", `icon-${iconName}`);

    this.append(svg);
  };
}

customElements.define("svg-icon", SVGIcon);
