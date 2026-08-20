"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export type PortfolioGridItem = {
  src: string;
  alt: string;
};

export type PortfolioGridProps = {
  items: PortfolioGridItem[];
};

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <section className="bg-white py-14 max-sm:py-10 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={item.src}
              variant="fade-up"
              delay={60 + index * 50}
            >
              <div className="overflow-hidden rounded-sm">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] motion-reduce:transform-none"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
