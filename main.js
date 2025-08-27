// ===== PORTFOLIO INTERACTIVE SCRIPT =====
// Premium animations and interactions for Matteo Longo's portfolio

import '../styles.css';
import { initHyperspeed } from './hyperspeed-init.js';
import { initReactHero } from './main.tsx';
import { initAboutSection } from './components/AboutSection/init-about.js';

// ===== GLOBAL VARIABLES =====
let currentNotebook = 0;
let isNotebookOpen = false;
let currentExperience = 0;
let scrollPosition = 0;


// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    // Inizializza React Hero dopo il caricamento del DOM
    setTimeout(() => {
        initReactHero();
    }, 100);
});

// ===== MAIN INITIALIZATION =====
function initializePortfolio() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initScrollEffects();
    initEducationCarousel();
    // Experience folders now use onclick handlers in HTML
    initProjectModals();
    initContactForm();
    initScrollAnimations();
    initParticleEffects();
    initSmoothScrolling();
    
    // Initialize Hyperspeed effect
    initHyperspeed('lights');
    
    // Initialize About Section React component
    initAboutSection();
    
    // Initialize ReactBits-inspired effects
    initGlareEffect();
    initMagneticButtons();
    initStaggeredAnimations();
    initSectionLineAnimations();
    initStatsAnimation();
    
    // Initialize Skills Scroll Navigation
    initSkillsScrollNavigation();
    
    // Make folder functions globally available
    window.openMainFolder = openMainFolder;
    window.openSubFolder = openSubFolder;
    window.backToFolders = backToFolders;
    initSilkBackground();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}



// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    // Typing animation for title
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// ===== EXPERIENCE FOLDERS FUNCTIONS =====
let foldersOpen = false;

function openMainFolder() {
    const mainFolder = document.querySelector('.main-file-folder');
    const subFolders = document.getElementById('subFolders');
    const subFolderElements = subFolders.querySelectorAll('.sub-folder');
    
    console.log('openMainFolder called, foldersOpen:', foldersOpen);
    console.log('subFolders element:', subFolders);
    
    if (!foldersOpen) {
        // Aprire le cartelle
        foldersOpen = true;
        
        // Mostra le sottocartelle
        subFolders.style.display = 'flex';
        subFolders.classList.add('active');
        
        // Anima le cartelle che escono dai lati
        setTimeout(() => {
            subFolderElements.forEach((folder, index) => {
                setTimeout(() => {
                    folder.classList.add('animate-in');
                    
                    // Posiziona le cartelle ai lati alla stessa altezza
                    if (index === 0) {
                        folder.style.transform = 'scale(0.9) translateX(-500px) translateY(0)';
                        folder.style.left = '50%';
                        folder.style.top = '50%';
                        folder.style.marginLeft = '-70px';
                        folder.style.marginTop = '-80px';
                    } else {
                        folder.style.transform = 'scale(0.9) translateX(420px) translateY(0)';
                        folder.style.left = '50%';
                        folder.style.top = '50%';
                        folder.style.marginLeft = '-70px';
                        folder.style.marginTop = '-80px';
                    }
                }, index * 200);
            });
        }, 100);
    } else {
        // Chiudere le cartelle
        foldersOpen = false;
        
        // Anima le cartelle che rientrano
        subFolderElements.forEach((folder, index) => {
            folder.style.transform = 'scale(0) translateY(0)';
            folder.classList.remove('animate-in');
        });
        
        setTimeout(() => {
            subFolders.classList.remove('active');
            subFolders.style.display = 'none';
        }, 600);
    }
}

function openSubFolder(type) {
    const subFolders = document.getElementById('subFolders');
    const freelancerContent = document.getElementById('freelancerContent');
    const internshipContent = document.getElementById('internshipContent');
    
    // Hide sub folders
    subFolders.style.transform = 'scale(0.9)';
    subFolders.style.opacity = '0';
    
    setTimeout(() => {
        subFolders.style.display = 'none';
        
        // Show appropriate content
        if (type === 'freelancer') {
            freelancerContent.style.display = 'block';
            animateContentIn(freelancerContent);
        } else if (type === 'internship') {
            internshipContent.style.display = 'block';
            animateContentIn(internshipContent);
        }
    }, 300);
}

