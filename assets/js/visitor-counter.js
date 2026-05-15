(function () {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;

  var API_URL = "https://visitor.6developer.com/visit";
  var SESSION_KEY = "luminare_visit_counted";
  var LOCAL_KEY = "luminare_local_visit_count";

  function getDomain() {
    var host = window.location.hostname || "luminaregallery.com";
    if (host === "localhost" || host === "127.0.0.1") return "luminaregallery.com";
    return host.replace(/^www\./, "");
  }

  function getTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch (e) {
      return "UTC";
    }
  }

  function hasSessionVisit() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function markSessionVisit() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch (e) {
      // Counting still works without session storage; refreshes may count again.
    }
  }

  function formatCount(value) {
    var number = Number(value);
    if (!Number.isFinite(number)) return "—";
    return number.toLocaleString(document.documentElement.lang || "en");
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function updateDisplay(data) {
    setText("visitor-total", formatCount(data.totalCount));
    setText("visitor-today", formatCount(data.todayCount));
    setText("visitor-status", "Aggiornato");

    var dashboard = document.getElementById("visitor-dashboard-link");
    if (dashboard && data.dashboardUrl) {
      dashboard.href = data.dashboardUrl;
      dashboard.hidden = false;
    }
  }

  function fallbackDisplay() {
    var localCount = 1;
    try {
      localCount = Number(localStorage.getItem(LOCAL_KEY) || "0") + 1;
      localStorage.setItem(LOCAL_KEY, String(localCount));
    } catch (e) {
      localCount = 1;
    }

    setText("visitor-total", formatCount(localCount));
    setText("visitor-today", "—");
    setText("visitor-status", "Contatore online non disponibile");
  }

  function requestCounter() {
    var domain = getDomain();

    if (hasSessionVisit()) {
      return fetch(API_URL + "?domain=" + encodeURIComponent(domain), {
        method: "GET",
        cache: "no-store"
      });
    }

    markSessionVisit();
    return fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain: domain,
        timezone: getTimezone(),
        page_path: window.location.pathname || "/",
        page_title: document.title || "Luminare Gallery"
      })
    });
  }

  function init() {
    requestCounter()
      .then(function (response) {
        if (!response.ok) throw new Error("Visitor counter " + response.status);
        return response.json();
      })
      .then(updateDisplay)
      ["catch"](fallbackDisplay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
