/* Все проекты v2. Отсюда строятся и сетка на главной, и страница проекта.

   Новый проект — добавить объект в начало массива:
     slug     — адрес страницы: project.html?p=<slug>
     title    — название
     lead     — подпись под карточкой в сетке
     tags     — плашки на карточке
     cover    — картинка карточки (или постер, если есть coverVideo)
     coverVideo — необязательно, видео на карточке
     about    — текст «О проекте», абзацы через \n\n
     screens  — экраны кликабельного прототипа в айфоне. Каждый экран:
                  { id, src, links: [{ x, y, w, h, to, anim }] }
                x/y/w/h — зона клика в пикселях исходного экрана (размер в screenSize),
                to — id экрана, куда ведёт; anim — "push" (по умолчанию), "back" (назад),
                "sheet" (снизу вверх), "fade" или "instant".
                Можно и просто строкой "file.png" — тогда тап по экрану ведёт на следующий.
                Пусто — в телефоне будут заглушки.
     gallery  — картинки и видео (.mp4 станет видео)
     carousel — необязательно, промо-видео/картинки каруселью под галереей

   Есть screens — страница с айфоном-прототипом по центру.
   Нет screens — страница-кейс как на osamdesign.com: описание и плитки галереи на всю ширину. */

/* Табы нижнего меню 2Number — одинаковые на всех экранах с таб-баром.
   tabs("home") — зоны всех табов, кроме текущего */
const TABS_2NUMBER = {
  home: { x: 20, y: 1525, w: 115, h: 110 },
  messages: { x: 165, y: 1525, w: 145, h: 110 },
  keypad: { x: 330, y: 1525, w: 145, h: 110 },
  calls: { x: 480, y: 1525, w: 125, h: 110 },
  contacts: { x: 620, y: 1525, w: 140, h: 110 }
};
const tabs = (current) =>
  Object.entries(TABS_2NUMBER)
    .filter(([id]) => id !== current)
    .map(([id, zone]) => ({ ...zone, to: id, anim: "instant" }));

/* Кнопка «‹ назад» в шапке экранов 2Number */
const back = (to) => ({ x: 28, y: 110, w: 90, h: 90, to, anim: "back" });

