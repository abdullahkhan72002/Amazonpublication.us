import type { Metadata } from "next";
import ThankYouContent from "@/components/sections/ThankYouContent";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Thank You | ${site.name}`,
  description:
    "Thank you for contacting Amazon Publication. We have received your submission and will follow up shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
