/**
 * N Shanmukha Vardhan - Portfolio Interactive Scripts
 * HR Recruiter | HR Operations | Excel & Data Management | AI & Data Science
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('navMenu');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalTrigger = document.getElementById('resumeModalTrigger');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModalActionBtn = document.getElementById('closeModalActionBtn');
  
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const serviceRequiredSelect = document.getElementById('serviceRequired');
  const userMessage = document.getElementById('userMessage');
  const toastNotification = document.getElementById('toastNotification');
  const inquireButtons = document.querySelectorAll('.service-inquire-btn');

  /* =========================================================================
     1. Sticky Navbar on Scroll
     ========================================================================= */
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* =========================================================================
     2. Mobile Menu Navigation
     ========================================================================= */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =========================================================================
     3. Active Navigation Spy
     ========================================================================= */
  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  /* =========================================================================
     4. Service Inquire Buttons Pre-selection
     ========================================================================= */
  inquireButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const selectedService = button.getAttribute('data-service');
      if (selectedService && serviceRequiredSelect) {
        // Find matching option
        for (let i = 0; i < serviceRequiredSelect.options.length; i++) {
          if (serviceRequiredSelect.options[i].value === selectedService) {
            serviceRequiredSelect.selectedIndex = i;
            break;
          }
        }
        
        // Custom focus & prompt
        if (userMessage) {
          userMessage.placeholder = `Please describe your requirements for ${selectedService}...`;
          userMessage.focus();
        }

        showToast(`Selected "${selectedService}". Let me know what you need!`);
      }
    });
  });

  /* =========================================================================
     5. Resume Modal Functionality
     ========================================================================= */
  const openModal = () => {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (resumeModalTrigger) {
    resumeModalTrigger.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (closeModalActionBtn) {
    closeModalActionBtn.addEventListener('click', closeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* =========================================================================
     6. Toast Notification Helper
     ========================================================================= */
  function showToast(message, duration = 3800) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, duration);
  }

  /* =========================================================================
     7. Contact Form Validation & Handler
     ========================================================================= */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const serviceSelect = document.getElementById('serviceRequired');
      const messageTextarea = document.getElementById('userMessage');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const service = serviceSelect.value;
      const message = messageTextarea.value.trim();

      // Validation
      if (!name) {
        displayFeedback('Please enter your name.', 'error');
        nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        displayFeedback('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }

      if (!service) {
        displayFeedback('Please select the service required.', 'error');
        serviceSelect.focus();
        return;
      }

      if (!message || message.length < 10) {
        displayFeedback('Please provide a message with at least 10 characters describing your request.', 'error');
        messageTextarea.focus();
        return;
      }

      // Format direct mailto action
      const recipient = 'shanmukhavardhan118@gmail.com';
      const subject = encodeURIComponent(`[Website Inquiry: ${service}] From ${name}`);
      const body = encodeURIComponent(
        `Hello Shanmukha,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Service Required: ${service}\n\n` +
        `Message:\n${message}\n\n` +
        `---\nSent via Portfolio Website Form`
      );

      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      displayFeedback(
        `Thank you, ${name}! Your inquiry for "${service}" has been prepared. Opening your mail client now...`,
        'success'
      );

      showToast(`Preparing email to shanmukhavardhan118@gmail.com...`);

      // Open mailto link
      window.location.href = mailtoUrl;

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset();
      }, 2000);
    });
  }

  function displayFeedback(text, type) {
    if (!formFeedback) return;
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';

    if (type === 'error') {
      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 5000);
    }
  }
});
