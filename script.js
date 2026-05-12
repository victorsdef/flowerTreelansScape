/* ════════════════════════════════════════
   script.js
════════════════════════════════════════ */

/* ── Admin config override ── */
function getConfig() {
  try { return JSON.parse(localStorage.getItem('ftl_config') || '{}'); } catch { return {}; }
}

function getPhone() {
  return getConfig().phone || '16312047046';
}

function applyConfig() {
  const cfg = getConfig();
  if (!Object.keys(cfg).length) return;

  if (cfg.phone) {
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(a => {
      a.href = a.href.replace(/wa\.me\/\d+/, `wa.me/${cfg.phone}`);
    });
    const waLink = document.getElementById('contactWALink');
    if (waLink) waLink.href = `https://wa.me/${cfg.phone}`;
  }
  if (cfg.phoneDisplay) {
    const waText = document.getElementById('contactWAText');
    if (waText) waText.textContent = cfg.phoneDisplay;
    const zelleContact = document.getElementById('zelleContactText');
    if (zelleContact) zelleContact.textContent = cfg.phoneDisplay;
    const zelleChip = document.getElementById('zelleChipText');
    if (zelleChip) zelleChip.textContent = cfg.phoneDisplay;
  }
  if (cfg.email) {
    const link = document.getElementById('contactEmailLink');
    if (link) link.href = `mailto:${cfg.email}`;
    const text = document.getElementById('contactEmailText');
    if (text) text.textContent = cfg.email;
  }
  if (cfg.facebook) {
    document.querySelectorAll('a[href*="facebook.com"]').forEach(a => { a.href = cfg.facebook; });
  }
  if (cfg.heroHighlight) {
    const hl = document.querySelector('.hero-highlight');
    if (hl) hl.textContent = cfg.heroHighlight;
  }
  if (cfg.heroSub) {
    const sub = document.querySelector('.hero-sub');
    if (sub) sub.textContent = cfg.heroSub;
  }
  const statMap = { statYears: cfg.statYears, statClients: cfg.statClients, statGardens: cfg.statGardens, statSatisfaction: cfg.statSatisfaction };
  Object.entries(statMap).forEach(([id, val]) => {
    if (val === undefined) return;
    const el = document.getElementById(id);
    if (el) { el.dataset.target = val; el.textContent = '0'; }
  });
}

document.addEventListener('DOMContentLoaded', applyConfig);

