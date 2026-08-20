"use client";

import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export type PublishingServicesProps = {
  titleLines: string[];
  paragraphs: string[];
  imageLabel: string;
  primaryCta: { label: string; href: string };
  phone: string;
  phoneHref: string;
};

export default function PublishingServices({
  titleLines,
  paragraphs,
  primaryCta,
  phone,
  phoneHref,
}: PublishingServicesProps) {
  return (
    <section className="overflow-hidden bg-white pt-20">
      <Reveal variant="fade-up">
        <div className="heading-band">
          <Container className="py-8 max-sm:py-4">
            <h2 className="text-section-heading text-white max-sm:text-2xl!">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Container>
        </div>
      </Reveal>

      <Container className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <Reveal variant="fade-right" className="flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body max-w-xl text-foreground/75">
              {paragraph}
            </p>
          ))}

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Button href={primaryCta.href} variant="primary-light">
              {primaryCta.label}
            </Button>
            <Button
              href={phoneHref}
              variant="secondary-light"
              icon={<Phone className="size-4" aria-hidden />}
            >
              {phone}
            </Button>
          </div>
        </Reveal>

        <Reveal variant="fade-left" delay={120}>
          <img
            src="/publishing-services-image.webp"
            alt="Publishing Services"
            className="w-full"
          />
        </Reveal>
      </Container>
    </section>
  );
}
