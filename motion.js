const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){
  let pending=false,x=0,y=0;
  window.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;x=event.clientX;y=event.clientY;if(pending)return;pending=true;requestAnimationFrame(()=>{document.body.style.setProperty('--cursor-x',`${x}px`);document.body.style.setProperty('--cursor-y',`${y}px`);pending=false;});},{passive:true});
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.06});
  document.querySelectorAll('.section-heading,.project,.stack-layout,.research-layout,.about-layout').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
}
const navLinks=[...document.querySelectorAll('.nav nav a')];
const navigationObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('is-current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -55% 0px',threshold:0});
document.querySelectorAll('main>section[id]').forEach(section=>navigationObserver.observe(section));
