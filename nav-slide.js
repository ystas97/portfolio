(function () {
  document.querySelectorAll('.nav__links--slide a').forEach(function (link) {
    if (!link.dataset.content) {
      link.dataset.content = link.textContent.trim();
    }
    if (link.parentElement.classList.contains('nav-link-slide')) return;
    var wrap = document.createElement('span');
    wrap.className = 'nav-link-slide';
    link.parentNode.insertBefore(wrap, link);
    wrap.appendChild(link);
  });
})();
