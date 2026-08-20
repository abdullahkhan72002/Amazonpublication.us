"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { HighlightedText } from "@/components/ui/SectionHeading";

export type PageHeroProps = {
  title: string;
  highlight?: string;
  description?: string;
};

export default function PageHero({
  title,
  highlight,
  description,
}: PageHeroProps) {
  return (
    <section className="bg-white pb-16 pt-12 max-sm:pb-12 max-sm:pt-8 lg:pb-24 lg:pt-16">
      <Container className="flex flex-col items-center gap-6 max-sm:gap-4 text-center">
        <Reveal variant="fade-up">
          <h1 className="font-heading text-section-heading text-7xl! text-foreground max-sm:!text-3xl">
            <HighlightedText
              text={title}
              highlight={highlight}
              highlightClassName="text-primary"
            />
          </h1>
        </Reveal>

        {description ? (
          <Reveal variant="fade-up" delay={100}>
            <p className="text-body mx-auto max-w-3xl text-foreground/75 max-sm:px-2">
              {description}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
