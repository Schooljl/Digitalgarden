
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

const cookiesOpnieuw = document.querySelector("#cookies-opnieuw");

if (cookiesOpnieuw && popupScreen) {
  cookiesOpnieuw.addEventListener("click", () => {
    popupScreen.classList.add("active");
  });
}

/* deze youtube video legt uit hoe je light dark mode doet met een afbeelding die meeverandert met javascript https://www.youtube.com/watch?v=_gKEUYarehE */