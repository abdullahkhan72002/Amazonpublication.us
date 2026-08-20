import type { HeroProps } from "@/components/sections/Hero";
import type { SplitSectionProps } from "@/components/sections/SplitSection";
import type { WhyChooseProps } from "@/components/sections/WhyChoose";
import type { GenreTabsProps } from "@/components/sections/GenreTabs";
import {
  genreTabItems,
  genreTabsPhone,
  genreTabsPhoneHref,
} from "@/data/genreTabs";
import { servicePageBottomSections } from "@/data/serviceShared";
import { site } from "@/data/site";

export type ServicePageConfig = {
  slug: string;
  name: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    ctaLabel: string;
  };
  vision: {
    title: string;
    highlight: string;
    paragraphs: string[];
    features: string[];
    imageSrc: string;
    imageAlt: string;
    ctaLabel: string;
  };
  experienced: {
    title: string;
    highlight: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
    ctaLabel: string;
  };
  whyChoose: {
    title: string;
    highlight: string;
    subtitle: string;
    items: WhyChooseProps["items"];
  };
  genreTabsTitle: string;
  genreTabsHighlight: string;
  backgroundImage?: string;
};

export type ServicePageContent = {
  slug: string;
  name: string;
  metaDescription: string;
  hero: HeroProps;
  vision: SplitSectionProps;
  experienced: SplitSectionProps;
  whyChoose: WhyChooseProps;
  genreTabs: GenreTabsProps;
  sections: typeof servicePageBottomSections;
};

function makeForm(slug: string) {
  const prefix = slug.replace(/-/g, "");
  return {
    formSource: `service-${slug}-hero`,
    title: "BECOME A PUBLISHED AUTHOR",
    submitLabel: "Send",
    fields: [
      { name: `${prefix}-name`, label: "Name", placeholder: "Name" },
      {
        name: `${prefix}-email`,
        label: "Email",
        type: "email" as const,
        placeholder: "Email",
      },
      {
        name: `${prefix}-phone`,
        label: "Phone",
        type: "tel" as const,
        placeholder: "Phone",
      },
      {
        name: `${prefix}-message`,
        label: "Message",
        placeholder: "Message",
        multiline: true,
      },
    ],
  };
}

export function createServiceContent(
  config: ServicePageConfig,
): ServicePageContent {
  const primaryCta = {
    label: config.vision.ctaLabel,
    href: "/contact-us",
    icon: "calendar" as const,
  };

  return {
    slug: config.slug,
    name: config.name,
    metaDescription: config.metaDescription,
    hero: {
      eyebrow: config.hero.eyebrow,
      title: config.hero.title,
      subtitle: config.hero.subtitle,
      titleSize: "service",
      paragraphs: config.hero.paragraphs,
      badges: ["Google Reviews", "Reviews.io"],
      phone: site.phone,
      phoneHref: site.phoneHref,
      secondaryCta: { label: config.hero.ctaLabel, href: "/contact-us" },
      form: makeForm(config.slug),
    },
    vision: {
      title: config.vision.title,
      highlight: config.vision.highlight,
      paragraphs: config.vision.paragraphs,
      features: config.vision.features,
      imageSrc: config.vision.imageSrc,
      imageAlt: config.vision.imageAlt,
      tone: "onLight",
      imagePosition: "right",
      roundedImage: true,
      phone: site.phone,
      phoneHref: site.phoneHref,
      primaryCta,
    },
    experienced: {
      title: config.experienced.title,
      highlight: config.experienced.highlight,
      paragraphs: config.experienced.paragraphs,
      imageSrc: "/about-3.webp",
      imageAlt: config.experienced.imageAlt,
      tone: "onDark",
      imagePosition: "left",
      roundedImage: true,
      phone: site.phone,
      phoneHref: site.phoneHref,
      primaryCta: {
        label: config.experienced.ctaLabel,
        href: "/contact-us",
        icon: "calendar",
      },
    },
    whyChoose: {
      title: config.whyChoose.title,
      highlight: config.whyChoose.highlight,
      subtitle: config.whyChoose.subtitle,
      items: config.whyChoose.items,
    },
    genreTabs: {
      title: config.genreTabsTitle,
      highlight: config.genreTabsHighlight,
      tabs: genreTabItems,
      phone: genreTabsPhone,
      phoneHref: genreTabsPhoneHref,
      backgroundImage: config.backgroundImage,
    },
    sections: servicePageBottomSections,
  };
}
