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

window.addEventListener('load', ()=>{
  const hero = document.getElementById('hero'); // not present on this page
  if(hero) hero.classList.add('loaded');

  // glide down to the form once the hero has had a moment to animate in;
  // skipped if the visitor has already scrolled (e.g. reload mid-page)
  const formSection = document.getElementById('formulaire');
  if(!formSection) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(()=>{
    if(window.scrollY > 10) return;
    const headerH = document.getElementById('site-header').offsetHeight;
    const top = formSection.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, 900);
});

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

// ---------- cursor: big hover state for the big email link ----------
document.querySelectorAll('[data-cursor-big]').forEach(el=>{
  el.addEventListener('mouseenter', ()=> document.body.classList.add('hovering-big','hovering'));
  el.addEventListener('mouseleave', ()=> document.body.classList.remove('hovering-big','hovering'));
});

// ---------- phone: full country list with per-country digit length ----------
const countries = [
  {n:"Afghanistan",c:"+93",d:9},{n:"Afrique du Sud",c:"+27",d:9},{n:"Albanie",c:"+355",d:9},
  {n:"Algérie",c:"+213",d:9},{n:"Allemagne",c:"+49",d:10},{n:"Andorre",c:"+376",d:6},
  {n:"Angola",c:"+244",d:9},{n:"Arabie Saoudite",c:"+966",d:9},{n:"Argentine",c:"+54",d:10},
  {n:"Arménie",c:"+374",d:8},{n:"Australie",c:"+61",d:9},{n:"Autriche",c:"+43",d:10},
  {n:"Azerbaïdjan",c:"+994",d:9},{n:"Bahamas",c:"+1242",d:7},{n:"Bahreïn",c:"+973",d:8},
  {n:"Bangladesh",c:"+880",d:10},{n:"Belgique",c:"+32",d:9},{n:"Bénin",c:"+229",d:8},
  {n:"Bhoutan",c:"+975",d:8},{n:"Biélorussie",c:"+375",d:9},{n:"Birmanie",c:"+95",d:9},
  {n:"Bolivie",c:"+591",d:8},{n:"Bosnie-Herzégovine",c:"+387",d:8},{n:"Botswana",c:"+267",d:8},
  {n:"Brésil",c:"+55",d:11},{n:"Brunei",c:"+673",d:7},{n:"Bulgarie",c:"+359",d:9},
  {n:"Burkina Faso",c:"+226",d:8},{n:"Burundi",c:"+257",d:8},{n:"Cambodge",c:"+855",d:9},
  {n:"Cameroun",c:"+237",d:9},{n:"Canada",c:"+1",d:10},{n:"Cap-Vert",c:"+238",d:7},
  {n:"Chili",c:"+56",d:9},{n:"Chine",c:"+86",d:11},{n:"Chypre",c:"+357",d:8},
  {n:"Colombie",c:"+57",d:10},{n:"Comores",c:"+269",d:7},{n:"Congo-Brazzaville",c:"+242",d:9},
  {n:"Congo-Kinshasa (RDC)",c:"+243",d:9},{n:"Corée du Nord",c:"+850",d:10},{n:"Corée du Sud",c:"+82",d:10},
  {n:"Costa Rica",c:"+506",d:8},{n:"Côte d'Ivoire",c:"+225",d:10},{n:"Croatie",c:"+385",d:9},
  {n:"Cuba",c:"+53",d:8},{n:"Danemark",c:"+45",d:8},{n:"Djibouti",c:"+253",d:8},
  {n:"Égypte",c:"+20",d:10},{n:"Émirats Arabes Unis",c:"+971",d:9},{n:"Équateur",c:"+593",d:9},
  {n:"Érythrée",c:"+291",d:7},{n:"Espagne",c:"+34",d:9},{n:"Estonie",c:"+372",d:8},
  {n:"Eswatini",c:"+268",d:8},{n:"États-Unis",c:"+1",d:10},{n:"Éthiopie",c:"+251",d:9},
  {n:"Fidji",c:"+679",d:7},{n:"Finlande",c:"+358",d:9},{n:"France",c:"+33",d:9},
  {n:"Gabon",c:"+241",d:8},{n:"Gambie",c:"+220",d:7},{n:"Géorgie",c:"+995",d:9},
  {n:"Ghana",c:"+233",d:9},{n:"Grèce",c:"+30",d:10},{n:"Guatemala",c:"+502",d:8},
  {n:"Guinée",c:"+224",d:9},{n:"Guinée équatoriale",c:"+240",d:9},{n:"Guinée-Bissau",c:"+245",d:7},
  {n:"Haïti",c:"+509",d:8},{n:"Honduras",c:"+504",d:8},{n:"Hongrie",c:"+36",d:9},
  {n:"Inde",c:"+91",d:10},{n:"Indonésie",c:"+62",d:10},{n:"Irak",c:"+964",d:10},
  {n:"Iran",c:"+98",d:10},{n:"Irlande",c:"+353",d:9},{n:"Islande",c:"+354",d:7},
  {n:"Israël",c:"+972",d:9},{n:"Italie",c:"+39",d:10},{n:"Jamaïque",c:"+1876",d:7},
  {n:"Japon",c:"+81",d:10},{n:"Jordanie",c:"+962",d:9},{n:"Kazakhstan",c:"+7",d:10},
  {n:"Kenya",c:"+254",d:9},{n:"Kirghizistan",c:"+996",d:9},{n:"Kiribati",c:"+686",d:5},
  {n:"Kosovo",c:"+383",d:8},{n:"Koweït",c:"+965",d:8},{n:"Laos",c:"+856",d:9},
  {n:"Lesotho",c:"+266",d:8},{n:"Lettonie",c:"+371",d:8},{n:"Liban",c:"+961",d:8},
  {n:"Libéria",c:"+231",d:8},{n:"Libye",c:"+218",d:9},{n:"Liechtenstein",c:"+423",d:7},
  {n:"Lituanie",c:"+370",d:8},{n:"Luxembourg",c:"+352",d:9},{n:"Macédoine du Nord",c:"+389",d:8},
  {n:"Madagascar",c:"+261",d:9},{n:"Malaisie",c:"+60",d:9},{n:"Malawi",c:"+265",d:9},
  {n:"Maldives",c:"+960",d:7},{n:"Mali",c:"+223",d:8},{n:"Malte",c:"+356",d:8},
  {n:"Maroc",c:"+212",d:9},{n:"Maurice",c:"+230",d:7},{n:"Mauritanie",c:"+222",d:8},
  {n:"Mexique",c:"+52",d:10},{n:"Moldavie",c:"+373",d:8},{n:"Monaco",c:"+377",d:8},
  {n:"Mongolie",c:"+976",d:8},{n:"Monténégro",c:"+382",d:8},{n:"Mozambique",c:"+258",d:9},
  {n:"Namibie",c:"+264",d:9},{n:"Népal",c:"+977",d:10},{n:"Nicaragua",c:"+505",d:8},
  {n:"Niger",c:"+227",d:8},{n:"Nigéria",c:"+234",d:10},{n:"Norvège",c:"+47",d:8},
  {n:"Nouvelle-Zélande",c:"+64",d:9},{n:"Oman",c:"+968",d:8},{n:"Ouganda",c:"+256",d:9},
  {n:"Ouzbékistan",c:"+998",d:9},{n:"Pakistan",c:"+92",d:10},{n:"Panama",c:"+507",d:8},
  {n:"Papouasie-Nouvelle-Guinée",c:"+675",d:8},{n:"Paraguay",c:"+595",d:9},{n:"Pays-Bas",c:"+31",d:9},
  {n:"Pérou",c:"+51",d:9},{n:"Philippines",c:"+63",d:10},{n:"Pologne",c:"+48",d:9},
  {n:"Portugal",c:"+351",d:9},{n:"Qatar",c:"+974",d:8},{n:"République Centrafricaine",c:"+236",d:8},
  {n:"République Dominicaine",c:"+1809",d:7},{n:"République Tchèque",c:"+420",d:9},{n:"Roumanie",c:"+40",d:9},
  {n:"Royaume-Uni",c:"+44",d:10},{n:"Russie",c:"+7",d:10},{n:"Rwanda",c:"+250",d:9},
  {n:"Salvador",c:"+503",d:8},{n:"Samoa",c:"+685",d:5},{n:"Sénégal",c:"+221",d:9},
  {n:"Serbie",c:"+381",d:9},{n:"Seychelles",c:"+248",d:7},{n:"Sierra Leone",c:"+232",d:8},
  {n:"Singapour",c:"+65",d:8},{n:"Slovaquie",c:"+421",d:9},{n:"Slovénie",c:"+386",d:8},
  {n:"Somalie",c:"+252",d:8},{n:"Soudan",c:"+249",d:9},{n:"Soudan du Sud",c:"+211",d:9},
  {n:"Sri Lanka",c:"+94",d:9},{n:"Suède",c:"+46",d:9},{n:"Suisse",c:"+41",d:9},
  {n:"Suriname",c:"+597",d:7},{n:"Syrie",c:"+963",d:9},{n:"Tadjikistan",c:"+992",d:9},
  {n:"Tanzanie",c:"+255",d:9},{n:"Tchad",c:"+235",d:8},{n:"Thaïlande",c:"+66",d:9},
  {n:"Timor Oriental",c:"+670",d:8},{n:"Togo",c:"+228",d:8},{n:"Tonga",c:"+676",d:5},
  {n:"Trinité-et-Tobago",c:"+1868",d:7},{n:"Tunisie",c:"+216",d:8},{n:"Turkménistan",c:"+993",d:8},
  {n:"Turquie",c:"+90",d:10},{n:"Ukraine",c:"+380",d:9},{n:"Uruguay",c:"+598",d:8},
  {n:"Vanuatu",c:"+678",d:5},{n:"Vatican",c:"+379",d:6},{n:"Venezuela",c:"+58",d:10},
  {n:"Vietnam",c:"+84",d:9},{n:"Yémen",c:"+967",d:9},{n:"Zambie",c:"+260",d:9},{n:"Zimbabwe",c:"+263",d:9}
];

const phoneSelect = document.getElementById('f-phone-code');
const phoneInput = document.getElementById('f-phone');
const phoneHint = document.getElementById('phone-hint');

if(phoneSelect){
  countries.forEach(country=>{
    const opt = document.createElement('option');
    opt.value = country.c;
    opt.dataset.digits = country.d;
    opt.textContent = `${country.n} (${country.c})`;
    if(country.n === 'Tunisie') opt.defaultSelected = true; // defaultSelected so form.reset() returns to Tunisie
    phoneSelect.appendChild(opt);
  });

  function updatePhoneConstraint(){
    const opt = phoneSelect.selectedOptions[0];
    const digits = parseInt(opt.dataset.digits, 10);
    phoneInput.setAttribute('maxlength', digits);
    phoneInput.setAttribute('pattern', `[0-9]{${digits}}`);
    phoneHint.textContent = `${digits} chiffres pour ${opt.textContent.split(' (')[0]}, sans le 0 initial ni l'indicatif`;
    phoneInput.value = '';
  }
  phoneSelect.addEventListener('change', updatePhoneConstraint);
  updatePhoneConstraint();

  // digits only — strips spaces, dashes, letters as the user types or pastes
  phoneInput.addEventListener('input', ()=>{ phoneInput.value = phoneInput.value.replace(/\D/g, ''); });
}

// ---------- form submission — Formspree (free, no backend), mailto fallback ----------
const form = document.getElementById('contact-form');
const successBox = document.getElementById('success-box');

function showSuccess(){
  form.classList.add('hidden');
  successBox.classList.add('show');
  const path = successBox.querySelector('.check');
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  requestAnimationFrame(()=>{
    path.style.transition = 'stroke-dashoffset .6s ease .2s';
    path.style.strokeDashoffset = 0;
  });
}

if(form){
  const submitBtn = form.querySelector('.submit-btn');
  const submitLabel = submitBtn.querySelector('span');
  const formError = document.getElementById('form-error');
  const FAIL_MSG = "L'envoi a échoué — merci de réessayer ou de nous écrire directement à contact@horama.tn";

  function showError(msg){ formError.textContent = msg; formError.hidden = false; }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(submitBtn.disabled) return; // ignore double-clicks while a request is in flight
    formError.hidden = true;

    const data = new FormData(form);
    // merge the indicatif + number into one readable field; drop it entirely when left empty
    const number = (data.get('phone_number') || '').trim();
    data.delete('phone_code');
    data.delete('phone_number');
    if(number) data.set('phone', `${phoneSelect.value} ${number}`);

    const notConfigured = form.action.includes('VOTRE_ID_FORMSPREE');
    if(notConfigured){
      const body = `Nom: ${data.get('name')}\nSociété: ${data.get('company') || '—'}\nEmail: ${data.get('email')}\nTéléphone: ${data.get('phone') || '—'}\n\n${data.get('message')}`;
      window.location.href = `mailto:contact@horama.tn?subject=${encodeURIComponent('Nouveau contact — site HORAMA')}&body=${encodeURIComponent(body)}`;
      showSuccess();
      return;
    }

    submitBtn.disabled = true;
    const label = submitLabel.textContent;
    submitLabel.textContent = 'Envoi en cours…';

    try{
      const res = await fetch(form.action, { method:'POST', body:data, headers:{'Accept':'application/json'} });
      if(res.ok){
        form.reset();
        showSuccess();
      } else {
        // Formspree returns {errors:[{message}]} on validation failures
        const json = await res.json().catch(()=> ({}));
        const details = (json.errors || []).map(er => er.message).join(' · ');
        showError(details ? `${FAIL_MSG} (${details})` : FAIL_MSG);
      }
    }catch(err){
      showError(FAIL_MSG);
    }finally{
      submitBtn.disabled = false;
      submitLabel.textContent = label;
    }
  });
}