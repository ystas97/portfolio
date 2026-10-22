(() => {
  const slug = new URLSearchParams(location.search).get("p");
  const index = Math.max(0, PROJECTS.findIndex((p) => p.slug === slug));
  const project = PROJECTS[index];
  const total = PROJECTS.length;
  const pad = (n) => String(n).padStart(2, "0");
  const isVideo = (name) => /\.mp4$/i.test(name);

  document.title = project.title + " — Виктор Радюк";

  // Header: [04/52] 2Number
  document.getElementById("info-title").textContent =
    `[${pad(index + 1)}/${pad(total)}] ${project.title}`;

  // Prev / next project (wraps around)
  const prev = PROJECTS[(index - 1 + total) % total];
  const next = PROJECTS[(index + 1) % total];
  // Тонкая стрелка: линия + открытый «уголок», повернуть влево — через CSS
  const arrow = `<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 8h13M9 2.5 14.5 8 9 13.5"/></svg>`;
  document.getElementById("info-nav").innerHTML = `
    <a class="pill pill--light" href="project.html?p=${prev.slug}"><span class="arrow--left">${arrow}</span>${prev.title}</a>
    <a class="pill pill--light" href="project.html?p=${next.slug}">${next.title}${arrow}</a>`;

  // Без экранов прототипа — страница-кейс как на osamdesign.com, без айфона
  const isCase = project.screens.length === 0;
  const layout = document.querySelector(".layout");
  if (isCase) {
    layout.classList.add("layout--case");
    document.querySelector(".phone-col").remove();
  }

  // О проекте — короткое описание
  const text = document.getElementById("info-text");
  text.innerHTML = project.about.split("\n\n").map((p) => `<p>${p}</p>`).join("");
  if (isCase) {
    // Подпись слева, текст справа — как Brief на OSAM
    document.querySelector(".info__about").classList.add("brief");
  }

  // Галерея. В кейсе — плитки: вертикальные по две в ряд, горизонтальные на всю ширину
  const media = (name, attrs = "") =>
    isVideo(name)
      ? `<video src="${asset(name)}" autoplay muted loop playsinline preload="metadata" ${attrs}></video>`
      : `<img src="${asset(name)}" alt="${project.title}" loading="lazy" ${attrs} />`;
  const gallery = document.getElementById("info-gallery");
  const carousel = project.carousel || [];

  if (!isCase) {
    // В варианте с айфоном карусели нет — промо-видео идут в конец галереи
    gallery.innerHTML = [...project.gallery, ...carousel].map((n) => media(n)).join("");
  } else {
    gallery.classList.add("plates");
    gallery.innerHTML = project.gallery.map((n) => `<figure class="plate">${media(n)}</figure>`).join("");
    layoutPlates(gallery);
    if (carousel.length) renderCarousel(carousel);
    return;
  }

  function layoutPlates(root) {
    const plates = [...root.children];
    const ready = plates.map(
      (plate) =>
        new Promise((done) => {
          const el = plate.firstElementChild;
          const measure = () => {
            const w = el.naturalWidth || el.videoWidth;
            const h = el.naturalHeight || el.videoHeight;
            plate.classList.toggle("plate--wide", w / h > 1.1);
            done();
          };
          if ((el.naturalWidth || el.videoWidth) > 0) return measure();
          el.addEventListener(el.tagName === "VIDEO" ? "loadedmetadata" : "load", measure, { once: true });
          el.addEventListener("error", done, { once: true });
        })
    );
    // Оставшаяся без пары вертикальная плитка — по центру, а не с дырой справа
    Promise.all(ready).then(() => {
      const tall = plates.filter((p) => !p.classList.contains("plate--wide"));
      if (tall.length % 2) tall.at(-1).classList.add("plate--solo");
    });
  }

  function renderCarousel(items) {
    const arrow = `<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 8h13M9 2.5 14.5 8 9 13.5"/></svg>`;
    gallery.insertAdjacentHTML(
      "afterend",
      `<section class="carousel" aria-label="Промо-видео">
        <div class="carousel__track" tabindex="0">
          ${items.map((n) => `<figure class="carousel__slide">${media(n)}</figure>`).join("")}
        </div>
        <div class="carousel__nav"${items.length < 3 ? " hidden" : ""}>
          <button type="button" class="carousel__btn" data-dir="-1" aria-label="Назад"><span class="arrow--left">${arrow}</span></button>
          <button type="button" class="carousel__btn" data-dir="1" aria-label="Вперёд">${arrow}</button>
        </div>
      </section>`
    );
    const track = document.querySelector(".carousel__track");
    const [prevBtn, nextBtn] = document.querySelectorAll(".carousel__btn");
    const update = () => {
      prevBtn.disabled = track.scrollLeft <= 1;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    };
    document.querySelectorAll(".carousel__btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const step = track.firstElementChild.offsetWidth + 16;
        track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: "smooth" });
      })
    );
    track.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ===== Кликабельный прототип в айфоне =====
  // Экран — { id, src, links }. Строка "file.png" или пустой список screens
  // превращаются в экраны, где тап по всему экрану ведёт на следующий.
  const real = project.screens.length > 0;
  const [sw, sh] = project.screenSize || [780, 1688];
  const screens = (real ? project.screens : [null, null, null]).map((s, i, all) => {
    const nextId = "s" + ((i + 1) % all.length);
    const whole = [{ x: 0, y: 0, w: sw, h: sh, to: nextId }];
    if (!s) return { id: "s" + i, src: null, links: whole };
    if (typeof s === "string") return { id: "s" + i, src: s, links: whole };
    return s;
  });
  document.getElementById("phone-screen").classList.toggle("has-screens", real);

  const slidesEl = document.getElementById("phone-slides");
  const pct = (v, total) => (v / total) * 100 + "%";

  slidesEl.innerHTML = screens
    .map((s, i) => {
      const media = !s.src
        ? `<div class="phone__placeholder"><span>${project.title}</span><small>Экран ${i + 1} из ${screens.length}</small></div>`
        : isVideo(s.src)
          ? `<video src="${asset(s.src)}" muted loop playsinline preload="metadata"></video>`
          : `<img src="${asset(s.src)}" alt="${project.title}, экран ${i + 1}" />`;
      const links = s.links
        .map(
          (l) => `<button class="phone__hotspot" type="button" data-to="${l.to}" data-anim="${l.anim || "push"}"
            style="left:${pct(l.x, sw)};top:${pct(l.y, sh)};width:${pct(l.w, sw)};height:${pct(l.h, sh)}"
            aria-label="Перейти на следующий экран"></button>`
        )
        .join("");
      return `<div class="phone__slide" data-id="${s.id}">${media}${links}</div>`;
    })
    .join("");

  const slides = new Map([...slidesEl.children].map((el) => [el.dataset.id, el]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = new Map(screens.map((s) => [s.id, s]));
  let current = null;
  let autoTimer;

  function go(id, anim = "instant") {
    const next = slides.get(id);
    const prev = current && slides.get(current);
    if (!next || next === prev) return;
    if (reduceMotion && anim !== "instant") anim = "fade";

    next.classList.remove("is-leaving");
    next.dataset.anim = anim;
    next.classList.add("is-active");
    if (prev) {
      prev.dataset.anim = anim;
      prev.classList.add("is-leaving");
      prev.classList.remove("is-active");
      // Убираем «уходящий» экран, когда закончится анимация
      setTimeout(() => prev.classList.remove("is-leaving"), anim === "instant" ? 0 : 450);
    }
    next.querySelectorAll("video").forEach((v) => v.play().catch(() => {}));
    prev?.querySelectorAll("video").forEach((v) => v.pause());
    current = id;

    // Экран с auto (например, загрузка) сам переходит дальше через delay мс
    clearTimeout(autoTimer);
    const auto = byId.get(id).auto;
    if (auto) autoTimer = setTimeout(() => go(auto.to, auto.anim || "fade"), auto.delay || 1500);
  }

  slidesEl.addEventListener("click", (e) => {
    const hotspot = e.target.closest(".phone__hotspot");
    if (hotspot) return go(hotspot.dataset.to, hotspot.dataset.anim);
    // Как в Figma: тап мимо — подсветить, куда можно нажать
    const slide = slides.get(current);
    slide.classList.remove("show-hotspots");
    void slide.offsetWidth;
    slide.classList.add("show-hotspots");
  });

  document.getElementById("phone-restart").addEventListener("click", () => go(screens[0].id, "fade"));
  go(screens[0].id);
})();
