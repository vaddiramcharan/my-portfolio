/**
 * main.js - Core Javascript Logic
 * Premium AI & Data Science Portfolio
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Base initialization
  initScrollAnimations();
  initNavigation();
  initTypewriter();
  initSkillsProgressBars();
  initCopyEmail();
  initResumeDownload();
  initContactForm();   // EmailJS contact form
  
  // UX Enhancements
  initUXEffects();
  initAICursor();         // Dual-layer premium cursor
  initMagneticButtons();
  initCardTilt();
  initParticles();
  initRipple();           // Button click ripple
  initFloatingIcons();    // Subtle floating on icons
});


let pageLoaded = false;
let minTimePassed = false;

function exitPreloader() {
  if (pageLoaded && minTimePassed) {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-reveal');
        
        // Remove page-reveal class after animation finishes to prevent transform stacking context bugs on fixed elements
        setTimeout(() => {
          document.body.classList.remove('page-reveal');
        }, 800);
      }, 800); // matches the 800ms CSS transition
    }
  }
}

// Minimum loading screen duration of 3.0 seconds (within 2-3.5s range)
setTimeout(() => {
  minTimePassed = true;
  exitPreloader();
}, 3000);

window.addEventListener('load', () => {
  pageLoaded = true;
  exitPreloader();
});

/**
 * Basic setup for scroll-triggered animation hooks
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: make everything visible immediately if observer is unsupported
    animatedElements.forEach(el => el.classList.add('active'));
  }
}

/**
 * Handle navigation functionality: Sticky on scroll, mobile toggle, active section spy
 */
function initNavigation() {
  const header = document.getElementById('main-header');
  const hamburger = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // 1. Sticky Header Scroll Event (passive for performance)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle
  function toggleMenu() {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Update ARIA attributes for screen readers
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    // Lock scroll when drawer is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close drawer on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu();
      hamburger.focus();
    }
  });

  // Close mobile menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // 3. Scroll Spy: Active Section Indicators
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          updateActiveLink(currentId);
        }
      });
    }, {
      threshold: 0.35, // Trigger when 35% of the section is visible
      rootMargin: '-80px 0px -20% 0px' // Offset header height
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  function updateActiveLink(activeId) {
    // Update desktop
    desktopLinks.forEach(link => {
      if (link.getAttribute('data-section') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update mobile
    mobileLinks.forEach(link => {
      if (link.getAttribute('data-section') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/**
 * Premium typewriter effect for role subtitles
 */
function initTypewriter() {
  const words = [
    'B.Tech AI & Data Science Student',
    'Aspiring AI Engineer',
    'Data Science Enthusiast'
  ];
  
  const textEl = document.getElementById('role-text');
  if (!textEl) return;
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Deleting characters
      textEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletion speed
    } else {
      // Typing characters
      textEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // Word completed typing
    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } 
    // Word fully deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Move to next word
      typingSpeed = 500; // Short pause before next word starts typing
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typewriter loop
  setTimeout(type, 1000);
}

/**
 * Animate the progress bars when they scroll into the viewport
 */
function initSkillsProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const percent = fill.getAttribute('data-percent');
          fill.style.width = `${percent}%`;
          observer.unobserve(fill); // Animate only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    progressFills.forEach(fill => observer.observe(fill));
  } else {
    // Fallback: fill immediately
    progressFills.forEach(fill => {
      const percent = fill.getAttribute('data-percent');
      fill.style.width = `${percent}%`;
    });
  }
}

/**
 * Copy email to clipboard utility
 */
function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText('vaddiramcharan2@gmail.com').then(() => {
      const icon = btn.querySelector('i');
      icon.className = 'fa-solid fa-check';
      icon.style.color = '#10B981';
      setTimeout(() => {
        icon.className = 'fa-regular fa-copy';
        icon.style.color = '';
      }, 2000);
    });
  });
}

/* ============================================================
   TOAST NOTIFICATION SYSTEM
   ============================================================ */
function showToast(type, message, duration) {
  if (duration === undefined) duration = 5000;
  var container = document.getElementById('toast-container');
  if (!container) return;

  var icons = { success: 'fa-circle-check', error: 'fa-circle-xmark' };

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.setAttribute('role', 'alert');
  toast.innerHTML =
    '<i class="fa-solid ' + icons[type] + ' toast-icon" aria-hidden="true"></i>' +
    '<span>' + message + '</span>' +
    '<button class="toast-close" aria-label="Dismiss notification">' +
      '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' +
    '</button>';

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { toast.classList.add('toast-show'); });
  });

  function dismiss() {
    toast.classList.remove('toast-show');
    toast.classList.add('toast-hide');
    toast.addEventListener('transitionend', function() { toast.remove(); }, { once: true });
  }

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  setTimeout(dismiss, duration);
}

