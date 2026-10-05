/*
  GooCampus hub — the only script on the page.

  Two small things, both optional:
    1. sections fade up as they scroll into view
    2. the three headline numbers count up the first time they are seen

  If this file fails to load, or the visitor asks their system for reduced
  motion, everything is simply shown straight away.
*/
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  // --- fade sections in, slightly staggered within a row -------------------
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = (i * 0.06).toFixed(2) + 's';
      e.target.classList.add('in');
      io.unobserve(e.target);
      if (e.target.querySelector('[data-count]')) countUp(e.target);
      if (e.target.hasAttribute('data-count')) countUp(e.target.parentElement);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { io.observe(el); });

  // --- count the headline numbers up once ---------------------------------
  function countUp(scope) {
    scope.querySelectorAll('[data-count]').forEach(function (el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || '';
      var start = null;
      var duration = 1100;
      function frame(now) {
        if (start === null) start = now;
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      el.textContent = '0' + suffix;
      requestAnimationFrame(frame);
    });
  }
})();
