// --- PHASE 1: IMMEDIATE EXECUTION (Prevents White Flash / FOUC) ---
(function() {
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';

        const currentHour = new Date().getHours();
        return (currentHour >= 19 || currentHour < 7) ? 'dark' : 'light';
    };

    document.documentElement.setAttribute('data-theme', getPreferredTheme());
})();

// --- PHASE 2: DOM LOADED (Event Listeners & UI Updates) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    const updateIcon = (theme) => {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill fs-5 text-warning' : 'bi bi-moon-stars-fill fs-5 text-dark';
        }
    };

    updateIcon(htmlElement.getAttribute('data-theme'));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    // 2. Global Skeleton Shimmer Effect (applies to every page with .skeleton-item)
    const skeletons = document.querySelectorAll('.skeleton-item');
    if (skeletons.length > 0) {
        skeletons.forEach(el => el.classList.add('skeleton'));
        setTimeout(() => {
            skeletons.forEach(el => {
                el.classList.remove('skeleton');
            });
        }, 700);
    }

    // 3. Initialize Bootstrap Tooltips
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
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
});