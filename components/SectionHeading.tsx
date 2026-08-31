import { Fragment } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const words = title.split(" ");

  return (
    <Reveal className="max-w-3xl">
      <p className="label text-brand">{eyebrow}</p>
      <div className="heading-rule mt-3" aria-hidden="true" />
      <h2 className="display-lg mt-5">
        {/*
          Each word animates in its own inline-block span, but the space
          between them is a real text node — margins alone would look right
          while breaking copy/paste and screen-reader output.
        */}
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              className="word"
              style={{ transitionDelay: `${140 + i * 55}ms` }}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
