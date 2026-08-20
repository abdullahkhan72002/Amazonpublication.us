"use client";

import Container from "@/components/ui/Container";
import LeadForm, { type LeadFormProps } from "@/components/ui/LeadForm";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export type GetInTouchProps = {
  title: string;
  highlight?: string;
  subtitle?: string;
  imageLabel: string;
  form: LeadFormProps;
  formSource?: string;
};

export default function GetInTouch({
  title,
  highlight,
  subtitle,
  imageLabel,
  form,
  formSource,
}: GetInTouchProps) {
  return (
    <section id="contact" className="overflow-hidden bg-white py-16 lg:py-20">
      <Container className="flex flex-col gap-12">
        <Reveal variant="fade-up">
          <SectionHeading
            title={title}
            highlight={highlight}
            subtitle={subtitle}
            tone="onLight"
          />
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="fade-right">
            <img src="/get-in-touch-image.webp" alt="Get In Touch" className="w-full" />
          </Reveal>
          <Reveal variant="fade-left" delay={120}>
            <LeadForm
              {...form}
              formSource={formSource ?? form.formSource}
              variant="card"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
