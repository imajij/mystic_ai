document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});