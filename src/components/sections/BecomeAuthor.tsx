"use client";

import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export type BecomeAuthorProps = {
  title: string;
  highlight?: string;
  paragraphs: string[];
  imageLabel: string;
  phone: string;
  phoneHref: string;
  primaryCta: { label: string; href: string };
};

export default function BecomeAuthor({
  title,
  highlight,
  paragraphs,
  phone,
  phoneHref,
  primaryCta,
}: BecomeAuthorProps) {
  return (
    <section className="overflow-hidden bg-primary py-14 lg:py-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal variant="fade-right" className="flex flex-col gap-5">
            <SectionHeading
              title={title}
              highlight={highlight}
              align="left"
              className="gap-2"
              titleClassName="max-sm:!text-2xl"
            />

            <div className="flex flex-col gap-3">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-body text-white/75">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                href={phoneHref}
                variant="secondary-dark"
                icon={<Phone className="size-4" aria-hidden />}
              >
                {phone}
              </Button>
              <Button href={primaryCta.href} variant="secondary-dark">
                {primaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal variant="fade-left" delay={120}>
            <img
              src="/become-author-image.webp"
              alt="Become Author"
              className="w-full"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
