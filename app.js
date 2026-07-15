// ===== DON CAN - app.js =====

// Floating Paw Background
(function createPaws() {
  const bg = document.getElementById('pawBg');
  if (!bg) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('span');
    p.className = 'paw-float';
    p.textContent = '🐾';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (12 + Math.random() * 20) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.fontSize = (1 + Math.random() * 2.5) + 'rem';
    bg.appendChild(p);
  }
})();

// Hero Particles
(function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 8) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.background = Math.random() > 0.5 ? '#00d4d8' : '#ff7d1a';
    container.appendChild(p);
  }
})();

// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });
}

// Active Nav on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .pet-card, .testimonio-card, .valor-item, .stat-item, .contact-item, .section-head, .nosotros-content, .nosotros-img-wrap'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Counter Animation
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) statsObserver.observe(statsBanner);

// Back to Top
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (backTop) {
    if (window.scrollY > 400) backTop.classList.add('visible');
    else backTop.classList.remove('visible');
  }
});

if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreDueno').value.trim();
    const tel = document.getElementById('telefono').value.trim();
    const mascota = document.getElementById('nombreMascota').value.trim();
    const tipo = document.getElementById('tipoMascota').value;
    const svc = document.getElementById('servicio').value;

    if (!nombre || !tel || !mascota || !tipo || !svc) {
      alert('🐾 Por favor completa todos los campos requeridos.');
      return;
    }

    const submitBtn = document.getElementById('submitFormBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Enviando...';

    setTimeout(() => {
      contactForm.reset();
      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.textContent = '✅ ¡Gracias ' + nombre + '! Nos pondremos en contacto contigo pronto para confirmar la cita de ' + mascota + ' 🐾';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = '🐾 Solicitar cita';

      setTimeout(() => {
        if (formSuccess) formSuccess.hidden = true;
      }, 6000);
    }, 1200);
  });
}

// Pet Card Hover Sound Effect (visual only)
document.querySelectorAll('.pet-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.pet-emoji').style.animation = 'none';
    setTimeout(() => {
      card.querySelector('.pet-emoji').style.animation = '';
    }, 10);
  });
});

// Add staggered delays to cards
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
});

document.querySelectorAll('.pet-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.06) + 's';
});

console.log('🐾 Clínica Veterinaria Don Can - Loaded!');
