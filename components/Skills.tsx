import { skills } from "@/data/resume";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

// Varying spans keep the grid from reading as a plain 3-up row of equal boxes.
const SPANS = [
  "col-span-2 md:col-span-4 lg:col-span-5",
  "col-span-2 md:col-span-2 lg:col-span-3",
  "col-span-2 md:col-span-3 lg:col-span-4",
  "col-span-2 md:col-span-3 lg:col-span-4",
  "col-span-2 md:col-span-3 lg:col-span-3",
  "col-span-2 md:col-span-3 lg:col-span-5",
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="02 — Skills"
          title="Technical toolkit"
          description="The languages, frameworks and tools I use to design, build and ship full-stack applications."
        />

        <div className="bento mt-12">
          {skills.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 70}
              from="scale"
              className={SPANS[i % SPANS.length]}
            >
              <SpotlightCard tilt strength={5} className="h-full p-6">
                <div className="flex items-baseline gap-3">
                  <span className="numeral text-sm text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md">{group.title}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="sheen rounded-lg border border-hairline bg-surface-2 px-3 py-1.5 text-sm text-muted transition-colors hover:border-brand/40 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
