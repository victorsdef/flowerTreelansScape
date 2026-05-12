/* ════════════════════════════════════════
   script.js — No necesitas tocar este archivo
════════════════════════════════════════ */

/* ── Testimonios ── */
const reviews = [
  { name:"Maria G.",      stars:5, service:"Creacion de Jardin",         text:"Completaron la transformacion de nuestro patio. Era un desastre — ahora es el jardin mas bonito de la cuadra. Muy recomendado!" },
  { name:"Carlos R.",     stars:5, service:"Corte de Cesped",            text:"Super profesionales, siempre a tiempo y el cesped se ve increible cada semana. La mejor inversion para nuestra casa." },
  { name:"Ana L.",        stars:5, service:"Limpieza de Patio",          text:"Hicieron una limpieza completa antes del invierno y quedo impecable. Precio justo y resultados increibles." },
  { name:"Jorge M.",      stars:5, service:"Poda de Arbustos",           text:"Podaron todos mis arbustos y quedaron perfectos. Se nota que saben lo que hacen. Los voy a contratar cada mes." },
  { name:"Patricia S.",   stars:4, service:"Mantenimiento de Jardin",    text:"Muy buen servicio, puntuales y profesionales. El jardin luce mucho mejor. Solo quisiera que avisaran antes de llegar." },
  { name:"Roberto D.",    stars:5, service:"Plantacion de Arboles",      text:"Plantaron tres arboles en mi patio y los colocaron exactamente donde los queria. Servicio excelente de principio a fin." },
  { name:"Luisa F.",      stars:4, service:"Eliminacion de Maleza",      text:"Se encargaron de toda la maleza que tenia invadiendo mi jardin. Muy buen trabajo, aunque tardaron un poco mas de lo esperado." },
  { name:"David T.",      stars:5, service:"Patios de Piedra",           text:"Instalaron un patio de piedra hermoso en mi jardin. La calidad del trabajo es excelente. Mis vecinos me preguntan quien lo hizo." },
  { name:"Sandra V.",     stars:3, service:"Corte de Cesped",            text:"El trabajo estuvo bien pero llegaron tarde. El resultado fue aceptable, esperaba un poco mas de cuidado en los bordes." },
  { name:"Miguel A.",     stars:5, service:"Eliminacion de Arboles",     text:"Removieron un arbol enorme de forma segura y rapida. Dejaron el area completamente limpia. Profesionales de verdad." },
  { name:"Carmen O.",     stars:5, service:"Riego e Instalacion",        text:"Instalaron todo el sistema de riego y ahora mi jardin se mantiene solo. Trabajo limpio y muy bien explicado." },
  { name:"Eduardo B.",    stars:4, service:"Limpieza de Terreno",        text:"Limpiaron un terreno grande que tenia lleno de maleza. Buen trabajo general aunque dejaron algunos restos al fondo." },
  { name:"Gabriela R.",   stars:5, service:"Creacion de Jardin",         text:"Disenaron mi jardin desde cero y quedo exactamente como lo soné. Son verdaderos artistas del paisajismo." },
  { name:"Fernando C.",   stars:5, service:"Mantenimiento Mensual",      text:"Llevan 8 meses viniendo cada mes y el jardin siempre luce perfecto. Son confiables y serios. 100% recomendados." },
  { name:"Monica P.",     stars:4, service:"Poda de Plantas",            text:"Podaron todas las plantas de mi jardin y quedaron muy bien formadas. Me gustaria que ofrecieran mas opciones de horario." },
  { name:"Andres H.",     stars:5, service:"Corte de Cesped",            text:"El mejor servicio de jardineria que he contratado. Rapidos, limpios y el precio es muy justo. Los recomiendo sin dudarlo." },
  { name:"Isabella M.",   stars:5, service:"Patios de Piedra",           text:"Mi patio exterior luce como de revista. El trabajo con las piedras fue impecable. Vale cada centavo invertido." },
  { name:"Ricardo L.",    stars:3, service:"Limpieza de Patio",          text:"Hicieron la limpieza pero no recogieron bien los desechos. Tuve que limpiar algunas cosas despues. El precio estuvo bien." },
  { name:"Valeria N.",    stars:5, service:"Plantacion de Arboles",      text:"Plantaron un arbol frutal y me explicaron perfectamente como cuidarlo. Muy amables y conocedores." },
  { name:"Oscar G.",      stars:4, service:"Eliminacion de Maleza",      text:"Trabajo efectivo, maleza eliminada completamente. Quisiera que dieran algun producto preventivo despues del trabajo." },
  { name:"Teresa J.",     stars:5, service:"Creacion de Jardin",         text:"Transformaron mi jardin muerto en un espacio verde hermoso. Son creativos, responsables y muy prolijos en su trabajo." },
  { name:"Pablo E.",      stars:5, service:"Mantenimiento de Jardin",    text:"Puntuales, trabajadores y dejan todo limpio al terminar. Es un placer tenerlos trabajando en casa." },
  { name:"Natalia W.",    stars:4, service:"Riego e Instalacion",        text:"Buen trabajo de instalacion. El sistema funciona muy bien. Tomaron un dia mas de lo prometido pero el resultado fue bueno." },
  { name:"Luis K.",       stars:5, service:"Corte de Cesped",            text:"Llevan cortando mi cesped 6 meses y siempre esta perfecto. Nunca han fallado ni llegado tarde. Excelente servicio." },
  { name:"Diana Q.",      stars:5, service:"Poda de Arbustos",           text:"Mis arbustos quedaron increiblemente bien formados. El jardin parece otro. Muy profesionales y amables." },
  { name:"Hector Z.",     stars:4, service:"Eliminacion de Arboles",     text:"Removieron el arbol sin problemas. Trabajo seguro y eficiente. Me gustaria que el precio fuera un poco mas flexible." },
  { name:"Sofia X.",      stars:5, service:"Patios de Piedra",           text:"El patio de piedra que instalaron es exactamente lo que queria. Calidad de primer nivel y terminacion perfecta." },
  { name:"Marcos Y.",     stars:3, service:"Mantenimiento de Jardin",    text:"El jardin quedo bien pero tuve que llamarlos dos veces para que regresaran a terminar una parte que habian dejado incompleta." },
  { name:"Elena U.",      stars:5, service:"Creacion de Jardin",         text:"Me dieron ideas que nunca se me hubieran ocurrido y el resultado supero todas mis expectativas. Artistas totales." },
  { name:"Steven R.",     stars:5, service:"Corte de Cesped",            text:"Fast, professional and the lawn looks amazing every time. Highly recommended for anyone in the area!" },
  { name:"Jennifer T.",   stars:4, service:"Yard Cleanup",               text:"They did a great job cleaning up the yard. Took a bit longer than expected but the result was worth it." },
  { name:"Michael B.",    stars:5, service:"Tree Removal",               text:"Removed two large trees safely and cleaned everything up. Outstanding work and very fair pricing." },
  { name:"Ashley C.",     stars:5, service:"Garden Design",              text:"Designed my entire backyard and it looks absolutely stunning. Best investment I have made for my home." },
  { name:"Kevin D.",      stars:4, service:"Irrigation Install",         text:"Good installation work. The system works perfectly. They took an extra day but communicated well throughout." },
  { name:"Stephanie F.",  stars:5, service:"Lawn Mowing",                text:"These guys are amazing. My lawn has never looked better. They show up on time every single week." },
  { name:"Brian H.",      stars:3, service:"Yard Cleanup",               text:"Work was okay but they missed a section in the back corner. Had to point it out for them to come back and fix it." },
  { name:"Amanda I.",     stars:5, service:"Stone Patio",                text:"The stone patio they built is absolutely gorgeous. Everyone who visits comments on how beautiful it looks." },
  { name:"Chris J.",      stars:5, service:"Bush Trimming",              text:"Trimmed all my bushes perfectly. The yard looks so clean and well-maintained now. Will definitely use again." },
  { name:"Rachel K.",     stars:4, service:"Weed Removal",               text:"They got rid of all the weeds that were taking over my garden. Good job overall, just wish they had come earlier." },
  { name:"Daniel M.",     stars:5, service:"Tree Planting",              text:"Planted three trees exactly where I wanted them and explained how to care for each one. Fantastic service!" }
];

