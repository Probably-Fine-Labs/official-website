"use client";

type Theme = "light" | "dark";

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

// The active state is styled purely from <html data-theme>, so this needs no
// React state and can't mismatch during hydration.
export default function ThemeToggle() {
  return (
    <div className="toggle" role="group" aria-label="Color theme">
      <button className="t-light" type="button" aria-label="Light theme" onClick={() => setTheme("light")}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>
      <button className="t-dark" type="button" aria-label="Dark theme" onClick={() => setTheme("dark")}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>
    </div>
  );
}

// Runs before paint (inlined in <head>) so the page never flashes the wrong theme.
export const themeScript = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)');document.documentElement.dataset.theme=s||(m.matches?'dark':'light');m.addEventListener('change',function(e){if(!localStorage.getItem('theme'))document.documentElement.dataset.theme=e.matches?'dark':'light'})}catch(e){}})();`;
