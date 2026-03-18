/* ============================================================
   shared.js — cursor, dark mode toggle, hamburger drawer
   Include at bottom of every page's <body>
   ============================================================ */

// ── CURSOR ──
(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let rx = 0, ry = 0, mx = window.innerWidth / 2, my = window.innerHeight / 2;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    ring.classList.toggle('hover', !!e.target.closest('a, button'));
  });
})();

// ── DARK MODE ──
(function () {
  const html    = document.documentElement;
  const toggles = document.querySelectorAll('.theme-toggle');
  const saved   = localStorage.getItem('ayu-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  function toggleTheme() {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('ayu-theme', next);
  }
  toggles.forEach(t => t.addEventListener('click', toggleTheme));
  // expose globally so drawer button can call it too
  window.toggleTheme = toggleTheme;
})();

// ── HAMBURGER / DRAWER ──
(function () {
  const burger = document.getElementById('hamburger');
  const drawer = document.getElementById('navDrawer');
  if (!burger || !drawer) return;

  window.toggleDrawer = function () {
    const open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  // Close drawer and navigate (used by single-page sections)
  window.drawerNav = function (section) {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
    if (typeof showSection === 'function') showSection(section);
  };
})();
