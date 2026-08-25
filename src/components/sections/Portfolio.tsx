"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import "./portfolio-carousel.css";

const books = Array.from({ length: 9 }, (_, index) => ({
  src: `/cover-${index + 1}.webp`,
  alt: `Published book cover ${index + 1}`,
  caption: `Published Book ${index + 1}`,
}));

const DESKTOP_RADIUS = 600;
const MOBILE_RADIUS = 260;
const DEG_INT = 360 / books.length;
const AUTOPLAY_MS = 2500;

export type PortfolioProps = {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
};

function isTypingInField(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function useCarouselRadius() {
  const [radius, setRadius] = useState(MOBILE_RADIUS);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateRadius = () => {
      setRadius(mediaQuery.matches ? MOBILE_RADIUS : DESKTOP_RADIUS);
    };

    updateRadius();
    mediaQuery.addEventListener("change", updateRadius);
    return () => mediaQuery.removeEventListener("change", updateRadius);
  }, []);

  return radius;
}

export default function Portfolio({
  eyebrow,
  titleLine1 = "Our Portfolio",
  titleLine2,
}: PortfolioProps) {
  const radius = useCarouselRadius();
  const [angle, setAngle] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(false);

  const spin = useCallback((direction: -1 | 1) => {
    setIsFocused(false);
    setCaptionVisible(false);
    setAngle((current) => current + direction * DEG_INT);
    setCurrentIndex((current) => {
      const next = current + direction;
      if (next >= books.length) return 0;
      if (next < 0) return books.length - 1;
      return next;
    });
  }, []);

  const next = useCallback(() => spin(1), [spin]);
  const prev = useCallback(() => spin(-1), [spin]);

  const toggleFocus = useCallback(() => {
    setIsFocused((current) => !current);
  }, []);

  const toggleCaption = useCallback(() => {
    setCaptionVisible((current) => !current);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingInField(event.target)) return;

      switch (event.which) {
        case 37:
          prev();
          break;
        case 39:
          next();
          break;
        case 90:
          toggleFocus();
          break;
        case 67:
          toggleCaption();
          break;
        default:
          return;
      }

      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, toggleCaption, toggleFocus]);

  return (
    <section id="portfolio" className="bg-white py-16 lg:py-20">
      <Container >
        <Reveal variant="fade-up">
          <SectionHeading
            eyebrow={eyebrow}
            tone="onLight"
            title={titleLine1}
            highlight={titleLine1.includes("Portfolio") ? "Portfolio" : undefined}
            titleClassName="max-sm:text-3xl!"
          />
        </Reveal>

        <Reveal
          variant="scale"
          delay={120}
          className="relative mx-auto mt-10 w-full max-w-container sm:mt-12"
        >
          <div className="portfolio-carousel mb-120 max-sm:mb-40">
            <figure
              className="portfolio-carousel__spinner"
              style={{
                transform: `rotateY(${angle}deg)`,
                transformOrigin: `50% 50% -${radius}px`,
              }}
            >
              {books.map((book, index) => {
                const itemAngle = index * DEG_INT;
                const isCurrent = index === currentIndex;

                return (
                  <figure
                    key={book.src}
                    className={[
                      "portfolio-carousel__item",
                      isCurrent ? "current" : "",
                      isCurrent && isFocused ? "focus" : "",
                      isCurrent && captionVisible ? "caption" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      transform: `rotateY(-${itemAngle}deg)`,
                      transformOrigin: `50% 50% -${radius}px`,
                    }}
                    onClick={() => {
                      if (isCurrent) toggleFocus();
                    }}
                  >
                    <Image
                      src={book.src}
                      alt={book.alt}
                      width={500}
                      height={750}
                      quality={75}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full"
                    />
                  </figure>
                );
              })}
            </figure>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
