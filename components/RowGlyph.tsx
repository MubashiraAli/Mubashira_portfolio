// Small animated glyphs marking each About row. Decorative only — the row text
// carries the meaning, so these are hidden from assistive tech.

export type GlyphVariant = "ai" | "stack" | "team";

export default function RowGlyph({ variant }: { variant: GlyphVariant }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-10 w-10 shrink-0"
      aria-hidden="true"
      fill="none"
    >
      {variant === "ai" ? (
        <>
          {/* Pulsing halos around a core, with orbiting satellites */}
          <circle
            cx="20"
            cy="20"
            r="14"
            stroke="var(--brand)"
            strokeWidth="1"
            className="node-ping"
          />
          <circle
            cx="20"
            cy="20"
            r="14"
            stroke="var(--brand)"
            strokeWidth="1"
            className="node-ping"
            style={{ animationDelay: "-1.6s" }}
          />
          <circle
            cx="20"
            cy="20"
            r="9"
            stroke="var(--hairline-strong)"
            strokeWidth="1"
          />
          <circle cx="20" cy="20" r="3.5" fill="var(--brand)" />
          <g className="hv-spin svg-center" style={{ animationDuration: "9s" }}>
            <circle cx="20" cy="6" r="2" fill="var(--brand-2)" />
            <circle cx="34" cy="20" r="1.6" fill="var(--brand-3)" />
          </g>
        </>
      ) : null}

      {variant === "stack" ? (
        <>
          {/* Three layers sliding out of alignment and back */}
          {[10, 20, 30].map((y, i) => (
            <rect
              key={y}
              x="7"
              y={y - 3.5}
              width="26"
              height="7"
              rx="3.5"
              fill="var(--brand)"
              fillOpacity={0.5 - i * 0.13}
              stroke="var(--brand)"
              strokeOpacity="0.5"
              strokeWidth="1"
              className="glyph-slide"
              style={{ animationDelay: `${-i * 0.45}s` }}
            />
          ))}
        </>
      ) : null}

      {variant === "team" ? (
        <>
          {/* Three nodes with signal marching between them */}
          <path
            d="M11 27 L20 11 L29 27 Z"
            stroke="var(--brand)"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            className="dash-flow"
          />
          <circle cx="20" cy="11" r="3.6" fill="var(--brand)" />
          <circle cx="11" cy="27" r="3.2" fill="var(--brand-2)" />
          <circle cx="29" cy="27" r="3.2" fill="var(--brand-3)" />
          <circle
            cx="20"
            cy="11"
            r="7"
            stroke="var(--brand)"
            strokeWidth="1"
            className="node-ping"
          />
        </>
      ) : null}
    </svg>
  );
}
