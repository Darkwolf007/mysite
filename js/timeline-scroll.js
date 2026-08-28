/* Milestone timeline (About panel) — vertical scroll stops once the panel
   has scrolled as far down as it goes (just past the timeline, see the
   small fixed .timeline-spacer in custom.css); further scroll instead
   drives the timeline sideways (via .timeline-track's transform) until the
   last year is reached, then vertical scroll resumes (there's nowhere
   further down to go, so this is effectively the end of the panel).
   Scrolling back up plays the same thing in reverse: reverse the timeline
   back to the first year, then resume scrolling up through the rest of
   the panel.

   This intercepts wheel events directly (preventDefault while "engaged")
   rather than deriving position from a scroll-linked translation — engaging
   once the panel is at (or within a couple px of) its natural max/min
   scroll means the trailing space this needs is exactly the 30px spacer,
   not the much larger buffer a "dock this element at the very top of the
   viewport" check would require (a short trailing section can't reach
   flush against the top of a much taller viewport without a lot of empty
   room after it to consume first — this sidesteps that entirely).

   The panel scrolls inside SimpleBar's own container (#about is
   [data-simplebar]), not the window — SimpleBar builds
   .simplebar-content-wrapper after DOMContentLoaded (see the wheel-scroll
   handler at the bottom of custom.js for the same note), so that lookup
   specifically waits for "load".

   Sizing (how far the track needs to travel) is driven by a ResizeObserver
   on .timeline-viewport, the same pattern js/graph.js uses, so a width
   that isn't settled yet just gets re-measured on the next real change.

   Below the mobile breakpoint this disables itself entirely and the strip
   falls back to its base CSS state: a plain native-scroll horizontal strip
   (see .timeline-viewport's overflow-x:auto in custom.css). Same fallback
   applies if this script never runs. */
(function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function init() {
    var viewport = document.querySelector("#about .timeline-viewport");
    var track = document.querySelector("#about .timeline-track");
    if (!viewport || !track || typeof ResizeObserver === "undefined") return;

    var scrollEl = null;

    var active = false; // whether the mechanic is available at all (desktop + content overflows)
    var engaged = false; // whether we're currently intercepting wheel events
    var distance = 0;
    var progress = 0; // 0 = first year, 1 = last year

    function applyTransform() {
      track.style.transform = "translateX(-" + (progress * distance) + "px)";
    }

    function disable() {
      active = false;
      engaged = false;
      distance = 0;
      progress = 0;
      viewport.classList.remove("is-scroll-driven");
      track.style.transform = "";
      window.__timelineScrollLock = false;
    }

    function measure(width) {
      if (!width || width < 40) {
        disable();
        return;
      }
      var endPadding = Math.min(220, width * 0.18);
      var travel = track.scrollWidth - width + endPadding;
      if (travel <= 0) {
        disable();
        return;
      }
      active = true;
      distance = travel;
      progress = 0;
      viewport.classList.add("is-scroll-driven");
      applyTransform();
    }

    // Within a couple px of the panel's natural bottom (where the timeline
    // sits, plus its 30px spacer) — the only place this ever engages,
    // whichever direction the wheel is going. Scrolling down onto this spot
    // engages to reveal years 0 -> 1; scrolling back up from here (even at
    // progress 1) engages just the same, to reverse 1 -> 0 before release.
    function atBottom() {
      if (!scrollEl) return true;
      var max = scrollEl.scrollHeight - scrollEl.clientHeight;
      return scrollEl.scrollTop >= max - 2;
    }

    function onWheel(e) {
      if (!active) return;

      if (!engaged) {
        if (e.deltaY === 0) return;
        if (!atBottom()) return;
        if (e.deltaY > 0 && progress >= 1) return;
        if (e.deltaY < 0 && progress <= 0) return;
        engaged = true;
        window.__timelineScrollLock = true;
      }

      e.preventDefault();
      e.stopPropagation();
      progress = clamp(progress + e.deltaY / distance, 0, 1);
      applyTransform();

      if ((e.deltaY > 0 && progress >= 1) || (e.deltaY < 0 && progress <= 0)) {
        engaged = false;
        window.__timelineScrollLock = false;
      }
    }

    var touchStartY = 0;
    var touchLastY = 0;

    function onTouchStart(e) {
      if (!active || !e.touches || !e.touches.length) return;
      touchLastY = touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
      if (!active || !e.touches || !e.touches.length) return;
      if (!atBottom()) return;

      var delta = e.touches[0].clientY - touchLastY;
      if (Math.abs(delta) < 2) return;

      e.preventDefault();
      e.stopPropagation();
      touchLastY = e.touches[0].clientY;
      if (!engaged) {
        if (delta > 0 && progress >= 1) return;
        if (delta < 0 && progress <= 0) return;
        engaged = true;
        window.__timelineScrollLock = true;
      }

      progress = clamp(progress + (delta / Math.max(150, distance)) * 1.2, 0, 1);
      applyTransform();

      if ((delta > 0 && progress >= 1) || (delta < 0 && progress <= 0)) {
        engaged = false;
        window.__timelineScrollLock = false;
      }
    }

    var resizeFrame = null;
    var observer = new ResizeObserver(function (entries) {
      var width = entries[0].contentRect.width;
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(function () {
        measure(width);
      });
    });
    observer.observe(viewport);

    // Safety net for reaching either end by anything other than a wheel
    // tick — dragging SimpleBar's scrollbar thumb, PageDown/End/arrow keys,
    // or a touch swipe never fire "wheel", so onWheel's engage/reveal logic
    // never runs for them: scrollTop can jump straight to its max while the
    // track is still sitting at whatever progress it was left at (0, on a
    // first visit), leaving years past that point never brought into view.
    // Snapping progress to match once actually at either limit means the
    // full 2014-2026 range is reachable regardless of how you got there.
    function onScroll() {
      if (!active || engaged) return;
      var max = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (scrollEl.scrollTop >= max - 2 && progress < 1) {
        progress = 1;
        applyTransform();
      } else if (scrollEl.scrollTop <= 2 && progress > 0) {
        progress = 0;
        applyTransform();
      }
    }

    function attachListeners() {
      scrollEl = document.querySelector("#about.lightbox-wrapper .simplebar-content-wrapper");
      (scrollEl || window).addEventListener("wheel", onWheel, { passive: false, capture: true });
      (scrollEl || window).addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
      (scrollEl || window).addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
      if (scrollEl) scrollEl.addEventListener("scroll", onScroll, { passive: true });
    }
    if (document.readyState === "complete") attachListeners();
    else window.addEventListener("load", attachListeners);

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
