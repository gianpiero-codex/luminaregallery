(function () {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;

  var API_URL = "https://script.google.com/macros/s/AKfycbzgI89EH9Uc51H56u3dcKVElcC6o5b3wc-DveioXm13-IIRUxIXeA7cDnFLgN4KWWkUvQ/exec";
  var SESSION_KEY = "luminare_visit_counted";

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

  function requestCounter() {
    if (hasSessionVisit()) return;
    var domain = getDomain();

    markSessionVisit();
    return fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      body: JSON.stringify({
        domain: domain,
        timezone: getTimezone(),
        page_path: window.location.pathname || "/",
        page_title: document.title || "Luminare Gallery"
      })
    });
  }

  function init() {
    var request = requestCounter();
    if (request && request["catch"]) request["catch"](function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
