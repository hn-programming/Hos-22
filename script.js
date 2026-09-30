/* ============================================================
   HOSAM NASR PORTFOLIO — script.js
   ============================================================ */

/* ── State ─────────────────────────────────────────────────── */
let currentLang = localStorage.getItem('hn-lang') || 'en';
let currentTheme = localStorage.getItem('hn-theme') || 'dark';

/* ============================================================
   PRELOADER
   ============================================================ */
(function initPreloader() {
  const subtitle = document.getElementById('typeTarget');
  const bar      = document.getElementById('preBar');
  const percent  = document.getElementById('prePercent');
  const loader   = document.getElementById('preloader');
  const text     = 'Full Stack Developer';

  let typed = 0, progress = 0;

  // Type subtitle
  const typeInterval = setInterval(() => {
    if (typed < text.length) {
      subtitle.textContent += text[typed++];
    } else {
      clearInterval(typeInterval);
    }
  }, 60);

  // Fill bar
  const barInterval = setInterval(() => {
    if (progress < 100) {
      progress += Math.random() * 3 + 1;
      if (progress > 100) progress = 100;
      bar.style.width = progress + '%';
      percent.textContent = Math.floor(progress) + '%';
    } else {
      clearInterval(barInterval);
      setTimeout(() => {
        loader.classList.add('preloader-hidden');
        setTimeout(() => loader.style.display = 'none', 600);
        initApp();
      }, 350);
    }
  }, 40);
})();

/* ============================================================
   APP INIT (runs after preloader)
   ============================================================ */
function initApp() {
  applyTheme(currentTheme);
  applyLang(currentLang);
  initMatrixCanvas();
  initHeroTyping();
  initNavScroll();
  initHamburger();
  initThemeToggle();
  initLangToggle();
  initAOS();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initScrollProgress();
  initCustomCursor();
  initSkillCardGlow();
  initProjectCardGlow();
  initTestimonialCardGlow();
  initHeroParticles();
  initDentalComingSoonModal();
}

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  localStorage.setItem('hn-theme', theme);
}

function initThemeToggle() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });
}

/* ============================================================
   LANGUAGE
   ============================================================ */
const translations = {
  en: {
    'hero-greeting': '~/hosam $',
    'hero-tagline':  'Building modern and scalable web applications',
    'scroll-hint':   'Scroll Down',
    'about-subtitle': 'Hello, World! 👋',
    'about-p1': "I'm Hosam Nasr, a passionate Full Stack Developer with a deep love for crafting elegant, efficient, and scalable web solutions. My journey in programming began with curiosity and grew into a professional craft built on discipline and creativity.",
    'about-p2': "I specialize in building end-to-end web applications using modern technologies. I believe that great software is not just functional — it's also maintainable, readable, and a pleasure to work with.",
    'stat-projects': 'Projects',
    'stat-years':    'Years Exp.',
    'stat-clients':  'Clients',
  },
  ar: {
    'hero-greeting': '~/hosam $',
    'hero-tagline':  'بناء تطبيقات ويب حديثة وقابلة للتوسع',
    'scroll-hint':   'انتقل للأسفل',
    'about-subtitle': 'مرحباً بالعالم! 👋',
    'about-p1': 'أنا حسام نصر، مطور ويب متكامل شغوف ببناء حلول ويب أنيقة وفعّالة وقابلة للتوسع. بدأت رحلتي في البرمجة بالفضول ونمت لتصبح حرفة مهنية مبنية على الانضباط والإبداع.',
    'about-p2': 'أتخصص في بناء تطبيقات ويب متكاملة باستخدام التقنيات الحديثة. أؤمن بأن البرمجيات الجيدة ليست فقط وظيفية — بل أيضاً قابلة للصيانة والقراءة ومريحة للعمل بها.',
    'stat-projects': 'مشروع',
    'stat-years':    'سنوات خبرة',
    'stat-clients':  'عميل',
  }
};

