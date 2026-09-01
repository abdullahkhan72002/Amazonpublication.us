import type { Metadata } from "next";
import ManuscriptForm from "@/components/sections/ManuscriptForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Submit Your Manuscript | ${site.name}`,
  description:
    "Submit your manuscript to Amazon Publication. Share your author details, address, book information, and upload your file for review.",
};

export default function SubmitManuscriptPage() {
  return <ManuscriptForm />;
}
