import type { Metadata } from "next";
import AboutIntro from "@/components/sections/AboutIntro";
import GetInTouch from "@/components/sections/GetInTouch";
import PremiumCta from "@/components/sections/PremiumCta";
import Services from "@/components/sections/Services";
import SplitSection from "@/components/sections/SplitSection";
import Testimonials from "@/components/sections/Testimonials";
import {
  aboutIntroContent,
  aboutPageSections,
  aboutPublishedContent,
  aboutReadyContent,
  aboutStoryContent,
} from "@/data/about";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `About Us | ${site.name}`,
  description:
    "Learn how Amazon Publication helps authors transform manuscripts into professionally published books with editing, design, publishing, and distribution support.",
};

export default function AboutUsPage() {
  return (
    <>
      <div className="bg-white">
        <AboutIntro {...aboutIntroContent} />
      </div>
      <SplitSection {...aboutStoryContent} />
      <SplitSection {...aboutPublishedContent} />
      <SplitSection {...aboutReadyContent} />
      <Services {...aboutPageSections.services} />
      <PremiumCta {...aboutPageSections.premiumCta} />
      <Testimonials {...aboutPageSections.testimonials} />
      <GetInTouch {...aboutPageSections.getInTouch} formSource="about-get-in-touch" />
    </>
  );
}
