import {
  createServiceContent,
  type ServicePageConfig,
  type ServicePageContent,
} from "@/data/services/createServiceContent";

function defaultWhyChoose(serviceName: string) {
  return {
    title: `Why Choose Amazon Publication for ${serviceName}`,
    highlight: serviceName,
    subtitle: `We combine publishing expertise with professional ${serviceName.toLowerCase()} solutions designed to help authors succeed.`,
    items: [
      {
        title: "Free Expert Consultation",
        highlight: "Consultation",
        description: `Get personalized guidance from experienced publishing professionals who understand what it takes to deliver outstanding ${serviceName.toLowerCase()} results.`,
        icon: "book" as const,
      },
      {
        title: "Data-Driven Strategy AI",
        highlight: "Strategy AI",
        description:
          "Successful publishing goes beyond execution — it requires strategy. Our process is built on industry insight, proven methods, and clear communication at every step.",
        icon: "clipboard" as const,
      },
      {
        title: "24/7 Customer Support",
        highlight: "Customer Support",
        description:
          "Publishing can raise questions at every stage, and we're here whenever you need assistance. Our dedicated support team is available around the clock.",
        icon: "headset" as const,
      },
    ],
  };
}

function serviceConfig(
  partial: Omit<ServicePageConfig, "whyChoose" | "genreTabsTitle" | "genreTabsHighlight"> & {
    whyChoose?: ServicePageConfig["whyChoose"];
    genreTabsTitle?: string;
    genreTabsHighlight?: string;
  },
): ServicePageConfig {
  return {
    ...partial,
    whyChoose: partial.whyChoose ?? defaultWhyChoose(partial.name),
    genreTabsTitle:
      partial.genreTabsTitle ??
      `Our Expert ${partial.name} Can Work On Any Genre`,
    genreTabsHighlight: partial.genreTabsHighlight ?? partial.name,
  };
}

