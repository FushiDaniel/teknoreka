document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    });

    // Enhanced service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 15;
        const angleY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });

    // Add smooth transition on mouse leave
    card.addEventListener('mouseleave', function() {
        card.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            card.style.transition = '';
        }, 500);
    });
});

    // Custom cursor
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    init: function() {
        // Check if cursors exist
        if (!this.dot || !this.outline) return;

        // Set initial position off screen
        this.cursorPos = { x: -100, y: -100 };
        this.cursorVisible = false;

        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('mousemove', (e) => {
            // Update cursor position immediately
            this.cursorPos = { x: e.clientX, y: e.clientY };
            
            this.dot.style.transform = `translate(${this.cursorPos.x}px, ${this.cursorPos.y}px)`;
            
            // Slight delay for outline (optional)
            requestAnimationFrame(() => {
                this.outline.style.transform = `translate(${this.cursorPos.x}px, ${this.cursorPos.y}px)`;
            });

            // Show cursor if it's hidden
            if (!this.cursorVisible) {
                this.cursorVisible = true;
                this.dot.style.opacity = 1;
                this.outline.style.opacity = 1;
            }
        });

        // Hide cursor when it leaves the window
        document.addEventListener('mouseleave', () => {
            this.cursorVisible = false;
            this.dot.style.opacity = 0;
            this.outline.style.opacity = 0;
        });
    }
};

// Initialize cursor
cursor.init();

// Update hover effects for interactive elements
document.querySelectorAll('a, button, .service-card, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.outline.style.background = 'rgba(64, 94, 230, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.outline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.outline.style.background = 'transparent';
    });
});



// Service cards hover effect (more responsive)
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10; // Reduced from 15 to 10
        const angleY = (centerX - x) / 10; // Reduced from 15 to 10
        
        // Apply transform directly without transition
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) 
                              rotateX(${angleX}deg) 
                              rotateY(${angleY}deg) 
                              scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', function() {
        // Add transition only on mouse leave
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});
    // Navigation scroll effect
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo-img');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Navigation background
        if (currentScroll > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // Hide/show navigation on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile Menu Functionality
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        mobileLinks.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Prevent scroll when mobile menu is open
        document.body.addEventListener('touchmove', (e) => {
            if (document.body.classList.contains('menu-open')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Parallax effect
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth/2) * 0.01;
        const moveY = (e.clientY - window.innerHeight/2) * 0.01;

        document.querySelectorAll('.float-item').forEach(item => {
            const speed = item.getAttribute('data-speed') || 1;
            item.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });

    // Service cards hover effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });


    // Add this at the beginning of your script.js
window.onload = function() {
    // Force scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Remove any URL fragments that might cause jumping
    if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname);
    }
};

// If you're using smooth scroll, modify it like this:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Only scroll if it's an intentional click
        if(e.isTrusted) {
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

    
    // Form validation and animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form-group');

        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');

            input.addEventListener('focus', () => {
                group.classList.add('focus');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focus');
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            
            // Success animation example
            this.classList.add('success');
            setTimeout(() => {
                this.classList.remove('success');
                this.reset();
            }, 3000);
        });
    }

    

    // Sphere animation
    function createSphere() {
        const sphere = document.querySelector('.sphere-animation');
        const count = 8;
        const radius = 150;

        for (let i = 0; i < count; i++) {
            const ring = document.createElement('div');
            ring.className = 'sphere-ring';
            ring.style.transform = `rotateY(${(i / count) * 360}deg)`;
            
            for (let j = 0; j < count; j++) {
                const dot = document.createElement('div');
                dot.className = 'sphere-dot';
                dot.style.transform = `rotateX(${(j / count) * 360}deg) translateZ(${radius}px)`;
                ring.appendChild(dot);
            }
            
            sphere.appendChild(ring);
        }
    }

    createSphere();
});

// Add this to your existing CSS
const style = document.createElement('style');
style.textContent = `
    body.menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Touch interaction for service cards
const serviceCards = document.querySelectorAll('.service-card');
let touchTimeout;

serviceCards.forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.add('touch-focus');
        
        // Remove the class after 1.5 seconds
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
            card.classList.remove('touch-focus');
        }, 1500);
    });

    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.classList.remove('touch-focus');
        }, 100);
    });
});

// Remove focus class when scrolling
window.addEventListener('scroll', () => {
    serviceCards.forEach(card => {
        card.classList.remove('touch-focus');
    });
    clearTimeout(touchTimeout);
});