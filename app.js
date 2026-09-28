/* Southern Exchange Kitchen — truck site */
(function () {
  "use strict";

  var SUBS = {
    combos: "Any sandwich + 4 oz side + drink",
    dinners: "2 sides + Texas toast",
    bigback: "Jumbo russet with cheese, sour cream, scallions & BBQ drizzle",
    special: "Ask about today\u2019s special \u2014 ribs (regular & jerk) when we run \u2019em"
  };

  /* Menu tabs: filter the pre-rendered cards (menu works even if this script is cached/stale) */
  var tabsEl = document.getElementById("menuTabs");
  var gridEl = document.getElementById("menuGrid");
  var subEl = document.getElementById("menuSub");
  if (tabsEl && gridEl) {
    var cards = Array.prototype.slice.call(gridEl.querySelectorAll(".menu-card"));
    var tabs = Array.prototype.slice.call(tabsEl.querySelectorAll(".menu-tab"));
    tabsEl.addEventListener("click", function (e) {
      var t = e.target;
      var b = t.closest ? t.closest(".menu-tab") : null;
      if (!b || b.classList.contains("active")) return;
      tabs.forEach(function (x) { x.classList.toggle("active", x === b); });
      var sec = b.getAttribute("data-sec");
      if (subEl) subEl.textContent = SUBS[sec] || "";
      cards.forEach(function (c) {
        if (c.getAttribute("data-sec") === sec) {
          c.removeAttribute("hidden");
        } else {
          c.setAttribute("hidden", "");
        }
      });
    });
  }

  /* Mobile nav */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.querySelector(".site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () { siteNav.classList.toggle("open"); });
    Array.prototype.forEach.call(siteNav.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () { siteNav.classList.remove("open"); });
    });
  }
})();
