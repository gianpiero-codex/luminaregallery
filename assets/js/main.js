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

  // ── Pagination state ────────────────────────────────────────────────────
  var PAGE_SIZE      = 12;
  var _currentFilter = "all";
  var _currentPage   = 0;
  var _shopCards     = [];

  function getFilteredCards() {
    if (_currentFilter === "all") return _shopCards;
    return _shopCards.filter(function (c) {
      return c.dataset.category === _currentFilter;
    });
  }

  function applyPage(skipScroll) {
    var filtered   = getFilteredCards();
    var totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (_currentPage >= totalPages) _currentPage = totalPages - 1;
    var start = _currentPage * PAGE_SIZE;

    _shopCards.forEach(function (c) { c.hidden = true; });
    filtered.slice(start, start + PAGE_SIZE).forEach(function (c) { c.hidden = false; });
    updatePagination(totalPages);

    if (!skipScroll) {
      var sg = document.getElementById("shop-grid");
      if (sg) sg.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function updatePagination(totalPages) {
    var paginationEl = document.getElementById("shop-pagination");
    if (!paginationEl) return;
    if (totalPages <= 1) { paginationEl.hidden = true; return; }
    paginationEl.hidden = false;
    var prevBtn = paginationEl.querySelector(".page-prev");
    var nextBtn = paginationEl.querySelector(".page-next");
    var info    = paginationEl.querySelector(".page-info");
    if (prevBtn) prevBtn.disabled = _currentPage === 0;
    if (nextBtn) nextBtn.disabled = _currentPage >= totalPages - 1;
    if (info)    info.textContent = (_currentPage + 1) + " / " + totalPages;
  }

  // ── Build filter buttons ────────────────────────────────────────────────
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
      _currentFilter = btn.dataset.filter;
      _currentPage   = 0;
      filterBar.querySelectorAll(".filter-button").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      if (_shopCards.length) applyPage();
    });
  }

  // ── Build pagination controls ───────────────────────────────────────────
  var paginationEl = document.getElementById("shop-pagination");
  if (paginationEl) {
    paginationEl.innerHTML =
      '<button type="button" class="page-btn page-prev" aria-label="Previous page">\u2190 Prev</button>' +
      '<span class="page-info"></span>' +
      '<button type="button" class="page-btn page-next" aria-label="Next page">Next \u2192</button>';

    paginationEl.querySelector(".page-prev").addEventListener("click", function () {
      if (_currentPage > 0) { _currentPage--; applyPage(); }
    });
    paginationEl.querySelector(".page-next").addEventListener("click", function () {
      var filtered = getFilteredCards();
      var totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
      if (_currentPage < totalPages - 1) { _currentPage++; applyPage(); }
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
        _shopCards = Array.from(shopGrid.querySelectorAll(".product-card"));
        applyPage(true);
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

  // ── Auto-refresh ogni 5 minuti ─────────────────────────────────────
  setInterval(function () {
    if (!window.LuminareProducts) return;
    var opts = { silent: true };
    var sg = document.getElementById("shop-grid");
    var fg = document.getElementById("featured-grid");
    if (sg) {
      window.LuminareProducts.loadProducts(sg, null, opts).then(function () {
        _shopCards = Array.from(sg.querySelectorAll(".product-card"));
        applyPage(true);
      });
    }
    if (fg) window.LuminareProducts.loadProducts(fg, 3, opts);
  }, 5 * 60 * 1000);

})();
