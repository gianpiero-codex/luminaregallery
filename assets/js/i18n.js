(function () {
  "use strict";

  var LANG_KEY = "luminare_lang";
  var LANGS    = ["en", "it", "es", "de", "fr"];
  var FLAGS    = { en: "🇬🇧", it: "🇮🇹", es: "🇪🇸", de: "🇩🇪", fr: "🇫🇷" };
  var NAMES    = { en: "EN",  it: "IT",  es: "ES",  de: "DE",  fr: "FR"  };

  // ── Translations ──────────────────────────────────────────────────────────
  var T = {

    en: {
      "nav.home": "Home", "nav.shop": "Shop", "nav.collections": "Collections",
      "nav.about": "About", "nav.etsy": "Etsy Shop",
      "hero.eyebrow": "Etsy-first wall art catalog",
      "hero.title": "Readable wall art for warm, modern homes.",
      "hero.subtitle": "Luminare Gallery creates decorative prints designed for real rooms, thoughtful gifts, and easy Etsy purchasing.",
      "hero.cta_primary": "Shop on Etsy", "hero.cta_secondary": "Browse Catalog",
      "collections.eyebrow": "Collections",
      "collections.title": "Browse by room, theme, or gift idea.",
      "cat.abstract-art": "Abstract Art", "cat.city-art": "City Art",
      "cat.kitchen-wall-art": "Kitchen Wall Art",
      "cat.faith-inspirational-art": "Faith & Inspirational Art",
      "cat.bathroom-prints": "Bathroom Prints", "cat.animal-wall-art": "Animal Wall Art",
      "cat.japanese-inspired-art": "Japanese Inspired Art", "cat.character-art": "Character Art",
      "cat.wall-art": "Wall Art",
      "featured.eyebrow": "Featured Products", "featured.title": "Popular picks from the catalog.",
      "featured.cta": "View All Products",
      "social.eyebrow": "Follow Along", "social.title": "Stay inspired on social media.",
      "social.subtitle": "New prints, behind-the-scenes, and room inspiration — follow Luminare Gallery everywhere.",
      "why.eyebrow": "Why Etsy", "why.title": "Simple browsing here, secure purchasing on Etsy.",
      "why.printed.title": "Printed wall art",
      "why.printed.text": "Printed options are available through Etsy listings when offered for a specific design.",
      "why.digital.title": "Digital options",
      "why.digital.text": "Some listings may include digital download formats for customers who prefer local printing.",
      "why.homes.title": "Made for homes",
      "why.homes.text": "Artwork designed for modern rooms, everyday decorating, and giftable wall decor.",
      "shop.eyebrow": "Catalog", "shop.title": "Shop wall art prints on Etsy.",
      "shop.subtitle": "Browse the full Luminare Gallery catalog. Click any product to view and purchase directly on Etsy.",
      "filter.all": "All",
      "product.view_on_etsy": "View on Etsy",
      "product.empty": "No products available at the moment.",
      "product.empty_link": "Visit the Etsy shop \u2192",
      "product.error": "Products temporarily unavailable.",
      "product.error_link": "Visit the Etsy shop \u2192",
      "footer.contact": "Contact:", "footer.etsy": "Etsy Shop",
      "footer.shop": "Shop", "footer.about": "About",
      "footer.privacy": "Privacy Policy", "footer.terms": "Terms of Service",
      "about.eyebrow": "About", "about.title": "About Luminare Gallery",
      "collections.page.eyebrow": "Browse", "collections.page.title": "All Collections"
    },

    it: {
      "nav.home": "Home", "nav.shop": "Shop", "nav.collections": "Collezioni",
      "nav.about": "Chi siamo", "nav.etsy": "Shop Etsy",
      "hero.eyebrow": "Stampe d\u2019arte su Etsy",
      "hero.title": "Arte da parete per case moderne e accoglienti.",
      "hero.subtitle": "Luminare Gallery crea stampe decorative pensate per stanze vere, regali speciali e acquisti facili su Etsy.",
      "hero.cta_primary": "Acquista su Etsy", "hero.cta_secondary": "Sfoglia il catalogo",
      "collections.eyebrow": "Collezioni",
      "collections.title": "Esplora per stanza, tema o idea regalo.",
      "cat.abstract-art": "Arte Astratta", "cat.city-art": "Arte Urbana",
      "cat.kitchen-wall-art": "Arte per Cucina",
      "cat.faith-inspirational-art": "Arte Sacra e Ispirazionale",
      "cat.bathroom-prints": "Stampe per Bagno", "cat.animal-wall-art": "Arte con Animali",
      "cat.japanese-inspired-art": "Arte Giapponese", "cat.character-art": "Arte di Personaggi",
      "cat.wall-art": "Arte da Parete",
      "featured.eyebrow": "Prodotti in evidenza", "featured.title": "I pi\u00f9 apprezzati del catalogo.",
      "featured.cta": "Vedi tutti i prodotti",
      "social.eyebrow": "Seguici", "social.title": "Resta ispirato sui social.",
      "social.subtitle": "Nuove stampe, dietro le quinte e ispirazione per la casa \u2014 segui Luminare Gallery ovunque.",
      "why.eyebrow": "Perch\u00e9 Etsy", "why.title": "Sfoglia qui, acquista in sicurezza su Etsy.",
      "why.printed.title": "Stampe fisiche",
      "why.printed.text": "Le opzioni di stampa sono disponibili tramite le inserzioni Etsy quando offerte per un design specifico.",
      "why.digital.title": "Opzioni digitali",
      "why.digital.text": "Alcune inserzioni possono includere formati di download digitale per chi preferisce stampare in autonomia.",
      "why.homes.title": "Fatto per le case",
      "why.homes.text": "Arte pensata per stanze moderne, decorazione quotidiana e regali da parete.",
      "shop.eyebrow": "Catalogo", "shop.title": "Stampe d\u2019arte su Etsy.",
      "shop.subtitle": "Sfoglia il catalogo completo. Clicca su un prodotto per vederlo e acquistarlo direttamente su Etsy.",
      "filter.all": "Tutti",
      "product.view_on_etsy": "Vedi su Etsy",
      "product.empty": "Nessun prodotto disponibile al momento.",
      "product.empty_link": "Visita lo shop su Etsy \u2192",
      "product.error": "Prodotti temporaneamente non disponibili.",
      "product.error_link": "Visita lo shop su Etsy \u2192",
      "footer.contact": "Contatto:", "footer.etsy": "Shop Etsy",
      "footer.shop": "Shop", "footer.about": "Chi siamo",
      "footer.privacy": "Privacy Policy", "footer.terms": "Termini di Servizio",
      "about.eyebrow": "Chi siamo", "about.title": "Chi \u00e8 Luminare Gallery",
      "collections.page.eyebrow": "Sfoglia", "collections.page.title": "Tutte le Collezioni"
    },

    es: {
      "nav.home": "Inicio", "nav.shop": "Tienda", "nav.collections": "Colecciones",
      "nav.about": "Nosotros", "nav.etsy": "Tienda Etsy",
      "hero.eyebrow": "Cat\u00e1logo de arte en Etsy",
      "hero.title": "Arte para paredes en hogares modernos y acogedores.",
      "hero.subtitle": "Luminare Gallery crea l\u00e1minas decorativas para habitaciones reales, regalos especiales y compras f\u00e1ciles en Etsy.",
      "hero.cta_primary": "Comprar en Etsy", "hero.cta_secondary": "Ver cat\u00e1logo",
      "collections.eyebrow": "Colecciones",
      "collections.title": "Explora por habitaci\u00f3n, tema o idea de regalo.",
      "cat.abstract-art": "Arte Abstracto", "cat.city-art": "Arte Urbano",
      "cat.kitchen-wall-art": "Arte para Cocina",
      "cat.faith-inspirational-art": "Arte Religioso e Inspiracional",
      "cat.bathroom-prints": "L\u00e1minas para Ba\u00f1o", "cat.animal-wall-art": "Arte con Animales",
      "cat.japanese-inspired-art": "Arte Japon\u00e9s", "cat.character-art": "Arte de Personajes",
      "cat.wall-art": "Arte Mural",
      "featured.eyebrow": "Productos destacados", "featured.title": "Los m\u00e1s populares del cat\u00e1logo.",
      "featured.cta": "Ver todos los productos",
      "social.eyebrow": "S\u00edguenos", "social.title": "Mant\u00e9nte inspirado en redes sociales.",
      "social.subtitle": "Nuevas l\u00e1minas, detr\u00e1s de escenas e inspiraci\u00f3n para el hogar \u2014 sigue a Luminare Gallery en todas partes.",
      "why.eyebrow": "Por qu\u00e9 Etsy", "why.title": "Explora aqu\u00ed, compra con seguridad en Etsy.",
      "why.printed.title": "Arte impreso",
      "why.printed.text": "Las opciones de impresi\u00f3n est\u00e1n disponibles a trav\u00e9s de los listados de Etsy cuando se ofrecen para un dise\u00f1o espec\u00edfico.",
      "why.digital.title": "Opciones digitales",
      "why.digital.text": "Algunos listados pueden incluir formatos de descarga digital para clientes que prefieren imprimir localmente.",
      "why.homes.title": "Hecho para hogares",
      "why.homes.text": "Arte dise\u00f1ado para habitaciones modernas, decoraci\u00f3n cotidiana y regalos de pared.",
      "shop.eyebrow": "Cat\u00e1logo", "shop.title": "L\u00e1minas de arte en Etsy.",
      "shop.subtitle": "Explora el cat\u00e1logo completo. Haz clic en cualquier producto para verlo y comprarlo directamente en Etsy.",
      "filter.all": "Todos",
      "product.view_on_etsy": "Ver en Etsy",
      "product.empty": "No hay productos disponibles en este momento.",
      "product.empty_link": "Visita la tienda en Etsy \u2192",
      "product.error": "Productos temporalmente no disponibles.",
      "product.error_link": "Visita la tienda en Etsy \u2192",
      "footer.contact": "Contacto:", "footer.etsy": "Tienda Etsy",
      "footer.shop": "Tienda", "footer.about": "Nosotros",
      "footer.privacy": "Pol\u00edtica de Privacidad", "footer.terms": "T\u00e9rminos de Servicio",
      "about.eyebrow": "Nosotros", "about.title": "Sobre Luminare Gallery",
      "collections.page.eyebrow": "Explorar", "collections.page.title": "Todas las Colecciones"
    },

    de: {
      "nav.home": "Startseite", "nav.shop": "Shop", "nav.collections": "Kollektionen",
      "nav.about": "\u00dcber uns", "nav.etsy": "Etsy-Shop",
      "hero.eyebrow": "Wandkunst-Katalog auf Etsy",
      "hero.title": "Moderne Wandkunst f\u00fcr gem\u00fctliche Zuhause.",
      "hero.subtitle": "Luminare Gallery gestaltet dekorative Drucke f\u00fcr echte R\u00e4ume, durchdachte Geschenke und einfachen Etsy-Kauf.",
      "hero.cta_primary": "Auf Etsy kaufen", "hero.cta_secondary": "Katalog durchsuchen",
      "collections.eyebrow": "Kollektionen",
      "collections.title": "Nach Raum, Thema oder Geschenkidee st\u00f6bern.",
      "cat.abstract-art": "Abstrakte Kunst", "cat.city-art": "Stadtkunst",
      "cat.kitchen-wall-art": "K\u00fcchenkunst",
      "cat.faith-inspirational-art": "Religi\u00f6se & Inspirierende Kunst",
      "cat.bathroom-prints": "Badezimmer-Drucke", "cat.animal-wall-art": "Tierkunst",
      "cat.japanese-inspired-art": "Japanische Kunst", "cat.character-art": "Figurenkunst",
      "cat.wall-art": "Wandkunst",
      "featured.eyebrow": "Ausgew\u00e4hlte Produkte", "featured.title": "Beliebteste aus dem Katalog.",
      "featured.cta": "Alle Produkte ansehen",
      "social.eyebrow": "Folge uns", "social.title": "Lass dich in sozialen Medien inspirieren.",
      "social.subtitle": "Neue Drucke, Einblicke hinter die Kulissen und Wohnideen \u2014 folge Luminare Gallery \u00fcberall.",
      "why.eyebrow": "Warum Etsy", "why.title": "Hier st\u00f6bern, sicher auf Etsy kaufen.",
      "why.printed.title": "Gedruckte Wandkunst",
      "why.printed.text": "Druckoptionen sind \u00fcber Etsy-Angebote verf\u00fcgbar, wenn sie f\u00fcr ein bestimmtes Design angeboten werden.",
      "why.digital.title": "Digitale Optionen",
      "why.digital.text": "Einige Angebote k\u00f6nnen digitale Download-Formate f\u00fcr Kunden enthalten, die lokal drucken m\u00f6chten.",
      "why.homes.title": "F\u00fcr Zuhause gemacht",
      "why.homes.text": "Kunst f\u00fcr moderne R\u00e4ume, allt\u00e4gliche Dekoration und verschenkbare Wanddekoration.",
      "shop.eyebrow": "Katalog", "shop.title": "Wandkunst-Drucke auf Etsy.",
      "shop.subtitle": "Durchsuche den vollst\u00e4ndigen Katalog. Klicke auf ein Produkt, um es direkt auf Etsy anzusehen und zu kaufen.",
      "filter.all": "Alle",
      "product.view_on_etsy": "Auf Etsy ansehen",
      "product.empty": "Derzeit keine Produkte verf\u00fcgbar.",
      "product.empty_link": "Zum Etsy-Shop \u2192",
      "product.error": "Produkte vor\u00fcbergehend nicht verf\u00fcgbar.",
      "product.error_link": "Zum Etsy-Shop \u2192",
      "footer.contact": "Kontakt:", "footer.etsy": "Etsy-Shop",
      "footer.shop": "Shop", "footer.about": "\u00dcber uns",
      "footer.privacy": "Datenschutz", "footer.terms": "Nutzungsbedingungen",
      "about.eyebrow": "\u00dcber uns", "about.title": "\u00dcber Luminare Gallery",
      "collections.page.eyebrow": "St\u00f6bern", "collections.page.title": "Alle Kollektionen"
    },

    fr: {
      "nav.home": "Accueil", "nav.shop": "Boutique", "nav.collections": "Collections",
      "nav.about": "\u00c0 propos", "nav.etsy": "Boutique Etsy",
      "hero.eyebrow": "Catalogue d\u2019art mural sur Etsy",
      "hero.title": "Art mural pour foyers modernes et chaleureux.",
      "hero.subtitle": "Luminare Gallery cr\u00e9e des imprim\u00e9s d\u00e9coratifs con\u00e7us pour de vraies pi\u00e8ces, des cadeaux r\u00e9fl\u00e9chis et des achats faciles sur Etsy.",
      "hero.cta_primary": "Acheter sur Etsy", "hero.cta_secondary": "Parcourir le catalogue",
      "collections.eyebrow": "Collections",
      "collections.title": "Parcourir par pi\u00e8ce, th\u00e8me ou id\u00e9e cadeau.",
      "cat.abstract-art": "Art Abstrait", "cat.city-art": "Art Urbain",
      "cat.kitchen-wall-art": "Art pour Cuisine",
      "cat.faith-inspirational-art": "Art Religieux & Inspirant",
      "cat.bathroom-prints": "Affiches pour Salle de Bain", "cat.animal-wall-art": "Art Animalier",
      "cat.japanese-inspired-art": "Art Japonais", "cat.character-art": "Art de Personnages",
      "cat.wall-art": "Art Mural",
      "featured.eyebrow": "Produits en vedette", "featured.title": "Les plus populaires du catalogue.",
      "featured.cta": "Voir tous les produits",
      "social.eyebrow": "Suivez-nous", "social.title": "Restez inspir\u00e9 sur les r\u00e9seaux sociaux.",
      "social.subtitle": "Nouvelles impressions, coulisses et inspiration d\u00e9co \u2014 suivez Luminare Gallery partout.",
      "why.eyebrow": "Pourquoi Etsy", "why.title": "Parcourez ici, achetez en s\u00e9curit\u00e9 sur Etsy.",
      "why.printed.title": "Art mural imprim\u00e9",
      "why.printed.text": "Les options d\u2019impression sont disponibles via les annonces Etsy lorsqu\u2019elles sont propos\u00e9es pour un design sp\u00e9cifique.",
      "why.digital.title": "Options num\u00e9riques",
      "why.digital.text": "Certaines annonces peuvent inclure des formats de t\u00e9l\u00e9chargement num\u00e9rique pour les clients qui pr\u00e9f\u00e8rent imprimer localement.",
      "why.homes.title": "Fait pour la maison",
      "why.homes.text": "Art con\u00e7u pour les pi\u00e8ces modernes, la d\u00e9coration quotidienne et les cadeaux muraux.",
      "shop.eyebrow": "Catalogue", "shop.title": "Imprim\u00e9s d\u2019art mural sur Etsy.",
      "shop.subtitle": "Parcourez le catalogue complet. Cliquez sur un produit pour le voir et l\u2019acheter directement sur Etsy.",
      "filter.all": "Tous",
      "product.view_on_etsy": "Voir sur Etsy",
      "product.empty": "Aucun produit disponible pour le moment.",
      "product.empty_link": "Visitez la boutique Etsy \u2192",
      "product.error": "Produits temporairement indisponibles.",
      "product.error_link": "Visitez la boutique Etsy \u2192",
      "footer.contact": "Contact\u00a0:", "footer.etsy": "Boutique Etsy",
      "footer.shop": "Boutique", "footer.about": "\u00c0 propos",
      "footer.privacy": "Politique de confidentialit\u00e9", "footer.terms": "Conditions d\u2019utilisation",
      "about.eyebrow": "\u00c0 propos", "about.title": "\u00c0 propos de Luminare Gallery",
      "collections.page.eyebrow": "Parcourir", "collections.page.title": "Toutes les Collections"
    }

  };

  // ── Core ──────────────────────────────────────────────────────────────────
  function detectBrowserLang() {
    var lang = ((navigator.language || navigator.userLanguage || "en")
      .substring(0, 2).toLowerCase());
    return LANGS.indexOf(lang) !== -1 ? lang : null;
  }

  var currentLang = localStorage.getItem(LANG_KEY) || detectBrowserLang() || "en";

  function t(key) {
    return (T[currentLang] && T[currentLang][key]) ||
           (T["en"] && T["en"][key]) || key;
  }

  function apply() {
    document.documentElement.lang = currentLang;

    // textContent
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    // aria-label
    document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-label")));
    });

    // placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });

    // Update switcher UI
    var flagEl = document.getElementById("lang-flag");
    var codeEl = document.getElementById("lang-code");
    if (flagEl) flagEl.textContent = FLAGS[currentLang];
    if (codeEl) codeEl.textContent = NAMES[currentLang];

    document.querySelectorAll("#lang-dropdown [data-lang]").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-lang") === currentLang);
    });
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    apply();
  }

  // Apply as early as possible to avoid flash of untranslated content
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  window.I18N = { t: t, setLang: setLang, getLang: function () { return currentLang; }, apply: apply };

})();
