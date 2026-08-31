const TECH = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Python",
  "Django",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "MySQL",
  "PostgreSQL",
  "Gemini API",
  "TensorFlow",
  "Docker",
  "Git",
  "REST APIs",
  "Vercel",
];

export default function Marquee() {
  const items = [...TECH, ...TECH];

  return (
    <div className="marquee-wrap relative border-y border-hairline bg-surface-2 py-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent"
        aria-hidden="true"
      />
      <div className="flex overflow-hidden">
        <ul
          className="marquee-track flex shrink-0 items-center gap-10 pr-10"
          aria-hidden="true"
        >
          {items.map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              className="whitespace-nowrap font-[family-name:var(--font-mono)] text-sm text-subtle transition-colors hover:text-brand"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
