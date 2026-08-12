/**
 * Dark mode toggle utility.
 * Adds/removes .dark on <html> and persists to localStorage.
 */

const DARK_KEY = "theme";

export function initDarkMode() {
    if (window.location.pathname.includes("/pages/auth/")) {
        document.documentElement.classList.remove("dark");
        return;
    }

    const saved = localStorage.getItem(DARK_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "dark" || (!saved && prefersDark)) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

export function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem(DARK_KEY, isDark ? "dark" : "light");
    return isDark;
}

export function isDarkMode() {
    return document.documentElement.classList.contains("dark");
}
