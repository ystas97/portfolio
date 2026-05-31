(function () {
  var title = document.querySelector('.hero__title--play');
  if (!title) return;

  var FONT_CLASSES = [
    'hero__slot--display',
    'hero__slot--serif',
    'hero__slot--sans',
    'hero__slot--mono',
  ];

  var lines = title.querySelectorAll('.hero__title-line[data-text]');
  if (!lines.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function pickFont(exclude) {
    var pool = exclude
      ? FONT_CLASSES.filter(function (c) {
          return c !== exclude;
        })
      : FONT_CLASSES;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function buildLetter(char) {
    if (char === ' ') {
      var space = document.createElement('span');
      space.className = 'hero__letter-space';
      space.textContent = '\u00a0';
      return space;
    }

    var topFont = pickFont();
    var bottomFont = pickFont(topFont);

    var slot = document.createElement('span');
    slot.className = 'hero__letter-slot';
    slot.setAttribute('aria-hidden', 'true');

    var top = document.createElement('span');
    top.className = 'hero__slot-letter hero__slot-letter--top ' + topFont;
    top.textContent = char;

    var bottom = document.createElement('span');
    bottom.className = 'hero__slot-letter hero__slot-letter--bottom ' + bottomFont;
    bottom.textContent = char;

    slot.appendChild(top);
    slot.appendChild(bottom);
    return slot;
  }

  lines.forEach(function (line) {
    var text = line.getAttribute('data-text') || '';
    line.textContent = '';
    line.removeAttribute('data-text');
    for (var i = 0; i < text.length; i += 1) {
      line.appendChild(buildLetter(text[i]));
    }
  });

  if (reducedMotion) return;

  function flipSlot(slot) {
    if (slot.classList.contains('is-animating')) return;
    slot.classList.add('is-animating');

    window.setTimeout(function () {
      var top = slot.querySelector('.hero__slot-letter--top');
      var bottom = slot.querySelector('.hero__slot-letter--bottom');
      if (!top || !bottom) return;

      var visibleFont = FONT_CLASSES.find(function (c) {
        return bottom.classList.contains(c);
      });

      /* Сброс без transition — иначе слои «откатываются» и кажется двойная анимация */
      top.style.transition = 'none';
      bottom.style.transition = 'none';
      slot.classList.remove('is-animating');

      top.className = 'hero__slot-letter hero__slot-letter--top ' + visibleFont;
      bottom.className =
        'hero__slot-letter hero__slot-letter--bottom ' + pickFont(visibleFont);
      top.style.transform = '';
      bottom.style.transform = '';

      void slot.offsetWidth;

      top.style.transition = '';
      bottom.style.transition = '';
    }, 620);
  }

  function tick() {
    var slots = title.querySelectorAll('.hero__letter-slot');
    if (!slots.length) return;

    var batch = [];
    slots.forEach(function (slot) {
      if (Math.random() < 0.12) batch.push(slot);
    });
    if (!batch.length) {
      batch.push(slots[Math.floor(Math.random() * slots.length)]);
    }

    batch.forEach(function (slot, index) {
      window.setTimeout(function () {
        flipSlot(slot);
      }, index * 70);
    });
  }

  window.setInterval(tick, 2200);
  window.setTimeout(tick, 400);
})();
