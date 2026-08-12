document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.getElementById("search-close");
  if (closeButton) {
    closeButton.setAttribute("aria-label", "Close Search");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const selectors = ["#block-mainnav-menu h2", "#helpful-links h1"];

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
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
    if (!el.textContent.trim()) el.remove();
  });
});

/* =========================================================
   Placeholder Social Profile Share Links on Article Pages Removal
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  var shareContainers = document.querySelectorAll(
    ".article_share_buttons, .article__share-buttons",
  );

  shareContainers.forEach(function (container) {
    container.remove();
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

      if (select) {
        // 1. Ensure the underlying hidden <select> is ignored by audit scanners
        select.setAttribute("aria-hidden", "true");
        select.setAttribute("tabindex", "-1");

        const selectId = select.getAttribute("id");
        if (selectId) {
          // Locate the associated <label> using the select's ID
          const label = document.querySelector(`label[for="${selectId}"]`);

          if (label) {
            // 2. Ensure the label itself has an ID to link via aria-labelledby
            let labelId = label.getAttribute("id");
            if (!labelId) {
              labelId = selectId + "-label";
              label.setAttribute("id", labelId);
            }

            const labelText = label.textContent.trim();

            // 3. Connect the visible selectric input to the label
            if (selectricInput) {
              selectricInput.setAttribute("id", selectId + "-selectric");
              selectricInput.setAttribute("aria-label", labelText);
              selectricInput.setAttribute("aria-labelledby", labelId);
            }
          }
        }
      }
    });
  }

  // Run immediately
  fixSelectricLabels();

  // Watch for Drupal Views AJAX updates or dynamic re-renders
  const observer = new MutationObserver(function () {
    fixSelectricLabels();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
