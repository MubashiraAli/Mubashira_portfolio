import { profile } from "@/data/resume";
import Reveal from "./Reveal";
import RowGlyph, { type GlyphVariant } from "./RowGlyph";
import ScrollRail from "./ScrollRail";
import ScrollText from "./ScrollText";
import SectionHeading from "./SectionHeading";

const HIGHLIGHTS: {
  index: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
}[] = [
  {
    index: "01",
    title: "AI-driven product work",
    body: "Integrating AI-powered features into a Hospital Information System, and shipping a Gemini-backed shopping assistant in production.",
    glyph: "ai",
  },
  {
    index: "02",
    title: "End-to-end ownership",
    body: "React and Next.js interfaces, Django and Node.js services, MySQL and PostgreSQL schemas, and the REST APIs between them.",
    glyph: "stack",
  },
  {
    index: "03",
    title: "Ships with a team",
    body: "Daily work in Git, Docker and Postman with cross-functional teams, plus 5+ freelance projects delivered solo from brief to launch.",
    glyph: "team",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="01 — About"
          title="What I build, and how I work"
        />

        {/* Summary as editorial type that lights up while you scroll it */}
        <div className="mt-14 lg:pl-[16.66%]">
          <ScrollText
            text={profile.summary}
            className="max-w-4xl text-xl leading-[1.45] tracking-tight text-fg sm:text-3xl sm:leading-[1.35]"
          />
        </div>

        {/* Index rows on a rail that fills as you scroll through them */}
        <ScrollRail className="mt-20">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 110} from="left">
              <div className="group relative grid gap-4 border-b border-hairline py-9 pl-7 md:grid-cols-12 md:gap-6 md:pl-12">
                {/* Node sitting on the rail */}
                <span
                  className="absolute left-0 top-12 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-hairline-strong bg-bg transition-all duration-500 group-hover:scale-150 group-hover:border-brand group-hover:bg-brand"
                  aria-hidden="true"
                />
                {/* Accent rule that draws across the row on hover */}
                <span
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-700 ease-out group-hover:w-full"
                  aria-hidden="true"
                />

                <div className="flex items-center gap-4 md:col-span-2">
                  <span className="numeral text-sm text-subtle transition-colors duration-300 group-hover:text-brand">
                    {item.index}
                  </span>
                  <span
                    className="glyph-float block"
                    style={{ animationDelay: `${-i * 1.4}s` }}
                  >
                    <RowGlyph variant={item.glyph} />
                  </span>
                </div>

                <h3 className="display-md transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:col-span-4">
                  {item.title}
                </h3>

                <p className="text-base leading-relaxed text-muted transition-colors duration-300 group-hover:text-fg md:col-span-6">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
