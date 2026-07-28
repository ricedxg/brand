document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("search-close");
    if (closeButton) {
      closeButton.setAttribute("aria-label", "Close Search");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const selectors = [
    "#block-mainnav-menu",
    "#helpful-links h1"
  ];

  selectors.forEach((selector) => {
    const element = document.querySelector(selector);

    if (element && (element.tagName === "H1" || element.tagName === "H2")) {
      const newDiv = document.createElement("div");

      // Copy all attributes
      Array.from(element.attributes).forEach((attr) => {
        newDiv.setAttribute(attr.name, attr.value);
      });

      // Copy content
      newDiv.innerHTML = element.innerHTML;

      // Replace the heading with the div
      element.parentNode.replaceChild(newDiv, element);
    }
  });
});  