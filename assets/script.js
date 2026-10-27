

// Elementen selecteren met querySelector.
// Bron: https://www.w3schools.com/js/js_htmldom_elements.asp
const popupScreen = document.querySelector(".popup-screen");
const closeBtn = document.querySelector(".knop-sluiten");
const cookiesOpnieuw = document.querySelector("#cookies-opnieuw");

const lightDarkKnop = document.querySelector("#light-darkknop");
const kroonluchter = document.querySelector("#kroonluchter");
const logo = document.querySelector("#logo");
const achtergrond = document.querySelector("#achtergrond");
const selfie = document.querySelector("#selfie");
const privacyPopup = document.querySelector(".privacy-popup");


// Mijn afbeeldingen voor dark mode.
// Een array wordt gebruikt om meerdere afbeeldingspaden te verzamelen.
const donkereAfbeeldingen = [
"./kleineafbeeldingen/chandelierdark.png",
"./kleineafbeeldingen/backgroundpagedark.jpg",
"./kleineafbeeldingen/selfiedark.jpg",
"./kleineafbeeldingen/kantdark.jpg"
];


// Afbeeldingen vooraf laden met het Image-object.
// Bron: https://www.w3schools.com/jsref/prop_img_src.asp
donkereAfbeeldingen.forEach((src) => {
const afbeelding = new Image();
afbeelding.src = src;
});


// matchMedia controleert de systeemvoorkeur voor dark mode.
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
const systeemDarkMode = window.matchMedia(
"(prefers-color-scheme: dark)"
);


// localStorage bewaart de gekozen modus tussen browsersessies.
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const modusSleutel = "websiteModus";


// Dit is de functie om afbeeldingen te wisselen op basis van de gekozen modus.
// De src-eigenschap bepaalt welke afbeelding wordt weergegeven.
// Bron: https://www.w3schools.com/jsref/prop_img_src.asp
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

// Verandert de afbeelding alleen als dat nodig is.
if (!element.src.endsWith(nieuweBron.replace("./", ""))) {
  element.src = nieuweBron;
}

});
}


// Functie om de light mode of dark mode in te stellen.
// classList.toggle() voegt een klasse toe of verwijdert deze.
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
function stelModusIn(isDark) {
document.body.classList.toggle("dark-mode", isDark);
document.body.classList.toggle("light-mode-forced", !isDark);

document.documentElement.style.colorScheme =
isDark ? "dark" : "light";

pasAfbeeldingenAan(isDark);
}


// Controleert of er eerder een modus is opgeslagen.
// Als dat niet zo is, wordt de systeemvoorkeur gebruikt.
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
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


// Een click-event voert code uit wanneer de knop wordt aangeklikt.
// addEventListener-bron:
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
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
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
systeemDarkMode.addEventListener("change", (event) => {
if (localStorage.getItem(modusSleutel) === null) {
stelModusIn(event.matches);
}
});


// Onthoud het element dat de focus had voordat de popup openging.
// activeElement geeft het element terug dat momenteel focus heeft.
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
let vorigeFocus = null;


// Opent de cookie- en privacy-popup.
// Focusbeheer helpt toetsenbordgebruikers om te weten waar ze zijn.
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
function openPopup() {
  if (!popupScreen || popupScreen.classList.contains("active")) return;

  vorigeFocus = document.activeElement;
  popupScreen.classList.add("active");

  // inert maakt de andere paginaonderdelen tijdelijk niet interactief.
  // Dit voorkomt dat gebruikers met het toetsenbord naar de achtergrond gaan.
  // Bron: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert
  [...document.body.children].forEach((element) => {
    if (element !== popupScreen) {
      element.inert = true;
    }
  });

  // Focus op de popup zelf, niet op 'Begrepen'.
  privacyPopup?.focus();
}


// Sluit de popup en herstelt de toetsenbordfocus.
function sluitPopup() {
  if (!popupScreen || !popupScreen.classList.contains("active")) return;

  popupScreen.classList.remove("active");

  // De achtergrond wordt weer interactief.
  [...document.body.children].forEach((element) => {
    element.inert = false;
  });

  // sessionStorage bewaart dat de popup in deze tabsessie is gezien.
  // De waarde blijft bewaard bij het herladen van de pagina.
  // Bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
  sessionStorage.setItem("cookiePopupGezien", "true");

  // Herstel de focus naar de vorige plek.
  // Bron: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
  if (vorigeFocus instanceof HTMLElement && vorigeFocus.isConnected) {
    vorigeFocus.focus();
  } else {
    cookiesOpnieuw?.focus();
  }
}


// Toon de popup bij het laden van de pagina als deze nog niet is gezien.
// Het load-event wordt uitgevoerd wanneer de pagina en de bijbehorende
// bronnen zijn geladen.
if (popupScreen && !sessionStorage.getItem("cookiePopupGezien")) {
  window.addEventListener("load", openPopup);
}


// De popup sluiten met de sluitknop.
// Bron: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
closeBtn?.addEventListener("click", sluitPopup);


// De popup opnieuw openen via de cookieknop.
cookiesOpnieuw?.addEventListener("click", openPopup);


// Herkent toetsen die de gebruiker indrukt.
// Met Escape kan de popup worden gesloten en met Tab kan de focus
// door de interactieve elementen worden verplaatst.
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
document.addEventListener("keydown", (event) => {
  if (!popupScreen?.classList.contains("active")) return;

  if (event.key === "Escape") {
    sluitPopup();
    return;
  }

  // Houd de toetsenbordfocus binnen de popup.
  // querySelectorAll() selecteert alle elementen die aan de CSS-selector voldoen.
  // Bron: https://www.w3schools.com/jsref/met_document_queryselectorall.asp
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
