// Бесконечные карусели (марки) на requestAnimationFrame.
// Прокрутка задаётся через transform, пауза по наведению сохраняет текущую
// позицию (без «прыжка в начало», который бывает у CSS-анимации с :hover).
//
// Обслуживает обе карусели: проекты сверху (.carousel) и материалы Quinky
// (.media-carousel). Чтобы добавить элемент — просто добавьте <img>/<video>
// в соответствующий трек; дублирование и скорость настроятся сами.
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.carousel, .media-carousel').forEach(setup);

  function setup(root) {
    const track = root.querySelector('.carousel__track, .media-carousel__track');
    if (!track) return;
    const originals = Array.from(track.children);
    if (!originals.length) return;

    // Уважаем системную настройку «уменьшить движение»: без авто-прокрутки,
    // вместо неё — обычный горизонтальный скролл.
    if (reduceMotion) {
      root.style.overflowX = 'auto';
      return;
    }

    // Дублируем набор один раз — для бесшовного зацикливания.
    originals.forEach((node) => track.appendChild(node.cloneNode(true)));

    const perItem = parseFloat(track.dataset.speed) || 4; // секунд на один элемент
    let offset = 0;
    let half = 0;      // ширина одного набора (точка бесшовного перехода)
    let pxPerSec = 0;
    let paused = false;
    let last = null;

    function measure() {
      half = track.scrollWidth / 2;
      pxPerSec = half / (originals.length * perItem);
      if (half > 0) offset = ((offset % half) + half) % half;
    }
    measure();

    // Пересчитываем размеры, когда подгрузятся картинки/видео и при ресайзе.
    track.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });
    track.querySelectorAll('video').forEach((v) => {
      v.addEventListener('loadedmetadata', measure, { once: true });
    });
    window.addEventListener('resize', measure);

    root.addEventListener('mouseenter', () => { paused = true; });
    root.addEventListener('mouseleave', () => { paused = false; });

    function frame(now) {
      if (last === null) last = now;
      // ограничиваем шаг: после возврата со скрытой вкладки (rAF не тикал)
      // dt был бы огромным и карусель «прыгнула» бы — продолжаем плавно
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused && pxPerSec > 0) {
        offset += pxPerSec * dt;
        if (offset >= half) offset -= half;
        track.style.transform = 'translateX(' + (-offset) + 'px)';
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();