const configs: ServicePageConfig[] = [
  serviceConfig({
    slug: "book-marketing",
    name: "Book Marketing",
    metaDescription:
      "Professional book marketing services to increase visibility, strengthen your author presence, and connect your book with readers worldwide.",
    hero: {
      eyebrow: "Professional",
      title: "Book Marketing",
      subtitle: "Service That Help Your Book Reach More Readers",
      paragraphs: [
        "Publishing your book is only the beginning — getting it discovered is what truly matters. At Amazon Publication, our professional book marketing services are designed to increase visibility, strengthen your author presence, and connect your work with readers worldwide.",
        "Whether you've written fiction, non-fiction, memoirs, business books, or self-help guides, our marketing specialists create strategies tailored to your goals. From Amazon optimization and promotional campaigns to audience targeting and author branding, we help maximize your book's potential.",
      ],
      ctaLabel: "Market My Book",
    },
    vision: {
      title: "Affordable Book Marketing Designed Around Your Vision",
      highlight: "Book Marketing",
      paragraphs: [
        "Your book deserves more than publication — it deserves recognition. Our affordable book marketing solutions help authors build visibility, increase discoverability, and position their work in front of the right audience.",
      ],
      features: [
        "Personalized Marketing Strategies",
        "Reader-Focused Campaign Planning",
        "Transparent Collaboration.",
        "Faster Execution & Support",
        "Professional Author Branding",
      ],
      imageSrc: "/marketing-1.webp",
      imageAlt: "Hand selecting a book from a shelf",
      ctaLabel: "Hire Professional Book Marketers",
    },
    experienced: {
      title: "Experienced Book Marketing Services!",
      highlight: "Book Marketing",
      paragraphs: [
        "At Amazon Publication, we help authors build momentum after publishing. Our experienced marketing specialists work to improve visibility, strengthen discoverability, and help books stand out in competitive marketplaces.",
        "From Amazon listing optimization and promotional planning to audience engagement strategies and author positioning, we create marketing campaigns built for long-term growth.",
        "No matter your genre, our goal remains the same — helping your book reach readers and build lasting impact.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Stack of vintage books",
      ctaLabel: "Hire Professional Book Marketers",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Book Marketing",
      highlight: "Book Marketing",
      subtitle:
        "We combine publishing expertise with strategic marketing solutions designed to help authors succeed in today's digital marketplace.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Get personalized guidance from experienced publishing and marketing professionals who understand what it takes to build visibility in today's competitive book market.",
          icon: "book",
        },
        {
          title: "Data-Driven Marketing Strategy AI",
          highlight: "Strategy AI",
          description:
            "Successful marketing goes beyond promotion — it requires strategy. Our campaigns are built using market research, audience insights, Amazon optimization techniques, and proven promotional methods.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Support",
          highlight: "Customer Support",
          description:
            "Publishing and marketing can raise questions at every stage, and we're here whenever you need assistance. Our dedicated support team is available around the clock to provide updates, answer concerns, and ensure everything is right.",
          icon: "headset",
        },
      ],
    },
    genreTabsTitle: "Our Expert Book Marketing Can Work On Any Genre",
    genreTabsHighlight: "Expert Book Marketing",
  }),

  serviceConfig({
    slug: "book-formatting",
    name: "Book Formatting",
    metaDescription:
      "Professional book formatting services for Kindle, paperback, and hardcover layouts that deliver a polished reading experience.",
    hero: {
      eyebrow: "Professional",
      title: "Book Formatting",
      subtitle: "Services That Perfect Every Page",
      paragraphs: [
        "A great story deserves professional presentation. That's where Amazon Publication comes in. Our expert book formatting services transform your manuscript into a polished, publication-ready book designed to deliver a seamless reading experience across digital and print platforms. Whether it's a memoir, novel, business book, self-help guide, or fiction title, our formatting specialists carefully structure every page, chapter, heading, margin, and layout to meet professional publishing standards. Your voice remains untouched — we simply ensure your book looks as professional as the story inside.",
      ],
      ctaLabel: "Format My Book",
    },
    vision: {
      title: "Affordable Book Formatting Designed Around Your Vision",
      highlight: "Book Formatting",
      paragraphs: [
        "Your manuscript deserves formatting that enhances readability and creates a lasting impression. Our affordable book formatting solutions prepare your content for Kindle publishing, paperback printing, hardcover production, and major publishing platforms.",
      ],
      features: [
        "Personalized Formatting Solutions",
        "Professional Layout Optimization",
        "Transparent Collaboration.",
        "Faster Turnaround Times",
        "Publishing Platform Compatibility",
      ],
      imageSrc: "/formatting.webp",
      imageAlt: "Professionally formatted book pages",
      ctaLabel: "Hire Professional Book Formatters",
    },
    experienced: {
      title: "Experienced Book Formatting Services!",
      highlight: "Book Formatting",
      paragraphs: [
        "Our professional book formatting services are dedicated to helping authors prepare manuscripts for successful publication. We've helped authors create polished books designed to meet industry standards while maintaining quality presentation across digital and print formats.",
        "Our formatting specialists optimize typography, page layouts, spacing, chapter structures, margins, headers, and publishing requirements to ensure your manuscript delivers a premium reading experience.",
        "Whether you're publishing fiction, non-fiction, memoirs, or business content, Amazon Publication helps prepare your manuscript for professional publication with precision and attention to detail.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Formatted book interior layout",
      ctaLabel: "Hire Professional Book Formatters",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Book Formatting",
      highlight: "Book Formatting",
      subtitle:
        "Professional formatting plays a critical role in creating a polished reading experience. Our formatting specialists ensure every detail meets publishing standards while maintaining visual quality throughout your book.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from formatting professionals who understand publishing requirements across Kindle, paperback, and hardcover formats. We help identify formatting needs designed around your publishing goals.",
          icon: "book",
        },
        {
          title: "Free from AI",
          highlight: "AI",
          description:
            "Our formatting solutions are built to meet industry standards while ensuring compatibility with major publishing platforms. From typography to spacing and layout structure, every detail is optimized professionally.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, updates, or assistance — our dedicated support team remains available throughout your formatting journey. We ensure a smooth process from manuscript preparation to publication readiness.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "book-editing",
    name: "Book Editing",
    metaDescription:
      "Professional book editing services to refine your manuscript for clarity, flow, accuracy, and publication readiness.",
    hero: {
      eyebrow: "Professional",
      title: "Book Editing",
      subtitle: "Services That Refine Your Story Perfectly",
      paragraphs: [
        "Every great book starts with a powerful story — but professional editing helps it reach its full potential. At Amazon Publication, our expert book editing services refine your manuscript while preserving your voice, tone, and creative vision.",
        "Whether you've written a memoir, novel, business book, self-help guide, or fiction title, our editors carefully review grammar, sentence flow, clarity, structure, consistency, and readability. We focus on polishing your manuscript so readers experience your story exactly as you intended.",
        "Professional editing transforms good writing into exceptional publishing quality.",
      ],
      ctaLabel: "Edit My Book",
    },
    vision: {
      title: "Affordable Book Editing Designed Around Your Vision",
      highlight: "Book Editing",
      paragraphs: [
        "Your manuscript deserves professional attention before publication. Our affordable book editing solutions help strengthen clarity, improve readability, and enhance the overall quality of your work while maintaining your original voice.",
      ],
      features: [
        "Personalized Editing Support",
        "Improved Clarity & Readability",
        "Transparent Collaboration.",
        "Faster Turnaround Times",
        "Professionally Polished Manuscripts",
      ],
      imageSrc: "/editing.webp",
      imageAlt: "Editor reviewing a manuscript",
      ctaLabel: "Hire Professional Book Editors",
    },
    experienced: {
      title: "Experienced Book Editing Services!",
      highlight: "Book Editing",
      paragraphs: [
        "Our experienced book editing specialists help authors strengthen manuscripts through careful review and professional refinement. We've supported writers across multiple genres by improving sentence flow, eliminating errors, strengthening structure, and enhancing overall presentation quality.",
        "Our editing process focuses on preserving your authentic voice while refining every chapter for stronger reader engagement and publishing standards.",
        "Whether you're publishing fiction, non-fiction, memoirs, business books, or educational content, Amazon Publication helps ensure your manuscript reaches readers in its strongest form.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Manuscript with editing marks",
      ctaLabel: "Hire Professional Book Editors",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Book Editing",
      highlight: "Book Editing",
      subtitle:
        "Professional editing improves quality, strengthens readability, and prepares your manuscript for publication. Our editing specialists focus on refining your work while protecting your voice and creative direction.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from experienced editing professionals dedicated to helping authors improve manuscript quality before publication.",
          icon: "book",
        },
        {
          title: "Detailed Editorial Review",
          highlight: "Editorial Review",
          description:
            "Our editing specialists carefully review grammar, sentence structure, clarity, consistency, pacing, and readability to strengthen your manuscript professionally.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Support",
          highlight: "Customer Support",
          description:
            "Questions, revisions, or project updates — our dedicated support team remains available throughout your editing journey to ensure a smooth experience from beginning to end.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "book-cover-design",
    name: "Book Cover Design",
    metaDescription:
      "Professional book cover design services that create eye-catching covers built to stand out in competitive marketplaces.",
    hero: {
      eyebrow: "Professional",
      title: "Book Cover Design",
      subtitle: "Services That Bring Your Story To Life",
      paragraphs: [
        "Your book cover is the first thing readers notice — make it unforgettable. At Amazon Publication, our professional book cover design services create visually compelling covers designed to capture attention and reflect the essence of your story.",
        "Whether you're publishing fiction, memoirs, business books, self-help titles, or children's books, our design specialists craft covers tailored to your genre, audience, and publishing goals. We focus on creating professional designs that help your book stand out across digital marketplaces and printed editions.",
        "A powerful story deserves a cover designed to leave a lasting impression.",
      ],
      ctaLabel: "Design My Book Cover",
    },
    vision: {
      title: "Affordable Book Cover Design Designed Around Your Vision",
      highlight: "Book Cover Design",
      paragraphs: [
        "A professionally designed cover can make a significant difference in attracting readers and strengthening your author brand. Our affordable book cover design solutions combine creativity, strategy, and publishing expertise to deliver covers built for visibility and impact.",
      ],
      features: [
        "Personalized Cover Concepts",
        "Genre-Focused Design Strategy",
        "Transparent Collaboration",
        "Faster Design Delivery",
        "Print & Digital Publishing Compatibility",
      ],
      imageSrc: "/book-cover-design.webp",
      imageAlt: "Designer creating a book cover",
      ctaLabel: "Hire Professional Book Designers",
    },
    experienced: {
      title: "Experienced Book Cover Design Services!",
      highlight: "Book Cover Design",
      paragraphs: [
        "Our experienced design specialists understand what makes readers stop scrolling and start clicking. We've helped authors create compelling book covers designed to communicate genre, build credibility, and strengthen marketplace visibility.",
        "From typography and color selection to imagery, composition, and publishing specifications, every detail is carefully crafted to deliver a polished and professional final product.",
        "Whether you're launching your first title or expanding your publishing portfolio, Amazon Publication helps ensure your book makes a powerful first impression.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Collection of book covers",
      ctaLabel: "Hire Professional Book Designers",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Book Cover Design",
      highlight: "Book Cover Design",
      subtitle:
        "Professional cover design goes beyond appearance — it creates impact, strengthens branding, and helps attract the right audience.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from experienced publishing professionals who understand genre expectations, reader behavior, and professional design standards.",
          icon: "book",
        },
        {
          title: "Market-Focused Design Strategy",
          highlight: "Design Strategy",
          description:
            "Our covers are designed with audience expectations and marketplace trends in mind, helping improve visibility while creating stronger reader appeal.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, revisions, or project updates — our support team remains available throughout your design journey to ensure a smooth and professional experience from concept to completion.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "book-printing",
    name: "Book Printing",
    metaDescription:
      "Premium book printing services for professional paperbacks and hardcovers with quality that authors can trust.",
    hero: {
      eyebrow: "Professional",
      title: "Book Printing",
      subtitle: "Services That Bring Your Story Into Readers' Hands",
      paragraphs: [
        "Publishing your book is an achievement — holding a professionally printed copy makes it unforgettable. At Amazon Publication, our professional book printing services help transform your manuscript into a high-quality finished product designed to leave a lasting impression.",
        "Whether you're printing novels, memoirs, business books, self-help guides, children's books, or educational content, our printing specialists focus on premium materials, professional finishing, and exceptional print quality. From paper selection to binding and production, every detail is carefully managed to ensure your book looks as remarkable as the story inside.",
        "Turn your manuscript into a professionally printed book readers will proudly hold and remember.",
      ],
      ctaLabel: "Print My Book",
    },
    vision: {
      title: "Affordable Book Printing Designed Around Your Vision",
      highlight: "Book Printing",
      paragraphs: [
        "Every author deserves professional printing solutions that combine quality, durability, and visual excellence. Our affordable book printing services help prepare your work for readers while maintaining the presentation standards your story deserves.",
      ],
      features: [
        "Premium Print Quality",
        "Paperback & Hardcover Solutions",
        "Professional Material Selection",
        "Transparent Collaboration",
        "Faster Production Timelines",
      ],
      imageSrc: "/book-printing.webp",
      imageAlt: "Freshly printed books stacked",
      ctaLabel: "Hire Professional Book Printers",
    },
    experienced: {
      title: "Experienced Book Printing Services!",
      highlight: "Book Printing",
      paragraphs: [
        "Our experienced printing specialists help authors create professionally produced books designed to meet publishing standards and reader expectations. We focus on quality production, durable materials, clean finishing, and polished presentation.",
        "Whether you're printing small quantities or preparing larger distribution runs, our printing solutions are built to support authors at every stage of publication.",
        "From novels and memoirs to business books and educational content, Amazon Publication helps ensure your printed book reflects the quality of your work.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Printed hardcover books",
      ctaLabel: "Hire Professional Book Printers",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Book Printing",
      highlight: "Book Printing",
      subtitle:
        "Professional printing goes beyond putting words on paper — it creates a lasting reading experience. Our printing specialists focus on quality craftsmanship, production precision, and professional presentation.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from experienced publishing professionals who help identify printing solutions designed around your book goals and publishing needs.",
          icon: "book",
        },
        {
          title: "Premium Print Quality Standards",
          highlight: "Print Quality",
          description:
            "We focus on professional production quality, material selection, finishing precision, and presentation standards designed to create books authors feel proud to publish.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, production updates, or support — our dedicated team remains available throughout your printing journey to ensure a smooth and professional experience from start to finish.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "book-publishing",
    name: "Book Publishing",
    metaDescription:
      "End-to-end book publishing services to help authors launch professionally on Amazon and beyond.",
    hero: {
      eyebrow: "Professional",
      title: "Book Publishing",
      subtitle: "Services That Turn Manuscripts Into Published Success Stories",
      paragraphs: [
        "Writing your book is only the beginning — publishing it professionally is what brings your story to readers worldwide. At Amazon Publication, our professional book publishing services help authors transform manuscripts into professionally published books ready for digital and print distribution.",
        "Whether you're publishing fiction, memoirs, business books, self-help titles, educational content, or novels, our publishing specialists guide you through every stage of the process. From formatting and ISBN assistance to Amazon publishing setup and distribution preparation, we simplify publishing while helping maintain professional standards.",
        "Your story deserves more than staying unfinished — let us help bring it to the world.",
      ],
      ctaLabel: "Publish My Book",
    },
    vision: {
      title: "Affordable Book Publishing Designed Around Your Vision",
      highlight: "Book Publishing",
      paragraphs: [
        "Publishing a book should feel exciting, not overwhelming. Our affordable publishing solutions are designed to help authors navigate the publishing journey with confidence while maintaining quality and professionalism throughout every stage.",
      ],
      features: [
        "Personalized Publishing Guidance",
        "Amazon Publishing Support",
        "Print & Digital Publishing Solutions",
        "Transparent Collaboration",
        "Faster Publishing Process",
      ],
      imageSrc: "/book-publishing.webp",
      imageAlt: "Published book launch setup",
      ctaLabel: "Hire Professional Book Publishers",
    },
    experienced: {
      title: "Experienced Book Publishing Services!",
      highlight: "Book Publishing",
      paragraphs: [
        "Our experienced publishing specialists help authors move from manuscript to marketplace with professional support designed around long-term publishing success. We've helped writers prepare books for publication across multiple genres while maintaining quality standards throughout the process.",
        "From publishing preparation and metadata optimization to distribution guidance and platform compatibility, we focus on creating a smooth publishing experience for authors at every level.",
        "Whether you're publishing your first book or expanding your author portfolio, Amazon Publication helps bring your publishing goals to life.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Books ready for publishing",
      ctaLabel: "Hire Professional Book Publishers",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Book Publishing",
      highlight: "Book Publishing",
      subtitle:
        "Professional publishing requires expertise, strategy, and attention to detail. Our publishing specialists help simplify complex publishing requirements while ensuring quality remains a priority.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized publishing guidance from experienced professionals who understand industry standards and publishing workflows designed for long-term success.",
          icon: "book",
        },
        {
          title: "End-To-End Publishing Support",
          highlight: "Publishing Support",
          description:
            "From manuscript preparation and publishing setup to distribution readiness and optimization, we provide publishing solutions designed to simplify the process.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, updates, or publishing assistance — our dedicated support team remains available throughout your publishing journey to ensure a smooth and stress-free experience.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "proof-reading",
    name: "Proof Reading",
    metaDescription:
      "Professional proofreading services that catch errors and polish your manuscript before publication.",
    hero: {
      eyebrow: "Professional",
      title: "Proof Reading",
      subtitle: "Services That Perfect Every Word",
      paragraphs: [
        "Even the strongest stories need a final layer of refinement before publication. At Amazon Publication, our professional proofreading services help eliminate grammar mistakes, spelling errors, punctuation issues, formatting inconsistencies, and overlooked writing mistakes that can affect reader experience.",
        "Whether you're publishing fiction, memoirs, business books, self-help titles, educational content, or novels, our proofreading specialists carefully review your manuscript to ensure every page reflects professionalism and quality. We focus on polishing your work while preserving your authentic voice and writing style.",
        "A professionally proofread manuscript creates stronger reader confidence and delivers a more polished publishing experience.",
      ],
      ctaLabel: "Hire Professional Proofreaders",
    },
    vision: {
      title: "Affordable Proof Reading Designed Around Your Vision",
      highlight: "Proof Reading",
      paragraphs: [
        "Every manuscript deserves a final review before reaching readers. Our affordable proofreading solutions help strengthen clarity, improve readability, and ensure your work is publication-ready while maintaining your original message and creative intent.",
      ],
      features: [
        "Grammar & Spelling Correction",
        "Punctuation & Consistency Review",
        "Improved Readability",
        "Transparent Collaboration",
        "Faster Turnaround Times",
      ],
      imageSrc: "/proof-reading.webp",
      imageAlt: "Proofreader reviewing pages",
      ctaLabel: "Hire Professional Proofreaders",
    },
    experienced: {
      title: "Experienced Proof Reading Services!",
      highlight: "Proof Reading",
      paragraphs: [
        "Our experienced proofreading specialists help authors prepare manuscripts for professional publication with precision and attention to detail. We've helped writers across multiple genres improve manuscript quality while maintaining readability and publishing standards.",
        "From sentence consistency and punctuation corrections to grammar refinement and formatting review, every page receives careful attention designed to strengthen your final manuscript.",
        "Whether you're preparing for Amazon publishing, digital distribution, or print publication, Amazon Publication helps ensure your book looks polished and professionally prepared.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Marked-up manuscript pages",
      ctaLabel: "Hire Professional Proofreaders",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Proof Reading",
      highlight: "Proof Reading",
      subtitle:
        "Professional proofreading helps strengthen quality, improve reader experience, and prepare manuscripts for successful publication. Our specialists focus on refining details while protecting your voice and writing style.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from experienced publishing professionals who help identify proofreading needs designed around your manuscript goals.",
          icon: "book",
        },
        {
          title: "Detailed Quality Review",
          highlight: "Quality Review",
          description:
            "Our proofreading specialists carefully review grammar, punctuation, spelling, consistency, readability, and presentation quality to strengthen your manuscript professionally.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, revisions, or project updates — our dedicated support team remains available throughout your proofreading journey to ensure a smooth and stress-free experience from manuscript preparation to publication.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "children-book",
    name: "Children Book",
    metaDescription:
      "Children's book publishing services covering writing, illustration coordination, formatting, and publication support.",
    hero: {
      eyebrow: "Professional",
      title: "Children Book",
      subtitle: "Services That Bring Young Imaginations To Life",
      paragraphs: [
        "Children's stories have the power to inspire curiosity, spark imagination, and create lifelong memories. At Amazon Publication, our professional children's book services help authors transform ideas into engaging books designed to entertain, educate, and connect with young readers.",
        "Whether you're creating picture books, educational stories, bedtime adventures, or imaginative fictional worlds, our specialists help shape your vision into a professionally developed children's book. From story structure and editing to publishing preparation and design guidance, we help create books children will enjoy reading again and again.",
        "Great children's books don't simply tell stories — they create unforgettable experiences.",
      ],
      ctaLabel: "Create My Children's Book",
    },
    vision: {
      title: "Affordable Children's Book Designed Around Your Vision",
      highlight: "Children's Book",
      paragraphs: [
        "Creating a children's book requires creativity, structure, and attention to detail. Our affordable children's book solutions are designed to help authors develop engaging stories while maintaining age-appropriate language, readability, and storytelling quality.",
      ],
      features: [
        "Child-Friendly Story Development",
        "Age-Appropriate Structure",
        "Personalized Creative Support",
        "Professional Publishing Guidance",
        "Faster Project Completion",
      ],
      imageSrc: "/children-book.webp",
      imageAlt: "Colorful children's book pages",
      ctaLabel: "Hire Children's Book Experts",
    },
    experienced: {
      title: "Experienced Children's Book Services!",
      highlight: "Children's Book",
      paragraphs: [
        "Our experienced children's book specialists help authors create memorable stories designed to educate, inspire, and entertain. We've helped writers develop engaging content while ensuring storytelling quality remains strong from beginning to end.",
        "From pacing and structure to presentation and publishing readiness, every detail receives professional attention designed to strengthen your final manuscript.",
        "Whether you're publishing educational books, adventure stories, bedtime books, or imaginative fiction, Amazon Publication helps bring your children's story to life professionally.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Stack of children's books",
      ctaLabel: "Hire Children's Book Experts",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Children Book",
      highlight: "Children Book",
      subtitle:
        "Creating books for young readers requires creativity, strategy, and storytelling expertise. Our specialists focus on helping authors create engaging content designed for children while maintaining professional publishing quality.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from publishing professionals experienced in helping authors create books designed specifically for young readers.",
          icon: "book",
        },
        {
          title: "Child-Focused Creative Development",
          highlight: "Creative Development",
          description:
            "Our specialists help strengthen storytelling quality, readability, age-appropriate language, and engagement designed around children's reading experiences.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, updates, or creative support — our dedicated team remains available throughout your children's book journey to ensure a smooth and enjoyable experience from idea to publication.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "ebook-writing",
    name: "Ebook Writing",
    metaDescription:
      "Professional ebook writing services for digital-first content designed to engage modern readers.",
    hero: {
      eyebrow: "Professional",
      title: "Ebook Writing",
      subtitle: "Services That Turn Your Ideas Into Digital Success",
      paragraphs: [
        "Every great ebook begins with a powerful idea. At Amazon Publication, our professional ebook writing services help authors, entrepreneurs, business owners, and storytellers transform concepts into professionally written digital content designed to educate, inspire, and engage readers worldwide.",
        "Whether you're creating a business ebook, self-help guide, educational content, memoir, fiction title, or industry resource, our writing specialists help develop clear, compelling, and reader-focused content tailored to your goals. We focus on creating ebooks that deliver value while maintaining your unique voice and message.",
        "Turn your knowledge and ideas into professionally crafted digital books built for today's readers.",
      ],
      ctaLabel: "Write My Ebook",
    },
    vision: {
      title: "Affordable Ebook Writing Designed Around Your Vision",
      highlight: "Ebook Writing",
      paragraphs: [
        "Creating a successful ebook requires more than good ideas — it demands structure, clarity, and engaging writing. Our affordable ebook writing services help authors build professionally written content designed to connect with readers and strengthen credibility.",
      ],
      features: [
        "Personalized Content Development",
        "Reader-Focused Writing Approach",
        "Transparent Collaboration",
        "Faster Project Delivery",
        "Professionally Structured Content",
      ],
      imageSrc: "/ebook-writing.webp",
      imageAlt: "Ebook on a digital tablet",
      ctaLabel: "Hire Ebook Writing Experts",
    },
    experienced: {
      title: "Experienced Ebook Writing Services!",
      highlight: "Ebook Writing",
      paragraphs: [
        "Our experienced ebook writing specialists help authors create engaging digital content designed to inform, inspire, and deliver value. We've supported clients across multiple industries and genres by developing ebooks built around clarity, storytelling quality, and reader engagement.",
        "Our process focuses on organization, structure, tone consistency, readability, and content flow to ensure your ebook delivers a professional reading experience.",
        "Whether you're publishing educational guides, business resources, fiction stories, or personal development content, Amazon Publication helps transform ideas into polished digital books ready for publication.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Digital reading and writing setup",
      ctaLabel: "Hire Ebook Writing Experts",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Ebook Writing",
      highlight: "Ebook Writing",
      subtitle:
        "Professional ebook writing requires strategy, structure, and expertise. Our specialists help create compelling content designed to strengthen your message while maintaining quality and readability.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from ebook writing professionals who understand content strategy, digital publishing standards, and audience engagement.",
          icon: "book",
        },
        {
          title: "Customized Content Development",
          highlight: "Content Development",
          description:
            "Every ebook is written around your goals, audience, and vision to ensure your content delivers value while reflecting your unique message.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, revisions, or project updates — our dedicated support team remains available throughout your ebook writing journey to ensure a smooth and professional experience from beginning to completion.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "fiction-writing",
    name: "Fiction Writing",
    metaDescription:
      "Professional fiction writing services that craft immersive stories, characters, and plots readers remember.",
    hero: {
      eyebrow: "Professional",
      title: "Fiction Writing",
      subtitle: "Services That Bring Stories To Life",
      paragraphs: [
        "Every unforgettable novel begins with a powerful idea. At Amazon Publication, our professional fiction writing services help authors transform concepts into immersive stories designed to captivate readers and leave lasting impressions.",
        "Whether you're building fantasy worlds, emotional dramas, romance novels, thrillers, action stories, or literary fiction, our writing specialists help create compelling narratives filled with engaging characters, strong storytelling, and meaningful experiences. We focus on bringing your ideas to life while preserving your creative vision and unique voice.",
        "Great fiction doesn't simply entertain readers — it creates worlds they never want to leave.",
      ],
      ctaLabel: "Write My Fiction Book",
    },
    vision: {
      title: "Affordable Fiction Writing Designed Around Your Vision",
      highlight: "Fiction Writing",
      paragraphs: [
        "Creating compelling fiction requires imagination, structure, and storytelling expertise. Our affordable fiction writing services help authors develop professionally written stories designed to connect with readers and deliver memorable experiences.",
      ],
      features: [
        "Personalized Story Development",
        "Reader-Focused Narrative Structure",
        "Transparent Collaboration",
        "Faster Project Completion",
        "Professionally Written Manuscripts",
      ],
      imageSrc: "/fiction-writing.webp",
      imageAlt: "Fiction manuscript and notebook",
      ctaLabel: "Hire Professional Fiction Writers",
    },
    experienced: {
      title: "Experienced Fiction Writing Services!",
      highlight: "Fiction Writing",
      paragraphs: [
        "Our experienced fiction writing specialists help authors create engaging stories designed to entertain, inspire, and immerse readers. We've supported writers across multiple fiction genres by developing manuscripts focused on storytelling quality, pacing, character development, and emotional impact.",
        "Our process emphasizes narrative flow, consistency, readability, and audience engagement to ensure every story delivers a premium reading experience.",
        "Whether you're creating fantasy, romance, mystery, suspense, drama, or literary fiction, Amazon Publication helps transform ideas into professionally written stories ready for publication.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Stack of fiction novels",
      ctaLabel: "Hire Professional Fiction Writers",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Fiction Writing",
      highlight: "Fiction Writing",
      subtitle:
        "Professional fiction writing combines creativity, storytelling expertise, and structure. Our specialists help authors develop compelling stories while maintaining originality, emotional depth, and publishing quality.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from fiction writing professionals experienced in developing engaging narratives and reader-focused storytelling.",
          icon: "book",
        },
        {
          title: "Story Development Expertise",
          highlight: "Development Expertise",
          description:
            "From world-building and pacing to character arcs and emotional impact, we help strengthen every element of your fiction manuscript.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, updates, revisions, or creative support — our dedicated team remains available throughout your fiction writing journey to ensure a smooth and professional experience from concept to completion.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "ghost-writing",
    name: "Ghost Writing",
    metaDescription:
      "Professional ghostwriting services that turn your ideas into polished manuscripts while preserving your voice.",
    hero: {
      eyebrow: "Professional",
      title: "Ghost Writing",
      subtitle: "Services That Turn Ideas Into Powerful Stories",
      paragraphs: [
        "Every great book begins with an idea — but turning that idea into a professionally written manuscript takes time, creativity, and expertise. At Amazon Publication, our professional ghostwriting services help authors, entrepreneurs, industry experts, and aspiring writers transform concepts into compelling books designed to engage readers.",
        "Whether you're creating a memoir, business book, self-help guide, fiction story, educational content, or novel, our experienced ghostwriters develop content tailored to your goals while preserving your unique voice and vision. We focus on creating manuscripts that feel authentic, engaging, and professionally crafted.",
        "You bring the idea — we help bring it to life.",
      ],
      ctaLabel: "Hire A Ghostwriter",
    },
    vision: {
      title: "Affordable Ghostwriting Services Designed Around Your Vision",
      highlight: "Ghostwriting",
      paragraphs: [
        "Writing a book can feel overwhelming, especially when balancing work, business, or personal commitments. Our affordable ghostwriting services help simplify the process by transforming your ideas into professionally written content designed around your vision.",
      ],
      features: [
        "Personalized Writing Approach",
        "Authentic Voice Preservation",
        "Transparent Collaboration",
        "Faster Project Delivery",
        "Professionally Written Manuscripts",
      ],
      imageSrc: "/ghost-writing.webp",
      imageAlt: "Ghostwriter collaborating on a manuscript",
      ctaLabel: "Hire Professional Ghostwriters",
    },
    experienced: {
      title: "Experienced Ghostwriters Services!",
      highlight: "Ghostwriters",
      paragraphs: [
        "Our experienced ghostwriting specialists help clients develop engaging manuscripts designed to educate, inspire, entertain, and create lasting impact. We've helped aspiring authors, professionals, business leaders, and storytellers transform ideas into professionally developed books.",
        "Our process focuses on structure, clarity, readability, storytelling quality, audience engagement, and content flow to ensure every manuscript delivers value.",
        "Whether you're publishing fiction, non-fiction, memoirs, business books, or educational resources, Amazon Publication helps bring your vision to life professionally.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Author notes and finished manuscript",
      ctaLabel: "Hire Professional Ghostwriters",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Ghostwriting",
      highlight: "Ghostwriting",
      subtitle:
        "Professional ghostwriting requires creativity, research, storytelling expertise, and the ability to preserve an author's vision. Our specialists focus on helping clients create polished manuscripts while maintaining authenticity throughout every page.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from experienced ghostwriting professionals dedicated to understanding your goals and helping shape your publishing vision.",
          icon: "book",
        },
        {
          title: "Personalized Writing Process",
          highlight: "Writing Process",
          description:
            "Every manuscript is developed around your voice, ideas, and audience expectations to ensure the final content feels authentic and uniquely yours.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, revisions, project updates, or creative support — our dedicated team remains available throughout your ghostwriting journey to ensure a smooth and professional experience from concept to completion.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "audio-book-narration",
    name: "Audio Book Narration",
    metaDescription:
      "Professional audiobook narration services that create immersive listening experiences for modern audiences.",
    hero: {
      eyebrow: "Professional",
      title: "Audio Book Narration",
      subtitle: "Services That Bring Stories To Life Through Voice",
      paragraphs: [
        "A great story deserves to be heard as well as read. At Amazon Publication, our professional audiobook narration services help authors transform books into immersive listening experiences designed to captivate audiences and expand reach across digital platforms.",
        "Whether you're publishing fiction, memoirs, business books, self-help content, educational material, or children's stories, our narration specialists help bring your words to life with clarity, emotion, and professional delivery. We focus on creating audiobook experiences that connect with listeners while preserving the tone and essence of your work.",
        "Turn your manuscript into a professionally narrated audiobook listeners will remember.",
      ],
      ctaLabel: "Narrate My Audiobook",
    },
    vision: {
      title: "Affordable Audio Book Narration Designed Around Your Vision",
      highlight: "Audio Book Narration",
      paragraphs: [
        "Audiobooks continue to grow in popularity, giving authors new opportunities to connect with readers everywhere. Our affordable audiobook narration services help authors expand their reach while delivering premium-quality audio experiences designed around their goals.",
      ],
      features: [
        "Professional Voice Narration",
        "Clear & High-Quality Audio Production",
        "Personalized Creative Direction",
        "Transparent Collaboration",
        "Faster Project Completion",
      ],
      imageSrc: "/audio-book-narration.webp",
      imageAlt: "Audiobook recording studio",
      ctaLabel: "Hire Professional Narrators",
    },
    experienced: {
      title: "Experienced Audio Book Narration Services!",
      highlight: "Audio Book Narration",
      paragraphs: [
        "Our experienced audiobook narration specialists help authors create engaging audio experiences designed to keep listeners connected from beginning to end. We focus on voice quality, pacing, pronunciation, emotion, and storytelling delivery to ensure every audiobook sounds polished and professional.",
        "From fiction and memoirs to business books and educational content, our narration services help authors prepare audiobooks designed for today's growing digital audience.",
        "Whether you're publishing your first audiobook or expanding your publishing portfolio, Amazon Publication helps bring your story to life professionally.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Headphones and audiobook setup",
      ctaLabel: "Hire Professional Narrators",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Audio Book Narration",
      highlight: "Audio Book Narration",
      subtitle:
        "Professional audiobook narration requires more than reading words — it requires performance, clarity, pacing, and audience connection. Our specialists help transform manuscripts into engaging listening experiences built for quality and impact.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from experienced audiobook narration professionals who understand voice performance, audio production standards, and listener engagement.",
          icon: "book",
        },
        {
          title: "Premium Audio Production",
          highlight: "Audio Production",
          description:
            "We focus on narration quality, voice consistency, audio clarity, pacing, and production standards designed to create a polished listening experience.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, revisions, production updates, or support — our dedicated team remains available throughout your audiobook journey to ensure a smooth and professional experience from recording to final delivery.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "authors-website",
    name: "Authors Website",
    metaDescription:
      "Professional author website services that build your online presence, showcase your books, and connect with readers.",
    hero: {
      eyebrow: "Professional",
      title: "Authors Website",
      subtitle: "Services That Build Your Online Presence",
      paragraphs: [
        "Your book deserves more than publication — it deserves a professional online presence. At Amazon Publication, our professional author website services help writers build powerful digital platforms designed to showcase books, strengthen personal branding, and connect with readers worldwide.",
        "Whether you're a first-time author or an established writer, our website specialists create modern, professional author websites tailored to your goals. From book showcases and biography pages to contact forms, blog sections, and reader engagement features, we help build websites designed to grow your author identity.",
        "Your story builds readers — your website builds your brand.",
      ],
      ctaLabel: "Build My Author Website",
    },
    vision: {
      title: "Affordable Authors Website Designed Around Your Vision",
      highlight: "Authors Website",
      paragraphs: [
        "A professionally designed author website helps readers discover your work while creating trust and credibility around your publishing journey. Our affordable author website solutions help writers establish a strong digital presence without unnecessary complexity.",
      ],
      features: [
        "Personalized Website Design",
        "Mobile-Friendly Development",
        "Author Branding Integration",
        "Reader Engagement Features",
        "Faster Project Delivery",
      ],
      imageSrc: "/authors-website.webp",
      imageAlt: "Author website on a laptop",
      ctaLabel: "Hire Professional Website Experts",
    },
    experienced: {
      title: "Experienced Authors Website Services!",
      highlight: "Authors Website",
      paragraphs: [
        "Our experienced website specialists help authors create digital platforms designed to strengthen visibility and improve reader engagement. We've helped writers build professional websites that showcase books, establish credibility, and support long-term author growth.",
        "From homepage design and book pages to blog sections, newsletter integration, and contact systems, we focus on building professional experiences designed around author success.",
        "Whether you're launching your first title or growing your publishing brand, Amazon Publication helps create websites built to support your journey.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Author portfolio website design",
      ctaLabel: "Hire Professional Website Experts",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Authors Website",
      highlight: "Authors Website",
      subtitle:
        "A professional website helps authors build trust, strengthen branding, and create stronger connections with readers. Our specialists focus on creating modern websites designed for performance, usability, and long-term growth.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from website specialists dedicated to understanding your author goals and helping build a professional online presence.",
          icon: "book",
        },
        {
          title: "Custom Author Branding",
          highlight: "Author Branding",
          description:
            "We create websites designed around your books, identity, and audience to help strengthen recognition and improve reader engagement.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, updates, revisions, or technical assistance — our dedicated support team remains available throughout your website development journey to ensure a smooth and professional experience from planning to launch.",
          icon: "headset",
        },
      ],
    },
  }),

  serviceConfig({
    slug: "video-trailer",
    name: "Video Trailer",
    metaDescription:
      "Professional book video trailer services that promote your story with cinematic visuals and marketing-ready clips.",
    hero: {
      eyebrow: "Professional",
      title: "Video Trailer",
      subtitle: "Services That Bring Stories To Life Visually",
      paragraphs: [
        "A compelling story deserves more than words — it deserves attention. At Amazon Publication, our professional book video trailer services help authors transform books into cinematic promotional content designed to capture interest, build excitement, and connect with readers across digital platforms.",
        "Whether you're promoting fiction, memoirs, business books, self-help titles, children's books, or novels, our creative specialists develop visually engaging trailers tailored to your audience and genre. From motion graphics and visuals to storytelling flow and professional editing, we help create trailers designed to leave lasting impressions.",
        "Turn your book into an experience readers want to discover.",
      ],
      ctaLabel: "Create My Book Trailer",
    },
    vision: {
      title: "Affordable Video Trailer Designed Around Your Vision",
      highlight: "Video Trailer",
      paragraphs: [
        "Book trailers have become a powerful way for authors to build awareness and strengthen marketing efforts. Our affordable video trailer services help transform your book into visually compelling content designed to generate engagement and increase visibility.",
      ],
      features: [
        "Professional Video Editing",
        "Genre-Focused Creative Direction",
        "Engaging Storytelling Visuals",
        "Social Media Ready Content",
        "Faster Project Delivery",
      ],
      imageSrc: "/video-trailer.webp",
      imageAlt: "Book trailer video production",
      ctaLabel: "Hire Professional Video Creators",
    },
    experienced: {
      title: "Experienced Video Trailer Services!",
      highlight: "Video Trailer",
      paragraphs: [
        "Our experienced creative specialists help authors develop professional video trailers designed to increase discoverability and strengthen promotional campaigns. We've helped writers create engaging visual content that highlights their books while building excitement before and after launch.",
        "From cinematic transitions and visual storytelling to branding elements and promotional messaging, every trailer is developed with quality and audience engagement in mind.",
        "Whether you're launching a new release or expanding your author presence, Amazon Publication helps create promotional content designed to strengthen visibility.",
      ],
      imageSrc: "/about-3.webp",
      imageAlt: "Book promotional video still",
      ctaLabel: "Hire Professional Video Creators",
    },
    whyChoose: {
      title: "Why Choose Amazon Publication for Video Trailer",
      highlight: "Video Trailer",
      subtitle:
        "Professional video trailers help authors strengthen branding, improve visibility, and generate audience engagement. Our specialists combine creativity, storytelling, and marketing expertise to create trailers designed for impact.",
      items: [
        {
          title: "Free Expert Consultation",
          highlight: "Consultation",
          description:
            "Receive personalized guidance from creative professionals dedicated to understanding your goals and developing trailer concepts aligned with your publishing strategy.",
          icon: "book",
        },
        {
          title: "Cinematic Creative Production",
          highlight: "Creative Production",
          description:
            "Our team focuses on storytelling visuals, motion design, pacing, and audience engagement to create promotional trailers designed to capture attention.",
          icon: "clipboard",
        },
        {
          title: "24/7 Customer Help",
          highlight: "Customer Help",
          description:
            "Questions, revisions, updates, or creative support — our dedicated team remains available throughout your video trailer journey to ensure a smooth and professional experience from concept to delivery.",
          icon: "headset",
        },
      ],
    },
  }),
];

export const servicePages: Record<string, ServicePageContent> = Object.fromEntries(
  configs.map((config) => [config.slug, createServiceContent(config)]),
);

export const serviceSlugs = Object.keys(servicePages);

export function getServicePage(slug: string): ServicePageContent | undefined {
  return servicePages[slug];
}
