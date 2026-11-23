/*
  GooCampus hub — the only script on the page.
    1. the nav gets a hairline once the page scrolls
    2. the phone menu opens and closes
    3. the arrow buttons move the programs row one card at a time
  Without this file the page still works: the menu links stay in the footer and the row scrolls by touch.
*/
(function () {
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = nav.querySelector('.nav__toggle');
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
  nav.querySelectorAll('.nav__links a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  var rail = document.getElementById('rail');
  document.querySelectorAll('[data-rail]').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = rail.querySelector('.prog');
      var step = card ? card.getBoundingClientRect().width + 20 : 320;
      rail.scrollBy({ left: step * Number(b.dataset.rail), behavior: 'smooth' });
    });
  });

  // a chip in the hero scrolls the programs row to that card
  document.querySelectorAll('.chips a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var card = document.querySelector(a.getAttribute('href'));
      if (!card) return;
      e.preventDefault();
      document.getElementById('programs').scrollIntoView({ behavior: 'smooth' });
      rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft), behavior: 'smooth' });
    });
  });
})();
