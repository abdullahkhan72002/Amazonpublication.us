import type { Metadata } from "next";
import GetInTouch from "@/components/sections/GetInTouch";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import PageHero from "@/components/sections/PageHero";
import PremiumCta from "@/components/sections/PremiumCta";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import {
  portfolioGridContent,
  portfolioHeroContent,
  portfolioPageSections,
} from "@/data/portfolio";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Our Portfolio | ${site.name}`,
  description:
    "Explore published books, cover designs, and publishing projects across genres from Amazon Publication.",
};

export default function PortfolioPage() {
  return (
    <>
      <div className="bg-white">
        <PageHero {...portfolioHeroContent} />
      </div>
      <PortfolioGrid {...portfolioGridContent} />
      <Services {...portfolioPageSections.services} />
      <PremiumCta {...portfolioPageSections.premiumCta} />
      <Testimonials {...portfolioPageSections.testimonials} />
      <GetInTouch {...portfolioPageSections.getInTouch} formSource="portfolio-get-in-touch" />
    </>
  );
}
