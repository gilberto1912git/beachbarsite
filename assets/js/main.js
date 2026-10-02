/**
 * Bene Beach Bar - Script Principal de Interações
 * Menu móvel, Galeria com Lightbox, Filtros do Cardápio, FAQ Acordeão
 * Otimizado para transições calmas e fluidas
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initGalleryLightbox();
  initGalleryFilter();
  initMenuTabs();
  initFaqAccordion();
  initCurrentYear();
});

/**
 * Menu móvel (hambúrguer e gaveta lateral)
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');

  if (!toggleBtn || !navMobile) return;

  const toggleMenu = () => {
    const isOpen = navMobile.classList.contains('open');
    if (isOpen) {
      navMobile.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navMobile.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (navMobile.classList.contains('open') && 
        !navMobile.contains(e.target) && 
        !toggleBtn.contains(e.target)) {
      navMobile.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Galeria: Filtro por categorias com transição suave
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.beach-gallery-item, .gallery-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category?.includes(filterValue)) {
          item.style.display = 'block';
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.97)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

/**
 * Modal Lightbox para visualização das fotos da galeria
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.beach-gallery-item, .gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption')?.textContent || '';
      
      const fullSrc = img.getAttribute('data-full') || img.src;
      lightboxImg.src = fullSrc;
      lightboxImg.alt = caption;
      if (lightboxCaption) lightboxCaption.textContent = caption;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * Abas de Categorias do Cardápio
 */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.beach-tab-btn, .menu-tab-btn');
  const cards = document.querySelectorAll('.beach-food-card, .menu-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(6px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * FAQ Acordeão com acessibilidade
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-button');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Atualiza ano vigente no rodapé
 */
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
