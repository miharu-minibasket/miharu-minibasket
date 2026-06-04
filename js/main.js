/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) header.classList.add('scrolled');
  else                     header.classList.remove('scrolled');

  // scroll-to-top button
  const btn = document.getElementById('scrollTop');
  if (window.scrollY > 400) btn.classList.add('visible');
  else                       btn.classList.remove('visible');
});

/* ===== NAV DROPDOWN ===== */
const navDropdown = document.querySelector('.nav-dropdown');
if (navDropdown) {
  const trigger = navDropdown.querySelector('.nav-dropdown-trigger');
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    navDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => {
    navDropdown.classList.remove('open');
  });
}

/* ===== HAMBURGER MENU ===== */
const hamburger   = document.querySelector('.hamburger');
const mobileMenu  = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== HERO SLIDESHOW ===== */
const slides = document.querySelectorAll('.hero-slide');
let current = 0;
function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}
setInterval(nextSlide, 5000);

/* ===== AUTO NEW BADGE (7日以内) ===== */
document.querySelectorAll('.news-item').forEach(item => {
  const dateEl = item.querySelector('.news-date');
  if (!dateEl) return;
  const parts = dateEl.textContent.split('.');
  if (parts.length < 3) return;
  const postDate = new Date(parts[0], parts[1] - 1, parts[2]);
  const diffDays = (Date.now() - postDate.getTime()) / 86400000;
  if (diffDays <= 7) {
    const badge = document.createElement('span');
    badge.className = 'news-badge badge-new';
    badge.textContent = 'NEW';
    dateEl.insertAdjacentElement('afterend', badge);
  }
});

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(r => observer.observe(r));

/* ===== SCROLL TO TOP ===== */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = '送信中...';
    btn.disabled = true;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(() => {
      btn.textContent = '送信完了！ありがとうございます';
      btn.style.background = '#22c55e';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'お問い合わせを送信する';
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    })
    .catch(() => {
      btn.textContent = '送信に失敗しました。お電話でご連絡ください。';
      btn.style.background = '#ef4444';
      btn.disabled = false;
    });
  });
}
