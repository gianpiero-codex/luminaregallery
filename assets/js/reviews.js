(function () {
  "use strict";

  var REVIEWS_URL = "/assets/data/reviews.json";
  var MAX_REVIEWS = 6;
  var MIN_STARS    = 4;
  var MIN_TEXT_LEN = 20;

  function stars(rating) {
    var s = "";
    for (var i = 1; i <= 5; i++) {
      s += i <= rating ? "★" : "☆";
    }
    return s;
  }

  function esc(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  function renderCard(review) {
    var card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML =
      '<div class="review-stars" aria-label="' + review.rating + ' out of 5 stars">' +
        stars(review.rating) +
      '</div>' +
      '<p class="review-text">' + esc(review.review) + '</p>' +
      '<p class="review-author">' + esc(review.reviewer_name || "Etsy customer") + '</p>';
    return card;
  }

  function init() {
    var section = document.getElementById("reviews-section");
    var grid    = document.getElementById("reviews-grid");
    if (!section || !grid) return;

    fetch(REVIEWS_URL + "?_t=" + Date.now())
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        var reviews = (data.reviews || [])
          .filter(function (r) {
            return r.rating >= MIN_STARS &&
                   r.review && r.review.length >= MIN_TEXT_LEN;
          })
          .slice(0, MAX_REVIEWS);

        if (!reviews.length) return; // keep section hidden

        var frag = document.createDocumentFragment();
        reviews.forEach(function (r) { frag.appendChild(renderCard(r)); });
        grid.appendChild(frag);
        section.removeAttribute("hidden");
        if (window.I18N) window.I18N.apply();
      })
      .catch(function () {
        // silently stay hidden — reviews section is optional
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
