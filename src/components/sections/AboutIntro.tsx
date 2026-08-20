"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export type AboutIntroProps = {
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
};

export default function AboutIntro({
  title,
  paragraphs,
  imageSrc,
  imageAlt,
}: AboutIntroProps) {
  return (
    <section className="bg-white pb-14 pt-10 max-sm:pb-10 max-sm:pt-6 lg:pb-16 lg:pt-14">
      <Container className="grid items-center gap-8 max-sm:gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-5 max-sm:gap-4">
          <Reveal variant="fade-up">
            <h1 className="font-heading text-section-heading text-primary max-sm:!text-3xl">
              {title}
            </h1>
          </Reveal>

          <div className="flex flex-col gap-4 max-sm:gap-3">
            {paragraphs.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                variant="fade-up"
                delay={80 + index * 70}
              >
                <p className="text-body max-w-xl text-foreground/75">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="scale" delay={140}>
          <div className="overflow-hidden rounded-2xl max-sm:rounded-xl shadow-lg shadow-black/20 transition-shadow duration-500 hover:shadow-xl hover:shadow-black/30">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] motion-reduce:transform-none"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