function backToFolders() {
    const subFolders = document.getElementById('subFolders');
    const freelancerContent = document.getElementById('freelancerContent');
    const internshipContent = document.getElementById('internshipContent');
    
    // Hide content
    freelancerContent.style.display = 'none';
    internshipContent.style.display = 'none';
    
    // Show sub folders again
    subFolders.style.display = 'flex';
    subFolders.style.opacity = '0';
    subFolders.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        subFolders.style.opacity = '1';
        subFolders.style.transform = 'translateY(0)';
    }, 50);
}

function animateContentIn(content) {
    content.style.opacity = '0';
    content.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.6s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 100);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===== EDUCATION CAROUSEL =====
function initEducationCarousel() {
    const notebooks = document.querySelectorAll('.notebook');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (notebooks.length === 0) return;
    
    function showNotebook(index) {
        notebooks.forEach((notebook, i) => {
            notebook.classList.toggle('active', i === index);
        });
        currentNotebook = index;
    }
    
    // Add click handlers to notebooks
    notebooks.forEach((notebook, index) => {
        notebook.addEventListener('click', () => {
            if (notebook.classList.contains('active')) {
                openEducationDetails(index);
            } else {
                showNotebook(index);
            }
        });
    });
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentNotebook > 0 ? currentNotebook - 1 : notebooks.length - 1;
            showNotebook(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = currentNotebook < notebooks.length - 1 ? currentNotebook + 1 : 0;
            showNotebook(newIndex);
        });
    }
    
    // Auto-rotate carousel
    setInterval(() => {
        if (!isNotebookOpen) {
            const newIndex = currentNotebook < notebooks.length - 1 ? currentNotebook + 1 : 0;
            showNotebook(newIndex);
        }
    }, 5000);
}

