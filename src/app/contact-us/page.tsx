import type { Metadata } from "next";
import ContactFormSection from "@/components/sections/ContactFormSection";
import PageHero from "@/components/sections/PageHero";
import { contactFormContent, contactHeroContent } from "@/data/contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Contact Us | ${site.name}`,
  description:
    "Reach out to Amazon Publication for publishing, editing, marketing, and manuscript support.",
};

export default function ContactUsPage() {
  return (
    <>
      <div className="bg-white">
        <PageHero {...contactHeroContent} />
      </div>
      <ContactFormSection {...contactFormContent} />
    </>
  );
}
