// update-date.js
const LAST_UPDATE = "13/04/2026";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".last-update").forEach(el => {
    el.textContent = LAST_UPDATE;
  });
});
