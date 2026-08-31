"use client";

import { useEffect, useRef } from "react";

/**
 * Vertical rail down the left of a block whose accent fill tracks how far the
 * reader has scrolled through it. Height is written straight onto the DOM node
 * inside a requestAnimationFrame callback, so scrolling causes no re-renders.
 */
export default function ScrollRail({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const fill = fillRef.current;
    if (!host || !fill) return;

    // Motion off: show the rail complete and do no scroll work.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.height = "100%";
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;

      // Fill begins as the block's top passes three quarters down the
      // viewport, and completes once the block has scrolled fully past it.
      const line = vh * 0.75;
      const travelled = line - rect.top;
      const progress = Math.min(1, Math.max(0, travelled / rect.height));

      fill.style.height = `${(progress * 100).toFixed(2)}%`;
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
  }, []);

  return (
    <div ref={hostRef} className={`relative ${className}`}>
      {/* Track */}
      <span
        className="absolute left-0 top-0 h-full w-px bg-hairline"
        aria-hidden="true"
      />
      {/* Accent fill following scroll progress */}
      <span
        ref={fillRef}
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-brand to-brand-2"
        style={{ height: 0 }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
