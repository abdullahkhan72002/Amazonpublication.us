"use client";

import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import ThankYouConfetti from "@/components/sections/ThankYouConfetti";

export default function ThankYouContent() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#fff8f0] to-white py-16 max-sm:py-12 lg:py-24">
      <ThankYouConfetti />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-primary/[0.05]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full px-4 md:w-[85%] md:px-0 lg:w-[70%]">
        <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white px-6 py-12 text-center shadow-[0_28px_80px_-32px_rgba(255,153,0,0.28)] sm:px-12 sm:py-16">
          <div className="h-1.5 w-full rounded-full bg-primary" />

          <span className="mx-auto mt-10 flex size-20 items-center justify-center rounded-full bg-primary text-[#131a22] shadow-[0_12px_40px_-12px_rgba(255,153,0,0.55)]">
            <Check className="size-10" aria-hidden />
          </span>

          <p className="text-nav mt-8 font-medium uppercase tracking-[0.22em] text-primary">
            Submission received
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold text-foreground max-sm:text-3xl sm:text-5xl">
            Thank <span className="text-primary">You</span>
          </h1>
          <p className="text-body mx-auto mt-5 max-w-xl text-foreground/70">
            We have received your details. Our publishing team will review your
            message and get back to you shortly. A confirmation is also on its
            way to your inbox.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" variant="primary-light" className="w-full sm:w-auto">
              Back to home
            </Button>
            <Button
              href="/submit-manuscript"
              variant="secondary-dark"
              className="w-full sm:w-auto"
            >
              Submit a manuscript
            </Button>
          </div>

          <p className="text-nav mt-8 text-foreground/55">
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