const avatarColors = [
  '#2d7a4f','#3a9463','#1a5c38','#4aaa6e','#256b44',
  '#1e7a5c','#2e6b8a','#7a4f2d','#6b2d7a','#7a2d4f'
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function starsHTML(n) {
  return Array.from({length:5}, (_,i) =>
    `<span style="color:${i < n ? '#fbbf24' : 'rgba(255,255,255,0.18)'}">★</span>`
  ).join('');
}

function randomDate() {
  const now  = new Date();
  const days = Math.floor(Math.random() * 365);
  const d    = new Date(now - days * 86400000);
  return d.toLocaleDateString('es-US', { month:'short', year:'numeric' });
}

function buildCarousel() {
  const track = document.getElementById('testiTrack');
  const dots  = document.getElementById('testiDots');
  const total = document.getElementById('testiTotal');
  const prev  = document.getElementById('testiPrev');
  const next  = document.getElementById('testiNext');
  if (!track) return;

  const shuffled = shuffle(reviews);
  total.textContent = `Basado en ${shuffled.length} resenas`;

  shuffled.forEach((r, idx) => {
    const color = avatarColors[idx % avatarColors.length];
    const card  = document.createElement('div');
    card.className = 'testi-card';
    card.innerHTML = `
      <div class="testi-top">
        <div class="testi-stars">${starsHTML(r.stars)}</div>
        <span class="testi-date">${randomDate()}</span>
      </div>
      <p>"${r.text}"</p>
      <div class="testi-author">
        <div class="testi-avatar" style="background:${color}">${r.name[0]}</div>
        <div><strong>${r.name}</strong><span>${r.service}</span></div>
      </div>`;
    track.appendChild(card);
  });

  let current = 0;

  function perPage() {
    return window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
  }

  function pages() { return Math.ceil(shuffled.length / perPage()); }

  function buildDots() {
    dots.innerHTML = '';
    for (let i = 0; i < pages(); i++) {
      const b = document.createElement('button');
      b.className = 'testi-dot' + (i === current ? ' active' : '');
      b.addEventListener('click', () => goTo(i));
      dots.appendChild(b);
    }
  }

  function goTo(page) {
    current = Math.max(0, Math.min(page, pages() - 1));
    const card   = track.querySelector('.testi-card');
    const gap    = 20;
    const cw     = card ? card.offsetWidth + gap : 0;
    track.style.transform = `translateX(-${current * perPage() * cw}px)`;
    dots.querySelectorAll('.testi-dot').forEach((d,i) => d.classList.toggle('active', i === current));
    prev.disabled = current === 0;
    next.disabled = current >= pages() - 1;
  }

  buildDots();
  goTo(0);

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => { buildDots(); goTo(Math.min(current, pages()-1)); });

  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend',   e => {
    const dx = sx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) goTo(current + (dx > 0 ? 1 : -1));
  });

  setInterval(() => goTo(current >= pages()-1 ? 0 : current+1), 6000);
}

