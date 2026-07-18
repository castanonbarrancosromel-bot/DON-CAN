/* ============================================
   VETERINARIA DON CAN — app.js
   JavaScript Premium — Rediseño Total
   ============================================ */

/* ── Patitas caminando por toda la página ── */
(function createPaws() {
  const bg = document.getElementById('pawBg');
  if (!bg) return;

  const trails = [
    { x:  5, y:  8, dir:  40, sz: 1.5, dur: 7  },
    { x: 18, y: 32, dir: -35, sz: 1.2, dur: 9  },
    { x: 38, y:  3, dir:  55, sz: 1.7, dur: 6  },
    { x: 55, y: 18, dir:  30, sz: 1.1, dur: 10 },
    { x: 72, y: 45, dir: -48, sz: 1.6, dur: 8  },
    { x: 84, y:  7, dir:  50, sz: 1.0, dur: 11 },
    { x: 12, y: 58, dir:  38, sz: 1.4, dur: 7  },
    { x: 48, y: 68, dir: -22, sz: 1.3, dur: 9  },
    { x: 28, y: 82, dir:  52, sz: 1.1, dur: 8  },
    { x: 68, y: 78, dir: -42, sz: 1.7, dur: 6  },
    { x: 91, y: 38, dir:  28, sz: 1.2, dur: 10 },
    { x: 14, y: 44, dir: -55, sz: 1.5, dur: 7  },
    { x: 60, y: 55, dir:  45, sz: 1.3, dur: 9  },
    { x: 33, y: 20, dir: -30, sz: 1.6, dur: 8  },
    { x: 78, y: 25, dir:  60, sz: 1.0, dur: 11 },
    { x:  3, y: 75, dir:  35, sz: 1.4, dur: 6  },
  ];

  trails.forEach(trail => {
    const pawsInTrail = 4 + Math.floor(Math.random() * 3);
    const dir = trail.dir || 45;
    const baseDelay = -(Math.random() * 18);

    for (let p = 0; p < pawsInTrail; p++) {
      const pf = document.createElement('div');
      pf.className = 'pf';
      pf.textContent = '🐾';

      const rad   = (dir * Math.PI) / 180;
      const stepX = Math.cos(rad) * 5.5;
      const stepY = Math.sin(rad) * 4.5;
      const side  = p % 2 === 0 ? -2 : 2;
      const sideX = Math.cos(rad + Math.PI / 2) * side;
      const sideY = Math.sin(rad + Math.PI / 2) * side;

      const px  = Math.max(1, Math.min(94, trail.x + p * stepX + sideX));
      const py  = Math.max(1, Math.min(94, trail.y + p * stepY + sideY));
      const op  = 0.05 + Math.random() * 0.07;
      const rot = dir + (p % 2 === 0 ? -8 : 8);

      pf.style.cssText = `
        left:${px}%; top:${py}%;
        font-size:${trail.sz}rem;
        animation-duration:${trail.dur + p * 0.4}s;
        animation-delay:${baseDelay - p * (trail.dur / pawsInTrail * 0.9)}s;
        --rot:${rot}deg; --mop:${op};
      `;
      bg.appendChild(pf);
    }
  });
})();

/* ── Partículas doradas en el hero ── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${12 + Math.random() * 16}s;
      animation-delay: ${-Math.random() * 20}s;
      width:${1 + Math.random() * 2}px;
      height:${1 + Math.random() * 2}px;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
})();

/* ── Header scroll ── */
(function headerScroll() {
  const header = document.getElementById('header');
  const fabUp  = document.getElementById('fabUp');
  if (!header) return;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (fabUp) fabUp.classList.toggle('show', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Burger menu ── */
(function burgerMenu() {
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });

  nav.querySelectorAll('.nl').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      burger.classList.remove('open');
    }
  });
})();

/* ── Nav link activo en scroll ── */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nl');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();

/* ── Reveal en scroll ── */
(function revealOnScroll() {
  const elems = document.querySelectorAll('.rev');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  elems.forEach(el => obs.observe(el));
})();

/* ── Contadores animados ── */
(function animateCounters() {
  const nums = document.querySelectorAll('.stat-num[data-t]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.t;
      const dur = 1800;
      const step = target / (dur / 16);
      let current = 0;
      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
})();

/* ── Formulario ── */
(function handleForm() {
  const form = document.getElementById('form');
  const fok  = document.getElementById('fok');
  if (!form || !fok) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(f => {
      f.style.borderColor = f.value.trim() ? '' : 'rgba(220,60,60,.6)';
      if (!f.value.trim()) valid = false;
    });
    if (!valid) return;

    const btn = document.getElementById('fsub');
    btn.textContent = '⏳ Enviando…';
    btn.disabled = true;

    setTimeout(() => {
      fok.style.display = 'block';
      fok.textContent   = '✅ ¡Solicitud enviada! Te contactaremos muy pronto. 🐾';
      form.reset();
      btn.textContent = '🐾 Solicitar cita';
      btn.disabled    = false;
    }, 1400);
  });
})();

/* ── Subir al tope ── */
(function scrollTop() {
  const btn = document.getElementById('fabUp');
  if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
