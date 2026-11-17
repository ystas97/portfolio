/* Английские тексты проектов для страниц /en/.
   Подключается после projects.js и подменяет lead, about и tags.
   Новый проект — добавить сюда запись с тем же slug. */

window.PROJECTS_EN = {
  "food-scanner": {
    tags: ["App", "UX/UI design"],
    lead: "An app for scanning food, tracking nutrition and staying active",
    about:
      "Food Scanner brings food scanning, nutrition tracking, recipes and activity tracking together in one app. It helps people keep an eye on calories and nutrients, choose portion sizes and see their progress.\n\nDesign of the core screens: from onboarding and meal details to workouts and nutrition stats. The presentation is rounded out with bright food characters, mockups and animated videos."
  },
  upcleanup: {
    tags: ["App", "UX/UI redesign"],
    lead: "An iPhone gallery cleaner where clutter goes away with a single swipe",
    about:
      "An iPhone gallery cleaner: similar photos, screenshots and duplicates are removed with a swipe, heavy videos get compressed, and private files can be hidden away."
  },
  "2number": {
    tags: ["App", "iOS"],
    lead: "An iOS app with virtual numbers from different countries for calls and texts",
    about:
      "An iPhone app for buying a virtual number from another country and taking calls and texts on it — for work, sign-ups and listings."
  },
  "tcg-scanner": {
    tags: ["App", "UX/UI redesign"],
    lead: "An app for scanning, valuing and organising trading cards",
    about:
      "An app for trading card collectors: it scans a card, estimates its value, checks authenticity and saves it to the collection."
  },
  "namu-buro": {
    tags: ["Website", "UX/UI design"],
    lead: "An architectural buro with interior design and its own designer furniture",
    about:
      "A website for an architectural buro that designs interiors and produces its own designer furniture."
  },
  "lim-cc": {
    tags: ["Website", "Online shop"],
    lead: "A cycling café that brought together a community of cycling fans",
    about:
      "A website and online shop for a cycling café that brings together a community of cycling fans."
  },
  langy: {
    tags: ["macOS", "UX/UI design"],
    lead: "A macOS app that switches your keyboard layout automatically",
    about:
      "A macOS app that switches your keyboard layout automatically and learns as you work."
  },
  foremost: {
    tags: ["Website", "UX/UI design"],
    lead: "Skincare for women based on active ingredients",
    about: "A website for a women's skincare brand built on active ingredients."
  },
  "architectural-bureau": {
    tags: ["Website", "UX/UI design"],
    lead: "Petr Safioulline's architectural bureau with its own furniture line",
    about:
      "A website for the architectural bureau of Petr Safioulline — an architect and the author of his own furniture line."
  },
  quinky: {
    tags: ["App", "UX/UI design"],
    lead: "A bright, playful mobile app with audio guides",
    about:
      "An inclusive app with audio guides: practical, playful content about intimacy and relationships."
  },
  winrun: {
    tags: ["Online shop", "UX/UI design"],
    lead: "An online shop and identity for a sneaker brand built around movement",
    about:
      "An online shop for a sneaker brand with a subscription: comfort, personal style and a fresh pair on a regular basis."
  },
  corpsoft24: {
    tags: ["Website", "UX/UI design"],
    lead: "A corporate services platform in one clear, responsive website",
    about:
      "A website for a digital ecosystem that gives businesses access to corporate IT services in one place."
  }
};

if (document.documentElement.lang === "en") {
  window.PROJECTS.forEach((p) => Object.assign(p, window.PROJECTS_EN[p.slug] || {}));
}
