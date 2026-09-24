document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill fs-5 text-warning' : 'bi bi-moon-stars-fill fs-5 text-dark';
        }
    }

    function getPreferredTheme() {
        // 1. Check local storage for user preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        // 2. Check system/device preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';

        // 3. Fallback to time-based preference (19:00 - 07:00 is dark mode)
        const currentHour = new Date().getHours();
        return (currentHour >= 19 || currentHour < 7) ? 'dark' : 'light';
    }

    // Initialize theme on load
    setTheme(getPreferredTheme());

    // Handle theme toggle button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }
});