// ===== DON CAN — app.js =====

// Floating paws
(function(){
  var bg=document.getElementById('pawBg');if(!bg)return;
  for(var i=0;i<22;i++){
    var s=document.createElement('span');
    s.className='pf';s.textContent='🐾';
    s.style.left=Math.random()*100+'%';
    s.style.fontSize=(1+Math.random()*2.5)+'rem';
    s.style.animationDuration=(14+Math.random()*18)+'s';
    s.style.animationDelay=(Math.random()*16)+'s';
    bg.appendChild(s);
  }
})();

// Sticky header
var hdr=document.getElementById('mainHeader');
window.addEventListener('scroll',function(){
  hdr.classList.toggle('scrl',window.scrollY>40);
  document.getElementById('upBtn').classList.toggle('show',window.scrollY>350);
});

// Burger menu
var burger=document.getElementById('burger'),nav=document.getElementById('nav');
burger.addEventListener('click',function(){
  var o=nav.classList.toggle('open');
  burger.classList.toggle('open',o);
  burger.setAttribute('aria-expanded',o);
});
nav.querySelectorAll('.nl').forEach(function(l){
  l.addEventListener('click',function(){
    nav.classList.remove('open');burger.classList.remove('open');
  });
});

// Active nav on scroll
var secs=document.querySelectorAll('section[id]'),links=document.querySelectorAll('.nl');
window.addEventListener('scroll',function(){
  var cur='';
  secs.forEach(function(s){if(window.scrollY>=s.offsetTop-120)cur=s.id;});
  links.forEach(function(l){
    l.classList.toggle('act',l.getAttribute('href')==='#'+cur);
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

// Back to top
document.getElementById('upBtn').addEventListener('click',function(){
  window.scrollTo({top:0,behavior:'smooth'});
});

// Reveal on scroll
var ro=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in');});
},{threshold:0.1});
document.querySelectorAll('.card,.pet,.tcard,.val,.stat,.ci-item,.sec-head,.nos-left,.nos-right').forEach(function(el){
  el.classList.add('rev');ro.observe(el);
});

// Counter animation
function countUp(el){
  var target=parseInt(el.getAttribute('data-target'));
  var start=performance.now();
  var dur=2000;
  (function tick(now){
    var p=Math.min((now-start)/dur,1);
    var ease=1-Math.pow(1-p,3);
    el.textContent=Math.floor(ease*target);
    if(p<1)requestAnimationFrame(tick);else el.textContent=target;
  })(start);
}
var so=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      e.target.querySelectorAll('.stat-n').forEach(countUp);
      so.unobserve(e.target);
    }
  });
},{threshold:0.5});
var sb=document.querySelector('.stats-sec');
if(sb)so.observe(sb);

// Contact form
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  var n=document.getElementById('fNombre').value.trim();
  var t=document.getElementById('fTel').value.trim();
  var m=document.getElementById('fMascota').value.trim();
  var tp=document.getElementById('fTipo').value;
  var sv=document.getElementById('fSvc').value;
  if(!n||!t||!m||!tp||!sv){alert('🐾 Por favor completa todos los campos requeridos.');return;}
  var btn=document.getElementById('fSubmit');
  btn.disabled=true;btn.textContent='⏳ Enviando...';
  setTimeout(function(){
    this.reset();
    var ok=document.getElementById('formOk');
    ok.hidden=false;
    ok.textContent='✅ ¡Gracias '+n+'! Te contactaremos pronto para confirmar la cita de '+m+' 🐾';
    btn.disabled=false;btn.textContent='🐾 Solicitar cita';
    setTimeout(function(){ok.hidden=true;},7000);
  }.bind(this),1200);
});

// Stagger cards
document.querySelectorAll('.grid-3 .card').forEach(function(c,i){
  c.style.transitionDelay=(i*0.07)+'s';
});
document.querySelectorAll('.pet').forEach(function(p,i){
  p.style.transitionDelay=(i*0.06)+'s';
});

console.log('🐾 Clínica Veterinaria Don Can – Cargado!');
