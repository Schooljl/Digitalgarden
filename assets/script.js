const popupScreen = document.querySelector(".popup-screen");
const closeBtn = document.querySelector(".knop-sluiten");
const cookiesOpnieuw = document.querySelector("#cookies-opnieuw");

const lightDarkKnop = document.querySelector("#light-darkknop");
const kroonluchter = document.querySelector("#kroonluchter");
const logo = document.querySelector("#logo");
const achtergrond = document.querySelector("#achtergrond");

// Cookie-popup automatisch tonen
if (popupScreen && !sessionStorage.getItem("cookiePopupGezien")) {
  window.addEventListener("load", () => {
    popupScreen.classList.add("active");
  });
}

// Cookie-popup sluiten
if (closeBtn && popupScreen) {
  closeBtn.addEventListener("click", () => {
    popupScreen.classList.remove("active");
    sessionStorage.setItem("cookiePopupGezien", "true");
  });
}

// Cookie-popup opnieuw openen
if (cookiesOpnieuw && popupScreen) {
  cookiesOpnieuw.addEventListener("click", () => {
    popupScreen.classList.add("active");
  });
}

// Kroonluchter aanpassen
function pasKroonluchterAan() {
  if (!kroonluchter) return;

  kroonluchter.src = document.body.classList.contains("dark-mode")
    ? "kleineafbeeldingen/chandelierdark.png"
    : "kleineafbeeldingen/chandelier.png";
}

// Logo en achtergrond aanpassen
function pasAfbeeldingenAan() {
  const isDark = document.body.classList.contains("dark-mode");

  [logo, achtergrond].forEach((afbeelding) => {
    if (!afbeelding) return;

    afbeelding.src = isDark
      ? afbeelding.dataset.dark
      : afbeelding.dataset.light;
  });
}

// Light/dark mode omschakelen
if (lightDarkKnop) {
  lightDarkKnop.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    pasKroonluchterAan();
    pasAfbeeldingenAan();
  });
}

// Afbeeldingen instellen bij het laden
pasKroonluchterAan();
pasAfbeeldingenAan();
/* deze youtube video legt uit hoe je light dark mode doet met een afbeelding die meeverandert met javascript https://www.youtube.com/watch?v=_gKEUYarehE */