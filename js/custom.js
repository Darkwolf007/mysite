/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.1.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */
!(function (n) {
    "use strict";
    n(function () {}), n(window).on("load", function () {});
})(jQuery);

$(".modal").on("shown.bs.modal", function (event) {
    let el = document.getElementsByClassName("close-btn")[0];
    if (el) el.style.display = "none";
});

$(".modal").on("hiden.bs.modal", function (event) {
    let el = document.getElementsByClassName("close-btn")[0];
    if (el) el.style.display = "flex";
});

// The Works/Features lightbox panels stay in the DOM at opacity:0 while
// closed (see animatedModal.js), so a plain loading="lazy" image inside
// them has no layout box for the browser to measure and just fetches
// immediately instead of waiting. The portfolio grid + project modals +
// blog grid hold this site's real weight (dozens of multi-MB shots), so
// their src is held in data-src until the panel/modal that shows it is
// actually opened.
function activateDeferredMedia($scope) {
    $scope.find("img[data-src], iframe[data-src], source[data-src]").each(function () {
        this.src = this.getAttribute("data-src");
        this.removeAttribute("data-src");
        const video = this.closest("video");
        if (video) video.load();
    });
}

// Bento layout for Works: a plain CSS grid (see .bento-grid in custom.css)
// with each tile randomly given a wide/tall/big span, reshuffled on every
// open. main.js's isotope instance still exists (it's what makes the
// filter tabs work) but its own masonry positioning is dropped in favor
// of the grid, once real images are in and it's been through one layout
// pass so its filter bookkeeping is accurate.
const BENTO_SIZES = [[], [], [], ["bento-w2"], ["bento-w2"], ["bento-h2"], ["bento-w2", "bento-h2"]];

function shuffleBento($grid) {
    const items = $grid.children(".single-item").toArray();
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        $(items[i]).before(items[j]);
        const tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
    }
    items.forEach(function (el) {
        $(el).removeClass("bento-w2 bento-h2");
        BENTO_SIZES[Math.floor(Math.random() * BENTO_SIZES.length)].forEach(function (c) {
            $(el).addClass(c);
        });
        $grid.append(el);
    });
}

// Replace each tile's static "More Info" filler with its real category
// (read straight off the filter tabs, e.g. "Fabrication", "VR/AR
// development"), so the always-visible caption under each image is
// actually meaningful instead of a placeholder.
function labelPortfolioCategories($grid) {
    const labels = {};
    $("#portfolio .filter-control [data-filter]").each(function () {
        const key = $(this).data("filter");
        if (key && key !== "*") labels[key] = $.trim($(this).text());
    });
    $grid.children(".single-item").each(function () {
        const $item = $(this);
        const key = $item.attr("class").split(/\s+/).find(function (c) {
            return Object.prototype.hasOwnProperty.call(labels, c);
        });
        if (key) $item.find(".content-more").text(labels[key]);
    });
}

$('a.nav-link[href="#portfolio"]').one("click", function () {
    const $grid = $("#portfolio .portfolio-section .portfolio-grid");
    activateDeferredMedia($grid);
    labelPortfolioCategories($grid);
    $grid.imagesLoaded(function () {
        $grid.isotope("layout");
        $grid.addClass("bento-grid");
        shuffleBento($grid);
    });
});

$('a.nav-link[href="#portfolio"]').on("click", function () {
    const $grid = $("#portfolio .portfolio-section .portfolio-grid");
    if ($grid.hasClass("bento-grid")) shuffleBento($grid);
});

$('a.nav-link[href="#blog"]').one("click", function () {
    activateDeferredMedia($("#blog"));
});

// Showcase (Features) category tabs: the blog grid is a plain CSS grid
// (unlike the Works masonry), so a show/hide toggle is enough — no
// isotope instance needed.
$("#blog .filter-control [data-filter]").on("click", function () {
    const $tabs = $("#blog .filter-control [data-filter]");
    $tabs.removeClass("tab-active");
    $(this).addClass("tab-active");
    const filter = $(this).data("filter");
    $("#blog .blog-grid .blog-item").each(function () {
        const show = filter === "*" || $(this).hasClass(filter);
        $(this).toggle(show);
    });
});

$(".modal").on("show.bs.modal", function () {
    activateDeferredMedia($(this));
});

// There's no dedicated close button on a panel any more — the navbar (kept
// above every panel via z-index) is the only way in and out. Clicking the
// nav-link for the panel that's already open now closes it (by triggering
// its own hidden [data-modal-close], so animatedModal's real close/fade-out
// logic still runs); clicking a different one closes whatever was open
// first so panels never stack.
const PANEL_IDS = ["about", "resume", "portfolio", "blog"];

function closePanel(id) {
    const panel = document.getElementById(id);
    if (!panel || !panel.classList.contains(id + "-on")) return;
    const closeBtn = panel.querySelector("[data-modal-close]");
    if (closeBtn) closeBtn.click();
}

document.addEventListener("click", function (e) {
    const link = e.target.closest('a.nav-link[href^="#"], .navbar-brand[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    if (id === "home-area") {
        PANEL_IDS.forEach(closePanel);
        return;
    }
    if (PANEL_IDS.indexOf(id) === -1) return;
    const panel = document.getElementById(id);
    if (!panel) return;
    if (panel.classList.contains(id + "-on")) {
        e.preventDefault();
        e.stopPropagation();
        closePanel(id);
    } else {
        PANEL_IDS.forEach(function (other) {
            if (other !== id) closePanel(other);
        });
    }
}, true);

// Smooth, eased wheel scrolling for each panel's simplebar viewport —
// native wheel scroll jumps in fixed steps; this glides toward the
// target instead, matching the inertial feel sites like
// jessievan.framer.website have. Trackpad/touch gestures that don't
// fire wheel events (or mobile touch-scroll) are left untouched.
// simplebar builds .simplebar-content-wrapper on DOMContentLoaded, which
// fires after every deferred script (this one included) has already run
// — so this has to wait for "load" or the elements simply aren't there yet.
window.addEventListener("load", function () {
    document.querySelectorAll("[data-simplebar] .simplebar-content-wrapper").forEach(function (el) {
        let target = el.scrollTop;
        let current = target;
        let lastTime = 0;
        let raf = null;

        function step(time) {
            const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
            lastTime = time;
            const factor = 1 - Math.exp(-14 * dt);
            current += (target - current) * factor;
            if (Math.abs(target - current) < 0.5) {
                current = target;
                el.scrollTop = current;
                raf = null;
                lastTime = 0;
                return;
            }
            el.scrollTop = current;
            raf = requestAnimationFrame(step);
        }

        el.addEventListener("wheel", function (e) {
            e.preventDefault();
            const max = el.scrollHeight - el.clientHeight;
            target = Math.min(max, Math.max(0, target + e.deltaY));
            current = el.scrollTop;
            if (!raf) raf = requestAnimationFrame(step);
        }, { passive: false });
    });
});
