document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skills-container *').forEach(el => {
        observer.observe(el);
    });

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Show scroll-to-top button
        scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form submission (with Formspree or other backend)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thanks for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('There was an issue. Please try again.');
                }
            })
            .catch(error => {
                console.error('Form error:', error);
                alert('Something went wrong. Please try again later.');
            });
        });
    }

    // Typed.js animation
    if (document.getElementById('typed')) {
        const typed = new Typed('#typed', {
            strings: ['Software Engineer', 'Frontend Developer', 'Data Administrator'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // ScrollReveal animations
    if (window.ScrollReveal) {
        ScrollReveal().reveal('.project-card', {
            origin: 'bottom',
            distance: '30px',
            duration: 1000,
            delay: 100,
            reset: false,
        });

        ScrollReveal().reveal('.skill-bar, .about-content, .contact-form', {
            origin: 'left',
            distance: '50px',
            duration: 800,
            delay: 200,
            reset: false,
        });
    }
});
