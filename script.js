// Enhanced Portfolio JavaScript with Skills Animation

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Create SVG gradient for skill circles
    function createSkillGradient() {
        const skillCircles = document.querySelectorAll('.skill-circle');

        skillCircles.forEach((circle, index) => {
            const svg = circle.querySelector('svg');
            if (!svg) return;

            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `gradient-${index}`);
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');

            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#3b82f6');

            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '50%');
            stop2.setAttribute('stop-color', '#6366f1');

            const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop3.setAttribute('offset', '100%');
            stop3.setAttribute('stop-color', '#8b5cf6');

            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            gradient.appendChild(stop3);
            defs.appendChild(gradient);
            svg.appendChild(defs);

            const progressCircle = svg.querySelector('.skill-progress');
            progressCircle.setAttribute('stroke', `url(#gradient-${index})`);

            const percentText = circle.querySelector('.skill-percent');
            const percent = parseInt(percentText.textContent);
            const totalLength = 439.8;
            const offset = totalLength - (totalLength * percent) / 100;
            progressCircle.style.strokeDashoffset = offset;
        });
    }

    // Animate skill circles
    function animateSkillCircles() {
        const skillCircles = document.querySelectorAll('.skill-circle');

        skillCircles.forEach(circle => {
            if (circle.classList.contains('animated')) return;

            const circleTop = circle.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (circleTop < windowHeight - 100) {
                const percent = circle.getAttribute('data-percent');
                const svg = circle.querySelector('svg');
                const progressCircle = svg?.querySelector('.skill-progress');
                const circumference = parseFloat(progressCircle.getAttribute('data-circumference'));

                const offset = circumference - (percent / 100) * circumference;

                setTimeout(() => {
                    progressCircle.style.strokeDashoffset = offset;
                }, 200);

                circle.classList.add('animated');
            }
        });
    }

    // Scroll animations - enhanced version
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    // Run animations on scroll
    window.addEventListener('scroll', function () {
        animateOnScroll();
        animateSkillCircles();
    });

    // Add fade-in class to selected elements
    const elementsToAnimate = [
        '.about-text',
        '.info-card',
        '.timeline-card',
        '.edu-card',
        '.skill-card',
        '.link-card',
        '.contact-content'
    ];
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.classList.add('fade-in'));
    });

    // Staggered animation delays
    document.querySelectorAll('.skill-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.2}s`;
    });
    document.querySelectorAll('.link-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
    });

    // Initial animations
    setTimeout(() => {
        createSkillGradient();
        animateOnScroll();
        animateSkillCircles();
    }, 500);

    // Skill card hover effects
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Link card ripple click effects
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(59, 130, 246, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.clientX - this.offsetLeft - 25 + 'px';
            ripple.style.top = e.clientY - this.offsetTop - 25 + 'px';
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Ripple effect CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Enhanced Portfolio loaded successfully! 🚀✨');
});
