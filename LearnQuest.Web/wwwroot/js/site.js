/* ============================================
   LearnQuest — Global JavaScript
   Theme, Animations, Skeleton & Utilities
   ============================================ */

// --- PHASE 1: IMMEDIATE (Prevent FOUC) ---
(function () {
    const getPreferredTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;

        if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
        if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';

        const hour = new Date().getHours();
        return (hour >= 19 || hour < 7) ? 'dark' : 'light';
    };

    document.documentElement.setAttribute('data-theme', getPreferredTheme());
})();

// --- PHASE 2: DOM LOADED ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    const updateIcon = (theme) => {
        if (!themeIcon) return;
        themeIcon.className = theme === 'dark'
            ? 'bi bi-sun-fill fs-5 text-warning'
            : 'bi bi-moon-stars-fill fs-5 text-dark';
    };

    updateIcon(html.getAttribute('data-theme'));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next);
        });
    }

    // 2. Skeleton Shimmer (global)
    const skeletons = document.querySelectorAll('.skeleton-item');
    if (skeletons.length > 0) {
        skeletons.forEach(el => el.classList.add('skeleton'));
        setTimeout(() => {
            skeletons.forEach(el => el.classList.remove('skeleton'));
        }, 700);
    }

    // 3. Bootstrap Tooltips
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }

    // 4. SweetAlert2 Toast Helper
    if (typeof Swal !== 'undefined') {
        window.Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: 'var(--card-bg)',
            color: 'var(--text-main)',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    // 5. Fade-In-Up Animation (IntersectionObserver)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            fadeObserver.observe(el);
        });
    }

    // 6. Scroll-to-Top Button
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. Mobile Bottom Nav — active state
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const currentPath = window.location.pathname.toLowerCase();
    mobileNavItems.forEach(item => {
        const href = item.getAttribute('href')?.toLowerCase();
        if (href && currentPath.startsWith(href)) {
            item.classList.add('active');
        }
    });
});
});