import BrandStrip from "@/components/sections/BrandStrip";
import GenreTabs from "@/components/sections/GenreTabs";
import GetInTouch from "@/components/sections/GetInTouch";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import PremiumCta from "@/components/sections/PremiumCta";
import Services from "@/components/sections/Services";
import SplitSection from "@/components/sections/SplitSection";
import WhyChoose from "@/components/sections/WhyChoose";
import { brandStripContent } from "@/data/home";
import type { ServicePageContent } from "@/data/services/createServiceContent";

export default function ServicePageLayout({
  content,
}: {
  content: ServicePageContent;
}) {
  return (
    <>
      <div className="bg-white">
        <Hero {...content.hero} />
        <BrandStrip {...brandStripContent} />
      </div>
      <SplitSection {...content.vision} />
      <SplitSection {...content.experienced} />
      <WhyChoose {...content.whyChoose} />
      <GenreTabs {...content.genreTabs} />
      <Portfolio {...content.sections.portfolio} />
      <Services {...content.sections.services} />
      <PremiumCta {...content.sections.premiumCta} />
      <GetInTouch
        {...content.sections.getInTouch}
        formSource={`service-${content.slug}-get-in-touch`}
      />
    </>
  );
}
