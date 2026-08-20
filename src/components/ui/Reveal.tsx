"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export type RevealVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
};

const VARIANTS: Record<
  RevealVariant,
  { hidden: string; visible: string }
> = {
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "fade-up": {
    hidden: "translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  "fade-down": {
    hidden: "-translate-y-10 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  "fade-left": {
    hidden: "-translate-x-10 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  "fade-right": {
    hidden: "translate-x-10 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  scale: {
    hidden: "scale-[0.96] opacity-0",
    visible: "scale-100 opacity-100",
  },
};

export default function Reveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 800,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const motion = VARIANTS[variant];

  return (
    <div
      ref={ref}
      className={`reveal-motion will-change-transform transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? motion.visible : motion.hidden
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
