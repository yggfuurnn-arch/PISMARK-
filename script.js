const $ = (selector, parent = document) => parent.querySelector(selector);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const backgroundVideo = $('.page-video video');
if (backgroundVideo && !reduceMotion) {
  const playVideo = () => backgroundVideo.play().catch(() => {});
  backgroundVideo.muted = true;
  playVideo();
  backgroundVideo.addEventListener('canplay', playVideo, { once: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) playVideo(); });
}

window.addEventListener('load', () => {
  window.setTimeout(() => {
    $('.site-loader').classList.add('is-gone');
    document.body.classList.add('is-ready');
  }, reduceMotion ? 0 : 500);
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
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.16 });
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
