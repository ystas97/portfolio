// Бесконечная карусель проектов.
// Чтобы добавить проект — добавьте новый <img class="carousel__item" ...>
// внутрь .carousel__track в index.html. Всё остальное (дублирование для
// бесшовного цикла и скорость прокрутки) настроится автоматически.
(function () {
  const track = document.querySelector('.carousel__track');
  if (!track) return;

  const originals = Array.from(track.children);
  if (originals.length === 0) return;

  // ~4 секунды на одну карточку — темп не зависит от количества проектов.
  track.style.setProperty('--carousel-duration', originals.length * 4 + 's');

  // Дублируем набор один раз — это даёт бесшовное зацикливание (translateX -50%).
  originals.forEach((node) => track.appendChild(node.cloneNode(true)));
})();
