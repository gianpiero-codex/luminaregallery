(function () {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;

  var API_URL = "https://script.google.com/macros/s/AKfycbzgI89EH9Uc51H56u3dcKVElcC6o5b3wc-DveioXm13-IIRUxIXeA7cDnFLgN4KWWkUvQ/exec";
  var SESSION_KEY = "luminare_visit_counted";
  var CONSENT_KEY = "luminare_cookie_consent_v1";
  var CONSENT_VERSION = 1;

  var COPY = {
    en: {
      title: "Cookie & privacy choices",
      text: "We use essential browser storage to remember your choices. With your consent, a lightweight visitor counter sends page path, page title, domain and timezone to our Google Apps Script endpoint for aggregated site statistics.",
      accept: "Accept analytics",
      reject: "Reject analytics",
      privacy: "Privacy policy",
      settings: "Cookie settings",
      label: "Cookie and privacy preferences"
    },
    it: {
      title: "Cookie e preferenze privacy",
      text: "Usiamo archiviazione essenziale del browser per ricordare le tue scelte. Con il tuo consenso, un contatore visite leggero invia percorso pagina, titolo, dominio e fuso orario al nostro endpoint Google Apps Script per statistiche aggregate del sito.",
      accept: "Accetta preferenze",
      reject: "Rifiuta analytics",
      privacy: "Privacy policy",
      settings: "Impostazioni cookie",
      label: "Preferenze cookie e privacy"
    },
    es: {
      title: "Cookies y privacidad",
      text: "Usamos almacenamiento esencial del navegador para recordar tus opciones. Con tu consentimiento, un contador ligero envía la ruta y el título de la página, el dominio y la zona horaria a nuestro endpoint de Google Apps Script para estadísticas agregadas.",
      accept: "Aceptar analítica",
      reject: "Rechazar analítica",
      privacy: "Política de privacidad",
      settings: "Configurar cookies",
      label: "Preferencias de cookies y privacidad"
    },
    fr: {
      title: "Cookies et confidentialité",
      text: "Nous utilisons le stockage essentiel du navigateur pour mémoriser vos choix. Avec votre consentement, un compteur léger envoie le chemin et le titre de la page, le domaine et le fuseau horaire à notre endpoint Google Apps Script pour des statistiques agrégées.",
      accept: "Accepter l’analyse",
      reject: "Refuser l’analyse",
      privacy: "Politique de confidentialité",
      settings: "Paramètres des cookies",
      label: "Préférences cookies et confidentialité"
    },
    de: {
      title: "Cookies und Datenschutz",
      text: "Wir verwenden notwendigen Browser-Speicher, um Ihre Auswahl zu speichern. Mit Ihrer Einwilligung sendet ein einfacher Besucherzähler Seitenpfad, Seitentitel, Domain und Zeitzone an unseren Google-Apps-Script-Endpunkt für aggregierte Website-Statistiken.",
      accept: "Analytics akzeptieren",
      reject: "Analytics ablehnen",
      privacy: "Datenschutzerklärung",
      settings: "Cookie-Einstellungen",
      label: "Cookie- und Datenschutzeinstellungen"
    }
  };

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }

  function getLanguage() {
    var saved = safeGet("luminare_lang");
    var htmlLang = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
    var browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (COPY[saved]) return saved;
    if (COPY[htmlLang]) return htmlLang;
    if (COPY[browserLang]) return browserLang;
    return "en";
  }

  function getConsent() {
    var raw = safeGet(CONSENT_KEY);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.version === CONSENT_VERSION && typeof parsed.analytics === "boolean") return parsed;
    } catch (e) {}
    return null;
  }

  function saveConsent(analytics) {
    var value = {
      version: CONSENT_VERSION,
      analytics: !!analytics,
      updated_at: new Date().toISOString()
    };
    safeSet(CONSENT_KEY, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("luminare:consent-changed", { detail: value }));
    return value;
  }

  function injectStyles() {
    if (document.getElementById("luminare-cookie-consent-styles")) return;
    var style = document.createElement("style");
    style.id = "luminare-cookie-consent-styles";
    style.textContent =
      ".cookie-consent{position:fixed;left:18px;right:18px;bottom:18px;z-index:9999;max-width:980px;margin:0 auto;background:#fff;color:#1f1f1f;border:1px solid #d8cdbd;box-shadow:0 18px 45px rgba(31,31,31,.22);padding:20px;border-radius:12px;font-family:Arial,Helvetica,sans-serif}" +
      ".cookie-consent[hidden]{display:none}" +
      ".cookie-consent__row{display:flex;gap:20px;align-items:flex-end;justify-content:space-between}" +
      ".cookie-consent__copy{max-width:650px}" +
      ".cookie-consent h2{font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.2;margin:0 0 8px}" +
      ".cookie-consent p{font-size:14px;line-height:1.55;margin:0;color:#5f5a53}" +
      ".cookie-consent a{text-decoration:underline;font-weight:700}" +
      ".cookie-consent__actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;min-width:260px}" +
      ".cookie-consent__btn{min-height:42px;padding:9px 14px;border:1px solid #8a6a43;border-radius:6px;background:#fff;color:#5e472b;font:700 14px Arial,Helvetica,sans-serif;cursor:pointer}" +
      ".cookie-consent__btn--primary{background:#8a6a43;color:#fff}" +
      ".cookie-consent__btn:hover,.cookie-consent__btn:focus-visible{outline:2px solid #5e472b;outline-offset:2px}" +
      ".cookie-settings{position:fixed;left:16px;bottom:16px;z-index:9998;border:1px solid #8a6a43;border-radius:999px;background:#fff;color:#5e472b;padding:8px 12px;font:700 12px Arial,Helvetica,sans-serif;box-shadow:0 6px 18px rgba(31,31,31,.16);cursor:pointer}" +
      ".cookie-settings[hidden]{display:none}" +
      "@media(max-width:700px){.cookie-consent{left:10px;right:10px;bottom:10px;padding:16px}.cookie-consent__row{align-items:stretch;flex-direction:column}.cookie-consent__actions{justify-content:stretch;min-width:0}.cookie-consent__btn{flex:1 1 140px}.cookie-settings{left:10px;bottom:10px}}";
    document.head.appendChild(style);
  }

  var banner = null;
  var settingsButton = null;

  function renderConsentUi(forceOpen) {
    injectStyles();
    var lang = getLanguage();
    var copy = COPY[lang] || COPY.en;

    if (!banner) {
      banner = document.createElement("section");
      banner.className = "cookie-consent";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-modal", "false");
      banner.innerHTML =
        '<div class="cookie-consent__row">' +
          '<div class="cookie-consent__copy">' +
            '<h2 data-cookie-title></h2>' +
            '<p><span data-cookie-text></span> <a href="/privacy.html" data-cookie-privacy></a></p>' +
          '</div>' +
          '<div class="cookie-consent__actions">' +
            '<button type="button" class="cookie-consent__btn" data-cookie-reject></button>' +
            '<button type="button" class="cookie-consent__btn cookie-consent__btn--primary" data-cookie-accept></button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(banner);
      banner.querySelector("[data-cookie-reject]").addEventListener("click", function () {
        saveConsent(false);
        banner.hidden = true;
        settingsButton.hidden = false;
      });
      banner.querySelector("[data-cookie-accept]").addEventListener("click", function () {
        saveConsent(true);
        banner.hidden = true;
        settingsButton.hidden = false;
        requestCounter();
      });
    }

    if (!settingsButton) {
      settingsButton = document.createElement("button");
      settingsButton.type = "button";
      settingsButton.className = "cookie-settings";
      settingsButton.addEventListener("click", function () {
        renderConsentUi(true);
        banner.querySelector("[data-cookie-reject]").focus();
      });
      document.body.appendChild(settingsButton);
    }

    banner.setAttribute("aria-label", copy.label);
    banner.querySelector("[data-cookie-title]").textContent = copy.title;
    banner.querySelector("[data-cookie-text]").textContent = copy.text;
    banner.querySelector("[data-cookie-privacy]").textContent = copy.privacy;
    banner.querySelector("[data-cookie-reject]").textContent = copy.reject;
    banner.querySelector("[data-cookie-accept]").textContent = copy.accept;
    settingsButton.textContent = copy.settings;
    settingsButton.setAttribute("aria-label", copy.settings);

    var consent = getConsent();
    banner.hidden = !forceOpen && !!consent;
    settingsButton.hidden = forceOpen || !consent;
  }

  function getDomain() {
    var host = window.location.hostname || "luminaregallery.com";
    if (host === "localhost" || host === "127.0.0.1") return "luminaregallery.com";
    return host.replace(/^www\./, "");
  }

  function getTimezone() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; }
    catch (e) { return "UTC"; }
  }

  function hasSessionVisit() {
    try { return sessionStorage.getItem(SESSION_KEY) === "1"; }
    catch (e) { return false; }
  }

  function markSessionVisit() {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
  }

  function requestCounter() {
    var consent = getConsent();
    if (!consent || consent.analytics !== true || hasSessionVisit()) return;
    markSessionVisit();
    return fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      body: JSON.stringify({
        domain: getDomain(),
        timezone: getTimezone(),
        page_path: window.location.pathname || "/",
        page_title: document.title || "Luminare Gallery"
      })
    });
  }

  function init() {
    renderConsentUi(false);
    var request = requestCounter();
    if (request && request["catch"]) request["catch"](function () {});
  }

  window.LuminareCookieConsent = {
    get: getConsent,
    open: function () { renderConsentUi(true); },
    acceptAnalytics: function () { saveConsent(true); requestCounter(); },
    rejectAnalytics: function () { saveConsent(false); }
  };

  window.addEventListener("luminare:consent-changed", function (event) {
    if (event.detail && event.detail.analytics === true) requestCounter();
  });

  window.addEventListener("storage", function (event) {
    if (event.key === "luminare_lang" || event.key === CONSENT_KEY) renderConsentUi(false);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
