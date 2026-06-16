const projects = {
  fininvai: {
    index: '01',
    title: 'FinInvAI',
    kicker: 'WEB SERVICE DESIGN · 2025.12—2026.03',
    heading: '데이터를 보는 것에서, 받는 경험으로.',
    summary: '분산된 시장 데이터를 하나의 흐름으로 연결하고 AI 기반 인사이트를 통해 사용자가 탐색보다 이해에 집중하도록 설계한 금융 데이터 서비스입니다.',
    facts: [
      ['Project', 'Team project · Design contribution 100%'],
      ['Role', 'Logo · Web Landing UI · Icon Design'],
      ['Tools', 'Figma · Illustrator · Photoshop · Gemini']
    ],
    pages: [
      ['assets/images/portfolio-2.webp', 'FinInvAI Overview'],
      ['assets/images/portfolio-3.webp', 'Project Goal'],
      ['assets/images/portfolio-4.webp', 'AI-driven Insight'],
      ['assets/images/portfolio-5.webp', 'Main Screen Overview'],
      ['assets/images/portfolio-6.webp', 'Dashboard Features']
    ]
  },
  sorijang: {
    index: '02',
    title: '소리장',
    kicker: 'MUSIC APP DESIGN · 2025.09—2025.12',
    heading: '감정과 상황에서 시작하는 음악 탐색.',
    summary: '세분화된 음악 선택 리스트와 AI 채팅 기반 추천 기능을 통해 사용자가 자신의 감정과 상황에 맞는 음악을 쉽고 직관적으로 발견하도록 설계했습니다.',
    facts: [
      ['Project', '3-person team · Contribution 70%'],
      ['Role', 'Logo · UX Structure · UI · Concept Planning'],
      ['Tools', 'Figma · Illustrator · Photoshop · Gemini']
    ],
    pages: [
      ['assets/images/portfolio-7.webp', 'Sorijang Overview'],
      ['assets/images/portfolio-8.webp', 'Project Goal'],
      ['assets/images/portfolio-9.webp', 'Feature Screen']
    ]
  }
};

const modal = document.querySelector('#project-modal');
const closeButton = document.querySelector('.modal-close');
let lastFocused = null;

function openProject(key) {
  const p = projects[key];
  if (!p) return;
  lastFocused = document.activeElement;
  document.querySelector('#modal-index').textContent = p.index;
  document.querySelector('#modal-title').textContent = p.title;
  document.querySelector('#modal-kicker').textContent = p.kicker;
  document.querySelector('#modal-heading').textContent = p.heading;
  document.querySelector('#modal-summary').textContent = p.summary;
  document.querySelector('#modal-facts').innerHTML = p.facts.map(([label, value]) =>
    `<div><span>${label}</span><strong>${value}</strong></div>`
  ).join('');
  document.querySelector('#modal-gallery').innerHTML = p.pages.map(([src, caption]) =>
    `<figure class="modal-reveal"><img src="${src}" alt="${caption}" loading="lazy"><figcaption>${caption}</figcaption></figure>`
  ).join('');
  observeModalFigures();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.scrollTop = 0;
  setTimeout(() => closeButton.focus(), 150);
}

function closeProject() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});
closeButton.addEventListener('click', closeProject);
modal.addEventListener('click', event => {
  if (event.target === modal) closeProject();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeProject();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const glow = document.querySelector('.cursor-glow');
const pointer = { x: -500, y: -500 };
const follower = { x: -500, y: -500 };

function animateCursor() {
  follower.x += (pointer.x - follower.x) * 0.16;
  follower.y += (pointer.y - follower.y) * 0.16;
  glow.style.left = `${follower.x}px`;
  glow.style.top = `${follower.y}px`;
  requestAnimationFrame(animateCursor);
}

document.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch') return;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  glow.classList.add('visible');
});

document.addEventListener('pointerover', event => {
  if (event.target.closest('a, button, .project-card')) glow.classList.add('interactive');
});

document.addEventListener('pointerout', event => {
  if (event.target.closest('a, button, .project-card')) glow.classList.remove('interactive');
});

document.addEventListener('pointerdown', () => glow.classList.add('clicking'));
document.addEventListener('pointerup', () => glow.classList.remove('clicking'));
document.addEventListener('mouseleave', () => glow.classList.remove('visible'));

animateCursor();


// Scroll progress
const progressBar = document.querySelector('.scroll-progress span');
function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

// Hero background parallax
const hero = document.querySelector('.hero');
hero.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch') return;
  const rect = hero.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - .5) * 34;
  const y = ((event.clientY - rect.top) / rect.height - .5) * 28;
  hero.style.setProperty('--hero-x', `${x}px`);
  hero.style.setProperty('--hero-y', `${y}px`);
});
hero.addEventListener('pointerleave', () => {
  hero.style.setProperty('--hero-x', '0px');
  hero.style.setProperty('--hero-y', '0px');
});

// Project card tilt and image parallax
if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-image img');
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--ry', `${(px - .5) * 4.5}deg`);
      card.style.setProperty('--rx', `${(.5 - py) * 3.5}deg`);
      image.style.setProperty('--img-x', `${(px - .5) * -10}px`);
      image.style.setProperty('--img-y', `${(py - .5) * -8}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
      image.style.setProperty('--img-x', '0px');
      image.style.setProperty('--img-y', '0px');
    });
  });
}

// Magnetic buttons
if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', event => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// Click ripple
function addRipple(event) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  target.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}
document.querySelectorAll('.round-link, .contact-row a, .modal-close').forEach(el => el.addEventListener('click', addRipple));

// Modal gallery reveal
let modalFigureObserver;
function observeModalFigures() {
  if (modalFigureObserver) modalFigureObserver.disconnect();
  modalFigureObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        modalFigureObserver.unobserve(entry.target);
      }
    });
  }, { root: modal, threshold: .12 });
  modal.querySelectorAll('.modal-reveal').forEach(figure => modalFigureObserver.observe(figure));
}

// Active navigation state
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const navObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { threshold: [.25, .5, .75], rootMargin: '-20% 0px -55%' });
sections.forEach(section => navObserver.observe(section));
