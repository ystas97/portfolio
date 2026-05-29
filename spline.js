// Скрываем плашку «Built with Spline» внутри shadow DOM вьюера.
// Shadow root у <spline-viewer> открытый, поэтому ссылку #logo можно
// надёжно спрятать из основного документа.
(function () {
  const viewer = document.querySelector('spline-viewer');
  if (!viewer) return;

  function hideLogo() {
    const sr = viewer.shadowRoot;
    if (!sr) return false;
    const logo = sr.querySelector('#logo, a[href*="spline.design"]');
    if (logo) {
      logo.style.display = 'none';
      return true;
    }
    return false;
  }

  // Лого появляется после загрузки сцены — опрашиваем, пока не найдём.
  if (!hideLogo()) {
    const timer = setInterval(() => {
      if (hideLogo()) clearInterval(timer);
    }, 250);
    setTimeout(() => clearInterval(timer), 20000);

    // На случай повторной вставки лого — следим за shadow DOM.
    const sr = viewer.shadowRoot;
    if (sr && 'MutationObserver' in window) {
      new MutationObserver(hideLogo).observe(sr, { childList: true, subtree: true });
    }
  }
})();
