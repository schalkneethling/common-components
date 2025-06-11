class SkeletonLoader extends HTMLElement {
  static observedOttributes = ["skeleton-count"];

  #skeletonCount = 10;

  constructor() {
    super();

    this.#skeletonCount = this.getAttribute("skeleton-count") || 10;
  }

  #getPlaceholderItem() {
    return `
    <div class="container">
        <div class="box-default shimmer-loading-placeholder"></div>
        <div class="box-thin shimmer-loading-placeholder"></div>
    </div>
  `;
  }

  #getPlaceholderItems() {
    return Array.from({ length: this.#skeletonCount }, () =>
      this.#getPlaceholderItem(),
    );
  }

  #render() {
    this.innerHTML = this.#getPlaceholderItems().join("");
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "skeleton-count") {
      this.#skeletonCount = newValue;
      this.#render();
    }
  }

  connectedCallback() {
    this.#render();
  }
}

customElements.define("skeleton-loader", SkeletonLoader);
