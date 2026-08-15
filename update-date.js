// update-date.js
const LAST_UPDATE = "15/08/2026";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".last-update").forEach(el => {
    el.textContent = LAST_UPDATE;
  });
});
