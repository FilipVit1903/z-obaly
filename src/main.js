// Import hlavního SCSS (Vite se postará o kompilaci)
import "/src/scss/style.scss";

// 1. JavaScript Filtrování na samostatné stránce produkty.html
window.filterCategory = function (category, event) {
  const items = document.querySelectorAll(".catalog-item");
  if (!items.length) return;

  items.forEach((item) => {
    if (category === "vse" || item.getAttribute("data-category") === category) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });

  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }
};

// 2. Tlačítko "Poptat produkt" v katalogu
window.openInquiry = function (productName) {
  const textarea = document.getElementById("contact-message");

  // Pokud je formulář na aktuální stránce (jsme na produkty.html)
  if (textarea) {
    textarea.value = `Dobrý den, mám zájem o velkoobchodní nabídku na produkt: ${productName}.`;

    // Plynulé sjetí dolů k formuláři
    const contactSection = document.getElementById("kontakt");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Pokud formulář na stránce není (jsme jinde), přesměrujeme na homepage s parametrem
    const encodedProduct = encodeURIComponent(productName);
    window.location.href = `/#kontakt?poptavka=${encodedProduct}`;
  }
};

// 3. Plynulé sjetí na kontakt z hlavičky na libovolné stránce
window.scrollToContact = function () {
  const contactSection = document.getElementById("kontakt");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "/#kontakt";
  }
};

// 4. Detekce poptávky z URL parametru při přechodu z jiné stránky
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const poptavka = params.get("poptavka");
  const hash = window.location.hash;

  if (poptavka) {
    const textarea = document.getElementById("contact-message");
    if (textarea) {
      textarea.value = `Dobrý den, mám zájem o velkoobchodní nabídku na produkt: ${poptavka}.`;
    }
  }

  if (hash === "#kontakt") {
    const contactSection = document.getElementById("kontakt");
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }
});
