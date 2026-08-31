import { achievements, education } from "@/data/resume";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="05 — Education & Recognition"
          title="Background and credentials"
        />

        <div className="bento mt-12">
          {education.map((item, i) => (
            <Reveal
              key={item.degree}
              delay={i * 90}
              from="left"
              className="col-span-2 md:col-span-3 lg:col-span-7"
            >
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label text-brand">{item.period}</span>
                  <span className="numeral text-4xl font-bold text-hairline-strong">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="display-md mt-5">{item.degree}</h3>
                <p className="mt-2 text-sm text-muted">{item.school}</p>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal
            delay={120}
            from="right"
            className="col-span-2 row-span-2 md:col-span-3 lg:col-span-5 lg:row-start-1"
          >
            <SpotlightCard tilt strength={4} className="h-full p-6 sm:p-7">
              <span className="label text-subtle">
                Achievements &amp; Certifications
              </span>
              <ul className="mt-6 space-y-5">
                {achievements.map((item, i) => (
                  <li key={item.title} className="group/item flex gap-4">
                    <span className="numeral pt-0.5 text-xs text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="border-l border-hairline pl-4 transition-colors group-hover/item:border-brand">
                      <p className="text-sm text-fg">{item.title}</p>
                      <p className="mt-0.5 text-xs text-subtle">{item.org}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
