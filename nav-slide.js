(function () {
  function syncContent(link) {
    if (link.getAttribute('data-i18n-content') && window.portfolioI18n) {
      link.dataset.content = window.portfolioI18n.t(link.getAttribute('data-i18n-content'));
      return;
    }
    if (!link.dataset.content) {
      link.dataset.content = link.textContent.trim();
    }
  }

  document.querySelectorAll('.nav__links--slide a').forEach(function (link) {
    syncContent(link);
    if (link.parentElement.classList.contains('nav-link-slide')) return;
    var wrap = document.createElement('span');
    wrap.className = 'nav-link-slide';
    link.parentNode.insertBefore(wrap, link);
    wrap.appendChild(link);
  });

  window.addEventListener('languagechange', function () {
    document.querySelectorAll('.nav__links--slide a').forEach(syncContent);
  });
})();
