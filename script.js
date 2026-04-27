/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const pct = document.getElementById('preloaderPct');

    // Animate percentage
    let count = 0;
    const counter = setInterval(() => {
        count = Math.min(count + Math.floor(Math.random() * 12) + 4, 100);
        if (pct) pct.textContent = count + '%';
        if (count >= 100) clearInterval(counter);
    }, 90);

    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initRevealAnimations();
        animateStats();
    }, 1200);
});

document.body.style.overflow = 'hidden';

// tsParticles Initialization
tsParticles.load("tsparticles", {
    fullScreen: false,
    background: {
        color: { value: "#0d1b2a" }
    },
    fpsLimit: 60,
    particles: {
        number: {
            value: 60,
            density: { enable: true, area: 900 }
        },
        color: { value: ["#3a7bd5", "#7bb2d9", "#d45d3c"] },
        shape: { type: "circle" },
        opacity: {
            value: { min: 0.15, max: 0.5 },
            animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false }
        },
        size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 1.5, minimumValue: 0.5, sync: false }
        },
        links: {
            enable: true,
            distance: 160,
            color: "#3a7bd5",
            opacity: 0.15,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" }
        }
    },
    interactivity: {
        detectsOn: "window",
        events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: {
                distance: 180,
                links: { opacity: 0.35, color: "#7bb2d9" }
            },
            push: { quantity: 3 }
        }
    },
    detectRetina: true
});

document.body.style.overflow = 'hidden';

// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'BSc in Mechanical Engineering — CUET',
    'MSc in Mechanical Engineering (Ongoing)',
    'Researcher | Piezoelectric Materials',
    'CAD & Simulation Specialist',
    'Renewable Energy Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewrite() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
        delay = 2000; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(typewrite, delay);
}

if (typewriterEl) {
    setTimeout(typewrite, 800);
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ===== SCROLL REVEAL + BLUEPRINT LINE DRAW =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
});

sections.forEach(section => navObserver.observe(section));

// ===== SKILL GAUGE ANIMATION =====
const gauges = document.querySelectorAll('.gauge-fill');
const circumference = 2 * Math.PI * 52; // r=52

const gaugeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.gauge-fill');
            fills.forEach(fill => {
                const percent = parseInt(fill.getAttribute('data-percent'), 10);
                const offset = circumference - (circumference * percent / 100);
                fill.style.strokeDashoffset = offset;
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    gaugeObserver.observe(skillsSection);
}
// ===== LEADERSHIP MODAL GALLERY =====
function openModal(element) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const imgSrc = element.getAttribute("data-img");
    
    modal.style.display = "block";
    modalImg.src = imgSrc;
    
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
    // Restore background scrolling
    document.body.style.overflow = '';
}

// Close the modal when the user clicks anywhere outside of the image
window.addEventListener('click', function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});