/* ── Testimonials ── */
const reviews = [
  { name:"Maria G.",      stars:5, service:"Garden Design & Creation",   text:"They completely transformed our backyard. It was a mess — now it is the most beautiful yard on the block. Highly recommended!" },
  { name:"Carlos R.",     stars:5, service:"Lawn Mowing & Weed Cutting", text:"Super professional, always on time and the lawn looks incredible every week. Best investment we have made for our home." },
  { name:"Ana L.",        stars:5, service:"Yard & Property Cleanup",    text:"They did a full cleanup before winter and it looked spotless. Fair price and incredible results." },
  { name:"Jorge M.",      stars:5, service:"Plant & Bush Trimming",      text:"They trimmed all my bushes and they came out perfect. You can tell they know what they are doing. Hiring them every month." },
  { name:"Patricia S.",   stars:4, service:"Garden Maintenance",         text:"Very good service, punctual and professional. The garden looks so much better. I just wish they gave a heads-up before arriving." },
  { name:"Roberto D.",    stars:5, service:"Tree Planting",              text:"They planted three trees in my yard and placed them exactly where I wanted. Excellent service from start to finish." },
  { name:"Luisa F.",      stars:4, service:"Weed Removal",               text:"They took care of all the weeds that were invading my garden. Great work, though it took a little longer than expected." },
  { name:"David T.",      stars:5, service:"Stone Patios",               text:"They installed a beautiful stone patio in my backyard. The quality of the work is outstanding. My neighbors keep asking who did it." },
  { name:"Sandra V.",     stars:3, service:"Lawn Mowing & Weed Cutting", text:"The work was fine but they arrived late. The result was acceptable, I expected a bit more care around the edges." },
  { name:"Miguel A.",     stars:5, service:"Tree Removal",               text:"They removed a huge tree safely and quickly. They left the area completely clean. True professionals." },
  { name:"Carmen O.",     stars:5, service:"Irrigation Check & Install", text:"They installed the entire irrigation system and now my garden practically takes care of itself. Clean work, clearly explained." },
  { name:"Eduardo B.",    stars:4, service:"Yard & Property Cleanup",    text:"They cleared a large lot that was full of weeds. Good overall job though they left some debris in the back." },
  { name:"Gabriela R.",   stars:5, service:"Garden Design & Creation",   text:"They designed my garden from scratch and it came out exactly as I dreamed. True landscaping artists." },
  { name:"Fernando C.",   stars:5, service:"Garden Maintenance",         text:"They have been coming every month for 8 months and the garden always looks perfect. Reliable and serious. 100% recommended." },
  { name:"Monica P.",     stars:4, service:"Plant & Bush Trimming",      text:"They trimmed all the plants in my garden and they came out beautifully shaped. I just wish they offered more scheduling options." },
  { name:"Andres H.",     stars:5, service:"Lawn Mowing & Weed Cutting", text:"The best landscaping service I have ever hired. Fast, clean and very fair pricing. I recommend them without hesitation." },
  { name:"Isabella M.",   stars:5, service:"Stone Patios",               text:"My outdoor patio looks like it is out of a magazine. The stonework was flawless. Worth every penny." },
  { name:"Ricardo L.",    stars:3, service:"Yard & Property Cleanup",    text:"They did the cleanup but did not collect all the debris well. I had to tidy up a few things afterward. The price was fair." },
  { name:"Valeria N.",    stars:5, service:"Tree Planting",              text:"They planted a fruit tree and explained perfectly how to care for it. Very friendly and knowledgeable." },
  { name:"Oscar G.",      stars:4, service:"Weed Removal",               text:"Effective work, weeds completely eliminated. I wish they provided some preventive treatment after the job." },
  { name:"Teresa J.",     stars:5, service:"Garden Design & Creation",   text:"They turned my dead garden into a beautiful green space. Creative, responsible and very thorough in their work." },
  { name:"Pablo E.",      stars:5, service:"Garden Maintenance",         text:"Punctual, hardworking and they leave everything clean when they finish. It is a pleasure having them work at our home." },
  { name:"Natalia W.",    stars:4, service:"Irrigation Check & Install", text:"Good installation work. The system works very well. They took one extra day but the result was great." },
  { name:"Luis K.",       stars:5, service:"Lawn Mowing & Weed Cutting", text:"They have been mowing my lawn for 6 months and it is always perfect. They have never missed or been late. Excellent service." },
  { name:"Diana Q.",      stars:5, service:"Plant & Bush Trimming",      text:"My bushes came out incredibly well shaped. The yard looks like a whole new place. Very professional and friendly." },
  { name:"Hector Z.",     stars:4, service:"Tree Removal",               text:"They removed the tree without any issues. Safe and efficient work. I just wish the pricing was a little more flexible." },
  { name:"Sofia X.",      stars:5, service:"Stone Patios",               text:"The stone patio they installed is exactly what I wanted. Top-notch quality and a perfect finish." },
  { name:"Marcos Y.",     stars:3, service:"Garden Maintenance",         text:"The garden looked good but I had to call them twice to come back and finish a section they had left incomplete." },
  { name:"Elena U.",      stars:5, service:"Garden Design & Creation",   text:"They gave me ideas I never would have thought of and the result exceeded all my expectations. Total artists." },
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
  return d.toLocaleDateString('en-US', { month:'short', year:'numeric' });
}

function buildCarousel() {
  const track = document.getElementById('testiTrack');
  const dots  = document.getElementById('testiDots');
  const total = document.getElementById('testiTotal');
  const prev  = document.getElementById('testiPrev');
  const next  = document.getElementById('testiNext');
  if (!track) return;

  const shuffled = shuffle(reviews);
  total.textContent = `Based on ${shuffled.length} reviews`;

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
  drawerCount.textContent = `${n} service${n !== 1 ? 's' : ''}`;
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
          <div class="drawer-item-sub">Professional service</div>
        </div>
        <button class="drawer-item-remove" onclick="removeFromCart('${name.replace(/'/g,"\\'")}')">
          <i class="fa-solid fa-xmark"></i>
        </button>`;
      cartList.appendChild(div);
    });
    const list = [...cartItems].map(s => `  - ${s}`).join('\n');
    const msg  = `*FLOWER TREE LANDSCAPE*\n\nHello! I would like a quote for the following services:\n\n${list}\n\nThank you!`;
    cartWA.href = `https://wa.me/${getPhone()}?text=${encodeURIComponent(msg)}`;
  }
}

function addToCart(btn, e) {
  e.stopPropagation();
  const name = btn.closest('.card').dataset.service;
  if (cartItems.has(name)) return;
  cartItems.add(name);
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
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
      btn.innerHTML = '<i class="fa-solid fa-plus"></i> Add';
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
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
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
  const msgModal = `*FLOWER TREE LANDSCAPE*\n\nHello! I am interested in the *${name}* service.\n\nThank you!`;
  modalWA.href = `https://wa.me/${getPhone()}?text=${encodeURIComponent(msgModal)}`;
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
