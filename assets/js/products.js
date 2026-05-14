(function () {
  "use strict";

  var PRODUCTS_URL = "/assets/data/products.json";

  function slugify(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function esc(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  function renderCard(product) {
    var section     = product.section || "Wall Art";
    var catSlug     = slugify(section);
    var priceLabel  = product.price && parseFloat(product.price) > 0
      ? product.currency + " " + product.price
      : "View on Etsy";

    var article = document.createElement("article");
    article.className        = "product-card";
    article.dataset.category = catSlug;

    article.innerHTML = [
      '<a class="product-link" href="' + esc(product.url) + '"',
      '   target="_blank" rel="noopener noreferrer"',
      '   aria-label="' + esc(product.title) + ' \u2014 View on Etsy">',
      '  <div class="product-image">',
      '    <img src="' + esc(product.image_url) + '" alt="' + esc(product.title) + '" loading="lazy" />',
      '  </div>',
      '  <div class="product-body">',
      '    <p class="product-category">' + esc(section) + '</p>',
      '    <h3 class="product-title">' + esc(product.title) + '</h3>',
      '    <p class="product-price">' + esc(priceLabel) + '</p>',
      '    <span class="button button-small" aria-hidden="true" data-i18n="product.view_on_etsy">View on Etsy</span>',
      '  </div>',
      '</a>'
    ].join("\n");

    return article;
  }

  function renderSkeleton(count) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var el = document.createElement("article");
      el.className = "product-card product-card--skeleton";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML =
        '<div class="product-image skeleton-box"></div>' +
        '<div class="product-body">' +
          '<div class="skeleton-line skeleton-line--xs"></div>' +
          '<div class="skeleton-line"></div>' +
          '<div class="skeleton-line skeleton-line--sm"></div>' +
        '</div>';
      frag.appendChild(el);
    }
    return frag;
  }

  function loadProducts(container, limit) {
    if (!container) return Promise.resolve();

    var skCount = limit || 8;
    container.setAttribute("aria-busy", "true");
    container.appendChild(renderSkeleton(skCount));

    return fetch(PRODUCTS_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        container.innerHTML = "";
        container.setAttribute("aria-busy", "false");

        var products = (data.products || []).filter(function (p) {
          return p.image_url;
        });
        if (limit) products = products.slice(0, limit);

        if (!products.length) {
          var etsyUrl = (window.SITE_CONFIG || {}).etsyUrl || "https://www.etsy.com/shop/LuminareGallery";
          var i18n = window.I18N || { t: function (k) { return k; } };
          container.innerHTML =
            '<p class="products-empty">' + i18n.t('product.empty') + ' ' +
            '<a href="' + etsyUrl + '" target="_blank" rel="noopener">' + i18n.t('product.empty_link') + '</a></p>';
          return;
        }

        var frag = document.createDocumentFragment();
        products.forEach(function (p) { frag.appendChild(renderCard(p)); });
        container.appendChild(frag);
      })
      .catch(function (err) {
        console.error("LuminareProducts:", err);
        container.innerHTML = "";
        container.setAttribute("aria-busy", "false");
        var etsyUrl = (window.SITE_CONFIG || {}).etsyUrl || "https://www.etsy.com/shop/LuminareGallery";
        var i18n = window.I18N || { t: function (k) { return k; } };
        container.innerHTML =
          '<p class="products-error">' + i18n.t('product.error') + ' ' +
          '<a href="' + etsyUrl + '" target="_blank" rel="noopener">' + i18n.t('product.error_link') + '</a></p>';
      });
  }

  window.LuminareProducts = { loadProducts: loadProducts };
})();
