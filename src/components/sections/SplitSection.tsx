"use client";

import {
  AtSign,
  Baby,
  Bolt,
  BookOpen,
  Calendar,
  ClipboardList,
  Eye,
  Headset,
  HeartPulse,
  MousePointerClick,
  Phone,
  PhoneCall,
  Rocket,
  Sparkles,
  Theater,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export type SplitSectionContact = {
  kind: "phone" | "email";
  title: string;
  value: string;
  href: string;
};

export type SplitSectionCta = {
  label: string;
  href: string;
  icon?: "calendar";
};

export type SplitSectionProps = {
  title: string;
  highlight?: string;
  paragraphs?: string[];
  features?: string[];
  imageSrc: string;
  imageAlt: string;
  tone?: "onDark" | "onLight";
  imagePosition?: "left" | "right";
  roundedImage?: boolean;
  phone?: string;
  phoneHref?: string;
  primaryCta?: SplitSectionCta;
  contacts?: SplitSectionContact[];
  cta?: { label: string; href: string };
};

export default function SplitSection({
  title,
  highlight,
  paragraphs = [],
  features = [],
  imageSrc,
  imageAlt,
  tone = "onLight",
  imagePosition = "left",
  roundedImage = false,
  phone,
  phoneHref,
  primaryCta,
  contacts,
  cta,
}: SplitSectionProps) {
  const isDark = tone === "onDark";
  const sectionBg = isDark ? "bg-primary" : "bg-white";
  const paragraphColor = isDark ? "text-white/75" : "text-primary/75";
  const headingTone = isDark ? "onDark" : "onLight";
  const imageRevealVariant =
    imagePosition === "left" ? "fade-left" : "fade-right";
  const contentRevealVariant =
    imagePosition === "left" ? "fade-right" : "fade-left";
  const paragraphBaseDelay = 80;
  const featuresBaseDelay = paragraphBaseDelay + paragraphs.length * 70;
  const actionBaseDelay = featuresBaseDelay + features.length * 50;
  const imageRadius = roundedImage
    ? "rounded-3xl max-sm:rounded-2xl"
    : "rounded-2xl max-sm:rounded-xl";

  const image = (
    <Reveal variant={imageRevealVariant} delay={120}>
      <div
        className={`overflow-hidden ${imageRadius} transition-shadow duration-500 hover:shadow-xl `}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] motion-reduce:transform-none"
        />
      </div>
    </Reveal>
  );

  const content = (
    <div className="flex flex-col gap-5 max-sm:gap-4">
      <Reveal variant={contentRevealVariant}>
        <SectionHeading
          title={title}
          highlight={highlight}
          align="left"
          tone={headingTone}
          className="gap-2"
          titleClassName="max-sm:!text-2xl"
        />
      </Reveal>

      {paragraphs.length > 0 ? (
        <div className="flex flex-col gap-3 max-sm:gap-2.5">
          {paragraphs.map((paragraph, index) => (
            <Reveal
              key={paragraph}
              variant="fade-up"
              delay={paragraphBaseDelay + index * 70}
            >
              <p className={`text-body max-w-xl ${paragraphColor}`}>
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      ) : null}

      {features.length > 0 ? (
        <ul className="flex flex-col gap-3 max-sm:gap-2.5">
          {features.map((feature, index) => (
            <Reveal
              key={feature}
              variant="fade-up"
              delay={featuresBaseDelay + index * 50}
            >
              <li className="flex items-center gap-3">
                <MousePointerClick
                  className="size-5 shrink-0 text-secondary"
                  aria-hidden
                />
                <span className={`text-body ${paragraphColor}`}>{feature}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      ) : null}

      {phone && phoneHref && primaryCta ? (
        <Reveal variant="fade-up" delay={actionBaseDelay}>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href={phoneHref}
              variant="secondary-dark"
              icon={<Phone className="size-4" aria-hidden />}
              className="max-sm:w-full"
            >
              {phone}
            </Button>
            <Button
              href={primaryCta.href}
              variant="secondary-dark"
              icon={
                primaryCta.icon === "calendar" ? (
                  <Calendar className="size-4" aria-hidden />
                ) : undefined
              }
              className="max-sm:w-full"
            >
              {primaryCta.label}
            </Button>
          </div>
        </Reveal>
      ) : null}

      {contacts && contacts.length > 0 ? (
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
          {contacts.map((contact, index) => (
            <Reveal
              key={contact.value}
              variant="fade-up"
              delay={actionBaseDelay + index * 80}
            >
              <a
                href={contact.href}
                className="group flex items-center gap-3 transition-transform duration-300 hover:translate-x-1 motion-reduce:transform-none"
              >
                <span
                  className={`flex size-11 max-sm:size-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isDark
                      ? "border-white/20 text-white group-hover:border-secondary group-hover:text-secondary"
                      : "border-primary/15 text-primary group-hover:border-secondary group-hover:text-secondary"
                  }`}
                >
                  {contact.kind === "phone" ? (
                    <PhoneCall className="size-5 max-sm:size-4" aria-hidden />
                  ) : (
                    <AtSign className="size-5 max-sm:size-4" aria-hidden />
                  )}
                </span>
                <span className="flex flex-col">
                  <span
                    className={`font-heading text-lg max-sm:text-base font-semibold ${
                      isDark ? "text-white" : "text-primary"
                    }`}
                  >
                    {contact.title}
                  </span>
                  <span
                    className={`text-nav transition-colors duration-300 ${
                      isDark
                        ? "text-white/70 group-hover:text-secondary"
                        : "text-primary/70 group-hover:text-secondary"
                    }`}
                  >
                    {contact.value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      ) : null}

      {cta ? (
        <Reveal
          variant="fade-up"
          delay={
            contacts
              ? actionBaseDelay + contacts.length * 80
              : actionBaseDelay
          }
        >
          <Button
            href={cta.href}
            variant="primary-light"
            className="max-sm:w-full"
          >
            {cta.label}
          </Button>
        </Reveal>
      ) : null}
    </div>
  );

  return (
    <section className={`overflow-hidden ${sectionBg} py-14 max-sm:py-10 lg:py-16`}>
      <Container>
        <div className="grid items-center gap-8 max-sm:gap-6 lg:grid-cols-2 lg:gap-10">
          {imagePosition === "left" ? (
            <>
              {image}
              {content}
            </>
          ) : (
            <>
              {content}
              {image}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
