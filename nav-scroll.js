(function () {
  var nav = document.querySelector('.nav__links');
  if (!nav) return;

  var sections = [
    { id: 'experience', el: document.getElementById('experience') },
    { id: 'pet-projects', el: document.getElementById('pet-projects') },
    { id: 'contacts', el: document.getElementById('contacts') },
  ].filter(function (s) {
    return s.el;
  });

  if (!sections.length) return;

  var links = nav.querySelectorAll('[data-nav-section]');

  function setActive(id) {
    links.forEach(function (link) {
      var on = link.getAttribute('data-nav-section') === id;
      link.classList.toggle('is-active', on);
      if (on) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function getActiveId() {
    var marker = window.scrollY + window.innerHeight * 0.32;
    var current = null;

    sections.forEach(function (section) {
      var top = section.el.getBoundingClientRect().top + window.scrollY;
      if (marker >= top - 80) current = section.id;
    });

    return current;
  }

  var ticking = false;

  function update() {
    ticking = false;
    setActive(getActiveId());
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
