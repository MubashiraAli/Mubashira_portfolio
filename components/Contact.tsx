import { profile } from "@/data/resume";
import CopyEmail from "./CopyEmail";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import {
  ArrowIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./Icons";

export default function Contact() {
  const links = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <MailIcon className="h-5 w-5" />,
    },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
      icon: <PhoneIcon className="h-5 w-5" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/mubashirap2",
      href: profile.linkedin,
      icon: <LinkedinIcon className="h-5 w-5" />,
    },
    {
      label: "GitHub",
      value: "github.com/MubashiraAli",
      href: profile.github,
      icon: <GithubIcon className="h-5 w-5" />,
    },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div
        className="orb left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 bg-brand-2/18"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <div className="bento">
          {/* Oversized editorial CTA */}
          <Reveal className="col-span-2 md:col-span-6 lg:col-span-8">
            <SpotlightCard className="flex h-full flex-col justify-between p-6 sm:p-9">
              <p className="label text-brand">06 — Contact</p>
              <div className="mt-10">
                <h2 className="display-xl">
                  <span className="line-mask">
                    <span>Let&apos;s build</span>
                  </span>
                  <span className="line-mask">
                    <span className="text-gradient-anim">something</span>
                  </span>
                </h2>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Open to full-stack engineering roles, AI integration work and
                  freelance projects. The fastest way to reach me is email — I
                  reply to everything.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="sheen group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
                  >
                    {profile.email}
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <CopyEmail className="py-3.5" />
                </div>
                <p className="mt-7 inline-flex items-center gap-2 text-sm text-subtle">
                  <PinIcon className="h-4 w-4" />
                  Based in {profile.location}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Contact channels stack beside the CTA */}
          <div className="col-span-2 grid gap-3 md:col-span-6 lg:col-span-4">
            {links.map((link, i) => (
              <Reveal key={link.label} delay={i * 80} from="scale">
                <SpotlightCard tilt strength={4} className="h-full">
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group/link flex items-center gap-4 p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline bg-surface-2 text-brand transition-transform duration-300 group-hover/link:scale-110">
                      {link.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="label block text-subtle">
                        {link.label}
                      </span>
                      <span className="mt-1 block truncate text-sm text-fg">
                        {link.value}
                      </span>
                    </span>
                    <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-transparent transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:text-brand" />
                  </a>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
