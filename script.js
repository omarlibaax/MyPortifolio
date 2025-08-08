// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');

// Portfolio Navigation
let currentPortfolioSlide = 0;
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioDots = document.querySelectorAll('.nav-dots .dot');
const portfolioPrevBtn = document.querySelector('.portfolio-nav .prev');
const portfolioNextBtn = document.querySelector('.portfolio-nav .next');

// Reviews Navigation
let currentReviewSlide = 0;
const reviewCards = document.querySelectorAll('.review-card');
const reviewsPrevBtn = document.querySelector('.reviews-nav .prev');
const reviewsNextBtn = document.querySelector('.reviews-nav .next');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scrolling for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Portfolio Navigation Functions
function showPortfolioSlide(index) {
    // Hide all portfolio items
    portfolioItems.forEach(item => {
        item.style.display = 'none';
    });
    
    // Remove active class from all dots
    portfolioDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    if (portfolioItems[index]) {
        portfolioItems[index].style.display = 'block';
    }
    
    // Activate current dot
    if (portfolioDots[index]) {
        portfolioDots[index].classList.add('active');
    }
    
    currentPortfolioSlide = index;
}

// Portfolio navigation event listeners
if (portfolioPrevBtn) {
    portfolioPrevBtn.addEventListener('click', () => {
        currentPortfolioSlide = (currentPortfolioSlide - 1 + portfolioItems.length) % portfolioItems.length;
        showPortfolioSlide(currentPortfolioSlide);
    });
}

if (portfolioNextBtn) {
    portfolioNextBtn.addEventListener('click', () => {
        currentPortfolioSlide = (currentPortfolioSlide + 1) % portfolioItems.length;
        showPortfolioSlide(currentPortfolioSlide);
    });
}

// Portfolio dots navigation
portfolioDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showPortfolioSlide(index);
    });
});

// Reviews Navigation Functions
function showReviewSlide(index) {
    // Hide all review cards
    reviewCards.forEach(card => {
        card.classList.remove('active');
        card.style.display = 'none';
    });
    
    // Show current card
    if (reviewCards[index]) {
        reviewCards[index].classList.add('active');
        reviewCards[index].style.display = 'block';
    }
    
    currentReviewSlide = index;
}

// Reviews navigation event listeners
if (reviewsPrevBtn) {
    reviewsPrevBtn.addEventListener('click', () => {
        currentReviewSlide = (currentReviewSlide - 1 + reviewCards.length) % reviewCards.length;
        showReviewSlide(currentReviewSlide);
    });
}

if (reviewsNextBtn) {
    reviewsNextBtn.addEventListener('click', () => {
        currentReviewSlide = (currentReviewSlide + 1) % reviewCards.length;
        showReviewSlide(currentReviewSlide);
    });
}

// Auto-rotate reviews
setInterval(() => {
    if (reviewCards.length > 0) {
        currentReviewSlide = (currentReviewSlide + 1) % reviewCards.length;
        showReviewSlide(currentReviewSlide);
    }
}, 5000);

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const budget = formData.get('budget');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !phone || !budget || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#38B04A';
    } else if (type === 'error') {
        notification.style.background = '#dc3545';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for decorative dots
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const dotsLeft = document.querySelector('.dots-left');
    const dotsRight = document.querySelector('.dots-right');
    
    if (dotsLeft) {
        const rate = scrolled * -0.3;
        dotsLeft.style.transform = `translateY(${rate}px)`;
    }
    
    if (dotsRight) {
        const rate = scrolled * 0.3;
        dotsRight.style.transform = `translateY(${rate}px)`;
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.skill-card, .portfolio-item, .review-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Initialize portfolio navigation
    if (portfolioItems.length > 0) {
        showPortfolioSlide(0);
    }
    
    // Initialize reviews navigation
    if (reviewCards.length > 0) {
        showReviewSlide(0);
    }
    
    // Add hover effects to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to review cards
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Add smooth scrolling to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}); 