import {
  getInTouchContent,
  premiumCtaContent,
  servicesContent,
  testimonialsContent,
} from "@/data/home";

export const portfolioHeroContent = {
  title: "Our Portfolio",
  highlight: "Portfolio",
  description:
    "Explore the work that reflects our passion for storytelling, publishing excellence, and creative craftsmanship. From bestselling books and professional cover designs to publishing projects across multiple genres, discover how Amazon Publication helps authors transform ideas into professionally published success stories.",
};

export const portfolioGridContent = {
  items: Array.from({ length: 8 }, (_, index) => ({
    src: `/cover-${index + 1}.webp`,
    alt: `Published book cover ${index + 1}`,
  })),
};

export const portfolioPageSections = {
  services: servicesContent,
  premiumCta: premiumCtaContent,
  testimonials: testimonialsContent,
  getInTouch: getInTouchContent,
};
