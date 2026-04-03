(function ($) {
  "use strict";

  function initPreloader() {
    var el = document.getElementById("page-preloader");
    var minMs = 450;
    var start = Date.now();
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      var wait = Math.max(0, minMs - (Date.now() - start));
      setTimeout(function () {
        document.body.classList.add("is-loaded");
        if (el) {
          el.setAttribute("aria-busy", "false");
          el.setAttribute("aria-hidden", "true");
        }
      }, wait);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      setTimeout(finish, 10000);
    }
  }

  initPreloader();

  function initHeader() {
    var $header = $("#site-header");
    if (!$header.length) return;

    var $toggle = $("#nav-toggle");
    var $overlay = $("#nav-overlay");

    var $navPanel = $("#site-nav");

    function syncNavAria() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        $navPanel.attr("aria-hidden", "false");
      } else if (!$header.hasClass("is-menu-open")) {
        $navPanel.attr("aria-hidden", "true");
      }
    }

    function closeMenu() {
      $header.removeClass("is-menu-open");
      $toggle.attr("aria-expanded", "false").attr("aria-label", "Ouvrir le menu de navigation");
      $("body").removeClass("nav-open");
      $overlay.attr("aria-hidden", "true");
      syncNavAria();
    }

    function openMenu() {
      $header.addClass("is-menu-open");
      $toggle.attr("aria-expanded", "true").attr("aria-label", "Fermer le menu de navigation");
      $("body").addClass("nav-open");
      $overlay.attr("aria-hidden", "false");
      $navPanel.attr("aria-hidden", "false");
    }

    syncNavAria();

    $toggle.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if ($header.hasClass("is-menu-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $overlay.on("click", closeMenu);

    $header.on("click", 'a[href^="#"]', function () {
      if (window.matchMedia("(max-width: 767px)").matches) {
        closeMenu();
      }
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape" && $header.hasClass("is-menu-open")) {
        closeMenu();
      }
    });

    $(window).on("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeMenu();
      }
      syncNavAria();
    });

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 16) {
        $header.addClass("site-header--scrolled");
      } else {
        $header.removeClass("site-header--scrolled");
      }
    });
  }

  function hideChariowDefaultTapButton() {
    var root = document.getElementById("chariow-widget");
    if (!root) return;

    var buttons = root.querySelectorAll("button.cw-button-base");
    buttons.forEach(function (btn) {
      if (btn.closest(".cw-modal-overlay")) return;
      if (btn.classList.contains("cw-modal-close-button")) return;
      btn.setAttribute("data-chariow-tap-hidden", "1");
    });
  }

  function initChariowHideDefaultButton() {
    var root = document.getElementById("chariow-widget");
    if (!root) return;

    hideChariowDefaultTapButton();

    var obs = new MutationObserver(function () {
      hideChariowDefaultTapButton();
    });
    obs.observe(root, { childList: true, subtree: true });

    var n = 0;
    var poll = setInterval(function () {
      hideChariowDefaultTapButton();
      n += 1;
      if (n > 40) clearInterval(poll);
    }, 150);
  }

  function triggerChariowCheckout() {
    var root = document.getElementById("chariow-widget");
    if (!root) return false;

    function clickInside() {
      var sel = root.querySelectorAll(
        "button, a[href], [role='button'], input[type='button'], input[type='submit']"
      );
      var i;
      for (i = 0; i < sel.length; i++) {
        try {
          sel[i].click();
          return true;
        } catch (e) {
          /* continue */
        }
      }
      try {
        root.click();
        return true;
      } catch (err) {
        return false;
      }
    }

    if (clickInside()) return true;

    var n = 0;
    var timer = setInterval(function () {
      n += 1;
      if (clickInside() || n > 60) {
        clearInterval(timer);
      }
    }, 75);

    return true;
  }

  function initChariowCheckout() {
    $(document).on("click", ".js-chariow-checkout", function (e) {
      e.preventDefault();
      triggerChariowCheckout();
    });

    window.triggerChariowCheckout = triggerChariowCheckout;
  }

  function initFadeIn() {
    var $els = $(".fade-in");
    if (!$els.length) return;

    function check() {
      var w = $(window).height();
      $els.each(function () {
        var $el = $(this);
        if ($el.hasClass("is-visible")) return;
        var top = $el.offset().top;
        if (top < $(window).scrollTop() + w * 0.88) {
          $el.addClass("is-visible");
        }
      });
    }

    $(window).on("scroll resize", check);
    check();
  }

  $(function () {
    initHeader();
    initChariowHideDefaultButton();
    initChariowCheckout();
    initFadeIn();
  });
})(jQuery);
