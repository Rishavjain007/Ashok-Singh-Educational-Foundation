// Ashok Singh Educational Foundation - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active page highlighting in navigation
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ============================================
    // ANIMATED COUNTER FOR STATS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current > target) {
                            statNumber.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    observer.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation flags
            let isValid = true;
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Name validation
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Email validation
            if (email === '') {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (phone === '') {
                showError('phone', 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone', 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
            
            // Subject validation
            if (subject === '' || subject === null) {
                showError('subject', 'Please select a subject');
                isValid = false;
            }
            
            // Message validation
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccessMessage();
            }
        });
        
        // Helper function to show error messages
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const formGroup = field.closest('.form-group');
            
            formGroup.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.9rem';
            errorElement.style.marginTop = '5px';
            
            formGroup.appendChild(errorElement);
        }
        
        // Email validation helper
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Phone validation helper
        function isValidPhone(phone) {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(phone);
        }
        
        // Show success message
        function showSuccessMessage() {
            const formContainer = document.querySelector('.contact-form-container');
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="text-align: center; padding: 30px; background-color: #d4edda; border-radius: 8px; color: #155724; margin-top: 20px;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 15px; color: #28a745;"></i>
                    <h3 style="color: #155724;">Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you within 24-48 hours.</p>
                    <p>You can also reach us directly at +91 9749417834 or +91 9434383946.</p>
                </div>
            `;
            
            // Replace form with success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // ============================================
    // DONATION PAGE FUNCTIONALITY
    // ============================================
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            const originalText = this.innerHTML;
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success feedback
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.backgroundColor = '#10B981';
                
                // Revert after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.innerHTML = '<i class="fas fa-times"></i> Failed';
                this.style.backgroundColor = '#e74c3c';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            });
        });
    });
    
    // ============================================
    // GALLERY LIGHTBOX FUNCTIONALITY
    // ============================================
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
        lightbox.style.zIndex = '1000';
        lightbox.style.display = 'none';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.borderRadius = '8px';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.fontSize = '2rem';
        closeBtn.style.color = 'white';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Add click events to gallery images
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links (not page navigation)
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // STICKY HEADER ON SCROLL
    // ============================================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    });
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add specific animations based on element class
                if (entry.target.classList.contains('highlight-card') || 
                    entry.target.classList.contains('value-card') ||
                    entry.target.classList.contains('vm-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatableElements = document.querySelectorAll(
        '.highlight-card, .program-card, .value-card, .vm-card, .founder-card'
    );
    
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // ============================================
    // CURRENT YEAR IN FOOTER
    // ============================================
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.display = 'none';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '30px';
    backToTopButton.style.right = '30px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.backgroundColor = 'var(--primary-blue)';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    backToTopButton.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.justifyContent = 'center';
            backToTopButton.style.alignItems = 'center';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-green)';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-blue)';
        this.style.transform = 'scale(1)';
    });
});