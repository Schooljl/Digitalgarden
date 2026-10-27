const popupScreen = document.querySelector(".popup-screen");
const closeBtn = document.querySelector(".knop-sluiten");
const cookiesOpnieuw = document.querySelector("#cookies-opnieuw");

const lightDarkKnop = document.querySelector("#light-darkknop");
const kroonluchter = document.querySelector("#kroonluchter");
const logo = document.querySelector("#logo");
const achtergrond = document.querySelector("#achtergrond");
const selfie = document.querySelector("#selfie");
const privacyPopup = document.querySelector(".privacy-popup");


const donkereAfbeeldingen = [
"./kleineafbeeldingen/chandelierdark.png",
"./kleineafbeeldingen/backgroundpagedark.jpg",
"./kleineafbeeldingen/selfiedark.jpg",
"./kleineafbeeldingen/kantdark.jpg"
];

donkereAfbeeldingen.forEach((src) => {
const afbeelding = new Image();
afbeelding.src = src;
});


const systeemDarkMode = window.matchMedia(
"(prefers-color-scheme: dark)"
);

const modusSleutel = "websiteModus";

function pasAfbeeldingenAan(isDark) {
const afbeeldingen = [
{
element: kroonluchter,
licht: "./kleineafbeeldingen/chandelier.png",
donker: "./kleineafbeeldingen/chandelierdark.png"
},

{
element: achtergrond,
licht: "./kleineafbeeldingen/backgroundpage10.jpg",
donker: "./kleineafbeeldingen/backgroundpagedark.jpg"
},
{
element: selfie,
licht: "./kleineafbeeldingen/selfie.jpg",
donker: "./kleineafbeeldingen/selfiedark.jpg"
}
];

afbeeldingen.forEach(({ element, licht, donker }) => {
if (!element) return;

const nieuweBron = isDark ? donker : licht;

// Verander de afbeelding alleen als dat nodig is.
if (!element.src.endsWith(nieuweBron.replace("./", ""))) {
  element.src = nieuweBron;
}

});
}

function stelModusIn(isDark) {
document.body.classList.toggle("dark-mode", isDark);
document.body.classList.toggle("light-mode-forced", !isDark);

document.documentElement.style.colorScheme =
isDark ? "dark" : "light";

pasAfbeeldingenAan(isDark);
}


function laadOpgeslagenModus() {
const opgeslagenModus = localStorage.getItem(modusSleutel);

if (opgeslagenModus === "dark") {
stelModusIn(true);
} else if (opgeslagenModus === "light") {
stelModusIn(false);
} else {

stelModusIn(systeemDarkMode.matches);
}
}

laadOpgeslagenModus();



if (lightDarkKnop) {
lightDarkKnop.addEventListener("click", () => {
const wordtDark =
!document.body.classList.contains("dark-mode");

localStorage.setItem(
  modusSleutel,
  wordtDark ? "dark" : "light"
);

stelModusIn(wordtDark);

});
}

// Volg de systeemvoorkeur zolang de gebruiker zelf
// nog geen licht- of donkermodus heeft gekozen.
systeemDarkMode.addEventListener("change", (event) => {
if (localStorage.getItem(modusSleutel) === null) {
stelModusIn(event.matches);
}
});


let vorigeFocus = null;

function openPopup() {
  if (!popupScreen || popupScreen.classList.contains("active")) return;

  vorigeFocus = document.activeElement;
  popupScreen.classList.add("active");

  [...document.body.children].forEach((element) => {
    if (element !== popupScreen) {
      element.inert = true;
    }
  });

  // Focus op de popup zelf, niet op 'Begrepen'.
  privacyPopup?.focus();
}

function sluitPopup() {
  if (!popupScreen || !popupScreen.classList.contains("active")) return;

  popupScreen.classList.remove("active");

  [...document.body.children].forEach((element) => {
    element.inert = false;
  });

  sessionStorage.setItem("cookiePopupGezien", "true");

  // Herstel de focus naar de vorige plek.
  if (vorigeFocus instanceof HTMLElement && vorigeFocus.isConnected) {
    vorigeFocus.focus();
  } else {
    cookiesOpnieuw?.focus();
  }
}

if (popupScreen && !sessionStorage.getItem("cookiePopupGezien")) {
  window.addEventListener("load", openPopup);
}

closeBtn?.addEventListener("click", sluitPopup);

cookiesOpnieuw?.addEventListener("click", openPopup);

// Laat de gebruiker de popup met Escape sluiten.
document.addEventListener("keydown", (event) => {
  if (!popupScreen?.classList.contains("active")) return;

  if (event.key === "Escape") {
    sluitPopup();
    return;
  }

  // Houd de toetsenbordfocus binnen de popup.
  if (event.key === "Tab") {
    const focusbareElementen = popupScreen.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), ' +
      '[tabindex]:not([tabindex="-1"])'
    );

    const eerste = focusbareElementen[0];
    const laatste = focusbareElementen[focusbareElementen.length - 1];

    if (!eerste || !laatste) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === eerste) {
      event.preventDefault();
      laatste.focus();
    } else if (!event.shiftKey && document.activeElement === laatste) {
      event.preventDefault();
      eerste.focus();
    }
  }
});
/* deze youtube video legt uit hoe je light dark mode doet met een afbeelding die meeverandert met javascript https://www.youtube.com/watch?v=_gKEUYarehE */
/*MDN Web Docs. Document: querySelector(). https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
MDN Web Docs. Window: localStorage property. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
MDN Web Docs. Window: sessionStorage property. https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
MDN Web Docs. Window: matchMedia() method. https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
MDN Web Docs. EventTarget: addEventListener() method. https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
MDN Web Docs. Element: classList property. https://developer.mozilla.org/en-US/docs/Web/API/Element/classList*/
