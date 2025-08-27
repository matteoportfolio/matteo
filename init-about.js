// ===== ABOUT SECTION INITIALIZATION =====
// Initialize About Section animations and interactions

export function initAboutSection() {
    console.log('About Section initialized');
    
    // Initialize about section animations
    const aboutImages = document.querySelectorAll('.about-image');
    const aboutTexts = document.querySelectorAll('.about-text');
    
    // Add bu.png image to about-image elements
    aboutImages.forEach(image => {
        image.style.backgroundImage = 'url("/bu.png")';
        image.style.backgroundSize = 'cover';
        image.style.backgroundPosition = 'center';
        image.style.backgroundRepeat = 'no-repeat';
        image.style.width = '400px';
        image.style.height = '500px';
        image.style.borderRadius = '20px';
        image.style.margin = '0 auto';
        image.style.display = 'block';
        
        // Remove light effect by hiding ::before pseudo-element
        const style = document.createElement('style');
        style.textContent = '.about-image::before { display: none !important; }';
        if (!document.querySelector('style[data-about-image-fix]')) {
            style.setAttribute('data-about-image-fix', 'true');
            document.head.appendChild(style);
        }
    });
    
    // Add fade-in animation for about images
    aboutImages.forEach((image, index) => {
        image.style.opacity = '0';
        image.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            image.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            image.style.opacity = '1';
            image.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add fade-in animation for about texts
    aboutTexts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            text.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            text.style.opacity = '1';
            text.style.transform = 'translateX(0)';
        }, (index * 200) + 300);
    });
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe about section elements
    [...aboutImages, ...aboutTexts].forEach(element => {
        observer.observe(element);
    });
}