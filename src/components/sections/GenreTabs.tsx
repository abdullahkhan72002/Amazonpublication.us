"use client";

import {
  Baby,
  Bolt,
  BookOpen,
  Eye,
  HeartPulse,
  Phone,
  Rocket,
  Sparkles,
  Theater,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GenreTabIcon, GenreTabItem } from "@/data/genreTabs";

export type GenreTabsProps = {
  title: string;
  highlight?: string;
  tabs: GenreTabItem[];
  phone: string;
  phoneHref: string;
  backgroundImage?: string;
};

const tabIconMap: Record<GenreTabIcon, LucideIcon> = {
  bolt: Bolt,
  baby: Baby,
  sparkles: Sparkles,
  eye: Eye,
  theater: Theater,
  book: BookOpen,
  rocket: Rocket,
  heart: HeartPulse,
};

export default function GenreTabs({
  title,
  highlight,
  tabs,
  phone,
  phoneHref,
  backgroundImage,
}: GenreTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (!activeTab) return null;

  return (
    <section className="relative overflow-hidden bg-primary py-14 max-sm:py-10 lg:py-20">
      {backgroundImage ? (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 bg-primary/80" aria-hidden />

      <Container className="relative z-10 flex flex-col gap-10 max-sm:gap-8">
        <Reveal variant="fade-up">
          <SectionHeading
            title={title}
            highlight={highlight}
            tone="onDark"
            className="max-w-3xl! mx-auto"
            titleClassName="max-sm:!text-2xl"
          />
        </Reveal>

        <Reveal variant="fade-up" className="w-full" delay={80}>
          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 scrollbar-none max-sm:gap-2 w-full justify-center">
            {tabs.map((tab) => {
              const Icon = tabIconMap[tab.icon];
              const isActive = tab.id === activeId;

              return ( 
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  className={`cursor-pointer flex flex-1 w-full flex-col items-center gap-2 rounded-lg border px-4 py-3 transition-colors duration-300 ${
                    isActive
                      ? "border-white bg-white text-primary"
                      : "border-white/40 bg-transparent text-white hover:border-white"
                  }`}
                >
                  <Icon className="size-10 max-sm:size-5" aria-hidden />
                  <span className="text-nav font-normal">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid items-center gap-8 max-sm:gap-6 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="fade-right" className="flex flex-col gap-5 max-sm:gap-4">
            <h3 className="font-heading text-4xl font-bold uppercase tracking-wide text-white max-sm:text-3xl">
              {activeTab.title}
            </h3>
            <p className="text-body max-w-xl text-white/75">{activeTab.description}</p>
            <Button
              href={phoneHref}
              variant="white"
              icon={<Phone className="size-4" aria-hidden />}
              className="max-sm:w-full"
            >
              {phone}
            </Button>
          </Reveal>

          <Reveal variant="fade-left" delay={120}>
            <div className="mx-auto w-1/2 max-w-sm overflow-hidden transition-transform duration-500 hover:scale-[1.02] motion-reduce:transform-none">
              <img
                src={activeTab.imageSrc}
                alt={activeTab.imageAlt}
                className="w-full"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
