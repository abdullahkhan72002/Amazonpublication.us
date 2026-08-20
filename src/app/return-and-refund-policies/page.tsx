import type { Metadata } from "next";
import LegalContent from "@/components/sections/LegalContent";
import PageHero from "@/components/sections/PageHero";
import { returnAndRefundContent } from "@/data/legal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Return & Refund Policies | ${site.name}`,
  description:
    "Review Amazon Publication return and refund policies for publishing and author services.",
};

export default function ReturnAndRefundPoliciesPage() {
  return (
    <>
      <div className="bg-hero -mt-[var(--header-height)] pt-[var(--header-height)]">
        <PageHero {...returnAndRefundContent.hero} />
      </div>
      <LegalContent blocks={returnAndRefundContent.blocks} />
    </>
  );
}
