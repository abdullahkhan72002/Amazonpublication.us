import type { ReactNode } from "react";

type HighlightedTextProps = {
  text: string;
  highlight?: string;
  highlightClassName?: string;
};

/** Renders `text` with the first occurrence of `highlight` painted in the accent color. */
export function HighlightedText({
  text,
  highlight,
  highlightClassName = "text-primary",
}: HighlightedTextProps) {
  if (!highlight) return <>{text}</>;

  const start = text.indexOf(highlight);
  if (start === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, start)}
      <span className={highlightClassName}>{highlight}</span>
      {text.slice(start + highlight.length)}
    </>
  );
}

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string | ReactNode;
  highlight?: string;
  subtitle?: string;
  tone?: "onDark" | "onLight";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  tone = "onDark",
  align = "center",
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  const isDark = tone === "onDark";
  const titleColor = isDark ? "text-white" : "text-foreground";
  const subtitleColor = isDark ? "text-white/70" : "text-foreground/70";
  const highlightColor = isDark ? "text-white" : "text-primary";
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? (
        <p
          className={`text-nav uppercase tracking-[0.2em] ${
            isDark ? "text-white/80" : "text-primary"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-section-heading ${titleColor} ${titleClassName}`}
      >
        {typeof title === "string" ? (
          <HighlightedText
            text={title}
            highlight={highlight}
            highlightClassName={highlightColor}
          />
        ) : (
          title
        )}
      </h2>
      {subtitle ? (
        <p className={`text-body max-w-3xl ${subtitleColor}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
