// Theme toggle & interactions
(function () {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');
    const meters = document.querySelectorAll('.meter .bar');
    const yearEl = document.getElementById('year');

    // Persisted theme
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') root.setAttribute('data-theme', 'dark');

    // Toggle theme
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            if (next === 'dark') root.setAttribute('data-theme', 'dark');
            else root.removeAttribute('data-theme');
            localStorage.setItem('theme', next);
        });
    }

    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = nav.classList.contains('active');
            
            if (isActive) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            } else {
                nav.classList.add('active');
                mobileMenuToggle.classList.add('active');
            }
        });

        // Close mobile menu when clicking on nav links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });

        // Close mobile menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Animate meters when visible
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const value = el.getAttribute('data-value');
                el.style.width = value + '%';
                io.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    meters.forEach((m) => io.observe(m));

    // Footer year
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Simple contact form handler
function handleContact(event) {
    event.preventDefault();
    const form = event.target;
    const status = document.getElementById('formStatus');
    const formData = new FormData(form);
    const name = formData.get('name');
    status.textContent = 'Thanks ' + name + '! Your message has been noted.';
    form.reset();
    return false;
}


