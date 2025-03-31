const filtersContainer = document.querySelector(".filters");

filtersContainer?.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("disclosure-toggle")) {
    event.stopPropagation();

    const disclosureItemsContainer = target.nextElementSibling;
    const isExpanded = target.getAttribute("aria-expanded") === "true";

    target.setAttribute("aria-expanded", !isExpanded);
    disclosureItemsContainer.toggleAttribute("hidden");
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    const visibleDisclosureItemsContainer = document.querySelector(
      ".disclosure-items-container:not([hidden])",
    );

    if (visibleDisclosureItemsContainer) {
      visibleDisclosureItemsContainer.previousElementSibling.setAttribute(
        "aria-expanded",
        false,
      );
      visibleDisclosureItemsContainer.toggleAttribute("hidden");
    }
  }
});

document.addEventListener("click", (event) => {
  const visibleDisclosureItemsContainer = document.querySelector(
    ".disclosure-items-container:not([hidden])",
  );

  if (!visibleDisclosureItemsContainer) {
    return;
  }

  if (
    !event.target.closest(
      ".disclosure-container:has(.disclosure-items-container:not([hidden]))",
    )
  ) {
    visibleDisclosureItemsContainer.previousElementSibling.setAttribute(
      "aria-expanded",
      false,
    );
    visibleDisclosureItemsContainer.toggleAttribute("hidden");
  }
});