function applyLang(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  // Swap [data-en] / [data-ar] elements
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`) || el.getAttribute('data-en');
  });

  // Navbar label
  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'en' ? 'AR' : 'EN';

  // Form placeholders
  const namePh  = { en: 'Hosam Nasr', ar: 'اسمك' };
  const emailPh = { en: 'you@example.com', ar: 'بريدك@مثال.com' };
  const msgPh   = { en: "Hello Hosam, I'd like to...", ar: 'مرحباً حسام، أريد...' };
  const formName    = document.getElementById('formName');
  const formEmail   = document.getElementById('formEmail');
  const formMessage = document.getElementById('formMessage');
  if (formName)    formName.placeholder    = namePh[lang];
  if (formEmail)   formEmail.placeholder   = emailPh[lang];
  if (formMessage) formMessage.placeholder = msgPh[lang];

  // Hero typed strings
  heroStrings = lang === 'en'
    ? ['Programmer', 'Full Stack Developer', 'WordPress Developer']
    : ['مبرمج', 'مطوّر ويب متكامل', 'مطوّر ووردبريس'];

  localStorage.setItem('hn-lang', lang);
}

function initLangToggle() {
  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyLang(currentLang);
  });
}

/* ============================================================
   MATRIX CANVAS
   ============================================================ */
function initMatrixCanvas() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソタチツテト!@#$%^&*ABCDEF';
  const size  = 14;
  let cols    = Math.floor(canvas.width / size);
  let drops   = Array(cols).fill(1);

  window.addEventListener('resize', () => {
    cols  = Math.floor(canvas.width / size);
    drops = Array(cols).fill(1);
  });

  setInterval(() => {
    ctx.fillStyle = 'rgba(5,6,15,.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00d4ff';
    ctx.font = size + 'px Share Tech Mono, monospace';

    for (let i = 0; i < cols; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * size, drops[i] * size);
      if (drops[i] * size > canvas.height && Math.random() > .975) drops[i] = 0;
      drops[i]++;
    }
  }, 60);
}

/* ============================================================
   HERO TYPING
   ============================================================ */
let heroStrings = ['Programmer', 'Full Stack Developer', 'WordPress Developer'];
let hIdx = 0, hChar = 0, hDeleting = false;

function initHeroTyping() {
  const el = document.getElementById('heroTyped');
  if (!el) return;

  function tick() {
    const current = heroStrings[hIdx];
    if (hDeleting) {
      el.textContent = current.substring(0, hChar--);
      if (hChar < 0) {
        hDeleting = false;
        hIdx = (hIdx + 1) % heroStrings.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 60);
    } else {
      el.textContent = current.substring(0, hChar++);
      if (hChar > current.length) {
        hDeleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 100);
    }
  }
  tick();
}

/* ============================================================
   NAV SCROLL
   ============================================================ */
function initNavScroll() {
  const header = document.getElementById('header');
  const links  = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // Active section highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   HAMBURGER
   ============================================================ */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   AOS — Animate on Scroll
   ============================================================ */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   SKILL BARS
   ============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct  = entry.target.dataset.pct;
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) fill.style.width = pct + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

/* ============================================================
   COUNTERS
   ============================================================ */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCount(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
}

function animateCount(el, target) {
  let start = 0;
  const duration = 1500;
  const step = (ts) => {
    if (!start) start = ts;
    const pct  = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(pct * target);
    if (pct < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('formName').value.trim();
    const email   = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showFeedback(
        currentLang === 'ar' ? '⚠ يرجى ملء جميع الحقول' : '⚠ Please fill in all fields',
        'error'
      );
      return;
    }

    if (!validateEmail(email)) {
      showFeedback(
        currentLang === 'ar' ? '⚠ يرجى إدخال بريد إلكتروني صحيح' : '⚠ Please enter a valid email',
        'error'
      );
      return;
    }

    const accessKey = form.querySelector('input[name="access_key"]')?.value.trim();
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      showFeedback(
        currentLang === 'ar'
          ? '⚠ أضف Web3Forms Access Key أولاً في ملف HTML.'
          : '⚠ Add your Web3Forms Access Key in the HTML first.',
        'error'
      );
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalButtonHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
      const formData = new FormData(form);
      formData.set('email', email);
      formData.set('name', name);
      formData.set('message', message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        form.reset();
        showFeedback(
          currentLang === 'ar'
            ? '✓ تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.'
            : '✓ Message sent successfully! I\'ll get back to you soon.',
          'success'
        );
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showFeedback(
        currentLang === 'ar'
          ? '⚠ حدث خطأ أثناء الإرسال. حاول مرة أخرى.'
          : '⚠ Something went wrong while sending. Please try again.',
        'error'
      );
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalButtonHTML;
    }
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = 'form-feedback ' + type;
    setTimeout(() => {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }, 5000);
  }
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   CV DOWNLOAD (placeholder)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const cvBtn = document.getElementById('cvDownload');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert(currentLang === 'ar' ? 'سيتم توفير السيرة الذاتية قريباً!' : 'CV download will be available soon!');
    });
  }
});

/* ============================================================
   DENTAL CLINIC "COMING SOON" MODAL
   Scoped ONLY to the Dr. Ahmed El-Garhy (Dental Clinic) project
   card's GitHub / Live Demo overlay buttons. Blocks navigation
   and shows a "Coming Soon" / "سيتوفر قريبًا" message instead.
   ============================================================ */
function initDentalComingSoonModal() {
  const overlay = document.getElementById('comingSoonOverlay');
  const closeBtn = document.getElementById('comingSoonClose');
  const triggers = document.querySelectorAll('.dental-coming-soon-btn');
  if (!overlay || triggers.length === 0) return;

  function openModal() {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Click outside the modal box closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Escape key closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.width = '0%';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.id  = 'cursor-dot';
  ring.id = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring lags behind smoothly
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Expand on interactive elements
  document.querySelectorAll('a,button,.btn,.nav-link,.skill-card,.project-card,.social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width  = '14px';
      dot.style.height = '14px';
      ring.style.width  = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'rgba(0,212,255,.8)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width  = '';
      dot.style.height = '';
      ring.style.width  = '';
      ring.style.height = '';
      ring.style.borderColor = '';
    });
  });
}

/* ============================================================
   SKILL CARD MOUSE-GLOW
   ============================================================ */
function initSkillCardGlow() {
  document.querySelectorAll('.skill-card').forEach(card => {
    // Inject glow overlay element for z-index-safe radial glow
    if (!card.querySelector('.skill-glow-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'skill-glow-overlay';
      card.appendChild(overlay);
    }

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const xPct = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
      const yPct = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', xPct);
      card.style.setProperty('--my', yPct);
    });
  });
}

/* ============================================================
   PROJECT CARD MOUSE-GLOW (mirrors initSkillCardGlow)
   ============================================================ */
function initProjectCardGlow() {
  document.querySelectorAll('.project-card').forEach(card => {
    if (!card.querySelector('.project-card-glow-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'project-card-glow-overlay';
      card.appendChild(overlay);
    }

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const xPct = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
      const yPct = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', xPct);
      card.style.setProperty('--my', yPct);
    });
  });
}

/* ============================================================
   TESTIMONIAL CARD MOUSE-GLOW (mirrors initSkillCardGlow)
   ============================================================ */
function initTestimonialCardGlow() {
  document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const xPct = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
      const yPct = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mx', xPct);
      card.style.setProperty('--my', yPct);
    });
  });
}

/* ============================================================
   HERO FLOATING PARTICLES
   ============================================================ */
function initHeroParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const colors = ['rgba(0,212,255,.5)', 'rgba(168,85,247,.5)', 'rgba(255,45,120,.4)', 'rgba(0,255,136,.4)'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = Math.random() * 4 + 2;
    const delay = Math.random() * 12;
    const duration = Math.random() * 10 + 12;
    const left = Math.random() * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${left}%;
      background:${color};
      box-shadow:0 0 ${size * 3}px ${color};
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
    `;
    hero.appendChild(p);
  }
}
