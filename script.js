document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-links');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Toggle mobile navigation menu
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });

  // Intersection Observer to reveal elements on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item, .skills-grid .skill-card, .interests-grid .interest-card, .contact-card').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // Highlight active nav link based on scroll position
  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Show/hide nav background and scroll-top button
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    setActiveNav();
    toggleScrollTopBtn();
  }

  function toggleScrollTopBtn() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll);
});