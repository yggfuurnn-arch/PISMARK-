const $ = (s, c = document) => c.querySelector(s);

window.addEventListener('load', () => {
  setTimeout(() => $('.preloader').classList.add('done'), 700);
  document.body.classList.add('ready');
});

$('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  $('.progress span').style.width = `${(window.scrollY / h) * 100}%`;
}, { passive: true });

const dot = $('.cursor-dot');
window.addEventListener('pointermove', e => { dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px`; });
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { dot.style.width = '28px'; dot.style.height = '28px'; dot.style.background = '#1957ed22'; });
  el.addEventListener('mouseleave', () => { dot.style.width = '10px'; dot.style.height = '10px'; dot.style.background = 'transparent'; });
});

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.project').forEach(card => {
    const show = filter === 'all' || card.dataset.category.includes(filter);
    card.style.display = show ? '' : 'none';
  });
}));

document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.12}px)`; });
  el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
});
