// SwallowWell — Dysphagia Therapy Website with CRAZY Animations

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.setAttribute(
        'aria-expanded',
        nav.classList.contains('open')
      );
    });
  }

  // Close nav when clicking a link (mobile)
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // === SCROLL REVEAL ANIMATIONS ===
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    animateOnScroll.observe(el);
  });

  document.querySelectorAll('.stagger-children').forEach((el) => {
    animateOnScroll.observe(el);
  });

  // === PARALLAX SCROLL EFFECT ===
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        // Parallax effect on hero elements
        const hero = document.querySelector('.hero');
        if (hero) {
          hero.style.transform = `translateY(${scrolled * 0.3}px)`;
          hero.style.opacity = 1 - scrolled / 600;
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // === 3D TILT EFFECT ON CARDS ===
  document.querySelectorAll('.card, .exercise-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // === CURSOR TRAIL EFFECT ===
  const createSparkle = (x, y) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, var(--color-saffron-light), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: sparkleFloat 1s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
  };

  // Add sparkle CSS animation
  if (!document.getElementById('sparkle-style')) {
    const style = document.createElement('style');
    style.id = 'sparkle-style';
    style.textContent = `
      @keyframes sparkleFloat {
        0% {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  let sparkleCounter = 0;
  document.addEventListener('mousemove', (e) => {
    sparkleCounter++;
    if (sparkleCounter % 5 === 0) { // Create sparkle every 5 mouse moves
      createSparkle(e.clientX, e.clientY);
    }
  });

  // === RIPPLE EFFECT ON BUTTONS ===
  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // === SMOOTH SCROLL WITH EASING ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // === CONTACT FORM WITH ANIMATION ===
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) {
        // Shake animation on error
        form.style.animation = 'shake 0.5s';
        setTimeout(() => form.style.animation = '', 500);
        alert('Please fill in your name and email.');
        return;
      }

      // Success animation
      const button = form.querySelector('.btn-primary');
      button.textContent = '✓ Sent!';
      button.style.background = '#2E7D32';
      button.style.animation = 'pulse 1s';
      
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
        button.textContent = 'Send Message';
        button.style.background = '';
        button.style.animation = '';
      }, 1500);
    });
  }

  // Add shake animation
  if (!document.getElementById('shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
    `;
    document.head.appendChild(style);
  }

  // === FLOATING ELEMENTS ===
  const createFloatingOrbs = () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    for (let i = 0; i < 5; i++) {
      const orb = document.createElement('div');
      orb.className = 'floating-orb';
      orb.style.cssText = `
        position: absolute;
        width: ${Math.random() * 100 + 50}px;
        height: ${Math.random() * 100 + 50}px;
        background: radial-gradient(circle, rgba(243, 156, 18, 0.1), transparent);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatSlow ${Math.random() * 10 + 8}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `;
      header.appendChild(orb);
    }
  };

  createFloatingOrbs();

  console.log('🎉 SwallowWell animations loaded!');
});
