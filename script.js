(function () {
  document.documentElement.classList.remove('no-js');

  var header = document.querySelector('.site-header');
  var nav = document.getElementById('primary-nav');
  var toggle = document.querySelector('.nav-toggle');
  var items = Array.prototype.slice.call(document.querySelectorAll('.nav-item.has-menu'));
  var mobileQuery = window.matchMedia('(max-width: 68rem)');

  // Header shadow on scroll
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mega menus
  function closeAll(except) {
    items.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('is-open');
      item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
    });
  }
  items.forEach(function (item) {
    var btn = item.querySelector('.nav-link');
    var hoverTimer;
    var hoverOpenedAt = 0;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      // The hover just opened this menu; a click right after shouldn't close it
      if (!mobileQuery.matches && Date.now() - hoverOpenedAt < 600) return;
      var open = !item.classList.contains('is-open');
      closeAll(item);
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    item.addEventListener('mouseenter', function () {
      if (mobileQuery.matches) return;
      clearTimeout(hoverTimer);
      closeAll(item);
      if (!item.classList.contains('is-open')) hoverOpenedAt = Date.now();
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', function () {
      if (mobileQuery.matches) return;
      hoverTimer = setTimeout(function () {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }, 120);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) closeAll();
  });

  // Mobile menu
  function setMobileNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-locked', open);
    if (!open) closeAll();
  }
  toggle.addEventListener('click', function () { setMobileNav(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a') && mobileQuery.matches) setMobileNav(false);
  });
  mobileQuery.addEventListener('change', function () { setMobileNav(false); });

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Scroll spy: swap sticky image as each step reaches the viewport middle
  var steps = Array.prototype.slice.call(document.querySelectorAll('.spy-step'));
  var imgs = document.querySelectorAll('.spy-img');
  var dots = document.querySelectorAll('.spy-dots li');
  function activate(idx) {
    steps.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
    imgs.forEach(function (img, i) { img.classList.toggle('is-active', i === idx); });
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
  }
  if ('IntersectionObserver' in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(steps.indexOf(entry.target));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(function (s) { spyObs.observe(s); });
  }

  // Demo modal
  var modal = document.getElementById('demo-modal');
  var form = document.getElementById('demo-form');
  var thanks = modal.querySelector('.demo-thanks');
  var lastFocus;
  function openModal() {
    lastFocus = document.activeElement;
    form.hidden = false; thanks.hidden = true; form.reset();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setMobileNav(false);
    setTimeout(function () { form.querySelector('input').focus(); }, 50);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-open-demo]').forEach(function (b) { b.addEventListener('click', openModal); });
  modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!modal.hidden) closeModal(); else closeAll();
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll('input[required]').forEach(function (input) {
      var valid = input.checkValidity() && input.value.trim() !== '';
      input.classList.toggle('invalid', !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    if (!ok) return;
    form.hidden = true; thanks.hidden = false;
    thanks.querySelector('button').focus();
  });

  // Newsletter signup (demo only)
  var signup = document.getElementById('signup');
  var msg = document.querySelector('.signup-msg');
  signup.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = signup.querySelector('input');
    if (!input.checkValidity() || !input.value.trim()) {
      msg.textContent = 'Please enter a valid business email.';
      input.focus();
      return;
    }
    msg.textContent = 'Thanks for subscribing!';
    signup.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