// ===== EDUCATION DETAILS =====
function openEducationDetails(index) {
    if (isNotebookOpen) return;
    
    isNotebookOpen = true;
    const notebook = document.querySelectorAll('.notebook')[index];
    const content = notebook.querySelector('.notebook-content');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'education-details-overlay';
    overlay.innerHTML = `
        <div class="education-details-modal">
            <button class="close-details">&times;</button>
            <div class="details-content">
                ${content.innerHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add styles for overlay
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modal = overlay.querySelector('.education-details-modal');
    modal.style.cssText = `
        background: linear-gradient(
            to right,
            #f8f8f8 0%,
            #f8f8f8 60px,
            #e8e8e8 60px,
            #e8e8e8 65px,
            #f8f8f8 65px
        ),
        repeating-linear-gradient(
            transparent,
            transparent 24px,
            #d0d0d0 24px,
            #d0d0d0 26px
        );
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 3rem 2rem 2rem 4rem;
        max-width: 700px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        color: #333;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-family: 'Courier New', monospace;
        line-height: 1.8;
    `;
    
    const closeBtn = overlay.querySelector('.close-details');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: #ff4444;
        border: 2px solid #cc0000;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        font-size: 1.5rem;
        color: #fff;
        cursor: pointer;
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        font-weight: bold;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = '#ff6666';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = '#ff4444';
        closeBtn.style.transform = 'scale(1)';
    });
    
    // Show overlay with animation
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
    
    // Close handlers
    const closeDetails = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => {
            overlay.remove();
            isNotebookOpen = false;
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeDetails);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDetails();
        }
    });
    
    // Close on ESC key
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeDetails();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// ===== EXPERIENCE FOLDERS =====
function initExperienceFolders() {
    const folders = document.querySelectorAll('.experience-folder');
    
    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            const isActive = folder.classList.contains('active');
            
            // Close all folders
            folders.forEach(f => f.classList.remove('active'));
            
            // Open clicked folder if it wasn't active
            if (!isActive) {
                folder.classList.add('active');
            }
        });
    });
}

// ===== PROJECT MODALS =====
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.project-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// ===== GLOBAL PROJECT MODAL FUNCTIONS =====
function openProjectModal(projectId) {
    const modal = document.getElementById(projectId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'translateY(50px) scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                modalContent.style.transform = 'translateY(0) scale(1)';
                modalContent.style.opacity = '1';
            }, 10);
        }
    }
}

function closeProjectModal() {
    const activeModal = document.querySelector('.project-modal.active');
    if (activeModal) {
        const modalContent = activeModal.querySelector('.modal-content');
        
        if (modalContent) {
            modalContent.style.transform = 'translateY(50px) scale(0.9)';
            modalContent.style.opacity = '0';
        }
        
        setTimeout(() => {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Make functions globally available
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Messaggio Inviato!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        }, 2000);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add specific animation classes based on element type
                if (entry.target.classList.contains('section-header')) {
                    entry.target.classList.add('fade-up');
                } else if (entry.target.classList.contains('about-image')) {
                    entry.target.classList.add('fade-left');
                } else if (entry.target.classList.contains('about-text')) {
                    entry.target.classList.add('fade-right');
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('scale-in');
                } else if (entry.target.classList.contains('skill-category')) {
                    entry.target.classList.add('fade-up');
                } else if (entry.target.classList.contains('contact-info')) {
                    entry.target.classList.add('fade-left');
                } else if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.add('fade-right');
                } else {
                    entry.target.classList.add('fade-up');
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((element) => {
        observer.observe(element);
    });
}

// ===== PARTICLE EFFECTS =====
function initParticleEffects() {
    // Add floating particles to sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        if (section.id !== 'home') {
            createFloatingParticles(section);
        }
    });
}

function createFloatingParticles(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
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
}

// ===== REACTBITS-INSPIRED EFFECTS =====

// Glare Effect
function initGlareEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .education-notebook');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .hero-cta, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Staggered Animations
function initStaggeredAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    [skillItems, projectCards].forEach(items => {
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Section Line Animations
function initSectionLineAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const line = document.createElement('div');
        line.className = 'section-line';
        section.appendChild(line);
    });
}

// Stats Animation
function initStatsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                
                statItems.forEach((item, index) => {
                    const progressBar = item.querySelector('.stat-progress-bar');
                    const numberElement = item.querySelector('.stat-number');
                    const target = numberElement.getAttribute('data-target');
                    
                    setTimeout(() => {
                        // Animate progress bar from bottom to top
                        progressBar.classList.add('filled');
                        
                        // Animate numbers
                        if (target === '∞') {
                            // Special animation for infinity - synchronized with other numbers
                            let current = 0;
                            const maxValue = 999;
                            const increment = maxValue / 50;
                            
                            const infinityInterval = setInterval(() => {
                                current += increment;
                                if (current >= maxValue) {
                                    clearInterval(infinityInterval);
                                    numberElement.textContent = '∞';
                                } else {
                                    numberElement.textContent = Math.floor(current + Math.random() * 50);
                                }
                            }, 60);
                        } else {
                            // Animate to target number
                            const targetNum = parseInt(target);
                            let current = 0;
                            const increment = targetNum / 50;
                            
                            const numberInterval = setInterval(() => {
                                current += increment + Math.random() * 5;
                                if (current >= targetNum) {
                                    current = targetNum;
                                    clearInterval(numberInterval);
                                }
                                numberElement.textContent = Math.floor(current);
                            }, 60);
                        }
                    }, 0);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        observer.observe(statsGrid);
    }
}

// ===== SILK BACKGROUND EFFECT =====
// Silk component with Three.js shaders
const hexToNormalizedRGB = (hex) => {
    hex = hex.replace("#", "");
    return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
    ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
    float G = e;
    vec2  r = (G * sin(G * texCoord));
    return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    mat2  rot = mat2(c, -s, s, c);
    return rot * uv;
}

void main() {
    float rnd        = noise(gl_FragCoord.xy);
    vec2  uv         = rotateUvs(vUv * uScale, uRotation);
    vec2  tex        = uv * uScale;
    float tOffset    = uSpeed * uTime;

    tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

    float pattern = 0.6 +
                    0.4 * sin(5.0 * (tex.x + tex.y +
                                     cos(3.0 * tex.x + 5.0 * tex.y) +
                                     0.02 * tOffset) +
                             sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

    vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
    col.a = 1.0;
    gl_FragColor = col;
}
`;

function initSilkBackground() {
    console.log('Initializing Silk background...');
    const silkContainer = document.getElementById('projects-silk');
    console.log('Silk container found:', silkContainer);
    
    if (silkContainer) {
        // Create Three.js silk effect
        silkContainer.innerHTML = '<div id="silk-canvas"></div>';
        
        // Add styles for the canvas container
        const style = document.createElement('style');
        style.textContent = `
            #silk-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
            }
            
            #silk-canvas canvas {
                width: 100% !important;
                height: 100% !important;
            }
        `;
        document.head.appendChild(style);
        
        // Initialize Three.js scene
        try {
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            const canvasContainer = document.getElementById('silk-canvas');
            renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
            canvasContainer.appendChild(renderer.domElement);
            
            // Create shader material
            const uniforms = {
                uTime: { value: 0 },
                uSpeed: { value: 1.8 },
                uScale: { value: 2 },
                uColor: { value: new THREE.Color(...hexToNormalizedRGB('#1A1A1A')) },
                uRotation: { value: 0.1 },
                uNoiseIntensity: { value: 1.2 }
            };
            
            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true
            });
            
            const geometry = new THREE.PlaneGeometry(2, 2);
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                uniforms.uTime.value += 0.008;
                renderer.render(scene, camera);
            }
            animate();
            
            // Handle resize
            const handleResize = () => {
                const container = document.getElementById('silk-canvas');
                if (container) {
                    renderer.setSize(container.offsetWidth, container.offsetHeight);
                }
            };
            window.addEventListener('resize', handleResize);
            
            console.log('Three.js Silk background applied successfully');
        } catch (error) {
            console.error('Error creating Three.js silk effect:', error);
            // Fallback to simple background
            silkContainer.style.background = 'linear-gradient(45deg, rgba(123, 116, 129, 0.1), rgba(123, 116, 129, 0.2))';
        }
    } else {
        console.warn('Silk container not found');
    }
}

