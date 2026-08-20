"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export type BrandStripProps = {
  brands: string[];
};

export default function BrandStrip({ brands }: BrandStripProps) {
  return (
    <Reveal variant="fade-up" delay={80} className="overflow-hidden bg-primary">
      <Container className="mx-auto grid w-full grid-cols-2 items-center justify-center gap-4 py-4 sm:grid-cols-4 sm:gap-6">
        <img src="/hero-logo-1.webp" alt="Amazon" className="mx-auto w-full max-w-36 sm:max-w-44" />
        <img src="/hero-logo-2.webp" alt="Amazon" className="mx-auto w-full max-w-36 sm:max-w-44" />
        <img src="/hero-logo-3.webp" alt="Amazon" className="mx-auto w-full max-w-36 sm:max-w-44" />
        <img src="/hero-logo-4.webp" alt="Amazon" className="mx-auto w-full max-w-36 sm:max-w-44" />
      </Container>
    </Reveal>
  );
}
