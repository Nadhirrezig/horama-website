const glow = document.getElementById('mouse-glow');
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0, rx=0, ry=0;
window.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
  glow.style.left=mx+'px'; glow.style.top=my+'px';
});
(function loop(){ rx += (mx-rx)*0.18; ry += (my-ry)*0.18; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
document.querySelectorAll('[data-cursor], a, button').forEach(el=>{
  el.addEventListener('mouseenter', ()=> document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', ()=> document.body.classList.remove('hovering'));
});

window.addEventListener('load', ()=> document.getElementById('hero').classList.add('loaded'));

const header = document.getElementById('site-header');
window.addEventListener('scroll', ()=> header.classList.toggle('scrolled', window.scrollY > 40));

// ---------- mobile menu ----------
const menuToggle = document.getElementById('menu-toggle');
const navlinks = document.getElementById('navlinks');
const navBackdrop = document.getElementById('nav-backdrop');

function closeMobileMenu(){
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  navlinks.classList.remove('open');
  navBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', ()=>{
  const isOpen = navlinks.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  navBackdrop.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navBackdrop.addEventListener('click', closeMobileMenu);

// on mobile, tap the dropdown arrow to expand "À propos" instead of navigating away
document.querySelectorAll('.nav-dropdown').forEach(drop=>{
  const arrow = drop.querySelector('.dropdown-arrow');
  arrow.addEventListener('click', e=>{
    if(window.innerWidth > 860) return;
    e.preventDefault();
    e.stopPropagation();
    drop.classList.toggle('open');
  });
});

window.addEventListener('resize', ()=>{ if(window.innerWidth > 860) closeMobileMenu(); });

const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
}, {threshold:.15});
document.querySelectorAll('.reveal, .reveal-stagger, .philo').forEach(el=> io.observe(el));

const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(!en.isIntersecting) return;
    const target = en.target, end = parseInt(target.dataset.count,10), valEl = target.querySelector('.val');
    let cur = 0; const step = Math.max(1, Math.round(end/40));
    const tick = ()=>{ cur += step; if(cur >= end){ valEl.textContent = end; return; } valEl.textContent = cur; requestAnimationFrame(tick); };
    tick(); counterIO.unobserve(target);
  });
}, {threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=> counterIO.observe(el));

const archImg = document.getElementById('arch-img');
if(archImg){
  window.addEventListener('scroll', ()=>{
    const r = archImg.parentElement.getBoundingClientRect();
    archImg.style.transform = `translateY(${r.top * 0.12}px)`;
  });
}
