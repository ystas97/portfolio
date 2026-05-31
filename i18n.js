(function () {
  var STORAGE_KEY = 'portfolio-lang';

  var translations = {
    ru: {
      meta: {
        title: 'Виктор Радюк — Multidisciplinary Product Designer',
        description:
          'Портфолио Виктора Радюка — senior дизайнера с 6-летним опытом в дизайне мобильных приложений и веб-платформ.',
      },
      nav: {
        brand: 'ВИКТОР РАДЮК',
        aria: 'Навигация',
        switchToEn: 'Переключить на английский',
        switchToRu: 'Переключить на русский',
        experience: { long: 'ОПЫТ И ПРОЕКТЫ', short: 'опыт' },
        contacts: { long: 'КОНТАКТЫ', short: 'telegram' },
      },
      hero: { aria: 'Multidisciplinary Product Designer' },
      carousel: { aria: 'Проекты' },
      intro: {
        avatarAlt: 'Виктор Радюк',
        text:
          'Привет, меня зовут Виктор. Я — senior дизайнер, 6 лет опыта в дизайне. Специализируюсь на разработке мобильных приложений и веб-платформ. Помогаю выстраивать продуктовую дизайн-экспертизу и процессы в компании, создавая сильные команды и эффективные решения.',
      },
      section: { experience: 'Опыт и проекты' },
      shared: {
        years: 'Года',
        role: 'Роль',
        platforms: 'Платформы',
        view: 'Посмотреть',
        achievements: 'Достижения и вклад',
        results: 'Результаты',
        now: '2024 – Now',
      },
      exp: {
        stepa: {
          role:
            'Senior Designer – руководство командой, исследования, дизайн-стратегия, проектирование взаимодействия, визуальный дизайн, менторство',
          lead:
            'Прошёл путь от создания интерфейсов до системного развития дизайн-процессов в команде мобильных продуктов. Внедрил стандарты работы с дизайном и выстроил новый AI-assisted процесс передачи макетов в разработку.',
          a1: 'Проектировал интерфейсы для новых мобильных приложений и улучшал существующие продукты.',
          a2: 'Систематизировал работу с макетами в Figma: внедрил структурный подход к компонентам, стилям и variables.',
          a3: 'Разработал внутренние гайдлайны по коммуникации, оценке задач и предоставлению фидбека в дизайн-команде.',
          a4: 'Выстроил новый процесс передачи дизайна в разработку: дизайнеры создают интерфейс в Figma и с помощью AI-инструментов переносят UI-основу в код.',
          r1: 'Повысил системность и качество дизайн-работы внутри команды.',
          r2: 'Снизил объём ручной работы разработчиков над интерфейсами, позволив им сосредоточиться на функциональности продукта.',
          r3: 'Сократил цикл создания и реализации дизайна с 3–4 месяцев до нескольких недель.',
          carouselAria: 'Stepa Dev — работы',
        },
        quinky: {
          role:
            'Product (UI/UX) Designer — определение объёма фич, исследования, проектирование взаимодействия, визуальный дизайн, прототипирование',
          lead:
            'Проектировал приложение для аудитории Gen Z, развивал ключевые сценарии продукта и руководил дизайн-процессом в тесной связке с командой разработки.',
          a1: 'Определял объём фич, проводил исследования, проектировал пользовательские сценарии, визуальный дизайн и интерактивные прототипы.',
          a2: 'Разрабатывал мобильное приложение для wellness-стартапа, тесно взаимодействуя с frontend- и backend-разработчиками.',
          a3: 'Анализировал обратную связь от пользователей поколения Z и на её основе улучшал онбординг и пользовательские сценарии.',
          a4: 'Внедрял механики геймификации с учётом интересов и поведения целевой аудитории',
          r1: 'Взял на себя ведущую роль в управлении полным дизайн-процессом продукта.',
          r2: 'Обеспечивал целостность пользовательского опыта и качество визуальных решений на всех этапах разработки.',
          r3: 'Руководил и менторил junior-дизайнеров, помогая команде работать системнее и эффективнее.',
          carouselAria: 'Quinky — материалы',
        },
        allo: {
          role: 'Графический дизайнер / Web дизайнер',
          lead: 'Создал более 50 адаптивных сайтов для стартапов, локального бизнеса и e-commerce.',
          a1: 'Проектировал адаптивные сайты и лендинги для бизнеса из разных сфер: от локальных компаний до e-commerce проектов.',
          a2: 'Вёл полный цикл дизайн-работы: изучение задачи и аудитории, разработка UX-структуры, визуальной концепции и финальных макетов.',
          a3: 'Презентовал решения клиентам на каждом этапе, аргументировал дизайн-решения и вносил правки с учётом бизнес-задач.',
          r1: 'Разработал более 50 адаптивных сайтов для коммерческих проектов',
          r2: 'Выстроил эффективное взаимодействие внутри проектной команды, что позволяло выпускать сайты в сжатые сроки.',
          carouselAria: 'Allogalochka — работы',
          mainAlt: 'namu buro — страница проектов',
          workAlt: 'Работа',
        },
        langy: {
          lead: 'Создал умный автоматический переключатель клавиатуры для macOS.',
          a1: 'Умный автоматический переключатель клавиатуры для macOS. Продукт помогает пользователям писать без ошибок раскладки и учиться прямо во время работы, не прерывая основной сценарий.',
          appStoreAria: 'Авто-раскладка RU/EN – Langy в App Store',
          carouselAria: 'Langy — экраны',
        },
      },
      footer: {
        copy: 'Виктор Радюк © 2026',
        aria: 'Контакты',
      },
    },
    en: {
      meta: {
        title: 'Viktor Radyuk — Multidisciplinary Product Designer',
        description:
          'Portfolio of Viktor Radyuk — a senior designer with 6 years of experience in mobile apps and web platforms.',
      },
      nav: {
        brand: 'VIKTOR RADYUK',
        aria: 'Navigation',
        switchToEn: 'Switch to English',
        switchToRu: 'Switch to Russian',
        experience: { long: 'EXPERIENCE & PROJECTS', short: 'experience' },
        contacts: { long: 'CONTACTS', short: 'telegram' },
      },
      hero: { aria: 'Multidisciplinary Product Designer' },
      carousel: { aria: 'Projects' },
      intro: {
        avatarAlt: 'Viktor Radyuk',
        text:
          "Hi, I'm Viktor — a senior designer with 6 years of experience. I focus on mobile apps and web platforms. I help teams build product design expertise and processes, strong teams, and effective solutions.",
      },
      section: { experience: 'Experience & projects' },
      shared: {
        years: 'Years',
        role: 'Role',
        platforms: 'Platforms',
        view: 'View',
        achievements: 'Achievements & contribution',
        results: 'Results',
        now: '2024 – Now',
      },
      exp: {
        stepa: {
          role:
            'Senior Designer — team leadership, research, design strategy, interaction design, visual design, mentorship',
          lead:
            'Grew from building interfaces to scaling design operations for mobile products. Established design standards and an AI-assisted handoff workflow from Figma to development.',
          a1: 'Designed interfaces for new mobile apps and improved existing products.',
          a2: 'Structured Figma work: components, styles, and variables with a systematic approach.',
          a3: 'Created internal guidelines for communication, task estimation, and design feedback.',
          a4: 'Built a new design-to-dev process: designers ship UI in Figma and move the UI foundation into code with AI tools.',
          r1: 'Improved consistency and quality of design work across the team.',
          r2: 'Reduced manual UI work for developers so they could focus on product functionality.',
          r3: 'Shortened the design-to-ship cycle from 3–4 months to a few weeks.',
          carouselAria: 'Stepa Dev — selected work',
        },
        quinky: {
          role:
            'Product (UI/UX) Designer — scoping, research, interaction design, visual design, prototyping',
          lead:
            'Designed an app for Gen Z, evolved core product flows, and led the design process closely with engineering.',
          a1: 'Scoped features, ran research, and designed flows, visual design, and interactive prototypes.',
          a2: 'Built a mobile app for a wellness startup, working closely with frontend and backend engineers.',
          a3: 'Analyzed Gen Z user feedback to improve onboarding and key journeys.',
          a4: 'Introduced gamification mechanics aligned with audience interests and behavior',
          r1: 'Led end-to-end product design process ownership.',
          r2: 'Maintained UX coherence and visual quality across all development stages.',
          r3: 'Mentored junior designers to help the team work more systematically.',
          carouselAria: 'Quinky — materials',
        },
        allo: {
          role: 'Graphic designer / Web designer',
          lead: 'Built 50+ responsive websites for startups, local businesses, and e-commerce.',
          a1: 'Designed responsive sites and landing pages across industries — from local businesses to e-commerce.',
          a2: 'Owned the full design cycle: discovery, UX structure, visual concept, and final layouts.',
          a3: 'Presented solutions to clients, justified design decisions, and iterated against business goals.',
          r1: 'Delivered 50+ responsive websites for commercial projects',
          r2: 'Established efficient team collaboration to ship sites on tight timelines.',
          carouselAria: 'Allogalochka — selected work',
          mainAlt: 'namu buro — projects page',
          workAlt: 'Work sample',
        },
        langy: {
          lead: 'Built a smart automatic keyboard layout switcher for macOS.',
          a1: 'A smart automatic keyboard layout switcher for macOS. It helps users avoid layout mistakes and learn while working without breaking their flow.',
          appStoreAria: 'Auto layout RU/EN – Langy on the App Store',
          carouselAria: 'Langy — screens',
        },
      },
      footer: {
        copy: 'Viktor Radyuk © 2026',
        aria: 'Contacts',
      },
    },
  };

  function getLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' ? 'en' : 'ru';
  }

  function t(key, lang) {
    lang = lang || getLang();
    var parts = key.split('.');
    var value = translations[lang];
    var i;
    for (i = 0; i < parts.length; i += 1) {
      if (value == null) break;
      value = value[parts[i]];
    }
    if (typeof value !== 'string') {
      value = translations.ru;
      for (i = 0; i < parts.length; i += 1) {
        if (value == null) break;
        value = value[parts[i]];
      }
    }
    return typeof value === 'string' ? value : key;
  }

  function apply(lang) {
    lang = lang || getLang();
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'), lang);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      el.alt = t(el.getAttribute('data-i18n-alt'), lang);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label'), lang));
    });

    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      el.setAttribute('data-content', t(el.getAttribute('data-i18n-content'), lang));
    });

    document.title = t('meta.title', lang);
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description', lang));

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      if (lang === 'ru') {
        toggle.textContent = 'ENG';
        toggle.setAttribute('aria-label', t('nav.switchToEn', lang));
      } else {
        toggle.textContent = 'RU';
        toggle.setAttribute('aria-label', t('nav.switchToRu', lang));
      }
    }
  }

  function setLang(lang) {
    if (lang !== 'ru' && lang !== 'en') return;
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
    window.dispatchEvent(
      new CustomEvent('languagechange', { detail: { lang: lang } })
    );
  }

  function initSwitcher() {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      setLang(getLang() === 'ru' ? 'en' : 'ru');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(getLang());
    initSwitcher();
  });

  window.portfolioI18n = { getLang: getLang, setLang: setLang, t: t, apply: apply };
})();
