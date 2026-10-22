const popupScreen = document.querySelector(".popup-screen");
const closeBtn = document.querySelector(".knop-sluiten");
const cookiesOpnieuw = document.querySelector("#cookies-opnieuw");

const lightDarkKnop = document.querySelector("#light-darkknop");
const kroonluchter = document.querySelector("#kroonluchter");
const logo = document.querySelector("#logo");
const achtergrond = document.querySelector("#achtergrond");

const systeemDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
);


/* ========================================
   COOKIE-POPUP
======================================== */

// Cookie-popup automatisch tonen
if (
  popupScreen &&
  !sessionStorage.getItem("cookiePopupGezien")
) {
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


/* ========================================
   AFBEELDINGEN AANPASSEN
======================================== */

function pasAfbeeldingenAan(isDark) {
  const afbeeldingen = [
    {
      element: kroonluchter,
      licht: "kleineafbeeldingen/chandelier.png",
      donker: "kleineafbeeldingen/chandelierdark.png"
    },
    {
      element: logo,
      licht: "./kleineafbeeldingen/logo200.jpg",
      donker: "./kleineafbeeldingen/logodark.jpg"
    },
    {
      element: achtergrond,
      licht: "./kleineafbeeldingen/backgroundpage10.jpg",
      donker: "./kleineafbeeldingen/backgroundpagedark.jpg"
    }
  ];

  afbeeldingen.forEach(({ element, licht, donker }) => {
    if (!element) return;

    element.src = isDark ? donker : licht;
  });

}


/* ========================================
   LIGHT/DARK MODE INSTELLEN
======================================== */

function stelModusIn(isDark) {
  // De juiste CSS-klassen instellen
  document.body.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle(
    "light-mode-forced",
    !isDark
  );

  // Alle afbeeldingen aanpassen
  pasAfbeeldingenAan(isDark);
}


/* ========================================
   MODUS BIJ HET LADEN
======================================== */

// Een handmatige keuze heeft voorrang.
// Zonder handmatige keuze volgen we de systeeminstelling.

function laadOpgeslagenModus() {
  const opgeslagenModus =
    localStorage.getItem("websiteModus");

  if (opgeslagenModus === "dark") {
    stelModusIn(true);
  } else if (opgeslagenModus === "light") {
    stelModusIn(false);
  } else {
    stelModusIn(systeemDarkMode.matches);
  }
}

laadOpgeslagenModus();


/* ========================================
   MODUS WISSELEN MET DE KROONLUCHTER
======================================== */

if (lightDarkKnop) {
  lightDarkKnop.addEventListener("click", () => {
    const wordtDark =
      !document.body.classList.contains("dark-mode");

    // De gekozen modus bewaren
    localStorage.setItem(
      "websiteModus",
      wordtDark ? "dark" : "light"
    );

    // De modus en afbeeldingen aanpassen
    stelModusIn(wordtDark);
  });
}


/* ========================================
   SYSTEEMINSTELLING VOLGEN
======================================== */

// Als de systeeminstelling verandert, volgen we die
// alleen wanneer er geen handmatige keuze is opgeslagen.

systeemDarkMode.addEventListener("change", (event) => {
  if (localStorage.getItem("websiteModus") === null) {
    stelModusIn(event.matches);
  }
});
/* deze youtube video legt uit hoe je light dark mode doet met een afbeelding die meeverandert met javascript https://www.youtube.com/watch?v=_gKEUYarehE */