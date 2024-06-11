export default class SkipToNav extends HTMLElement {
  static get observedAttributes() {
    return ["content", "nav", "search"];
  }

  constructor() {
    super();
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
        background-color: var(--link-background-color, rgba(255, 255, 255, 0.9));
        color: var(--link-color, #212121);
        font-family: var(--typography-font-family, serif);
        font-weight: var(--typography-weight, bold);
        left: 0;
        padding: 1rem;
        position: absolute;
        right: 0;
        text-align: center;
    }

    .skip-to-nav a:hover,
    .skip-to-nav a:focus {
        box-shadow: var(--skip-to-nav-box-shadow, 3px 3px 5px #eee);
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

    const ul = document.createElement("ul");
    ul.setAttribute("id", "nav-access");
    ul.setAttribute("class", "skip-to-nav");

    if (this.content) {
      ul.appendChild(
        this._getListItem({
          linkTarget: this.content,
          linkText: "main content",
        })
      );
    }

    if (this.nav) {
      ul.appendChild(
        this._getListItem({
          linkTarget: this.nav,
          linkText: "main navigation",
        })
      );
    }

    if (this.search) {
      ul.appendChild(
        this._getListItem({
          linkTarget: this.search,
          linkText: "search",
        })
      );
    }

    shadow.appendChild(this._getCSS());
    shadow.appendChild(ul);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "content":
        this.content = newValue;
        break;
      case "nav":
        this.nav = newValue;
        break;
      case "search":
        this.search = newValue;
        break;
    }
  }
}

customElements.define("skip-to-nav", SkipToNav);
