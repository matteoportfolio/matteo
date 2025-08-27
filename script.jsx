// ===== PORTFOLIO INTERACTIVE SCRIPT =====
// Premium animations and interactions for Matteo Longo's portfolio

// ===== GLOBAL VARIABLES =====
let currentNotebook = 0;
let isNotebookOpen = false;
let currentExperience = 0;
let scrollPosition = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
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
    initAOS();
    initParticleEffects(); // Keep for blob cursor
    initSmoothScrolling();
    initSilkBackground();

    
    // Initialize ReactBits-inspired effects
    initGlareEffect();
    initMagneticButtons();
    initStaggeredAnimations();
    initSectionLineAnimations();
    initStatsAnimation();
    
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
            animateHamburger(navToggle);
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            resetHamburger(navToggle);
        });
    });
    
    // Active section highlighting
    window.addEventListener('scroll', updateActiveSection);
}

function animateHamburger(toggle) {
    const spans = toggle.querySelectorAll('span');
    toggle.classList.toggle('active');
    
    if (toggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        resetHamburger(toggle);
    }
}

function resetHamburger(toggle) {
    const spans = toggle.querySelectorAll('span');
    toggle.classList.remove('active');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // Initialize liquid chrome background
    
    
    // Typewriter effect for title
    if (heroTitle) {
        animateTypewriter(heroTitle);
    }
    
    // Staggered animations for hero elements
    const heroElements = [heroSubtitle, heroDescription, heroButtons];
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 1000 + (index * 200));
        }
    });
    
    // Floating animation for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setInterval(() => {
            scrollIndicator.style.transform = 'translateX(-50%) translateY(' + (Math.sin(Date.now() * 0.002) * 5) + 'px)';
        }, 16);
    }
}

function animateTypewriter(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #d4af37';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }, 100);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        scrollPosition = window.pageYOffset;
        
        // Parallax effects
        applyParallaxEffects();
        
        // Reveal animations
        revealOnScroll();
        
        // Update progress bar
        updateScrollProgress();
    });
}

function applyParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrollPosition * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrolled + '%';
    }
}

// ===== EDUCATION CAROUSEL (NOTEBOOKS) =====
function initEducationCarousel() {
    const notebooks = document.querySelectorAll('.notebook');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (notebooks.length === 0) return;
    
    // Set initial active notebook
    notebooks[currentNotebook].classList.add('active');
    
    // Notebook click handlers
    notebooks.forEach((notebook, index) => {
        notebook.addEventListener('click', () => {
            if (notebook.classList.contains('active') && !isNotebookOpen) {
                openNotebook(notebook, index);
            } else if (!notebook.classList.contains('active')) {
                switchNotebook(index);
            } else {
                closeNotebook(notebook);
            }
        });
    });
    
    // Carousel navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentNotebook = (currentNotebook - 1 + notebooks.length) % notebooks.length;
            switchNotebook(currentNotebook);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentNotebook = (currentNotebook + 1) % notebooks.length;
            switchNotebook(currentNotebook);
        });
    }
    
    // Auto-rotate carousel
    setInterval(() => {
        if (!isNotebookOpen) {
            currentNotebook = (currentNotebook + 1) % notebooks.length;
            switchNotebook(currentNotebook);
        }
    }, 5000);
}

function switchNotebook(index) {
    const notebooks = document.querySelectorAll('.notebook');
    
    notebooks.forEach((notebook, i) => {
        notebook.classList.remove('active');
        if (i === index) {
            notebook.classList.add('active');
        }
    });
    
    currentNotebook = index;
}

function openNotebook(notebook, index) {
    if (isNotebookOpen) return;
    
    isNotebookOpen = true;
    notebook.classList.add('open');
    
    // Add opening animation
    notebook.style.transform = 'scale(1.1) rotateY(180deg)';
    notebook.style.zIndex = '10';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'notebook-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 5;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Close on overlay click
    overlay.addEventListener('click', () => {
        closeNotebook(notebook);
    });
    
    // Add page flip sound effect (visual feedback)
    addPageFlipEffect(notebook);
}

