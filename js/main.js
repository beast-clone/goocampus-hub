/* GooCampus hub — page behaviour. The page reads fine without it. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* phone menu */
  var nav = $('#nav'), toggle = $('.nav__toggle');
  function setOpen(o) { nav.classList.toggle('is-open', o); toggle.setAttribute('aria-expanded', o); toggle.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); }
  toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
  $$('.nav__links a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  /* hero session slider */
  var slides = $$('.slide'), bars = $$('.slider__track i'), cur = 0;
  function show(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('is-on', k === cur); });
    bars.forEach(function (b, k) { b.classList.toggle('on', k <= cur); });
    $('#slideNow').textContent = '0' + (cur + 1);
  }
  $$('[data-slide]').forEach(function (b) { b.addEventListener('click', function () { show(cur + Number(b.dataset.slide)); }); });
  show(0);

  /* services rail arrows */
  var rail = $('#rail');
  $$('[data-rail]').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = rail.querySelector('.card');
      rail.scrollBy({ left: (c ? c.offsetWidth + 12 : 300) * Number(b.dataset.rail), behavior: 'smooth' });
    });
  });

  /* book-a-call picker */
  $$('.opt').forEach(function (o) {
    o.addEventListener('click', function () {
      $$('.opt').forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-checked', 'false'); });
      o.classList.add('is-on'); o.setAttribute('aria-checked', 'true');
      $('#callName').textContent = o.dataset.name;
      $('#callWho').textContent = 'with a ' + o.dataset.who;
    });
  });

  /* pathways list */
  var P = [
    { img: 'india.jpg', alt: 'India Gate in New Delhi at dusk', tag: '<b>279+</b> doctors enrolled',
      text: 'From round 1 to the stray vacancy round, we work with your rank and goals to secure the best possible PG seat, with college-wise data on work-life balance and bed strength.',
      a: 'Round 1 to stray round', b: 'College and specialty choice', link: 'https://goocampus.in', ext: true },
    { img: 'sydney.jpg', alt: 'Sydney Harbour with the Opera House', tag: '<b>376+</b> doctors enrolled',
      text: 'AMC exams, English, registration, visas and the job market, planned in the right order so you do not lose months. Includes talks with practising Australian doctors.',
      a: 'AMC MCQ and clinical', b: 'Registration and job alerts', link: 'https://goocampusaustralia.com', ext: true },
    { img: 'nyc.jpg', alt: 'The Lower Manhattan skyline in New York', tag: '<b>98+</b> doctors enrolled',
      text: 'The USA route takes time and one wrong step can delay it. We plan USMLE, LORs and your Match strategy well in advance.',
      a: 'USMLE plan and prep', b: 'LORs, ERAS and the Match', link: '/usa-pathway/' },
    { img: 'dubai.jpg', alt: 'The Dubai skyline', tag: '<b>134+</b> doctors enrolled',
      text: 'Dubai, Abu Dhabi, Saudi Arabia and Qatar each have their own exams and bodies. With limited attempts, we help you get it right the first time.',
      a: 'Prometric and DataFlow', b: 'Hospital-wise interview tips', link: '/gulf-pathway/' },
    { img: 'berlin.jpg', alt: 'The Brandenburg Gate in Berlin', tag: '<b>New</b> program',
      text: 'German A1 to B2 in India, FSP preparation, Approbation guidance, visa and relocation, and the job search, with a physician mentor along the way.',
      a: 'German A1 to B2, FSP', b: 'Approbation and jobs', link: 'https://germany.goocampusglobal.com/', ext: true }
  ];
  var img = $('#pathImg'), btns = $$('.plist button');
  function path(i) {
    var p = P[i];
    btns.forEach(function (b, k) { b.classList.toggle('is-on', k === i); b.setAttribute('aria-selected', k === i); });
    img.style.opacity = 0;
    setTimeout(function () { img.src = '/assets/v2/' + p.img; img.alt = p.alt; img.style.opacity = 1; }, 180);
    $('#pathTag').innerHTML = p.tag;
    $('#pathText').textContent = p.text;
    $('#pathA').textContent = p.a;
    $('#pathB').textContent = p.b;
    var l = $('#pathLink'); l.href = p.link;
    if (p.ext) { l.target = '_blank'; l.rel = 'noopener'; } else { l.removeAttribute('target'); l.removeAttribute('rel'); }
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { path(Number(b.dataset.i)); }); });
  P.forEach(function (p) { var i = new Image(); i.src = '/assets/v2/' + p.img; });
  $$('.chips [data-path]').forEach(function (a) {
    a.addEventListener('click', function () {
      $$('.chips a').forEach(function (x) { x.classList.remove('is-on'); }); a.classList.add('is-on');
      path(Number(a.dataset.path));
    });
  });

  /* rating bar in the photo card: 4.9 of 5 */
  var fine = $('.segs--fine');
  if (fine) { for (var k = 0; k < 50; k++) { var s = document.createElement('i'); if (k < 49) s.className = 'on'; fine.appendChild(s); } }

  /* reviews */
  var qs = $$('.q'), qi = 0;
  $$('[data-q]').forEach(function (b) {
    b.addEventListener('click', function () {
      qi = (qi + Number(b.dataset.q) + qs.length) % qs.length;
      qs.forEach(function (q, k) { q.classList.toggle('is-on', k === qi); });
      $('#qNow').textContent = '0' + (qi + 1);
    });
  });
})();
