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

// Portfolio Modal Functionality
const modal = document.getElementById('portfolioModal');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const closeBtn = document.querySelector('.close');

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

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const prevBtn = document.querySelector('.testimonial-nav .prev');
const nextBtn = document.querySelector('.testimonial-nav .next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Event listeners for testimonial navigation
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
}

// Dot navigation for testimonials
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance testimonials
setInterval(nextTestimonial, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Animate elements on scroll
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

// Observe elements for animation
document.querySelectorAll('.skill-card, .portfolio-item, .testimonial-card, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress bar animation when skills section is visible
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#28a745';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .testimonial-card {
        display: none;
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .testimonial-card.active {
        display: block;
        opacity: 1;
        transform: translateX(0);
    }
    
    .portfolio-item {
        animation: fadeIn 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// Initialize first testimonial as active
if (testimonialCards.length > 0) {
    showTestimonial(0);
}

// Add hover effects for portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Add click effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle); 

// Portfolio Modal Functionality
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const portfolioItem = trigger.closest('.portfolio-item');
        openModal(portfolioItem);
    });
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
    closeModal();
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

function openModal(portfolioItem) {
    // Get project data from data attributes
    const title = portfolioItem.getAttribute('data-title');
    const description = portfolioItem.getAttribute('data-description');
    const image = portfolioItem.getAttribute('data-image');
    const technologies = portfolioItem.getAttribute('data-technologies');
    const features = portfolioItem.getAttribute('data-features');
    const github = portfolioItem.getAttribute('data-github');
    const behance = portfolioItem.getAttribute('data-behance');
    const live = portfolioItem.getAttribute('data-live');

    // Populate modal content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalImage').alt = title;

    // Populate technologies
    const techContainer = document.getElementById('modalTechnologies');
    techContainer.innerHTML = '';
    if (technologies) {
        technologies.split(',').forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech.trim();
            techContainer.appendChild(tag);
        });
    }

    // Populate features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    if (features) {
        features.split(',').forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature.trim();
            featuresContainer.appendChild(li);
        });
    }

    // Populate project links
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = '';
    
    if (github) {
        const githubBtn = document.createElement('a');
        githubBtn.href = github;
        githubBtn.target = '_blank';
        githubBtn.className = 'btn btn-primary';
        githubBtn.innerHTML = '<i class="fab fa-github"></i> View Code';
        linksContainer.appendChild(githubBtn);
    }
    
    if (behance) {
        const behanceBtn = document.createElement('a');
        behanceBtn.href = behance;
        behanceBtn.target = '_blank';
        behanceBtn.className = 'btn btn-outline';
        behanceBtn.innerHTML = '<i class="fab fa-behance"></i> View on Behance';
        linksContainer.appendChild(behanceBtn);
    }
    
    if (live) {
        const liveBtn = document.createElement('a');
        liveBtn.href = live;
        liveBtn.target = '_blank';
        liveBtn.className = 'btn btn-primary';
        liveBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
        linksContainer.appendChild(liveBtn);
    }

    // Show modal with animation
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
} 