import { site } from "@/data/site";
import {
  getInTouchContent,
  premiumCtaContent,
  servicesContent,
  testimonialsContent,
} from "@/data/home";

export const aboutIntroContent = {
  title: "About Us",
  paragraphs: [
    "Founded with a passion for storytelling and publishing excellence, Amazon Publication is dedicated to helping authors transform ideas into professionally published books. We believe every story deserves to be heard, and our mission is to make the publishing journey simple, professional, and rewarding for writers at every stage.",
    "From manuscript development and editing to cover design, publishing, and distribution, our experienced team provides complete publishing solutions tailored to your goals. Whether you're a first-time author or an established writer, we work closely with you to ensure your voice remains authentic while delivering a polished final product ready for readers worldwide.",
    "At Amazon Publication, we don't just publish books — we help authors build their legacy, connect with audiences, and confidently share their stories with the world.",
  ],
  imageSrc: "/about-hero.webp",
  imageAlt: "Author reading a book",
};

export const aboutStoryContent = {
  title:
    "Bringing Your Story to Life: Professional Publishing Solutions Designed for Authors",
  highlight: "Professional Publishing Solutions Designed for Authors",
  paragraphs: [
    "At Amazon Publication, we believe every story has the power to inspire, educate, and create lasting impact. Our dedicated team of publishing professionals combines creativity, industry expertise, and strategic publishing solutions to help authors transform ideas into professionally published books.",
    "From manuscript development and editing to cover design, publishing, and distribution, we provide personalized support tailored to your publishing goals. Whether you're a first-time writer or an experienced author, we focus on preserving your voice while delivering quality that connects with readers worldwide.",
    "Let Amazon Publication help turn your vision into a published success story that leaves a lasting impression.",
  ],
  imageSrc: "/about-2.webp",
  imageAlt: "Stack of published books",
  tone: "onLight" as const,
  imagePosition: "left" as const,
};

export const aboutPublishedContent = {
  title: "Become A Published Author Your Story Starts Here",
  highlight: "Published Author",
  paragraphs: [
    "Your manuscript deserves more than staying unfinished on your computer. Turn your ideas into a professionally published book and share your work with readers worldwide. From editing and design to Amazon publishing and distribution, our experts make the journey simple, seamless, and stress-free.",
    "Take the first step toward becoming a published author today.",
  ],
  imageSrc: "/about-3.webp",
  imageAlt: "Books and laptop",
  tone: "onDark" as const,
  imagePosition: "right" as const,
  phone: site.phone,
  phoneHref: site.phoneHref,
  primaryCta: {
    label: "Schedule A Free Consultation",
    href: "/contact-us",
  },
};

export const aboutReadyContent = {
  title: "Ready To Publish Your Story? Let's Get Started",
  highlight: "Let's Get Started",
  imageSrc: "/become-author-image.webp",
  imageAlt: "Stack of colorful books",
  tone: "onLight" as const,
  imagePosition: "left" as const,
  contacts: [
    {
      kind: "phone" as const,
      title: "Call Us",
      value: site.phone,
      href: site.phoneHref,
    },
    {
      kind: "email" as const,
      title: "Discuss your ideas",
      value: site.email,
      href: `mailto:${site.email}`,
    },
  ],
  cta: { label: "Get a free quote for your book projects", href: "/contact-us" },
};

export const aboutPageSections = {
  services: servicesContent,
  premiumCta: premiumCtaContent,
  testimonials: testimonialsContent,
  getInTouch: getInTouchContent,
};
