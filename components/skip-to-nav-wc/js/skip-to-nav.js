export default class SkipToNav extends HTMLElement {
  static get observedAttributes() {
    return ["content", "nav", "search"];
  }

  constructor() {
    super();
    this.skipToLinks = [];
  }

  _getCSS() {
    const style = document.createElement("style");
    style.textContent = `        
    .skip-to-nav {
        box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: -20rem;
        width: 100%;
        z-index: var(--skip-to-nav-z-index, 300);
    }

    .skip-to-nav a {
        background-color: var(--skip-to-nav-link-background-color, rgba(255, 255, 255, 0.9));
        color: var(--skip-to-nav-link-color, #212121);
        font-family: var(--skip-to-nav-typography-font-family, serif);
        font-weight: var(--skip-to-nav-typography-weight, bold);
        left: 0;
        padding: 1rem;
        position: absolute;
        right: 0;
        text-align: center;
    }

    .skip-to-nav a:hover,
    .skip-to-nav a:focus {
        box-shadow: var(--skip-to-nav-box-shadow, 0.2rem 0.2rem 5px #eee);
        outline: var(--skip-to-nav-focus-outline, 1px solid #212121);
        text-decoration: none;
        top: 20rem;
    }`;

    return style;
  }

  _getListItem(item) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", `#${item.linkTarget}`);
    a.textContent = `Skip to ${item.linkText}`;
    li.appendChild(a);
    return li;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.setAttribute("id", "nav-access");
    ul.setAttribute("class", "skip-to-nav");

    if (this.skipToLinks) {
      this.skipToLinks.forEach((item) => {
        ul.appendChild(this._getListItem(item));
      });
    }

    shadow.appendChild(this._getCSS());
    shadow.appendChild(nav).appendChild(ul);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "content":
        this.skipToLinks.push({
          linkTarget: newValue,
          linkText: "main content",
        });
        break;
      case "nav":
        this.skipToLinks.push({
          linkTarget: newValue,
          linkText: "main navigation",
        });
        break;
      case "search":
        this.skipToLinks.push({
          linkTarget: newValue,
          linkText: "search",
        });
        break;
    }
  }
}

customElements.define("skip-to-nav", SkipToNav);
