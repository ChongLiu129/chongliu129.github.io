const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
function closeMenu() { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const viewerTitle = document.querySelector('#viewer-title');
let previousFocus;
document.querySelectorAll('.design-open').forEach(link => {
  link.addEventListener('click', event => {
    if (!viewer?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); previousFocus = link;
    viewerImage.src = link.dataset.image; viewerImage.alt = `Original portfolio sheet: ${link.dataset.title}`;
    viewerTitle.textContent = link.dataset.title; viewer.showModal();
  });
});
document.querySelector('.close-viewer')?.addEventListener('click', () => viewer.close());
viewer?.addEventListener('click', event => { if (event.target === viewer) { const bounds = viewer.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close(); } });
viewer?.addEventListener('close', () => previousFocus?.focus());
document.querySelector('.print-cv')?.addEventListener('click', () => window.print());
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a[href^="/#"]')];
  const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { links.forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }, {rootMargin: '-15% 0px -50% 0px', threshold: 0});
  document.querySelectorAll('main section[id], footer[id]').forEach(section => observer.observe(section));
}
