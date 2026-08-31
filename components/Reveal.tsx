"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "scale" | "blur";

const VARIANT: Record<Direction, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  blur: "reveal-blur",
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: Direction;
  as?: "div" | "li" | "section" | "article";
};

/** Fades content in the first time it scrolls into view. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${VARIANT[from]} ${
        visible ? "is-visible" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
