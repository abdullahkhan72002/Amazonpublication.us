"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export type Testimonial = {
  quote: string;
  name: string;
  rating: number;
};

export type TestimonialsProps = {
  title: string;
  highlight?: string;
  items: Testimonial[];
};

const AUTOPLAY_MS = 5000;

function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = () => setSlidesPerView(mediaQuery.matches ? 2 : 1);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return slidesPerView;
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex flex-col items-center px-3">
      <blockquote className="relative w-full rounded-2xl bg-white px-6 py-7 text-center sm:px-8">
        <div className="mb-4 flex justify-center gap-1">
          {Array.from({ length: item.rating }).map((_, index) => (
            <Star
              key={index}
              className="size-4 fill-primary text-primary"
              aria-hidden
            />
          ))}
          <span className="sr-only">{item.rating} out of 5 stars</span>
        </div>
        <p className="text-body text-foreground/80">{item.quote}</p>
        <span
          aria-hidden
          className="absolute -bottom-2 left-1/2 size-5 -translate-x-1/2 rotate-45 rounded-br-sm bg-white"
        />
      </blockquote>
      <figcaption className="mt-8 font-heading text-nav font-normal text-white">
        {item.name}
      </figcaption>
    </figure>
  );
}

export default function Testimonials({
  title,
  highlight,
  items,
}: TestimonialsProps) {
  const slidesPerView = useSlidesPerView();
  const pageCount = Math.max(1, Math.ceil(items.length / slidesPerView));
  const [page, setPage] = useState(0);
  const currentPage = Math.min(page, pageCount - 1);

  const goTo = useCallback(
    (nextPage: number) => {
      setPage(((nextPage % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  const next = useCallback(() => {
    setPage((current) => (current + 1) % pageCount);
  }, [pageCount]);

  const prev = useCallback(() => {
    setPage((current) => (current - 1 + pageCount) % pageCount);
  }, [pageCount]);

  useEffect(() => {
    if (pageCount <= 1) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [next, pageCount]);

  const canNavigate = pageCount > 1;

  return (
    <section className="overflow-hidden bg-primary py-16 lg:py-20">
      <Container className="flex flex-col gap-10">
        <Reveal variant="fade-up">
          <SectionHeading
            title={title}
            highlight={highlight}
            titleClassName="max-sm:text-3xl!"
          />
        </Reveal>

        <Reveal variant="scale" delay={120}>
          <div className="relative">
          {canNavigate ? (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="absolute left-2 top-[38%] z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary text-white transition-colors hover:border-white hover:text-white sm:left-2"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
          ) : null}

          <div className="overflow-hidden px-8 sm:px-12">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {Array.from({ length: pageCount }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid w-full shrink-0 grid-cols-1 gap-8 md:grid-cols-2"
                >
                  {items
                    .slice(
                      pageIndex * slidesPerView,
                      pageIndex * slidesPerView + slidesPerView,
                    )
                    .map((item) => (
                      <TestimonialCard key={item.name} item={item} />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {canNavigate ? (
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-2 top-[38%] z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary text-white transition-colors hover:border-white hover:text-white sm:right-2"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          ) : null}
        </div>

        {canNavigate ? (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to testimonial page ${index + 1}`}
                aria-current={index === currentPage}
                onClick={() => goTo(index)}
                className={`size-2.5 rounded-full transition-colors ${
                  index === currentPage ? "bg-white" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
