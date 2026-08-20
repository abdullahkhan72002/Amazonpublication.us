"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] };

export type LegalContentProps = {
  blocks: LegalBlock[];
};

export default function LegalContent({ blocks }: LegalContentProps) {
  return (
    <section className="bg-white py-14 max-sm:py-10 lg:py-20">
      <Container className="max-w-3xl">
        <Reveal variant="fade-up">
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
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={key} className="text-body text-foreground/80">
                  {block.text}
                </p>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
