export default class SessionEndAlert extends HTMLElement {
  static #selectors = {
    dialog: "#session-end-alert-dialog",
  };

  #elements;
  #options = {
    callback: null,
    timerDuration: 3600000, // 1 hour
  };

  #localStorageKey = "session-end-alert-state";
  #sessionTimer;

  /**
   * Configures the session end alert with custom duration and callback
   * @param {number} duration - The duration in milliseconds before showing the alert [default: 3600000]
   * @param {Function} callback - Function to execute when user extends the session
   * @returns {SessionEndAlert} Returns this instance for method chaining
   */
  configure(duration, callback) {
    if (duration) {
      this.#options.timerDuration = duration;
    }

    if (!callback || typeof callback !== "function") {
      throw new Error(
        "session-end-alert: Callback must be provided and be a function",
      );
    }

    this.#options.callback = callback;
    return this;
  }

  /**
   * Starts the session timer and initializes event listeners
   * When the timer expires, shows the session end alert dialog
   * Also stores the session state in localStorage for tab synchronization
   */
  startTimer() {
    const { dialog } = this.#elements;

    this.#sessionTimer = setTimeout(() => {
      dialog.showModal();
    }, this.#options.timerDuration);

    this.#setLocalStorage();
    this.#addEventListeners();
  }

  constructor() {
    super();
    this.#elements = this.#getElements();
  }

  #getElements() {
    return {
      dialog: this.querySelector(SessionEndAlert.#selectors.dialog),
    };
  }

  #setLocalStorage() {
    const { timerDuration } = this.#options;
    localStorage.setItem(
      this.#localStorageKey,
      JSON.stringify({
        startedAt: Date.now(),
        duration: timerDuration,
      }),
    );
  }

  /**
   * Handles visibility changes when switching between tabs
   * Shows the session end alert if less than 60 seconds remain in the session
   * @private
   */
  #handlePageVisibilityChange() {
    if (document.visibilityState === "visible") {
      const { dialog } = this.#elements;
      const sessionState = localStorage.getItem(this.#localStorageKey);

      if (sessionState) {
        try {
          const parsedState = JSON.parse(sessionState);
          const timeElapsed = Date.now() - parsedState.startedAt;
          const timeRemainingInSeconds = Math.floor(
            (parsedState.duration - timeElapsed) / 1000,
          );

          if (timeRemainingInSeconds < 60) {
            clearTimeout(this.#sessionTimer);
            dialog.showModal();
          }
        } catch (error) {
          throw new Error(
            `session-end-alert: Unable to parse session state: ${error.message}`,
          );
        }
      }
    }
  }

  /**
   * Sets up event listeners for visibility changes and dialog interactions
   * - Monitors tab/window visibility to handle session timeouts across tabs
   * - Handles dialog button clicks to extend the session
   * @private
   */
  #addEventListeners() {
    const { dialog } = this.#elements;
    const { callback } = this.#options;

    document.addEventListener("visibilitychange", () => {
      this.#handlePageVisibilityChange();
    });

    dialog.addEventListener("click", (event) => {
      if (event.target.classList.contains("button")) {
        dialog.close();
        callback();
        localStorage.removeItem(this.#localStorageKey);
      }
    });
  }
}

customElements.define("session-end-alert", SessionEndAlert);
