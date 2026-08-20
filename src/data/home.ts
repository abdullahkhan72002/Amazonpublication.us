import { site } from "@/data/site";

export const heroContent = {
  eyebrow: "Publish Your Book on",
  title: "Amazon",
  subtitle: "With Our Expert Book Publishing Services",
  paragraphs: [
    "Turn your manuscript into a professionally published book and reach readers worldwide through Amazon. Whether you're a first-time author or an experienced writer, our publishing experts help you transform ideas into bestselling opportunities.",
    "From editing and formatting to cover design, Amazon Kindle publishing, paperback setup, and marketing — we handle everything while keeping your voice and creative vision intact.",
  ],
  badges: ["Google Reviews", "Reviews.io"],
  phone: site.phone,
  phoneHref: site.phoneHref,
  secondaryCta: { label: "Schedule A Free Consultation", href: "/contact-us" },
  form: {
    formSource: "homepage-hero",
    title: "BECOME A PUBLISHED AUTHOR",
    submitLabel: "Send",
    fields: [
      { name: "hero-name", label: "Name", placeholder: "Name" },
      { name: "hero-email", label: "Email", type: "email" as const, placeholder: "Email" },
      { name: "hero-phone", label: "Phone", type: "tel" as const, placeholder: "Phone" },
      {
        name: "hero-message",
        label: "Message",
        placeholder: "Message",
        multiline: true,
      },
    ],
  },
};

export const brandStripContent = {
  brands: ["Apple Books", "Amazon Kindle", "IngramSpark", "Goodreads"],
};

export const publishingServicesContent = {
  titleLines: [
    "Professional Amazon Publishing Services",
    "Built For Modern Authors",
  ],
  paragraphs: [
    "Publishing a book should feel exciting — not overwhelming.",
    "Many authors spend months writing their manuscript only to get stuck figuring out formatting requirements, Amazon KDP setup, cover design, metadata optimization, and marketing strategies.",
    "That's where we help.",
    "Our Amazon publishing specialists guide you through every step of the publishing journey so your book launches professionally and reaches the audience it deserves.",
    "Whether you're publishing fiction, non-fiction, business books, memoirs, children's books, self-help guides, or educational material, we provide publishing solutions designed around your goals.",
    "Your ideas remain yours. We simply help bring them to life.",
  ],
  imageLabel: "Book Mockup",
  primaryCta: { label: "Schedule A Free Consultation", href: "/contact-us" },
  phone: site.phone,
  phoneHref: site.phoneHref,
};

export const becomeAuthorContent = {
  title: "Become A Published Author Your Story Starts Here",
  highlight: "Published Author",
  paragraphs: [
    "Your manuscript deserves more than staying unfinished on your computer. Turn your ideas into a professionally published book and share your work with readers worldwide. From editing and design to Amazon publishing and distribution, our experts make the journey simple, seamless, and stress-free.",
    "Take the first step toward becoming a published author today.",
  ],
  imageLabel: "Stacked Books",
  phone: site.phone,
  phoneHref: site.phoneHref,
  primaryCta: { label: "Schedule A Free Consultation", href: "/contact-us" },
};

export const portfolioContent = {
  titleLine1: "Our Portfolio",
};

export const servicesContent = {
  title: "Services We Offer",
  readMoreLabel: "Explore More",
  items: [
    {
      title: "Book Marketing",
      description:
        "Get your book in front of the right audience with targeted marketing strategies designed to boost visibility, increase reach, and help readers discover your work across major platforms.",
      href: "/book-marketing",
    },
    {
      title: "Book Formatting",
      description:
        "Professional formatting ensures your book looks polished and ready for publication. We optimize layouts for Kindle, paperback, and hardcover formats for a seamless reading experience.",
      href: "/book-formatting",
    },
    {
      title: "Book Cover Design",
      description:
        "Make a lasting first impression with professionally designed covers that capture attention, reflect your story, and stand out in competitive marketplaces.",
      href: "/book-cover-design",
    },
    {
      title: "Book Printing",
      description:
        "Bring your work to life with premium-quality printing solutions designed for professional presentation, durability, and reader satisfaction.",
      href: "/book-printing",
    },
    {
      title: "Book Publishing",
      description:
        "Navigate the publishing process with confidence. From preparation to distribution, we help turn your manuscript into a professionally published book.",
      href: "/book-publishing",
    },
    {
      title: "Ebook Writing",
      description:
        "Create engaging digital content tailored for today's readers. We help develop high-quality ebooks optimized for online publishing platforms.",
      href: "/ebook-writing",
    },
    {
      title: "Fiction Writing",
      description:
        "From unforgettable characters to immersive storytelling, our fiction writing services help craft narratives that captivate readers from beginning to end.",
      href: "/fiction-writing",
    },
    {
      title: "Ghost Writing",
      description:
        "Have an idea but need professional writing support? Our ghostwriting services transform concepts into polished manuscripts while keeping your voice and vision intact.",
      href: "/ghost-writing",
    },
    {
      title: "Audio Book Narration",
      description:
        "Expand your reach with professional audiobook narration designed to create immersive listening experiences for modern audiences.",
      href: "/audio-book-narration",
    },
    {
      title: "Authors Website",
      description:
        "Build your online author presence with a professionally designed website that showcases your work, strengthens your brand, and connects you with readers.",
      href: "/authors-website",
    },
    {
      title: "Proof Reading",
      description:
        "Eliminate errors and enhance clarity with detailed proofreading services designed to polish your manuscript before publication.",
      href: "/proof-reading",
    },
  ],
};

