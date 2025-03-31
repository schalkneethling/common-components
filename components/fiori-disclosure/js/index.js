class FioriDisclosure extends HTMLElement {
  static #selectors = {
    disclosureToggle: ".disclosure-toggle",
    disclosureItemsContainer: ".disclosure-items-container",
  };

  #elements;

  #getElements() {
    return {
      disclosureToggle: this.querySelector(
        FioriDisclosure.#selectors.disclosureToggle,
      ),
      disclosureItemsContainer: this.querySelector(
        FioriDisclosure.#selectors.disclosureItemsContainer,
      ),
    };
  }

  constructor() {
    super();

    this.#elements = this.#getElements();
    this.#addEventListeners();
  }

  #getIsExpanded() {
    const { disclosureToggle } = this.#elements;
    return disclosureToggle.getAttribute("aria-expanded") === "true";
  }

  #toggleDrawer(isExpanded) {
    const { disclosureToggle } = this.#elements;
    disclosureToggle.setAttribute("aria-expanded", !isExpanded);
  }

  #handleKeyboardEvents(event) {
    const { disclosureToggle } = this.#elements;
    const isExpanded = this.#getIsExpanded();

    if (event.key === "Escape" && isExpanded) {
      this.#toggleDrawer(isExpanded);
      disclosureToggle.focus();
    }
  }

  #clickOutside(event) {
    const isExpanded = this.#getIsExpanded();
    if (!this.contains(event.target) && isExpanded) {
      this.#toggleDrawer(isExpanded);
    }
  }

  #collapseGroup(groupName) {
    const group = Array.from(
      document.querySelectorAll(`fiori-disclosure[name="${groupName}"]`),
    ).filter((disclosure) => disclosure !== this);

    group.forEach((disclosure) => {
      disclosure
        .querySelector(FioriDisclosure.#selectors.disclosureToggle)
        .setAttribute("aria-expanded", false);
    });
  }

  #addEventListeners() {
    const { disclosureToggle } = this.#elements;
    const hasGroupName = this.hasAttribute("name");

    disclosureToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      if (hasGroupName) {
        const groupName = this.getAttribute("name");
        this.#collapseGroup(groupName);
      }

      this.#toggleDrawer(this.#getIsExpanded());
    });

    document.addEventListener("click", this.#clickOutside.bind(this));
    document.addEventListener("keyup", this.#handleKeyboardEvents.bind(this));
  }
}

customElements.define("fiori-disclosure", FioriDisclosure);
