const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' " +
  "numOctaves='3' stitchTiles='stitch'/></filter>" +
  "<rect width='180' height='180' filter='url(%23n)'/></svg>";

/** Static film-grain overlay. Purely decorative, never intercepts pointers. */
export default function Grain() {
  return (
    <div
      className="grain"
      aria-hidden="true"
      style={
        {
          "--grain-src": `url("data:image/svg+xml,${NOISE_SVG}")`,
        } as React.CSSProperties
      }
    />
  );
}
