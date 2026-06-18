
/* ── Dark / Light Theme Controller ── */
const THEME_KEY = 'prodesk-theme';

function applyTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function toggleTheme() {
    const isDark = !document.body.classList.contains('dark-theme');
    applyTheme(isDark);
}

// Restore saved theme on page load
(function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') {
        applyTheme(true);
    } else if (saved === null) {
        // Respect OS preference on first visit
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark);
    }
})();

/* ── Hamburger Menu ── */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('hamburgerBtn');
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('hamburgerBtn');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
}

/* ── Sticky Navbar: add .scrolled shadow on scroll ── */
(function initScrolledNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
})();

/* ── Smooth Scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            closeMenu();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── Scroll-triggered fade-in animations ── */
(function initFadeIn() {
    const targets = document.querySelectorAll(
        '.card, .process-step, .testimonial-card, .stat-item'
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // fire once only
            }
        });
    }, { threshold: 0.12 });

    targets.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`;
        observer.observe(el);
    });
})();