window.addEventListener('load', buildCarousel);

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Menu hamburguesa ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Reveal on scroll (Intersection Observer) ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Contador animado de estadisticas ── */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Easing out expo
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target, 10);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

/* ── Hero parallax suave ── */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
}, { passive: true });

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Activa el hero reveal al cargar ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
});

/* ── Carrito Drawer ── */
const CART_KEY    = 'ftl_cart';
const cartItems   = new Set(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
const cartBadge   = document.getElementById('cartBadge');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer  = document.getElementById('cartDrawer');
const cartList    = document.getElementById('cartList');
const cartEmpty   = document.getElementById('cartEmpty');
const cartFooter  = document.getElementById('cartFooter');
const cartWA      = document.getElementById('cartWA');
const drawerCount = document.getElementById('drawerCount');
const cartCount   = document.getElementById('cartCount');

const iconMap = {
  'fa-leaf':'fa-leaf','fa-broom':'fa-broom','fa-scissors':'fa-scissors',
  'fa-seedling':'fa-seedling','fa-fan':'fa-fan','fa-tree':'fa-tree',
  'fa-circle-minus':'fa-circle-minus','fa-droplet':'fa-droplet','fa-square':'fa-square'
};

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify([...cartItems]));
}

function updateCart() {
  const n = cartItems.size;
  cartBadge.textContent = n;
  cartBadge.classList.toggle('show', n > 0);
  drawerCount.textContent = `${n} servicio${n !== 1 ? 's' : ''}`;
  cartCount.textContent   = n;
  cartList.innerHTML = '';

  if (n === 0) {
    cartEmpty.style.display  = '';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display  = 'none';
    cartFooter.style.display = '';
    cartItems.forEach((name) => {
      const card    = document.querySelector(`.card[data-service="${name}"]`);
      const icon    = card ? card.dataset.icon : 'fa-leaf';
      const safeName = name.replace(/"/g, '&quot;');
      const div = document.createElement('div');
      div.className = 'drawer-item';
      div.innerHTML = `
        <div class="drawer-item-icon"><i class="fa-solid ${icon}"></i></div>
        <div class="drawer-item-info">
          <div class="drawer-item-name">${name}</div>
          <div class="drawer-item-sub">Servicio profesional</div>
        </div>
        <button class="drawer-item-remove" onclick="removeFromCart('${name.replace(/'/g,"\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </button>`;
      cartList.appendChild(div);
    });
    const list = [...cartItems].map(s => `  - ${s}`).join('\n');
    const msg  = `*FLOWER TREE LANDSCAPE*\n\nHola! Quisiera una cotizacion para los siguientes servicios:\n\n${list}\n\nGracias!`;
    cartWA.href = `https://wa.me/16312047046?text=${encodeURIComponent(msg)}`;
  }
}

function addToCart(btn, e) {
  e.stopPropagation();
  const name = btn.closest('.card').dataset.service;
  if (cartItems.has(name)) return;
  cartItems.add(name);
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Agregado';
  btn.classList.add('added');
  btn.disabled = true;
  saveCart();
  updateCart();
}

function removeFromCart(name) {
  cartItems.delete(name);
  document.querySelectorAll('.card[data-service]').forEach(card => {
    if (card.dataset.service === name) {
      const btn = card.querySelector('.btn-add-cart');
      btn.innerHTML = '<i class="fa-solid fa-plus"></i> Agregar';
      btn.classList.remove('added');
      btn.disabled = false;
    }
  });
  saveCart();
  updateCart();
}

function clearCart() {
  cartItems.clear();
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.innerHTML = '<i class="fa-solid fa-plus"></i> Agregar';
    btn.classList.remove('added');
    btn.disabled = false;
  });
  saveCart();
  updateCart();
}

/* Restaura estado visual de botones al cargar la página */
window.addEventListener('DOMContentLoaded', () => {
  cartItems.forEach(name => {
    const card = document.querySelector(`.card[data-service="${name}"]`);
    if (card) {
      const btn = card.querySelector('.btn-add-cart');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Agregado';
      btn.classList.add('added');
      btn.disabled = true;
    }
  });
  updateCart();
});

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

/* ── Modal de servicio ── */
const modal       = document.getElementById('serviceModal');
const modalTitle  = document.getElementById('modalTitle');
const modalIcon   = document.getElementById('modalIcon');
const modalWA     = document.getElementById('modalWhatsapp');
const modalClose  = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal(name, icon) {
  modalTitle.textContent = name;
  modalIcon.className = `fa-solid ${icon}`;
  const msgModal = `*FLOWER TREE LANDSCAPE*\n\nHola! Me interesa el servicio de *${name}*.\n\nGracias!`;
  modalWA.href = `https://wa.me/16312047046?text=${encodeURIComponent(msgModal)}`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.card[data-service]').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.service, card.dataset.icon);
  });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
