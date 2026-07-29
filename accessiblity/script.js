document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("search-close");
    if (closeButton) {
      closeButton.setAttribute("aria-label", "Close Search");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const selectors = [
    "#block-mainnav-menu h2",
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

/* =========================================================
   Empty heading removal
   ========================================================= */
window.addEventListener("load", () => {
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(el => {
    if (!el.textContent.trim()) el.remove();
  });
});

/* =========================================================
   Selectric input fields fix for missing label
   ========================================================= */

  document.addEventListener("DOMContentLoaded", function () {
    function fixSelectricLabels() {
      const wrappers = document.querySelectorAll(".selectric-wrapper");

      wrappers.forEach((wrapper) => {
        const select = wrapper.querySelector("select");
        const selectricInput = wrapper.querySelector(".selectric-input");

        if (select && selectricInput) {
          // Assign the expected ID to <input class="selectric-input">
          const selectId = select.getAttribute("id");
          if (selectId) {
            selectricInput.setAttribute("id", selectId + "-selectric");
          }

          // Locate the associated <label> using the select's ID
          const label = document.querySelector(`label[for="${selectId}"]`);
          if (label) {
            // Set aria-label directly to ensure screen readers see instantly
            const labelText = label.textContent.trim();
            selectricInput.setAttribute("aria-label", labelText);
          }
        }
      });
    }

    // Run immediately
    fixSelectricLabels();

    // Run slightly delayed in case Selectric initializes dynamically via AJAX/jQuery
    setTimeout(fixSelectricLabels, 500);
  });