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
