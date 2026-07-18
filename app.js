/* ====================================
   VETERINARIA DON CAN — app.js
   ==================================== */

/* ── Patitas caminando por toda la página ── */
(function createPaws() {
  const bg = document.getElementById('pawBg');
  if (!bg) return;

  /* Trails de caminata — cada trail = una senda diagonal de patitas */
  const trails = [
    { x:  5, y:  8, dir:  40, sz: 1.5, dur: 7  },
    { x: 18, y: 32, dir: -35, sz: 1.2, dur: 9  },
    { x: 38, y:  3, dir:  55, sz: 1.7, dur: 6  },
    { x: 55, y: 18, dir:  30, sz: 1.1, dur: 10 },
    { x: 72, y: 45, dir: -48, sz: 1.6, dur: 8  },
    { x: 84, y:  7, dir:  50, sz: 1.0, dur: 11 },
    { x: 12, y: 58, dir:  38, sz: 1.4, dur: 7  },
    { x: 48, y: 68, dir: -22, sz: 1.3, dur: 9  },
    { x: 28, y: 82, dur:  52, sz: 1.1, dur: 8  },
    { x: 68, y: 78, dir: -42, sz: 1.7, dur: 6  },
    { x: 91, y: 38, dir:  28, sz: 1.2, dur: 10 },
    { x: 14, y: 44, dir: -55, sz: 1.5, dur: 7  },
    { x: 60, y: 55, dir:  45, sz: 1.3, dur: 9  },
    { x: 33, y: 20, dir: -30, sz: 1.6, dur: 8  },
    { x: 78, y: 25, dir:  60, sz: 1.0, dur: 11 },
    { x:  3, y: 75, dir:  35, sz: 1.4, dur: 6  },
  ];

  trails.forEach((trail, t) => {
    const pawsInTrail = 4 + Math.floor(Math.random() * 3); // 4–6 patitas por trail
    const dir = trail.dir || 45;
    const baseDelay = -(Math.random() * 18);

    for (let p = 0; p < pawsInTrail; p++) {
      const pf = document.createElement('div');
      pf.className = 'pf';
      pf.textContent = '🐾';

      /* Offset por paso en la dirección del trail */
      const rad = (dir * Math.PI) / 180;
      const stepX = Math.cos(rad) * 5.5;
      const stepY = Math.sin(rad) * 4.5;
      /* Alternancia izquierda/derecha como caminar real */
      const side = (p % 2 === 0 ? -2 : 2);
      const sideX = Math.cos(rad + Math.PI / 2) * side;
      const sideY = Math.sin(rad + Math.PI / 2) * side;

      const px = Math.max(1, Math.min(94, trail.x + p * stepX + sideX));
      const py = Math.max(1, Math.min(94, trail.y + p * stepY + sideY));
      const opacity = 0.05 + Math.random() * 0.07;
      const pawDir = dir + (p % 2 === 0 ? -8 : 8); /* ligera rotación alternada */

      pf.style.cssText = `
        left: ${px}%;
        top: ${py}%;
        font-size: ${trail.sz}rem;
        animation-duration: ${trail.dur + p * 0.4}s;
        animation-delay: ${baseDelay - p * (trail.dur / pawsInTrail * 0.9)}s;
        --rot: ${pawDir}deg;
        --mop: ${opacity};
      `;
      bg.appendChild(pf);
    }
  });
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
