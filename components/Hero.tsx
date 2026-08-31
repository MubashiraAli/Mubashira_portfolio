"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/data/resume";
import HeroVisual from "./HeroVisual";
import SpotlightCard from "./SpotlightCard";
import {
  ArrowIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
} from "./Icons";

const ROLES = [
  "Full-Stack Developer",
  "React & Next.js Developer",
  "Python / Django Developer",
  "AI Integration Engineer",
];

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) {
          setDeleting(true);
          return;
        }
        if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
          return;
        }
        setText((prev) =>
          deleting
            ? word.slice(0, prev.length - 1)
            : word.slice(0, prev.length + 1)
        );
      },
      done ? 1700 : deleting ? 32 : 62
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

  const trackCursor = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const el = sectionRef.current;
    if (!el) return;
    const { clientX, clientY } = event;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--hx", `${clientX - rect.left}px`);
      el.style.setProperty("--hy", `${clientY - rect.top}px`);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={trackCursor}
      className="relative overflow-hidden pt-28 pb-12 sm:pt-32"
    >
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(620px circle at var(--hx, 25%) var(--hy, 15%), var(--glow), transparent 60%)",
        }}
      />
      <div
        className="orb -left-32 top-0 h-80 w-80 bg-brand/20"
        aria-hidden="true"
      />
      <div
        className="orb -right-24 top-52 h-96 w-96 bg-brand-2/20"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />

      <div className="container-x">
        <div className="bento">
          {/* Headline block */}
          <SpotlightCard
            className="col-span-2 flex flex-col p-6 sm:p-8 md:col-span-6 lg:col-span-8"
            style={{ animationDelay: "80ms" }}
          >
            <div>
              <p className="label enter text-brand" style={{ animationDelay: "120ms" }}>
                {profile.location} — Available for work
              </p>

              <h1 className="display-name mt-5">
                <span className="line-mask">
                  <span style={{ animationDelay: "180ms" }}>
                    Mubashira{" "}
                    <span className="text-gradient-anim">P</span>
                  </span>
                </span>
              </h1>

              <p
                className="enter mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
                style={{ animationDelay: "440ms" }}
              >
                Software Engineer building production web applications end to
                end — REST APIs, databases and the interfaces people actually
                use.
              </p>

              <p
                className="enter mt-4 font-[family-name:var(--font-mono)] text-sm text-subtle"
                style={{ animationDelay: "520ms" }}
              >
                <span className="text-brand">&gt;</span> {typed}
                <span className="caret ml-0.5 inline-block w-[2px] bg-brand align-middle text-transparent">
                  |
                </span>
              </p>
            </div>

            <div
              className="enter mt-7 flex flex-wrap items-center gap-2.5"
              style={{ animationDelay: "600ms" }}
            >
              <a
                href="#projects"
                className="sheen group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
              >
                View my work
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={profile.resume}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-hairline-strong px-6 py-3 text-sm font-semibold transition-colors hover:border-brand/45 hover:text-brand"
              >
                <DownloadIcon className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-muted transition-all hover:-translate-y-0.5 hover:border-brand/45 hover:text-brand"
              >
                <GithubIcon />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-muted transition-all hover:-translate-y-0.5 hover:border-brand/45 hover:text-brand"
              >
                <LinkedinIcon />
              </a>
            </div>
          </SpotlightCard>

          {/* Animated orbit. No card chrome — it sits straight on the page. */}
          <div
            className="enter col-span-2 flex items-center justify-center py-6 md:col-span-6 lg:col-span-4 lg:py-0"
            style={{ animationDelay: "240ms" }}
          >
            <HeroVisual />
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll to about section"
          className="mx-auto mt-12 flex h-11 w-7 items-start justify-center rounded-full border border-hairline pt-2 transition-colors hover:border-brand/45"
        >
          <span
            className="scroll-hint-dot h-1.5 w-1.5 rounded-full bg-brand"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
