import { experience } from "@/data/resume";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="03 — Experience"
          title="Where I've built things"
          description="From backend modules as an intern, to independent client delivery, to AI-powered healthcare software with a product team."
        />

        <ol className="mt-12 space-y-3">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.role + job.company} delay={i * 90} from="right">
              <SpotlightCard className="p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-12">
                  {/* Editorial left rail: big index + period */}
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-4">
                      <span className="numeral text-5xl font-bold text-hairline-strong sm:text-6xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {job.current ? (
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-70" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                        </span>
                      ) : null}
                    </div>
                    <p className="label mt-4 text-subtle">{job.period}</p>
                    <h3 className="display-md mt-3">{job.role}</h3>
                    <p className="mt-2 text-sm text-brand">{job.company}</p>
                    <span
                      className={`mt-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        job.current
                          ? "bg-ok/12 text-ok"
                          : "bg-surface-2 text-subtle"
                      }`}
                    >
                      {job.type}
                    </span>
                  </div>

                  <div className="lg:col-span-8">
                    <ul className="space-y-3">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="group/point flex gap-3 text-sm leading-relaxed text-muted transition-colors hover:text-fg"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand transition-transform group-hover/point:scale-150" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                      {job.stack.map((tech) => (
                        <li
                          key={tech}
                          className="sheen rounded-md bg-surface-2 px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-subtle"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
