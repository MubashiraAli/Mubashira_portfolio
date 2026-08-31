"use client";

import { useEffect, useState } from "react";

/** Floating button that fades in past the first viewport and scrolls to top. */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-hairline bg-bg/85 text-muted shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-brand/45 hover:text-brand ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          d="M12 20V5m0 0-6 6m6-6 6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
