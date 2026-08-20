import BecomeAuthor from "@/components/sections/BecomeAuthor";
import BrandStrip from "@/components/sections/BrandStrip";
import Faq from "@/components/sections/Faq";
import GetInTouch from "@/components/sections/GetInTouch";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import PremiumCta from "@/components/sections/PremiumCta";
import PublishingServices from "@/components/sections/PublishingServices";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import {
  becomeAuthorContent,
  brandStripContent,
  faqContent,
  getInTouchContent,
  heroContent,
  portfolioContent,
  premiumCtaContent,
  publishingServicesContent,
  servicesContent,
  testimonialsContent,
} from "@/data/home";

export default function Home() {
  return (
    <>
      <div className="bg-white">
        <Hero {...heroContent} />
        <BrandStrip {...brandStripContent} />
      </div>
      <PublishingServices {...publishingServicesContent} />
      <BecomeAuthor {...becomeAuthorContent} />
      <Portfolio {...portfolioContent} />
      <Services {...servicesContent} />
      <PremiumCta {...premiumCtaContent} />
      <Testimonials {...testimonialsContent} />
      <Faq {...faqContent} />
      <GetInTouch {...getInTouchContent} />
    </>
  );
}
