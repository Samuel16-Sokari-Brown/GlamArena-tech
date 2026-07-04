/* ============================================
   NEXGEN TECHNOLOGIES — PREMIUM JAVASCRIPT
   ============================================ */

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const observerOptions = { rootMargin: '-40% 0px -40% 0px' };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ========== ANIMATED COUNTER ==========
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
      });
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ========== SCROLL FADE-IN ANIMATIONS ==========
const fadeEls = document.querySelectorAll(
  '.service-card, .program-card, .testimonial-card, .metric-card, .why-item, .about-feature, .contact-item'
);

fadeEls.forEach(el => el.classList.add('fade-in-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// Also fade in section headers
const sectionHeaders = document.querySelectorAll('.section-header, .about-content, .about-visual, .why-us-content, .why-us-metrics');
sectionHeaders.forEach(el => {
  el.classList.add('fade-in-up');
  fadeObserver.observe(el);
});

// ========== SERVICE CARD TILT EFFECT ==========
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ========== CONTACT FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-loading">Sending...</span>';

    // Simulate API call
    setTimeout(() => {
      contactForm.reset();
      formSuccess.classList.add('visible');
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';

      setTimeout(() => {
        formSuccess.classList.remove('visible');
      }, 5000);
    }, 1500);
  });
}

// ========== PARALLAX HERO ORBS ON MOUSE MOVE ==========
const heroSection = document.querySelector('.hero');
const orbs = document.querySelectorAll('.hero-orb');

if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    orbs.forEach(orb => { orb.style.transform = ''; });
  });
}

// ========== CURSOR GLOW EFFECT ==========
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(26, 86, 219, 0.06), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ========== NAV ACTIVE LINK STYLE ==========
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--text-primary) !important;
    background: rgba(124, 58, 237, 0.15) !important;
  }
  .btn-loading {
    opacity: 0.7;
  }
`;
document.head.appendChild(style);

// ========== STAGGERED GRID ANIMATION ==========
function staggerGridItems(gridSelector, itemSelector, baseDelay = 80) {
  const grids = document.querySelectorAll(gridSelector);
  grids.forEach(grid => {
    const items = grid.querySelectorAll(itemSelector);
    items.forEach((item, idx) => {
      if (!item.hasAttribute('data-delay')) {
        item.setAttribute('data-delay', idx * baseDelay);
      }
    });
  });
}

staggerGridItems('.testimonials-grid', '.testimonial-card', 120);
staggerGridItems('.why-us-list', '.why-item', 150);

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%cNEXGEN Technologies', 'color: #3b82f6; font-size: 20px; font-weight: bold; font-family: Outfit, sans-serif;');
console.log('%cAfrica\'s Premier AI Innovation Hub', 'color: #f59e0b; font-size: 12px;');
// ========== GALLERY LIGHTBOX ==========
function buildLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.92);
    display: none; align-items: center; justify-content: center;
    padding: 24px; backdrop-filter: blur(12px);
    cursor: zoom-out;
  `;

  const img = document.createElement('img');
  img.id = 'lightboxImg';
  img.style.cssText = `
    max-width: 90vw; max-height: 90vh;
    border-radius: 16px;
    object-fit: contain;
    box-shadow: 0 0 80px rgba(26, 86, 219, 0.4);
    animation: lbFadeIn 0.3s ease;
  `;

  const caption = document.createElement('div');
  caption.id = 'lightboxCaption';
  caption.style.cssText = `
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: rgba(13,13,34,0.95); border: 1px solid rgba(26, 86, 219, 0.4);
    padding: 10px 24px; border-radius: 100px; color: #f0f0ff;
    font-size: 0.9rem; font-weight: 600; white-space: nowrap;
    backdrop-filter: blur(16px);
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute; top: 20px; right: 28px;
    background: rgba(26, 86, 219, 0.3); border: 1px solid rgba(26, 86, 219, 0.5);
    color: white; font-size: 2rem; line-height: 1;
    width: 48px; height: 48px; border-radius: 50%;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  `;
  closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(26, 86, 219, 0.6)';
  closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(26, 86, 219, 0.3)';

  const styleEl = document.createElement('style');
  styleEl.textContent = '@keyframes lbFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }';
  document.head.appendChild(styleEl);

  lightbox.appendChild(img);
  lightbox.appendChild(caption);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  function openLightbox(src, label) {
    img.src = src;
    caption.textContent = label;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  lightbox.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // Attach click to all gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    const imgEl = item.querySelector('img');
    const label = item.getAttribute('data-label') || '';
    if (imgEl) {
      item.style.cursor = 'zoom-in';
      item.addEventListener('click', () => openLightbox(imgEl.src, label));
    }
  });
}

buildLightbox();

// ========== GALLERY ITEM FADE-IN ==========
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.classList.add('fade-in-up');
  el.setAttribute('data-delay', i * 100);
  fadeObserver.observe(el);
});
