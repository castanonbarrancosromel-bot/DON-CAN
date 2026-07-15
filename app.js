// ===== DON CAN — app.js =====

// Patas flotantes de fondo
(function() {
  var bg = document.getElementById('pawBg');
  if (!bg) return;
  for (var i = 0; i < 24; i++) {
    var s = document.createElement('span');
    s.className = 'pf';
    s.textContent = String.fromCodePoint(0x1F43E);
    s.style.left = (Math.random() * 100) + '%';
    s.style.fontSize = (1 + Math.random() * 2.5) + 'rem';
    s.style.animationDuration = (13 + Math.random() * 18) + 's';
    s.style.animationDelay = (Math.random() * 15) + 's';
    bg.appendChild(s);
  }
})();

// Header scroll
var hdr = document.getElementById('header');
var upbtn = document.getElementById('upbtn');
window.addEventListener('scroll', function() {
  hdr.classList.toggle('scrl', window.scrollY > 40);
  upbtn.classList.toggle('show', window.scrollY > 350);
});

// Burger menu
var burger = document.getElementById('burger');
var nav = document.getElementById('nav');
burger.addEventListener('click', function() {
  var open = nav.classList.toggle('open');
  burger.classList.toggle('open', open);
});
nav.querySelectorAll('.nl').forEach(function(l) {
  l.addEventListener('click', function() {
    nav.classList.remove('open');
    burger.classList.remove('open');
  });
});

// Active nav al hacer scroll
var secs = document.querySelectorAll('section[id]');
var links = document.querySelectorAll('.nl');
window.addEventListener('scroll', function() {
  var cur = '';
  secs.forEach(function(s) {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  links.forEach(function(l) {
    l.classList.toggle('act', l.getAttribute('href') === '#' + cur);
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Subir arriba
upbtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === PERRITO ANIMADO - INTERACTIVO ===
var perritoWrap = document.getElementById('perritoWrap');
var bubble = document.getElementById('bubble');

// Mensajes divertidos del perrito
var msgs = [
  String.fromCodePoint(0x1F436) + ' Hola! Soy el perrito de Don Can ' + String.fromCodePoint(0x1F60A),
  String.fromCodePoint(0x1F43E) + ' Tu mascota esta en buenas manos!',
  String.fromCodePoint(0x2764) + String.fromCodePoint(0xFE0F) + ' Cuidamos a quienes amas!',
  String.fromCodePoint(0x1F4DE) + ' Llama al 70749570 ya!',
  String.fromCodePoint(0x1F6E1) + String.fromCodePoint(0xFE0F) + ' Amor, Cuidado y Salud!'
];
var msgIdx = 0;

if (perritoWrap) {
  // Mostrar burbuja al hacer hover/click
  perritoWrap.addEventListener('mouseenter', function() {
    bubble.textContent = msgs[msgIdx % msgs.length];
    msgIdx++;
  });

  // Click = saltar y cambiar mensaje
  perritoWrap.addEventListener('click', function() {
    bubble.textContent = msgs[msgIdx % msgs.length];
    msgIdx++;
    perritoWrap.classList.add('show-bubble');
    // Efecto salto extra
    perritoWrap.style.animation = 'none';
    setTimeout(function() {
      perritoWrap.style.animation = '';
    }, 50);
    clearTimeout(perritoWrap._hideTimer);
    perritoWrap._hideTimer = setTimeout(function() {
      perritoWrap.classList.remove('show-bubble');
    }, 3000);
  });

  // Mostrar burbuja automaticamente cada 6 segundos
  setInterval(function() {
    bubble.textContent = msgs[msgIdx % msgs.length];
    msgIdx++;
    perritoWrap.classList.add('show-bubble');
    setTimeout(function() {
      perritoWrap.classList.remove('show-bubble');
    }, 3500);
  }, 6000);
}

// Reveal on scroll
var ro = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card,.pet,.tcard,.val,.st,.citem,.sec-hd,.nos-img,.nos-txt').forEach(function(el) {
  el.classList.add('rev');
  ro.observe(el);
});

// Contadores animados
function countUp(el) {
  var target = parseInt(el.getAttribute('data-t'));
  var dur = 2000;
  var start = performance.now();
  (function tick(now) {
    var p = Math.min((now - start) / dur, 1);
    var ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  })(start);
}
var so = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sn').forEach(countUp);
      so.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
var sb = document.querySelector('.stats-sec');
if (sb) so.observe(sb);

// Formulario de contacto
var form = document.getElementById('form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var n = document.getElementById('fn').value.trim();
    var t = document.getElementById('ft').value.trim();
    var m = document.getElementById('fm').value.trim();
    var ti = document.getElementById('fti').value;
    var sv = document.getElementById('fs').value;
    if (!n || !t || !m || !ti || !sv) {
      alert(String.fromCodePoint(0x1F43E) + ' Por favor completa todos los campos requeridos.');
      return;
    }
    var btn = document.getElementById('fsub');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(function() {
      form.reset();
      var ok = document.getElementById('fok');
      ok.style.display = 'block';
      ok.textContent = String.fromCodePoint(0x2705) + ' Gracias ' + n + '! Nos contactaremos para confirmar la cita de ' + m + ' ' + String.fromCodePoint(0x1F43E);
      btn.disabled = false;
      btn.textContent = String.fromCodePoint(0x1F43E) + ' Solicitar cita';
      setTimeout(function() { ok.style.display = 'none'; }, 7000);
    }, 1200);
  });
}

// Stagger en cards
document.querySelectorAll('.grid3 .card').forEach(function(c, i) {
  c.style.transitionDelay = (i * 0.07) + 's';
});
document.querySelectorAll('.pet').forEach(function(p, i) {
  p.style.transitionDelay = (i * 0.06) + 's';
});

console.log(String.fromCodePoint(0x1F43E) + ' Clinica Veterinaria Don Can - Cargado!');
