/* ============================================
   Session 2 - The Art of Planning
   Interactive Whiteboard JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollReveal();
  initKeyboardNav();
  initMobileMenu();
  initPageDots();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */
function initKeyboardNav() {
  const pages = [
    'index.html',
    'pages/journey.html',
    'pages/framework.html',
    'pages/bmad.html',
    'pages/exercise.html',
    'pages/resources.html'
  ];

  // Determine current page index
  const currentPath = window.location.pathname;
  let currentIndex = 0;

  pages.forEach((page, index) => {
    if (currentPath.includes(page.replace('pages/', '')) ||
        (currentPath.endsWith('/') && page === 'index.html')) {
      currentIndex = index;
    }
  });

  // Handle from pages subdirectory
  const isInPages = currentPath.includes('/pages/');
  const prefix = isInPages ? '../' : '';
  const pagesPrefix = isInPages ? '' : 'pages/';

  document.addEventListener('keydown', function(e) {
    // Arrow right or spacebar - next page
    if (e.key === 'ArrowRight' || (e.key === ' ' && !e.target.matches('input, textarea'))) {
      e.preventDefault();
      if (currentIndex < pages.length - 1) {
        const nextPage = pages[currentIndex + 1];
        if (nextPage.startsWith('pages/')) {
          window.location.href = prefix + pagesPrefix + nextPage.replace('pages/', '');
        } else {
          window.location.href = prefix + nextPage;
        }
      }
    }

    // Arrow left - previous page
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIndex > 0) {
        const prevPage = pages[currentIndex - 1];
        if (prevPage.startsWith('pages/')) {
          window.location.href = prefix + pagesPrefix + prevPage.replace('pages/', '');
        } else {
          window.location.href = prefix + prevPage;
        }
      }
    }

    // Number keys 1-6 for direct navigation
    const num = parseInt(e.key);
    if (num >= 1 && num <= 6) {
      const targetPage = pages[num - 1];
      if (targetPage) {
        if (targetPage.startsWith('pages/')) {
          window.location.href = prefix + pagesPrefix + targetPage.replace('pages/', '');
        } else {
          window.location.href = prefix + targetPage;
        }
      }
    }
  });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ============================================
   PAGE DOTS (for sections within a page)
   ============================================ */
function initPageDots() {
  const sections = document.querySelectorAll('section[id]');
  const pageNav = document.querySelector('.page-nav');

  if (!pageNav || sections.length === 0) return;

  // Create dots for each section
  sections.forEach((section, index) => {
    const dot = document.createElement('button');
    dot.className = 'page-dot';
    dot.setAttribute('aria-label', `Go to section ${index + 1}`);
    dot.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth' });
    });
    pageNav.appendChild(dot);
  });

  // Update active dot on scroll
  const dots = pageNav.querySelectorAll('.page-dot');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(sections).indexOf(entry.target);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
}

/* ============================================
   DRAW-IN ANIMATION HELPER
   ============================================ */
function animateElement(element, delay = 0) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';

  setTimeout(() => {
    element.style.transition = 'all 0.5s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, delay);
}

/* ============================================
   VIDEO CONTROLS HELPER
   ============================================ */
function initVideoPlayer() {
  const video = document.querySelector('.video-container video');
  if (!video) return;

  // Keyboard controls for video
  document.addEventListener('keydown', (e) => {
    if (e.key === 'k' || e.key === 'K') {
      e.preventDefault();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      video.muted = !video.muted;
    }
  });
}

// Initialize video if on BMAD page
if (window.location.pathname.includes('bmad')) {
  document.addEventListener('DOMContentLoaded', initVideoPlayer);
}

/* ============================================
   STAGGERED REVEAL FOR LISTS
   ============================================ */
function staggerReveal(selector, baseDelay = 100) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      el.style.transition = 'all 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, baseDelay * index);
  });
}

/* ============================================
   TYPEWRITER EFFECT (optional)
   ============================================ */
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

/* ============================================
   EXPORT FOR GLOBAL ACCESS
   ============================================ */
window.WhiteboardUtils = {
  animateElement,
  staggerReveal,
  typeWriter
};
