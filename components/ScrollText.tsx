"use client";

import { Fragment, useEffect, useRef } from "react";

/**
 * Large editorial paragraph whose words illuminate as the block scrolls up the
 * viewport. Opacity is written straight onto the spans inside a
 * requestAnimationFrame callback, so scrolling never triggers a React render.
 */
export default function ScrollText({
  text,
  className = "",
  dim = 0.16,
}: {
  text: string;
  className?: string;
  /** Resting opacity of a word that has not been reached yet. */
  dim?: number;
}) {
  const hostRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

    // Motion off: show the paragraph at full contrast and do no work.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;

      // Reading band: starts as the text enters the lower third, completes
      // once it has travelled to just above the middle of the viewport.
      const start = vh * 0.82;
      const end = vh * 0.32;
      const distance = start - end + rect.height;
      const travelled = start - rect.top;
      const progress = Math.min(1, Math.max(0, travelled / distance));

      // Spread the leading edge over a few words so it feathers rather than
      // switching each word on like a light.
      const head = progress * (words.length + 6) - 3;

      words.forEach((word, i) => {
        const d = head - i;
        const opacity = d <= 0 ? dim : d >= 3 ? 1 : dim + (d / 3) * (1 - dim);
        word.style.opacity = opacity.toFixed(3);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dim, text]);

  const words = text.split(" ");

  return (
    <p ref={hostRef} className={className}>
      {/*
        Spaces are real text nodes, not margins, so the paragraph still copies
        and reads aloud as ordinary prose.
      */}
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            ref={(el) => {
              wordsRef.current[i] = el;
            }}
            style={{ opacity: dim, transition: "opacity 140ms linear" }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
