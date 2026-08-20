export const site = {
  name: "Amazon Publication",
  email: "info@amazonpublication.us",
  phone: "+1 424 282 3304",
  phoneHref: "tel:+14242823304",
};

export const serviceLinks = [
  { label: "Book Marketing", href: "/book-marketing" },
  { label: "Book Formatting", href: "/book-formatting" },
  { label: "Book Editing", href: "/book-editing" },
  { label: "Book Cover Design", href: "/book-cover-design" },
  { label: "Book Printing", href: "/book-printing" },
  { label: "Book Publishing", href: "/book-publishing" },
  { label: "Proof Reading", href: "/proof-reading" },
  { label: "Children Book", href: "/children-book" },
  { label: "Ebook Writing", href: "/ebook-writing" },
  { label: "Fiction Writing", href: "/fiction-writing" },
  { label: "Ghost Writing", href: "/ghost-writing" },
  { label: "Audio Book Narration", href: "/audio-book-narration" },
  { label: "Authors Website", href: "/authors-website" },
  { label: "Video Trailer", href: "/video-trailer" },
];

export const headerContent = {
  email: site.email,
  phone: site.phone,
  phoneHref: site.phoneHref,
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Service", href: "/book-marketing", children: serviceLinks },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  consultationCta: { label: "Start Free Consultation", href: "/contact-us" },
};

export const footerContent = {
  description:
    "Don't hide your story when the world is waiting to hear it. Show your creativity with confidence and let us guide you through every step.",
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Blogs", href: "/blogs" },
        { label: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Book Marketing", href: "/book-marketing" },
        { label: "Book Formatting", href: "/book-formatting" },
        { label: "Book Editing", href: "/book-editing" },
        { label: "Book Cover Design", href: "/book-cover-design" },
        { label: "Book Printing", href: "/book-printing" },
        { label: "Book Publishing", href: "/book-publishing" },
      ],
    },
  ],
  socialTitle: "Social Media",
  socials: [
    { platform: "facebook" as const, label: "Facebook", href: "https://facebook.com" },
    { platform: "x" as const, label: "X", href: "https://x.com" },
    { platform: "youtube" as const, label: "YouTube", href: "https://youtube.com" },
  ],
  copyright: `Copyright © 2026 ${site.name} All Rights Reserved`,
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Return & Refund Policies", href: "/return-and-refund-policies" },
  ],
};