function closeNotebook(notebook) {
    if (!isNotebookOpen) return;
    
    isNotebookOpen = false;
    notebook.classList.remove('open');
    
    // Reset transform
    notebook.style.transform = 'scale(1) rotateY(0deg)';
    notebook.style.zIndex = '2';
    
    // Remove overlay
    const overlay = document.querySelector('.notebook-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

function addPageFlipEffect(notebook) {
    const flipEffect = document.createElement('div');
    flipEffect.className = 'page-flip-effect';
    flipEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%);
        pointer-events: none;
        animation: pageFlip 0.6s ease-out;
    `;
    
    notebook.appendChild(flipEffect);
    
    setTimeout(() => {
        flipEffect.remove();
    }, 600);
}

// ===== EXPERIENCE FOLDERS =====
function openMainFolder() {
    const mainFolder = document.querySelector('.main-file-folder');
    const subFolders = document.getElementById('subFolders');
    
    // Hide main folder and show sub folders
    mainFolder.style.transform = 'scale(0.8)';
    mainFolder.style.opacity = '0.5';
    
    setTimeout(() => {
        subFolders.style.display = 'flex';
        subFolders.style.opacity = '0';
        subFolders.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            subFolders.style.transition = 'all 0.5s ease';
            subFolders.style.opacity = '1';
            subFolders.style.transform = 'translateY(0)';
        }, 50);
    }, 300);
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

function addFolderOpenEffect(folder) {
    const openEffect = document.createElement('div');
    openEffect.className = 'folder-open-effect';
    openEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%);
        pointer-events: none;
        animation: folderGlow 0.8s ease-out;
        border-radius: inherit;
    `;
    
    folder.appendChild(openEffect);
    
    setTimeout(() => {
        openEffect.remove();
    }, 800);
}

function addPaperRustleEffect(folder) {
    const rustleEffect = document.createElement('div');
    rustleEffect.className = 'paper-rustle';
    rustleEffect.innerHTML = '📄';
    rustleEffect.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 1.5rem;
        animation: paperFloat 1s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    folder.appendChild(rustleEffect);
    
    setTimeout(() => {
        rustleEffect.remove();
    }, 1000);
}

// ===== PROJECT MODALS =====
function initProjectModals() {
    const projectBtns = document.querySelectorAll('.project-btn');
    const modals = document.querySelectorAll('.project-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    
    projectBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openProjectModal(index);
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeProjectModal);
    });
    
    // Close modal on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function openProjectModal(index) {
    const modal = document.querySelectorAll('.project-modal')[index];
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(50px) scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            modalContent.style.transform = 'translateY(0) scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
    }
}

function closeProjectModal() {
    const activeModal = document.querySelector('.project-modal.active');
    if (activeModal) {
        const modalContent = activeModal.querySelector('.modal-content');
        
        modalContent.style.transform = 'translateY(50px) scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Add typing animation
        input.addEventListener('input', () => {
            addTypingEffect(input);
        });
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

function addTypingEffect(input) {
    input.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
    
    clearTimeout(input.typingTimeout);
    input.typingTimeout = setTimeout(() => {
        input.style.boxShadow = 'none';
    }, 500);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Animate button
    submitBtn.textContent = 'Invio in corso...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Messaggio Inviato!';
        submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            e.target.reset();
        }, 2000);
    }, 1500);
}

// ===== AOS INITIALIZATION =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 50,
            delay: 0,
            anchorPlacement: 'top-bottom',
            disable: function() {
                return window.innerWidth < 768;
            }
        });
    }
}

// ===== REACTBITS-INSPIRED EFFECTS =====
// Glare hover effect for project cards
function initGlareEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });
}

// Magnetic button effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', (e) => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            button.style.transform = `translateY(-2px) scale(1.02) translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Staggered animations for skill items
function initStaggeredAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        observer.observe(category);
    });
}

// Animate section underlines
function initSectionLineAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionLine = entry.target.querySelector('.section-line');
                if (sectionLine) {
                    setTimeout(() => {
                        sectionLine.classList.add('animate');
                    }, 300);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
}

// Animate statistics with progress bars and random numbers
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
                            // Special animation for infinity
                            let counter = 0;
                            const infinityInterval = setInterval(() => {
                                numberElement.textContent = Math.floor(Math.random() * 1000);
                                counter++;
                                if (counter >= 40) {
                                    clearInterval(infinityInterval);
                                    numberElement.textContent = '∞';
                                }
                            }, 50);
                        } else {
                            // Animate to target number
                            const targetNum = parseInt(target);
                            let current = 0;
                            const increment = targetNum / 40;
                            
                            const numberInterval = setInterval(() => {
                                current += increment + Math.random() * 10;
                                if (current >= targetNum) {
                                    current = targetNum;
                                    clearInterval(numberInterval);
                                }
                                numberElement.textContent = Math.floor(current);
                            }, 50);
                        }
                    }, index * 200);
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

// ===== PARTICLE EFFECTS REMOVED =====
// Particle effects have been removed as they are no longer needed

function initParticleEffects() {
    // createFloatingParticles(); // Removed
    initBlobCursor();
}

