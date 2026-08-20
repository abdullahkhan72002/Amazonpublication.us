import type { Metadata } from "next";
import LegalContent from "@/components/sections/LegalContent";
import PageHero from "@/components/sections/PageHero";
import { privacyPolicyContent } from "@/data/legal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  description:
    "Learn how Amazon Publication collects, uses, stores, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-hero -mt-[var(--header-height)] pt-[var(--header-height)]">
        <PageHero {...privacyPolicyContent.hero} />
      </div>
      <LegalContent blocks={privacyPolicyContent.blocks} />
    </>
  );
}
