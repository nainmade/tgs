;(() => {
  const THEME_KEY = 'gera-theme';

  function applyTheme(t) {
    const themeBtn = document.getElementById('theme-toggle');
    document.documentElement.classList.toggle('dark', t === 'dark');
    if (themeBtn) themeBtn.checked = (t === 'dark');
  }

  function getInitialTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return stored;
      const legacy = localStorage.getItem('tgs-theme');
      if (legacy) return legacy;
    } catch {}
    return document.documentElement.getAttribute('data-default-theme') || 'light';
  }

  function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    applyTheme(getInitialTheme());
    if (!themeBtn) return;
    themeBtn.addEventListener('change', () => {
      const next = themeBtn.checked ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch {}
    });
  }

  function initPageNav() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll('.page-nav a[data-nav], .page-switch a[data-nav]').forEach((link) => {
      const isCurrent = link.dataset.nav === page;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function initStickyBar() {
    const stickybar = document.getElementById('stickybar');
    if (!stickybar) return;

    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:8px;left:0;height:1px;width:1px;pointer-events:none';
    document.body.prepend(sentinel);

    const io = new IntersectionObserver(([entry]) => {
      if (document.body.dataset.sticky !== 'on') {
        stickybar.classList.remove('is-stuck');
        return;
      }
      stickybar.classList.toggle('is-stuck', !entry.isIntersecting);
    }, { threshold: 0, rootMargin: '-1px 0px 0px 0px' });
    io.observe(sentinel);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initPageNav();
    initStickyBar();
  });
})();
