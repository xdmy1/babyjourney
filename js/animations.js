// Animation utilities for BabyJourney.Life

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParticleSystem();
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });

        this.observers.set('scroll', observer);
    }

    // Smooth scroll animations
    setupScrollAnimations() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Particle system for magical effects
    setupParticleSystem() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            // Random positioning
            const randomTop = Math.random() * 80 + 10; // 10-90%
            const randomLeft = Math.random() * 80 + 10; // 10-90%
            
            particle.style.top = `${randomTop}%`;
            particle.style.left = `${randomLeft}%`;
            
            // Staggered animation delay
            particle.style.animationDelay = `${index * 0.8}s`;
            
            // Random animation duration
            const duration = Math.random() * 2 + 2; // 2-4 seconds
            particle.style.animationDuration = `${duration}s`;
        });
    }

    // Floating animation for photos
    setupFloatingPhotos() {
        const floatingElements = document.querySelectorAll('.floating-photo');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 0.5;
            const duration = 6 + Math.random() * 2; // 6-8 seconds
            
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
        });
    }

    // Hover effects for interactive elements
    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll('.album-book, .floating-photo');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform += ' scale(1.05)';
                element.style.zIndex = '10';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = element.style.transform.replace(' scale(1.05)', '');
                element.style.zIndex = '';
            });
        });
    }

    // Button animations
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });
        });
    }

    // Parallax effect for hero section
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-photos');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// Utility functions for animations
const AnimationUtils = {
    // Easing functions
    easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: (t) => t * (2 - t),
    easeIn: (t) => t * t,
    
    // Animate numeric value
    animateValue(start, end, duration, callback) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = start + (end - start) * this.easeInOut(progress);
            callback(value);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    // Stagger animations
    staggerAnimation(elements, animation, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                animation(element);
            }, index * delay);
        });
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationController, AnimationUtils };
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});