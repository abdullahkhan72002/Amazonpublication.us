"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
};

export type ServicesProps = {
  title: string;
  highlight?: string;
  subtitle?: string;
  readMoreLabel: string;
  items: ServiceItem[];
};

export default function Services({
  title,
  highlight,
  subtitle,
  readMoreLabel,
  items,
}: ServicesProps) {
  return (
    <section id="services" className="overflow-hidden bg-primary py-16 lg:py-20">
      <Container className="flex flex-col gap-12">
        <Reveal variant="fade-up">
          <SectionHeading
            title={title}
            highlight={highlight}
            subtitle={subtitle}
            titleClassName="max-sm:text-3xl!"
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              variant="fade-up"
              delay={index * 80}
              className="h-full"
            >
              <article
                className="flex h-full flex-col items-start gap-4 rounded-[2.5rem] bg-secondary p-6"
              >
                <h3 className="font-heading text-[30px] font-semibold leading-tight text-white">
                  {item.title}
                </h3>
                <p className="text-body flex-1 font-light text-white">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="btn-sweep btn-sweep-primary-light mt-auto inline-flex rounded-full px-6 py-3 text-btn"
                >
                  {readMoreLabel}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
