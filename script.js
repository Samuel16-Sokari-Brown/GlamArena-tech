/* ==========================================================================
   GLAMARENA TECH — INTERACTIVE SCRIPT
   Sticky Navbar, Mobile Navigation Drawer, Metric Counters, Animations,
   Gallery Lightbox, and Mobile Testimonials Carousel.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run in case of reload page mid-scroll
  }

  // ========== MOBILE HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        document.body.style.overflow = 'hidden'; // Lock screen scroll when menu is open
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        document.body.style.overflow = '';
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
        document.body.style.overflow = '';
      });
    });
  }

  // ========== ACTIVE NAV LINK ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinkEls.length > 0) {
    const observerOptions = { rootMargin: '-30% 0px -30% 0px' };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkEls.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'index.html' && id === 'home') {
              link.classList.add('active');
            } else if (href && href.includes(id)) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(s => sectionObserver.observe(s));
  }

  // ========== ANIMATED METRIC COUNTER ==========
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

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              animateCounter(el, target);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    } else {
      // Fallback: observe individual numbers or first section
      const firstSection = document.querySelector('section');
      if (firstSection) statsObserver.observe(firstSection);
    }
  }

  // ========== SCROLL FADE-IN ANIMATIONS ==========
  const fadeEls = document.querySelectorAll(
    '.service-card, .program-card, .testimonial-card, .metric-card, .why-item, .about-feature, .contact-item, .gallery-item'
  );

  fadeEls.forEach(el => el.classList.add('fade-in-up'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay, 10));
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // Fade in section headers and key grid components
  const generalFadeEls = document.querySelectorAll('.section-header, .about-content, .about-visual, .why-us-content, .why-us-visual');
  generalFadeEls.forEach(el => {
    el.classList.add('fade-in-up');
    fadeObserver.observe(el);
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ========== CONTACT FORM SUBMISSION ==========
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="btn-loading">Sending...</span>';

      // Simulate API submit call
      setTimeout(() => {
        contactForm.reset();
        if (formSuccess) {
          formSuccess.classList.add('visible');
          setTimeout(() => {
            formSuccess.classList.remove('visible');
          }, 6000);
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }, 1200);
    });
  }

  // ========== TESTIMONIALS CAROUSEL (MOBILE) ==========
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (testimonialsGrid && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const card = testimonialsGrid.querySelector('.testimonial-card');
        if (card) {
          const cardWidth = card.offsetWidth;
          const gap = 20; // grid gap in CSS
          testimonialsGrid.scrollTo({
            left: index * (cardWidth + gap),
            behavior: 'smooth'
          });
        }
      });
    });

    // Update dots active status on scroll
    let scrollTimeout;
    testimonialsGrid.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const card = testimonialsGrid.querySelector('.testimonial-card');
        if (card) {
          const cardWidth = card.offsetWidth;
          const gap = 20;
          const activeIndex = Math.round(testimonialsGrid.scrollLeft / (cardWidth + gap));
          dots.forEach((dot, idx) => {
            if (idx === activeIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      }, 50);
    });
  }

  // ========== GALLERY LIGHTBOX ==========
  function buildLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(9, 9, 11, 0.95);
      display: none; align-items: center; justify-content: center;
      padding: 24px; backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      cursor: zoom-out;
    `;

    const img = document.createElement('img');
    img.id = 'lightboxImg';
    img.style.cssText = `
      max-width: 90vw; max-height: 85vh;
      border-radius: 8px;
      object-fit: contain;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      transition: transform 0.2s ease;
      animation: lbFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    const caption = document.createElement('div');
    caption.id = 'lightboxCaption';
    caption.style.cssText = `
      position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
      background: #18181b; border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 8px 20px; border-radius: 100px; color: #f4f4f5;
      font-size: 0.85rem; font-weight: 500; text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 24px;
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f4f4f5; font-size: 1.75rem; line-height: 1;
      width: 44px; height: 44px; border-radius: 50%;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.05)';

    const keyframeStyle = document.createElement('style');
    keyframeStyle.textContent = '@keyframes lbFadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }';
    document.head.appendChild(keyframeStyle);

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
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    // Attach listener to each gallery item
    galleryItems.forEach(item => {
      const imgEl = item.querySelector('img');
      const label = item.getAttribute('data-label') || '';
      if (imgEl) {
        item.addEventListener('click', () => openLightbox(imgEl.src, label));
      }
    });
  }

  buildLightbox();

  // ========== STAGGER GRID ANIMATION DELAYS ==========
  function staggerGridItems(gridSelector, itemSelector, baseDelay = 100) {
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

  staggerGridItems('.testimonials-grid', '.testimonial-card', 100);
  staggerGridItems('.why-us-list', '.why-item', 100);
  staggerGridItems('.services-grid', '.service-card', 80);
  staggerGridItems('.programs-grid', '.program-card', 100);

  // Print system identity log
  console.log('%cGLAMARENA TECH', 'color: #2563eb; font-size: 22px; font-weight: 900; font-family: Outfit, sans-serif; letter-spacing: -0.02em;');
  console.log('%cEquipping today\'s learners with the skills for tomorrow\'s world.', 'color: #f59e0b; font-size: 11px; font-family: Inter, sans-serif;');
});
