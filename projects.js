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
                Необязательно у экрана: auto: { to, delay } — сам перейти через delay мс.
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
    // Кликабельный прототип — координаты в пикселях экрана 780×1688
    screenSize: [780, 1688],
    screens: [
      { id: "splash", src: "upcleanup/splash.webp",
        auto: { to: "onboarding-1", delay: 1500 },
        links: [
        { x: 0, y: 0, w: 780, h: 1688, to: "onboarding-1", anim: "fade" }  // тап куда угодно
      ] },
      // Онбординг → пейвол → доступ к фото
      { id: "onboarding-1", src: "upcleanup/onboarding-1.webp", links: [
        { x: 32, y: 1370, w: 716, h: 112, to: "onboarding-2" }             // Continue
      ] },
      { id: "onboarding-2", src: "upcleanup/onboarding-2.webp", links: [
        { x: 32, y: 1370, w: 716, h: 112, to: "onboarding-3" }             // Continue
      ] },
      { id: "onboarding-3", src: "upcleanup/onboarding-3.webp", links: [
        { x: 32, y: 1370, w: 716, h: 112, to: "paywall" }                  // Continue
      ] },
      { id: "paywall", src: "upcleanup/paywall.png", links: [
        { x: 32, y: 1370, w: 716, h: 112, to: "access", anim: "fade" }     // Continue
      ] },
      { id: "access", src: "upcleanup/access.png", links: [
        { x: 40, y: 1370, w: 716, h: 112, to: "types", anim: "fade" }      // Allow in Settings
      ] },
      { id: "types", src: "upcleanup/media-types.png", links: [
        { x: 32, y: 338, w: 716, h: 112, to: "duplicates" },              // Duplicates
        { x: 32, y: 466, w: 716, h: 112, to: "photos" },                  // Photos
        { x: 312, y: 1500, w: 166, h: 120, to: "albums", anim: "instant" }, // таб Albums
        { x: 480, y: 1500, w: 156, h: 120, to: "tools", anim: "instant" }   // таб Tools
      ] },
      { id: "photos", src: "upcleanup/photos.webp", links: [
        back("types"),
        { x: 32, y: 228, w: 232, h: 232, to: "swipe" },                   // первое фото
        { x: 236, y: 1452, w: 308, h: 112, to: "swipe", anim: "sheet" }   // Swipe Mode
      ] },
      { id: "swipe", src: "upcleanup/swipe.png", links: [
        { x: 28, y: 90, w: 90, h: 90, to: "photos", anim: "back" }        // ‹ назад
      ] },
      { id: "duplicates", src: "upcleanup/duplicates.webp", links: [
        { x: 28, y: 90, w: 90, h: 90, to: "types", anim: "back" },        // ‹ назад
        { x: 30, y: 236, w: 724, h: 1190, to: "group" }                   // любая группа
      ] },
      { id: "group", src: "upcleanup/duplicates-group.png", links: [
        back("duplicates"),
        { x: 664, y: 102, w: 88, h: 88, to: "group-delete", anim: "fade" } // корзина
      ] },
      { id: "group-delete", src: "upcleanup/duplicates-delete.png", links: [
        { x: 118, y: 900, w: 544, h: 96, to: "duplicates", anim: "fade" }, // Delete
        { x: 118, y: 1016, w: 544, h: 96, to: "group", anim: "fade" }      // Cancel
      ] },
      { id: "albums", src: "upcleanup/albums.png", links: [
        { x: 150, y: 1500, w: 160, h: 120, to: "types", anim: "instant" }, // таб Types
        { x: 480, y: 1500, w: 156, h: 120, to: "tools", anim: "instant" }, // таб Tools
        { x: 32, y: 470, w: 716, h: 112, to: "album" }                    // FEB '20
      ] },
      { id: "album", src: "upcleanup/album.webp", links: [
        back("albums"),
        { x: 620, y: 102, w: 132, h: 88, to: "album-select", anim: "instant" }, // Select
        { x: 32, y: 228, w: 232, h: 232, to: "album-swipe" },                  // первое фото
        { x: 236, y: 1452, w: 308, h: 112, to: "album-swipe", anim: "sheet" }  // Swipe Mode
      ] },
      { id: "album-select", src: "upcleanup/album-select.webp", links: [
        { x: 610, y: 102, w: 142, h: 88, to: "album", anim: "instant" },       // Cancel
        { x: 506, y: 102, w: 88, h: 88, to: "album-delete", anim: "fade" }     // корзина
      ] },
      { id: "album-delete", src: "upcleanup/album-delete.webp", links: [
        { x: 118, y: 900, w: 544, h: 96, to: "album", anim: "fade" },          // Delete
        { x: 118, y: 1016, w: 544, h: 96, to: "album-select", anim: "fade" }   // Cancel
      ] },
      { id: "album-swipe", src: "upcleanup/album-swipe.png", links: [
        { x: 28, y: 90, w: 90, h: 90, to: "album", anim: "back" },             // ‹ назад
        { x: 700, y: 1026, w: 64, h: 64, to: "album-swipe-liked", anim: "instant" }, // ♡
        { x: 700, y: 1200, w: 64, h: 64, to: "album-swipe-info", anim: "fade" }      // ⓘ
      ] },
      { id: "album-swipe-liked", src: "upcleanup/album-swipe-liked.png", links: [
        { x: 28, y: 90, w: 90, h: 90, to: "album", anim: "back" },
        { x: 700, y: 1026, w: 64, h: 64, to: "album-swipe", anim: "instant" },       // снять лайк
        { x: 700, y: 1200, w: 64, h: 64, to: "album-swipe-info", anim: "fade" }
      ] },
      { id: "album-swipe-info", src: "upcleanup/album-swipe-info.webp", links: [
        { x: 28, y: 90, w: 90, h: 90, to: "album", anim: "back" },
        { x: 0, y: 254, w: 780, h: 1242, to: "album-swipe", anim: "fade" }     // тап по карточке — закрыть
      ] },
      { id: "tools", src: "upcleanup/tools.png", links: [
        { x: 150, y: 1500, w: 160, h: 120, to: "types", anim: "instant" },  // таб Types
        { x: 312, y: 1500, w: 166, h: 120, to: "albums", anim: "instant" }, // таб Albums
        { x: 32, y: 214, w: 716, h: 112, to: "compress" },                 // Compress
        { x: 32, y: 342, w: 716, h: 112, to: "secret-pin" },               // Secret Folder
        { x: 32, y: 470, w: 716, h: 112, to: "statistics" },               // Statistics
        { x: 32, y: 598, w: 716, h: 112, to: "settings" }                  // Settings
      ] },
      { id: "compress", src: "upcleanup/compress.png", links: [
        // кнопки «назад» на макете нет — назад по заголовку
        { x: 20, y: 90, w: 330, h: 90, to: "tools", anim: "back" },
        { x: 32, y: 342, w: 716, h: 112, to: "compress-videos" }           // FEB '20
      ] },
      { id: "compress-videos", src: "upcleanup/compress-videos.webp", links: [
        back("compress"),
        { x: 32, y: 226, w: 352, h: 352, to: "compress-quality" }          // первое видео
      ] },
      { id: "compress-quality", src: "upcleanup/compress-quality.webp", links: [
        back("compress-videos"),
        { x: 330, y: 632, w: 120, h: 120, to: "compress-player", anim: "fade" }, // ▶
        { x: 40, y: 1510, w: 716, h: 112, to: "compress-progress", anim: "fade" } // Compress
      ] },
      { id: "compress-player", src: "upcleanup/compress-player.webp", links: [
        { x: 56, y: 96, w: 64, h: 64, to: "compress-quality", anim: "fade" }     // ✕
      ] },
      { id: "compress-progress", src: "upcleanup/compress-progress.png",
        auto: { to: "compress-done", delay: 1800 },                          // «сжимается» и сам дальше
        links: [] },
      { id: "compress-done", src: "upcleanup/compress-done.webp", links: [
        back("compress-videos"),
        { x: 40, y: 1510, w: 350, h: 112, to: "compress-quality", anim: "fade" }, // Change size
        { x: 406, y: 1510, w: 350, h: 112, to: "compress-delete-old", anim: "sheet" } // Continue
      ] },
      { id: "compress-delete-old", src: "upcleanup/compress-delete-old.webp", links: [
        { x: 32, y: 1374, w: 716, h: 112, to: "compress-system-delete", anim: "fade" }, // Delete
        { x: 32, y: 1500, w: 716, h: 100, to: "compress-videos", anim: "fade" }         // Keep
      ] },
      { id: "compress-system-delete", src: "upcleanup/compress-system-delete.webp", links: [
        { x: 120, y: 1170, w: 270, h: 88, to: "compress-videos", anim: "fade" },  // Don't Allow
        { x: 390, y: 1170, w: 270, h: 88, to: "compress-videos", anim: "fade" }   // Delete
      ] },
      // Secret Folder: PIN → Face ID → папка → галерея
      { id: "secret-pin", src: "upcleanup/secret-pin.png", links: [
        back("tools"),
        { x: 640, y: 94, w: 116, h: 84, to: "secret-folder", anim: "fade" },  // Skip
        { x: 120, y: 680, w: 548, h: 740, to: "secret-pin-filled", anim: "instant" }  // любая цифра
      ] },
      { id: "secret-pin-filled", src: "upcleanup/secret-pin-filled.png",
        auto: { to: "secret-pin-confirm", delay: 600 },                      // PIN введён — к подтверждению
        links: [] },
      { id: "secret-pin-confirm", src: "upcleanup/secret-pin-confirm.png", links: [
        back("secret-pin"),
        { x: 640, y: 94, w: 116, h: 84, to: "secret-folder", anim: "fade" },  // Skip
        { x: 120, y: 680, w: 548, h: 740, to: "secret-faceid", anim: "fade" }       // любая цифра
      ] },
      { id: "secret-faceid", src: "upcleanup/secret-faceid.png", links: [
        { x: 120, y: 892, w: 540, h: 88, to: "secret-folder", anim: "fade" }, // Don't Allow
        { x: 120, y: 980, w: 540, h: 88, to: "secret-folder", anim: "fade" }  // Allow
      ] },
      { id: "secret-folder", src: "upcleanup/secret-folder.png", links: [
        back("tools"),
        { x: 32, y: 214, w: 716, h: 112, to: "secret-gallery-empty" },        // Secret Gallery
        { x: 32, y: 342, w: 716, h: 112, to: "secret-contacts" },             // Secret Contacts
        { x: 32, y: 470, w: 716, h: 112, to: "audio-empty" }                  // Secret Audio
      ] },
      { id: "secret-gallery-empty", src: "upcleanup/secret-gallery-empty.png", links: [
        back("secret-folder"),
        { x: 238, y: 1030, w: 304, h: 92, to: "secret-picker", anim: "sheet" } // + Add Media
      ] },
      { id: "secret-picker", src: "upcleanup/secret-picker.webp", links: [
        { x: 16, y: 150, w: 140, h: 80, to: "secret-gallery-empty", anim: "fade" }, // Cancel
        { x: 670, y: 150, w: 100, h: 80, to: "secret-import-remove", anim: "fade" }, // Add
        { x: 0, y: 348, w: 780, h: 1180, to: "secret-import-remove", anim: "fade" }  // выбрать фото
      ] },
      { id: "secret-import-remove", src: "upcleanup/secret-import-remove.webp", links: [
        { x: 118, y: 922, w: 544, h: 96, to: "secret-gallery", anim: "fade" },  // Delete
        { x: 118, y: 1038, w: 544, h: 96, to: "secret-gallery", anim: "fade" }  // Cancel
      ] },
      { id: "secret-gallery", src: "upcleanup/secret-gallery.webp", links: [
        back("secret-folder"),
        { x: 624, y: 106, w: 128, h: 82, to: "secret-select", anim: "instant" }, // Select
        { x: 250, y: 1452, w: 280, h: 112, to: "secret-picker", anim: "sheet" }  // Add Media
      ] },
      { id: "secret-select", src: "upcleanup/secret-select.webp", links: [
        { x: 612, y: 106, w: 140, h: 82, to: "secret-gallery", anim: "instant" }, // Cancel
        { x: 508, y: 106, w: 84, h: 82, to: "secret-delete", anim: "fade" },      // корзина
        { x: 220, y: 1452, w: 340, h: 112, to: "secret-restore", anim: "fade" }   // Restore Media
      ] },
      { id: "secret-delete", src: "upcleanup/secret-delete.webp", links: [
        { x: 118, y: 900, w: 544, h: 96, to: "secret-gallery", anim: "fade" },   // Delete
        { x: 118, y: 1016, w: 544, h: 96, to: "secret-select", anim: "fade" }    // Cancel
      ] },
      { id: "secret-restore", src: "upcleanup/secret-restore.webp", links: [
        { x: 118, y: 878, w: 544, h: 96, to: "secret-gallery", anim: "fade" },   // Restore Media
        { x: 118, y: 994, w: 544, h: 96, to: "secret-select", anim: "fade" }     // Cancel
      ] },
      // Secret Contacts: пусто → системный доступ → выбор → импорт → список
      { id: "secret-contacts", src: "upcleanup/secret-contacts.png", links: [
        back("secret-folder"),
        { x: 32, y: 214, w: 716, h: 112, to: "contacts-empty" },               // Contacts
        { x: 32, y: 342, w: 716, h: 112, to: "backups-empty" }                 // Backups
      ] },
      { id: "contacts-empty", src: "upcleanup/contacts-empty.png", links: [
        back("secret-contacts"),
        { x: 218, y: 1030, w: 344, h: 92, to: "contacts-share", anim: "sheet" } // + Add Contacts
      ] },
      { id: "contacts-share", src: "upcleanup/contacts-share.webp", links: [
        { x: 48, y: 1386, w: 684, h: 96, to: "contacts-pick", anim: "fade" },    // Select Contacts
        { x: 48, y: 1514, w: 684, h: 96, to: "contacts-pick", anim: "fade" }     // Share All
      ] },
      { id: "contacts-pick", src: "upcleanup/contacts-pick.png", links: [
        back("contacts-empty"),
        { x: 580, y: 106, w: 170, h: 82, to: "contacts-pick-all", anim: "instant" }, // Select All
        { x: 32, y: 436, w: 716, h: 1180, to: "contacts-pick-all", anim: "instant" } // любой контакт
      ] },
      { id: "contacts-pick-all", src: "upcleanup/contacts-pick-all.png", links: [
        back("contacts-empty"),
        { x: 580, y: 106, w: 170, h: 82, to: "contacts-pick", anim: "instant" },     // снять выбор
        { x: 226, y: 1452, w: 328, h: 112, to: "contacts-import-remove", anim: "fade" } // Add Contacts
      ] },
      { id: "contacts-import-remove", src: "upcleanup/contacts-import-remove.png", links: [
        { x: 118, y: 944, w: 544, h: 96, to: "contacts", anim: "fade" },    // Delete
        { x: 118, y: 1060, w: 544, h: 96, to: "contacts", anim: "fade" }    // Cancel
      ] },
      { id: "contacts", src: "upcleanup/contacts.png", links: [
        back("secret-contacts"),
        { x: 624, y: 106, w: 126, h: 82, to: "contacts-pick", anim: "instant" },       // Select
        { x: 226, y: 1452, w: 328, h: 112, to: "contacts-share", anim: "sheet" }       // Add Contacts
      ] },
      // Backups: пусто → создать → список → бэкап → восстановить
      { id: "backups-empty", src: "upcleanup/backups-empty.png", links: [
        back("secret-contacts"),
        { x: 208, y: 1030, w: 364, h: 92, to: "backups", anim: "fade" }        // + Create Backup
      ] },
      { id: "backups", src: "upcleanup/backups.png", links: [
        back("secret-contacts"),
        { x: 32, y: 226, w: 716, h: 136, to: "backup" },                       // 24 October 2024
        { x: 32, y: 386, w: 716, h: 136, to: "backup" }                        // 16 January 2025
      ] },
      { id: "backup", src: "upcleanup/backup.png", links: [
        back("backups"),
        { x: 208, y: 1452, w: 364, h: 112, to: "backup-restore", anim: "sheet" } // Restore Backup
      ] },
      { id: "backup-restore", src: "upcleanup/backup-restore.png", links: [
        { x: 32, y: 1374, w: 716, h: 112, to: "backup-restored", anim: "fade" }, // Restore
        { x: 32, y: 1500, w: 716, h: 100, to: "backup", anim: "fade" }           // Cancel
      ] },
      { id: "backup-restored", src: "upcleanup/backup-restored.png", links: [
        { x: 118, y: 860, w: 544, h: 96, to: "backups", anim: "fade" }           // OK
      ] },
      // Secret Audio: пусто → «Файлы» → импорт → список → плеер
      { id: "audio-empty", src: "upcleanup/audio-empty.png", links: [
        back("secret-folder"),
        { x: 212, y: 1030, w: 356, h: 92, to: "files-picker", anim: "sheet" }  // + Add Audio File
      ] },
      { id: "files-picker", src: "upcleanup/files-picker.png", links: [
        { x: 664, y: 172, w: 84, h: 84, to: "audio-empty", anim: "fade" },     // ✕
        { x: 0, y: 370, w: 780, h: 1150, to: "files-import-remove", anim: "fade" } // любой файл
      ] },
      { id: "files-import-remove", src: "upcleanup/files-import-remove.png", links: [
        { x: 118, y: 922, w: 544, h: 96, to: "audio", anim: "fade" },          // Delete
        { x: 118, y: 1038, w: 544, h: 96, to: "audio", anim: "fade" }          // Cancel
      ] },
      { id: "audio", src: "upcleanup/audio.webp", links: [
        back("secret-folder"),
        { x: 30, y: 250, w: 720, h: 1200, to: "audio-player" }                 // любой трек
      ] },
      { id: "audio-player", src: "upcleanup/audio-player.png", links: [
        back("audio"),
        { x: 315, y: 787, w: 150, h: 150, to: "audio-playing", anim: "instant" } // ▶
      ] },
      { id: "audio-playing", src: "upcleanup/audio-playing.png", links: [
        back("audio"),
        { x: 315, y: 787, w: 150, h: 150, to: "audio-player", anim: "instant" }  // ❚❚
      ] },
      // Statistics и Settings
      { id: "statistics", src: "upcleanup/statistics.png", links: [
        back("tools")
      ] },
      { id: "settings", src: "upcleanup/settings.png", links: [
        back("tools"),
        { x: 32, y: 214, w: 716, h: 112, to: "notifications" }                 // Notifications
      ] },
      { id: "notifications", src: "upcleanup/notifications.png", links: [
        back("settings")
      ] }
    ],
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
window.asset = (name) => "assets/" + name;
