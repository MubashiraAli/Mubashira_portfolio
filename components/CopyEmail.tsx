"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/resume";

/** Copies the email to the clipboard, with a short confirmation state. */
export default function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setFailed(false);
      setCopied(true);
    } catch {
      // Clipboard access can be denied (insecure origin, permissions policy).
      setCopied(false);
      setFailed(true);
    }
    timer.current = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        copied
          ? "border-ok/45 text-ok"
          : "border-hairline text-muted hover:border-brand/45 hover:text-brand"
      } ${className}`}
    >
      {copied ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="m5 13 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="11" height="11" rx="2.2" />
          <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-6A3.5 3.5 0 0 0 3 6.5v6A2.5 2.5 0 0 0 5.5 15" />
        </svg>
      )}
      {copied ? "Copied" : failed ? "Copy failed" : "Copy email"}
    </button>
  );
}
