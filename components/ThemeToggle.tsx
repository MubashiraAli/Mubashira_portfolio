"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Two-state theme switch. The initial paint is handled by the inline script in
 * app/layout.tsx; this only syncs the button's own label after mount, so it
 * renders a stable placeholder on the server.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    setTheme(attr === "light" || attr === "dark" ? attr : systemTheme());
  }, []);

  // Follow the OS while the visitor has made no explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        stored = null;
      }
      if (stored !== "light" && stored !== "dark") {
        document.documentElement.removeAttribute("data-theme");
        setTheme(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / blocked storage: the choice just won't persist.
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === null
          ? "Toggle colour theme"
          : `Switch to ${isDark ? "light" : "dark"} theme`
      }
      className={`group relative grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted transition-colors hover:border-brand/45 hover:text-brand ${className}`}
    >
      <span className="relative block h-4 w-4">
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path
            d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
            strokeLinecap="round"
          />
        </svg>
        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          aria-hidden="true"
        >
          <path
            d="M20.5 14.4A8.6 8.6 0 0 1 9.6 3.5a8.8 8.8 0 1 0 10.9 10.9Z"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
