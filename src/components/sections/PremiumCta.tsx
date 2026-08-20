"use client";

import { AtSign, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { HighlightedText } from "@/components/ui/SectionHeading";

export type PremiumCtaContact = {
  kind: "phone" | "email";
  title: string;
  value: string;
  href: string;
};

export type PremiumCtaProps = {
  bandWord: string;
  title: string;
  highlight?: string;
  paragraph: string;
  imageLabel: string;
  contacts: PremiumCtaContact[];
  cta: { label: string; href: string };
};

export default function PremiumCta({
  bandWord,
  title,
  highlight,
  paragraph,
  contacts,
  cta,
}: PremiumCtaProps) {
  return (
    <section className="overflow-hidden bg-white py-14 lg:py-16">
      <Container className="grid items-start gap-8 lg:grid-cols-2 lg:gap-0">
        <Reveal variant="fade-right" className="z-20">
          <img
            src="/premium-sec-image.webp"
            alt="Premium book publishing services"
            className="relative z-20 w-full"
          />
        </Reveal>

        <div className="flex flex-col">
          <Reveal variant="fade-left" delay={80}>
            <div className="relative z-0 mt-1 bg-secondary py-3 pl-6 sm:pl-8 lg:-ml-28 lg:-mr-[50vw] lg:pl-32 lg:pr-[50vw]">
              <span className="font-heading text-5xl font-bold text-white sm:text-8xl">
                {bandWord}
              </span>
            </div>
          </Reveal>

          <Reveal variant="fade-left" delay={140} className="flex flex-col gap-6 pt-6 lg:pl-8">
            <h2 className="text-section-heading text-primary">
              <HighlightedText text={title} highlight={highlight} />
            </h2>

            <p className="text-body max-w-xl text-primary/75">{paragraph}</p>

            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {contacts.map((contact) => (
                <a
                  key={contact.value}
                  href={contact.href}
                  className="group flex items-center gap-3"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors group-hover:border-secondary group-hover:text-secondary">
                    {contact.kind === "phone" ? (
                      <PhoneCall className="size-5" aria-hidden />
                    ) : (
                      <AtSign className="size-5" aria-hidden />
                    )}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-heading text-lg font-semibold text-primary">
                      {contact.title}
                    </span>
                    <span className="text-nav text-primary/70 transition-colors group-hover:text-secondary">
                      {contact.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <Button href={cta.href} variant="primary-light">
              {cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
