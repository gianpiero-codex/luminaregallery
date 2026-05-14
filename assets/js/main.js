(function () {
  "use strict";

  // ── Hamburger menu ──────────────────────────────────────────────────────
  var toggle = document.getElementById("nav-toggle");
  var nav    = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    document.addEventListener("click", function (e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  // ── Language dropdown ───────────────────────────────────────────────────
  var langToggle   = document.getElementById("lang-toggle");
  var langDropdown = document.getElementById("lang-dropdown");
  var langSwitcher = document.getElementById("lang-switcher");

  if (langToggle && langDropdown) {
    langToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = langToggle.getAttribute("aria-expanded") === "true";
      langToggle.setAttribute("aria-expanded", String(!open));
      langDropdown.classList.toggle("is-open", !open);
    });

    langDropdown.addEventListener("click", function (e) {
      var li = e.target.closest("[data-lang]");
      if (!li) return;
      var lang = li.getAttribute("data-lang");
      if (window.I18N) window.I18N.setLang(lang);
      langToggle.setAttribute("aria-expanded", "false");
      langDropdown.classList.remove("is-open");
    });

    document.addEventListener("click", function (e) {
      if (langSwitcher && !langSwitcher.contains(e.target)) {
        langToggle.setAttribute("aria-expanded", "false");
        langDropdown.classList.remove("is-open");
      }
    });
  }

  // ── Social icons helper ─────────────────────────────────────────────────
  function buildSocialIcons(container, size) {
    if (!container) return;
    var cfg = window.SITE_CONFIG;
    if (!cfg || !cfg.socials) return;

    cfg.socials.forEach(function (s) {
      var a    = document.createElement("a");
      a.href   = s.url;
      a.target = "_blank";
      a.rel    = "noopener noreferrer";
      a.className = "social-icon-link";
      a.setAttribute("aria-label", s.label);

      var img    = document.createElement("img");
      img.src    = s.icon;
      img.alt    = s.label;
      img.width  = size;
      img.height = size;
      img.loading = "lazy";

      a.appendChild(img);
      container.appendChild(a);
    });
  }

  // Footer social (all pages)
  buildSocialIcons(document.getElementById("footer-social"), 28);
  // Homepage social section
  buildSocialIcons(document.getElementById("social-icons-row"), 52);

  // ── Filter bar (shop page) ──────────────────────────────────────────────
  var filterBar = document.getElementById("filter-bar");
  if (filterBar) {
    var cfg = window.SITE_CONFIG;
    if (cfg && cfg.categories) {
      var allBtn = document.createElement("button");
      allBtn.type = "button";
      allBtn.className = "filter-button is-active";
      allBtn.dataset.filter = "all";
      allBtn.setAttribute("data-i18n", "filter.all");
      allBtn.textContent = window.I18N ? window.I18N.t("filter.all") : "All";
      filterBar.appendChild(allBtn);

      cfg.categories.forEach(function (cat) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-button";
        btn.dataset.filter = cat.slug;
        btn.setAttribute("data-i18n", "cat." + cat.slug);
        btn.textContent = window.I18N ? window.I18N.t("cat." + cat.slug) : cat.label;
        filterBar.appendChild(btn);
      });
    }

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var selected = btn.dataset.filter;

      filterBar.querySelectorAll(".filter-button").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      var shopGrid = document.getElementById("shop-grid");
      if (!shopGrid) return;
      shopGrid.querySelectorAll(".product-card").forEach(function (card) {
        card.hidden = selected !== "all" && card.dataset.category !== selected;
      });
    });
  }

  // ── Load products ───────────────────────────────────────────────────────
  if (window.LuminareProducts) {
    var featuredGrid = document.getElementById("featured-grid");
    if (featuredGrid) {
      LuminareProducts.loadProducts(featuredGrid, 3);
    }

    var shopGrid = document.getElementById("shop-grid");
    if (shopGrid) {
      LuminareProducts.loadProducts(shopGrid, null).then(function () {
        // Apply ?filter= param after products are loaded
        var params = new URLSearchParams(window.location.search);
        var filterParam = params.get("filter");
        if (filterParam && filterBar) {
          var btn = filterBar.querySelector('[data-filter="' + filterParam + '"]');
          if (btn) btn.click();
        }
      });
    }
  }

})();