function initBlobCursor() {
    // Ribbons cursor implementation
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);

    // WebGL setup
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `;
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Shader sources
    const vertexShaderSource = `
        precision highp float;
        
        attribute vec3 position;
        attribute vec3 next;
        attribute vec3 prev;
        attribute vec2 uv;
        attribute float side;
        
        uniform vec2 uResolution;
        uniform float uDPR;
        uniform float uThickness;
        uniform float uTime;
        uniform float uEnableShaderEffect;
        uniform float uEffectAmplitude;
        
        varying vec2 vUV;
        
        vec4 getPosition() {
            vec4 current = vec4(position, 1.0);
            vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
            vec2 nextScreen = next.xy * aspect;
            vec2 prevScreen = prev.xy * aspect;
            vec2 tangent = normalize(nextScreen - prevScreen);
            vec2 normal = vec2(-tangent.y, tangent.x);
            normal /= aspect;
            normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
            float dist = length(nextScreen - prevScreen);
            normal *= smoothstep(0.0, 0.02, dist);
            float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
            float pixelWidth = current.w * pixelWidthRatio;
            normal *= pixelWidth * uThickness;
            current.xy -= normal * side;
            if(uEnableShaderEffect > 0.5) {
                current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
            }
            return current;
        }
        
        void main() {
            vUV = uv;
            gl_Position = getPosition();
        }
    `;

    const fragmentShaderSource = `
        precision highp float;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uEnableFade;
        varying vec2 vUV;
        void main() {
            float fadeFactor = 1.0;
            if(uEnableFade > 0.5) {
                fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
            }
            gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
        }
    `;

    // Shader compilation
    function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Get uniform and attribute locations
    const uniforms = {
        uResolution: gl.getUniformLocation(program, 'uResolution'),
        uDPR: gl.getUniformLocation(program, 'uDPR'),
        uThickness: gl.getUniformLocation(program, 'uThickness'),
        uTime: gl.getUniformLocation(program, 'uTime'),
        uEnableShaderEffect: gl.getUniformLocation(program, 'uEnableShaderEffect'),
        uEffectAmplitude: gl.getUniformLocation(program, 'uEffectAmplitude'),
        uColor: gl.getUniformLocation(program, 'uColor'),
        uOpacity: gl.getUniformLocation(program, 'uOpacity'),
        uEnableFade: gl.getUniformLocation(program, 'uEnableFade')
    };

    const attributes = {
        position: gl.getAttribLocation(program, 'position'),
        next: gl.getAttribLocation(program, 'next'),
        prev: gl.getAttribLocation(program, 'prev'),
        uv: gl.getAttribLocation(program, 'uv'),
        side: gl.getAttribLocation(program, 'side')
    };

    // Line setup
    const pointCount = 50;
    const baseThickness = 8; // Reduced size
    const colors = ['#d4af37']; // Gold color
    const lines = [];

    colors.forEach((color, index) => {
        const spring = 0.03 + (Math.random() - 0.5) * 0.05;
        const friction = 0.9 + (Math.random() - 0.5) * 0.05;
        const thickness = baseThickness + (Math.random() - 0.5) * 3;
        const center = (colors.length - 1) / 2;
        const mouseOffset = {
            x: (index - center) * 0.05 + (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.1,
            z: 0
        };

        const points = [];
        for (let i = 0; i < pointCount; i++) {
            points.push({ x: 0, y: 0, z: 0 });
        }

        const line = {
            spring,
            friction,
            mouseVelocity: { x: 0, y: 0, z: 0 },
            mouseOffset,
            points,
            thickness,
            color: hexToRgb(color)
        };

        lines.push(line);
    });

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : { r: 1, g: 1, b: 1 };
    }

    // Mouse tracking
    const mouse = { x: 0, y: 0, z: 0 };
    function updateMouse(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = container.clientWidth;
        const height = container.clientHeight;
        mouse.x = (x / width) * 2 - 1;
        mouse.y = (y / height) * -2 + 1;
        mouse.z = 0;
    }

    document.addEventListener('mousemove', updateMouse);

    // Resize handler
    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width * (window.devicePixelRatio || 1);
        canvas.height = height * (window.devicePixelRatio || 1);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uDPR, window.devicePixelRatio || 1);
    }

    window.addEventListener('resize', resize);
    resize();

    // Set uniforms
    gl.uniform1f(uniforms.uThickness, baseThickness);
    gl.uniform1f(uniforms.uEnableShaderEffect, 1.0);
    gl.uniform1f(uniforms.uEffectAmplitude, 2.0);
    gl.uniform1f(uniforms.uOpacity, 1.0);
    gl.uniform1f(uniforms.uEnableFade, 0.0);

    // Animation loop
    let lastTime = performance.now();
    function animate() {
        const currentTime = performance.now();
        const dt = currentTime - lastTime;
        lastTime = currentTime;

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uniforms.uTime, currentTime * 0.001);

        lines.forEach(line => {
            // Update physics
            const tmp = {
                x: mouse.x + line.mouseOffset.x - line.points[0].x,
                y: mouse.y + line.mouseOffset.y - line.points[0].y,
                z: mouse.z + line.mouseOffset.z - line.points[0].z
            };
            
            tmp.x *= line.spring;
            tmp.y *= line.spring;
            tmp.z *= line.spring;
            
            line.mouseVelocity.x = (line.mouseVelocity.x + tmp.x) * line.friction;
            line.mouseVelocity.y = (line.mouseVelocity.y + tmp.y) * line.friction;
            line.mouseVelocity.z = (line.mouseVelocity.z + tmp.z) * line.friction;
            
            line.points[0].x += line.mouseVelocity.x;
            line.points[0].y += line.mouseVelocity.y;
            line.points[0].z += line.mouseVelocity.z;

            for (let i = 1; i < line.points.length; i++) {
                const alpha = 0.9;
                line.points[i].x += (line.points[i - 1].x - line.points[i].x) * alpha;
                line.points[i].y += (line.points[i - 1].y - line.points[i].y) * alpha;
                line.points[i].z += (line.points[i - 1].z - line.points[i].z) * alpha;
            }

            // Set color uniform
            gl.uniform3f(uniforms.uColor, line.color.r, line.color.g, line.color.b);

            // Create simple line geometry (simplified version)
            const positions = [];
            for (let i = 0; i < line.points.length - 1; i++) {
                const p1 = line.points[i];
                const p2 = line.points[i + 1];
                
                positions.push(p1.x, p1.y, p1.z);
                positions.push(p2.x, p2.y, p2.z);
            }

            if (positions.length > 0) {
                const positionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
                
                gl.enableVertexAttribArray(attributes.position);
                gl.vertexAttribPointer(attributes.position, 3, gl.FLOAT, false, 0, 0);
                
                gl.drawArrays(gl.LINES, 0, positions.length / 3);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
// Performance optimized debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Intersection Observer for performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all sections for performance
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

function throttle(func, limit) {
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
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16));

// Optimize resize events
window.addEventListener('resize', debounce(() => {
    // Resize-based recalculations here
}, 250));

// ===== CSS ANIMATIONS (Added via JavaScript) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes pageFlip {
        0% { transform: translateX(-100%) rotateY(-90deg); }
        100% { transform: translateX(0) rotateY(0deg); }
    }
    
    @keyframes folderGlow {
        0% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1); }
    }
    
    @keyframes paperFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-20px) rotate(10deg); opacity: 0; }
    }
    
    /* particleFloat animation removed - no longer needed */
    
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-group.focused label {
        transform: translateY(-20px) scale(0.8);
        color: var(--accent-gold);
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;

document.head.appendChild(style);

// ===== EASTER EGGS =====
// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 Hai trovato l\'easter egg! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-primary);
        color: var(--primary-dark);
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: bounce 0.5s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.style.animation = '';
        rainbowStyle.remove();
    }, 3000);
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
%c🚀 Benvenuto nel Portfolio di Matteo Longo! 🚀
%cQuesto sito è stato creato con amore e tecnologie moderne.
%cSe sei un recruiter e stai guardando il codice, complimenti! 👨‍💻

%cContattami: matteo.longo@email.com
`, 
'color: #d4af37; font-size: 20px; font-weight: bold;',
'color: #ffffff; font-size: 14px;',
'color: #d4af37; font-size: 14px;',
'color: #ffffff; font-size: 12px;'
);

// ===== SILK BACKGROUND INITIALIZATION =====
    async function initSilkBackground() {
        // Initialize React Silk component for projects section
        const silkContainer = document.getElementById('projects-silk');
        if (silkContainer && typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
            try {
                // Dynamically import the Silk component
                const { default: Silk } = await import('./src/components/Silk.jsx');
                
                // Create React element with Silk component
                const silkElement = React.createElement(Silk, {
                    speed: 3,
                    scale: 2,
                    color: '#7B7481',
                    noiseIntensity: 1.2,
                    rotation: 0.1
                });
                
                // Render the Silk component
                ReactDOM.render(silkElement, silkContainer);
            } catch (error) {
                console.warn('Could not load Silk component:', error);
                // Fallback to simple background
                silkContainer.style.background = 'linear-gradient(45deg, rgba(123, 116, 129, 0.1), rgba(123, 116, 129, 0.2))';
            }
        } else {
            console.warn('React or ReactDOM not available, or container not found');
        }
    }

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePortfolio,
        switchNotebook,
        toggleFolder,
        openProjectModal,
        closeProjectModal
    };
}