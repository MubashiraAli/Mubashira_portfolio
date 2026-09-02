import { projects } from "@/data/resume";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
import { ExternalLinkIcon, GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="04 — Projects"
          title="Selected work"
          description="Full-stack products I designed and built — AI assistants, competition and booking platforms, cloud-deployed apps and machine learning experiments."
        />

        {/*
          Each card pins 1.1rem lower than the previous one, so scrolling down
          piles them on top of each other with the earlier cards' accent edges
          still visible above.
        */}
        <div className="mt-12">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="stack-card pb-4"
              style={{ top: `calc(6rem + ${(i * 1.1).toFixed(2)}rem)` }}
            >
            <Reveal from="up">
              <SpotlightCard
                as="article"
                tilt
                strength={3}
                className="card-solid group p-6 sm:p-8"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${project.accent}`}
                  aria-hidden="true"
                />

                <div className="grid gap-7 lg:grid-cols-12 lg:gap-10">
                  {/* Identity */}
                  <div className="seq lg:col-span-4">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${project.accent} font-[family-name:var(--font-display)] text-xl font-bold text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                        aria-hidden="true"
                      >
                        {project.name.charAt(0)}
                      </span>
                      <span className="numeral text-4xl font-bold text-hairline-strong sm:text-5xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                      {project.name}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-muted">
                      {project.blurb}
                    </p>
                  </div>

                  {/* Detail */}
                  <div className="seq lg:col-span-8">
                    <ul className="space-y-2.5">
                      {project.points.map((point) => (
                        <li
                          key={point}
                          className="group/point flex gap-3 text-sm leading-relaxed text-subtle transition-colors hover:text-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand/70 transition-transform group-hover/point:scale-150" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="sheen rounded-md bg-surface-2 px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-subtle"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {project.demo || project.repo ? (
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {project.demo ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="sheen group/btn inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
                          >
                            Live demo
                            <ExternalLinkIcon className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                          </a>
                        ) : null}
                        {project.repo ? (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-brand/45 hover:text-brand"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            Source
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
