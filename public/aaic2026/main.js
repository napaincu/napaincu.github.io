// Everything interactive on the page. Loaded at the end of <body>, so the DOM
// is ready and no DOMContentLoaded wrapper is needed.
//
// The page is fully readable with this file missing or blocked — only the
// countdown, the theme switch and the mobile menu depend on it.
(function () {
  "use strict";

  var FINAL = new Date("2026-11-21T09:00:00+08:00").getTime();
  var HEADER_OFFSET = 80;
  var SCROLL_KEY = "langSwitchAnchor";

  /* ---------- header: condense once the reader leaves the hero ---------- */

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */

  var nav = document.getElementById("primary-nav");
  var menuButton = document.querySelector(".menu-button");
  if (nav && menuButton) {
    var setMenu = function (open) {
      nav.classList.toggle("open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      // The nav overlay covers the viewport; stop the page scrolling behind it.
      document.body.style.overflow = open ? "hidden" : "";
    };
    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* ---------- theme ---------- */

  // The <head> script already picked the theme before first paint; the markup
  // ships with the light-mode glyph, so bring the button in line with reality.
  var themeButton = document.querySelector(".theme-toggle");
  if (themeButton) {
    var glyph = themeButton.querySelector("span") || themeButton;
    var paintTheme = function (theme) {
      document.documentElement.dataset.theme = theme;
      themeButton.setAttribute("aria-pressed", String(theme === "dark"));
      glyph.textContent = theme === "dark" ? "☀" : "☾";
    };
    paintTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    themeButton.addEventListener("click", function () {
      var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      paintTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        // Private browsing can refuse writes; the theme still applies for this visit.
      }
    });
  }

  /* ---------- countdown to the final ---------- */

  var counts = document.querySelectorAll(".countdown .count strong");
  if (counts.length === 4) {
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var tick = function () {
      var diff = Math.max(0, FINAL - Date.now());
      counts[0].textContent = pad(Math.floor(diff / 86400000));
      counts[1].textContent = pad(Math.floor((diff / 3600000) % 24));
      counts[2].textContent = pad(Math.floor((diff / 60000) % 60));
      counts[3].textContent = pad(Math.floor((diff / 1000) % 60));
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- schedule rail progress ---------- */

  // Marks every stage already past, highlights the next one, and moves the
  // lime overlay continuously between milestone dots according to the current
  // date. Using the rendered dot positions keeps the progress aligned even
  // though the desktop rail intentionally leaves a little room at the end.
  var rail = document.querySelector(".rail");
  if (rail) {
    var stages = Array.prototype.slice.call(rail.querySelectorAll("article[data-date]"));
    var updateRailProgress = function () {
      if (!stages.length) return;

      var now = Date.now();
      var dates = stages.map(function (stage) {
        // End of that day in Taipei: a deadline dated today has not passed yet.
        return new Date(stage.dataset.date + "T23:59:59+08:00").getTime();
      });
      var passed = -1;

      stages.forEach(function (stage, i) {
        stage.classList.remove("done", "next");
        if (dates[i] <= now) {
          stage.classList.add("done");
          passed = i;
        } else if (passed === i - 1) {
          stage.classList.add("next"); // the first stage still ahead
        }
      });

      var railRect = rail.getBoundingClientRect();
      var centers = stages.map(function (stage) {
        var dot = stage.querySelector(".dot").getBoundingClientRect();
        return dot.left + dot.width / 2 - railRect.left;
      });
      var progressPx = 0;

      if (now >= dates[dates.length - 1]) {
        progressPx = centers[centers.length - 1];
      } else if (now > dates[0]) {
        for (var i = 0; i < dates.length - 1; i += 1) {
          if (now <= dates[i + 1]) {
            var span = dates[i + 1] - dates[i];
            var ratio = span ? (now - dates[i]) / span : 0;
            ratio = Math.max(0, Math.min(1, ratio));
            progressPx = centers[i] + (centers[i + 1] - centers[i]) * ratio;
            break;
          }
        }
      } else if (passed >= 0) {
        progressPx = centers[passed];
      }

      var progress = railRect.width ? (progressPx / railRect.width) * 100 : 0;
      rail.style.setProperty("--progress", Math.max(0, Math.min(100, progress)) + "%");
    };

    updateRailProgress();
    window.addEventListener("resize", updateRailProgress, { passive: true });
    window.setInterval(updateRailProgress, 60000);
  }

  /* ---------- scroll reveal ---------- */

  var revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target); // reveal once, then stop watching
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });

    /* ---------- active nav item ---------- */

    var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            var on = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("active", on);
            if (on) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      // Fires when a section crosses the middle band of the viewport.
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ["about", "challenge", "criteria", "awards", "timeline", "faq"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  } else {
    // No IntersectionObserver: show everything rather than leave it invisible.
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- keep the reader's place when switching languages ---------- */

  // Switching locales loads a different document, so the browser would drop the
  // reader at the top. Both pages render the same blocks in the same order, but
  // Chinese and English copy differ in height — so instead of a pixel offset we
  // remember which block they were in and how far through it, then land on the
  // same spot in the other language.
  var blocks = function () {
    return Array.prototype.slice.call(document.querySelectorAll("main > section, main > footer"));
  };

  var langLink = document.querySelector(".header-tools a.tool");
  if (langLink) {
    langLink.addEventListener("click", function () {
      var y = window.scrollY + HEADER_OFFSET;
      var index = 0;
      var ratio = 0;
      blocks().forEach(function (block, i) {
        var rect = block.getBoundingClientRect();
        var top = rect.top + window.scrollY;
        if (y < top) return;
        index = i;
        ratio = rect.height ? Math.min(1, (y - top) / rect.height) : 0;
      });
      try {
        sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ index: index, ratio: ratio }));
      } catch (e) {
        // Quota failures just mean we land at the top, as a plain link would.
      }
    });
  }

  (function restoreAnchor() {
    var raw;
    try {
      raw = sessionStorage.getItem(SCROLL_KEY);
      if (raw) sessionStorage.removeItem(SCROLL_KEY);
    } catch (e) {
      return;
    }
    if (!raw) return;

    var anchor;
    try {
      anchor = JSON.parse(raw);
    } catch (e) {
      return;
    }

    var block = blocks()[anchor.index];
    if (!block) return;
    var rect = block.getBoundingClientRect();
    var top = rect.top + window.scrollY + rect.height * anchor.ratio - HEADER_OFFSET;
    // "instant" overrides the page's smooth scroll-behavior, so the new language
    // is simply already in the right place rather than animating there.
    window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  })();
})();
