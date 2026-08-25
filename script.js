/* =========================================================
  Shri Digital Consultancy  Digital Consultancy
  script.js
========================================================= */
if(document.body) document.body.classList.add('page-loading');

document.addEventListener('DOMContentLoaded', () => {
  initPageExperience();
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initPortfolioFilter();
  initContactForm();
  initBackToTop();
  initHeroWordAssembly();
  initMarketingWordCloud();
  initSignalCanvas();
  initActiveNav();
});

/* ---------- Hero word assembly ---------- */
function initHeroWordAssembly(){
  const title = document.querySelector('.video-content h1');
  if(!title) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  title.querySelectorAll('.hero-word').forEach((word, wordIndex) => {
    const letters = [...word.textContent];
    word.textContent = '';
    letters.forEach((letter, letterIndex) => {
      const span = document.createElement('span');
      span.className = 'hero-letter';
      span.textContent = letter;
      const randomX = Math.round((Math.random() - 0.5) * 520);
      const randomY = Math.round((Math.random() - 0.5) * 360);
      const randomRotation = Math.round((Math.random() - 0.5) * 70);
      const randomScale = (0.62 + Math.random() * 0.38).toFixed(2);
      span.style.setProperty('--letter-delay', `${(wordIndex * 0.72) + (letterIndex * 0.075)}s`);
      span.style.setProperty('--letter-x', `${randomX}px`);
      span.style.setProperty('--letter-y', `${randomY}px`);
      span.style.setProperty('--letter-rotation', `${randomRotation}deg`);
      span.style.setProperty('--letter-scale', randomScale);
      if(reduceMotion || wordIndex === 0) span.classList.add('is-assembled');
      word.appendChild(span);
    });
  });
}

/* ---------- Site-wide page motion ---------- */
function initPageExperience(){
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = '<div class="loader-inner"><div class="loader-logo"><span class="logo-mark"></span>Shri Digital Consultancy<span class="loader-logo-dot">.</span></div><div class="loader-status">Preparing your experience</div><div class="loader-line"><span></span></div></div>';
  document.body.appendChild(loader);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finishLoading = () => {
    document.body.classList.remove('page-loading');
    document.body.classList.add('page-ready');
    loader.classList.add('is-hidden');
  };
  window.setTimeout(finishLoading, reduceMotion ? 0 : 1050);

  document.addEventListener('click', (event) => {
    const target = event.target.closest('a, button');
    if(!target) return;

    const href = target.getAttribute('href');
    const isInternalPage = href && href.endsWith('.html') && !target.target;
    if(isInternalPage && !reduceMotion){
      event.preventDefault();
      document.body.classList.add('page-leaving');
      loader.classList.remove('is-hidden');
      window.setTimeout(() => { window.location.href = href; }, 360);
    }
  });
}