// ===== SKILLS SCROLL NAVIGATION =====
function initSkillsScrollNavigation() {
    const skillsContainer = document.querySelector('.skills-scroll-container');
    const skillsTrack = document.querySelector('.skills-track');
    const skillSlides = document.querySelectorAll('.skill-category-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!skillsContainer || !skillsTrack || skillSlides.length === 0) {
        console.warn('Skills scroll elements not found');
        return;
    }
    
    let currentSlide = 0;
    let isScrolling = false;
    
    // Imposta la slide iniziale come attiva
    updateActiveSlide();
    
    // Gestione scroll del mouse
    skillsContainer.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        e.preventDefault();
        e.stopPropagation();
        isScrolling = true;
        
        if (e.deltaY > 0) {
            // Scroll verso il basso - prossima slide
            currentSlide = (currentSlide + 1) % skillSlides.length;
        } else {
            // Scroll verso l'alto - slide precedente
            currentSlide = (currentSlide - 1 + skillSlides.length) % skillSlides.length;
        }
        
        updateActiveSlide();
        
        // Previeni scroll multipli rapidi
        setTimeout(() => {
            isScrolling = false;
        }, 300);
    });
    
    // Gestione click sugli indicatori
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isScrolling) return;
            
            currentSlide = index;
            updateActiveSlide();
        });
    });
    
    // Funzione per aggiornare la slide attiva
    function updateActiveSlide() {
        // Aggiorna la posizione del track
        const translateY = -currentSlide * 100;
        skillsTrack.style.transform = `translateY(${translateY}%)`;
        
        // Aggiorna le classi active delle slide
        skillSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Aggiorna gli indicatori
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Gestione touch per dispositivi mobili
    let startY = 0;
    let endY = 0;
    
    skillsContainer.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    
    skillsContainer.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        endY = e.changedTouches[0].clientY;
        const deltaY = startY - endY;
        
        if (Math.abs(deltaY) > 50) { // Soglia minima per il swipe
            isScrolling = true;
            
            if (deltaY > 0) {
                // Swipe verso l'alto - prossima slide
                currentSlide = (currentSlide + 1) % skillSlides.length;
            } else {
                // Swipe verso il basso - slide precedente
                currentSlide = (currentSlide - 1 + skillSlides.length) % skillSlides.length;
            }
            
            updateActiveSlide();
            
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    });
    
    // Auto-scroll opzionale (commentato per ora)
    /*
    setInterval(() => {
        if (!isScrolling && !skillsContainer.matches(':hover')) {
            currentSlide = (currentSlide + 1) % skillSlides.length;
            updateActiveSlide();
        }
    }, 5000);
    */
}