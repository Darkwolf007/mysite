// Circle cursor that inverts the page underneath it (mix-blend-mode:
// difference, in custom-cursor.css). Desktop/precise-pointer only.
// Eased with a frame-rate-independent decay so it tracks the same on a
// 60Hz and a 120Hz+ display instead of drifting at different speeds.
(function () {
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

  document.documentElement.classList.add('has-custom-cursor');

  const dot = document.createElement('div');
  dot.className = 'cursor-circle';
  document.body.appendChild(dot);

  const HOVER_SELECTOR = 'a, button, .nav-link, .portfolio-item, .filter-link, [role="button"]';
  const DECAY = 12; // higher = snappier, lower = trailier
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let lastTime = 0;
  let started = false;

  function render(time) {
    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
    lastTime = time;
    const factor = 1 - Math.exp(-DECAY * dt);
    x += (targetX - x) * factor;
    y += (targetY - y) * factor;
    dot.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    requestAnimationFrame(render);
  }

  document.addEventListener('mousemove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!started) {
      started = true;
      x = targetX;
      y = targetY;
      requestAnimationFrame(render);
    }
    dot.classList.add('is-active');
  });

  document.addEventListener('mouseleave', function () {
    dot.classList.remove('is-active');
  });

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(HOVER_SELECTOR)) dot.classList.add('is-hovering');
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(HOVER_SELECTOR)) dot.classList.remove('is-hovering');
  });
})();
