"use client";

import Container from "@/components/ui/Container";
import LeadForm, { type LeadFormProps } from "@/components/ui/LeadForm";
import Reveal from "@/components/ui/Reveal";

export type ContactFormSectionProps = {
  form: LeadFormProps;
};

export default function ContactFormSection({ form }: ContactFormSectionProps) {
  return (
    <section className="bg-white py-14 max-sm:py-10 lg:py-20">
      <Container className="max-w-2xl">
        <Reveal variant="fade-up" delay={80}>
          <LeadForm {...form} variant="flat" />
        </Reveal>
      </Container>
    </section>
  );
}