/* ============================================================
   CONTACT FORM — EmailJS Integration
   ============================================================ */
function initContactForm() {
  var form      = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  if (!form || !submitBtn) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getField(id) { return document.getElementById(id); }
  function getError(fieldId) {
    return document.getElementById('error-' + fieldId.replace('form-', ''));
  }

  function setError(fieldId, msg) {
    var field = getField(fieldId);
    var err   = getError(fieldId);
    if (field) field.classList.add('input-invalid');
    if (err)   err.textContent = msg;
  }

  function clearError(fieldId) {
    var field = getField(fieldId);
    var err   = getError(fieldId);
    if (field) field.classList.remove('input-invalid');
    if (err)   err.textContent = '';
  }

  function clearAllErrors() {
    ['form-name', 'form-email', 'form-subject', 'form-message'].forEach(clearError);
  }

  function validateForm() {
    var valid   = true;
    var name    = (getField('form-name')    || {}).value ? getField('form-name').value.trim()    : '';
    var email   = (getField('form-email')   || {}).value ? getField('form-email').value.trim()   : '';
    var subject = (getField('form-subject') || {}).value ? getField('form-subject').value.trim() : '';
    var message = (getField('form-message') || {}).value ? getField('form-message').value.trim() : '';
    clearAllErrors();

    if (!name)                    { setError('form-name',    'Please enter your name.');                 valid = false; }
    if (!email)                   { setError('form-email',   'Please enter your email address.');        valid = false; }
    else if (!EMAIL_RE.test(email)) { setError('form-email', 'Please enter a valid email address.');     valid = false; }
    if (!subject)                 { setError('form-subject', 'Please enter a subject.');                 valid = false; }
    if (!message)                 { setError('form-message', 'Please enter a message.');                 valid = false; }

    return valid;
  }

  // Clear errors as user types
  ['form-name', 'form-email', 'form-subject', 'form-message'].forEach(function(id) {
    var el = getField(id);
    if (el) el.addEventListener('input', function() { clearError(id); });
  });

  function setLoading(loading) {
    submitBtn.disabled = loading;
    if (loading) {
      submitBtn.classList.add('loading');
    } else {
      submitBtn.classList.remove('loading');
    }
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm()) return;
    if (submitBtn.disabled) return; // prevent double submission

    // Guard: warn if config not filled
    if (
      typeof EMAILJS_CONFIG === 'undefined' ||
      EMAILJS_CONFIG.PUBLIC_KEY  === 'YOUR_PUBLIC_KEY'  ||
      EMAILJS_CONFIG.SERVICE_ID  === 'YOUR_SERVICE_ID'  ||
      EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
    ) {
      showToast('error', 'EmailJS is not configured yet. Please update js/emailjs.config.js with your credentials.');
      return;
    }

    setLoading(true);

    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, form)
      .then(function() {
        showToast('success', "Your message has been sent successfully! I'll get back to you soon. \uD83D\uDE80");
        form.reset();
        clearAllErrors();
      })
      .catch(function(err) {
        console.error('EmailJS error:', err);
        showToast('error', 'Failed to send your message. Please try again or email me directly.');
      })
      .finally(function() {
        setLoading(false);
      });
  });
}


function initUXEffects() {
  // Scroll Progress Bar — use passive listener for better scroll perf
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    let scrollRafPending = false;
    window.addEventListener('scroll', () => {
      if (scrollRafPending) return;
      scrollRafPending = true;
      requestAnimationFrame(() => {
        const scrollTotal = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = height > 0 ? Math.round((scrollTotal / height) * 100) : 0;
        progressBar.style.width = pct + '%';
        progressBar.setAttribute('aria-valuenow', pct);
        scrollRafPending = false;
      });
    }, { passive: true });
  }

  // Custom Cursor Glow — RAF throttled, skip on touch devices
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && !window.matchMedia('(pointer: coarse)').matches) {
    let cursorRafPending = false;
    document.addEventListener('mousemove', (e) => {
      if (cursorRafPending) return;
      cursorRafPending = true;
      requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorRafPending = false;
      });
    }, { passive: true });
  }
}


/**
 * Premium Dual-Layer AI Cursor
 * - Inner dot: instant tracking via transform
 * - Outer ring: spring-based delayed tracking
 * - Hover: ring expands over interactive elements
 * - Click: both layers pulse
 */
