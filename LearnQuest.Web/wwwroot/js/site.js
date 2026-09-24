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
});