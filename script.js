/* Modern Portfolio Interactions */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Interactive Card Hover Glow Effect
    // Dynamically tracks the mouse cursor position on cards with cached bounds & requestAnimationFrame to prevent lag
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        let rect = null;
        
        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!rect) {
                rect = card.getBoundingClientRect();
            }
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            window.requestAnimationFrame(() => {
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            rect = null;
        });
    });

    // 3. Smooth Fade-in on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    // Apply fade-in to cards and sections for high-end cinematic entry
    const fadeElements = document.querySelectorAll('.card, .section-header, .glass-box');
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in-element');
        // Add dynamic staggering delays for list items
        if (el.classList.contains('card')) {
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        scrollObserver.observe(el);
    });
});
