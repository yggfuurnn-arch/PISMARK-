const $ = (selector, parent = document) => parent.querySelector(selector);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const servicesVideo = $('#services video');
if (servicesVideo && !reduceMotion) {
  const playServicesVideo = () => servicesVideo.play().catch(() => {});
  servicesVideo.muted = true;
  playServicesVideo();
  servicesVideo.addEventListener('canplay', playServicesVideo, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) playServicesVideo();
  });
}

window.addEventListener('load', () => {
  window.setTimeout(() => {
    $('.site-loader').classList.add('is-gone');
    document.body.classList.add('is-ready');
  }, reduceMotion ? 0 : 650);
});

$('#year').textContent = new Date().getFullYear();

const header = $('.site-header');
const progress = $('.scroll-progress span');
const updateScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu.hidden = open;
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.hidden = true;
}));

document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.project-card').forEach((card) => {
    const visible = filter === 'all' || card.dataset.category.includes(filter);
    card.hidden = !visible;
  });
}));

if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
  const cursor = $('.cursor');
  window.addEventListener('pointermove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.13;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.13;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
}
