
const popupScreen = document.querySelector(".popup-screen");
const closeBtn = document.querySelector(".knop-sluiten");

if (popupScreen && !sessionStorage.getItem("cookiePopupGezien")) {
  window.addEventListener("load", () => {
    popupScreen.classList.add("active");
  });
}

if (closeBtn && popupScreen) {
  closeBtn.addEventListener("click", () => {
    popupScreen.classList.remove("active");
    sessionStorage.setItem("cookiePopupGezien", "true");
  });
}