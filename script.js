/* ════════════════════════════════════════
   script.js — No necesitas tocar este archivo
════════════════════════════════════════ */

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

/* ── Carrito ── */
const cartItems = new Set();
const cartFloat  = document.getElementById('cartFloat');
const cartModal  = document.getElementById('cartModal');
const cartBadge  = document.getElementById('cartBadge');
const cartList   = document.getElementById('cartList');
const cartEmpty  = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartWA     = document.getElementById('cartWA');

function updateCart() {
  cartBadge.textContent = cartItems.size;
  cartBadge.classList.toggle('show', cartItems.size > 0);
  cartList.innerHTML = '';
  if (cartItems.size === 0) {
    cartEmpty.style.display = '';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = '';
    cartItems.forEach(name => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-leaf"></i><span style="flex:1">${name}</span><button class="cart-remove" onclick="removeFromCart('${name.replace(/'/g,"\\'")}')"><i class="fa-solid fa-xmark"></i></button>`;
      cartList.appendChild(li);
    });
    const serviceList = [...cartItems].map(s => `  - ${s}`).join('\n');
    const msg = `*FLOWER TREE LANDSCAPE*\n\nHola! Quisiera una cotizacion para los siguientes servicios:\n\n${serviceList}\n\n*Direccion:* \n*Tamano del area:* \n*Fecha preferida:* \n*Detalles:* \n\nGracias!`;
    cartWA.href = `https://wa.me/16312047046?text=${encodeURIComponent(msg)}`;
  }
}

function addToCart(btn, e) {
  e.stopPropagation();
  const name = btn.closest('.card').dataset.service;
  cartItems.add(name);
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Agregado';
  btn.classList.add('added');
  btn.disabled = true;
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
  updateCart();
}

function clearCart() {
  cartItems.clear();
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.innerHTML = '<i class="fa-solid fa-plus"></i> Agregar';
    btn.classList.remove('added');
    btn.disabled = false;
  });
  updateCart();
}

function openCart()  { cartModal.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeCart() { cartModal.classList.remove('open'); document.body.style.overflow = ''; }
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
  const msgModal = `*FLOWER TREE LANDSCAPE*\n\nHola! Me interesa el servicio de *${name}*.\n\n*Direccion:* \n*Tamano del area:* \n*Fecha preferida:* \n*Detalles:* \n\nGracias!`;
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
