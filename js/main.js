/**
 * ENERGY ANG - Main JavaScript
 * Modern Automotive Battery Website
 */

// ========================================
// DOM Elements
// ========================================

const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
const navLinks = document.querySelectorAll('.nav__link');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const animateElements = document.querySelectorAll('.animate-on-scroll');

// ========================================
// Header Scroll Effect
// ========================================

let lastScrollY = 0;

function handleScroll() {
  const currentScrollY = window.scrollY;
  
  // Add/remove scrolled class for header styling
  if (currentScrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll);

// ========================================
// Mobile Navigation Toggle
// ========================================

navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
  navToggle.classList.toggle('active');
  
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (navToggle.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    navToggle.classList.remove('active');
    
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// FAQ Accordion
// ========================================

faqItems.forEach(item => {
  const question = item.querySelector('.faq-item__question');
  
  question.addEventListener('click', () => {
    // Close all other FAQ items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
  });
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(element => {
  animationObserver.observe(element);
});

// ========================================
// Contact Form Handling
// ========================================

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a10 10 0 0110 10"/>
      </svg>
      Enviando...
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      ¡Mensaje Enviado!
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
    
    // Reset form after 3 seconds
    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
    
    // In production, you would send the form data here:
    // const formData = new FormData(contactForm);
    // await fetch('/api/contact', { method: 'POST', body: formData });
  });
}

// ========================================
// Parallax Effect for Hero Background
// ========================================

const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero__bg img');

if (heroSection && heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroRect = heroSection.getBoundingClientRect();
    
    if (heroRect.bottom > 0) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}

// ========================================
// Stats Counter Animation
// ========================================

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start).toLocaleString() + (element.dataset.suffix || '');
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
    }
  };
  
  updateCounter();
}

const statsSection = document.querySelector('.stats');
const statValues = document.querySelectorAll('.stat-item__value, .hero__stat-value');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statValues.forEach(stat => {
        const text = stat.textContent;
        const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9,]/g, '');
        
        if (!isNaN(numericValue)) {
          stat.dataset.suffix = suffix;
          stat.textContent = '0';
          animateCounter(stat, numericValue);
        }
      });
      statsAnimated = true;
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// ========================================
// Typing Effect for Hero Title (Optional)
// ========================================

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ========================================
// Image Lazy Loading Enhancement
// ========================================

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => {
  imageObserver.observe(img);
});

// ========================================
// Add loading animation styles
// ========================================

const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .spin {
    animation: spin 1s linear infinite;
  }
  
  img.loaded {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

// ========================================
// Console Welcome Message
// ========================================

console.log('%c🔋 ENERGY ANG', 'font-size: 24px; font-weight: bold; color: #0066CC;');
console.log('%cEspecialistas en Baterías Automotrices', 'font-size: 14px; color: #FF6B00;');
console.log('%c¿Necesitas ayuda? Contáctanos por WhatsApp', 'font-size: 12px; color: #666;');

// ========================================
// Initialize on DOM Ready
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initial scroll check
  handleScroll();
  updateActiveNavLink();
  
  // Add loaded class to body
  document.body.classList.add('loaded');
});