function initAICursor() {
  // Bail out entirely on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  // --- State ---
  let mouseX = 0, mouseY = 0;          // live mouse coords
  let ringX  = 0, ringY  = 0;          // ring's current interpolated position
  const SPRING = 0.12;                  // spring strength (0–1, higher = snappier)

  // --- Reveal on first mousemove ---
  function onFirstMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    ringX  = mouseX;
    ringY  = mouseY;
    dot.classList.remove('cursor-hidden');
    ring.classList.remove('cursor-hidden');
    document.removeEventListener('mousemove', onFirstMove);
    // Begin tracking loop
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    rafLoop();
  }

  // --- Track raw mouse position ---
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // --- RAF spring loop: ring chases mouse ---
  function rafLoop() {
    // Spring interpolation: ease ring toward mouse
    ringX += (mouseX - ringX) * SPRING;
    ringY += (mouseY - ringY) * SPRING;

    // Apply positions via transform (GPU-composited, no layout reflow)
    dot.style.transform  = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

    requestAnimationFrame(rafLoop);
  }

  // --- Hover detection: expand ring over interactive elements ---
  const HOVER_TARGETS = 'a, button, [role="button"], input, textarea, select, label, .glass-panel, .skill-badge, .cert-card, .achievement-card, .footer-social-btn, .nav-link, .mobile-nav-link, .footer-nav-link';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_TARGETS)) {
      ring.classList.add('is-hovering');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_TARGETS)) {
      ring.classList.remove('is-hovering');
    }
  }, { passive: true });

  // --- Click pulse animation ---
  document.addEventListener('mousedown', () => {
    dot.classList.add('is-clicking');
    ring.classList.add('is-clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('is-clicking');
    ring.classList.remove('is-clicking');
  });

  // --- Hide cursor when leaving the window ---
  document.addEventListener('mouseleave', () => {
    dot.classList.add('cursor-hidden');
    ring.classList.add('cursor-hidden');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.remove('cursor-hidden');
    ring.classList.remove('cursor-hidden');
  });

  // Start hidden, reveal on first move
  dot.classList.add('cursor-hidden');
  ring.classList.add('cursor-hidden');
  document.addEventListener('mousemove', onFirstMove, { once: true });
}



/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return; // Disable on touch devices
  
  const buttons = document.querySelectorAll('.btn, .footer-social-btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/**
 * 3D Card Tilt Effect
 */
function initCardTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return; // Disable on touch devices
  
  const cards = document.querySelectorAll('.glass-card, .glass-panel');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/**
 * Lightweight Background Particles (AI Theme)
 */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 - dist/1500})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/**
 * Button Ripple Effect
 * Creates a circular ripple from the click origin.
 */
function initRipple() {
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.btn');
    if (!btn) return;

    var rect   = btn.getBoundingClientRect();
    var size   = Math.max(rect.width, rect.height);
    var x      = e.clientX - rect.left - size / 2;
    var y      = e.clientY - rect.top  - size / 2;

    var ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.cssText =
      'width:' + size + 'px;height:' + size + 'px;' +
      'left:'  + x   + 'px;top:'    + y   + 'px;';

    btn.appendChild(ripple);
    ripple.addEventListener('animationend', function() { ripple.remove(); }, { once: true });
  });
}

/**
 * Floating Icons
 * Applies the .float-icon class to icon boxes in sections
 * so they gently bob up and down on an offset cycle.
 */
function initFloatingIcons() {
  // Skill category header icons
  var iconBoxes = document.querySelectorAll(
    '.skill-category-icon, .contact-icon-box i, .achievement-icon i, .social-icon-btn i, .footer-social-btn i'
  );

  iconBoxes.forEach(function(el, i) {
    el.style.animationDelay = (i * 0.18) + 's';
    el.classList.add('float-icon');
  });
}

/**
 * Resume Download & Verification Handler
 */
function initResumeDownload() {
  const downloadBtns = document.querySelectorAll('.download-resume-btn');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      const fileUrl = this.getAttribute('href') || 'assets/resume/Vaddi_Ram_Charan_Resume.pdf';
      const fileName = this.getAttribute('download') || 'Vaddi_Ram_Charan_Resume.pdf';

      // If we are running under file:// protocol, fetch will fail due to CORS.
      // We skip the fetch check and directly download on file://.
      if (window.location.protocol === 'file:') {
        triggerProgrammaticDownload(fileUrl, fileName);
        return;
      }

      // Check if file exists using a simple fetch check
      fetch(fileUrl, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            triggerProgrammaticDownload(fileUrl, fileName);
          } else {
            showToast('error', 'Resume is not available yet.');
          }
        })
        .catch(err => {
          console.warn('File existence check failed, attempting GET request:', err);
          // Fallback to GET request in case HEAD is blocked but GET works
          fetch(fileUrl, { method: 'GET' })
            .then(response => {
              if (response.ok) {
                triggerProgrammaticDownload(fileUrl, fileName);
              } else {
                showToast('error', 'Resume is not available yet.');
              }
            })
            .catch(getErr => {
              console.error('Fetch check failed completely:', getErr);
              showToast('error', 'Resume is not available yet.');
            });
        });
    });
  });
}

function triggerProgrammaticDownload(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
