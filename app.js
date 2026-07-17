/* ====================================
   VETERINARIA DON CAN — app.js
   ==================================== */

/* ── Patas flotantes de fondo ── */
(function createPaws() {
  const bg = document.getElementById('pawBg');
  if (!bg) return;
  for (let i = 0; i < 14; i++) {
    const pf = document.createElement('div');
    pf.className = 'pf';
    pf.textContent = '🐾';
    pf.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${10 + Math.random() * 16}s;
      animation-delay: ${-Math.random() * 18}s;
      font-size: ${1.2 + Math.random() * 1.6}rem;
    `;
    bg.appendChild(pf);
  }
})();

/* ── Partículas doradas en el hero ── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 1 + Math.random() * 3;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${8 + Math.random() * 14}s;
      animation-delay: ${-Math.random() * 16}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

/* ── Header scroll ── */
(function headerScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrl', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Burger (menú móvil) ── */
(function burgerMenu() {
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  if (!burger || !nav) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('.nl').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
})();

/* ── Nav activo en scroll ── */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nl');
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('act', l.getAttribute('href') === `#${id}`));
      }
    }),
    { threshold: .4 }
  );
  sections.forEach(s => obs.observe(s));
})();

/* ── Reveal en scroll ── */
(function revealOnScroll() {
  const revEls = document.querySelectorAll('.rev');
  if (!revEls.length) return;
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
    { threshold: .14 }
  );
  revEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    obs.observe(el);
  });
})();

/* ── Contadores estadísticas ── */
(function statsCounter() {
  const nums = document.querySelectorAll('.sn[data-t]');
  if (!nums.length) return;
  const countUp = el => {
    const target = parseInt(el.dataset.t, 10);
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  };
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); }
    }),
    { threshold: .5 }
  );
  nums.forEach(n => obs.observe(n));
})();

/* ── Botón subir ── */
(function scrollToTop() {
  const btn = document.getElementById('upbtn');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── Formulario de cita ── */
(function formHandler() {
  const form = document.getElementById('form');
  const fok  = document.getElementById('fok');
  if (!form || !fok) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = form.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(f => {
      f.style.borderColor = '';
      if (!f.value.trim()) {
        f.style.borderColor = '#c8a84b';
        valid = false;
      }
    });

    if (!valid) return;

    const btn = document.getElementById('fsub');
    btn.textContent = '🐾 Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      fok.style.display = 'block';
      fok.textContent = '🐾 ¡Cita solicitada! Nos comunicaremos pronto al número que indicaste. ¡Gracias por confiar en Veterinaria Don Can!';
      form.reset();
      btn.textContent = '🐾 Solicitar cita';
      btn.disabled = false;
      setTimeout(() => { fok.style.display = 'none'; }, 6000);
    }, 1400);
  });
})();

/* ── Parallax suave en el logo hero ── */
(function heroParallax() {
  const wrap = document.getElementById('heroLogoWrap');
  if (!wrap) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    wrap.style.transform = `translateY(${y * 0.08}px)`;
  }, { passive: true });
})();
