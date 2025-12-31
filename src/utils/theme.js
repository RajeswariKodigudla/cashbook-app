const DEFAULT_THEME = "system"; // light | dark | system

export function getTheme() {
  return localStorage.getItem("theme") || DEFAULT_THEME;
}

export function setTheme(theme) {
  localStorage.setItem("theme", theme);
  applyTheme(theme);
}

export function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    // system
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.toggle("dark", prefersDark);
  }
}
