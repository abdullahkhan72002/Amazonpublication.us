"use client";

import { BookOpen, ClipboardList, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { HighlightedText } from "@/components/ui/SectionHeading";

export type WhyChooseIcon = "book" | "clipboard" | "headset";

export type WhyChooseItem = {
  title: string;
  highlight?: string;
  description: string;
  icon: WhyChooseIcon;
};

export type WhyChooseProps = {
  title: string;
  highlight?: string;
  subtitle?: string;
  items: WhyChooseItem[];
};

const iconMap: Record<WhyChooseIcon, LucideIcon> = {
  book: BookOpen,
  clipboard: ClipboardList,
  headset: Headset,
};

export default function WhyChoose({
  title,
  highlight,
  subtitle,
  items,
}: WhyChooseProps) {
  return (
    <section className="overflow-hidden bg-white py-14 max-sm:py-10 lg:py-20">
      <Container className="flex flex-col gap-10 max-sm:gap-8">
        <Reveal variant="fade-up">
          <SectionHeading
            title={title}
            highlight={highlight}
            subtitle={subtitle}
            tone="onLight"
            className="max-w-3xl! mx-auto"
            titleClassName="max-sm:!text-2xl"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <Reveal
                key={item.title}
                variant="fade-up"
                delay={80 + index * 80}
                className="h-full"
              >
                <article
                  className="flex h-full flex-col gap-5 rounded-3xl bg-primary p-6 max-sm:p-5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none"
                >
                  <span
                    className="flex size-12 items-center justify-center rounded-xl bg-secondary text-white"
                    aria-hidden
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-heading text-2xl font-semibold leading-tight text-white max-sm:text-xl">
                    <HighlightedText text={item.title} highlight={item.highlight} />
                  </h3>
                  <p className="text-body text-white/75">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
