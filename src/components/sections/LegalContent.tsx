import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] };

export type LegalContentProps = {
  blocks: LegalBlock[];
};

const CONTACT_LINK_CLASS =
  "text-primary font-medium underline-offset-2 hover:underline";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function LinkedLegalText({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${escapeRegExp(site.email)}|${escapeRegExp(site.phone)})`,
    "g",
  );
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const value = match[0];
    const href = value.includes("@") ? `mailto:${value}` : site.phoneHref;
    nodes.push(
      <a key={`contact-${key++}`} href={href} className={CONTACT_LINK_CLASS}>
        {value}
      </a>,
    );
    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes.length > 0 ? nodes : text}</>;
}

export default function LegalContent({ blocks }: LegalContentProps) {
  return (
    <section className="bg-white py-14 max-sm:py-10 lg:py-20">
      <Container className="max-w-3xl">
        <div className="flex flex-col gap-6 max-sm:gap-5">
          {blocks.map((block, index) => {
            const key = `${block.type}-${index}`;

            if (block.type === "heading") {
              return (
                <h2
                  key={key}
                  className="font-heading text-2xl font-semibold text-foreground max-sm:text-xl pt-2"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "subheading") {
              return (
                <h3
                  key={key}
                  className="font-heading text-lg font-semibold text-foreground max-sm:text-base"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.type === "list") {
              return (
                <ul
                  key={key}
                  className="flex list-disc flex-col gap-2 pl-5 text-body text-foreground/80"
                >
                  {block.items.map((item) => (
                    <li key={item}>
                      <LinkedLegalText text={item} />
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={key} className="text-body text-foreground/80">
                <LinkedLegalText text={block.text} />
              </p>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
