class ImageGrid extends HTMLElement {
  #currentTarget;

  constructor() {
    super();
  }

  #showNext(currentTarget) {
    let nextElement = currentTarget.nextElementSibling;

    if (!nextElement) {
      nextElement = currentTarget.closest("ul").firstElementChild;
    }

    this.#currentTarget = nextElement;

    const image = this.#currentTarget.querySelector("img");
    const clonedImage = image.cloneNode(true);

    clonedImage.src = image.currentSrc;

    const lightbox = this.querySelector("#lightbox");

    lightbox
      .querySelector(".lightbox-media-container")
      .replaceChildren(clonedImage);
  }

  #showPrevious(currentTarget) {
    let previousElement = currentTarget.previousElementSibling;

    if (!previousElement) {
      previousElement = currentTarget.closest("ul").lastElementChild;
    }

    this.#currentTarget = previousElement;

    const image = this.#currentTarget.querySelector("img");
    const clonedImage = image.cloneNode(true);

    clonedImage.src = image.currentSrc;

    const lightbox = this.querySelector("#lightbox");

    lightbox
      .querySelector(".lightbox-media-container")
      .replaceChildren(clonedImage);
  }

  connectedCallback() {
    const imageGrid = this.querySelector(".image-grid-list");

    imageGrid.addEventListener("click", (event) => {
      this.#currentTarget = event.target.closest(".image-grid-list-item");

      if (!this.#currentTarget) {
        return;
      }

      event.preventDefault();

      const image = this.#currentTarget.querySelector("img");
      const clonedImage = image.cloneNode(true);

      clonedImage.src = image.currentSrc;

      const lightbox = this.querySelector("#lightbox");

      lightbox
        .querySelector(".lightbox-media-container")
        .replaceChildren(clonedImage);
      lightbox.showModal();

      document.body.classList.toggle("inert");

      lightbox.addEventListener("close", () => {
        document.body.classList.toggle("inert");
      });
    });

    const previousButton = this.querySelector(".lightbox-slide-prev");
    const nextButton = this.querySelector(".lightbox-slide-next");

    previousButton.addEventListener("click", () => {
      this.#showPrevious(this.#currentTarget);
    });

    nextButton.addEventListener("click", () => {
      this.#showNext(this.#currentTarget);
    });
  }
}

customElements.define("image-grid", ImageGrid);
