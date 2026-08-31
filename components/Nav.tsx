"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/data/resume";
import ThemeToggle from "./ThemeToggle";
import { DownloadIcon } from "./Icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const measurePill = useCallback(() => {
    const list = listRef.current;
    const item = active ? itemRefs.current[active] : null;
    if (!list || !item) {
      setPill(null);
      return;
    }
    setPill({ left: item.offsetLeft, width: item.offsetWidth });
  }, [active]);

  useEffect(() => {
    measurePill();
    window.addEventListener("resize", measurePill);
    document.fonts?.ready.then(measurePill).catch(() => {});
    return () => window.removeEventListener("resize", measurePill);
  }, [measurePill]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-hairline bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-18 items-center justify-between py-4">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight"
        >
          <span className="text-gradient">mubashira</span>
          <span className="text-subtle">.dev</span>
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-1 md:flex">
          <li
            aria-hidden="true"
            className={`absolute top-0 h-full rounded-full bg-surface-2 ring-1 ring-hairline transition-all duration-400 ease-out ${
              pill ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: pill ? `${pill.left}px` : 0,
              width: pill ? `${pill.width}px` : 0,
            }}
          />
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <a
                ref={(el) => {
                  itemRefs.current[link.href] = el;
                }}
                href={link.href}
                className={`block rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === link.href ? "text-fg" : "text-subtle hover:text-fg"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resume}
            download
            className="hidden items-center gap-1.5 rounded-full border border-hairline px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-brand/45 hover:text-brand lg:inline-flex"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="sheen hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Get in touch
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-hairline bg-bg/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="container-x flex flex-col py-2">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`block border-b border-hairline py-3 text-sm transition-all duration-300 ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                } ${active === link.href ? "text-brand" : "text-muted"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-sm font-medium text-brand"
            >
              <DownloadIcon className="h-4 w-4" />
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
