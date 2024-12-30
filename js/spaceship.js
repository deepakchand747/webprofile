 // Scroll to top or bottom on spaceship click
 const spaceship = document.getElementById('spaceship');
 let scrollingDown = true;

 spaceship.addEventListener('click', () => {
     if (scrollingDown) {
         window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
     } else {
         window.scrollTo({ top: 0, behavior: 'smooth' });
     }
     scrollingDown = !scrollingDown;
 });

 // Show "Back to Top" button on scroll
 window.addEventListener('scroll', () => {
     const backToTop = document.querySelector('.back-to-top');
     if (window.scrollY > 200) {
         backToTop.style.display = 'block';
     } else {
         backToTop.style.display = 'none';
     }

     // Move spaceship slightly
     spaceship.style.top = `${50 + window.scrollY * 0.05}%`;
 });