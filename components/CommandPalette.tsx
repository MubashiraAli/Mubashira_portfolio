"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navLinks, profile } from "@/data/resume";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Actions" | "Links";
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
    restoreFocus.current?.focus();
  }, []);

  const goTo = useCallback((hash: string) => {
    close();
    const target = document.querySelector(hash);
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, [close]);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navLinks.map((link) => ({
      id: `nav-${link.href}`,
      label: link.label,
      hint: "Jump to section",
      group: "Navigate",
      run: () => goTo(link.href),
    }));

    const actions: Command[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        run: () => {
          close();
          navigator.clipboard
            .writeText(profile.email)
            .then(() => setToast("Email copied to clipboard"))
            .catch(() => setToast("Could not access the clipboard"));
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        group: "Actions",
        run: () => {
          close();
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = "";
          a.click();
        },
      },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        hint: "Appearance",
        group: "Actions",
        run: () => {
          close();
          const root = document.documentElement;
          const current =
            root.getAttribute("data-theme") ??
            (window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light");
          const next = current === "dark" ? "light" : "dark";
          root.setAttribute("data-theme", next);
          try {
            localStorage.setItem("theme", next);
          } catch {
            // Storage blocked: the switch still applies for this page view.
          }
        },
      },
      {
        id: "email",
        label: "Send an email",
        hint: "Opens mail client",
        group: "Actions",
        run: () => {
          close();
          window.location.href = `mailto:${profile.email}`;
        },
      },
    ];

    const links: Command[] = [
      {
        id: "github",
        label: "GitHub profile",
        hint: "github.com/MubashiraAli",
        group: "Links",
        run: () => {
          close();
          window.open(profile.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn profile",
        hint: "linkedin.com/in/mubashirap2",
        group: "Links",
        run: () => {
          close();
          window.open(profile.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ];

    return [...nav, ...actions, ...links];
  }, [goTo, close]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Global open/close shortcut.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isToggle =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isToggle) {
        event.preventDefault();
        setOpen((wasOpen) => {
          if (!wasOpen) restoreFocus.current = document.activeElement as HTMLElement;
          return !wasOpen;
        });
      }
      if (event.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Lock background scroll and focus the input while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  // Keep the highlighted row scrolled into view.
  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[cursor]?.run();
    }
  };

  let lastGroup = "";

  return (
    <>
      {/* Persistent trigger, doubles as a discoverability hint for the shortcut */}
      <button
        type="button"
        onClick={() => {
          restoreFocus.current = document.activeElement as HTMLElement;
          setOpen(true);
        }}
        className="fixed bottom-6 left-6 z-50 hidden items-center gap-2 rounded-full border border-hairline bg-bg/85 px-4 py-2.5 text-sm text-muted shadow-lg backdrop-blur-xl transition-colors hover:border-brand/45 hover:text-fg md:inline-flex"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        Quick nav
        <kbd className="rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-subtle">
          Ctrl K
        </kbd>
      </button>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-ok/35 bg-ok/10 px-4 py-2 text-sm text-ok backdrop-blur-xl"
        >
          {toast}
        </div>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <button
            type="button"
            aria-label="Close command palette"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-hairline bg-bg/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-hairline px-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 shrink-0 text-brand"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search sections and actions..."
                className="w-full bg-transparent py-4 text-sm text-fg outline-none placeholder:text-subtle"
              />
              <kbd className="shrink-0 rounded border border-hairline bg-surface-2 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-subtle">
                Esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-subtle">
                  Nothing matches “{query}”
                </p>
              ) : (
                results.map((command, i) => {
                  const showGroup = command.group !== lastGroup;
                  lastGroup = command.group;
                  return (
                    <div key={command.id}>
                      {showGroup ? (
                        <p className="label px-3 pb-1 pt-3 text-subtle">
                          {command.group}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        data-active={i === cursor}
                        onMouseEnter={() => setCursor(i)}
                        onClick={command.run}
                        className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          i === cursor
                            ? "bg-surface-2 text-fg ring-1 ring-hairline"
                            : "text-muted hover:bg-surface-2"
                        }`}
                      >
                        <span className="truncate">{command.label}</span>
                        <span className="shrink-0 truncate text-xs text-subtle">
                          {command.hint}
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-hairline px-4 py-2.5 text-[11px] text-subtle">
              <span>
                <kbd className="font-[family-name:var(--font-mono)]">↑↓</kbd> navigate
              </span>
              <span>
                <kbd className="font-[family-name:var(--font-mono)]">enter</kbd> select
              </span>
              <span>
                <kbd className="font-[family-name:var(--font-mono)]">esc</kbd> close
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