window.PROJECTS = [
  {
    slug: "upcleanup",
    title: "UpCleanup",
    lead: "Приложение для очистки галереи iPhone, где удалить лишнее можно одним свайпом",
    tags: ["App", "UX/UI редизайн"],
    cover: "osam/upcleanup-card-poster.jpg",
    coverVideo: "osam/upcleanup-card-video.mp4",
    about: "Приложение для очистки галереи iPhone: похожие фото, скриншоты и дубликаты удаляются свайпом, тяжёлые видео сжимаются, а личное можно спрятать.",
    screens: [],
    gallery: [
      "osam/upcleanup-cover-video.mp4",
      "osam/upcleanup-photo-1.webp",
      "osam/upcleanup-photo-2.webp",
      "osam/upcleanup-photo-3.webp",
      "osam/upcleanup-photo-4.webp"
    ]
  },
  {
    slug: "2number",
    title: "2Number",
    lead: "iOS-приложение с виртуальными номерами из разных стран для звонков и SMS",
    tags: ["App", "iOS"],
    cover: "2number/card-poster.jpg",
    coverVideo: "2number/card-video.mp4",
    about: "Приложение для iPhone, где можно купить виртуальный номер из другой страны и принимать на него звонки и SMS — для работы, регистраций и объявлений.",
    // Кликабельный прототип. Координаты зон — в пикселях исходного экрана (screenSize)
    screenSize: [780, 1688],
    screens: [
      { id: "step1", src: "2number/onboarding-1.png", links: [
        { x: 32, y: 1384, w: 716, h: 112, to: "step2" }               // Go!
      ] },
      { id: "step2", src: "2number/onboarding-2.png", links: [
        { x: 32, y: 1384, w: 716, h: 112, to: "step3" }               // Great!
      ] },
      { id: "step3", src: "2number/onboarding-3.png", links: [
        { x: 32, y: 1384, w: 716, h: 112, to: "weekly" }              // Continue
      ] },
      { id: "weekly", src: "2number/onboarding-4-weekly.png", links: [
        { x: 32, y: 1090, w: 716, h: 124, to: "yearly", anim: "instant" }, // Yearly Plan
        { x: 20, y: 116, w: 72, h: 72, to: "home", anim: "fade" },         // ×
        { x: 32, y: 1384, w: 716, h: 112, to: "home", anim: "fade" }       // Continue
      ] },
      { id: "yearly", src: "2number/onboarding-5-yearly.png", links: [
        { x: 32, y: 962, w: 716, h: 114, to: "weekly", anim: "instant" },  // Weekly Plan
        { x: 20, y: 116, w: 72, h: 72, to: "home", anim: "fade" },         // ×
        { x: 32, y: 1384, w: 716, h: 112, to: "home", anim: "fade" }       // Try for Free
      ] },
      { id: "home", src: "2number/home.webp", links: [
        { x: 30, y: 490, w: 175, h: 170, to: "add-credits" },          // Add Credits
        { x: 215, y: 490, w: 175, h: 170, to: "rates" },               // Rates
        { x: 605, y: 490, w: 160, h: 170, to: "choose-country" },      // Numbers
        ...tabs("home")
      ] },
      { id: "messages", src: "2number/messages.png", links: [
        { x: 190, y: 140, w: 400, h: 76, to: "numbers", anim: "sheet" },   // выбор номера
        { x: 32, y: 250, w: 716, h: 1000, to: "chat" },                    // переписки
        ...tabs("messages")
      ] },
      { id: "numbers", src: "2number/messages-numbers.png", links: [
        { x: 32, y: 1070, w: 716, h: 448, to: "messages", anim: "fade" },  // любой номер
        { x: 32, y: 1534, w: 716, h: 96, to: "messages", anim: "fade" }    // Cancel
      ] },
      { id: "chat", src: "2number/chat.webp", links: [
        back("messages")
      ] },
      { id: "keypad", src: "2number/keypad.webp", links: [
        { x: 190, y: 140, w: 400, h: 76, to: "keypad-numbers", anim: "sheet" }, // выбор номера
        { x: 104, y: 1352, w: 156, h: 80, to: "keypad-rec", anim: "instant" },  // REC вкл
        { x: 318, y: 1320, w: 144, h: 144, to: "call", anim: "sheet" },         // позвонить
        ...tabs("keypad")
      ] },
      { id: "keypad-rec", src: "2number/keypad-rec.webp", links: [
        { x: 190, y: 140, w: 400, h: 76, to: "keypad-numbers", anim: "sheet" },
        { x: 104, y: 1352, w: 156, h: 80, to: "keypad", anim: "instant" },      // REC выкл
        { x: 318, y: 1320, w: 144, h: 144, to: "call-rec", anim: "sheet" },     // позвонить с записью
        ...tabs("keypad")
      ] },
      { id: "keypad-numbers", src: "2number/keypad-numbers.png", links: [
        { x: 32, y: 1070, w: 716, h: 448, to: "keypad", anim: "fade" },    // любой номер
        { x: 32, y: 1534, w: 716, h: 96, to: "keypad", anim: "fade" }      // Cancel
      ] },
      { id: "call", src: "2number/call.png", links: [
        { x: 62, y: 1424, w: 128, h: 128, to: "call-rec", anim: "instant" }, // REC вкл
        { x: 590, y: 1424, w: 128, h: 128, to: "keypad", anim: "fade" }      // Finish
      ] },
      { id: "call-rec", src: "2number/call-rec.png", links: [
        { x: 62, y: 1424, w: 128, h: 128, to: "call", anim: "instant" },     // REC выкл
        { x: 590, y: 1424, w: 128, h: 128, to: "keypad-rec", anim: "fade" }  // Finish
      ] },
      { id: "calls", src: "2number/calls.png", links: [
        { x: 32, y: 200, w: 716, h: 1310, to: "call", anim: "sheet" },  // строка истории — перезвонить
        ...tabs("calls")
      ] },
      { id: "contacts", src: "2number/contacts.png", links: [
        // жёлтые кнопки у контактов: трубка — звонок, конверт — чат
        { x: 564, y: 452, w: 80, h: 80, to: "call", anim: "sheet" },
        { x: 652, y: 452, w: 80, h: 80, to: "chat" },
        { x: 564, y: 604, w: 80, h: 80, to: "call", anim: "sheet" },
        { x: 652, y: 604, w: 80, h: 80, to: "chat" },
        { x: 564, y: 800, w: 80, h: 80, to: "call", anim: "sheet" },
        { x: 652, y: 800, w: 80, h: 80, to: "chat" },
        { x: 564, y: 1028, w: 80, h: 80, to: "call", anim: "sheet" },
        { x: 652, y: 1028, w: 80, h: 80, to: "chat" },
        { x: 564, y: 1180, w: 80, h: 80, to: "call", anim: "sheet" },
        { x: 652, y: 1180, w: 80, h: 80, to: "chat" },
        { x: 564, y: 1376, w: 80, h: 80, to: "call", anim: "sheet" },
        { x: 652, y: 1376, w: 80, h: 80, to: "chat" },
        ...tabs("contacts")
      ] },
      { id: "add-credits", src: "2number/add-credits.png", links: [
        back("home"),
        { x: 32, y: 1378, w: 716, h: 96, to: "home", anim: "fade" }      // Continue
      ] },
      { id: "rates", src: "2number/rates.png", links: [
        back("home"),
        { x: 32, y: 274, w: 716, h: 304, to: "rates-countries", anim: "sheet" } // выбор стран
      ] },
      { id: "rates-countries", src: "2number/rates-countries.png", links: [
        { x: 32, y: 1512, w: 716, h: 96, to: "rates", anim: "fade" }     // Continue
      ] },
      { id: "choose-country", src: "2number/choose-country.png", links: [
        back("home"),
        { x: 32, y: 254, w: 716, h: 448, to: "choose-number" }           // страна
      ] },
      { id: "choose-number", src: "2number/choose-number.png", links: [
        back("choose-country"),
        { x: 30, y: 222, w: 718, h: 1330, to: "choose-number-confirm", anim: "fade" } // номер
      ] },
      { id: "choose-number-confirm", src: "2number/choose-number-confirm.png", links: [
        { x: 64, y: 1328, w: 652, h: 96, to: "home", anim: "fade" },           // Choose
        { x: 64, y: 1448, w: 652, h: 96, to: "choose-number", anim: "fade" }   // Cancel
      ] }
    ],
    gallery: [
      "2number/card-video.mp4",
      "2number/slide-1.mp4",
      "2number/hand-recording.webp",
      "2number/phone-reflection.webp",
      "2number/slide-2.mp4"
    ]
  },
  {
    slug: "tcg-scanner",
    title: "TCG Card Scanner",
    lead: "Приложение для сканирования, оценки и хранения коллекционных карт",
    tags: ["App", "UX/UI редизайн"],
    cover: "osam/tcg-card-poster.jpg",
    coverVideo: "osam/tcg-card-video.mp4",
    about: "Приложение для коллекционеров карточных игр: сканирует карту, определяет её стоимость, проверяет подлинность и сохраняет в коллекцию.",
    screens: [],
    carousel: [
      "osam/tcg-slide-commercial.mp4",
      "osam/tcg-slide-deck.mp4",
      "osam/tcg-slide-meadow.mp4",
      "osam/tcg-slide-phones.jpg",
      "osam/tcg-slide-hand.jpg",
      "osam/tcg-slide-flyby.mp4",
      "osam/tcg-slide-redesign.mp4",
      "osam/tcg-slide-stack.mp4",
      "osam/tcg-slide-video1.mp4"
    ],
    gallery: [
      "osam/tcg-gallery-v2-1.png",
      "osam/tcg-gallery-v2-video.mp4",
      "osam/tcg-gallery-v2-2.png",
      "osam/tcg-gallery-v2-3.png",
      "osam/tcg-gallery-v2-4.png"
    ]
  },
  {
    slug: "namu-buro",
    title: "Namu Buro",
    lead: "Архитектурное бюро с дизайном интерьеров и собственной дизайнерской мебелью",
    tags: ["Website", "UX/UI дизайн"],
    cover: "osam/namu-right.png",
    about: "Сайт архитектурного бюро, которое проектирует интерьеры и производит собственную дизайнерскую мебель.",
    screens: [],
    gallery: [
      "osam/namu-gallery-1.png",
      "osam/namu-video.mp4",
      "osam/namu-gallery-2.png",
      "osam/namu-gallery-3.png",
      "osam/namu-gallery-4.png"
    ]
  },
  {
    slug: "lim-cc",
    title: "Lim CC",
    lead: "Вело-кафе, вокруг которого собралось сообщество любителей велоспорта",
    tags: ["Website", "Online shop"],
    cover: "osam/lim-right.png",
    about: "Сайт и онлайн-магазин вело-кафе, вокруг которого собирается сообщество любителей велоспорта.",
    screens: [],
    gallery: [
      "osam/lim-gallery-1.png",
      "osam/lim-video.mp4",
      "osam/lim-gallery-2.png",
      "osam/lim-gallery-3.png",
      "osam/lim-sign-installation.jpg",
      "osam/lim-cyclist.jpg",
      "osam/lim-coffee.jpg",
      "osam/lim-storefront.jpg"
    ]
  },
  {
    slug: "langy",
    title: "Langy",
    lead: "Приложение для macOS, которое само переключает раскладку клавиатуры",
    tags: ["macOS", "UX/UI дизайн"],
    cover: "osam/langy-card-main.png",
    about: "Приложение для macOS, которое само переключает раскладку клавиатуры и учится прямо во время работы.",
    screens: [],
    gallery: [
      "osam/langy-gallery-1.png",
      "osam/langy-video.mp4",
      "osam/langy-gallery-2.png",
      "osam/langy-gallery-3.png"
    ]
  },
  {
    slug: "foremost",
    title: "Foremost",
    lead: "Уходовая косметика для женщин на основе активных компонентов",
    tags: ["Website", "UX/UI дизайн"],
    cover: "osam/foremost-card-photo.jpg",
    about: "Сайт бренда уходовой косметики для женщин на основе активных компонентов.",
    screens: [],
    gallery: [
      "osam/foremost-gallery-1.png",
      "osam/foremost-video.mp4",
      "osam/foremost-gallery-2.png",
      "osam/foremost-gallery-3.png"
    ]
  },
  {
    slug: "architectural-bureau",
    title: "Architectural bureau",
    lead: "Архитектурное бюро Петра Сафиуллина с собственной линией мебели",
    tags: ["Website", "UX/UI дизайн"],
    cover: "osam/ps-card-poster.jpg",
    coverVideo: "osam/ps-card-video.mp4",
    about: "Сайт архитектурного бюро Петра Сафиуллина — архитектора и автора собственной линии мебели.",
    screens: [],
    gallery: [
      "osam/ps-gallery-1.png",
      "osam/ps-video.mp4",
      "osam/ps-gallery-2.png",
      "osam/ps-gallery-3.png"
    ]
  },
  {
    slug: "quinky",
    title: "Quinky",
    lead: "Яркое и игривое мобильное приложение с аудиогидами",
    tags: ["App", "UX/UI дизайн"],
    cover: "osam/quinky-card-main.jpg",
    about: "Инклюзивное приложение с аудиогидами: практичный и игривый контент об интимности и отношениях.",
    screens: [],
    gallery: [
      "osam/quinky-gallery-1.png",
      "osam/quinky-video-mosaic.mp4",
      "osam/quinky-video-tips.mp4",
      "osam/quinky-video-pink.mp4",
      "osam/quinky-project-site.png",
      "osam/quinky-video-age.mp4",
      "osam/quinky-video-badge.mp4",
      "osam/quinky-project-app.png"
    ]
  },
  {
    slug: "winrun",
    title: "Winrun",
    lead: "Интернет-магазин и айдентика для бренда кроссовок, построенного вокруг движения",
    tags: ["Online shop", "UX/UI дизайн"],
    cover: "osam/winrun-card-main.png",
    about: "Интернет-магазин бренда кроссовок с подпиской: комфорт, личный стиль и регулярное обновление пары.",
    screens: [],
    gallery: [
      "osam/winrun-gallery-1.png",
      "osam/winrun-gallery-2.png",
      "osam/winrun-gallery-3-v2.png"
    ]
  },
  {
    slug: "corpsoft24",
    title: "Corpsoft24",
    lead: "Платформа корпоративных сервисов в одном понятном адаптивном сайте",
    tags: ["Website", "UX/UI дизайн"],
    cover: "osam/corpsoft24-card-main.png",
    about: "Сайт цифровой экосистемы, через которую бизнес получает корпоративные IT-сервисы в одном окне.",
    screens: [],
    gallery: [
      "osam/corpsoft24-gallery-1.jpg",
      "osam/corpsoft24-gallery-2.png",
      "osam/corpsoft24-gallery-3.png",
      "osam/corpsoft24-gallery-4.png",
      "osam/corpsoft24-gallery-5.png"
    ]
  }
];

/* Все пути к файлам — относительно общей папки assets/ */
window.asset = (name) => "../assets/" + name;
