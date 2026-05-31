// Скрываем плашку «Built with Spline» внутри shadow DOM вьюера (в т.ч. вложенных).
(function () {
  var viewer = document.querySelector('spline-viewer');
  if (!viewer) return;

  var LOGO_SELECTORS =
    '#logo, #spline-logo, #watermark, a[href*="spline.design"], a[href*="splinetool"], ' +
    'a[href*="splinecommunity"], [class*="logo"], [class*="Logo"], [class*="watermark"], ' +
    '[id*="logo"], [id*="Logo"], [id*="watermark"]';

  function hideInRoot(root) {
    if (!root || !root.querySelectorAll) return 0;
    var count = 0;

    root.querySelectorAll(LOGO_SELECTORS).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
      count += 1;
    });

    root.querySelectorAll('a, button').forEach(function (el) {
      var label = (el.textContent || '').trim().toLowerCase();
      if (
        label.length < 40 &&
        (label.indexOf('built with spline') !== -1 || label === 'spline')
      ) {
        el.style.setProperty('display', 'none', 'important');
        count += 1;
      }
    });

    root.querySelectorAll('*').forEach(function (el) {
      if (el.shadowRoot) count += hideInRoot(el.shadowRoot);
    });

    return count;
  }

  function hideLogo() {
    hideInRoot(viewer.shadowRoot);
    return true;
  }

  function attachObserver() {
    var sr = viewer.shadowRoot;
    if (!sr || viewer.__splineLogoObs) return;
    viewer.__splineLogoObs = new MutationObserver(hideLogo);
    viewer.__splineLogoObs.observe(sr, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden'],
    });
  }

  function boot() {
    hideLogo();
    attachObserver();
  }

  boot();

  var poll = window.setInterval(boot, 200);
  window.setTimeout(function () {
    window.clearInterval(poll);
  }, 60000);

  if (!viewer.shadowRoot) {
    var waitRoot = new MutationObserver(function () {
      if (viewer.shadowRoot) {
        boot();
        waitRoot.disconnect();
      }
    });
    waitRoot.observe(viewer, { childList: true });
  }

  viewer.addEventListener('load', boot);

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) boot();
  });
})();
