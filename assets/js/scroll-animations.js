/**
 * Bene Beach Bar - Scroll Animations & Reveal Engine
 * Animação suave, relaxada e gradual dos elementos ao rolar a página
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeaderScroll();
  initScrollSpy();
  initLazyLoading();
});

/**
 * Animação de elementos na rolagem usando IntersectionObserver
 * Ajustada para um ponto de ativação natural e transição gradual
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Desobserva para manter a posição fixa e evitar repetições desnecessárias
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.02 // Aciona com estabilidade assim que a borda do elemento se aproxima
    });

    // Revela imediatamente os elementos que já estão na tela ao carregar (Hero/Dobra inicial)
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 30) {
        el.classList.add('revealed');
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/**
 * Header sticky com transição suave na rolagem (sem tremor de altura)
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;

  const updateHeader = () => {
    if (window.scrollY > 30) {
      if (!header.classList.contains('scrolled')) {
        header.classList.add('scrolled');
      }
    } else {
      if (header.classList.contains('scrolled')) {
        header.classList.remove('scrolled');
      }
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();
}

/**
 * ScrollSpy para indicar a seção ativa no menu
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-15% 0px -65% 0px',
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => spyObserver.observe(section));
}

/**
 * Lazy loading com IntersectionObserver
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img.lazy');

  if (!lazyImages.length) return;

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          if (img.complete) {
            img.classList.add('loaded');
          } else {
            img.onload = () => img.classList.add('loaded');
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '180px 0px', // Carrega com antecedência para evitar flashes visuais
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    lazyImages.forEach(img => img.classList.add('loaded'));
  }
}
