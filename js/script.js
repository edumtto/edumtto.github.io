// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Remove transition delays after animation completes
            setTimeout(() => {
                const animatedItems = entry.target.querySelectorAll('.scroll-reveal-item');
                animatedItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                });
            }, 1000); // Wait for all animations to complete
            
            // Once the animation is triggered, we can stop observing
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Hide scroll indicator when user scrolls
let scrollIndicatorHidden = false;
const scrollIndicator = document.querySelector('.scroll-indicator');

function hideScrollIndicator() {
    if (!scrollIndicatorHidden && scrollIndicator) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        scrollIndicator.style.transition = 'all 0.5s ease';
        scrollIndicatorHidden = true;
    }
}

// Observe all elements with the scroll-reveal class
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', hideScrollIndicator);
    
    // Add click functionality to scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
