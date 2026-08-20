import type { Metadata } from "next";
import LegalContent from "@/components/sections/LegalContent";
import PageHero from "@/components/sections/PageHero";
import { termsAndConditionsContent } from "@/data/legal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${site.name}`,
  description:
    "Read the Terms & Conditions for using Amazon Publication website and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <div className="bg-white">
        <PageHero {...termsAndConditionsContent.hero} />
      </div>
      <LegalContent blocks={termsAndConditionsContent.blocks} />
    </>
  );
}
