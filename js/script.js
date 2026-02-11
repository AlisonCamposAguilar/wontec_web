/* Scroll reveal */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if(top < trigger){
      el.classList.add("active");
    }
  });
});


/* Menú móvil */
const toggle = document.getElementById("toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});


/* Simple carousel for partners-logos */
(function(){
  const carouselRoot = document.querySelector('.partners-logos.carousel');
  if(!carouselRoot) return;
  const track = carouselRoot.querySelector('.carousel-track');
  if(!track) return;

  // continuous marquee: clone children to make seamless loop
  const children = Array.from(track.children);
  if(children.length === 0) return;

  // wrap track in a container with overflow hidden (CSS should handle but ensure)
  carouselRoot.style.overflow = 'hidden';
  carouselRoot.style.position = 'relative';

  // duplicate items
  children.forEach(node => track.appendChild(node.cloneNode(true)));

  let speed = 40; // pixels per second
  let pos = 0;
  let rafId = null;

  // measure width (half of track since we've duplicated)
  function getResetWidth(){
    // width of the original set
    let total = 0;
    for(let i=0;i<children.length;i++){
      total += children[i].getBoundingClientRect().width;
    }
    return total;
  }

  let resetWidth = getResetWidth();

  function step(ts){
    // delta time
    if(!step.last) step.last = ts;
    const dt = (ts - step.last) / 1000;
    step.last = ts;

    pos -= speed * dt;
    if(Math.abs(pos) >= resetWidth){
      pos += resetWidth; // wrap
    }
    track.style.transform = `translateX(${pos}px)`;
    rafId = requestAnimationFrame(step);
  }

  function start(){
    if(rafId) cancelAnimationFrame(rafId);
    step.last = null;
    rafId = requestAnimationFrame(step);
  }

  function stop(){ if(rafId) cancelAnimationFrame(rafId); rafId = null; }

  // pause on hover
  carouselRoot.addEventListener('mouseenter', () => stop());
  carouselRoot.addEventListener('mouseleave', () => start());

  // restart/rescale on resize
  window.addEventListener('resize', () => {
    resetWidth = getResetWidth();
  });

  start();
})();
