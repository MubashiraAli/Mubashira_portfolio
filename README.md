# Mubashira P — Portfolio

Personal portfolio site built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Structure

| Path | Purpose |
| --- | --- |
| `data/resume.ts` | **All site content** — profile, skills, experience, projects, education, achievements. Edit here, not in components. |
| `app/layout.tsx` | Document shell, SEO metadata, Google Fonts |
| `app/globals.css` | Theme tokens, card/reveal/orb utilities, animations |
| `app/page.tsx` | Section composition |
| `components/` | Nav, Hero, Marquee, About, Skills, Experience, Projects, Education, Contact, Footer |
| `components/SpotlightCard.tsx` | Card surface with cursor-tracked glow + optional 3D tilt |
| `components/CommandPalette.tsx` | Ctrl/Cmd+K quick nav and actions |
| `components/Reveal.tsx` | Scroll-into-view reveal, `from="up\|left\|right\|scale\|blur"` |
| `public/MubashiraP_resume.pdf` | Downloadable resume, linked from the nav and hero (`profile.resume`) |

## Theming

Light is the base palette; dark overrides the same token names. Every component is
written once against semantic tokens (`bg`, `surface`, `fg`, `muted`, `subtle`,
`hairline`, `brand`, `ok`) exposed to Tailwind through `@theme inline`, so both themes
follow automatically — there are no hardcoded colours in components.

Three layers decide the theme, in order: `:root` (light) → `@media (prefers-color-scheme: dark)`
guarded by `:root:not([data-theme="light"])` (system dark) → `:root[data-theme="dark"]`
(explicit choice, wins either way). A small blocking script in `app/layout.tsx` applies a
stored choice before first paint, so there is no flash of the wrong palette.
`ThemeToggle` also follows the OS while no explicit choice has been made.

**Do not use Tailwind's `dark:` variant here** — it keys off `prefers-color-scheme` and
will not follow the `data-theme` attribute. Add a token instead.

## Layout

Sections are laid out on a `.bento` grid — 2 columns on mobile, 6 at `md`, 12 at `lg` —
with children setting their own spans, so cells are deliberately uneven rather than a
uniform card grid. Headline sizes come from the `display-xl` / `display-lg` /
`display-md` utilities, which clamp against the viewport, plus `label` and `numeral`.

## Interaction layer

| Feature | Where |
| --- | --- |
| Light / dark toggle in the nav, plus a "Toggle light / dark theme" palette command | `ThemeToggle.tsx` |
| Command palette (`Ctrl`/`Cmd` + `K`) — jump to any section, copy email, download resume, toggle theme, open socials. Arrow keys + Enter, Esc to close. | `CommandPalette.tsx` |
| Cursor-tracked card glow and 3D tilt — driven by `--mx/--my/--rx/--ry` CSS vars written on `requestAnimationFrame`, so pointer movement never re-renders React | `SpotlightCard.tsx`, `.card-glow` / `.card-tilt` |
| Scroll progress bar across the top of the viewport | `ScrollProgress.tsx` |
| Sliding nav pill that follows the active section (re-measured on resize and after web fonts load) | `Nav.tsx` |
| Count-up stat numbers on scroll into view (non-numeric values render verbatim) | `CountUp.tsx` |
| Copy-email button with confirmation and failure state | `CopyEmail.tsx` |
| Staggered hero entrance, animated gradient text, cursor-following hero glow, scroll hint | `Hero.tsx`, `.enter` / `.text-gradient-anim` |
| Back-to-top button past 700px, marquee pauses on hover, sheen sweep on chips and buttons, film-grain overlay | `BackToTop.tsx`, `.marquee-wrap`, `.sheen`, `Grain.tsx` |

Every animation is disabled under `prefers-reduced-motion: reduce` (see the bottom of
`app/globals.css`). Tilt is also skipped for touch pointers, where there is no hover.

## Updating content

Everything on the page reads from `data/resume.ts`. To add a project, append to the
`projects` array — `accent` is a Tailwind gradient pair used for the card badge and top rule.

### Project demo / source buttons

Each project supports two optional fields, `demo` and `repo`. Fill either one in and the
matching button appears on that card; leave it out and the card renders without it. Each
project currently has both lines commented out as placeholders — replace the URL and
uncomment.

```ts
{
  name: "LearnHub",
  // ...
  demo: "https://learnhub.vercel.app",              // renders a "Live demo" button
  repo: "https://github.com/MubashiraAli/learnhub", // renders a "Source" button
}
```

Both open in a new tab. The commented URLs are guesses, not real links — replace them
with your actual deployments before uncommenting.

## Deploy

Push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new), deploy.
No environment variables required.
