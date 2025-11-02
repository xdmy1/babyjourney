// Main JavaScript functionality for BabyJourney.Life

class BabyJourneyApp {
    constructor() {
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupNavigationScroll();
        this.setupFormHandlers();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.mobileMenuOpen && 
                    !mobileMenu.contains(e.target) && 
                    !mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close mobile menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.mobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('show');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        this.mobileMenuOpen = true;

        // Animate hamburger to X
        const svg = mobileMenuBtn.querySelector('svg');
        svg.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        `;
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        this.mobileMenuOpen = false;

        // Animate X back to hamburger
        const svg = mobileMenuBtn.querySelector('svg');
        svg.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        `;
    }

    // Navigation scroll effects
    setupNavigationScroll() {
        const nav = document.querySelector('nav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove backdrop blur based on scroll position
            if (currentScrollY > 50) {
                nav.classList.add('backdrop-blur-md', 'bg-dark-bg/95');
                nav.classList.remove('bg-dark-bg/90');
            } else {
                nav.classList.remove('backdrop-blur-md', 'bg-dark-bg/95');
                nav.classList.add('bg-dark-bg/90');
            }

            // Hide/show navigation on scroll (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // Form handlers for buttons and interactions
    setupFormHandlers() {
        // Get Started buttons
        const getStartedBtns = document.querySelectorAll('button:contains("GET STARTED")');
        getStartedBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleGetStarted();
            });
        });

        // Build Their Story button
        const buildStoryBtn = document.querySelector('button:contains("BUILD THEIR STORY")');
        if (buildStoryBtn) {
            buildStoryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleBuildStory();
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });
    }

    // Handle Get Started button clicks
    handleGetStarted() {
        // Animate click feedback
        this.showNotification('Welcome to BabyJourney.Life! Sign up feature coming soon.', 'info');
        
        // Track analytics (placeholder)
        this.trackEvent('get_started_clicked');
    }

    // Handle Build Their Story button clicks
    handleBuildStory() {
        // Animate click feedback
        this.showNotification('Ready to build their story? Sign up feature coming soon.', 'info');
        
        // Track analytics (placeholder)
        this.trackEvent('build_story_clicked');
    }

    // Smooth scroll to section
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        }
    }

    // Show notification messages
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `
            fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full
            transition-transform duration-300 ease-out max-w-sm
            ${type === 'info' ? 'bg-accent text-dark-bg' : 'bg-red-500 text-white'}
        `;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy load images when they come into view
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Preload critical resources
        this.preloadCriticalResources();
    }

    // Preload critical resources
    preloadCriticalResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    // Accessibility enhancements
    setupAccessibility() {
        // Skip to content link
        this.addSkipToContentLink();

        // Focus management
        this.setupFocusManagement();

        // Keyboard navigation
        this.setupKeyboardNavigation();

        // Screen reader announcements
        this.setupScreenReaderAnnouncements();
    }

    addSkipToContentLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-dark-bg focus:rounded';
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Trap focus in mobile menu when open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && this.mobileMenuOpen) {
                    const focusableElements = mobileMenu.querySelectorAll(
                        'a[href], button, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }

    setupKeyboardNavigation() {
        // Allow Enter key to activate buttons
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
                e.target.click();
            }
        });
    }

    setupScreenReaderAnnouncements() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    // Analytics tracking (placeholder)
    trackEvent(eventName, properties = {}) {
        // In a real app, this would send to your analytics service
        console.log('Event tracked:', eventName, properties);
    }

    // Cleanup method
    destroy() {
        // Remove event listeners and clean up
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.handleClick);
    }
}

// Utility functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Check if device is mobile
    isMobile() {
        return window.innerWidth <= 768;
    },

    // Check if user prefers reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.babyJourneyApp = new BabyJourneyApp();
    
    // Add main content id for skip link
    const heroSection = document.querySelector('section');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
});

// Handle page load performance
window.addEventListener('load', () => {
    // Mark as loaded for CSS animations
    document.body.classList.add('loaded');
    
    // Track page load time
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime, 'ms');
    }
});

// Handle connection issues
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
});