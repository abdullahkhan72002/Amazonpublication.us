"use client";

import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import LeadForm, { type LeadFormProps } from "@/components/ui/LeadForm";
import Reveal from "@/components/ui/Reveal";

export type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  badges: string[];
  phone: string;
  phoneHref: string;
  secondaryCta: { label: string; href: string };
  form: LeadFormProps;
  /** Home uses 120px; service pages use 80px for the highlighted title */
  titleSize?: "default" | "service";
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  paragraphs,
  phone,
  phoneHref,
  secondaryCta,
  form,
  titleSize = "default",
}: HeroProps) {
  const titleClass =
    titleSize === "service" ? "text-hero-display-service" : "text-hero-display";

  return (
    <section className="overflow-hidden bg-white pb-16 pt-10 lg:pt-14">
      <Container className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
        <Reveal variant="fade-right" className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-0">
            <p className="text-hero-mini text-foreground">{eyebrow}</p>
            <h1 className={`${titleClass} mb-2 text-primary`}>{title}</h1>
            <p className="text-hero-mini text-foreground">{subtitle}</p>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body max-w-xl text-foreground/75">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <img src="/googlenew.png" alt="Google Reviews" className="w-40" />
            <img src="/reviewnew.png" alt="Reviews.io" className="w-40" />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              href={phoneHref}
              variant="secondary-dark"
              icon={<Phone className="size-4" aria-hidden />}
            >
              {phone}
            </Button>
            <Button href={secondaryCta.href} variant="secondary-dark">
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal variant="fade-left" delay={120} className="min-w-0">
          <LeadForm {...form} variant="onDark" className="w-full min-w-0 lg:mt-2" />
        </Reveal>
      </Container>
    </section>
  );
}
