/**
 * BlackPrint — Main JavaScript
 * Navigation, scroll reveals, and interactivity
 */

// ---- NAV: scroll behavior & mobile toggle ----
(function() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');

  if (!nav) return;

  // Scroll state
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, { passive: true });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('nav--open');
      const expanded = nav.classList.contains('nav--open');
      navToggle.setAttribute('aria-expanded', expanded);
      document.body.style.overflow = expanded ? 'hidden' : '';
    });
  }

  // Close menu on nav link click
  nav.querySelectorAll('.nav__link').forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('nav--open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function(e) {
    if (nav.classList.contains('nav--open') && !nav.contains(e.target)) {
      nav.classList.remove('nav--open');
      document.body.style.overflow = '';
    }
  });
})();

// ---- SCROLL REVEAL ----
(function() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(function(el) {
    observer.observe(el);
  });
})();

// ---- ICP TABS (homepage use case section) ----
(function() {
  const tabs = document.querySelectorAll('.icp-tab');
  if (!tabs.length) return;

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });
})();

// ---- DEMO FORM: simple validation & redirect ----
(function() {
  const form = document.getElementById('demoForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    // If action is set on the form element, let it navigate
    // The form uses GET so params are visible in URL, matching the thank-you page
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Booking your session…';
      btn.disabled = true;
    }
  });
})();

// ---- SMOOTH ANCHOR SCROLL with nav offset ----
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

// ---- ACTIVE NAV LINK on scroll (single page) ----
(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(section) { observer.observe(section); });
})();
