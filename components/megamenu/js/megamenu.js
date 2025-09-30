const pageHeader = document.querySelector(".page-header");
const megaMenuCategoriesContainer = document.querySelector(
  ".mega-menu-categories-container",
);
const megaMenuCategoriesTrack = megaMenuCategoriesContainer.querySelector(
  ".mega-menu-categories-track",
);

pageHeader.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".page-header")) {
    if (target.matches(".button-close") || target.closest(".button-close")) {
      megaMenuCategoriesContainer.setAttribute("hidden", "");
      return;
    }

    if (megaMenuCategoriesContainer.hasAttribute("hidden")) {
      megaMenuCategoriesContainer.removeAttribute("hidden");
    }

    const submenuId = target.getAttribute("aria-controls");
    const submenu = document.getElementById(submenuId);
    const inset = submenu.getAttribute("data-inset") || "0";
    megaMenuCategoriesTrack.style.insetInlineStart = `${inset}rem`;
  }
});
