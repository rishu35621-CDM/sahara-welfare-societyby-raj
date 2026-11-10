// SAHARA website interactions
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menuButton.textContent = '☰';
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 650 && nav.classList.contains('open') &&
        !nav.contains(event.target) && !menuButton.contains(event.target)) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }
  });
}

// Accessible gallery lightbox
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');
  let previousFocus = null;

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const image = item.querySelector('img');
      if (!image || !lightboxImage) return;
      previousFocus = document.activeElement;
      lightboxImage.src = item.dataset.full || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
      if (closeButton) closeButton.focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    if (lightboxImage) lightboxImage.src = '';
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  if (closeButton) closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

// Static-hosting contact form opens a pre-filled email for the visitor.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const recipient = 'connectwithsahara@study.iitm.ac.in';
    const subject = encodeURIComponent(String(data.get('subject') || 'SAHARA website enquiry'));
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`
    );
    const status = document.querySelector('#form-status');
    if (status) status.textContent = 'Opening your email app with your message ready to send.';
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
