// Decorative animated orbit. Pure CSS — no canvas, no dependency, no card
// chrome. Every animation here is switched off under prefers-reduced-motion.

const RINGS = [0, 13, 26, 39];

type Orbit = {
  inset: number;
  duration: string;
  delay: string;
  dot: string;
  glow: string;
  /** Draw a tapered arc trailing behind the dot. */
  trail?: string;
};

const ORBITS: Orbit[] = [
  {
    inset: 0,
    duration: "22s",
    delay: "0s",
    dot: "h-2.5 w-2.5 bg-brand",
    glow: "shadow-brand/50",
    trail: "var(--brand)",
  },
  {
    inset: 13,
    duration: "16s",
    delay: "-5s",
    dot: "h-2 w-2 bg-brand-2",
    glow: "shadow-brand-2/50",
    trail: "var(--brand-2)",
  },
  {
    inset: 26,
    duration: "28s",
    delay: "-11s",
    dot: "h-2 w-2 bg-brand-3",
    glow: "shadow-brand-3/50",
  },
  {
    inset: 39,
    duration: "12s",
    delay: "-3s",
    dot: "h-1.5 w-1.5 bg-brand",
    glow: "shadow-brand/40",
  },
];

// Staggered radar pings expanding out of the centre.
const PINGS = ["0s", "-1.35s", "-2.7s"];

// Tick marks around the outer edge.
const TICKS = Array.from({ length: 32 }, (_, i) => i * (360 / 32));

// Fixed scatter so server and client render identically (no Math.random).
const PARTICLES = [
  { top: "6%", left: "18%", size: 3, dur: "13s", delay: "0s" },
  { top: "14%", left: "82%", size: 2, dur: "16s", delay: "-3s" },
  { top: "34%", left: "4%", size: 2, dur: "11s", delay: "-6s" },
  { top: "48%", left: "94%", size: 3, dur: "15s", delay: "-2s" },
  { top: "68%", left: "10%", size: 2, dur: "18s", delay: "-8s" },
  { top: "80%", left: "76%", size: 3, dur: "12s", delay: "-4s" },
  { top: "92%", left: "40%", size: 2, dur: "17s", delay: "-9s" },
  { top: "24%", left: "56%", size: 2, dur: "14s", delay: "-5s" },
  { top: "58%", left: "30%", size: 2, dur: "19s", delay: "-7s" },
];

export default function HeroVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-none"
      aria-hidden="true"
    >
      {/* Aurora backdrop, slowly rotating and swelling */}
      <div
        className="hv-aurora absolute -inset-[18%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, var(--brand), transparent 35%, var(--brand-2) 60%, transparent 85%, var(--brand))",
          opacity: 0.16,
        }}
      />

      {/* Drifting particles behind the rings */}
      {PARTICLES.map((p) => (
        <span
          key={`${p.top}-${p.left}`}
          className="hv-drift absolute rounded-full bg-brand/60"
          style={{
            top: p.top,
            left: p.left,
            height: p.size,
            width: p.size,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        >
          <span
            className="hv-twinkle absolute inset-0 rounded-full bg-inherit"
            style={{ animationDelay: p.delay }}
          />
        </span>
      ))}

      {/* Floating wrapper: lifts the whole composition up and down */}
      <div className="hv-float absolute inset-0">
        {/* Radar pings */}
        {PINGS.map((delay) => (
          <div
            key={delay}
            className="hv-ping absolute inset-[8%] rounded-full border border-brand/40"
            style={{ animationDelay: delay }}
          />
        ))}

        {/* Core glow */}
        <div className="hv-pulse absolute inset-[36%] rounded-full bg-brand/30 blur-2xl" />
        <div
          className="hv-pulse absolute inset-[42%] rounded-full bg-brand-2/25 blur-xl"
          style={{ animationDelay: "-2.2s" }}
        />

        {/* Ring stack, breathing as one */}
        <div className="hv-breathe absolute inset-0">
          {RINGS.map((inset) => (
            <div
              key={`ring-${inset}`}
              className="absolute rounded-full border border-hairline"
              style={{ inset: `${inset}%` }}
            />
          ))}
          {/* Dashed ring, counter-rotating */}
          <div className="hv-spin-rev absolute inset-[26%] rounded-full border border-dashed border-hairline-strong" />
        </div>

        {/* Rotating brand sweeps riding two of the rings */}
        <div className="hv-sweep absolute inset-0 rounded-full" />
        <div className="hv-sweep-2 absolute inset-[13%] rounded-full" />

        {/* Tick marks. Each sits in a full-size wrapper that rotates about the
            circle centre, so no manual transform-origin maths is needed. */}
        <div
          className="hv-spin absolute inset-0"
          style={{ animationDuration: "60s" }}
        >
          {TICKS.map((angle, i) => (
            <div
              key={angle}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span
                className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-hairline-strong"
                style={{ opacity: i % 4 === 0 ? 0.9 : 0.3 }}
              />
            </div>
          ))}
        </div>

        {/* Comet trails, timed to match their dot so they sit just behind it */}
        {ORBITS.filter((o) => o.trail).map((orbit) => (
          <div
            key={`trail-${orbit.inset}`}
            className="hv-trail absolute rounded-full"
            style={{
              inset: `${orbit.inset}%`,
              animationDuration: orbit.duration,
              animationDelay: orbit.delay,
              background: `conic-gradient(from -52deg, transparent 0deg, ${orbit.trail} 52deg)`,
              opacity: 0.55,
            }}
          />
        ))}

        {/* Orbiting dots: the wrapper spans the ring and spins, dot sits on top */}
        {ORBITS.map((orbit) => (
          <div
            key={`orbit-${orbit.inset}`}
            className="hv-orbit absolute"
            style={{
              inset: `${orbit.inset}%`,
              animationDuration: orbit.duration,
              animationDelay: orbit.delay,
            }}
          >
            <span
              className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_14px_3px] ${orbit.glow} ${orbit.dot}`}
            />
          </div>
        ))}

        {/* Centre mark */}
        <div className="absolute inset-0 grid place-items-center">
          <span className="hv-fade font-[family-name:var(--font-mono)] text-sm text-brand">
            &lt;/&gt;
          </span>
        </div>
      </div>
    </div>
  );
}
