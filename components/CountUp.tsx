"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric value up when it scrolls into view. Values with no leading
 * number (e.g. "B.Tech") are rendered verbatim, so this is safe for mixed stats.
 */
export default function CountUp({
  value,
  duration = 1200,
}: {
  value: string;
  duration?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (target === null) return;

    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(target));
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(eased * target)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          frame = requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {display}
      {target === null ? "" : suffix}
    </span>
  );
}