export const premiumCtaContent = {
  bandWord: "Get",
  title: "Premium Book Publishing Services!",
  highlight: "Book Publishing",
  paragraph:
    "From professional editing and custom cover design to Amazon publishing and worldwide distribution, Amazon Publication simplifies the entire publishing journey for aspiring and established authors. Our publishing experts work closely with you to transform your manuscript into a professionally published book while maintaining quality, creativity, and your unique voice.",
  imageLabel: "Laptop On Books",
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

export const testimonialsContent = {
  title: "Trusted By 500+ Authors",
  highlight: "500+ Authors",
  items: [
    {
      quote:
        "Publishing my first book felt overwhelming until I found Amazon Publication. Their team guided me through editing, formatting, cover design, and publishing with professionalism from start to finish. Seeing my book finally published was a moment I'll never forget.",
      name: "Anna Joe",
      rating: 5,
    },
    {
      quote:
        "Amazon Publication transformed my manuscript into something truly professional. Their attention to detail, communication, and publishing expertise exceeded my expectations. I finally achieved my dream of becoming a published author.",
      name: "Sam Alex",
      rating: 5,
    },
  ],
};

export const faqContent = {
  title: "Want to know more about Book Publishers?",
  highlight: "Book Publishers?",
  searchPlaceholder: "Search...",
  items: [
    {
      question: "What genres do you publish?",
      answer:
        "We work with a wide range of genres, including fiction, romance, mystery, science fiction, memoirs, biographies, self-help, business books, children's books, educational content, and more.",
    },
    {
      question: "Can first-time authors publish with Amazon Publication?",
      answer:
        "Absolutely. A large share of our authors are publishing for the very first time. We walk you through every requirement, explain each decision in plain language, and handle the technical setup for you.",
    },
    {
      question: "Do I keep ownership rights to my book?",
      answer:
        "Yes. You retain full ownership of your manuscript, your royalties, and your publishing accounts. We simply provide the services that bring your book to market.",
    },
    {
      question: "What publishing services do you offer?",
      answer:
        "Our services span ghostwriting, editing, proofreading, cover design, interior formatting, Amazon KDP publishing, printing, audiobook narration, author websites, book trailers, and marketing.",
    },
    {
      question: "Can you help publish my book on Amazon?",
      answer:
        "Yes. We handle Kindle and paperback setup, metadata and category selection, pricing strategy, and worldwide distribution so your book launches correctly the first time.",
    },
    {
      question: "How long does the publishing process take?",
      answer:
        "Timelines depend on the length of your manuscript and the services you need. Most projects move from final manuscript to live listing within four to eight weeks.",
    },
  ],
};

export const getInTouchContent = {
  title: "Get In Touch",
  highlight: "Touch",
  subtitle:
    "Whether you're starting with an idea or ready to publish your completed manuscript, Amazon Publication is here to guide you every step of the way.",
  imageLabel: "Colorful Books",
  form: {
    formSource: "homepage-get-in-touch",
    submitLabel: "Send",
    fields: [
      { name: "contact-name", label: "Name", placeholder: "Name" },
      {
        name: "contact-email",
        label: "Email",
        type: "email" as const,
        placeholder: "Email",
      },
      {
        name: "contact-phone",
        label: "Phone",
        type: "tel" as const,
        placeholder: "Phone",
      },
      {
        name: "contact-message",
        label: "Message",
        placeholder: "Message",
        multiline: true,
      },
    ],
  },
};
