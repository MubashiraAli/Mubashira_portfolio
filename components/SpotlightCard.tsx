"use client";

import { useCallback, useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Adds cursor-tracked 3D tilt on top of the glow. */
  tilt?: boolean;
  /** Element to render. Cards inside a <ul>/<ol> should use "li". */
  as?: "div" | "article" | "li";
  /** Max tilt in degrees. */
  strength?: number;
  style?: React.CSSProperties;
};

/**
 * Card surface that tracks the cursor: writes --mx/--my (glow origin) and
 * --rx/--ry (tilt) as CSS custom properties, which app/globals.css consumes.
 * Pointer work is done via refs so moving the mouse never re-renders React.
 */
export default function SpotlightCard({
  children,
  className = "",
  tilt = false,
  as = "div",
  strength = 6,
  style,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      // Tilt is a pointer affordance; skip it for touch, where there is no hover.
      if (event.pointerType === "touch") return;

      const el = ref.current;
      if (!el) return;

      const { clientX, clientY } = event;

      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);

        if (tilt) {
          const rx = (y / rect.height - 0.5) * -2 * strength;
          const ry = (x / rect.width - 0.5) * 2 * strength;
          el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
          el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
        }
      });
    },
    [tilt, strength]
  );

  const handleLeave = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`card ${tilt ? "card-tilt" : ""} ${className}`}
    >
      <span className="card-glow" aria-hidden="true" />
      <span className="card-border" aria-hidden="true" />
      {children}
    </Tag>
  );
}
