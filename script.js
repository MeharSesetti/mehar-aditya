document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle - Targeting <html> directly for reliable variable cascading
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('mehar-portfolio-theme') || 'dark';
  
  // Apply saved theme to <html> on page load
  document.documentElement.setAttribute('data-theme', storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('mehar-portfolio-theme', targetTheme);
    });
  }

  // 2. Dynamic Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Mobile Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 4. ScrollSpy Navigation Highlighting
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    threshold: 0.35,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));
});