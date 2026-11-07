const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰';});
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));
const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.full;lightboxImage.alt=item.querySelector('img').alt;lightbox.classList.add('open');}));
function closeLightbox(){lightbox.classList.remove('open');lightboxImage.src='';}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});

// Static-hosting contact form: prepares an email for the visitor to send.
const contactForm=document.querySelector('#contact-form');
if(contactForm){contactForm.addEventListener('submit',event=>{event.preventDefault();if(!contactForm.reportValidity())return;const data=new FormData(contactForm);const subject=encodeURIComponent(String(data.get('subject')));const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`);document.querySelector('#form-status').textContent='Opening your email app with the message details…';window.location.href=`mailto:connectwithsahara@study.iitm.ac.in?subject=${subject}&body=${body}`;});}