/* ---------- Marketing word cloud  cinematic hero loop ---------- */
function initMarketingWordCloud(){
  const canvas = document.getElementById('marketing-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const words = ['SEO','WEB','DEVELOPMENT','STRATEGY','BRAND','DIGITAL','MARKETING','DESIGN','VIDEO','SOCIAL MEDIA','CONTENT','BUSINESS','SALES','ADVERTISING','DATA','EMAIL','BLOG','CREATIVE','ONLINE','PROMOTION','CAMPAIGN','CONVERSION','ANALYTICS','PERFORMANCE','SEARCH','E-COMMERCE'];
  const positions = [
    [.1,.2], [.84,.2], [.18,.72], [.78,.76], [.08,.46], [.91,.48], [.25,.17], [.7,.16],
    [.29,.84], [.66,.86], [.05,.64], [.94,.7], [.16,.34], [.86,.36], [.37,.12], [.58,.13],
    [.39,.9], [.55,.82], [.13,.84], [.9,.14], [.03,.32], [.97,.3], [.34,.7], [.84,.58], [.46,.2], [.56,.74]
  ];
  const entries = words.map((word, index) => ({
    word,
    angle: [-0.18,0.12,-0.08,0.18,0,-0.1,0.08][index % 7],
    x: positions[index][0],
    y: positions[index][1],
    scale: 0.62 + (index % 4) * 0.08,
    delay: 0.55 + index * 0.12,
    duration: 1.15 + (index % 5) * 0.13,
    direction: index % 8,
    depth: 0.55 + (index % 5) * 0.1,
    main: word === 'DIGITAL' || word === 'MARKETING'
  }));
  let width = 0, height = 0, start = performance.now();
  let pointerTargetX = 0, pointerTargetY = 0, pointerX = 0, pointerY = 0;
  const hero = canvas.closest('.home-video-hero');

  function resize(){
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width; height = rect.height;
    canvas.width = width * dpr; canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function ease(value){ return 1 - Math.pow(1 - value, 3); }
  function draw(now){
    const elapsed = reduceMotion ? 11 : ((now - start) / 1000) % 11;
    pointerX += (pointerTargetX - pointerX) * 0.12;
    pointerY += (pointerTargetY - pointerY) * 0.12;
    ctx.clearRect(0, 0, width, height);
    const centerX = width * 0.55, centerY = height * 0.5;
    entries.forEach(entry => {
      if(entry.main) return;
      const progress = Math.max(0, Math.min(1, (elapsed - entry.delay) / entry.duration));
      const settled = ease(progress);
      const drift = reduceMotion ? 0 : Math.sin(now / 2600 + entry.delay) * 3;
      const spread = 1 - settled;
      const vectors = [[-1,0],[1,0],[0,-1],[0,1],[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]];
      const vector = vectors[entry.direction];
      const baseX = width * entry.x, baseY = height * entry.y;
      const x = baseX + vector[0] * width * 0.32 * spread + (centerX - baseX) * spread * 0.12 + pointerX * (18 + entry.depth * 34);
      const y = baseY + vector[1] * height * 0.35 * spread + drift + pointerY * (14 + entry.depth * 28);
      const fontSize = Math.max(10, Math.min(width * 0.017, 20)) * entry.scale;
      ctx.save();
      ctx.font = `600 ${fontSize}px Montserrat, sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const textWidth = ctx.measureText(entry.word).width;
      const edgePadding = Math.min(18, width * 0.04);
      const visibleX = Math.max(textWidth / 2 + edgePadding, Math.min(width - textWidth / 2 - edgePadding, x));
      const visibleY = Math.max(fontSize / 2 + edgePadding, Math.min(height - fontSize / 2 - edgePadding, y));
      ctx.translate(visibleX, visibleY);
      ctx.rotate(entry.angle * (0.25 + settled * 0.75));
      ctx.globalAlpha = Math.min(1, progress * 1.8) * (0.38 + entry.depth * 0.18);
      ctx.fillStyle = entry.depth > .78 ? '#75baff' : '#d9ecff';
      ctx.shadowColor = 'rgba(55,140,255,.32)';
      ctx.shadowBlur = 8;
      ctx.fillText(entry.word, 0, 0);
      ctx.restore();
    });
    if(!reduceMotion) requestAnimationFrame(draw);
  }
  resize(); draw(performance.now());
  window.addEventListener('resize', resize);
  if(hero && !reduceMotion && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }, { passive:true });
    hero.addEventListener('pointerleave', () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    });
  }
}

/* ---------- Sticky header ---------- */
function initHeader(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const toggle = () => {
    if(window.scrollY > 40){
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive:true });
}

/* ---------- Mobile nav ---------- */
function initMobileNav(){
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-nav');
  const closeButton = document.querySelector('.mobile-nav-close');
  if(!btn || !menu) return;

  const closeMenu = () => {
    btn.classList.remove('is-open');
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
  };

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });
  closeButton?.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if(window.innerWidth > 960) closeMenu();
  });
}

/* ---------- Highlight current page in nav ---------- */
function initActiveNav(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if(href === path || (path === '' && href === 'index.html')){
      link.classList.add('active');
    }
  });
}

/* ---------- Smooth scroll for in-page anchors ---------- */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if(targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if(target){
        e.preventDefault();
        const headerOffset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior:'smooth' });
      }
    });
  });
}

/* ---------- Scroll reveal via IntersectionObserver ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  const motionItems = document.querySelectorAll('main h1, main h2, main h3, main p, main .eyebrow, main .btn, main .link-arrow, main .feature-row, main .stat-item, main .project-card, main .value-card, main .team-card, main .service-detail, main .process-step, main .contact-info-item, main .form-group');
  motionItems.forEach(item => {
    if(!item.closest('.reveal, .reveal-stagger')) item.classList.add('motion-item');
  });
  const allTargets = document.querySelectorAll('.reveal, .reveal-stagger, .motion-item');
  if(!allTargets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const fromBelow = entry.boundingClientRect.top > window.innerHeight * 0.5;
      entry.target.style.setProperty('--reveal-y', fromBelow ? '28px' : '-28px');
      entry.target.style.setProperty('--motion-y', fromBelow ? '28px' : '-28px');
      if(entry.isIntersecting){
        entry.target.classList.remove('is-visible', 'is-motion-visible');
        requestAnimationFrame(() => {
          entry.target.classList.add('is-visible', 'is-motion-visible');
        });
      } else {
        entry.target.classList.remove('is-visible', 'is-motion-visible');
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });

  allTargets.forEach(el => observer.observe(el));
}

/* ---------- Animated counters ---------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-counter]');
  if(!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if(progress < 1){
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animate(entry.target);
      } else {
        entry.target.textContent = '0';
      }
    });
  }, { threshold:0.4 });

  counters.forEach(el => observer.observe(el));
}

/* ---------- Portfolio filtering ---------- */
function initPortfolioFilter(){
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if(!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

/* ---------- Contact form validation ---------- */
function initContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const successBox = document.querySelector('.form-success');
  const statusBox = document.getElementById('form-status');

  const validators = {
    name: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    phone: (v) => /^[0-9+\-\s()]{7,16}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.',
    service: (v) => v ? '' : 'Please select a service.',
    message: (v) => v.trim().length >= 15 ? '' : 'Message should be at least 15 characters.'
  };

  const showError = (field, msg) => {
    const group = field.closest('.form-group');
    if(!group) return;
    const errorEl = group.querySelector('.error-msg');
    if(msg){
      group.classList.add('error');
      if(errorEl) errorEl.textContent = msg;
    } else {
      group.classList.remove('error');
      if(errorEl) errorEl.textContent = '';
    }
  };

  const validateField = (field) => {
    const rule = validators[field.name];
    if(!rule) return true;
    const msg = rule(field.value);
    showError(field, msg);
    return !msg;
  };

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('input, select, textarea').forEach(field => {
      if(validators[field.name]){
        const ok = validateField(field);
        if(!ok) valid = false;
      }
    });

    if(!valid){
      const firstError = form.querySelector('.form-group.error');
      if(firstError) firstError.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }

    const fields = Object.fromEntries(new FormData(form).entries());
    const whatsappMessage = `New Shri Digital Consultancy enquiry\n\nName: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nCompany: ${fields.company || 'Not provided'}\nService: ${fields.service}\nBudget: ${fields.budget || 'Not provided'}\n\nMessage:\n${fields.message}`;
    const whatsappUrl = `https://wa.me/919967943460?text=${encodeURIComponent(whatsappMessage)}`;
    window.location.assign(whatsappUrl);
  });
}

function submitEnquiry(formData){
  return fetch('send-email.php', {
    method:'POST',
    headers:{ Accept:'application/json' },
    body:formData
  }).then(response => response.text().then(text => ({ response, text }))).then(({ response, text }) => {
    let result;
    try { result = JSON.parse(text); } catch(error) { throw new Error('The email server is unavailable. Please use the hosted PHP version of this website.'); }
    if(!response.ok || !result.ok) throw new Error(result.message || 'Enquiry submission failed');
    return result;
  });
}

/* ---------- Back to top ---------- */
function initBackToTop(){
  const btn = document.querySelector('.back-to-top');
  if(!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive:true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  });
}

/* ---------- Signal canvas  signature hero animation ---------- */
function initSignalCanvas(){
  const canvas = document.getElementById('signal-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, nodes;
  const NODE_COUNT = 42;
  const LINK_DIST = 130;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeNodes(){
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    }));
  }

  function step(){
    ctx.clearRect(0, 0, width, height);

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if(n.x < 0 || n.x > width) n.vx *= -1;
      if(n.y < 0 || n.y > height) n.vy *= -1;
    });

    for(let i = 0; i < nodes.length; i++){
      for(let j = i + 1; j < nodes.length; j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < LINK_DIST){
          const opacity = 1 - dist / LINK_DIST;
          ctx.strokeStyle = `rgba(255, 130, 100, ${opacity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fill();
    });

    if(!reduceMotion) requestAnimationFrame(step);
  }

  resize();
  makeNodes();
  step();

  window.addEventListener('resize', () => {
    resize();
    makeNodes();
    if(reduceMotion) step();
  });
}
