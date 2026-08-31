import { profile } from "@/data/resume";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="container-x flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-sm text-subtle">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js
          &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-subtle transition-colors hover:border-brand/45 hover:text-brand"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-subtle transition-colors hover:border-brand/45 hover:text-brand"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-subtle transition-colors hover:border-brand/45 hover:text-brand"
          >
            <MailIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
