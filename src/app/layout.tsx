import type { Metadata } from "next";
import { Suspense } from "react";
import { Rubik, Syne } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LeadPopup from "@/components/layout/LeadPopup";
import TrackingCapture from "@/components/layout/TrackingCapture";
import ZendeskWidget from "@/components/layout/ZendeskWidget";
import { footerContent, headerContent, site } from "@/data/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} | Expert Book Publishing Services`,
  description:
    "Publish your book on Amazon with expert editing, cover design, formatting, printing, and marketing support from Amazon Publication.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans">
        <Suspense fallback={null}>
          <TrackingCapture />
        </Suspense>
        <Header {...headerContent} />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer {...footerContent} />
        <LeadPopup />
        <ZendeskWidget />
      </body>
    </html>
  );
}
