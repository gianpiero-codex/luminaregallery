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
      "bio.eyebrow": "About", "bio.title": "The story behind Luminare Gallery.",
      "bio.p1": "Luminare Gallery is a wall art studio focused on accessible, visually striking prints designed for modern homes, cozy interiors, creative spaces, and everyday rooms with personality.",
      "bio.p2": "Each artwork is developed with a clear purpose: to be easy to understand at first glance, emotionally engaging, and ready to bring character to a wall without overcomplicating the space. The gallery blends commercial wall art, decorative prints, trend-aware themes, and clean visual presentation across styles such as kitchen art, bathroom decor, farmhouse prints, Christian wall art, Japanese-inspired posters, animal illustrations, coffee bar art, and bold typography pieces.",
      "bio.p3": "Luminare Gallery is built for people who want art that feels immediate, readable, and easy to place in real homes. The focus is not on distant gallery language, but on artwork that customers can quickly imagine in their kitchen, bathroom, office, bedroom, hallway, prayer corner, or coffee bar.",
      "bio.p4": "Every piece is selected and prepared with attention to composition, contrast, readability, print quality, and interior compatibility. The goal is simple: create wall art that looks good online, works well in real spaces, and helps people give their rooms more warmth, humor, faith, charm, or visual identity.",
      "bio.p5": "Luminare Gallery offers decorative wall art for customers who want their walls to feel more personal, more expressive, and more alive.",
      "contact.eyebrow": "Contact", "contact.title": "Get in touch.",
      "contact.subtitle": "Questions, commissions, or just want to say hi? We\u2019d love to hear from you.",
      "footer.contact": "Contact:", "footer.etsy": "Etsy Shop",
      "footer.shop": "Shop", "footer.about": "About",
      "footer.privacy": "Privacy Policy", "footer.terms": "Terms of Service",
      "about.eyebrow": "About", "about.title": "About Luminare Gallery",
      "collections.page.eyebrow": "Browse", "collections.page.title": "All Collections",
      "cat.digital-download": "Digital Download",
      "badge.digital": "\u2b07 Digital Download", "badge.print": "\ud83d\uddbc Print via Gelato"
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
      "bio.eyebrow": "Chi siamo", "bio.title": "La storia di Luminare Gallery.",
      "bio.p1": "Luminare Gallery \u00e8 uno studio di arte da parete dedicato a stampe accessibili e visivamente forti, pensate per case moderne, interni accoglienti, spazi creativi e stanze quotidiane con personalit\u00e0.",
      "bio.p2": "Ogni opera \u00e8 sviluppata con un obiettivo preciso: essere immediatamente comprensibile, coinvolgente sul piano emotivo e pronta a dare carattere a una parete senza appesantire lo spazio. La galleria unisce arte commerciale, stampe decorative, temi di tendenza e una presentazione visiva pulita in stili come arte da cucina, decorazione per bagno, stampe farmhouse, arte cristiana, poster ispirati al Giappone, illustrazioni di animali, arte da coffee bar e tipografia audace.",
      "bio.p3": "Luminare Gallery \u00e8 pensata per chi vuole un\u2019arte immediata, leggibile e facile da inserire in case vere. L\u2019attenzione non \u00e8 sul linguaggio delle gallerie d\u2019\u00e9lite, ma su opere che i clienti possono facilmente immaginare nella propria cucina, bagno, ufficio, camera da letto, corridoio, angolo di preghiera o coffee bar.",
      "bio.p4": "Ogni pezzo viene selezionato e curato con attenzione alla composizione, al contrasto, alla leggibilit\u00e0, alla qualit\u00e0 di stampa e alla compatibilit\u00e0 con gli interni. L\u2019obiettivo \u00e8 semplice: creare arte da parete che sia bella online, funzioni bene negli spazi reali e aiuti le persone a dare alle proprie stanze pi\u00f9 calore, ironia, fede, fascino o identit\u00e0 visiva.",
      "bio.p5": "Luminare Gallery offre arte decorativa da parete per chi vuole pareti pi\u00f9 personali, pi\u00f9 espressive e pi\u00f9 vive.",
      "contact.eyebrow": "Contatto", "contact.title": "Scrivici.",
      "contact.subtitle": "Domande, commissioni o vuoi semplicemente salutarci? Ci fa piacere sentirti.",
      "footer.contact": "Contatto:", "footer.etsy": "Shop Etsy",
      "footer.shop": "Shop", "footer.about": "Chi siamo",
      "footer.privacy": "Privacy Policy", "footer.terms": "Termini di Servizio",
      "about.eyebrow": "Chi siamo", "about.title": "Chi \u00e8 Luminare Gallery",
      "collections.page.eyebrow": "Sfoglia", "collections.page.title": "Tutte le Collezioni",
      "cat.digital-download": "Download Digitale",
      "badge.digital": "\u2b07 Download Digitale", "badge.print": "\ud83d\uddbc Stampa via Gelato"
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
      "bio.eyebrow": "Nosotros", "bio.title": "La historia de Luminare Gallery.",
      "bio.p1": "Luminare Gallery es un estudio de arte mural enfocado en l\u00e1minas accesibles y visualmente impactantes, dise\u00f1adas para hogares modernos, interiores acogedores, espacios creativos y habitaciones cotidianas con personalidad.",
      "bio.p2": "Cada obra se desarrolla con un prop\u00f3sito claro: ser f\u00e1cil de entender a primera vista, emocionalmente atractiva y lista para dar car\u00e1cter a una pared sin complicar el espacio. La galer\u00eda combina arte mural comercial, l\u00e1minas decorativas, temas de tendencia y una presentaci\u00f3n visual limpia en estilos como arte de cocina, decoraci\u00f3n de ba\u00f1o, l\u00e1minas farmhouse, arte cristiano, p\u00f3sters de inspiraci\u00f3n japonesa, ilustraciones de animales, arte de caf\u00e9 y piezas de tipograf\u00eda impactante.",
      "bio.p3": "Luminare Gallery est\u00e1 dise\u00f1ada para personas que quieren un arte inmediato, legible y f\u00e1cil de colocar en hogares reales. El enfoque no est\u00e1 en el lenguaje de galer\u00edas distantes, sino en obras que los clientes puedan imaginar f\u00e1cilmente en su cocina, ba\u00f1o, oficina, dormitorio, pasillo, rinc\u00f3n de oraci\u00f3n o caf\u00e9 bar.",
      "bio.p4": "Cada pieza se selecciona y prepara con atenci\u00f3n a la composici\u00f3n, el contraste, la legibilidad, la calidad de impresi\u00f3n y la compatibilidad con los interiores. El objetivo es sencillo: crear arte mural que se vea bien en l\u00ednea, funcione bien en espacios reales y ayude a las personas a dar a sus habitaciones m\u00e1s calidez, humor, fe, encanto o identidad visual.",
      "bio.p5": "Luminare Gallery ofrece arte mural decorativo para clientes que quieren que sus paredes se sientan m\u00e1s personales, m\u00e1s expresivas y m\u00e1s vivas.",
      "contact.eyebrow": "Contacto", "contact.title": "Ponte en contacto.",
      "contact.subtitle": "\u00bfPreguntas, encargos o simplemente quieres saludar? Nos encanta saber de ti.",
      "footer.contact": "Contacto:", "footer.etsy": "Tienda Etsy",
      "footer.shop": "Tienda", "footer.about": "Nosotros",
      "footer.privacy": "Pol\u00edtica de Privacidad", "footer.terms": "T\u00e9rminos de Servicio",
      "about.eyebrow": "Nosotros", "about.title": "Sobre Luminare Gallery",
      "collections.page.eyebrow": "Explorar", "collections.page.title": "Todas las Colecciones",
      "cat.digital-download": "Descarga Digital",
      "badge.digital": "\u2b07 Descarga Digital", "badge.print": "\ud83d\uddbc Impresi\u00f3n via Gelato"
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
      "bio.eyebrow": "\u00dcber uns", "bio.title": "Die Geschichte von Luminare Gallery.",
      "bio.p1": "Luminare Gallery ist ein Wandkunst-Studio, das sich auf zug\u00e4ngliche und visuell eindrucksvolle Drucke spezialisiert, die f\u00fcr moderne Wohnr\u00e4ume, gem\u00fctliche Interieurs, kreative R\u00e4ume und Alltagszimmer mit Pers\u00f6nlichkeit gestaltet wurden.",
      "bio.p2": "Jedes Kunstwerk wird mit einem klaren Zweck entwickelt: auf den ersten Blick verst\u00e4ndlich zu sein, emotional ansprechend und bereit, einer Wand Charakter zu verleihen, ohne den Raum zu \u00fcberladen. Die Galerie vereint kommerzielle Wandkunst, dekorative Drucke, trendorientierte Themen und eine klare visuelle Pr\u00e4sentation in Stilen wie K\u00fcchenkunst, Badezimmerdekoration, Farmhouse-Drucke, christliche Wandkunst, japanisch inspirierte Poster, Tierillustrationen, Coffee-Bar-Kunst und mutige Typografiest\u00fccke.",
      "bio.p3": "Luminare Gallery ist f\u00fcr Menschen gemacht, die Kunst wollen, die unmittelbar, lesbar und leicht in echten Wohnr\u00e4umen zu platzieren ist. Der Fokus liegt nicht auf der Sprache distanzierter Galerien, sondern auf Kunstwerken, die Kunden sich leicht in ihrer K\u00fcche, ihrem Badezimmer, B\u00fcro, Schlafzimmer, Flur, Gebetsecke oder Coffee-Bar vorstellen k\u00f6nnen.",
      "bio.p4": "Jedes St\u00fcck wird mit Aufmerksamkeit f\u00fcr Komposition, Kontrast, Lesbarkeit, Druckqualit\u00e4t und Innenraumkompatibilit\u00e4t ausgew\u00e4hlt und vorbereitet. Das Ziel ist einfach: Wandkunst zu schaffen, die online gut aussieht, in echten R\u00e4umen gut funktioniert und Menschen hilft, ihren Zimmern mehr W\u00e4rme, Humor, Glauben, Charme oder visuelle Identit\u00e4t zu geben.",
      "bio.p5": "Luminare Gallery bietet dekorative Wandkunst f\u00fcr Kunden, die m\u00f6chten, dass sich ihre W\u00e4nde pers\u00f6nlicher, ausdrucksvoller und lebendiger anf\u00fchlen.",
      "contact.eyebrow": "Kontakt", "contact.title": "Schreib uns.",
      "contact.subtitle": "Fragen, Auftr\u00e4ge oder einfach Hallo sagen? Wir freuen uns von dir zu h\u00f6ren.",
      "footer.contact": "Kontakt:", "footer.etsy": "Etsy-Shop",
      "footer.shop": "Shop", "footer.about": "\u00dcber uns",
      "footer.privacy": "Datenschutz", "footer.terms": "Nutzungsbedingungen",
      "about.eyebrow": "\u00dcber uns", "about.title": "\u00dcber Luminare Gallery",
      "collections.page.eyebrow": "St\u00f6bern", "collections.page.title": "Alle Kollektionen",
      "cat.digital-download": "Digitaler Download",
      "badge.digital": "\u2b07 Digitaler Download", "badge.print": "\ud83d\uddbc Druck via Gelato"
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
      "bio.eyebrow": "\u00c0 propos", "bio.title": "L\u2019histoire de Luminare Gallery.",
      "bio.p1": "Luminare Gallery est un studio d\u2019art mural sp\u00e9cialis\u00e9 dans des impressions accessibles et visuellement saisissantes, con\u00e7ues pour les maisons modernes, les int\u00e9rieurs chaleureux, les espaces cr\u00e9atifs et les pi\u00e8ces du quotidien avec de la personnalit\u00e9.",
      "bio.p2": "Chaque \u0153uvre est d\u00e9velopp\u00e9e avec un objectif pr\u00e9cis\u00a0: \u00eatre facile \u00e0 comprendre au premier regard, \u00e9motionnellement engageante et pr\u00eate \u00e0 apporter du caract\u00e8re \u00e0 un mur sans surcharger l\u2019espace. La galerie allie art mural commercial, impressions d\u00e9coratives, th\u00e8mes tendance et une pr\u00e9sentation visuelle claire dans des styles tels que l\u2019art de cuisine, la d\u00e9coration de salle de bain, les prints farmhouse, l\u2019art chr\u00e9tien, les affiches d\u2019inspiration japonaise, les illustrations animali\u00e8res, l\u2019art de coffee bar et les pi\u00e8ces typographiques audacieuses.",
      "bio.p3": "Luminare Gallery est con\u00e7ue pour les personnes qui veulent un art imm\u00e9diat, lisible et facile \u00e0 int\u00e9grer dans de vrais int\u00e9rieurs. L\u2019accent n\u2019est pas sur le langage des galeries distantes, mais sur des \u0153uvres que les clients peuvent facilement imaginer dans leur cuisine, salle de bain, bureau, chambre, couloir, coin pri\u00e8re ou coffee bar.",
      "bio.p4": "Chaque pi\u00e8ce est s\u00e9lectionn\u00e9e et pr\u00e9par\u00e9e avec une attention port\u00e9e \u00e0 la composition, au contraste, \u00e0 la lisibilit\u00e9, \u00e0 la qualit\u00e9 d\u2019impression et \u00e0 la compatibilit\u00e9 avec les int\u00e9rieurs. L\u2019objectif est simple\u00a0: cr\u00e9er de l\u2019art mural qui soit beau en ligne, fonctionne bien dans les espaces r\u00e9els et aide les gens \u00e0 donner \u00e0 leurs pi\u00e8ces plus de chaleur, d\u2019humour, de foi, de charme ou d\u2019identit\u00e9 visuelle.",
      "bio.p5": "Luminare Gallery propose de l\u2019art mural d\u00e9coratif pour les clients qui veulent que leurs murs se sentent plus personnels, plus expressifs et plus vivants.",
      "contact.eyebrow": "Contact", "contact.title": "Contactez-nous.",
      "contact.subtitle": "Questions, commandes ou envie de dire bonjour\u00a0? Nous serions ravis de vous lire.",
      "footer.contact": "Contact\u00a0:", "footer.etsy": "Boutique Etsy",
      "footer.shop": "Boutique", "footer.about": "\u00c0 propos",
      "footer.privacy": "Politique de confidentialit\u00e9", "footer.terms": "Conditions d\u2019utilisation",
      "about.eyebrow": "\u00c0 propos", "about.title": "\u00c0 propos de Luminare Gallery",
      "collections.page.eyebrow": "Parcourir", "collections.page.title": "Toutes les Collections",
      "cat.digital-download": "T\u00e9l\u00e9chargement Num\u00e9rique",
      "badge.digital": "\u2b07 T\u00e9l\u00e9chargement", "badge.print": "\ud83d\uddbc Impression via Gelato"
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
