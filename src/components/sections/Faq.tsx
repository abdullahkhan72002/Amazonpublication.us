"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  title: string;
  highlight?: string;
  searchPlaceholder: string;
  items: FaqItem[];
};

export default function Faq({
  title,
  highlight,
  searchPlaceholder,
  items,
}: FaqProps) {
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    items[0]?.question ?? null,
  );

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;

    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term),
    );
  }, [items, query]);

  return (
    <section id="faq" className="overflow-hidden bg-primary py-16 lg:py-20">
      <Container className="flex flex-col gap-10">
        <Reveal variant="fade-up">
          <SectionHeading
            title={title}
            highlight={highlight}
            titleClassName="max-sm:text-2xl!"
          />
        </Reveal>

        <Reveal variant="fade-up" delay={100} className="mx-auto flex w-full max-w-full flex-col gap-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-foreground/50"
              aria-hidden
            />
            <label htmlFor="faq-search" className="sr-only">
              Search frequently asked questions
            </label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="text-nav w-full rounded-full border border-white/20 bg-white py-3 pl-12 pr-5 text-foreground outline-none transition-colors placeholder:text-foreground/45 focus:border-primary"
            />
          </div>

          {filteredItems.length === 0 ? (
            <p className="text-body py-6 text-center text-white/65">
              No questions match your search.
            </p>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openQuestion === item.question;

              return (
                <div key={item.question} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : item.question)
                    }
                    aria-expanded={isOpen}
                    className="text-nav flex items-center justify-between gap-4 rounded-full bg-white px-6 py-3.5 text-left font-normal text-foreground transition-colors hover:bg-white/90"
                  >
                    {item.question}
                    {isOpen ? (
                      <Minus
                        className="size-4 shrink-0 text-primary/60"
                        aria-hidden
                      />
                    ) : (
                      <Plus
                        className="size-4 shrink-0 text-primary/60"
                        aria-hidden
                      />
                    )}
                  </button>

                  {isOpen ? (
                    <p className="text-body px-6 py-5 text-white/75">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              );
            })
          )}
        </Reveal>
      </Container>
    </section>
  );
}
