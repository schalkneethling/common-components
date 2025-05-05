class CardFlyout extends HTMLElement {
  static #selectors = {
    cardOptionsTrigger: ".card-options-trigger",
  };

  #elements;

  #getElements() {
    return {
      cardOptionsTrigger: this.querySelector(
        CardFlyout.#selectors.cardOptionsTrigger,
      ),
    };
  }

  constructor() {
    super();
    this.#elements = this.#getElements();
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.addEventListener("click", (event) => {
      const target = event.target;
      if (target.matches(".card-options-trigger")) {
        this.#toggleFlyout(target);
      }
    });

    document.addEventListener("click", this.#clickOutside.bind(this));
    document.addEventListener("keyup", this.#handleKeyboardEvents.bind(this));
  }

  #getIsExpanded(trigger) {
    return trigger.getAttribute("aria-expanded") === "true";
  }

  #setIsExpandedState(trigger) {
    const isExanded = this.#getIsExpanded(trigger);
    trigger.setAttribute("aria-expanded", !isExanded);
  }

  #handleKeyboardEvents(event) {
    const { cardOptionsTrigger } = this.#elements;
    const isExpanded = this.#getIsExpanded(cardOptionsTrigger);

    if (event.key === "Escape" && isExpanded) {
      this.#toggleFlyout(cardOptionsTrigger);
      cardOptionsTrigger.focus();
    }
  }

  #clickOutside(event) {
    const { cardOptionsTrigger } = this.#elements;

    if (event.target === cardOptionsTrigger) {
      return;
    }

    const flyout = cardOptionsTrigger.nextElementSibling;
    const isExpanded = this.#getIsExpanded(cardOptionsTrigger);
    if (!flyout.contains(event.target) && isExpanded) {
      this.#toggleFlyout(cardOptionsTrigger);
    }
  }

  /**
   * Toggles the flyout menu's visibility and position.
   * Ensures that the flyout does not overflow the viewport.
   * @param {HTMLElement} trigger - The button element that triggered the flyout.
   * @private
   */
  #toggleFlyout(trigger) {
    const flyout = trigger.nextElementSibling;
    const flyoutComputedInlineSize = parseInt(
      getComputedStyle(flyout).inlineSize,
      10,
    );
    const triggerLeft = trigger.getBoundingClientRect().left;
    const windowWidth = window.innerWidth;

    if (windowWidth - flyoutComputedInlineSize < triggerLeft) {
      flyout.classList.toggle("flip-inline");
    } else {
      flyout.classList.toggle("open");
    }

    this.#setIsExpandedState(trigger);
    flyout.focus();
  }
}

customElements.define("card-flyout", CardFlyout);
