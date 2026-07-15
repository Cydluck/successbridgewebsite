// =====================
// MOBILE MENU
// =====================
function toggleMenu() {
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(nav => nav.classList.toggle('active'));
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-links').forEach(nav => {
            nav.classList.remove('active');
        });
    });
});

// =====================
// HERO SLIDER
// =====================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// =====================
// STATS COUNTER
// =====================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(updateCounter);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger counter when stats section is visible
const statsSection = document.querySelector('.stats');
let counterStarted = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            animateCounters();
            counterStarted = true;
        }
    });
}, { threshold: 0.3 });

if (statsSection) observer.observe(statsSection);

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =====================
// NAVBAR SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});