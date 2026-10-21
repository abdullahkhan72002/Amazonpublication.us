"use client";

import { Calendar, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import ThankYouConfetti from "@/components/sections/ThankYouConfetti";

const CALENDLY_URL = "https://calendly.com/amazonpublication-us/15min";

export default function ThankYouContent() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden bg-gradient-to-b from-white via-[#fff8f0] to-white py-6 max-sm:py-5 lg:py-8">
      <ThankYouConfetti />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-primary/[0.05]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full px-4 md:w-[85%] md:px-0 lg:w-[70%]">
        <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white px-6 py-8 text-center shadow-[0_28px_80px_-32px_rgba(255,153,0,0.28)] sm:px-12 sm:py-10">
          <div className="h-1.5 w-full rounded-full bg-primary" />

          <span className="mx-auto mt-6 flex size-14 items-center justify-center rounded-full bg-primary text-[#131a22] shadow-[0_12px_40px_-12px_rgba(255,153,0,0.55)] sm:size-16">
            <Check className="size-7 sm:size-8" aria-hidden />
          </span>

          <p className="text-nav mt-5 font-medium uppercase tracking-[0.22em] text-primary">
            Submission received
          </p>
          <h1 className="font-heading mt-2 text-4xl font-semibold text-foreground max-sm:text-3xl sm:text-5xl">
            Thank <span className="text-primary">You</span>
          </h1>
          <p className="text-body mx-auto mt-3 max-w-xl text-foreground/70">
            We have received your details. Our publishing team will review your
            message and get back to you shortly. A confirmation is also on its
            way to your inbox.
          </p>

          <div className="mt-7 flex justify-center">
            <Button
              href={CALENDLY_URL}
              variant="primary-light"
              icon={<Calendar className="size-5" aria-hidden />}
              className="w-full max-w-md !bg-primary px-8 py-4 text-lg font-semibold shadow-[0_16px_40px_-10px_rgba(255,153,0,0.7)] sm:w-auto sm:min-w-[280px]"
            >
              Book a Meeting
            </Button>
          </div>

          <p className="text-nav mt-5 text-foreground/55">
            Need to talk now?{" "}
            <a
              href={site.phoneHref}
              className="font-medium text-primary transition-colors hover:text-foreground"
            >
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
